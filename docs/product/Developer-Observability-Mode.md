# Developer Observability Mode

> Standard: PSDC-DOC-001
> Document type: product-specification
> Status: Normative
> Owner: PSDC Developer Experience and Operations Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0033

## Purpose and scope

Developer mode explains how a session was routed and executed without exposing
hidden chain-of-thought or expanding data authority. It supports debugging,
capacity analysis, evaluation and teaching. It is not an administrator bypass.

## Users, stakeholders and scope

Users are developers, operators, evaluators, instructors and authorized end users
inspecting their own session. The scope is explainable execution metadata and
support-safe export; infrastructure mutation and unrestricted log search are out
of scope.

## Information architecture and requirements

- `DEV-OBS-001`: the view MUST show trace, session generation, route decision, selected capability/model aliases and policy outcome.
- `DEV-OBS-002`: it MUST show queue, TTFT, inter-token latency, total duration, cache class/hit, tool state and resource receipt when available.
- `DEV-OBS-003`: every evidence reference MUST identify source, version, freshness and authorization scope.
- `DEV-OBS-004`: the view MUST redact prompts, secrets, credentials, protected tool outputs, raw hidden reasoning and data outside viewer authorization.
- `DEV-OBS-005`: exported traces MUST carry classification, retention, redaction version and content digest.
- `DEV-OBS-006`: users MUST be able to copy a support-safe trace bundle without copying protected conversation content.

## Failure, accessibility and privacy

Missing telemetry is displayed as unknown, not zero. Partial traces preserve the
last verified state. Tables and timelines have keyboard and screen-reader
equivalents, never rely solely on color, and support reduced motion. Opening the
view creates an auditable access event when protected metadata is revealed.

## Acceptance scenarios

- `DEV-OBS-ACC-001`: a route can be reconstructed from trace data without database access.
- `DEV-OBS-ACC-002`: redaction fixtures prove secrets and raw prompts are absent from a support bundle.
- `DEV-OBS-ACC-003`: a non-privileged user sees only their authorized session metadata.
- `DEV-OBS-ACC-004`: an incomplete trace is visibly incomplete and cannot be mistaken for proof of a missing action.

## References

- [OpenTelemetry Standard](../operations/OpenTelemetry-Standard.md)
- [Minimal Conversation Experience](./Minimal-Conversation-Experience.md)
