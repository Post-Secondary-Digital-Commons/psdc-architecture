# Dependencies and Critical Path


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

This document states what must come before what. Dependencies are gates: if one is unmet, work stays in the current phase. The order below follows the vertical-slice plan and the implementation-readiness sequence. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Dependencies and Critical Path.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **ROAD-DACP-001:** The Dependencies and Critical Path capability SHALL provide dependency-ordered delivery with explicit outcomes, entry and exit criteria, risks, owners, and evidence.
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

### Critical path

```text
governance and self-hosted CI
        |
identity + policy + contracts
        |
AI gateway + local inference + telemetry
        |
web vertical slice
        |
desktop host + mobile relay
        |
academic and campus adapters
        |
compute, media and social pilots
        |
cross-institution conformance and federation
```

### Waves for the vertical slices

| Wave | Content | Why here |
|---|---|---|
| A | Executable contracts, source-admission records, minimal identity and policy, network lab profile, development KMS profile, operational PostgreSQL with outbox, reproducible environments | Authority and boundaries before any feature |
| B | VS-01, an approved request running on an idle lab node and settling institutional credits | Exercises the platform's distinctive value (sovereign provider registration, placement, opportunistic execution, metering, settlement) without production Kubernetes, OpenStack, Slurm or protected student data |
| C | VS-02 to VS-06: long-running Kubernetes service, OpenStack VM, Slurm HPC job, private hot object, private content distribution | Reuse the lease, receipt, evidence and settlement contracts; adapters cannot bypass classification or policy |
| D | VS-07 and VS-08: governed federation storage, portable student identity | Begin only after trust, credential, gateway, retention and dispute contracts pass independent conformance |
| E | VS-09: client-to-AI session across web, desktop and mobile | Consumes stable identity, gateway, policy and session contracts; creates no second authority |

### Rules

- **DEP-1:** A dependency has an owner, a compatibility expectation and a fallback; an unmet dependency keeps work in the current phase.
- **DEP-2:** No Compute Fabric dependency for AI or media until it meets workload-isolation and operational criteria (ROAD-007).
- **DEP-3:** No public federation before moderation, abuse, media-proxy, privacy and incident tests (ROAD-009).
- **DEP-4:** Backend APIs never become common contracts; the shared contracts stay implementation-neutral.
- **DEP-5:** Child implementation issues cannot change a contract or security boundary without returning to the contract owner ([Implementation Handoff Standard](../standards/Implementation-Handoff-Standard.md)).

### Contract readiness behind the path

The compute and economics boundaries needed by VS-01 exist as contract candidates ([Executable Contract Portfolio](../architecture/Executable-Contract-Portfolio.md)). The operational-state database and transactional outbox that the safe operation of those contracts needs is the next planned implementation work and is not yet designed in detail ([Implementation Handoff Backlog](Implementation-Handoff-Backlog.md)).

### Gaps

No owner is named for any gate, and no calendar exists. VS-02 to VS-09 have outcomes and exit evidence defined but no handoff packets yet.

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

