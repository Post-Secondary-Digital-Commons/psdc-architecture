# 05 Capability Map


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Vision Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose and outcome

This document maps shared capabilities to the fabric that owns them and the fabrics that consume them. It is the quick answer to "who owns this" and "who depends on it". The map is derived from [Cross-Pollination and Shared Capabilities](../architecture/Cross-Pollination-and-Shared-Capabilities.md) and the [Ecosystem Dependency Contract](../architecture/Ecosystem-Dependency-Contract.md). An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for 05 Capability Map.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **VISION-0CM-001:** The 05 Capability Map capability SHALL provide a durable institution-neutral direction, vocabulary, principles, boundaries, and success model for the Commons.
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

### Ownership map

| Capability | Primary owner | Main consumers |
|---|---|---|
| Identity and scopes | Cloud | Every fabric |
| Policy bundles | Cloud with domain teams | AI, Compute, Media, Social |
| Compute jobs | Compute | AI, Media, Social, Cloud |
| AI inference and agents | AI | Academic, Media, Social, Cloud administration |
| Media assets and provenance | Media | AI, Social, academic clients |
| ActivityPub publication | Social | Media, AI |
| Spatial identity | Umbrella contract | Cloud, Compute, AI, Media, Social |
| Events and workflows | Cloud | Every fabric |
| Observability | Cloud | Every fabric |
| SDKs and developer portal | Cloud with product teams | Student developers |
| Academic contracts | Umbrella contract team | AI, agents, clients, institution adapters |
| Data classification and lineage | Domain data owners | Every fabric |
| Federation conformance | Consortium governance and contract team | Every participating institution |
| Resource ledger | Federation governance | Compute, AI, Media, research, finance |
| Communications contracts | Cloud with product teams | Academic, social, operations, agents |

### Rules that keep the map honest

- Assign one primary owner even when several teams contribute.
- Prefer an adapter over importing another subsystem's implementation.
- A decision that constrains two or more fabrics needs a joint ADR.
- Cross-pollination cannot expand a user's permissions or data purpose implicitly.
- Every shared component needs a support and deprecation plan.

### Maturity, honestly stated

Only the compute and economics capabilities have executable contract candidates today (provider, capability, workload, offer, placement, lease, usage receipt, settlement, dispute). They are contract candidates, not running services. The remaining capabilities are specified at architecture level only; many of their detailed specifications are explicit stubs.

### Gaps

No capability in this map has a named production owner, an SLO or a measured capacity; those are implementation-evidence gates in the [decision register](../governance/Human-Choices-and-Decisions-Register.md).

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

