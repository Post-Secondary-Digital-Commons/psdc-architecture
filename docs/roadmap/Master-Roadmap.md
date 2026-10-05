# Master Roadmap


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

This roadmap orders the work from a student-led club to mature multi-institution operation. It fixes the phases, the gate each must pass, and what the evidence so far supports. It is a gate sequence, not a calendar. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Master Roadmap.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **ROAD-MR-001:** The Master Roadmap capability SHALL provide dependency-ordered delivery with explicit outcomes, entry and exit criteria, risks, owners, and evidence.
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

### Phase model

| Phase | Name | Purpose |
|---|---|---|
| 0 | Club formation and legitimacy | A recognized, safe, sustainable student organization |
| 1 | Governed contribution environment | Many members can contribute without uncontrolled access to branches, releases, settings or secrets |
| 2 | Architecture and institution alignment | Common versus institution authority, scope and College partnership made explicit |
| 3 | Local development platform and contract foundation | Reproducible environments, automated quality controls, no production dependency |
| 4 | Identity, policy and AI vertical slice | One end-to-end path: discovery, authentication, authorization, AI routing, local inference, usage, observability |
| 5 | Club sandbox and client experience | A bounded learning service for approved participants across web, desktop and mobile |
| 6 | Institution pilot and approved integrations | A time-bounded College-sponsored pilot with approved participants and data classes |
| 7 | Multi-fabric and applied-innovation pilots | Bounded compute, media and spatial, social and applied-innovation verticals |
| 8 | College production transition | College-operated production with sustainable ownership, support and recovery |
| 9 | Cross-institution federation | Exchange of permitted capabilities with a second sovereign institution |
| 10 | Mature ecosystem operation | Sustained operation, upstream contribution, succession and controlled expansion |

The sequence is modelled on the Algonquin reference deployment, whose detailed roadmap controls its own phase claims. This document carries the institution-neutral version.

### Gate control

Each phase has one recorded state: not entered, active, gate review, accepted, rejected, suspended or retired.

- **MR-1:** A gate decision records scope, artifact and configuration versions, evidence links, open risks, exceptions, approving roles and the next permitted phase.
- **MR-2:** A rejected or expired prerequisite returns dependent work to a safe earlier state; it is not waived informally.
- **MR-3:** Exploratory work in a later phase uses synthetic or explicitly approved data and creates no irreversible production dependency.
- **MR-4:** Security, privacy, accessibility, documentation, supply-chain integrity, operations, sustainability and succession apply in every phase.

### Registered launch gates

The decision register fixes: first integrated MVP (identity, gateway, one local model, basic web client, telemetry), compute first milestone (census and telemetry only), media first milestone (asset manifest and one local pipeline), social first milestone (local actor and controlled test peer), a small opt-in pilot cohort, security, reliability, accessibility, support and user-value evidence per phase, compute integration only after identity, sandboxing, preemption and operational tests, Brightspace only after institutional authorization, public federation only after moderation, abuse, media proxy, privacy and incident tests, a named stop and go authority, a second-institution gate before Ontario federation, then three to five institutions, then Canadian expansion (ROAD-001 to ROAD-015 in the [decision register](../governance/Human-Choices-and-Decisions-Register.md)).

### Where the evidence stands

The most recent snapshot for the reference deployment (2026-09-14) records phases 1 and 2 as active and every later phase as not entered. Architecture documentation and contract candidates are extensive, but no self-hosted CI, running service, pilot or College production authorization is recorded. A snapshot reports evidence; it is not a gate approval.

### Gaps

No dates, owners or budgets are set. Phase 10 has no exit evidence defined. The second accountable maintainer, a precondition for production, is not yet appointed.

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

