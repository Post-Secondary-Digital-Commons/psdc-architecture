# Consent


> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Draft for owner review; sourced from accepted decisions, open gaps listed
> Owner: PSDC Governance Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: ADR-0012, ADR-0013, ADR-0016; Privacy by Design, Data Handling, Data Classification (ADR-0028 informative)
> Domain: governance

> **Decision status:** Statements directly traced to accepted ADRs, the decision register, or
> the constitutional architecture restate existing authority. Any new rule identifier, ordering
> or uncited constraint introduced by this draft is a proposal for owner review, not a binding
> decision. It becomes normative only when the accountable owner accepts it through the decision
> register, an ADR, or a released contract. The Gaps section remains explicitly open.

## Purpose and outcome

This policy states when the platform needs a person's consent, what a valid consent record contains, and what withdrawal must do. It applies the consent rows of the decision register and the shared privacy policies; it does not name a legal basis, which each institution decides with its own counsel. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Consent.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **GOV-CONSENT-001:** Where consent is the governing authority for a purpose, the Consent policy SHALL make it granular, informed, recorded, prospectively withdrawable and non-portable across institutions, and SHALL keep other kinds of choice from being treated as consent.
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

### What consent is and is not

- Consent is one way to authorize processing. The institution's legal basis for each processing purpose is set by the institution, binding law and records authority; this policy does not choose it, and it applies its consent lifecycle only where consent is the governing authority ([Data Handling](Data-Handling.md), [Data Classification](Data-Classification.md), [Privacy by Design](Privacy-by-Design.md)).
- Consent is not authorization. A person who consents to processing still needs an authorization decision to access anything; consent never grants a role or scope.
- Several things that look like consent are different authorities and do not use the consent lifecycle:

| Kind of choice | What it is | Examples |
|---|---|---|
| Privacy or legal consent | The governing authority for a processing purpose where the institution has selected consent | Personalization, optional collection, sharing with a recipient |
| Service preference or opt-in | A product setting inside a purpose already authorized | Search and discoverability, notification channels |
| Asset-owner permission | The owner of a machine allowing use of it | A volunteer personal device |
| Institution authorization | The institution authorizing its own managed asset or participant | Enrollment of a managed lab machine; pilot cohort membership |
| Operating-system sensor permission | A device permission prompt | Voice, camera, location services |
| Research participation consent | Consent governed by research ethics review | A study using platform data |
| Agent-action confirmation | Approval of one action | Read, propose, confirm, execute tiers; `allow_once` and `deny` |

A machine cannot consent. A managed asset joins the compute fabric through institution authorization, short-lived enrollment with device identity and revocation (Commons Compute Fabric-001 and -003 in the [decision register](Human-Choices-and-Decisions-Register.md)). A personally owned volunteer device (Commons Compute Fabric-017, deferred) involves both the owner's permission for resource use and, separately, privacy consent for any personal data.

### Where the architecture already requires explicit consent or opt-in

| Processing | Accepted default | Kind | Register item |
|---|---|---|---|
| Optional data collection | Defaults off; secondary use needs separate authority | Privacy consent where chosen | POL-PRIVACY-003 |
| Personalization | Granular, understandable, auditable consent and withdrawal before it begins | Privacy consent | PRIV-003 |
| Persistent agent memory | User-controlled, scoped, inspectable, deletable | Privacy consent where chosen | AI-018 |
| Storing prompts and responses | Off or minimized; each use has a feature-specific purpose | Privacy consent where chosen | AI-011 |
| Linking institutional and public social identity | Explicit opt-in, revocable, minimal linkage | Opt-in, consent where chosen | ID-004, FED-004 |
| Search and discoverability | Opt-in rules suited to the audience | Opt-in | FED-010 |
| Precise location | Private and reduced precision by default; exact location only with consent | Privacy consent | PRIV-004, FED-012 |
| Voice, camera and other sensors | Just-in-time, purpose-specific, revocable permission | OS permission plus purpose notice | UX-008 |
| Notifications | Consent-aware delivery through the communications boundary | Preference or consent | [Cross-Pollination](../architecture/Cross-Pollination-and-Shared-Capabilities.md) |
| Volunteer compute | Separate opt-in trust tier with a public policy (deferred) | Owner permission plus consent | Commons Compute Fabric-017 |
| Pilot participation | Small opt-in cohort | Institution authorization plus consent where chosen | ROAD-005 |
| Sending an object to another institution | Transfer authority recorded before the transfer | Transfer authority; consent where it governs | VS-07 |

### Rules

Rules CONSENT-1 to CONSENT-5 apply where consent is the governing authority for the purpose.

- **CONSENT-1:** Consent is granular. Each purpose is asked separately; one consent never bundles unrelated purposes or conditions an unrelated service on it.
- **CONSENT-2:** The request states the purpose, data, recipients and retention in plain language and is accessible, with real user testing (UX-002).
- **CONSENT-3:** Withdrawal is as easy as giving consent and is prospective. After reasonable notice the platform stops further consent-based processing for that purpose; it does not retroactively invalidate completed processing. What happens to data already held is decided by the approved disposition workflow in [Retention](Retention.md), which weighs any independent authority, statutory or records minimum, hold, and access or correction right.
- **CONSENT-4:** A consent receipt is minimized and purpose-scoped. It holds a pseudonymous subject reference, the controlling institution, the governing authority profile, the exact purpose, data and recipient scope, the notice digest and version, the capture channel and proof, status, and the grant, withdrawal and expiry times. Export is controlled and per purpose or service; there is no omnibus record per person, and a receipt does not become a profile.
- **CONSENT-5:** Consent given to one institution does not travel to a peer. A transfer to a federation peer needs its own purpose-specific transfer authority and, where consent is the governing authority, explicit consent that covers only the capability or reference exchanged.
- **CONSENT-6:** Guests and affiliates get no access by default until a sponsor and expiry model exist (ID-012); consent does not substitute for that.
- **CONSENT-7:** Agent-action confirmation is not data consent; neither implies the other (AI-017, UX-011).
- **CONSENT-8:** The common Governance Working Group owns the portable minimum, schemas, fixtures and conformance suite. Each institution names accountable owners and enforces locally; neither the common group nor a peer administers another institution.

### Gaps

- The legal basis per purpose, applicable privacy law, records authority and the role of research ethics review are for institutional counsel to name. The bases named here are placeholders, not advice.
- The treatment of minors, incapacity and substitute decision-makers, and of consent given in a power relationship, is not decided.
- No contract records consent. Before implementation the platform needs a consent-receipt schema and lifecycle state machine, a purpose and notice-version registry, fixtures for grant, refusal, expiry, withdrawal, supersession and re-consent, tests that consent is not portable across institutions, and end-to-end withdrawal tests covering independent authority, holds, backups, derived data and remote copies.
- Retention of consent records, the notice wording and the withdrawal user experience are open (the student-life consent specification is a stub).

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
- ADR-0028: Private Content and Storage Fabric (informative for deletion and storage tiers)

## Acceptance criteria

Inherits [baseline acceptance gates](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence); every local requirement MUST also pass.

## Enforcement

The common Governance Working Group owns the portable minimum, the schemas, the fixtures and the conformance suite for this policy. It does not operate enforcement inside any institution. Each institution names the accountable privacy, data and service owners and enforces the policy at its own identity, gateway, deployment and moderation points; a request or change that fails the numbered rules is denied or quarantined there. In federation each peer proves its own enforcement, and neither the common group nor one peer administers the other.

## Exceptions

An exception to **Consent** requires a written reason, affected scope, risk assessment, compensating control, approving role, start date, and expiry date. The subject owner MUST NOT self-approve a high-impact exception. Expired exceptions MUST stop applying automatically; renewal requires new evidence and review.

## Audit evidence

Conformance evidence for **Consent** MUST record the policy version, actor or service, decision, reason code, affected object or boundary, timestamp, outcome, and reviewer where applicable. Evidence MUST minimize protected data, be access-controlled, be exportable to the institution, and be retained according to the governing data policy. The owner MUST be able to demonstrate both an allowed and a denied case.

## Purpose

See Purpose and outcome above. This policy applies its consent lifecycle only where consent is the governing authority for a purpose.

## Normative rules

The numbered CONSENT rules in the subject-specific specification are the normative rules of this document. Until the owner accepts them they are proposals.

## Acceptance and review

Acceptance requires tests for granting, refusing, withdrawing and expiring each consent purpose, a purpose-scoped controlled export of a consent receipt, evidence that withdrawal stops further consent-based processing and triggers the disposition workflow, tests that consent is not portable across institutions, and accessibility testing of the consent experience. The owner reviews this policy at least annually and whenever applicable law, institutional policy or a processing purpose changes.

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)
- [Data Handling](Data-Handling.md)
- [Data Classification](Data-Classification.md)
- [Privacy by Design](Privacy-by-Design.md)
- [Fediverse Privacy](Fediverse-Privacy.md)
- [Disaster Recovery](../architecture/Disaster-Recovery.md)
- [ADR-0028: Private Content and Storage Fabric](../architecture/architecture-decision-records/ADR-0028-private-content-and-storage-fabric.md)
- [Vertical Slice Completion Plan](../roadmap/Vertical-Slice-Completion-Plan.md)

