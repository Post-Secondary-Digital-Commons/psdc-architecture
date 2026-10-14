import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createHash, createPublicKey, verify } from "node:crypto";
import { fileURLToPath } from "node:url";

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

function listFiles(directory, prefix = "") {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Bundle cannot contain symlink: ${relative}`);
    return entry.isDirectory() ? listFiles(absolute, relative) : [relative];
  }).sort();
}

export function verifyCandidateContents(bundleRoot, attested = false) {
  const manifestBytes = fs.readFileSync(path.join(bundleRoot, "manifest.json"));
  const manifest = JSON.parse(manifestBytes);
  if (manifest.releaseStatus !== "candidate-unsigned" || manifest.signatureRequiredForRelease !== true) {
    throw new Error("Unexpected bundle release status");
  }
  if (!Array.isArray(manifest.files) || !/^[a-f0-9]{64}$/.test(manifest.contentRoot)) {
    throw new Error("Malformed bundle manifest");
  }
  if (manifest.manifestVersion !== "1.0" ||
      manifest.contentRootAlgorithm !== "SHA-256 over sorted path NUL digest LF records") {
    throw new Error("Unsupported bundle manifest format");
  }
  const paths = manifest.files.map((entry) => entry?.path);
  if (new Set(paths).size !== paths.length || paths.some((entry) =>
    typeof entry !== "string" || !/^[A-Za-z0-9._/-]+$/.test(entry) || entry.startsWith("/") ||
    entry.split("/").some((part) => part === "" || part === "." || part === ".."))) {
    throw new Error("Unsafe or duplicate bundle path");
  }
  if (paths.some((entry, index) => index > 0 && paths[index - 1] >= entry)) {
    throw new Error("Bundle paths are not in canonical order");
  }
  const expected = [...paths, ...(attested ? ["attestation.json"] : []), "manifest.json"].sort();
  if (JSON.stringify(listFiles(bundleRoot)) !== JSON.stringify(expected)) {
    throw new Error("Bundle file set differs from manifest");
  }
  const records = [];
  for (const entry of manifest.files) {
    const bytes = fs.readFileSync(path.join(bundleRoot, ...entry.path.split("/")));
    const digest = sha256(bytes);
    if (!Number.isSafeInteger(entry.bytes) || entry.bytes < 0 ||
        !/^[a-f0-9]{64}$/.test(entry.sha256) || bytes.length !== entry.bytes || digest !== entry.sha256) {
      throw new Error(`Bundle content differs from manifest: ${entry.path}`);
    }
    records.push(`${entry.path}\u0000${digest}\n`);
  }
  if (sha256(Buffer.from(records.join(""), "utf8")) !== manifest.contentRoot) {
    throw new Error("Bundle content root differs from manifest");
  }
  return { manifestBytes, manifest, files: manifest.files.length, contentRoot: manifest.contentRoot };
}

export function verifyContractBundle(bundleRoot, publicKeyPem, expectedKeyId) {
  const { manifestBytes, files, contentRoot } = verifyCandidateContents(bundleRoot, true);
  const attestation = JSON.parse(fs.readFileSync(path.join(bundleRoot, "attestation.json"), "utf8"));
  if (attestation.kind !== "development" || attestation.algorithm !== "Ed25519" ||
      attestation.keyId !== expectedKeyId || attestation.manifestSha256 !== sha256(manifestBytes) ||
      !/^[A-Za-z0-9+/]{86}==$/.test(attestation.signatureBase64)) {
    throw new Error("Development attestation metadata is invalid");
  }
  const signature = Buffer.from(attestation.signatureBase64, "base64");
  const publicKey = createPublicKey(publicKeyPem);
  if (publicKey.asymmetricKeyType !== "ed25519" || !verify(null, manifestBytes, publicKey, signature)) {
    throw new Error("Development attestation signature is invalid");
  }
  return { files, contentRoot, kind: attestation.kind };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [bundleRoot, publicKeyPath, keyId] = process.argv.slice(2);
  if (!bundleRoot || !publicKeyPath || !keyId) {
    throw new Error("Usage: node verify-contract-bundle.mjs <bundle-root> <development-public-key.pem> <key-id>");
  }
  console.log(JSON.stringify(verifyContractBundle(bundleRoot, fs.readFileSync(publicKeyPath), keyId)));
}
