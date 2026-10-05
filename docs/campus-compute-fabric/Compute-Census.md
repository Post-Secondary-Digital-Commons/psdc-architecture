# Compute Census


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative; subject-specific section is contract-backed, open questions listed
> Owner: PSDC Campus Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: campus-compute-fabric

## Purpose and outcome

This specification defines **Compute Census** as part of the Post Secondary Digital
Commons. Its required outcome is institution-controlled heterogeneous campus compute with explicit capability, trust, scheduling, and preemption contracts. An implementation conforms
only when it satisfies this document, the linked ADRs, and the common
[Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Compute Census.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **CCF-CC-B2EC-001:** The Compute Census capability SHALL provide institution-controlled heterogeneous campus compute with explicit capability, trust, scheduling, and preemption contracts.
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

The census is the fabric's authoritative answer to "what compute exists, who vouches for it, and is it usable right now". It is built from two signed record types, not from a free-form inventory table.

- **Provider record** ([provider.schema.json](../../contracts/compute/provider.schema.json)): one per institution-operated or partner provider. Lifecycle `pending -> active -> suspended -> revoked | retired` ([provider.machine.json](../../contracts/state-machines/provider.machine.json)). Carries `providerType`, `trustTier` (development, pilot, production, federated), `scopes`, a monotonic `sequence` and an expiry.
- **Capability advertisement** ([capability.schema.json](../../contracts/compute/capability.schema.json)): one per resource. Carries `architecture` (amd64, arm64), `backends`, `runtimes`, `accelerators`, `available` quantity, locality (institution, zone, country, campus class), `trust.attestationStatus`, `pressure` (low to critical), `interactiveUserPresent`, `observedAt`, `expiresAt` and a signature. Lifecycle `available / draining / unavailable / revoked` ([capability.machine.json](../../contracts/state-machines/capability.machine.json)).

- **CCF-CENSUS-010:** A capability advertisement SHALL be treated as `unavailable` for scheduling once `expiresAt` has passed, without waiting for an explicit transition.
- **CCF-CENSUS-011:** A consumer SHALL ignore an advertisement whose `sequence` is not greater than the latest accepted sequence for the same `resourceId`; replays and reordered deliveries must not roll the census back.
- **CCF-CENSUS-012:** A revoked provider or capability SHALL be removed from placement eligibility immediately, and existing leases on it are not silently rewritten; the lease authority appends an explicit, signed terminal transition for each, as described in [Preemption and Drain](Preemption-and-Drain.md).
- **CCF-CENSUS-013:** `interactiveUserPresent` and `pressure` are advisory inputs to the idle policy; the census reports them and does not itself decide to evict work.
- **CCF-CENSUS-014:** The census is a derived view of signed advertisements and SHALL be rebuildable from the event stream ([compute-fabric.asyncapi.json](../../contracts/events/compute-fabric.asyncapi.json)).

**First vertical slice.** The first milestone in `psdc-compute` is a worker that registers an authorized machine and reports CPU, RAM, GPU, VRAM, operating system, network and idle state, with a dashboard of current and aggregate capacity. That report maps onto the capability fields above. Operating system (`compute.operatingSystem`) and network capacity (`network`) are optional capability fields, so the slice can report them.

**Open questions.** (1) How often advertisements must be refreshed, which determines the practical `expiresAt` window. (2) Which hardware details beyond the capability schema (disk, thermal, power) the census must track. (3) The enrollment and attestation flow, described in [Node Enrollment and Attestation](Node-Enrollment-and-Attestation.md), which is itself not yet specified.

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

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

