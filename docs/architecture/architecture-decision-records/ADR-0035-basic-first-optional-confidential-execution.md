# ADR-0035: Basic-First Execution with Optional Confidential Capacity

> Standard: PSDC-DOC-001
> Document type: adr
> Status: Proposed for architecture and institution-security review
> Owner: PSDC Compute and Security Working Groups
> Accountable maintainer: RedjiJB until delegation
> Date: 2026-10-14
> Last reviewed: 2026-10-14
> Governing decisions: ADR-0010, ADR-0013, ADR-0027, ADR-0028, ADR-0029, ADR-0031

## Context and founder direction

The first institution deployment will mostly use machines without a trusted execution
environment (TEE). The institution administers and secures those machines, so operator
visibility into plaintext memory is an accepted, disclosed property of suitable **Basic**
workloads, not a reason to block the first deployment. Confidential execution is an
optional later capability for approved hardware, especially when a workload crosses an
institution or provider trust boundary. No public cloud, CDN, market or hardware vendor
may become mandatory for an institution to operate independently.

This records the founder's requested direction; the detailed assurance profile below is
**proposed**, not a released contract or an institutional production-risk approval.

## Proposed decision

1. **Execution assurance** is a separate axis from data classification, provider trust,
   storage tier, workload criticality and federation scope. `basic` and `confidential`
   are assurance profiles, not universal machine trust labels.
2. Basic execution is the initial profile. An approved institution-managed host may run
   work allowed by its data, isolation and production policies without a TEE. A lab or
   volunteer node is not equivalent to a certified production host merely because both
   are Basic.
3. Confidential execution is optional and additive. It is advertised only after an
   independently verified TEE/guest/key-release conformance profile passes. A workload
   requiring it queues or fails if no eligible capacity exists; it never silently
   downgrades to Basic.
4. PostgreSQL remains authoritative for live heartbeat, lease, reservation, credit-hold
   and dispute workflow state. Leases are bounded and fenced; heartbeats are sequenced
   observations. The governed evidence store retains signed receipts and proofs. The
   Cosmos-derived ledger receives finalized commitments, balance changes and dispute
   outcomes, not every heartbeat or scheduler transition. This restates ADR-0031.
5. Institutional credits are non-transferable. Performance reserves, refunds and
   provisional holds may support accountability, but an allegation or anomaly never
   becomes an automatic final penalty. An independent, evidence-based adjudication and
   appeal process controls attribution and consequential settlement.
6. A valid DID or Verifiable Credential supplies portable evidence. Each receiving
   institution still verifies issuer trust, status, consent and its own access policy.
   A valid artifact signature likewise supplies integrity/provenance evidence, not
   admission authorization.
7. Session and Stream are proposed workload shapes requiring capacity and network
   reservations; they are not implied to be supported by the current v1 workload API.

## Why this boundary

Mandating TEEs at launch would exclude much of the available campus capacity without
making conventional institution-controlled workloads safer by default. Conversely,
calling every machine equally private would conceal the extra exposure of federated or
commercial placement. A universal on-chain heartbeat/lease store would put consensus
latency and quorum availability in the scheduling path. Public staking/slashing would
create an economic and legal model different from PSDC's accepted institutional credits.

## Consequences and review gates

- A deployment must publish its Basic operator-visibility disclosure and permitted data
  classes; protected production data may run only where institution policy explicitly
  authorizes the host, isolation and operator role.
- A Confidential claim needs vendor-specific attestation verification, measured guest
  and workload binding, key-release policy, TCB update response and denial fixtures.
  TEE hardware alone is not a conformance result.
- The [execution assurance proposal](../../campus-compute-fabric/Execution-Assurance-and-Provider-Accountability.md)
  contains candidate interfaces, timing profiles, conformance cases and cost gates. Its
  numbered rules are proposals until accepted into versioned contracts and policy.
- Institution security, privacy, finance and service owners must approve production
  data classes, assurance claims, reserve/penalty rules, retention and incident routes.
  Federation also needs a bilateral or consortium agreement. No club or agent can infer
  those approvals from this ADR.
- Supersession, contract migration and compatibility tests are required if this profile
  changes existing lease, capability, receipt, KMS or settlement wire formats.

## Rejected alternatives

| Alternative | Why not the default |
|---|---|
| Require a TEE or hardware secure element on every node | Excludes ordinary campus capacity and conflates execution confidentiality with host trust. |
| Call all institution machines Confidential | An administrator can inspect Basic memory and some runtime data. |
| Put each lease and heartbeat on-chain | Consensus latency, replicated metadata and quorum coupling are unnecessary in the hot path. |
| Public transferable stake and immediate automatic slashing | Conflicts with non-transferable institutional credits and the required dispute authority. |
| Depend on external CDN or marketplace providers | Violates institution-standalone operation; they remain explicit optional adapters. |

## Migration and rollback

The Basic launch profile preserves current contract candidates and does not require a
schema migration. Before Confidential capacity or Session/Stream is advertised, revise
and version the affected capability, workload, lease, reservation and KMS interfaces;
publish negative fixtures and a compatibility plan for older consumers. Existing Basic
leases remain Basic. If an attestation verifier, key broker or new runtime fails, stop
new Confidential admission, preserve evidence, drain affected leases according to
policy and return to approved Basic capacity only for workloads that explicitly allow
Basic. A Confidential-required workload must queue or fail, never silently downgrade.
