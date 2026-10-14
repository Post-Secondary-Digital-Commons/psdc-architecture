import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import canonicalize from "canonicalize";

// Conformance model for an at-least-once consumer. Production consumers must
// persist these maps in the same transaction as their domain state mutation.
const root = path.dirname(fileURLToPath(import.meta.url));
const trace = JSON.parse(fs.readFileSync(path.join(root, "events/event-delivery.trace.json"), "utf8"));
const fixture = JSON.parse(fs.readFileSync(path.join(root, "fixtures/positive/event-envelope.fixture.json"), "utf8"));
assert.equal(trace.baseFixture, "../fixtures/positive/event-envelope.fixture.json");
const original = fixture.instance;
const now = Date.parse(trace.observationTime);

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

const subject = consumer();
for (const testCase of trace.cases) {
  assert.equal(subject.receive({ ...original, ...testCase.overrides }), testCase.expected, testCase.id);
}
assert.equal(subject.applied(), trace.expectedAppliedCount);
console.log(`C0 JavaScript event consumer trace passed: ${trace.cases.length} cases, ${subject.applied()} applied.`);
