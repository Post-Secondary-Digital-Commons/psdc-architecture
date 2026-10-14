import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { generateKeyPairSync } from "node:crypto";
import { fileURLToPath } from "node:url";
import { verifyCandidateContents, verifyContractBundle } from "./verify-contract-bundle.mjs";

const contractRoot = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(contractRoot, "..");
const pkg = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "package.json"), "utf8"));
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "psdc-attestation-test-"));
const keyId = "synthetic-development-key-1";
const { privateKey, publicKey } = generateKeyPairSync("ed25519");
const privatePem = privateKey.export({ type: "pkcs8", format: "pem" });
const publicPem = publicKey.export({ type: "spki", format: "pem" });

function run(script, ...args) {
  const result = spawnSync(process.execPath, [path.join(contractRoot, script), ...args], {
    cwd: repositoryRoot,
    encoding: "utf8"
  });
  assert.equal(result.status, 0, `${script} failed: ${result.stderr || result.stdout}`);
  return result.stdout;
}

function rejectsChange(bundleRoot, relative, update, message) {
  const target = path.join(bundleRoot, ...relative.split("/"));
  const before = fs.readFileSync(target);
  try {
    update(target, before);
    assert.throws(() => verifyContractBundle(bundleRoot, publicPem, keyId), message);
  } finally {
    fs.writeFileSync(target, before);
  }
}

try {
  const output = path.join(temporaryRoot, "output");
  run("build-contract-bundle.mjs", output);
  const bundleRoot = path.join(output, `${pkg.name}-${pkg.version}`);
  const candidate = verifyCandidateContents(bundleRoot);
  assert.ok(candidate.files > 0);
  assert.throws(() => verifyContractBundle(bundleRoot, publicPem, keyId), /Bundle file set differs/);
  const privatePath = path.join(temporaryRoot, "ephemeral-private.pem");
  fs.writeFileSync(privatePath, privatePem, { mode: 0o600 });
  run("attest-contract-bundle.mjs", bundleRoot, privatePath, keyId);
  const verified = verifyContractBundle(bundleRoot, publicPem, keyId);
  assert.equal(verified.kind, "development");
  assert.equal(verified.contentRoot, candidate.contentRoot);
  const publicPath = path.join(temporaryRoot, "ephemeral-public.pem");
  fs.writeFileSync(publicPath, publicPem);
  assert.ok(JSON.parse(run("verify-contract-bundle.mjs", bundleRoot, publicPath, keyId)).files > 0);
  assert.throws(() => verifyContractBundle(bundleRoot, publicPem, "different-key-id"), /metadata is invalid/);
  const otherPublicPem = generateKeyPairSync("ed25519").publicKey.export({ type: "spki", format: "pem" });
  assert.throws(() => verifyContractBundle(bundleRoot, otherPublicPem, keyId), /signature is invalid/);
  assert.notEqual(spawnSync(process.execPath, [path.join(contractRoot, "attest-contract-bundle.mjs"), bundleRoot, privatePath, keyId]).status, 0);

  const manifest = JSON.parse(candidate.manifestBytes);
  rejectsChange(bundleRoot, manifest.files[0].path, (target, before) => fs.writeFileSync(target, Buffer.concat([before, Buffer.from("tamper")])), /content differs/);
  rejectsChange(bundleRoot, "manifest.json", (target, before) => fs.writeFileSync(target, Buffer.concat([before, Buffer.from(" ")])), /metadata is invalid/);
  rejectsChange(bundleRoot, "attestation.json", (target, before) => {
    const attestation = JSON.parse(before);
    attestation.signatureBase64 = `${attestation.signatureBase64[0] === "A" ? "B" : "A"}${attestation.signatureBase64.slice(1)}`;
    fs.writeFileSync(target, JSON.stringify(attestation));
  }, /signature is invalid/);
  const stray = path.join(bundleRoot, "extra.txt");
  fs.writeFileSync(stray, "not listed");
  assert.throws(() => verifyContractBundle(bundleRoot, publicPem, keyId), /file set differs/);
  fs.rmSync(stray);
  console.log(`Development bundle attestation passed: ${verified.files} files; tamper, wrong-key, duplicate and stray-file cases rejected.`);
} finally {
  const resolved = path.resolve(temporaryRoot);
  const systemTemp = path.resolve(os.tmpdir());
  if (!resolved.startsWith(systemTemp + path.sep) || !path.basename(resolved).startsWith("psdc-attestation-test-")) {
    throw new Error(`Refusing to remove unexpected temporary path: ${resolved}`);
  }
  fs.rmSync(resolved, { recursive: true, force: true });
}
