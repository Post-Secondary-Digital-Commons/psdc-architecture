# 10 Glossary


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Vision Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose and outcome

This glossary defines the terms the architecture uses with a specific meaning. Where a term is a contract record, the definition points to its schema. Terms not listed have their ordinary meaning. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for 10 Glossary.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **VISION-1G-001:** The 10 Glossary capability SHALL provide a durable institution-neutral direction, vocabulary, principles, boundaries, and success model for the Commons.
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

| Term | Meaning |
|---|---|
| Commons / PSDC | The tenant-neutral Post-Secondary Digital Commons framework; Algonquin is its first deployment |
| Fabric | A bounded domain of capability with one owning team and contract surface (cloud, compute, AI, media and spatial, social, plus logical academic, data, developer, communications, research) |
| Institution | A participating college or university that operates a sovereign deployment |
| Overlay | An institution's thin fork that adds branding, endpoints, adapters and policy without changing core logic |
| Federation | Explicit, revocable trust between sovereign deployments to exchange approved capabilities and references, never a shared database or super-administrator |
| Locality ladder | The placement order: device, institution, campus fabric, regional, provincial, Canadian federation, Canadian commercial, global as last resort, otherwise queue or fail |
| Workload envelope | The stated data class, geography, trust, license, egress, retention, cost ceiling, fallback and approval inside which a workload may be placed |
| ACF | Algonquin Campus Compute Fabric, the Algonquin deployment of the Commons Compute Fabric |
| Provider | An institution-operated or partner source of compute capacity ([provider contract](../../contracts/compute/provider.schema.json)) |
| Capability advertisement | A signed, expiring statement of what a resource offers right now ([capability contract](../../contracts/compute/capability.schema.json)) |
| Workload manifest | A signed request describing what to run and its constraints ([workload contract](../../contracts/compute/workload-manifest.schema.json)) |
| Offer | A provider's priced, expiring answer to a workload |
| Placement decision | The recorded choice of offer, with its reasons |
| Lease | A fenced, expiring grant of resources for one workload, with a generation number that rejects stale actors ([lease contract](../../contracts/compute/lease.schema.json)) |
| Usage receipt | Signed measurement of what a lease actually used |
| IRU | Institutional resource unit: a non-transferable accounting unit, not a public token ([ADR-0029](../architecture/architecture-decision-records/ADR-0029-unified-institutional-resource-metering.md)) |
| Settlement batch | A zero-sum set of balance changes over a window, committed to a ledger |
| Preemption | Ending a running lease so the resource can serve a higher-priority or owner need; distinct from revocation for cause |
| Drain | Stopping new leases on a resource ahead of eviction or maintenance, with a grace period |
| ADR | Architecture decision record |
| Stub | A document marked "Stub; not yet specified": generic placeholders only, not a binding specification |
| Contract candidate | A schema or API definition that is validated but not implemented by any service |
| D1 contract-ready | Maturity grade in the [Implementation Handoff Standard](../standards/Implementation-Handoff-Standard.md): the boundary and compatibility behavior are executable as a schema, API or event plus fixtures. It says nothing about whether a service exists |

### Gaps

Some contract-record terms (placement decision, settlement, ledger commitment) are defined only by their schemas; richer prose definitions are pending.

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

