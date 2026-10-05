# Control Plane vs Data Plane


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Architecture Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: architecture

## Purpose and outcome

This document separates the control plane (decisions, records, state transitions) from the data plane (the work and the bytes), and says what must keep working when the control plane is unavailable. The compute fabric is the worked example because its control-plane contracts are executable. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Control Plane vs Data Plane.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **ARCH-CPVDP-001:** The Control Plane vs Data Plane capability SHALL provide coherent system boundaries, portable contracts, explicit trust zones, and institution-first federation.
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

### Control plane

The control plane decides and records. In the compute fabric that is the candidate OpenAPI boundary ([compute-control-plane.openapi.json](../../contracts/compute/compute-control-plane.openapi.json)) over providers, capabilities, workload manifests and classification records, offers, placement decisions, leases and usage receipts, plus the AsyncAPI event surface ([compute-fabric.asyncapi.json](../../contracts/events/compute-fabric.asyncapi.json)). Every state change is an authorized, idempotent, generation-fenced transition on a signed record.

### Data plane

The data plane does the work and moves the bytes: workers executing a leased workload, object storage holding images, models, inputs and results, media delivery, and the ActivityPub delivery edge. Bulk data does not pass through the control plane; records carry digests and references.

### Rules

- **CP-1:** A client obtains identity, authorization, policy and a bounded capability from the
  control plane before using a data-plane endpoint. A client MAY then transfer bytes directly to
  an approved storage, media or inference endpoint through a short-lived scoped token, signed URL
  or mutually authenticated session; it never bypasses the control plane to invent authority.
- **CP-2:** Workers connect outbound to a cell gateway over mutual TLS; there is no unsolicited inbound connection to a lab machine (NET-004 in the [decision register](../governance/Human-Choices-and-Decisions-Register.md)).
- **CP-3:** Leases are time-bounded. A worker MUST self-enforce the signed expiry using a
  monotonic deadline and MUST NOT renew offline. Revocation takes effect when authenticated
  revocation evidence reaches the worker; workloads whose maximum disconnected exposure is too
  high require shorter leases, heartbeats or fail-stop execution rather than an impossible claim
  of instantaneous offline revocation.
- **CP-4:** Control-plane events are delivered at least once. Exactly-once effective handling
  requires a unique inbox key, atomic business-state and inbox commit, a transactional outbox,
  monotonic ordering within the declared scope, and deterministic duplicate responses. Envelope
  fields alone do not provide those guarantees ([Event-Driven Architecture](Event-Driven-Architecture.md)).
- **CP-5:** Authorization and security failures fail closed; low-risk reads may use a documented safe cache.

### Behavior when the control plane is unavailable

New placements pause rather than guess. Already-running leases continue only inside their signed
offline-execution envelope and end no later than expiry; they are not renewed. A worker that has
already received a verified revocation stops according to the revocation policy. Workers retain
encrypted results only for a bounded local TTL and retry upload; local retention is not a durable
recovery guarantee. A job that lacks verified inputs does not start
([Ecosystem Dependency Contract](Ecosystem-Dependency-Contract.md)).

### Transactional invariants required before implementation

- One idempotency key maps to one canonical request digest and one recorded response; reuse with
  different bytes is rejected.
- A placement decision may issue at most one lease lineage. At most one non-terminal lease may
  exist for a workload attempt, enforced transactionally rather than inferred from JSON Schema.
- A state transition compares the expected generation, appends the state change and outbox event,
  and records the idempotency result in one database transaction.
- A usage receipt is unique by `(leaseId, attempt, sequence)`, receipt intervals do not overlap,
  sequence greater than one links the prior receipt digest, and a settlement batch consumes each
  accepted receipt exactly once.
- Projectors are disposable views. Rebuilding a projector cannot reissue a lease, rerun a command,
  duplicate a receipt or submit a second settlement commitment.

### Gaps

The operational schema, uniqueness indexes, isolation level, inbox/outbox transaction, worker
reconciliation protocol, clock-skew envelope and crash/race fixtures are H-004 work and are not
yet designed in detail. The contracts name the invariants but do not currently prove them.

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

