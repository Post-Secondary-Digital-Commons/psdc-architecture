# Confidential Execution and Provider Visibility

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Proposed security boundary; TEE deployment and contracts not accepted or implemented
> Owner: PSDC Security and Campus Compute Fabric Working Groups
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-13
> Governing decisions: ADR-0013, ADR-0026, ADR-0028, ADR-0031

## Purpose and present answer

This document answers who may see workload code, inputs, intermediate data,
memory, and outputs while a provider executes a workload. The current
[workload manifest](../../contracts/compute/workload-manifest.schema.json)
declares data classification and minimum trust tier. The
[capability advertisement](../../contracts/compute/capability.schema.json)
declares device trust and attestation status. **Neither contract declares a
TEE, an attested workload measurement, a confidential-runtime guarantee, or
key release bound to that measurement.** Device enrollment or a `valid`
attestation status therefore does not establish that a host administrator
cannot inspect workload plaintext.

The safe present assumption is: **a provider controlling the host can inspect
or capture data that the workload decrypts for ordinary container or VM
execution.** Container isolation limits what a workload can access on its host
and helps separate tenants; it is not confidentiality *from* that host. An
ordinary VM improves workload separation but still trusts its hypervisor and
operator. Application encryption protects transit and storage, but plaintext
appears in memory when ordinary execution uses it. No PSDC document may claim
otherwise without a separately verified confidential-execution path.

## Scope and out of scope

In scope are provider visibility, execution-time confidentiality claims,
workload/device attestation separation, key-release boundaries, and the
contract work needed to add a confidential path. Out of scope are selection
of a TEE vendor or product, site hardware inventory, legal approval for
student records, and claims that any provider or runtime is certified.

## Architecture and ownership boundaries

The institution owns admission policy, verifier trust, KMS authority, and the
final placement decision. A provider advertises capabilities and supplies
evidence but does not certify itself. The execution runtime owns isolation
inside the approved host. Storage owns ciphertext placement; it does not
decide whether execution may decrypt an object. A federation peer makes its
own local admission decision under the shared contract.

## Threat and trust boundary

Actors are the requester/data owner, institution authority, provider
operator, host administrator, other workloads, runtime, KMS, and attestation
verifier. The protected assets are code, models, prompts, student records,
datasets, keys, intermediate state, output, and workload metadata. The
provider may be an institution-controlled production node, a campus lab PC,
an approved federated institution, or a volunteer/personal machine. These
are different trust principals even when all use the same lease protocol.

| Execution profile | Other tenants isolated? | Host administrator visibility | Appropriate default |
|---|---|---|---|
| OCI container with hardened runtime | Policy-dependent; shared kernel | Assume host can inspect processes, volumes, memory, and logs | Public, synthetic, or approved data within a trusted institution |
| Sandbox runtime or microVM without hardware confidentiality | Stronger isolation for workload/host compromise; still platform-dependent | Assume host/hypervisor can inspect decrypted state | Untrusted code with separately approved data boundary |
| Hardware-backed confidential VM/container with verified attestation | Isolation depends on runtime and configuration | Some host memory/CPU-state access is constrained by the TEE; metadata, I/O, side channels, device paths, and compromised guest code remain threats | Only after threat model, policy, hardware, verifier, key flow, and end-to-end tests are approved |

This table is a design boundary, not a certification of any product or node.
The TEE protects only what the selected technology, firmware, guest image,
device model, and verifier policy actually measure and isolate. GPU memory,
storage, network endpoints, logs, debug interfaces, and external services need
their own assessment; a CPU TEE label alone does not cover them.

## Current placement consequence

- A protected workload that requires confidentiality from a provider operator
  has **no supported confidential-execution placement path** in the current
  contracts. Admission must reject or hold it for a separately approved path;
  a higher `minimumTrustTier` or generic `attestationStatus: valid` does not
  repair the missing guarantee.
- Institution-controlled providers may execute approved protected workloads
  under institution policy and operator trust. This is **trusted operation**,
  not cryptographic host blindness. The institution must name the accountable
  operator and apply access controls, logging, separation of duties, and
  incident procedures.
- Student-owned, volunteer, and untrusted third-party hosts remain limited to
  public, synthetic, or explicitly approved data for which host visibility is
  acceptable. Encrypting an object before transfer does not help once that
  host receives the key and decrypts it for ordinary execution.
- Federation requires a receiving institution's authority, data-sharing
  agreement, residency decision, and provider profile. Federation alone does
  not confer confidentiality against the receiving operator.

## Interfaces, dependencies, and deployment

Current interfaces are the workload manifest, capability advertisement,
classification record, lease, and KMS operation grant. They are insufficient
for the proposed property; their existing fields retain their current
meaning. A future TEE deployment depends on supported hardware and firmware,
an approved guest/runtime, independent verifier, institution-operated key
authority, compatible device and network paths, and recovery procedures.
None may be inferred from a container image label or provider bid.

## Capacity, performance, and failure behavior

Confidential-capable provider capacity is a separate eligible pool, not a
fallback label applied to ordinary nodes. Bidding may rank eligible offers
only after hard confidentiality filters. The pilot must measure queue delay,
startup/attestation latency, throughput, GPU compatibility, memory overhead,
and cost against the same workload on a trusted non-TEE node. Missing verifier,
unsupported device path, stale firmware, KMS outage, or failed revocation
means no new plaintext release; running work follows a documented kill,
quarantine, or controlled-drain policy chosen in a later ADR.

## Candidate confidential-execution path, not yet selected

The implementation sequence for a future path is:

1. The workload owner declares a *host-confidentiality requirement*, data
   classification, allowed hardware/runtime families, and prohibited I/O.
2. The resolver filters candidate providers to independently verified
   confidential-capable hardware and approved software measurements before any
   price or performance ranking.
3. A fresh verifier challenge binds a workload-specific measurement, nonce,
   provider identity, TEE technology, firmware/TCB status, guest image,
   policy version, and expiry to a verdict. Enrollment attestation and
   workload attestation are distinct records.
4. The institution-controlled KMS releases a short-lived decryption grant
   only to an ephemeral key bound to the verified guest and lease. Failed,
   stale, revoked, downgraded, or missing evidence means no key release.
5. Encrypted inputs are delivered to the guest; output is encrypted for the
   authorized recipient before leaving the protected boundary. The design
   must explicitly cover logs, debug, crash dumps, swap, checkpoints, GPU
   buffers, storage, network endpoints, and operator maintenance access.
6. Renewal, migration, recovery, and revocation repeat the trust decision.
   Receipts record verdict and policy references, not plaintext or secrets.

The open-source [Confidential Containers](https://confidentialcontainers.org/docs/attestation/)
project is a candidate integration reference for attestation and conditional
secret release; it is **not** currently a PSDC runtime dependency or proof of
fit for campus GPUs, Kubernetes, Slurm, or OpenStack.

## Contract and decision gaps

Before claiming provider-blind execution, the owners need an ADR and versioned
contracts for at least:

- requested confidentiality property and threat model (host admin, other
  tenant, guest compromise, side channels, physical attacker);
- provider capability: hardware generation, firmware/TCB, supported runtime,
  verifier, isolation scope, device/GPU path, and freshness;
- workload measurement: image, init data, policy, kernel/guest, nonce,
  verifier identity, challenge scope, and expiry;
- KMS operation grant bound to verdict, lease generation, audience, purpose,
  object set, expiry, and revocation;
- scheduler exclusion and reason codes for unavailable or failed confidential
  capacity, including no silent fallback to ordinary containers;
- evidence and privacy policy for measurements, verdicts, provider metadata,
  logs, incident response, and federation exchange;
- conformance fixtures for valid, stale, forged, cross-workload, revoked,
  incompatible-GPU, key-service-outage, and migration cases.

No field in the current workload manifest or capability schema should be
reinterpreted as one of these missing fields. A contract migration is required.

## Verification and operational acceptance

A future pilot must demonstrate: provider-admin inspection attempt against an
ordinary container (expected confidentiality failure); approved TEE workload
with fresh independent attestation and conditional key release; rejection for
each failed attestation or policy condition; encrypted outputs and clean
runtime artifacts; performance and cost on target CPU/GPU workloads; firmware
upgrade, revocation, recovery and rollback. Record hardware, firmware,
verifier, guest image, policy, code revision, operator, and observed result.
Synthetic data is required until institution security and privacy approval.

## Acceptance criteria and decision status

This assessment is complete as a *gap statement* when a reviewer can locate
the current contract fields, reproduce the lack of a confidential-execution
field, and explain why a host administrator remains in the trusted computing
base for ordinary workloads. It does not authorize a TEE pilot. A future pilot
passes only after the ADR, contract versions, negative fixtures, independent
verifier, key flow, measured hardware results, institution approval, and
recovery drill are all evidenced. Each missing item remains an open gate.

Current status: this is a documented threat boundary and candidate path.
There is no deployed TEE, selected attestation trust root, key
broker, hardware inventory, confidential-workload schema, or runtime test in
the PSDC platform. Attestation and container-hardening prose alone cannot be
reported as provider-blind execution evidence.

## Primary sources and related documents

- [Kubernetes multi-tenancy](https://kubernetes.io/docs/concepts/security/multi-tenancy/): containers share a host kernel and need additional isolation controls.
- [Kubernetes kernel security constraints](https://kubernetes.io/docs/concepts/security/linux-kernel-security-constraints/): non-root, seccomp, SELinux/AppArmor, and sandbox trade-offs.
- [NIST SP 800-190, Application Container Security Guide](https://csrc.nist.gov/pubs/sp/800/190/final): container/host threat model.
- [Confidential Containers attestation and key release](https://confidentialcontainers.org/docs/attestation/): candidate open-source pattern.
- [Confidential Containers attestation policy](https://confidentialcontainers.org/docs/attestation/policies/): measurement-policy limits.
- [Job Sandboxing](../campus-compute-fabric/Job-Sandboxing.md).
- [Machine Attestation](Machine-Attestation.md).
- [Storage Architecture](../storage/Storage-Architecture.md): storage encryption and custody are different from execution confidentiality.
