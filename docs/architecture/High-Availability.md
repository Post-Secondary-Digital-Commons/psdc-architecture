# High Availability


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Architecture Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: architecture

## Purpose and outcome

This document records the accepted availability approach: which components are made highly available, with which accepted tools, and what must be proven first. No availability target has been measured or committed. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for High Availability.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **ARCH-HA-001:** The High Availability capability SHALL provide coherent system boundaries, portable contracts, explicit trust zones, and institution-first federation.
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

### Approach

Availability follows service criticality instead of one platform-wide number: each service owner defines a tier and its SLO (OPS-001). Production starts Kubernetes-first, adding OpenStack only where virtual-machine or bare-metal demand requires it (CLD-002).

### Accepted defaults

| Concern | Accepted default | Gate |
|---|---|---|
| Kubernetes | RKE2 for managed production, K3s for edge and development | Validate before cluster build (CLD-004) |
| CNI | Cilium, Calico as the open exit path | Validate against campus networking (CLD-005) |
| Ingress | Envoy Gateway | Threat and performance test before public APIs (CLD-006) |
| Bare-metal load balancing | MetalLB | Validate before HA ingress (CLD-007) |
| Storage | Ceph on dedicated storage nodes once production begins | Before persistent pilot data (CLD-008) |
| PostgreSQL | Open operator or native automation chosen after a recovery test | Before production database (CLD-009) |
| Valkey | Sentinel versus Cluster by workload | Before distributed cache (CLD-010) |
| Events | NATS JetStream | Exact release before evented workflows (ARC-003) |

### Rules

- **HA-1:** Redundancy is introduced only for a service that has declared a tier; unmeasured redundancy is not claimed.
- **HA-2:** Stateless components are replaceable from source, configuration and signed artifacts; stateful components declare RPO and RTO and prove restore before production.
- **HA-3:** No stretched Layer 2; routed Layer 3 with DNS or service failover (NET-024).
- **HA-4:** HA procurement waits for RPO and RTO by service (OPS-006).

### Gaps

Service tiers, SLOs, RPO and RTO values, node counts and hardware are all undecided. This document supplies the approach and the tool defaults only.

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

