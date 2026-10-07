# Session Context Package

> Standard: PSDC-DOC-001
> Document type: contract-specification
> Status: Normative
> Owner: PSDC AI Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0033

## Purpose and scope

The Session Context Package is the model-independent handoff between deliberative
and fast lanes. It conveys the accepted session goal, evidence, constraints,
assumptions, open questions and validity window without exposing a provider KV
cache or hidden chain-of-thought. It is derived context, not authorization.

## Contract and lifecycle

The normative schema is
[`session-context-package.schema.json`](../../contracts/ai/session-context-package.schema.json).

```text
proposed -> accepted -> superseded
                    \-> revoked
                    \-> expired
```

Only an accepted, unexpired, authorized package whose session generation matches
the orchestrator may guide a final response. Supersession is monotonic per
session; concurrent writers use expected generation and one wins.

## Version and owner

Contract major version 1 is owned by PSDC AI Architecture Maintainers. A package
declares `contractVersion` and the schema `$id` is the stable validation identity.

## Requirements

- `AI-CTX-001`: Every package MUST identify institution, session, package, generation, producer, creation, expiry, purpose and classification.
- `AI-CTX-002`: Facts MUST carry evidence references; unsupported material MUST be labelled assumption, hypothesis or unresolved question.
- `AI-CTX-003`: The package MUST enumerate allowed response/task scope and MUST NOT grant tool or data authorization.
- `AI-CTX-004`: A consumer MUST verify integrity, policy version, institution scope, expiry and expected generation before use.
- `AI-CTX-005`: Packages MUST be exportable and deletable under the governing session policy.
- `AI-CTX-006`: Hidden reasoning, raw credentials, secrets and provider-specific KV tensors are prohibited fields.

## Producers, consumers and compatibility

The context compiler is the authoritative producer. Fast dialogue, verifier,
response composer and authorized handoff services are consumers. Additive optional
fields may be introduced within a major version; changing required semantics or
enumerations requires a new major contract and migration window.

## Validation and conformance

AJV validation, positive and adversarial fixtures, generation-race tests,
signature verification and expiry/revocation tests constitute conformance.

## Security, privacy and retention

Package access is scoped to institution, subject and session purpose. Stored
packages are encrypted and integrity protected; evidence references use governed
object identifiers. The institution profile supplies the session retention class.
A revocation tombstone prevents an older replica or restored backup from becoming
current again.

## Failure behavior

Invalid integrity, institution mismatch, missing evidence, expired policy or
generation conflict returns a stable rejection and triggers refresh or escalation.
Consumers MUST NOT silently fall back to an older package.

## Acceptance criteria

- `AI-CTX-ACC-001`: the positive fixture validates and is accepted.
- `AI-CTX-ACC-002`: missing evidence for a declared fact fails schema or semantic validation.
- `AI-CTX-ACC-003`: an expired or superseded package cannot produce an accepted final-response decision.
- `AI-CTX-ACC-004`: export contains the package and evidence references without secrets or KV state.

## References

- [Dual-Lane Adaptive Session Architecture](./Dual-Lane-Adaptive-Session-Architecture.md)
- [Typing and Draft Privacy](../governance/Typing-and-Draft-Privacy.md)
