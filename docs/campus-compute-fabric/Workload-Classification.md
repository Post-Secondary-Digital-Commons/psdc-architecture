# Compute Workload Classification and Backend Selection

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Campus Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0010, ADR-0013, ADR-0026, ADR-0028, ADR-0029

## Purpose and measurable outcome

This specification converts a workload request into a versioned workload class, production
criticality, data boundary and allowed backend set. Classification occurs before provider
bidding. A conformant classifier sends the same manifest and policy version to the same
backend family, explains every exclusion, and never allows price to weaken a hard control.

## Stakeholders and use cases

- students submit interruptible lab, rendering, build and AI evaluation work;
- researchers submit independent tasks, parameter sweeps and tightly coupled HPC jobs;
- platform teams deploy long-running containers, stateful services and VMs;
- service owners run critical institutional services inside production boundaries;
- storage and network controllers expose locality, tier and path constraints;
- federation operators accept only explicitly approved portable workloads.

## Scope, exclusions and prohibited responsibilities

The classifier owns workload taxonomy, required manifest fields, backend eligibility and
classification evidence. It does not authenticate a user, authorize data, choose a winning
provider, operate Kubernetes/OpenStack/Slurm, release keys, or settle credits. It MUST NOT
infer a weaker data class from missing fields, silently convert a critical workload into
opportunistic work, or send protected data to an external provider.

## Out of scope

Provider ranking, resource leasing, backend execution, key release and settlement are
performed downstream after classification.

## Required manifest

**CCF-WC-001:** The v1 admission API MUST reject a manifest missing its common
core: workload and request identifiers, requester subject/institution/project,
accountable owner, purpose, data classification, workload class and criticality;
backend preferences; CPU, memory, accelerator count, scratch and node count;
image reference and digest; maximum concurrent tasks and communication mode;
institution/provider scope, trust tier and residency countries; ingress/egress
mode; storage-requirement array (empty only when no governed object is needed);
priority, preemption, maximum runtime, retry policy, budget ceiling, software
license decision, admission-policy decision and contract version. The schema
encodes these as required fields in
[the workload manifest](../../contracts/compute/workload-manifest.schema.json).

**Conditional inputs:** container, AI and critical services and VMs require
availability, latency, RPO and RTO objectives. Critical and safety/records
workloads additionally require non-preemptible scheduling; production trust,
eligible failure domains and any exceptional federation are policy decisions
that must be explicit and cannot be inferred from the JSON shape. MPI requires
tightly coupled communication and a
named network profile. Deadline, checkpoint interval, bandwidth, object
references and specific provider IDs are required only when requested or when
institution policy for that class demands them. Policy evaluates such conditions
before bidding; JSON Schema does not prove that an institution's policy was run.

Unknown classification, residency, owner, image digest, budget or provider
scope fails closed. The v1 submission contract rejects unknown duration or
resource quantities. A bounded discovery queue would require a separate
contract and is not silently implied by this API. Hybrid graphs and bare-metal
appliances remain architecture targets, not v1 manifest classes; they require
separate graph/stage or reservation contracts before admission.

## Classification hierarchy

Classification is hierarchical. The first matching specialized class wins; a hybrid graph
is decomposed into independently authorized stages rather than forced into one backend.

| Workload | Primary scheduler/backend | Why it fits | Typical fallback or prohibition |
|---|---|---|---|
| Opportunistic desktop/lab batch | PSDC/Golem-derived task workers | Preemptible, outbound worker sessions, retryable units and idle capacity | HTCondor-compatible adapter; never critical primary service |
| Independent task graph | Golem-derived task fabric | DAG dependencies, per-task offers, retries and result verification | Kubernetes Jobs/Argo after adapter approval |
| Loosely coupled parameter sweep | Golem-derived tasks | Many independent inputs and horizontal work stealing | Slurm arrays or Kubernetes Jobs |
| Tightly coupled MPI/HPC | Slurm | Gang scheduling, topology awareness and high-speed fabric | No automatic task-fabric fallback |
| Long-running container service | Kubernetes | Reconciliation, service discovery, health, rollout and autoscaling | Akash-derived provider/lease layer may select an eligible Kubernetes provider |
| VM workload | OpenStack | VM lifecycle, image, volume, network and tenant isolation | Kubernetes virtualization only after separate evidence |
| Bare-metal/special appliance | Ironic or approved bare-metal controller | Firmware, accelerator or isolation requirement | Manual reservation if automation cannot preserve safety |
| Critical stateful institutional service | Kubernetes or OpenStack in a production pool | Stable HA, storage, network, backup and named ownership | No opportunistic lab or unapproved federation provider |
| Mixed pipeline | PSDC workload graph | Each stage gets the correct backend and shared evidence chain | Reject if data/identity cannot cross a stage boundary |

HTCondor is an interoperability and migration adapter for high-throughput batch estates;
it is not the default for MPI workloads and does not replace the PSDC market, lease,
identity, evidence or accounting contracts.

## Criticality and provider-scope matrix

| Criticality | Allowed provider scope | Dynamic behavior |
|---|---|---|
| experimental | opportunistic, internal, approved federated or approved public | broad bidding; preemption and retry expected |
| standard | managed internal and approved federated | dynamic placement with declared fallback |
| important | prequalified managed providers | reserved floor plus bounded optimization |
| critical | production-certified institution-controlled pool by default | optimize only within reserved, HA and failure-domain constraints |
| safety/records authority | named dedicated profile | no unreviewed movement; change-controlled placement plan |

**CCF-WC-002:** Public or federated scope requires an explicit manifest value and policy
decision. It is never inferred from budget pressure or internal capacity exhaustion.

## Decision mechanics

    validate schema
       -> bind identity, project and policy
       -> resolve data/storage/network constraints
       -> determine execution shape and criticality
       -> construct allowed backend set
       -> construct eligible provider universe
       -> emit signed classification record
       -> send to market resolver

The signed record contains input digest, classification result, allowed/rejected backends,
reason codes, policy version, classifier version and expiry. Reclassification creates a new
record; it never mutates historical evidence.

## Interfaces and compatibility

- The v1 submission seam is `POST /workloads`, which returns `202` for an
  immutable request accepted **for classification**, not an execution grant.
  `GET /workloads/{workloadId}/classification` reads a completed signed
  classification record. A separate `POST /v1/workload-classifications` is not
  part of the current OpenAPI contract and must not be assumed by consumers.
- WorkloadClassified is a CloudEvents event containing identifiers and digests, not
  secrets or protected content.
- Backend adapters publish capability schemas consumed by the classifier. Unknown fields
  are rejected under the declared schema compatibility policy.
- Current and previous major contract versions remain readable during migration; execution
  uses only a currently supported version.

## Dependencies, adapters, runtimes and ownership

The classifier depends on identity/policy, data/storage classification and fresh capability
contracts. Backend adapters publish capabilities but cannot choose their own workload class.

## State and data handling

The classifier stores manifests, decisions and reason codes in the operational database.
Protected object contents and keys are never classifier state. Decision evidence follows
institution audit retention; transient capability snapshots expire. Subject identifiers are
pseudonymized where an accountable project reference is sufficient.

## Security, privacy and abuse controls

- policy and authorization failure is fail-closed;
- submitted resource estimates are capped by project and provider policy;
- images and inputs require immutable digests and supply-chain decisions;
- provider advertisements are authenticated, freshness-bounded and evidence-backed;
- repeated underestimation, bid manipulation or prohibited egress attempts create risk
  signals but never silently change a student's identity or academic status.

## Capacity, degradation and failure matrix

| Failure | Required behavior | Evidence |
|---|---|---|
| classifier unavailable | no new discretionary lease; accepted running leases continue | outage and recovery event |
| policy engine unavailable | fail closed for new classifications | denial reason |
| capability registry stale | exclude stale providers | freshness reason |
| no eligible backend | return unschedulable with remediable constraints | considered-set trace |
| budget insufficient | queue, request approved increase or reject; never weaken policy | budget decision |
| mixed graph boundary invalid | reject the affected edge and whole atomic request | graph validation report |

## Deployment and operations

Run at least two stateless classifier instances per production failure domain. Configuration
is signed, GitOps-managed and promoted through synthetic, shadow and enforcing stages.
Metrics include decision latency, class distribution, rejection reasons, stale capabilities,
manual overrides and later estimate error. Alerts detect sudden class or provider shifts.

## Alternatives and trade-offs

Letting each backend classify work is simpler but produces inconsistent controls. Sending
everything to Kubernetes reduces components but is poor for MPI, VMs and opportunistic
task markets. Sending everything through Akash/Golem-style mechanisms improves economic
uniformity but adds latency and discards backend-specific scheduling strengths. PSDC keeps
one classification and economic envelope while delegating execution to the right scheduler.

## Implementation sequence and rollback

1. publish schema and deterministic fixtures;
2. classify recorded sample workloads without scheduling;
3. run shadow decisions beside existing manual/backend routing;
4. resolve disagreements and freeze v1 reason codes;
5. enforce non-production, then standard, then production classes.

Rollback returns routing authority to the last accepted version, freezes new unsupported
classes and retains all decision records. It never reroutes a protected workload to a less
trusted provider.

## Testing and evidence

The [H-006 candidate handoff](../roadmap/H-006-Workload-Classification-Handoff.md)
contains the v1 class-to-backend decision table and synthetic, institution-neutral
decision cases. Its structural checker proves the cases are well formed and cover
the declared classes; only a future classifier adapter can prove decision behavior.
Mixed graphs and bare-metal remain outside the v1 manifest, so neither may be
claimed as covered by v1 conformance.

## Binary acceptance criteria

These testing and evidence criteria are binary and retained with the classifier version.

- **CCF-WC-ACC-001:** every admitted v1 manifest class has positive and
  policy-denial cases whose backend set and reason codes match exactly; the
  architecture-only bare-metal and mixed-graph rows need their own contracts;
- **CCF-WC-ACC-002:** lowering a bid cannot make a provider pass a failed data, identity,
  trust, residency, production or network constraint;
- **CCF-WC-ACC-003:** a mixed AI pipeline decomposes into task, service and storage stages
  with one trace and no unauthorized data edge;
- **CCF-WC-ACC-004:** classification is deterministic for identical versioned input and
  records a new immutable decision after a policy change;
- **CCF-WC-ACC-005:** public adapters unavailable or disabled do not prevent internal-only
  workload classification.

## References

- [Scheduling Algorithm](Scheduling-Algorithm.md)
- [Compute Fabric Architecture](Campus-Compute-Fabric-Architecture.md)
- [Storage Architecture](../storage/Storage-Architecture.md)
- [Production](../deployment/Production.md)
- [ADR-0029](../architecture/architecture-decision-records/ADR-0029-unified-institutional-resource-metering.md)
