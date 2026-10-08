# Preemption and Drain


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative; subject-specific section is contract-backed, open questions listed
> Owner: PSDC Campus Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: campus-compute-fabric

## Purpose and outcome

This specification defines **Preemption and Drain** as part of the Post Secondary Digital
Commons. Its required outcome is institution-controlled heterogeneous campus compute with explicit capability, trust, scheduling, and preemption contracts. An implementation conforms
only when it satisfies this document, the linked ADRs, and the common
[Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Preemption and Drain.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **CCF-PAD-001:** The Preemption and Drain capability SHALL provide institution-controlled heterogeneous campus compute with explicit capability, trust, scheduling, and preemption contracts.
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

Preemption and drain describe how running work is stopped or moved when a donor machine needs its resources back, is retired, or loses trust. The contracts already provide the building blocks.

- **Drain starts at the capability.** A capability moves `available -> draining` (`capability.drain`), then `draining -> unavailable`, or back to `available` if the drain is cancelled ([capability.machine.json](../../contracts/state-machines/capability.machine.json)). A draining resource takes no new leases.
- **Eviction ends at the lease.** The lease has no "preempting" state. A running lease ends through `active | renewal_pending -> released | expired | revoked | failed` ([lease.machine.json](../../contracts/state-machines/lease.machine.json)). Each ending requires a reason, is idempotent, and is fenced by the lease `generation`, so a stale controller cannot act on a lease that has already moved on.
- **What the workload asked for.** The manifest `schedule` carries `priority`, `preemptible`, `maxRuntimeSeconds` and `checkpointIntervalSeconds`; `retryPolicy` carries `maxAttempts`, backoff and `retryableReasonCodes` ([workload-manifest.schema.json](../../contracts/compute/workload-manifest.schema.json)).
- **What gets billed.** The usage receipt records an `outcome` of `preempted` (as well as succeeded, failed, cancelled, lost) so partial runs are metered honestly ([usage-receipt.schema.json](../../contracts/compute/usage-receipt.schema.json)).

- **CCF-PREEMPT-010:** Only a lease whose workload set `preemptible` true MAY be ended by an idle-policy or capacity eviction. Other leases end only by release, expiry, revocation for cause, or failure.
- **CCF-PREEMPT-011:** A preemptive end SHALL be recorded as a lease transition with a reason code, and the resulting usage receipt SHALL carry outcome `preempted`.
- **CCF-PREEMPT-012:** A controller SHALL supply the expected lease `generation` on every transition; a mismatch SHALL be rejected rather than applied.
- **CCF-PREEMPT-013:** Where a workload declares `checkpointIntervalSeconds`, the drain procedure SHALL allow time for one checkpoint before forced termination, bounded by the lease expiry.
- **CCF-PREEMPT-014:** A preempted workload is retried only if its `retryableReasonCodes` include the preemption reason and `maxAttempts` is not exhausted.
- **CCF-PREEMPT-016:** Every terminal lease transition SHALL carry a code from the [reason-code registry](../../contracts/common/reason-codes.registry.json). Eviction for the machine owner (`OWNER_RECLAIM`), capacity displacement (`CAPACITY_RECLAIM`) and drain expiry (`DRAIN_DEADLINE`) are distinct from revocation for cause (`PROVIDER_REVOKED`, `TRUST_LOST`, `POLICY_REVOKED`) and from faults (`WORKER_LOST`, `WORKLOAD_FAILED`); only the first three map to usage outcome `preempted`. A provider-supplied code is an assertion, not settlement or reputation authority: billing, refund, retry and reputation treatment apply only after the lease authority classifies the code from evidence (cell controller, meter, policy or trust authority), and ambiguous or conflicting cases stay unattributed or disputed (FD-6 in [Failure Domains](../architecture/Failure-Domains.md)).
- **CCF-PREEMPT-017:** A capability in status `draining` SHALL state the drain request time, a grace period in seconds and a registered drain reason. When the grace period ends before a lease finishes or checkpoints, the lease is revoked with `DRAIN_DEADLINE`.
- **CCF-PREEMPT-015:** Revoking a provider or capability SHALL make the lease authority evaluate each affected lease and append an explicit, signed, reason-coded terminal transition; it SHALL NOT silently rewrite or drop lease state. For a worker that cannot be reached, exposure is bounded by the lease `maximumDisconnectedSeconds`, not by instantaneous revocation (CP-3 in [Control Plane vs Data Plane](../architecture/Control-Plane-vs-Data-Plane.md)).

**Resolved structurally in candidate contracts.** The reason-code registry separates
owner eviction from revocation for cause; the capability `drain` block carries
the grace period; and the signed
[reason-adjudication contract](../../contracts/compute/reason-adjudication.schema.json)
separates a provider assertion from the lease authority's determination. The
validator checks these shapes and contradictions, not real evidence or signatures.

**Open questions.** (1) The actor-to-code permission matrix, minimum evidence
per code, clock tolerance and institution-approved economic policy remain to be
specified. The settlement service must verify the adjudication signature and
join it to every incident receipt; disputed or missing adjudications cannot
produce penalties or reputation effects. (2) A sensible default and maximum
grace period per trust tier. (3) Checkpoint and migration mechanics belong to
[Checkpoint and Migration](Checkpoint-and-Migration.md), which is a stub.

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

