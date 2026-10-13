# Job Sandboxing


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative; subject-specific section is contract-backed, open questions listed
> Owner: PSDC Campus Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-13
> Governing decisions: Applicable ADRs and repository governance
> Domain: campus-compute-fabric

## Purpose and outcome

This specification defines **Job Sandboxing** as part of the Post Secondary Digital
Commons. Its required outcome is institution-controlled heterogeneous campus compute with explicit capability, trust, scheduling, and preemption contracts. An implementation conforms
only when it satisfies this document, the linked ADRs, and the common
[Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Job Sandboxing.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **CCF-JS-001:** The Job Sandboxing capability SHALL provide institution-controlled heterogeneous campus compute with explicit capability, trust, scheduling, and preemption contracts.
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

Sandboxing decides what a workload is allowed to touch on a donor machine. The contracts fix the inputs to that decision. They do not choose the isolation technology.

- **What is pinned.** The workload manifest requires an image digest (`runtime.imageDigest`, SHA-256), so the thing that runs is the thing that was classified. The lease binds the same `manifestDigest` ([lease.schema.json](../../contracts/compute/lease.schema.json)), and the classification record carries it too ([classification-record.schema.json](../../contracts/compute/classification-record.schema.json)).
- **What limits it.** Classification outputs `dataClassification`, `eligibleBackends`, `institutionScope` (local_only, approved_federation, approved_external) and `riskLevel` (low, moderate, high, prohibited). Placement constraints add `minimumTrustTier`, allowed providers and zones, and residency countries.
- **What it does not do.** A classification record does not itself authorize placement; authorization is a separate signed decision.

- **CCF-SANDBOX-010:** A workload with `riskLevel` `prohibited` SHALL NOT be placed on any provider.
- **CCF-SANDBOX-011:** A provider SHALL refuse to start a workload whose image digest differs from the lease `manifestDigest` binding, and SHALL report the refusal as a lease failure.
- **CCF-SANDBOX-012:** A workload SHALL run only on a provider whose trust tier meets the manifest `minimumTrustTier` and whose attestation status is `valid` or `not_required` ([capability.schema.json](../../contracts/compute/capability.schema.json)).
- **CCF-SANDBOX-013:** Workloads SHALL run without privileged access by default; any privileged mode requires an explicit classification outcome and an audit event.
- **CCF-SANDBOX-014:** Stronger isolation SHALL apply as `dataClassification` rises or trust tier falls; the mapping from those inputs to a required isolation level is a policy decision recorded in the institution manifest.

**Open decisions (not settled by any contract or ADR).** The isolation technology (container hardening, user-space kernel, microVM) and its per-class mapping; network egress rules for jobs; handling of untrusted code on student-owned or volunteer machines; and resource-limit enforcement and escape detection. Until these are decided, only low-risk, local-only, institution-trusted workloads should be considered for any pilot.

## Provider visibility and confidential execution

An ordinary container or VM isolates a workload from other workloads to a
degree determined by its runtime and configuration. It does **not** make
decrypted inputs, memory, or outputs confidential from the operator of the
host or hypervisor. A provider with host administration authority must be
treated as able to inspect them. Encryption during transfer and storage does
not change that conclusion once the workload receives a decryption key.

The current manifest has `dataClassification` and `minimumTrustTier`; the
capability contract has generic device `attestationStatus`. Neither expresses
an attested workload TEE or a key-release policy tied to its measurement.
`valid` device attestation MUST NOT be described as proof that the provider is
unable to inspect the running workload. The classifier and scheduler need a
new contract and policy before host-confidential workloads can be placed.
Until then, use trusted institution-controlled providers under approved
operator controls, or restrict a less-trusted provider to data for which its
visibility is acceptable. The [confidential-execution assessment](../security/Confidential-Execution-and-Provider-Visibility.md)
records the threat model, candidate TEE path, missing contracts, and tests.

## Interfaces, APIs, events, and contracts

See [Interface controls](../architecture/Domain-Control-Profiles.md#campus-compute-fabric-profile); local extensions remain normative.

## Dependencies and ownership boundaries

Inherits [baseline ownership controls](../architecture/Cross-Cutting-Architecture-Requirements.md#ownership-and-dependency-boundaries).

## Data, state, residency, and retention

See [Data controls](../architecture/Domain-Control-Profiles.md#campus-compute-fabric-profile); local extensions remain normative.

## Security, privacy, safety, and compliance

See [Security controls](../architecture/Domain-Control-Profiles.md#campus-compute-fabric-profile); local extensions remain normative.

## Deployment, environments, and configuration

Inherits [baseline deployment controls](../architecture/Cross-Cutting-Architecture-Requirements.md#deployment-and-configuration).

## Capacity, scaling, cost, and sustainability

Inherits [baseline capacity controls](../architecture/Cross-Cutting-Architecture-Requirements.md#capacity-and-overload).

## Failure, recovery, and compatibility

See [Failure controls](../architecture/Domain-Control-Profiles.md#campus-compute-fabric-profile); local extensions remain normative.

## Observability, testing, and operational readiness

Inherits [baseline evidence controls](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence).

## Standards and implementation strategy

See [Standards controls](../architecture/Domain-Control-Profiles.md#campus-compute-fabric-profile); local extensions remain normative.

## Settled architecture constraints

- Commons Compute Fabric owns campus-specific enrollment, topology, trust, idle detection, scheduling, preemption, accounting, and integration.
- Execution engines remain plugins behind versioned job, capability, lifecycle, and result contracts.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

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

- [Confidential Execution and Provider Visibility](../security/Confidential-Execution-and-Provider-Visibility.md)
- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

