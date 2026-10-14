# Execution Assurance and Provider Accountability

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Proposed; not an accepted deployment policy or implemented service
> Owner: PSDC Compute and Security Working Groups
> Accountable maintainer: RedjiJB until delegation
> Date: 2026-10-14
> Last reviewed: 2026-10-14
> Governing decisions: ADR-0029, ADR-0031; proposed extension: [ADR-0035](../architecture/architecture-decision-records/ADR-0035-basic-first-optional-confidential-execution.md)

## Outcome and authority boundary

**Purpose:** Define the Basic-first execution assurance architecture and the evidence
needed before a provider is advertised or credited.

**Scope:** Institution-operated compute, optional approved federation, provider
accountability and later optional Confidential execution.

**Out of scope:** Selecting a campus host, approving production data classes, setting
institutional financial penalties, procuring hardware or claiming implementation.

An institution can start with its own administered, non-TEE machines. It may later add
Confidential capacity without making that hardware a prerequisite for its sovereign
deployment. A scheduler must never translate an unavailable Confidential requirement
into a Basic placement. This document proposes implementation rules and tests; it does
not certify any campus host, decide an institution's legal data classes, or claim a
runtime exists. Existing lease, capability, KMS and ledger schemas remain contract
candidates until independently implemented and tested.

The dimensions below are independent, not a single trust score:

## Architecture and ownership boundaries

The institution owns admission, operational lease state, key release and final access
policy. Providers own only the execution capacity they advertise; the ledger records
finalized settlement, not live scheduling. A partner institution runs its own authority
and joins through explicit federation agreements. These boundaries SHOULD be enforced
by separate service identities and auditable interfaces, not a shared super-admin.

| Dimension | Question it answers | Example |
|---|---|---|
| Data classification | What may be processed, by whom and where? | Public, institution-restricted, regulated |
| Provider trust | Who owns and administers the host? | Institution, approved federation partner, public adapter |
| Execution assurance | Can the host operator inspect plaintext runtime memory? | Basic, Confidential |
| Workload shape | What runtime and recovery model fits? | Task, Service, VM, HPC, proposed Session/Stream |
| Storage tier | Where and for how long are objects held? | Ephemeral, private hot, federated, public |

An institution-owned Basic server can be suitable for sensitive production work **only
after** its own policy approves that data class, operator roles and isolation. A
federated Confidential server may provide stronger host-memory isolation but still
requires federation trust, residency, egress, cost and key-release approvals.

## Eligibility and operator visibility

| Offering | Initial eligibility | What its host operator can observe | What must be proved before advertising |
|---|---|---|---|
| Managed Basic container/VM server | Candidate for policy-approved production or research | Host root/hypervisor administrator can potentially inspect plaintext process/guest memory, mounted secrets, logs and traffic metadata; tenant-to-tenant isolation remains required | Ownership, enrollment, patch level, isolation and resource/network conformance |
| Managed Basic GPU server | Candidate where policy accepts operator visibility | Same, plus plaintext exposed to GPU memory, driver or runtime as allowed by hardware/software | GPU capability and driver/runtime tests; no claim of confidential GPU merely because GPU is present |
| Lab/desktop Basic node | Opportunistic, preemptible, lower-trust classes only by default | Machine owner/administrator can inspect running plaintext; physical owner may reclaim it | Owner consent, endpoint health, outbound-only control, sandbox, drain/reclaim tests |
| Federated Basic provider | Opt-in only for data classes explicitly permitted by both institutions | Partner host administrator may inspect plaintext runtime data | Bilateral trust, contract, residency, audit and revocation; never silent placement |
| Confidential CPU VM/container | Optional later profile | Host sees placement, timing, volumes, network metadata and ciphertext; memory confidentiality depends on the approved TEE threat model. Guest administrators and authorized application code may still see plaintext | Compatible CPU/firmware/guest, verified quote, measured workload, approved TCB, isolated key release and failure tests |
| Confidential GPU workload | Optional later, only with a supported complete CPU+GPU stack | Host still sees metadata; isolation claim depends on the entire attested CPU, GPU, firmware, driver and runtime path | Separate CPU and GPU evidence appraised together against a versioned support matrix |

Basic encryption at rest, TPM boot evidence, a signed container, eBPF controls or a
microVM does **not** hide live plaintext from a sufficiently privileged host operator.
Conversely, a TEE is not a guarantee of correct results, side-channel immunity, safe
application code, lawful processing or secrecy of output after it leaves the protected
environment. A storage holder receives encrypted shards when the storage policy calls
for them, but can still observe sizes and access patterns. A network relay can observe
endpoints and traffic characteristics despite encrypted payloads. These disclosures
must appear in workload admission and federation agreements.

## Fast control path, bounded leases and slower ledger

This section elaborates the **already accepted** [ADR-0031](../architecture/architecture-decision-records/ADR-0031-off-chain-operations-and-on-chain-settlement.md), not a new blockchain decision.

1. The requester submits a signed [workload manifest](../../contracts/compute/workload-manifest.schema.json). Institution policy checks classification, identity, issuer trust, locality, execution assurance, allowed runtimes and budget before ranking offers.
2. In one PostgreSQL transaction, the control plane reserves capacity and any IRU credit hold, records the placement decision and creates a fenced [lease](../../contracts/compute/lease.schema.json) plus an outbox event. Its generation identifies the current authority; stale generations cannot run or settle.
3. The worker activates the grant with the bound challenge, enforces absolute expiry and its maximum-disconnected bound, and emits sequenced heartbeats and signed usage observations. A heartbeat is **liveness evidence**, not an extension or a correctness proof. Renewals require a new authorized transition.
4. Consumers de-duplicate by lease/generation/sequence, tolerate at-least-once delivery, and reconcile unknown or delayed outcomes before reassigning scarce capacity. PostgreSQL holds current lease/heartbeat/reservation/hold state; NATS JetStream distributes events but is not the authority. An operator may see `unknown` rather than fabricate a healthy state.
5. Receipts and native backend measurements are reconciled in the governed evidence store. Only finalized balance changes, dispute outcomes and cryptographic commitments are batched to the Cosmos-derived ledger. The chain does not receive heartbeat streams, protected payloads or the high-frequency scheduler database.

Heartbeat interval, stale threshold and disconnect ceiling are **profile parameters**,
not guessed universal constants. A pilot must derive them from network jitter,
maintenance windows, clock behavior and workload recovery needs. The profile must
specify `heartbeatInterval < staleThreshold <= maximumDisconnectedSeconds` where a
disconnected continuation is allowed, and must never extend beyond the signed lease
expiry. Missed heartbeats mark state uncertain and stop new allocations to that slot;
the worker self-stops when its local bounded grant expires, including when control
plane or ledger connectivity is lost. The controller reconciles the previous attempt
before reassignment. Ledger outage queues settlement and does not itself interrupt a
valid lease, but new credit-risk exposure follows a separately approved limit.

## Confidential attestation and key release: proposed profile

No attestation protocol is required merely to call an institution-managed node Basic.
Basic admission still needs institutional enrollment, inventory and host-health policy.
A TPM quote can strengthen boot-state evidence but cannot convert Basic to Confidential.

For a Confidential **operation-grant**, the verifier assembles a composite evidence
record. Native hardware reports do not necessarily contain every field in this record:

- approved provider and host identity, CPU/TEE product, firmware and current security
  version, endorsement chain and revocation status;
- the vendor report/quote with a verifier-issued unpredictable nonce, measured guest
  image/init data and debug/migration policy, plus the approved workload artifact digest;
- a cryptographic binding to the workload ID, lease ID and generation, requested
  operation, and an ephemeral session public key so a quote from one session cannot
  release a key into another;
- GPU product, firmware, mode and separate attestation when GPU memory confidentiality
  is claimed; and
- verifier identity, reference-policy revision, appraisal result, observation time,
  expiry and evidence digest, signed by the institution-approved verifier.

The challenge must be single-use and short-lived; the verdict expires independently of
the lease. **Candidate pilot values** are a 60-second challenge and a five-minute
key-grant verdict, followed by reappraisal on renewal, migration, TCB/policy change or
suspected compromise. These are test hypotheses, not contract defaults: clock skew,
offline operation and vendor quote latency must be measured before acceptance. A
long-running job needs an approved reappraisal cadence and a response to failed renewal.

The institution-owned KMS applies *both* the verifier result and local authorization
policy. It refuses a key when evidence is absent, stale, replayed, revoked, below the
minimum TCB, measured against an unapproved image, in debug mode contrary to policy,
bound to a different lease/generation/channel, or when the local requester/provider/data
policy denies access. It issues only a short-lived, operation-scoped grant under the
[KMS grant contract](../../contracts/security/kms-operation-grant.schema.json).
Revocation stops new grants and placements, invalidates active grants where technically
possible, drains or terminates affected leases, rotates affected keys and records the
incident. It cannot un-disclose plaintext that a previously authorized workload or
Basic operator already observed.

This profile follows the evidence/appraisal/policy split in [IETF RATS RFC 9334](https://www.rfc-editor.org/rfc/rfc9334.html)
and the [primary-source research note](../research/Confidential-Execution-Attestation-Primary-Source-Notes.md).
An implementation must validate each supported hardware stack against its current
vendor documentation before claiming Confidential support.

## Portable identity and software admission

A [W3C Verifiable Credential](../identity/Identity-Architecture.md) is portable
evidence, not a universal access token. The receiving school validates its signature,
issuer, credential status, subject binding and presentation freshness; then maps the
evidence to a **local** account and its own policy. It can deny access even when the
credential is authentic. Federation has no cross-institution super-administrator.

Software follows the same separation. Signature verification establishes which key
signed an exact artifact digest. Admission additionally requires an institution-approved
publisher and signing root, pinned digest, provenance, SBOM/license and vulnerability
policy, workload classification, allowed capabilities, network/secret scope and any
human approval needed for high-risk code. A changed digest or withdrawn publisher
invalidates the prior admission. The admission controller must fail closed on missing
policy and record an explainable decision; the runtime enforces sandbox and egress
limits after admission. Self-hosted [Sigstore policy-controller](https://docs.sigstore.dev/policy-controller/)
is a candidate mechanism, not a mandatory external vendor service or blanket approval
of every signed image.

## Proving a provider can deliver what it advertises

A signed capability advertisement is an assertion until tested. Evidence must be
bound to a provider, host/backend version, test time, expiration and policy revision.
Advertisement expires or is withdrawn after a relevant hardware/software change.

| Offering | Positive conformance | Negative and failure probes | Independent evidence |
|---|---|---|---|
| Container | Pull by digest; run bounded CPU/memory/IO job; enforce identity, cgroup and egress policy; return receipt | Privileged/unknown image denied; over-limit job stopped; node loss and stale generation fenced | Cluster admission event, cgroup/native metrics, signed worker receipt |
| VM | Create/boot/stop approved image; attach allowed network/storage; meter vCPU/RAM/disk | Unauthorized image/network denied; failed boot rolls back holds; stale lease cannot start | OpenStack/native lifecycle and metering records plus reconciled receipt |
| GPU | Run known-answer kernel; verify device/model, memory and time slicing or exclusivity | Unsupported driver, inaccessible device, out-of-memory and GPU reset handled; no false Confidential label | Vendor telemetry, test output and worker receipt; separate attestation for Confidential |
| Slurm/HPC | Run bounded batch and MPI test on approved interconnect | Queue timeout, partial allocation and node failure handled | Scheduler allocation/accounting and application result checks |
| Storage | Write/read/delete encrypted test object; check digest, placement, repair and retrieval SLO | Corrupt shard, holder outage, wrong tenant, revoked key and failed deletion evidence | Object manifest, provider receipts, repair/audit logs and tenant digest check |

Passing a conformance test does not prove future availability or correct results for
every workload. The scheduler must also consider health, current capacity, policy and
recent failure history. No test can establish production performance without measured
site capacity and workload-specific SLOs.

## Usage, correctness and dispute evidence

| Claim | Useful evidence | What the evidence does **not** establish |
|---|---|---|
| A lease was authorized | Signed manifest, policy decision, generation and activation grant | That work actually ran |
| A resource was used | Sequenced heartbeat, signed receipt, native Kubernetes/OpenStack/Slurm/GPU/storage measurements and reconciliation | That provider counters are automatically honest or output correct |
| A particular binary and inputs were named | Pinned code/input digests and signed receipt | That a Basic host executed them faithfully |
| A Confidential environment was launched | Verified TEE quote, measurement and bounded key grant | Correct application logic, side-channel immunity or correct result |
| A result is correct | Client verification, deterministic re-execution where safe, known-answer tests, domain-specific assertions, approved independent check or suitable proof | Universal correctness; nondeterministic and private work may not admit replay |

Disagreement creates a dispute with preserved evidence, a provisional financial hold
and an accountable human decision. A provider's termination reason and an automated
anomaly are **claims**, not final authority. The adjudicator is separate from the
provider and records evidence, attribution, decision, appeal window and corrective
entry. Possible outcomes are no action, re-run, refund, reserve release, proportional
IRU adjustment, suspension or contract remedy. No transferable stake, public token,
automatic slashing or irreversible punitive chain event is required. The ledger records
the final outcome and any correction; it does not replace due process.

An optional **performance reserve** can be a non-transferable IRU hold or contractual
capacity guarantee. Its size, eligible failure classes, maximum loss, review authority
and appeal route need institution finance approval. It cannot be computed solely from
provider self-report or a detector score. This is a proposed accountability mechanism,
not an accepted tariff or employment policy.

## Live sessions and streams: future shape, not v1 claim

Session and Stream need admission on **compute plus network plus storage/egress** at a
specific latency and concurrency target. Before accepting a session, the control plane
reserves a slot, route/QoS budget and bounded IRU hold atomically or compensates all
partial reservations. It records session/stream ID, owner, lease generation, start and
expiry, endpoint, reconnect token, measurement method and recovery class. A fast path
uses local managed capacity first; optional federation/CDN adapters are opt-in and
never needed for an institution to run its core deployment.

During operation, worker and path heartbeats report separate compute health and media
quality (for example packet loss, jitter, latency, delivered bytes and active duration).
Metering distinguishes reserved from delivered capacity. On node failure, an approved
warm standby or re-placement may reconnect a stateless session; a stateful session needs
checkpoint/replication support and may still lose in-flight state. A stream must disclose
whether it offers seamless failover, reconnect with a gap, or termination and refund.
Duplicate leases, double billing and unauthorized replay are negative fixtures. These
interfaces require a new versioned Session/Stream contract and measured network profile;
they must not be inferred from the current Task/Service/VM schemas.

## Failure and recovery

Control-plane loss stops new lease issuance while accepted workers honor their bounded
grants. A lost heartbeat is an uncertain outcome, not an automatic failed billable job.
Worker loss requires attempt reconciliation and fencing before retry. Verifier or KMS
loss denies new Confidential key grants; it does not license a Basic downgrade. Ledger
loss queues settled commitments while the institution follows its approved exposure
limit. Federation loss isolates the local deployment, which MUST retain its own identity,
policy, scheduling and recovery path. No failover may silently widen data residency or
operator visibility.

## Cost and rollout gates

| Choice | Benefit | Cost or burden | Launch position |
|---|---|---|---|
| Managed Basic | Uses existing campus assets and familiar operators | Host-root visibility, hardening, patching, physical security and isolation audits | Default, with explicit data-class approval |
| Basic lab/desktop | Opportunistic capacity | Preemption, variable uptime, weaker physical/operator trust, more sandbox support | Pilot for permitted work only |
| Confidential CPU | Narrows host-memory exposure, valuable across provider boundaries | Compatible hardware, reduced eligible pool, verifier/KMS lifecycle, vendor TCB updates and performance tests | Optional later |
| Confidential GPU | Potential protection for selected AI workloads | Scarce supported stack, procurement and driver/runtime constraints, higher integration effort | Optional later, separate certification |
| Rapid heartbeats and fencing | Faster failure detection and fewer duplicate grants | Database/event traffic, clock and network tuning, reconciliation effort | Required; measured pilot parameters |
| Batched ledger | Shared settlement/audit commitments without hot-path consensus | Operator and validator governance, batch delay, dispute workflow | Already accepted, after off-chain reconciliation |
| Optional partners/CDN | Burst or geographic reach | Contracts, privacy, routing and exit risk | Never required for sovereign core |

Do not put invented dollar premiums or throughput claims in an acceptance gate. Record
actual host count, eligible capacity, quote latency, CPU/GPU overhead, reservation
latency, heartbeat loss, failure recovery time, operator effort and cost per delivered
workload in the pilot. Compare Basic and Confidential using the **same** workload,
dataset, SLO and accounting boundary.

### Acceptance and open decisions

1. Map every actual host to owner, physical control, network zone, Basic eligibility,
   supported runtime, data classes and tested conformance evidence. No Confidential
   advertisement until its complete stack passes attestation and key-denial tests.
2. Publish institution-approved operator-visibility notices and data-class placement
   rules. Decide which production workloads may use Basic and which require stronger
   isolation; a generic PSDC document cannot grant that approval.
3. Version the composite attestation, capability, heartbeat, reservation and dispute
   interfaces; add positive, stale, replay, mismatch, revoked, timeout, provider-fault,
   worker-loss and ledger-outage fixtures without breaking existing v1 consumers.
4. Measure and approve heartbeat/stale/disconnect and attestation-freshness parameters.
   Name security, finance, privacy and service adjudicators and appeal owners.
5. Pilot container, VM, GPU, storage and any HPC offering with native independent
   measurements. Session/Stream require their own contract and network-capacity pilot.
6. Verify that an isolated institution can enroll machines, admit software, authorize
   students, schedule leases, hold credits and recover service with external partners
   unavailable. Federation and public adapters are added only by explicit agreement.

No machine inventory, site SLO, approved TEE hardware list, pricing schedule, named
adjudicator or production policy is established by this proposal.
