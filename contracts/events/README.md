# Event Contract Profile


> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-29
> Governing decisions: ADR-0001, ADR-0031

Asynchronous integration uses `event-envelope.schema.json`, a CloudEvents 1.0-compatible
envelope, and `compute-fabric.asyncapi.json`, the candidate AsyncAPI 3.1 channel/message
surface. Required metadata includes institution, classification, schema version, correlation,
causation where applicable, ordering scope, sequence, idempotency key, and expiry where the
event has a bounded useful lifetime. Event data identifies its versioned domain schema; event
metadata must not duplicate protected payload content.

## Purpose

This profile defines the shared asynchronous message boundary by which independently operated
PSDC services and institutions exchange authorized, versioned state-change notifications.

Producers own schemas and event meaning. Consumers deduplicate by source and ID,
declare ordering scope, handle at-least-once delivery, bound retries, use dead
letters, preserve correlation, and support replay from a documented checkpoint.
Protected data is minimized and encrypted; event authorization is enforced at
publication and consumption.

Breaking payload changes require a new major event type or schema version and a
parallel migration window. The conformance suite covers validation, duplicate,
reorder, replay, expiry, poison event, unavailable consumer, authorization and
classification enforcement.

## Delivery and processing semantics

Delivery is at least once. A consumer validates the envelope and declared data schema, verifies
publisher identity and authorization, rejects expired/revoked events, deduplicates by source and
event ID, enforces monotonic sequence within `orderingscope`, commits its state transition and
inbox marker atomically, and acknowledges only afterward. A retry is bounded; a poison event is
quarantined with a privacy-safe error record and operator-visible correlation ID. Exactly-once
transport delivery is not claimed—handlers provide exactly-once *effective* processing.

## Allowed contents

This directory may contain common event envelopes, domain AsyncAPI documents, synthetic
fixtures, compatibility notes, and generated event documentation.

## Prohibited contents

It MUST NOT contain secrets, credentials, private infrastructure values, unrelated product source, copied institution overrides, or undocumented external dependencies.

## Contents

- `event-envelope.schema.json` — common metadata, causality, ordering, replay, and expiry shape;
- `compute-fabric.asyncapi.json` — compute, metering, settlement, ledger, and dispute messages;
- `README.md` — delivery, ownership, and compatibility semantics.

## Contribution and change control

Breaking event meaning, required metadata, authorization scope, ordering, or payload compatibility
requires a new major event type/schema version and a parallel migration window. Changes must add
duplicate, reorder, replay, expiry, poison-message, unavailable-consumer, authorization, and
classification fixtures before release. The current files are D1 candidates, not evidence of a
deployed broker or consumer.

## References

- [Ecosystem documentation quality standard](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [Repository governance](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/governance/GitHub-Repository-Governance.md)

