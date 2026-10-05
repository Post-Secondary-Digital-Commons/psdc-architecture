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
| 2 | Architecture and institution alignment | Common versus institution authority, scope and institution partnership made explicit |
| 3 | Local development platform and contract foundation | Reproducible environments, automated quality controls, no production dependency |
| 4 | Identity, policy and AI vertical slice | One end-to-end path: discovery, authentication, authorization, AI routing, local inference, usage, observability |
| 5 | Club sandbox and client experience | A bounded learning service for approved participants across web, desktop and mobile |
| 6 | Institution pilot and approved integrations | A time-bounded institution-sponsored pilot with approved participants and data classes |
| 7 | Multi-fabric and applied-innovation pilots | Bounded compute, media and spatial, social and applied-innovation verticals |
| 8 | Institution production transition | Institution-operated production with sustainable ownership, support and recovery |
| 9 | Cross-institution federation | Exchange of permitted capabilities with a second sovereign institution |
| 10 | Mature ecosystem operation | Sustained operation, upstream contribution, succession and controlled expansion |

The sequence is modelled on the Algonquin reference deployment, whose detailed roadmap controls its own phase claims. This document carries the institution-neutral version; institution-specific bodies and names bind in each institution's deployment profile.

### Two ordering axes

Two sequences appear in the roadmap documents and they answer different questions. The **phases** above order institution adoption, authorization and operational readiness. The **waves A to E** of the [Vertical Slice Completion Plan](Vertical-Slice-Completion-Plan.md) order common implementation work, which may proceed on synthetic data before an institution operates anything. [Dependencies and Critical Path](Dependencies-and-Critical-Path.md) gives the interaction matrix. Neither sequence replaces the other.

### Gate control

Each phase has one recorded state: not entered, active, gate review, accepted, rejected, suspended or retired.

- **MR-1:** A gate decision records scope, artifact and configuration versions, evidence links, open risks, exceptions, approving roles and the next permitted phase.
- **MR-2:** A rejected or expired prerequisite returns dependent work to a safe earlier state; it is not waived informally.
- **MR-3:** Exploratory work in a later phase uses synthetic or explicitly approved data and creates no irreversible production dependency.
- **MR-4:** Security, privacy, accessibility, documentation, supply-chain integrity, operations, sustainability and succession apply in every phase.
- **MR-5:** A phase is accepted only by its named decision owners ([Exit Criteria by Phase](Exit-Criteria-by-Phase.md)). Complete evidence handed to anyone else does not accept a gate, and a club cannot authorize institution production.

### Global stop conditions

Any phase MUST suspend the affected work when:

- authority or funding is withdrawn;
- a critical vulnerability lacks a safe mitigation;
- protected data is processed outside its approved purpose or locality;
- required identity or policy enforcement cannot fail closed;
- recovery evidence fails for authoritative state;
- accessibility blocks an essential user journey;
- the service depends on one departing person or an inaccessible credential;
- a federation peer violates its trust profile; or
- evidence shows likely harm exceeds the approved residual risk.

Suspension preserves evidence, communicates impact, revokes unsafe access, and selects rollback, remediation or retirement through the owning authority. Every pilot, production and federation plan inherits these conditions and may add to them; none may omit one.

### Registered launch gates

The decision register fixes: first integrated MVP (identity, gateway, one local model, basic web client, telemetry), compute first milestone (census and telemetry only), media first milestone (asset manifest and one local pipeline), social first milestone (local actor and controlled test peer), a small opt-in pilot cohort, security, reliability, accessibility, support and user-value evidence per phase, compute integration only after identity, sandboxing, preemption and operational tests, learning-system (LMS) integration only after institutional authorization, public federation only after moderation, abuse, media proxy, privacy and incident tests, a named stop and go authority, a second-institution gate before Ontario federation, then three to five institutions, then Canadian expansion (ROAD-001 to ROAD-015 in the [decision register](../governance/Human-Choices-and-Decisions-Register.md)).

### Where the evidence stands

Latest supplied reference-deployment snapshot: dated 2026-09-14, taken from the Algonquin architecture repository file `docs/roadmap/Algonquin-Club-to-Mature-Ecosystem-Roadmap.md`, an uncommitted working file with SHA-256 `e6424203af0c6a106a0b625a42885f55f8d43ddbb226882caa4ba98ec6a5892a`; reviewed for this document on 2026-10-04. It records phases 1 and 2 as active and every later phase as not entered. It is a report of repository evidence, not a gate approval, and it does not establish institutional evidence outside that repository. Architecture documentation and contract candidates are extensive; no self-hosted CI, running service, pilot or institution production authorization is recorded.

### Scope notes

- Applied innovation is the fourth phase 7 vertical. It is institution-bound: the common work is a project contract adopted before an institution binds it, and its intake, data-use, IP and access-closure rules are defined in the institution's roadmap. It has no common rollout document; see the phase 7 row of [Exit Criteria by Phase](Exit-Criteria-by-Phase.md).
- Storage (VS-05 to VS-07) is covered in the [Cloud Service Rollout](Cloud-Service-Rollout.md).

### Gaps

No dates, owners or budgets are set. Who may invoke a suspension, and who may authorize resumption, are not defined beyond "the owning authority" and the register's named stop and go body (ROAD-012). The second accountable maintainer, a precondition for production, is not yet appointed.

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

