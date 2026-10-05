# Retention


> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Governance Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: governance

> **Decision status:** Statements directly traced to accepted ADRs, the decision register, or
> the constitutional architecture restate existing authority. Any new rule identifier, ordering
> or uncited constraint introduced by this draft is a proposal for owner review, not a binding
> decision. It becomes normative only when the accountable owner accepts it through the decision
> register, an ADR, or a released contract. The Gaps section remains explicitly open.

## Purpose and outcome

This policy states how long data may be kept, how deletion happens, and what the platform can and cannot promise about it. It records the retention values that are already accepted and leaves every other value to the institution, declared before any data is stored. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Retention.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **GOV-RETENTION-001:** The Retention capability SHALL provide accountable decision rights, repository control, safety, audit, contribution, and institution participation.
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

### Principle

Minimize, and delete automatically (PRIV-002 in the [decision register](Human-Choices-and-Decisions-Register.md)). Retention is declared per data class before anything is persisted; telemetry must not become an undeclared record system ([Privacy by Design](Privacy-by-Design.md), [Data Handling](Data-Handling.md)).

### Values already accepted

| Data | Retention | Register item |
|---|---|---|
| Raw network flow and security metadata | 30 days; no payload by default; approval before collection | NET-020 |
| Access-controlled aggregate capacity data | Up to 13 months | NET-020 |
| Prompts and responses | Off or minimized; kept only for a feature-specific purpose | AI-011 |
| Model telemetry | Operational metadata without prompt content | AI-012 |
| Remote media cache | Bounded cache | FED-009 |
| Logs, traces, metrics | Data-class-aware minimums set by SRE with privacy | OPS-003 |

Every other retention period is an institution value, supplied in its deployment manifest and approved by the data steward for that domain (GOV-011). This document sets none of them.

### Deletion must reach every copy

- Expiry propagates to indexes, replicas, caches, derivatives and keys, records deletion evidence, and records any copy it cannot verify ([ADR-0028](../architecture/architecture-decision-records/ADR-0028-private-content-and-storage-fabric.md), STORE-ADR-ACC-005).
- A deletion request removes live copies, records a tombstone and deletion evidence, destroys eligible envelope keys, and prevents restoration after the retention boundary. Immutable backups expire on their own schedule; the platform does not claim to rewrite them ([Disaster Recovery](../architecture/Disaster-Recovery.md)).
- Deletion can be proven only for controlled copies and keys, not for disclosure that already happened (ADR-0028).
- Content that is public and permanent by design is deletion-ineligible; private or deletion-eligible data never enters that tier (STORE-ADR-ACC-006).

### Rules

- **RET-1:** No data class is stored until its owner, purpose, classification, residency, retention, export and deletion rule are declared.
- **RET-2:** Retention jobs run automatically and leave evidence of what was deleted, when and under which rule.
- **RET-3:** Withdrawal of consent, departure of a participant, closure of a pilot and sunset of a service each trigger deletion or export under the declared rule ([Consent](Consent.md), GOV-014).
- **RET-4:** A restore never resurrects deleted data: restored systems reapply tombstones before serving.
- **RET-5:** The resource ledger and event streams carry commitments, digests and references, never personal data or workload content, so that immutable records do not outlive a deletion obligation.
- **RET-6:** Finalized settlement and dispute evidence is corrected by linked records, not edited; its retention period is set by finance and audit, not by the product team.
- **RET-7:** Suspending deletion requires a documented hold from the accountable institution authority, with scope and expiry.

### Gaps

- Beyond the accepted network and AI values, no retention period is set. The contract field `retentionClass` on evidence objects names a class but no class list exists; the value in the fixtures is a synthetic example, not policy.
- Finance, audit and legal minimums for receipts, disputes and incident records are undecided.
- Legal hold, e-discovery and records-law obligations are for institutional counsel to define.
- Backup retention schedules and the backup-expiry window for immutable media are open until recovery objectives are set.

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

## Enforcement

PSDC Governance Working Group MUST enforce **Retention** at the declared policy, identity, repository, gateway, deployment, or moderation enforcement points. A request or change that does not satisfy the normative requirements MUST be denied or quarantined with a stable reason code. Enforcement decisions MUST be attributable, fail closed for authorization failures, and remain independently testable without relying on a proprietary service.

## Exceptions

An exception to **Retention** requires a written reason, affected scope, risk assessment, compensating control, approving role, start date, and expiry date. The subject owner MUST NOT self-approve a high-impact exception. Expired exceptions MUST stop applying automatically; renewal requires new evidence and review.

## Audit evidence

Conformance evidence for **Retention** MUST record the policy version, actor or service, decision, reason code, affected object or boundary, timestamp, outcome, and reviewer where applicable. Evidence MUST minimize protected data, be access-controlled, be exportable to the institution, and be retained according to the governing data policy. The owner MUST be able to demonstrate both an allowed and a denied case.

## Purpose

This policy defines the required outcome, actors, and decision boundary for **Retention**. It applies to all implementations and institution overlays that claim conformance.

## Normative rules

The requirements in this document are normative. Owners MUST implement them, SHOULD document justified risk trade-offs, and MUST NOT treat an example as an exemption.

## Acceptance and review

Acceptance requires, for each stored data class, a declared retention value, an automated deletion job with evidence, a deletion-propagation test across indexes, caches and replicas, and a restore test showing deleted data is not resurrected. The owner reviews this policy at least annually and whenever law, institutional policy, backup practice or a data flow changes.

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

