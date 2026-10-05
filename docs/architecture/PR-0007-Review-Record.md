# PR 7 Vision, Architecture, and Contract Safety Review

> Standard: PSDC-DOC-001
> Document type: historical-record
> Status: Review completed; accepted-source decisions preserved; incorporated findings identified below
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-04
> Governing decisions: Architecture Authority and Precedence; Human Choices and Decisions Register; ADR-0001; ADR-0013; ADR-0029; ADR-0031
> Date: 2026-10-04
> Source: Independent repository review of PR 7 and its PR 6 contract base
> Supersedes: No earlier review record

## Purpose

This record reviews the 19 vision and architecture drafts in PR 7 together with the contract
surface inherited from its stacked PR 6 base. Founder-accepted decisions were treated as fixed
authority. The review tested whether draft text or contract candidates contradict those decisions,
overclaim guarantees, leave unsafe ambiguity, or obscure implementation blockers. It does not
claim that any service exists.

## Review boundary and method

The review covered the 19 files changed by PR 7; common and compute schemas; lifecycle tables;
reason-code registry; OpenAPI and AsyncAPI surfaces; fixtures; and the local validator. It used
the repository authority hierarchy rather than raw chat exports. It ran the contract, structural,
quality and semantic documentation gates after remediation. The locally excluded `review-bundle/`
is a transport artifact, not evidence or authority, and must be regenerated after source changes.

## Ranked findings and dispositions

| Severity | Finding and failure scenario | Disposition in this batch | Remaining evidence |
|---|---|---|---|
| High | `expectedGeneration` was optional in the shared transition request. A stale controller could submit an otherwise valid lease transition without fencing. | Split provider and lease request bodies; lease transitions now require `expectedGeneration`; validator asserts that requirement. | H-004 compare-and-swap transaction and stale-generation race tests. |
| High | The contracts did not state the operational uniqueness rules that prevent two leases or double settlement. JSON Schema cannot enforce cross-record uniqueness. | Added explicit idempotency, lease-lineage, receipt, interval, settlement-consumption and projector invariants to Control Plane and Resource Model. | PostgreSQL indexes, isolation model, inbox/outbox and crash/replay tests. |
| High | CP-3 implied an unreachable controller could revoke a disconnected worker instantly. | Replaced the claim with monotonic self-expiry, no offline renewal, bounded disconnected exposure and authenticated revocation delivery. | Clock-skew profile, heartbeat policy and worker fail-stop tests. |
| High | CP-1 prohibited all direct data-plane access, which the first review judged too strict. | Superseded by the cross-review below: the loosening conflicted with accepted authority and was reverted. CP-1 again forbids direct client access to workers, storage backends and model runtimes and routes bulk transfer through an institution-owned data-plane gateway. | Gateway design, or a superseding ADR if direct signed access is ever wanted. |
| High | Usage receipts after sequence one did not require a prior digest, leaving a chain gap that aids omission or reordering. | Sequence greater than one now requires `priorReceiptDigest`; sequence one prohibits it; positive and negative fixtures cover the rule. | Transactional uniqueness and non-overlap enforcement; forked-chain dispute tests. |
| High | Event fields could be mistaken for an exactly-once guarantee. A duplicate delivered after a crash could repeat a lease or settlement action. | CP-4 now requires unique inbox state, atomic business/inbox commit, transactional outbox, scoped ordering and deterministic duplicate response. | H-004 implementation and fault-injection evidence. |
| Medium | Provider/capability revocation text implied leases end automatically, bypassing lease authority and reason evidence. | FD-4 now requires an explicit signed lease transition by the lease authority. | Bulk-reconciliation and partial-delivery tests. |
| Medium | Provider-selected reclaim/fault codes can change retry, billing and reputation treatment. | FD-6 declares provider codes assertions only and requires authoritative evidence. The gap is now explicit. | Registry fields for asserting actors, evidence types, clock tolerance and economic treatment. |
| Medium | DR text treated signed records/events as sufficient operational recovery and implied immediate deletion from immutable backups. | DR-3/DR-4 now distinguish PostgreSQL/WAL authority, projector rebuilds, bounded worker retention, tombstones, crypto-erasure and backup expiry. | Restore, deletion, key-destruction and lost-worker exercises. |
| Medium | Draft proposal rules appeared beside generic SHALL language without an in-document authority boundary. | All 19 drafts now state that cited accepted decisions retain authority while new rule IDs and uncited constraints remain proposals until owner acceptance. | Owner disposition of each proposed rule family. |
| Low | Service-discovery text said contracts never use IP addresses, which is false for governed network/IPAM profiles. | Limited the prohibition to portable application/federation identifiers and allowed governed site network values. | Site-profile schemas. |
| Low | Time-drift quarantine did not define what happens to an existing lease. | RZ-5 now blocks placement/renewal, preserves monotonic expiry and requires reconciliation before re-entry. | Numeric drift/uncertainty thresholds per institution. |

## Areas checked without a material defect

- The lease state machine includes `renewal_pending` to `failed`, `expired`, `revoked`, `released`
  and renewed `active` paths; terminal states have no outbound transitions.
- The local validator checks exact state-enum parity, reachability, duplicate transitions and
  positive/negative coverage for every current machine.
- The architecture keeps public Akash, Golem and IPFS paths policy-gated rather than a silent
  dependency of ordinary institutional workloads.
- The settlement architecture keeps high-frequency scheduling and UI state off chain while using
  the Cosmos-derived ledger for commitment and settlement.
- The glossary's D1 definition matches the Implementation Handoff Standard: executable boundary
  and fixtures, not a claim that a service exists.
- The 19 drafts identify missing hardware, capacity, RPO/RTO, service-tier and catalog evidence
  rather than inventing institution values.

## Required owner dispositions before the drafts become binding

1. Accept, amend or reject each proposed CP, FD, DR, HA, CAP, PHY, RZ, RES and SD rule.
2. Assign the authority permitted to classify each reason code and define required evidence and
   economic/reputation treatment.
3. Approve the maximum disconnected-execution exposure by workload risk class.
4. Approve service tiers, SLO ownership and the process that sets RPO/RTO before procurement.
5. Approve the site-profile ownership model for DNS, IPAM, zones, time, trust roots and DR routing.

## Owner reversal

The review softened the High Availability storage row so that dedicated Ceph storage nodes depended on later evidence. That contradicted accepted register item CLD-008 ("Dedicated storage nodes when production begins"). The project founder directed that the register wording stand, and the row was restored. Accepted register decisions are changed only by ADR; a review finding is not one.

## Cross-review dispositions

A second reviewer found five defects in the first remediation. All were valid.

| Finding | Disposition |
|---|---|
| CP-1 allowed direct signed-URL or token access to storage and inference, contradicting the accepted no-bypass rule in the reference architecture and the Ecosystem Dependency Contract | Reverted to the accepted rule; gateway pattern recorded; direct access needs a superseding ADR |
| Compute documents still treated reason codes as authoritative and let provider revocation end leases implicitly | Preemption and Drain and Compute Census now treat codes as assertions and require explicit lease-authority transitions |
| Monotonic self-expiry cannot interpret an absolute UTC expiry | Lease gains signed `leaseDurationSeconds` and `maximumDisconnectedSeconds`, with semantic checks and fixtures; CP-3 rewritten |
| Receipt-chain scope was undefined | Chain defined as `(leaseId, attempt, meterId)` with ordering and fork rules |
| Lease API and state machine were not checked against each other | Lease command registry plus validator parity check |

## Validation and stale-data warning

This record is valid only for PR 7 at commit `9678695` plus the remediations committed after this
review and the cross-review dispositions above. The generated review bundle predates the remediations and is stale until rebuilt. Future
contract or source-document changes require rerunning the validators and updating this record or
marking it superseded.

## References

- [Architecture Authority and Precedence](Architecture-Authority-and-Precedence.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [Control Plane vs Data Plane](Control-Plane-vs-Data-Plane.md)
- [Resource Model](Resource-Model.md)
- [Executable Contract Portfolio](Executable-Contract-Portfolio.md)
- [Implementation Handoff Backlog](../roadmap/Implementation-Handoff-Backlog.md)
