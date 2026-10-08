import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { generateKeyPairSync } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const contractsRoot = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(contractsRoot, "..");
const metadata = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "package.json"), "utf8"));
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "psdc-bundle-signature-test-"));
const keyId = "did:web:institution.example#bundle-test";
let checks = 0;
function run(script, args, shouldPass = true) {
  const result = spawnSync(process.execPath, [path.join(contractsRoot, script), ...args], {
    cwd: repositoryRoot, encoding: "utf8"
  });
  checks += 1;
  if ((result.status === 0) !== shouldPass) {
    throw new Error(`${script} ${shouldPass ? "failed" : "unexpectedly passed"}: ${result.stderr || result.stdout}`);
  }
  return result;
}

try {
  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  const privatePath = path.join(temporaryRoot, "synthetic-private.pem");
  const publicPath = path.join(temporaryRoot, "synthetic-public.pem");
  const otherPublicPath = path.join(temporaryRoot, "wrong-public.pem");
  fs.writeFileSync(privatePath, privateKey.export({ format: "pem", type: "pkcs8" }), { mode: 0o600 });
  fs.writeFileSync(publicPath, publicKey.export({ format: "pem", type: "spki" }));
  const otherKey = generateKeyPairSync("ed25519");
  fs.writeFileSync(otherPublicPath, otherKey.publicKey.export({ format: "pem", type: "spki" }));
  const output = path.join(temporaryRoot, "output");
  run("build-contract-bundle.mjs", [output]);
  const bundle = path.join(output, `${metadata.name}-${metadata.version}`);
  const contentRoot = JSON.parse(fs.readFileSync(path.join(bundle, "manifest.json"), "utf8")).contentRoot;
  const verifyArgs = [bundle, publicPath, keyId, contentRoot];
  run("sign-contract-bundle.mjs", [bundle, privatePath, keyId]);
  run("sign-contract-bundle.mjs", [bundle, privatePath, keyId], false);
  run("verify-contract-bundle.mjs", verifyArgs);
  run("verify-contract-bundle.mjs", [bundle, otherPublicPath, keyId, contentRoot], false);
  run("verify-contract-bundle.mjs", [bundle, publicPath, "did:web:institution.example#other", contentRoot], false);
  run("verify-contract-bundle.mjs", [bundle, publicPath, keyId, "0".repeat(64)], false);
  run("verify-contract-bundle.mjs", [bundle, publicPath, keyId], false);

  const firstFile = path.join(bundle, "contracts", "README.md");
  const original = fs.readFileSync(firstFile);
  fs.appendFileSync(firstFile, "\nmutation");
  run("verify-contract-bundle.mjs", verifyArgs, false);
  fs.writeFileSync(firstFile, original);

  const extra = path.join(bundle, "unexpected.txt");
  fs.writeFileSync(extra, "unlisted");
  run("verify-contract-bundle.mjs", verifyArgs, false);
  fs.unlinkSync(extra);

  const manifestPath = path.join(bundle, "manifest.json");
  const manifest = fs.readFileSync(manifestPath);
  const changed = JSON.parse(manifest.toString("utf8"));
  changed.package.version = "forged";
  fs.writeFileSync(manifestPath, `${JSON.stringify(changed, null, 2)}\n`);
  run("verify-contract-bundle.mjs", verifyArgs, false);
  fs.writeFileSync(manifestPath, manifest);

  const signaturePath = path.join(bundle, "signature.json");
  const signature = fs.readFileSync(signaturePath);
  const forged = JSON.parse(signature.toString("utf8"));
  forged.value = `${forged.value.slice(0, -2)}AA`;
  fs.writeFileSync(signaturePath, `${JSON.stringify(forged, null, 2)}\n`);
  run("verify-contract-bundle.mjs", verifyArgs, false);
  fs.writeFileSync(signaturePath, signature);
  run("verify-contract-bundle.mjs", verifyArgs);

  process.stdout.write(`Candidate bundle signing checks passed: ${checks} build, valid, duplicate-signing, wrong-key, wrong-pin, tamper and undeclared-file cases. No release key used.\n`);
} finally {
  const resolved = path.resolve(temporaryRoot);
  const systemTemp = path.resolve(os.tmpdir());
  if (!resolved.startsWith(systemTemp + path.sep) || !path.basename(resolved).startsWith("psdc-bundle-signature-test-")) {
    throw new Error(`Refusing to remove unexpected temporary path: ${resolved}`);
  }
  fs.rmSync(resolved, { recursive: true, force: true });
}
