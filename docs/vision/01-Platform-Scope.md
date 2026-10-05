# 01 Platform Scope


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Vision Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose and outcome

This document draws the boundary of the platform: which capabilities are in scope, which are deliberately outside it, and the order in which scope is proven. Boundaries come from the constitutional architecture and the accepted decisions; they are not an implementation commitment. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for 01 Platform Scope.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **VISION-0PS-001:** The 01 Platform Scope capability SHALL provide a durable institution-neutral direction, vocabulary, principles, boundaries, and success model for the Commons.
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

### In scope

The platform covers ten logical fabrics. Five are the immediate delivery units, each with its own repository; five are recognized logical boundaries that compose existing services until independent ownership or deployment evidence justifies a new repository ([Consolidated Ecosystem Architecture](../architecture/Consolidated-Ecosystem-Architecture.md)).

| Fabric | Repository | Status of boundary |
|---|---|---|
| Cloud and service | `psdc-cloud` | Delivery unit |
| Compute | `psdc-compute` | Delivery unit |
| AI and agent | `psdc-ai` | Delivery unit |
| Media and spatial | `psdc-media` | Delivery unit |
| Social | `psdc-social` | Delivery unit |
| Academic, Data, Developer, Communications, Research and innovation | none yet | Logical boundary |

Client products (`psdc-web`, `psdc-desktop`, `psdc-mobile`), the shared contracts and decision records (`psdc-architecture`), and the deployment template (`psdc-deployment-template`) complete the repository set. Each institution adds thin fork repositories for branding, endpoints and policy ([ADR-0022](../architecture/architecture-decision-records/ADR-0022-polyrepo-ecosystem-with-package-workspaces.md), [ADR-0023](../architecture/architecture-decision-records/ADR-0023-institution-organization-fork-model.md)).

### Out of scope

- Replacing every existing College service.
- Creating proprietary versions of solved infrastructure standards.
- Implementation-specific values: hostnames, credentials, physical capacity, named operators and legal approvals belong to signed institution deployment manifests.
- Cloud-fabric ownership of academic behavior, AI prompts and agents, media semantics, social feeds, federation moderation and compute-worker internals ([cloud taxonomy](constitutional/Commons-Cloud-Service-Taxonomy-v1.md)).

### Scope is proven in stages

1. Build and operate one Algonquin vertical slice.
2. Prove sovereign deployment and neutral contracts with a second institution.
3. Validate federation with three to five Ontario institutions.
4. Expand only after privacy, security, accessibility, operations, economics and governance evidence is repeatable.
5. Pursue Ontario-wide and then Canadian participation without centralizing local authority.

The register records the same gates as ROAD-013 to ROAD-015 ([decision register](../governance/Human-Choices-and-Decisions-Register.md)).

### First milestones by fabric

The register fixes only the first milestone for each: a gateway-based AI MVP (identity, gateway, one local model, a basic web client, telemetry), census and telemetry for compute, an asset manifest and one local pipeline for media, and a local actor with a controlled test peer for the social fabric.

### Gaps

- Scope for the five logical fabrics is stated as a boundary only; none has a repository, owner or contract beyond the shared profiles.
- Participating institutions beyond Algonquin are not yet named.

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

