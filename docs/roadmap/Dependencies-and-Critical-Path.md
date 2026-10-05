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

### Two axes, not one path

The roadmap uses two orderings. **Phases 0 to 10** order institution adoption, authorization and operational readiness ([Master Roadmap](Master-Roadmap.md)). **Waves A to E** order common implementation work, which may proceed with synthetic data before any institution operates it. A wave can be built early and operated late.

| Common wave | Developed with synthetic data | Earliest phase that may operate it | Deployment gate |
|---|---|---|---|
| A: executable contracts, source admission, minimal identity and policy, network lab profile, development KMS profile, operational database with outbox, reproducible environments | Yes | 3 | Contract and development controls |
| B: VS-01, an approved request on an idle lab node settling institutional credits | Yes | 7, for campus operation | Compute owner, sandbox, preemption and safety evidence |
| C: VS-02 to VS-06 (Kubernetes service, OpenStack VM, Slurm HPC job, private hot object, private content distribution) | Yes | 7 or later | Backend-specific and storage-specific gates |
| D: VS-07 and VS-08 (governed federation storage, portable student identity) | Yes | 9 | Peer trust, credential, retention, consent and dispute conformance |
| E: VS-09, client-to-AI session across web, desktop and mobile | Yes | Phase 4 for the minimal web vertical slice; phase 5 for the supported web, desktop and mobile sandbox experience | Identity, gateway, policy and client gates |

This mapping was accepted by the project founder on 2026-10-05 ([ADR-0032](../architecture/architecture-decision-records/ADR-0032-data-plane-gateway-and-two-axis-roadmap.md), register item ROAD-016). It resolves the apparent conflict between "AI and web come before compute" (phase order) and "the compute task is the first implementation slice, the cohesive client session the last" (wave order): both are true on their own axis.

### Critical path for institution readiness

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
storage, compute, media and social pilots
        |
cross-institution conformance and federation
```

Storage is on the path because AI, media and federation evidence depend on encryption, placement, custody, repair, retention and verified deletion (VS-05 to VS-07, covered in [Cloud Service Rollout](Cloud-Service-Rollout.md)). Applied innovation is an institution-bound phase 7 vertical and is not a common dependency.

### Rules

- **DEP-1:** A dependency has an owner, a compatibility expectation and a fallback; an unmet dependency keeps work in the current phase.
- **DEP-2:** No Compute Fabric dependency for AI or media until it meets workload-isolation and operational criteria (ROAD-007).
- **DEP-3:** No public federation before moderation, abuse, media-proxy, privacy and incident tests (ROAD-009).
- **DEP-4:** Backend APIs never become common contracts; the shared contracts stay implementation-neutral.
- **DEP-5:** Child implementation issues cannot change a contract or security boundary without returning to the contract owner ([Implementation Handoff Standard](../standards/Implementation-Handoff-Standard.md)).
- **DEP-6:** A wave built early on synthetic data is never evidence that a phase gate has passed.

### Contract readiness behind the path

The compute and economics boundaries needed by VS-01 exist as contract candidates ([Executable Contract Portfolio](../architecture/Executable-Contract-Portfolio.md)). The operational-state database and transactional outbox that the safe operation of those contracts needs is the next planned implementation work and is not yet designed in detail ([Implementation Handoff Backlog](Implementation-Handoff-Backlog.md)).

### Gaps

No owner is named for any gate, and no calendar exists. VS-02 to VS-09 have outcomes and exit evidence defined but no handoff packets yet. Changing the wave-to-phase mapping requires a superseding ADR.

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

