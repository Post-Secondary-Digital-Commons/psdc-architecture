# 03 Reference Architecture


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Vision Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose and outcome

This document is the one-page reference architecture: the layers, the dependency direction, the shared contracts and a representative request flow. It summarizes [PSDC Platform Reference Architecture](constitutional/PSDC-Platform-Reference-Architecture.md); the dependency rules here are binding and the detail lives in the linked documents. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for 03 Reference Architecture.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **VISION-0RA-001:** The 03 Reference Architecture capability SHALL provide a durable institution-neutral direction, vocabulary, principles, boundaries, and success model for the Commons.
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

### Layers

| Layer | Responsibility |
|---|---|
| Institution experience | Local branding, portals, policy, authoritative adapters, data and operations |
| Reusable commons | Tenant-neutral software, contracts, SDKs, reference infrastructure and test suites |
| Federation | Explicit trust, discovery, routing, exchange, settlement and conformance across sovereign deployments |

### Runtime shape

```text
users, developers, administrators, institutions, federated peers
                          |
          web / desktop / mobile / CLI / SDK
                          |
   Commons Cloud Fabric: identity | policy | catalog | events | observability
                          |
   +----------------------+----------------------+
   |                      |                      |
 Compute Fabric       AI Fabric        Media and Spatial Fabric
   +----------------------+----------------------+
                          |
                   Social Fabric (ActivityPub boundary)
```

Commons Cloud owns common platform capabilities, not product business logic. Each fabric owns one bounded domain and integrates through contracts. The umbrella repository owns cross-system contracts and constitutional decisions and is not a runtime service.

### Shared contracts every integration relies on

Identity references and authorization context; a CloudEvents-compatible event envelope; API versioning, error, idempotency and pagination conventions; AI model aliases and inference requests; compute capabilities, jobs, preemption and accounting; media assets and provenance; ActivityPub profiles; spatial identifiers; and institution-signed client deployment manifests. The compute-fabric subset now exists as executable contract candidates ([Executable Contract Portfolio](../architecture/Executable-Contract-Portfolio.md)).

### Representative request flow

A client authenticates through institutional OIDC. Commons Cloud resolves the route and propagates identity, policy and trace context. The owning product validates authorization and data classification, then runs the work locally or through an adapter to an approved backend. Durable state stays in the owning service and large artifacts go to object storage. Events use the versioned envelope; telemetry follows OpenTelemetry; public federation passes only through the Social Fabric.

### Dependency rules

- No cross-repository private imports or database access.
- No client-to-model-provider, client-to-directory, client-to-LMS, client-to-worker or client-to-storage bypass.
- No Compute Fabric dependency until it meets workload-isolation and operational criteria.
- No public federation before moderation and security readiness.
- Every optional dependency defines timeout, fallback, queueing and recovery.
- No federation peer becomes a local identity, LMS, policy, database, secrets or infrastructure-state authority.

The full dependency classes and failure behavior are in the [Ecosystem Dependency Contract](../architecture/Ecosystem-Dependency-Contract.md).

### Gaps

Physical topology, sizing, final product selection and production approval are deliberately outside this reference architecture ([Physical Architecture](../architecture/Physical-Architecture.md) records what is decided).

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

