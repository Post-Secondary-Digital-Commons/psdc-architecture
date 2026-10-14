import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createHash, createPrivateKey, sign } from "node:crypto";
import { verifyCandidateContents } from "./verify-contract-bundle.mjs";

const [bundleRoot, privateKeyPath, keyId] = process.argv.slice(2);
if (!bundleRoot || !privateKeyPath || !/^[A-Za-z0-9._:-]{3,128}$/.test(keyId ?? "")) {
  throw new Error("Usage: node attest-contract-bundle.mjs <bundle-root> <development-private-key.pem> <key-id>");
}
const target = path.join(bundleRoot, "attestation.json");
if (fs.existsSync(target)) throw new Error("Refusing to overwrite existing attestation");
// Refuse to sign a manifest if any bundled byte already differs from it.
const { manifestBytes: bytes } = verifyCandidateContents(bundleRoot);
const privateKey = createPrivateKey(fs.readFileSync(privateKeyPath));
if (privateKey.asymmetricKeyType !== "ed25519") throw new Error("Development signing key must be Ed25519");
const attestation = {
  kind: "development",
  algorithm: "Ed25519",
  keyId,
  manifestSha256: createHash("sha256").update(bytes).digest("hex"),
  signatureBase64: sign(null, bytes, privateKey).toString("base64")
};
fs.writeFileSync(target, `${JSON.stringify(attestation, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
console.log(JSON.stringify({ kind: attestation.kind, keyId, manifestSha256: attestation.manifestSha256 }));
