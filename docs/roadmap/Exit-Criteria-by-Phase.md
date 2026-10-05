# Exit Criteria by Phase


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

This document lists what evidence a phase must show before it can be accepted. A phase that cannot show its evidence stays where it is. The criteria are observable behaviors, not document completeness. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Exit Criteria by Phase.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **ROAD-ECBP-001:** The Exit Criteria by Phase capability SHALL provide dependency-ordered delivery with explicit outcomes, entry and exit criteria, risks, owners, and evidence.
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

A gate record states its scope, artifact and configuration versions, evidence links, open risks, exceptions, approving roles and the next permitted phase. Every phase also inherits the global stop conditions in [Master Roadmap](Master-Roadmap.md). The decision owner column names who may accept the phase; evidence delivered to anyone else does not accept it.

| Phase | Decision owner | Exit evidence |
|---|---|---|
| 0 | The applicable student-organization authority and the founding officers; this grants no production authority | Recognition or written authorization for the next organizational state; advisor and officer acceptance; membership and conduct documents published; named owners for repository, security and communications administration. Deployment-specific: a recorded decision on how a working group is first organized, which each institution records in its own profile |
| 1 | The accountable maintainer | A new ordinary member cannot push to protected branches, change organization settings, publish a release or read secrets; a maintainer can revoke a member everywhere; a test secret is blocked before push or triggers an incident path; every repository has an owner, license and protected default branch; organization recovery does not depend on an undocumented device. A second maintainer is not needed to leave this phase but is mandatory before production |
| 2 | The architecture maintainer; institution stakeholders acknowledge only activities within their authority | Every first-vertical responsibility has exactly one authority; common and institution documents define no competing contracts; stakeholders have an accurate architecture and risk summary; no document claims institutional approval without evidence; the first vertical can be built with synthetic data and open-source components |
| 3 | The development platform owner and a security reviewer; development use only | A clean workstation reproduces the development environment from reviewed source; CI rejects a schema break, a leaked secret, a prohibited license and a failing test; an artifact traces to source, dependencies and build evidence; development state can be restored; no production account or data is needed |
| 4 | The AI product owner, the development platform owner and a security reviewer; no production claim follows | An authorized test user receives a streamed response; an unauthorized user and a stale token are denied with no model execution; policy or runtime outage produces the specified fail-closed or degraded behavior; protected content is absent from default telemetry; an exact release can be rolled back; measured latency, concurrency and saturation replace estimates |
| 5 | The sandbox owner and the accountable maintainer; institution pilot entry needs separate institution authorization | Supported clients use the same contracts without bypassing the gateway; a lost device and a departed member can be revoked; accessibility scenarios pass; operators recover from one failed release and one dependency outage; quota and saturation behavior are understandable; sandbox data rules pass negative tests |
| 6 | The institution sponsor and pilot service owner, jointly with the applicable identity, academic, security, privacy and accessibility authorities; they close, repeat or advance the pilot | Identity and role lifecycle works without platform-native passwords; the academic adapter cannot reach data outside approved scopes; pilot data is exportable and deletable; incidents and support follow named routes; restore meets pilot objectives; the sponsor accepts outcomes and residual risk; missing a stop criterion triggers rollback |
| 7 | Each fabric pilot owner accepts its own evidence; shared platform owners accept only the dependencies they operate; production still needs institution service ownership | Four separately reviewable evidence packages (compute, media and spatial, social, applied innovation). One fabric's outage does not corrupt another's state; compute runs no workload without valid policy, artifact and lease evidence; media publication cannot bypass rights and moderation; a social peer can be suspended without local loss; applied-innovation source data stays local and access is revoked at project closure; every cross-fabric event is idempotent and attributable; optional fabrics can be removed with export obligations met |
| 8 | The institution service owner and the required institutional authorities; the club cannot self-authorize production | Institution operators can deploy, revoke, restore and retire without the founder; loss of one maintainer does not stop critical operations; restore meets approved RPO and RTO; saturation behavior matches declared policy; production secrets are absent from source and personal devices; rollback is rehearsed with the exact release; user, support and incident responsibilities are publicly understandable |
| 9 | The institution's federation owner and the corresponding peer authority; each domain owner separately approves its exchanged object class | Neither peer gets administrative or database access to the other; prohibited data does not cross; denied and revoked requests fail closed; replayed messages do not duplicate authoritative actions; each peer operates locally through the other's outage and after exit; users can see when a result depends on federation |
| 10 | The institution service owner, using evidence from the technical, security, privacy, accessibility, academic and research, federation and financial owners; maturity is reassessed and is not permanent certification | At least two successful production upgrades and one rollback or forward-recovery exercise; repeated restore evidence against approved objectives; capacity history covering normal and peak periods; incident reviews showing corrective action; a maintainer and operator succession exercise; peer suspension or exit evidence; measurable upstream contribution or documented reasons for local patches; user, accessibility and outcome measures over multiple cycles; a funded plan for the next lifecycle period |

### Slice acceptance rules

A vertical slice is not complete while any applicable criterion lacks recorded evidence (SLICE-ACC-001 to 006 in the [Vertical Slice Completion Plan](Vertical-Slice-Completion-Plan.md)): no proprietary hosted service, public token or public network on the normal path; every backend dependency can be stopped with declared degraded behavior; settlement reconstructable from retained receipts; protected data never reaches a lower-trust provider, ledger, log or fixture; the institution can export state and replace a backend; and a slice stays at pilot status until production evidence and delegated approval exist.

### Gaps

Thresholds (latency, concurrency, RPO, RTO, SLOs) are deliberately absent; they are measured values that come from the earlier phases. The decision owners are roles; each institution names the people and the bodies in its signed deployment profile.

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

