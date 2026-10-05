# Consent


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

- **GOV-CONSENT-001:** The Consent capability SHALL provide accountable decision rights, repository control, safety, audit, contribution, and institution participation.
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

- Consent is one way to authorize processing. The institution's legal basis for each processing purpose is set by the institution and binding law; this policy does not choose it ([Data Handling](Data-Handling.md), [Data Classification](Data-Classification.md)).
- Consent is not authorization. A person who consents to processing still needs an authorization decision to access anything; a successful consent never grants a role or scope.
- Machine owners consent differently: a machine joins the compute fabric only as an explicitly authorized asset, through short-lived enrollment with device identity and revocation (Compute-001 and Compute-003 in the [decision register](Human-Choices-and-Decisions-Register.md)).

### Where the architecture already requires explicit consent or opt-in

| Processing | Accepted default | Register item |
|---|---|---|
| Optional data collection | Defaults off; secondary use needs separate authority | POL-PRIVACY-003 |
| Personalization | Granular, understandable, auditable consent and withdrawal before it begins | PRIV-003 |
| Persistent agent memory | User-controlled, scoped, inspectable, deletable | AI-018 |
| Storing prompts and responses | Off or minimized; each use has a feature-specific purpose | AI-011 |
| Linking institutional and public social identity | Explicit opt-in, revocable, minimal linkage | ID-004, FED-004 |
| Search and discoverability | Opt-in rules suited to the audience | FED-010 |
| Precise location | Private and reduced precision by default; exact location only with consent | PRIV-004, FED-012 |
| Voice, camera and other sensors | Just-in-time, purpose-specific, revocable permission | UX-008 |
| Notifications | Consent-aware delivery through the communications boundary | [Cross-Pollination](../architecture/Cross-Pollination-and-Shared-Capabilities.md) |
| Volunteer compute | Separate opt-in trust tier with a public policy (deferred) | Compute-017 |
| Pilot participation | Small opt-in cohort | ROAD-005 |
| Sending an object to another institution | Transfer authority and consent recorded before the transfer | VS-07 |

### Rules

- **CONSENT-1:** Consent is granular. Each purpose is asked separately; one consent never bundles unrelated purposes or conditions an unrelated service on it.
- **CONSENT-2:** The request states the purpose, data, recipients and retention in plain language and is accessible, with real user testing (UX-002).
- **CONSENT-3:** Withdrawal is as easy as giving consent. After withdrawal the platform stops further processing for that purpose and applies deletion to derived data under [Retention](Retention.md).
- **CONSENT-4:** A consent record holds the person, purpose, scope, the version of the notice shown, the mechanism, the time given and the time withdrawn, and nothing more than that. It is auditable and exportable, and it does not become a profile.
- **CONSENT-5:** Consent given to one institution does not travel to a peer. Sharing with a federation peer needs its own explicit, purpose-bound consent and covers only the capability or reference exchanged.
- **CONSENT-6:** Guests and affiliates get no access by default until a sponsor and expiry model exist (ID-012); consent does not substitute for that.
- **CONSENT-7:** Confirmation of an agent action (read, propose, confirm, execute tiers; `allow_once` and `deny`) is action approval, not data consent; neither implies the other (AI-017, UX-011).

### Gaps

- The legal basis per purpose, applicable privacy law and the role of research ethics review are for institutional counsel to name.
- The treatment of minors and of consent given by staff or faculty in a power relationship is not decided.
- No contract records consent: the authorization-decision contract encodes allow or deny, not a consent receipt. How a consent record is represented and verified across services is undefined.
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

## Acceptance criteria

Inherits [baseline acceptance gates](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence); every local requirement MUST also pass.

## Enforcement

PSDC Governance Working Group MUST enforce **Consent** at the declared policy, identity, repository, gateway, deployment, or moderation enforcement points. A request or change that does not satisfy the normative requirements MUST be denied or quarantined with a stable reason code. Enforcement decisions MUST be attributable, fail closed for authorization failures, and remain independently testable without relying on a proprietary service.

## Exceptions

An exception to **Consent** requires a written reason, affected scope, risk assessment, compensating control, approving role, start date, and expiry date. The subject owner MUST NOT self-approve a high-impact exception. Expired exceptions MUST stop applying automatically; renewal requires new evidence and review.

## Audit evidence

Conformance evidence for **Consent** MUST record the policy version, actor or service, decision, reason code, affected object or boundary, timestamp, outcome, and reviewer where applicable. Evidence MUST minimize protected data, be access-controlled, be exportable to the institution, and be retained according to the governing data policy. The owner MUST be able to demonstrate both an allowed and a denied case.

## Purpose

This policy defines the required outcome, actors, and decision boundary for **Consent**. It applies to all implementations and institution overlays that claim conformance.

## Normative rules

The requirements in this document are normative. Owners MUST implement them, SHOULD document justified risk trade-offs, and MUST NOT treat an example as an exemption.

## Acceptance and review

Acceptance requires tests for granting, refusing, withdrawing and expiring each consent purpose, an exportable consent record per person, evidence that withdrawal stops processing and reaches derived data, and accessibility testing of the consent experience. The owner reviews this policy at least annually and whenever applicable law, institutional policy or a processing purpose changes.

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

