# AI Rollout


> Standard: PSDC-DOC-001
> Document type: roadmap
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Roadmap Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: roadmap

> **Decision status:** Statements directly traced to accepted ADRs, the decision register, or
> the constitutional architecture restate existing authority. Any new rule identifier, ordering
> or uncited constraint introduced by this draft is a proposal for owner review, not a binding
> decision. It becomes normative only when the accountable owner accepts it through the decision
> register, an ADR, or a released contract. The Gaps section remains explicitly open.

## Purpose and outcome

This document orders the AI fabric's delivery: the first integrated MVP, what follows it, and the decisions each step waits on. It rests on the accepted AI defaults in the decision register. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for AI Rollout.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **ROAD-AR-001:** The AI Rollout capability SHALL provide dependency-ordered delivery with explicit outcomes, entry and exit criteria, risks, owners, and evidence.
- The capability SHALL have a versioned configuration schema, explicit safe
  defaults, validation before activation, and a reversible change procedure.
- User-visible and administrative behaviour SHALL be accessible, explainable,
  auditable, and bounded by institution policy and user authority.
- An implementation SHALL expose only the minimum capability required by its
  callers and SHALL reject unknown, unauthorized, malformed, expired, or
  unsupported requests with stable machine-readable errors.
- Institution deployments SHALL be independently operable and SHALL remain
  compatible with the common contract and conformance suite.

## Subject-specific specification

### First step: the integrated MVP

The accepted first MVP is identity (Keycloak), the gateway, one local model, a basic web client and telemetry (ROAD-001). It maps to phase 4: an authorized user receives a streamed response, an unauthorized user or stale token is denied with no model execution, and outages produce specified fail-closed or degraded behavior ([Exit Criteria by Phase](Exit-Criteria-by-Phase.md)).

### Accepted defaults the rollout builds on

| Concern | Default | Gate |
|---|---|---|
| Gateway | Python and FastAPI for the MVP; Go only after measured data-plane pressure | Exact release before coding (AI-001) |
| API surface | Publish exact OpenAI-compatible endpoints, fields, streaming and errors; native Commons API starts with identity, usage, projects, policies and tools | Before client integration and API lock (AI-002, AI-003) |
| Inference engines | vLLM for production, SGLang as alternative, llama.cpp for local and edge | Exact releases before the model pilot (AI-004) |
| Model aliases | Four alias roles: fast, general, reasoning and code. The register names them with the Algonquin `AC` prefix; common documents use the roles and each institution binds its own names. Models are chosen by open license, evaluation, hardware, safety and cost | Before the user pilot (AI-005, AI-006) |
| Routing | Local-preferred, sensitive classes local-only; proprietary cloud inference disabled | Before a second backend (AI-008, AI-009) |
| Content retention | Prompts and responses off or minimized; telemetry without prompt content | Before logging content (AI-011, AI-012) |
| Knowledge | PostgreSQL with pgvector first, with authorized sources and visible citations | Before the knowledge service and RAG pilot (AI-013, AI-014) |
| Agents and tools | Reviewed tool registry; read, propose, confirm, execute tiers; user-controlled memory | Before agents (AI-016 to AI-018) |
| Academic use | Aligned with the institution's assessment policy and faculty controls | Before course use (AI-020) |
| Web client | `psdc-web`, gated bootstrap from verified Open WebUI v0.6.5 source | ADR-0009 |

### Order after the MVP

1. Evaluation framework and release thresholds, before alias changes (AI-015).
2. Quotas based on evidence (AI-010).
3. Knowledge and RAG, then the tool registry, then agents with confirmation tiers.
4. Academic and campus adapters after institutional authorization (ROAD-008); AI does not scrape the learning system.
5. Compute-fabric routing only after identity, sandboxing, preemption and operational tests (ROAD-007).

### Gaps

No model has been selected: the first exact openly licensed release comes from hardware evidence (decision queue item 7). Latency, concurrency and quota figures are unmeasured. Model license rules (AI-007) are undecided.

## Interfaces, APIs, events, and contracts

See the [Ecosystem Dependency Contract](../architecture/Ecosystem-Dependency-Contract.md); local extensions remain normative.

## Dependencies and ownership boundaries

Inherits [baseline ownership controls](../architecture/Cross-Cutting-Architecture-Requirements.md#ownership-and-dependency-boundaries).

## Data, state, residency, and retention

Inherits [baseline data controls](../architecture/Cross-Cutting-Architecture-Requirements.md#security-privacy-and-data); local extensions remain normative.

## Security, privacy, safety, and compliance

Inherits [baseline data controls](../architecture/Cross-Cutting-Architecture-Requirements.md#security-privacy-and-data); local extensions remain normative.

## Deployment, environments, and configuration

Inherits [baseline deployment controls](../architecture/Cross-Cutting-Architecture-Requirements.md#deployment-and-configuration).

## Capacity, scaling, cost, and sustainability

Inherits [baseline capacity controls](../architecture/Cross-Cutting-Architecture-Requirements.md#capacity-and-overload).

## Failure, recovery, and compatibility

Inherits [baseline reliability controls](../architecture/Cross-Cutting-Architecture-Requirements.md#reliability-and-compatibility); local extensions remain normative.

## Observability, testing, and operational readiness

Inherits [baseline evidence controls](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence).

## Standards and implementation strategy

Follows adopt, extend, fork, then build ([ADR-0001](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)).

## Settled architecture constraints

The accepted constraints are the ADRs listed below and the precedence rules in [Architecture Authority and Precedence](../architecture/Architecture-Authority-and-Precedence.md).

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Acceptance criteria

Inherits [baseline acceptance gates](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence); every local requirement MUST also pass.

## Outcome

The roadmap outcome is a usable vertical slice with stable contracts, operational ownership, and evidence sufficient to start the next phase.

## Dependencies

Dependencies are phase gates, not suggestions. Each dependency has an owner, compatibility expectation, and fallback; unmet dependencies keep work in the current phase.

## Phase

Each numbered phase defines the capability and evidence to produce. Phase work MUST preserve the documented order unless a superseding ADR records the change.

## Exit criteria

Exit criteria include passing tests, security/privacy review, operator runbook, rollback rehearsal, and accountable ownership for the next dependency.

## Risk

Risks include lock-in, authority escalation, privacy leakage, upstream drift, capacity, and contract instability. Mitigations and residual risk are recorded with the phase.

## Evidence

Evidence includes contract tests, threat/privacy reviews, provenance/SBOM, capacity/failure results, runbooks, approvals, and a signed phase decision.

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

