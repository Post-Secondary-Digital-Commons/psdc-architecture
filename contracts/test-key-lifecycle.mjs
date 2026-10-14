import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createPublicKey, verify } from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const vectors = JSON.parse(fs.readFileSync(path.join(root, "vectors/key-lifecycle.vectors.json"), "utf8"));
const spkiPrefix = Buffer.from("302a300506032b6570032100", "hex");

for (const vector of vectors.cases) {
  assert.match(vector.publicKeyHex, /^[a-f0-9]{64}$/, `${vector.id}: public key format`);
  assert.match(vector.signatureHex, /^[a-f0-9]{128}$/, `${vector.id}: signature format`);
  const key = createPublicKey({ key: Buffer.concat([spkiPrefix, Buffer.from(vector.publicKeyHex, "hex")]), format: "der", type: "spki" });
  const cryptographicallyValid = verify(null, Buffer.from(vector.payloadUtf8, "utf8"), key, Buffer.from(vector.signatureHex, "hex"));
  const time = Date.parse(vector.verificationTime);
  const start = Date.parse(vector.notBefore);
  const end = Date.parse(vector.notAfter);
  const revoked = vector.revokedAt ? Date.parse(vector.revokedAt) : Number.POSITIVE_INFINITY;
  assert.ok([time, start, end, revoked].every((value) => !Number.isNaN(value)), `${vector.id}: invalid timestamp`);
  assert.ok(start < end, `${vector.id}: invalid key interval`);
  const mayAuthorize = cryptographicallyValid && start <= time && time < end && time < revoked;
  assert.equal(cryptographicallyValid, vector.expectedCryptographicValidity, `${vector.id}: cryptography`);
  assert.equal(mayAuthorize, vector.expectedNewAuthorization, `${vector.id}: new authorization eligibility`);
}

console.log(`C0 key lifecycle vectors passed: ${vectors.cases.length} synthetic rotation, retirement, revocation and wrong-key cases.`);
