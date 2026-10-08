import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createPublicKey, verify } from "node:crypto";
import { readAndVerifyBundle } from "./bundle-integrity.mjs";

const [bundleRoot, publicKeyPath, expectedKeyId, expectedContentRoot] = process.argv.slice(2);
if (!bundleRoot || !publicKeyPath || !expectedKeyId || !/^[a-f0-9]{64}$/.test(expectedContentRoot || "")) {
  throw new Error("Usage: node contracts/verify-contract-bundle.mjs <bundle-root> <trusted-public-key-pem> <expected-did-key-id> <expected-content-root-sha256>");
}
const { manifest, canonicalBytes } = readAndVerifyBundle(bundleRoot);
if (manifest.contentRoot !== expectedContentRoot) {
  throw new Error("Candidate bundle content root does not match the consumer pin");
}
const signature = JSON.parse(fs.readFileSync(path.join(path.resolve(bundleRoot), "signature.json"), "utf8"));
if (signature.signatureVersion !== "1.0" || signature.purpose !== "candidate-bundle-attestation-not-release" ||
    signature.algorithm !== "Ed25519" || signature.canonicalization !== "RFC8785" ||
    signature.keyId !== expectedKeyId || !/^[A-Za-z0-9_-]+$/.test(signature.value)) {
  throw new Error("Unsupported or untrusted candidate bundle signature");
}
const publicKey = createPublicKey(fs.readFileSync(publicKeyPath));
if (publicKey.asymmetricKeyType !== "ed25519" ||
    !verify(null, canonicalBytes, publicKey, Buffer.from(signature.value, "base64url"))) {
  throw new Error("Candidate bundle signature verification failed");
}
console.log(JSON.stringify({ contentRoot: manifest.contentRoot, keyId: expectedKeyId, verified: true, releaseAuthorized: false }));
