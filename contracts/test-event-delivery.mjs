import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import canonicalize from "canonicalize";

// Conformance model for an at-least-once consumer. Production consumers must
// persist these maps in the same transaction as their domain state mutation.
const root = path.dirname(fileURLToPath(import.meta.url));
const fixture = JSON.parse(fs.readFileSync(path.join(root, "fixtures/positive/event-envelope.fixture.json"), "utf8"));
const original = fixture.instance;
const now = Date.parse("2026-09-29T12:01:00Z");

function consumer() {
  const scopes = new Map();
  const seenIds = new Map();
  const seenKeys = new Map();
  let applied = 0;

  function receive(event) {
    const scope = `${event.institutionid}\u0000${event.source}\u0000${event.orderingscope}`;
    const eventIdentity = `${event.institutionid}\u0000${event.source}\u0000${event.id}`;
    const key = `${scope}\u0000${event.idempotencykey}`;
    const digest = canonicalize(event);
    if (seenIds.has(eventIdentity)) {
      return seenIds.get(eventIdentity) === digest ? "duplicate" : "id-conflict";
    }
    if (seenKeys.has(key)) {
      return seenKeys.get(key) === digest ? "duplicate" : "idempotency-conflict";
    }
    if (event.expiresat && Date.parse(event.expiresat) <= now) return "expired";
    const last = scopes.get(scope);
    if (last !== undefined && event.sequence <= last) return "stale";
    if (last !== undefined && event.sequence > last + 1) return "gap";
    scopes.set(scope, event.sequence);
    seenIds.set(eventIdentity, digest);
    seenKeys.set(key, digest);
    applied += 1;
    return "applied";
  }
  return { receive, applied: () => applied };
}

const next = (sequence, id, idempotencykey) => ({
  ...original, sequence, id, idempotencykey,
});
const consumerA = consumer();
assert.equal(consumerA.receive(original), "applied");
assert.equal(consumerA.receive(original), "duplicate");
assert.equal(consumerA.applied(), 1, "redelivery must not apply twice");

const second = next(2, "26262626-2626-4262-8262-262626262626", "workload-submitted-0002");
const third = next(3, "36363636-3636-4363-8363-363636363636", "workload-submitted-0003");
assert.equal(consumerA.receive(third), "gap", "a future event waits for its predecessor");
assert.equal(consumerA.receive(second), "applied");
assert.equal(consumerA.receive(third), "applied", "retry succeeds after predecessor");
assert.equal(consumerA.receive(second), "duplicate");
assert.equal(consumerA.applied(), 3);

assert.equal(consumerA.receive({ ...second, data: { workloadId: "changed" } }), "id-conflict");
assert.equal(consumerA.receive({ ...next(4, "46464646-4646-4464-8464-464646464646", second.idempotencykey) }), "idempotency-conflict");
assert.equal(consumerA.receive(next(2, "56565656-5656-4565-8565-565656565656", "workload-submitted-0005")), "stale");
assert.equal(consumerA.receive({ ...next(4, "66666666-6666-4666-8666-666666666666", "workload-submitted-0006"), expiresat: "2026-09-29T12:00:59Z" }), "expired");

// Ordering and idempotency are scoped to the producer and institution. Another
// institution does not inherit this consumer's sequence or deduplication state.
assert.equal(consumerA.receive({ ...original, institutionid: "partner.example" }), "applied");
assert.equal(consumerA.applied(), 4);
console.log("C0 event delivery conformance passed: duplicate, conflict, gap, retry, stale, expiry, and institution scope.");
