# Cloud Service Rollout


> Standard: PSDC-DOC-001
> Document type: roadmap
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Roadmap Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: roadmap

> **Decision status:** Statements directly traced to accepted ADRs, the decision register, or
> the constitutional architecture restate existing authority. Any new rule identifier, ordering
> or uncited constraint introduced by this draft is a proposal for owner review, not a binding
> decision. It becomes normative only when the accountable owner accepts it through the decision
> register, an ADR, or a released contract. The Gaps section remains explicitly open.

## Purpose and outcome

This document orders delivery of the shared cloud services the other fabrics rely on: self-hosted delivery tooling, identity and policy, and the data and observability services. It follows the implementation-readiness sequence. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Cloud Service Rollout.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **ROAD-CSR-001:** The Cloud Service Rollout capability SHALL provide dependency-ordered delivery with explicit outcomes, entry and exit criteria, risks, owners, and evidence.
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

### Order

1. **Governance and self-hosted CI.** Protected branches, deny-by-default membership and mandatory two-factor are active; a self-hosted Woodpecker server with isolated agents is the planned CI engine (CLD-017). No required CI checks exist yet. Early environments use only synthetic bootstrap secrets.
2. **Development key and certificate profile.** A development KMS and certificate profile with synthetic roots, clearly separated from production, so the services below are not run with ad hoc credentials.
3. **Identity, policy and contracts.** Keycloak identity broker with an institution-approved upstream in production and a local or test provider elsewhere, and an OPA-compatible policy service (CLD-013). Contract candidates for the compute slice already exist.
4. **Core data and platform services.** PostgreSQL, Valkey, S3-compatible object storage, OpenTelemetry, and an operational database with a transactional outbox, all in development form.
5. **Delivery platform.** Forgejo, Harbor, Argo CD with OpenTofu and Ansible (CLD-015, CLD-016, CLD-018, CLD-019).
6. **Production secrets, keys and PKI.** OpenBao, an offline institution root, issuing intermediates and a recovery ceremony (CLD-012, CLD-014, NET-008, SEC-006). These come before any real secret, protected data or production mutual TLS identity; production credentials are never promoted from the development profile.

### Storage slices

Storage evidence gates AI, media and federation, so it is sequenced here ([ADR-0028](../architecture/architecture-decision-records/ADR-0028-private-content-and-storage-fabric.md)).

| Slice | Outcome | Gate |
|---|---|---|
| VS-05 | A protected object is encrypted, erasure-coded, placed, read, repaired and deleted, with S3-compatible access | Confidentiality, custody, repair and deletion evidence; Ceph topology and failure domains settled before persistent pilot data (CLD-008) |
| VS-06 | An approved immutable artifact moves through a private content-addressed swarm with no public discovery | Unauthorized-peer and digest-verification tests; custody and cache expiry |
| VS-07 | One institution transfers an authorized encrypted object to another sovereign institution | Transfer authority and consent, peer trust, retention and dispute contracts passing conformance; this is wave D and phase 9 work |

Retention and deletion for these slices follow the Retention and Consent governance policies. Private or deletion-eligible data never enters the public permanent archive tier.

### Scope rule

Commons Cloud starts Kubernetes-first and adds OpenStack only where virtual-machine or bare-metal demand requires it (CLD-002); it provides standard service contracts and adopts mature platforms rather than building a custom cloud ([cloud taxonomy](../vision/constitutional/Commons-Cloud-Service-Taxonomy-v1.md)).

### Rules

- **CSR-1:** Commons Cloud has no runtime dependency on any product fabric.
- **CSR-2:** Every service has an owner, a tier and an SLO before it is promoted (OPS-001).
- **CSR-3:** Infrastructure is declared as code and reproducible from reviewed source; a clean workstation can rebuild the development environment (phase 3 evidence).
- **CSR-4:** No real secret or protected data until the production key architecture and a restore test are proven.
- **CSR-5:** Synthetic bootstrap credentials never carry into production.

### Gaps

Exact releases of every component, hardware, networking values and the PostgreSQL high-availability choice are decided later at their gates (CLD-009). There is no deployed environment. The Storage slices have no handoff packets and no named owner.

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

## Outcome

The roadmap outcome is a usable vertical slice with stable contracts, operational ownership, and evidence sufficient to start the next phase.

## Dependencies

Dependencies are phase gates, not suggestions. Each dependency has an owner, compatibility expectation, and fallback; unmet dependencies keep work in the current phase.

## Phase

Each numbered phase defines the capability and evidence to produce. Phase work MUST preserve the documented order unless a superseding ADR records the change.

## Exit criteria

Exit criteria include passing tests, security/privacy review, operator runbook, rollback rehearsal, and accountable ownership for the next dependency.

## Risk

Risks include lock-in, authority escalation, privacy leakage, upstream drift, capacity, and contract instability. Mitigations and residual risk are recorded with the phase.

## Evidence

Evidence includes contract tests, threat/privacy reviews, provenance/SBOM, capacity/failure results, runbooks, approvals, and a signed phase decision.

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

