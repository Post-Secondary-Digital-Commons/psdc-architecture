# 00 Vision and Mission


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Vision Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose and outcome

This document states what the Post-Secondary Digital Commons is for, who it serves, and how success is judged. It condenses the constitutional vision in [PSDC Platform Vision and Principles](constitutional/PSDC-Platform-Vision-and-Principles.md) and records the founder-accepted decisions behind it; it does not add new commitments. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for 00 Vision and Mission.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **VISION-0VAM-001:** The 00 Vision and Mission capability SHALL provide a durable institution-neutral direction, vocabulary, principles, boundaries, and success model for the Commons.
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

### Mission

Create an open, standards-based Commons through which post-secondary learners, educators, researchers, staff, clubs and developers can safely use and build AI, compute, media, spatial, social and campus-integrated services, without buying fragmented vendor access and without surrendering institutional governance. Algonquin College is the first reference deployment, not a hard-coded tenant ([ADR-0012](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)).

### Who it serves and what they get

- **Students** get a real platform on which to learn cloud, AI, distributed systems, media, federation, security, accessibility and operations, with least-privilege versioned APIs to build on.
- **The institution** gets governed reusable services built from its own knowledge and workflows, local and institution-controlled capacity first, and portable policy-aware hybrid options. The platform complements existing College AI and digital services; it does not duplicate them.
- **The wider community** gets an open developer ecosystem rather than a single chatbot or application.

### Non-negotiable posture

- Standards first; adopt, extend, contribute, fork, then build ([ADR-0001](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)). Original engineering goes into orchestration, integration, policy, user experience, academic intelligence, student services and campus-resource coordination.
- The core is open source and self-hosted, with no mandatory outside vendor ([ADR-0008](../architecture/architecture-decision-records/ADR-0008-open-source-self-hosted-core.md)).
- Every institution keeps sovereign identity, academic data, policy, compute, moderation, keys, infrastructure state, operations and branding. Federation exchanges approved capabilities and references and never widens those authorities silently ([ADR-0013](../architecture/architecture-decision-records/ADR-0013-institution-first-federation-locality.md)).
- Privacy, security, accessibility and student control are architecture inputs, not later reviews.

### Success condition

The platform succeeds when teams can replace an engine, provider, client, storage system or scheduler without rewriting the ecosystem; when users receive coherent institution-branded experiences; and when each institution can govern production without depending on any single student or on a proprietary protocol.

### Constraint on student-led work

Student-led engineering may prototype on authorized resources. Institution-wide production requires College ownership of identity, policy, infrastructure, data, secrets, continuity and support ([ADR-0010](../architecture/architecture-decision-records/ADR-0010-provider-neutral-core-institutional-production-authority.md)).

### Not goals

Replacing every existing College service; creating proprietary versions of solved infrastructure standards; becoming a consumer subscription product (funding is modelled as gross digital-commons funding, not profit, per the [decision register](../governance/Human-Choices-and-Decisions-Register.md)).

### Gaps (not yet decided or evidenced)

- Named institutional authorities and measurable outcomes: the register lists these as implementation-evidence gates, not settled facts.
- The CA$30 per participating student per enrolled month figure is a planning assumption ([ADR-0015](../architecture/architecture-decision-records/ADR-0015-commons-funding-assumption.md)); external approval is outstanding.
- No success metric in this document is measured; there is no running service yet.

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

