# AI Contract Profile


> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: none; index governed by repository policy

Clients use the Commons AI Gateway. The portable surface follows OpenAI-compatible
chat, response, embedding, model-list and streaming semantics where those
semantics fit. Native v1 operations add model aliases, capability discovery,
classification-aware routing, policy decisions, tool registration, confirmation,
usage, citations, evaluation metadata and action receipts without leaking provider
credentials or runtime-specific identifiers.

Every request carries institution, subject, purpose, data classification, model
alias, policy version, request ID, limits and optional idempotency key. Streaming
events carry sequence, type, timestamp and terminal status. Errors use the common
problem profile and distinguish policy denial, capacity, model availability,
invalid tool, context limit, timeout, cancellation and upstream failure.

Direct client-to-provider access is prohibited. Implementations pass compatibility,
authorization, quota, cancellation, fallback, prompt-injection, tool-confirmation,
data-routing, usage and provider-substitution tests.

## Purpose

This index explains the purpose and placement of the AI contract domain and links readers to the authoritative session architecture.

## Allowed contents

This directory belongs to `psdc-architecture`. It contains provider-neutral, institution-neutral model, routing, session-context and presentation contracts. Implementations live in `psdc-ai` and clients; this directory contains no runtime.

## Prohibited contents

It MUST NOT contain secrets, credentials, private infrastructure values, unrelated product source, copied institution overrides, or undocumented external dependencies.

## Owner

The owning role is PSDC AI Architecture Maintainers; accountable maintenance remains with RedjiJB until a second maintainer is appointed.

## Contents

- `README.md`
- `session-context-package.schema.json` — model-independent, evidence-bearing session handoff
- `model-route-decision.schema.json` — auditable fast/deliberative/degraded capability route; never compute placement
- `context-refresh-event.schema.json` — generation-checked refresh, cancellation, revocation and failure events
- `presentation-state.schema.json` — separates model generation from client presentation pacing

## Contribution and change control

Changes MUST use a pull request, preserve the repository boundary, update affected links and contracts, and pass the structural and substantive documentation audits before merge.

## References

- [Ecosystem documentation quality standard](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [Repository governance](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/governance/GitHub-Repository-Governance.md)
- [Dual-lane adaptive session architecture](../../docs/ai/Dual-Lane-Adaptive-Session-Architecture.md)
- [ADR-0033](../../docs/architecture/architecture-decision-records/ADR-0033-dual-lane-adaptive-ai-sessions.md)

