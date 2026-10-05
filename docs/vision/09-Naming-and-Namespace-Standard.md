# 09 Naming and Namespace Standard


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Vision Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose and outcome

This document fixes the names the platform uses, and the rule that shared names are institution-neutral. It follows [Federated Commons Naming and Sovereignty](../architecture/Federated-Commons-Naming-and-Sovereignty.md) (ADR-0020) and the naming rows of the decision register. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for 09 Naming and Namespace Standard.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **VISION-0NANS-001:** The 09 Naming and Namespace Standard capability SHALL provide a durable institution-neutral direction, vocabulary, principles, boundaries, and success model for the Commons.
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

### Canonical names

| Concept | Canonical name | Algonquin deployment name |
|---|---|---|
| Complete framework | Post-Secondary Digital Commons (PSDC) | Algonquin Digital Platform |
| Shared service foundation | Commons Cloud Fabric | AC Cloud |
| Compute orchestration | Commons Compute Fabric | ACF Campus Compute Fabric |
| AI and agent services | Commons AI Fabric | AC AI |
| Media and spatial services | Commons Media and Spatial Fabric | AC Media Fabric |
| Social products and ActivityPub edge | Commons Social Fabric | AC Fediverse |

### Rules

- **N-1:** Shared schemas, API names, package namespaces, deployment variables and user-facing defaults are institution-neutral. Algonquin names may appear only in the Algonquin overlay, deployment documentation, examples explicitly labelled as Algonquin, and repository paths retained for migration.
- **N-2:** Neutral resource nouns are Institution, Tenant, Subject, Course, ComputeProvider, Node, Cell and Federation (register item ARC-019).
- **N-3:** Resource hierarchy is organization, project, environment, resource (ARC-009).
- **N-4:** Internal service names follow service.environment.institution, with local Kubernetes DNS beneath it. Contracts use stable service names, never IP addresses (NET-006, NET-007).
- **N-5:** Contract identifiers use the form `urn:psdc:contracts:<domain>:<name>:<major>`; the current candidates use the major version `1`.
- **N-6:** Repositories use `psdc-<area>` in the Commons organization and `<institution>-<area>` in an institution organization; each institution repository tracks its Commons repository as `upstream` ([ADR-0023](../architecture/architecture-decision-records/ADR-0023-institution-organization-fork-model.md)).

### Standalone requirement

A deployment must be installable, operable, backed up, restored, upgraded and exited without an Algonquin account, network connection, control plane, signing key, DNS zone, identity provider, database, relay or administrator.

### Gaps

- Package namespace names for published SDKs and OCI image paths are not fixed.
- Institution identifier and DNS domain conventions are deployment values and are decided per institution.

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

