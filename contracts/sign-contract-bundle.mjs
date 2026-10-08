import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createPrivateKey, sign } from "node:crypto";
import { readAndVerifyBundle } from "./bundle-integrity.mjs";

const [bundleRoot, privateKeyPath, keyId] = process.argv.slice(2);
if (!bundleRoot || !privateKeyPath || !keyId || !/^did:[a-z0-9]+:[A-Za-z0-9._:%-]+#[A-Za-z0-9._-]+$/.test(keyId)) {
  throw new Error("Usage: node contracts/sign-contract-bundle.mjs <bundle-root> <private-key-pem> <did-key-id>");
}
const { canonicalBytes } = readAndVerifyBundle(bundleRoot);
const key = createPrivateKey(fs.readFileSync(privateKeyPath));
if (key.asymmetricKeyType !== "ed25519") throw new Error("Candidate bundle signing requires Ed25519");
const target = path.join(path.resolve(bundleRoot), "signature.json");
const signature = {
  signatureVersion: "1.0",
  purpose: "candidate-bundle-attestation-not-release",
  algorithm: "Ed25519",
  canonicalization: "RFC8785",
  keyId,
  value: sign(null, canonicalBytes, key).toString("base64url")
};
// Exclusive creation prevents an accidental second signature from replacing reviewed evidence.
fs.writeFileSync(target, `${JSON.stringify(signature, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
console.log(JSON.stringify({ bundleRoot: path.resolve(bundleRoot), keyId, purpose: signature.purpose }));
