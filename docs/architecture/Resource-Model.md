# Resource Model


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Architecture Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: architecture

## Purpose and outcome

This document defines how resources are named, owned and referenced: the hierarchy, the ownership rule, and how a reference differs from the thing it points to. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Resource Model.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **ARCH-RM-001:** The Resource Model capability SHALL provide coherent system boundaries, portable contracts, explicit trust zones, and institution-first federation.
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

### Hierarchy and ownership

Resources follow organization, project, environment, resource (ARC-009). Neutral nouns are Institution, Tenant, Subject, Course, ComputeProvider, Node, Cell and Federation (ARC-019). Every record has one owning service; there are no cross-service database reads (ARC-015).

### References

A resource reference is portable and institution-scoped. It does not imply that the object exists or that the caller may access it ([resource-reference contract](../../contracts/common/resource-reference.schema.json)). Records carry references and digests, not embedded copies of other services' data.

### Compute and economics resources

| Resource | Contract | Lifecycle |
|---|---|---|
| Provider | [provider](../../contracts/compute/provider.schema.json) | pending, active, suspended, revoked, retired |
| Capability | [capability](../../contracts/compute/capability.schema.json) | available, draining, unavailable, revoked |
| Workload | [workload manifest](../../contracts/compute/workload-manifest.schema.json) | submitted and classified; the manifest is immutable |
| Offer | [offer](../../contracts/compute/offer.schema.json) | submitted, withdrawn, expired, accepted, rejected |
| Lease | [lease](../../contracts/compute/lease.schema.json) | issued, active, renewal pending, released, expired, revoked, failed |
| Usage receipt | [usage receipt](../../contracts/compute/usage-receipt.schema.json) | measured, failed, disputed, voided |

Resource use is measured in institutional resource units (IRU), non-transferable accounting units ([ADR-0029](architecture-decision-records/ADR-0029-unified-institutional-resource-metering.md)). Lifecycle tables are executable ([state machines](../../contracts/state-machines/lease.machine.json)).

### Rules

- **RES-1:** A finalized record is corrected by a linked record or compensating entry, never mutated.
- **RES-2:** Every state change names an authorization action and carries a reason where the table requires one.
- **RES-3:** Backend-native measurements are preserved even when a common unit is used for accounting.
- **RES-4:** JSON Schema validates record shape, not global uniqueness. The operational store
  enforces one canonical response per idempotency key, one lease lineage per placement decision,
  at most one non-terminal lease per workload attempt, a gap-free unique receipt sequence per
  chain `(leaseId, attempt, meterId)`, a prior digest that names the preceding accepted receipt of
  the same chain, non-overlapping receipt intervals and one settlement consumption per accepted
  receipt.

### Gaps

Organization, project and environment records have no schema yet; only the compute and economics
resources do. The database keys, uniqueness indexes, transaction boundaries and correction links
needed to enforce RES-4 remain H-004 design work.

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

