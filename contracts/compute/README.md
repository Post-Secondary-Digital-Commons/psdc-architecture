# Compute Contract Profile

> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: D1 schema candidates; not a running compute fabric
> Owner: PSDC Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-29
> Governing decisions: ADR-0013, ADR-0026, ADR-0029, ADR-0031

## Purpose

These contracts separate PSDC admission, transparent market placement, fenced resource
leasing, backend execution, and metering. A backend receives a lease only after workload,
provider, capability, policy, offer, and placement records are valid and eligible.

## Contents and relationships

| Schema | Producer | Consumer | Boundary |
|---|---|---|---|
| `provider.schema.json` | provider authority | registry/resolver | ownership, trust, scope, endpoints, revocation |
| `capability.schema.json` | provider/worker agent | registry/resolver | fresh typed capacity without private topology |
| `workload-manifest.schema.json` | request API | classifier/policy | purpose, data class, resources, runtime, placement, retry |
| `classification-record.schema.json` | classifier | policy/market | immutable eligibility, risk, backend, and scope result; not authorization |
| `offer.schema.json` | eligible provider | market/resolver | time-bounded resources, prices, health/policy digests |
| `placement-decision.schema.json` | resolver | lease service/auditor | candidates, exclusions, algorithm, selected result |
| `lease.schema.json` | lease service | worker/backend/meter | fencing generation, allocation, reservations, authority |
| `usage-receipt.schema.json` | trusted meter | evidence/settlement/dispute | signed interval measurements and governed evidence |
| `compute-control-plane.openapi.json` | compute API owner | clients/services | OpenAPI 3.1 provider, capability, workload, market, lease, and receipt boundary |

The schema order is provider/capability plus workload, then offer/decision, then lease, then
receipt. Schema validity is necessary but not sufficient: services still verify signatures,
authority, current time, freshness, capacity transactionality, generation fencing, policy,
and referenced-object existence. `contracts/state-machines/` supplies machine-checked provider,
capability, offer, lease, and receipt lifecycles.

## Capability additions

A capability advertisement may carry `compute.operatingSystem` (linux, windows, macos, other), `network` uplink
and downlink bits per second with a metered flag, and a `drain` block (request time, grace seconds, registered
reason code). A capability with status `draining` MUST carry `drain`. The grace period bounds how long
running leases may continue before the controller revokes them with `DRAIN_DEADLINE`; the lease expiry still
applies if it comes first.

## Lease timing, receipt chains and command parity

A lease carries absolute timestamps for audit plus two signed relative bounds. `leaseDurationSeconds` is the running time the worker enforces from its own monotonic start on acceptance and never exceeds the window between `issuedAt` and `expiresAt`. `maximumDisconnectedSeconds` is the longest the worker may run without authenticated contact and never exceeds the duration. A monotonic clock cannot interpret a UTC expiry, which is why durations are signed. The values themselves are set by policy per workload risk class; the contract only bounds them.

A usage-receipt chain is identified by `(leaseId, attempt, meterId)` unless a single canonical aggregator owns the whole lease attempt. Sequence one has no prior digest; later receipts name the preceding accepted receipt of the same chain. Uniqueness, gap-freedom, non-overlap and fork handling are operational-store invariants, not schema checks.

`lease-commands.registry.json` classifies every lease state-machine action as an external command, internal command, timer trigger, backend outcome or administrative override, and ties the external commands to the OpenAPI operation. The validator fails if the registry, the state machine and the OpenAPI action enum disagree, or if the request body stops requiring `expectedGeneration`. Provider transitions are not yet covered by an equivalent registry.

## Allowed and prohibited contents

Provider-neutral compute shapes and synthetic fixtures are allowed. Backend-private database
keys, public-network token addresses, raw secrets, protected data, unbounded commands, private
campus topology, and fields that let price override eligibility are prohibited.

## Validation and change control

Run the root contract test. Any semantic or required-field change requires fixtures for valid,
denied, stale, duplicate, timeout, retry, revocation, and backend failure behavior plus a
consumer migration classification. Implementations remain behind these contracts and cannot
silently add backend-specific mandatory fields.

## References

- [Compute Fabric Architecture](../../docs/campus-compute-fabric/Campus-Compute-Fabric-Architecture.md)
- [Scheduling Algorithm](../../docs/campus-compute-fabric/Scheduling-Algorithm.md)
- [Workload Classification](../../docs/campus-compute-fabric/Workload-Classification.md)
