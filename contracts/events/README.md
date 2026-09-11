# Event Contract Profile

> Status: Normative contract profile, version 1

Asynchronous integration uses CloudEvents 1.0 envelopes and AsyncAPI documents.
Required attributes are specversion, id, source, type, subject where applicable,
time, datacontenttype, dataschema, institution, classification, schemaVersion,
correlationId and causationId. Event payloads use versioned JSON Schema.

Producers own schemas and event meaning. Consumers deduplicate by source and ID,
declare ordering scope, handle at-least-once delivery, bound retries, use dead
letters, preserve correlation, and support replay from a documented checkpoint.
Protected data is minimized and encrypted; event authorization is enforced at
publication and consumption.

Breaking payload changes require a new major event type or schema version and a
parallel migration window. The conformance suite covers validation, duplicate,
reorder, replay, expiry, poison event, unavailable consumer, authorization and
classification enforcement.
