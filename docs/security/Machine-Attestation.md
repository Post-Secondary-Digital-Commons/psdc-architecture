# Machine Attestation


> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Normative
> Owner: PSDC Security Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: security

## Purpose and outcome

This specification defines **Machine Attestation** as part of the Post Secondary Digital
Commons. Its required outcome is defence in depth across identity, software supply chain, workloads, data, networks, clients, federation, and incident response. An implementation conforms
only when it satisfies this document, the linked ADRs, and the common
[Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Machine Attestation.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- The Machine Attestation capability SHALL provide defence in depth across identity, software supply chain, workloads, data, networks, clients, federation, and incident response.
- The capability SHALL have a versioned configuration schema, explicit safe
  defaults, validation before activation, and a reversible change procedure.
- User-visible and administrative behaviour SHALL be accessible, explainable,
  auditable, and bounded by institution policy and user authority.
- An implementation SHALL expose only the minimum capability required by its
  callers and SHALL reject unknown, unauthorized, malformed, expired, or
  unsupported requests with stable machine-readable errors.
- Institution deployments SHALL be independently operable and SHALL remain
  compatible with the common contract and conformance suite.

## Interfaces, APIs, events, and contracts

See [Interface controls](../architecture/Domain-Control-Profiles.md#security-profile); local extensions remain normative.

## Dependencies and ownership boundaries

Inherits [baseline ownership controls](../architecture/Cross-Cutting-Architecture-Requirements.md#ownership-and-dependency-boundaries).

## Data, state, residency, and retention

See [Data controls](../architecture/Domain-Control-Profiles.md#security-profile); local extensions remain normative.

## Security, privacy, safety, and compliance

See [Security controls](../architecture/Domain-Control-Profiles.md#security-profile); local extensions remain normative.

## Deployment, environments, and configuration

Inherits [baseline deployment controls](../architecture/Cross-Cutting-Architecture-Requirements.md#deployment-and-configuration).

## Capacity, scaling, cost, and sustainability

Inherits [baseline capacity controls](../architecture/Cross-Cutting-Architecture-Requirements.md#capacity-and-overload).

## Failure, recovery, and compatibility

See [Failure controls](../architecture/Domain-Control-Profiles.md#security-profile); local extensions remain normative.

## Observability, testing, and operational readiness

Inherits [baseline evidence controls](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence).

## Standards and implementation strategy

See [Standards controls](../architecture/Domain-Control-Profiles.md#security-profile); local extensions remain normative.

## Settled architecture constraints

- Security uses standard TLS/mTLS, PKI, identity, secret-management, signing, SBOM, and supply-chain mechanisms.
- Any custom policy or enforcement component must integrate established engines or standards before proposing a new language.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Subject-specific control contract

| Dimension | Required definition |
|---|---|
| Owned responsibility | proof that a worker matches an approved hardware and software state |
| Authoritative input | nonce, device identity, measured boot claims, firmware state, and verifier policy |
| Authoritative output | fresh attestation verdict with evidence, expiry, and permitted trust tier |
| Primary trust boundary | an untrusted campus or personal device requests admission to a compute trust tier |
| Unsafe failure to prevent | stale, cloned, unverifiable, or downgraded measurements are accepted |

This contract assesses worker identity and approved device/software posture.
It does not, by itself, measure a particular workload inside a TEE or prove
that the host administrator cannot inspect its plaintext. A future
confidential-execution claim needs separate workload attestation, verifier
policy, and key release bound to the measured guest and lease. See
[Confidential Execution and Provider Visibility](Confidential-Execution-and-Provider-Visibility.md).

- **SEC-ATST-001:** The owner MUST implement the responsibility and preserve the input-to-output evidence chain shown above.
- **SEC-ATST-002:** The enforcement point MUST fail closed when identity, policy version, integrity, freshness, or required context cannot be verified.
- **SEC-ATST-003:** A release MUST include a positive conformance case, an unauthorized or malformed case, a dependency-loss case, and a regression case for the unsafe failure.
- **SEC-ATST-004:** Exceptions MUST identify scope, compensating controls, approver, expiry, monitoring, and a removal plan; permanent undocumented bypasses are prohibited.

Institution forks MUST bind these controls to local identity, policy, evidence retention, and incident routes without weakening the common contract.

### Verification scenarios

1. Exercise proof that a worker matches an approved hardware and software state | with nonce, device identity, measured boot claims, firmware state, and verifier policy | and prove the recorded result is fresh attestation verdict with evidence, expiry, and permitted trust tier |.
2. Remove or alter one required input and prove the request is denied without exposing protected diagnostic content.
3. Simulate the dependency or authority failure that could cause stale, cloned, unverifiable, or downgraded measurements are accepted |; prove the declared safe state, revocation, and evidence are produced.
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

PSDC Security Working Group MUST enforce **Machine Attestation** at the declared policy, identity, repository, gateway, deployment, or moderation enforcement points. A request or change that does not satisfy the normative requirements MUST be denied or quarantined with a stable reason code. Enforcement decisions MUST be attributable, fail closed for authorization failures, and remain independently testable without relying on a proprietary service.

## Exceptions

An exception to **Machine Attestation** requires a written reason, affected scope, risk assessment, compensating control, approving role, start date, and expiry date. The subject owner MUST NOT self-approve a high-impact exception. Expired exceptions MUST stop applying automatically; renewal requires new evidence and review.

## Audit evidence

Conformance evidence for **Machine Attestation** MUST record the policy version, actor or service, decision, reason code, affected object or boundary, timestamp, outcome, and reviewer where applicable. Evidence MUST minimize protected data, be access-controlled, be exportable to the institution, and be retained according to the governing data policy. The owner MUST be able to demonstrate both an allowed and a denied case.

## Purpose

This policy defines the required outcome, actors, and decision boundary for **Machine-Attestation**. It applies to all implementations and institution overlays that claim conformance.

## Normative rules

The requirements in this document are normative. Owners MUST implement them, SHOULD document justified risk trade-offs, and MUST NOT treat an example as an exemption.

## Acceptance and review

Acceptance requires the documented controls, tests, operator ownership, and evidence to be complete. The owner reviews this policy on material architecture change and at least once per release cycle.

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

