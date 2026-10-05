# Failure Domains


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Architecture Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: architecture

## Purpose and outcome

This document names the failure domains the architecture reasons about and the accepted rule for what happens when one fails. It uses the accepted defaults of one region with explicit zones and cell isolation; measured failure data does not yet exist. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Failure Domains.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **ARCH-FD-001:** The Failure Domains capability SHALL provide coherent system boundaries, portable contracts, explicit trust zones, and institution-first federation.
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

> **Decision status:** Statements directly traced to accepted ADRs, the decision register, or
> constitutional architecture restate existing authority. Any new rule identifier or uncited
> implementation constraint introduced by this draft is a proposal for owner review, not a
> binding decision. It becomes normative only when the accountable owner accepts it through the
> decision register, an ADR, or a released contract. The Gaps section remains explicitly open.

### Domains

| Domain | Accepted default | Source |
|---|---|---|
| Region | Start with one region | ARC-010 |
| Zone | Explicit zones; network zones separate management, control, production, compute and lab, storage, backup, federation, public edge and observability | ARC-010, NET-003 |
| Cell | Compute is organized into cells that isolate failures; a cell reaches the fabric through its own gateway | NET-004, NET-022 |
| Dependency | Each dependency has a class (foundation, capability, asynchronous, external adapter, peer) and a required failure behavior | [Ecosystem Dependency Contract](Ecosystem-Dependency-Contract.md) |
| Institution | Each institution is a sovereign domain; removing every federation peer leaves local capabilities operational | [naming and sovereignty](Federated-Commons-Naming-and-Sovereignty.md) |

### Rules

- **FD-1:** A cross-zone failure closes the affected path; cells isolate; accepted critical paths continue; unsafe new placement pauses (NET-022).
- **FD-2:** Authorization, identity and policy failures fail closed for privileged actions.
- **FD-3:** Optional enrichment (AI, media, federation) failure degrades the feature, not the platform; the fallback is deterministic and documented.
- **FD-4:** A resource whose capability advertisement has expired is unavailable for new
  placement. Provider or capability revocation does not silently mutate leases: the lease
  authority evaluates each affected lease and appends an explicit, signed, reason-coded terminal
  transition, subject to the offline-revocation bound in CP-3.
- **FD-5:** Critical services are placed only inside prequalified reserved pools with failure-domain, data, network, restore and stable-fallback gates (OPS-011).
- **FD-6:** A provider-supplied reason code is an assertion, not settlement or reputation
  authority. Owner reclaim, capacity reclaim and provider-fault treatment require evidence from
  the authoritative lease service, cell controller, meter or policy/trust authority. Ambiguous
  cases remain unattributed or disputed rather than defaulting in the provider's favor.

### Gaps

- No failure-domain map of real hardware exists; there is no inventory yet ([Physical Architecture](Physical-Architecture.md)).
- Failure exercises (chaos and recovery) are scheduled work before production certification (OPS-010), not completed evidence.
- The reason-code registry does not yet encode which actor may assert each code, the required
  evidence type, clock tolerance, or billing/reputation treatment. That is a D2 contract blocker.

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

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

