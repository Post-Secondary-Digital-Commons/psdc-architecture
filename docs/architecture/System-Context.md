# System Context


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Architecture Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: architecture

## Purpose and outcome

This document shows what sits inside the platform boundary, who uses it, and which outside systems it touches. It is the outermost view; every other architecture document zooms into part of it. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for System Context.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **ARCH-SC-001:** The System Context capability SHALL provide coherent system boundaries, portable contracts, explicit trust zones, and institution-first federation.
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

### People and organizations around the platform

- **Students, educators, researchers and staff** use institution-branded web, desktop, mobile and command-line clients.
- **Clubs and student developers** build on the platform through least-privilege, versioned APIs. They may run approved non-production environments; the institution authorizes production.
- **Platform and institution operators** run the deployment. Production needs a named College owner and a College-owned support rota; students are not the sole responders (register items OPS-004, ROAD-011).
- **Federated peers** are other sovereign institutions, trusted only for explicitly negotiated capabilities, scopes, data classes and time periods.

### Outside systems

| System | Relationship | Failure effect |
|---|---|---|
| Institutional identity provider (College-approved, for example Entra) | External adapter, authoritative for institutional login in production | Institutional login reports an upstream outage; local and test environments continue |
| Institution LMS (for example Brightspace) | External adapter through the provider-neutral academic contract; supported interfaces only, no scraping | Academic features degrade; core and other fabrics continue |
| External model providers | Optional adapter, disabled by default | Never required for core operation |
| Notification channels (email, SMS, push) | Adapter or capability | Queue, retry or offer in-app delivery |
| Fediverse peers | Federation peer over ActivityPub | Local use continues; delivery retries under local moderation policy |
| Federated compute peers | Federation peer over capability, envelope, artifact and ledger contracts | Continue locally, try the next permitted tier, queue or fail |

### The boundary

```text
 users, developers, operators            federated peers
              \                              /
        institution-branded clients     federation gateway
                       \                  /
              PSDC deployment (one institution)
   Cloud | Compute | AI | Media and Spatial | Social
                       |
   institutional IdP, LMS, notification channels (adapters)
```

Everything inside the deployment is operated, backed up, restored and exited by the institution without depending on any other institution or on a central Commons service ([naming and sovereignty](Federated-Commons-Naming-and-Sovereignty.md)).

### What crosses the boundary by default

Capability descriptions, bounded compute jobs, signed container, model and media manifests, public or explicitly shared research artifacts, ActivityPub activities governed by each social node, coarse usage and accounting events, and conformance results. Raw identity directories, LMS databases, private vector stores, prompt histories, precise location, tokens, student work, unrestricted telemetry, secrets, keys and infrastructure state do not cross by default.

### Gaps

Named institutional operators, the production identity-provider claim model and the pilot population are decisions awaiting external authority ([decision register](../governance/Human-Choices-and-Decisions-Register.md)).

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

