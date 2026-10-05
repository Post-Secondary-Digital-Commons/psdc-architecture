# 04 Platform Taxonomy


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Vision Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose and outcome

This document classifies the platform: fabrics, the cloud service domains inside Commons Cloud, and the rule for deciding where a capability belongs. It follows [Commons Cloud Service Taxonomy v1](constitutional/Commons-Cloud-Service-Taxonomy-v1.md) and the fabric model in the constitutional architecture. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for 04 Platform Taxonomy.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **VISION-0PT-001:** The 04 Platform Taxonomy capability SHALL provide a durable institution-neutral direction, vocabulary, principles, boundaries, and success model for the Commons.
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

### Fabrics and owners

| Fabric | Primary responsibilities |
|---|---|
| Cloud and service | Identity broker, policy, APIs, events, data services, storage, secrets, observability, delivery platform |
| Compute | Enrollment, trust, capability discovery, scheduling, preemption and accounting for dedicated and opportunistic resources |
| AI and agent | Gateway, models, routing, RAG, evaluations, agent tools and AI clients |
| Media and spatial | Image, audio, video, 3D, 4DGS, provenance, transformation and delivery |
| Social | Fediverse actors, social, photos, video, communities, blogs, moderation and ActivityPub federation |
| Academic | Provider-neutral course, enrolment, content and assessment contracts with local authoritative adapters |
| Data | Classification, sovereignty, catalogs, lineage, authorized exchange and lifecycle policy |
| Developer | Forge, CI, registry, SDKs, templates, sandbox and service catalog |
| Communications | Notifications, messaging and approved institutional channel adapters |
| Research and innovation | Reproducible environments, data and model manifests, compute grants and publication lineage |

### Commons Cloud service domains

Access edge; identity; organization (projects, tenants, quotas); catalog; provisioning; compute services (VMs, containers, batch, managed Kubernetes, accelerators, serverless); storage (object, block, file, backup, archive); network; data services (relational, cache, vector, search, lake); integration (events, queues, workflows); security (secrets, KMS, PKI, artifact signing); observability; developer services; and hybrid or federation brokerage. Each domain uses standard interfaces and adopted platforms rather than custom implementations.

### Placement rule

A capability belongs in Commons Cloud only when at least two ecosystems need the same non-domain-specific behavior and centralized operation materially improves security, reliability, governance or efficiency. Shared code alone is not enough; product-specific semantics stay with the owning fabric.

### Classification dimensions used elsewhere

- **Data classification:** public, internal, confidential, restricted, regulated (the values in the shared contract definitions).
- **Backend kind:** task, kubernetes, openstack, slurm.
- **Trust tier:** development, pilot, production, federated.
- **Workload class:** opportunistic task, independent task graph, parameter sweep, container service, VM, HPC MPI, AI inference, AI service, critical service.

### Gaps

The taxonomy defines no service-level tier per service; the register leaves service tiers and SLOs to each service owner (OPS-001).

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

