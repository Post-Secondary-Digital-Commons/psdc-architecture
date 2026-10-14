"""Independent Python model for the synthetic C0 event-delivery trace.

Checks ordering and deduplication, not JSON Schema, general RFC 8785,
broker durability, or authorization. No third-party Python package is required.
"""

import json
import sys
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parent
if sys.version_info < (3, 8):
    raise RuntimeError("Python 3.8 or newer is required")
trace_path = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "events/event-delivery.trace.json"
trace = json.loads(trace_path.read_text(encoding="utf-8"))
if trace["baseFixture"] != "../fixtures/positive/event-envelope.fixture.json":
    raise ValueError("Trace base fixture mismatch")
base = json.loads((ROOT / "fixtures/positive/event-envelope.fixture.json").read_text(encoding="utf-8"))["instance"]
now = datetime.fromisoformat(trace["observationTime"].replace("Z", "+00:00"))


class Consumer:
    def __init__(self):
        self.last_sequence = {}
        self.events_by_id = {}
        self.events_by_key = {}
        self.applied = 0

    def receive(self, event):
        scope = (event["institutionid"], event["source"], event["orderingscope"])
        identity = (event["institutionid"], event["source"], event["id"])
        idempotency = (*scope, event["idempotencykey"])
        # The trace stays in the JCS-safe subset; this checks value equality,
        # but is not a general RFC 8785 implementation.
        value = json.dumps(event, sort_keys=True, ensure_ascii=False, separators=(",", ":"), allow_nan=False)
        if identity in self.events_by_id:
            return "duplicate" if self.events_by_id[identity] == value else "id-conflict"
        if idempotency in self.events_by_key:
            return "duplicate" if self.events_by_key[idempotency] == value else "idempotency-conflict"
        expires = event.get("expiresat")
        if expires and datetime.fromisoformat(expires.replace("Z", "+00:00")) <= now:
            return "expired"
        prior = self.last_sequence.get(scope)
        if prior is not None and event["sequence"] <= prior:
            return "stale"
        if prior is not None and event["sequence"] > prior + 1:
            return "gap"
        self.last_sequence[scope] = event["sequence"]
        self.events_by_id[identity] = value
        self.events_by_key[idempotency] = value
        self.applied += 1
        return "applied"


consumer = Consumer()
for case in trace["cases"]:
    event = {**base, **case["overrides"]}
    actual = consumer.receive(event)
    if actual != case["expected"]:
        raise AssertionError(f"{case['id']}: expected {case['expected']}, got {actual}")
if consumer.applied != trace["expectedAppliedCount"]:
    raise AssertionError(f"Expected {trace['expectedAppliedCount']} applied, got {consumer.applied}")
print(f"C0 Python event consumer trace passed: {len(trace['cases'])} cases, {consumer.applied} applied.")
