# Commons Compute Fabric Architecture

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Campus Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0010, ADR-0013, ADR-0026, ADR-0028, ADR-0029

## Purpose and measurable outcomes

The Commons Compute Fabric turns institution-controlled servers, clusters, labs and approved
federated providers into one policy-governed capacity market without pretending they are one
uniform scheduler. It must select the right backend, find the best eligible provider and
network/data path, issue a bounded lease, execute, verify and account for the outcome.

Success means independent institutional operation, deterministic authorization and
classification, traceable market decisions, correct backend-native execution, safe
preemption/failure, common receipts and no public-network dependency for normal operation.

## Scope and boundaries

The fabric owns provider/capability registry, workload API, classification, resolver,
market/offer, lease, worker protocol, adapter contracts, evidence, metering and federation
scheduling. It does not own institutional identity, data authorization, storage keys,
Kubernetes/OpenStack/Slurm internals, official records or application business logic.

Every backend is replaceable. No backend may read another backend's private database or
become an authority merely because it executed the work.

## Out of scope

Institution directory operation, data-content authorization, storage key custody, backend
internal scheduling algorithms and application business logic remain with their owners.

## Architecture

    clients / applications / research portals
                       |
                Workload API
                       |
          identity + policy + data admission
                       |
          classifier and workload graph builder
                       |
        provider/capability/network/storage views
                       |
       policy-gated reverse auction and resolver
                       |
         lease + credit + path + storage reservation
                       |
     +---------+----------+---------+--------------+
     |         |          |         |              |
 Kubernetes OpenStack   Slurm   task fabric   service market
     |         |          |         |              |
     +---------+----------+---------+--------------+
                       |
      native telemetry -> evidence -> common receipt
                       |
     operational reconciliation -> ledger commitment

## Component responsibilities

| Component | Responsibility |
|---|---|
| Workload API | validate versioned manifests, idempotency, status, cancellation and result references |
| Policy/admission | authenticate and authorize requester, data, action, provider scope and budget |
| Classifier | choose execution archetype, criticality and allowed backends |
| Provider registry | provider identity, ownership, trust, production/federation status |
| Capability registry | signed fresh resource, runtime, accelerator, topology and availability claims |
| Market service | eligible provider solicitation, sealed offers, clearing and explainable decision |
| Resolver | compose backend, provider, network and storage plan under hard constraints |
| Lease service | atomically reserve resource, path, storage and credit; expiry/revocation |
| Worker/cell controller | outbound sessions, task dispatch, sandbox, checkpoint, drain and evidence |
| Backend adapters | map PSDC lease to Kubernetes/OpenStack/Slurm/task/service APIs and reconcile |
| Meter/evidence service | native measurements, verification, common IRUs, receipts and disputes |
| Federation scheduler | exchange approved capability/offers/contracts without merging authority |

## Dependencies, adapters, runtimes and ownership

Identity/policy, network, storage, key and economic services are mandatory control-plane
dependencies. Backend adapters own translation and reconciliation; Kubernetes, OpenStack,
Slurm and worker runtimes own execution only after a valid lease.

## Scheduler hierarchy and conflict resolution

The apparent Kubernetes/HTCondor/Slurm/Golem/Akash conflict is resolved by separating three
questions:

1. **What kind of work is this?** The classifier chooses service, VM, MPI/HPC, independent
   task, opportunistic batch or hybrid graph.
2. **Which eligible provider should host it?** The PSDC market uses Akash-like reverse
   offers, data/network locality, risk and total evaluated cost.
3. **How is it placed inside that provider?** Kubernetes, Nova Placement, Slurm or the task
   engine performs its specialized local scheduling.

HTCondor is an interoperability route for existing high-throughput estates. Slurm is not
replaced by Golem for MPI. Kubernetes is not replaced by Akash; the Akash-derived layer can
select among eligible Kubernetes providers and issue a service lease.

## Workload-to-backend map

| Workload | Backend |
|---|---|
| opportunistic desktop/lab batch | PSDC/Golem-derived task workers |
| independent task graph | Golem-derived task fabric |
| loosely coupled parameter sweep | Golem-derived tasks |
| tightly coupled MPI/HPC | Slurm |
| long-running container service | Kubernetes |
| VM workload | OpenStack |
| mixed pipeline | PSDC workload graph with separately authorized stages |

## Tokenized resource model

Every admitted operation creates signed, non-transferable records:

- capability assertion;
- provider offer;
- credit reservation;
- compute lease;
- network reservation;
- storage placement token;
- usage/evidence receipt;
- periodic settlement commitment.

These records make capacity, provider choice, location, obligation and cost transparent.
They are not public cryptocurrency, ownership shares, identity credentials or data access
keys. Data remains encrypted in the storage fabric; a token carries only references and
commitments.

## Institutional Resource Units

Common units include CPU-core-seconds, memory-GiB-seconds, GPU-profile-seconds,
accelerator-memory-GiB-seconds, local/storage-GiB-time, I/O operations, governed egress,
network bandwidth reservation and energy where measured. Backend-specific values are
attached for audit rather than flattened away. Institution rate cards translate units into
quota/showback/settlement credits.

## Compute-cell and lab operation

A lab cell aggregates machines through a gateway. Workers enroll/attest, open outbound mTLS
sessions, advertise fresh capabilities, execute only suitable sandboxed work, yield to
interactive users, checkpoint/drain and return signed evidence. The gateway prevents
unsolicited inbound access and hides individual desktops from federation. Lab capacity is
cheap and useful but volatile; it cannot host primary critical services or uncontrolled
protected data.

## Interfaces and events

The fabric publishes OpenAPI schemas for workloads, providers, capabilities, offers,
decisions, leases, status, cancellation, receipts and disputes. CloudEvents/AsyncAPI cover
lifecycle notifications. Backend adapter APIs include reserve, launch, observe, checkpoint,
cancel, collect, release and reconcile. Mutations are idempotent. Current and previous major
contract versions are supported during migration.

## State and consistency

PostgreSQL owns current requests, offers, decisions, leases, reservations and reconciliation.
NATS JetStream distributes events; Valkey may cache expiring views. Backends remain
authoritative for their native execution state and reconcile through adapters. A
Cosmos-derived ledger records batched commitments/settlement, not heartbeats or queues.
Storage owns artifact bytes; compute stores only references and execution evidence.

## Security and privacy

Provider and worker identities are separate from users. Workloads use immutable artifacts,
short-lived credentials, default-deny network policy and isolation matched to trust/data:
container, gVisor, Kata or dedicated VM/host. Protected input keys are operation-scoped.
Economic/telemetry records use project/workload references and exclude content. Public and
federated providers require explicit scope and cannot be silent fallbacks.

The [Basic-first execution-assurance proposal](Execution-Assurance-and-Provider-Accountability.md)
details operator visibility, optional later Confidential capacity, attestation and key
release, provider conformance, dispute evidence and future live-session reservations.
It is a **proposal**, not a claim that all campus machines have TEEs or that those
interfaces are implemented. The accepted fast operational/ledger split remains
governed by ADR-0031.

## Production and critical services

Critical services may participate in dynamic placement only inside a certified pool with
reserved capacity, independent failure domains, tested HA/restore, controlled networks,
keys, patching, on-call and stable fallback. The market can optimize safe alternatives but
cannot reduce replicas, widen trust, cross residency, use a lab/public provider or evict an
accepted service when the market/ledger is unavailable.

## Capacity and fairness

Reserved safety/critical floors are removed before discretionary supply is auctioned.
Dominant Resource Fairness shares remaining multi-resource capacity between projects, with
published priority/subsidy policies. Admission controls fragmentation and headroom.
Preemption targets the lowest eligible priority, respects checkpoint/grace and produces
receipts/refunds.

## Dependency and failure matrix

| Dependency/failure | Required response |
|---|---|
| identity/policy unavailable | fail closed for new leases; accepted leases follow policy |
| registry stale | exclude stale provider/capability |
| market/resolver down | stop new dynamic placements; backends continue accepted leases |
| operational DB down | fail over; no unsafe new state; reconcile idempotently |
| ledger down | queue settlement; do not interrupt execution |
| storage/key unavailable | no new protected execution; do not copy plaintext workaround |
| network path unavailable | select next fully eligible plan or remain queued |
| worker/provider loss | checkpoint/retry/fail by class and charge verified usage only |
| backend control-plane loss | use backend runbook and reconcile; do not invent success |
| federation isolated | institution continues locally; bounded offers/exchanges expire |

## Observability and operations

Measure API/scheduler latency, eligible-set size, bid spread, provider concentration,
utilization, queue age, estimate accuracy, data movement, network cost, starts/completions,
preemption, checkpoint/retry, failed leases, receipts, reconciliation variance, credit
holds, energy and overrides. Decision traces explain gates, algorithms, weights and
outcomes. Alerts name workload owner and infrastructure owner.

## Alternatives and trade-offs

One scheduler is operationally simpler but cannot preserve specialized VM, MPI, service and
task semantics. Sending every operation through public decentralized networks violates
sovereignty. Static placement is predictable but wastes supply. PSDC uses a common
authority/economic envelope plus specialized backends and constrained dynamic markets.

## Implementation sequence, migration and rollback

1. implement schemas, registry, classifier and replay simulator;
2. integrate one internal Kubernetes or task backend with shadow receipts;
3. add lease/credit reservation and worker/cell control;
4. add OpenStack and Slurm adapters with conformance fixtures;
5. add storage/network placement and internal reverse offers;
6. certify production pools, then approved federation;
7. add ledger commitments after operational reconciliation is stable.

Rollback stops new market clears, preserves accepted leases/evidence, returns to the last
accepted static/backend policy and reconciles outstanding usage. It never changes data
classification or deletes liabilities.

## Testing and evidence

The conformance suite covers classification, each backend adapter, market failure, receipt
reconciliation, independence from public networks and protected-data leakage.

## Binary acceptance criteria

These testing and evidence gates are pass/fail and produce retained conformance artifacts.

- **CCF-ARCH-ACC-001:** every workload row selects the expected backend and rejects at least
  one superficially attractive but unsuitable backend;
- **CCF-ARCH-ACC-002:** a single trace covers identity/policy, classification, rejected
  providers, bids, score, lease, backend execution, measurement and settlement;
- **CCF-ARCH-ACC-003:** equivalent workload semantics produce common receipts across
  Kubernetes, OpenStack, Slurm and one derived task/service backend;
- **CCF-ARCH-ACC-004:** public networks disabled and federation disconnected still permit
  complete local admission, execution, storage and accounting;
- **CCF-ARCH-ACC-005:** loss of market, ledger and one provider produces documented degraded
  behavior without stopping an accepted critical service or duplicating work;
- **CCF-ARCH-ACC-006:** no token, receipt or ledger transaction contains protected content
  or usable secret/key material.

## References

- [Workload Classification](Workload-Classification.md)
- [Scheduling Algorithm](Scheduling-Algorithm.md)
- [Worker Agent Specification](Worker-Agent-Specification.md)
- [Network Architecture](../network/Network-Architecture.md)
- [Storage Architecture](../storage/Storage-Architecture.md)
- [Production Boundary](../deployment/Production.md)
- [Ledger and Operational Database Architecture](../economics/Ledger-and-Operational-Database-Architecture.md)
- [Execution Assurance and Provider Accountability (proposed)](Execution-Assurance-and-Provider-Accountability.md)
