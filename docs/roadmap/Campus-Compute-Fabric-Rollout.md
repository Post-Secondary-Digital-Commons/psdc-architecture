# Commons Compute Fabric Rollout


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

This document orders the campus compute fabric's delivery from hardware census to AI and media workloads. The first milestone is census and telemetry, not distributed inference. An implementation conforms only when it satisfies this document, the linked ADRs and the common [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Commons Compute Fabric Rollout.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **ROAD-CCFR-001:** The Commons Compute Fabric Rollout capability SHALL provide dependency-ordered delivery with explicit outcomes, entry and exit criteria, risks, owners, and evidence.
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

### Step 1: census and telemetry (ROAD-002)

The first slice, in order: a worker registers an authorized machine; it reports CPU, RAM, GPU, VRAM, operating system, network and idle state; a control API stores and serves the inventory; a dashboard shows current and aggregate capacity; benchmarks validate reporting overhead and capability. The capability and provider contracts that carry this data exist as candidates ([Compute Census](../campus-compute-fabric/Compute-Census.md), [capability](../../contracts/compute/capability.schema.json)). The census assumes no availability.

### Step 2: the reference slice (VS-01)

An approved request runs on an idle lab node and settles institutional credits. The path is identity, policy and classification, provider and capability registry, task offer, placement and lease, worker sandbox, receipt and evidence, then operational state and settlement ([Vertical Slice Completion Plan](Vertical-Slice-Completion-Plan.md)). It includes node-loss and stale-fence tests.

### Order of enrollment

Dedicated test nodes first, then managed lab machines, then personal machines. Only explicitly authorized institution or test assets are eligible (Commons Compute Fabric-001); volunteer compute is a separate opt-in tier and is deferred (Commons Compute Fabric-017).

### Accepted defaults

| Concern | Default |
|---|---|
| Enrollment | Short-lived enrollment with device identity and revocation (Commons Compute Fabric-003) |
| Interactive-user protection | Immediate preemption or drain target with resource caps (Commons Compute Fabric-006) |
| Scheduler | Borrow HTCondor policy; build only the institution-specific layer (Commons Compute Fabric-007) |
| Sandbox | OCI isolation plus stronger controls by trust and data class (Commons Compute Fabric-010) |
| Job network | Deny by default, policy-controlled egress (Commons Compute Fabric-011) |
| Runtime adapters | CPU job runner first, then vLLM and llama.cpp (Commons Compute Fabric-013) |
| Distributed inference | Deferred until independent replicas, topology and failure tests pass (Commons Compute Fabric-014) |
| exo and SwarmLLM | Experimental, no production dependency (Commons Compute Fabric-015) |

### Rules

- **CFR-1:** No workload runs without valid policy, artifact and lease evidence.
- **CFR-2:** Interactive, thermal and physical-safety priority holds before any opportunistic work (see [Preemption and Drain](../campus-compute-fabric/Preemption-and-Drain.md)).
- **CFR-3:** AI and media do not depend on the compute fabric until it meets isolation and operational criteria (ROAD-007).
- **CFR-4:** The transactional operational-state foundation is built before any scheduler.

### Gaps

Worker implementation language (Commons Compute Fabric-002), pilot hardware, and the sandbox technology are undecided. Power and thermal limits are hardware-owner policy not yet written.

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

