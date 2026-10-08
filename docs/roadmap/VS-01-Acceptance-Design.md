# VS-01 Synthetic Lab Task Acceptance Design

> Standard: PSDC-DOC-001
> Document type: roadmap
> Status: H-014 D0 acceptance design; not an executed test or D2 packet
> Owner: PSDC Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-08
> Governing decisions: ADR-0013, ADR-0026, ADR-0029, ADR-0030, ADR-0031, ADR-0032

## Purpose and outcome

VS-01 proves one institution can use an idle, **approved** lab machine for a
synthetic task without exporting work to a public provider, bypassing policy,
disturbing the computer's owner, or awarding unearned institutional credits.
The outcome is one reproducible request-to-test-settlement journey with
negative and recovery runs. A schema-valid object, a single successful worker
command, or an attractive dashboard is not that journey.

The machine-readable [scenario matrix](../../contracts/acceptance/vs01.scenarios.json)
lists 18 candidate tests. The structural checker validates coverage and
required evidence labels; it executes **no service**. An independent
implementation harness in `psdc-compute` will later bind these IDs to actual
API calls, fault injection, database/ledger queries, and observed results.

## Scope and phase dependencies

This is Wave B, following Wave A's released C0/C1 contracts and development
foundations. H-014 implementation depends on H-001 through H-013; its
**acceptance design** is reviewed before H-004 coding so database, API and
worker designs are testable from the start. Institutional campus operation is
not authorized by a development run. ADR-0032 maps Wave B campus operation no
earlier than institution phase 7, subject to local approval and evidence.

The test topology is one synthetic institution authority, one policy issuer,
two candidate providers (one eligible, one intentionally ineligible), one
lab-class worker with a fixed synthetic matrix task, one operational store and
outbox, one evidence store, and one **test-only** ledger. No real student
identity, student record, protected object, public Akash/Golem/IPFS endpoint,
public token, production key, or public provider is allowed in fixtures or
runtime configuration. The worker must not accept arbitrary commands from the
test harness; it runs an allowlisted task under a sandbox and an expiring lease.

## Authority and trust boundaries

| Boundary | Authority | What the test must not assume |
|---|---|---|
| Gateway to workload API | synthetic institutional identity and policy | authentication alone is admission |
| Classifier to market | signed classification and current policy | a schema-valid manifest or low price grants eligibility |
| Registry to resolver | signed, fresh, sequenced capability | provider self-report is institutional trust |
| Lease authority to worker | generation-fenced signed grant | a delayed activation or replay can extend time |
| Worker to meter | independently checked usage/evidence | provider reason code determines penalties |
| Operational store to ledger | canonical batch and tested projector | ledger is the high-frequency scheduler database |

Contracts define the shape of these messages; institution policy and current
authority decide whether they may be used. A consumer must use the published
interface, not another service's database.

## Scenario families and binary exit criteria

| Family | IDs | Required observable result |
|---|---|---|
| Normal path | VS01-001 | exactly one accepted request, placement, fenced execution, trusted receipt and test settlement |
| Authorization/policy | VS01-002–005 | denial or bounded unavailability before provider calls; no protected-data disclosure |
| Idempotency and market | VS01-006–009 | duplicate retries have one effect; cheaper ineligible providers stay excluded |
| Lease and worker | VS01-010–013 | stale commands fail; owner reclaim, cancel and disconnect stop work safely |
| Meter and settlement | VS01-014–017 | overlapping usage, tampering, disputes and ledger outage cannot mint extra credits |
| Recovery | VS01-018 | restore and rollback preserve accepted state and policy strength |

**VS01-ACC-001:** Every scenario MUST record `observed`, `failed`, `not-run`,
or `blocked`; it MUST NOT be marked passed from a schema fixture or model
prediction. **VS01-ACC-002:** A denial case MUST include a zero-provider-call
assertion and a zero-lease assertion. **VS01-ACC-003:** Every credited interval
MUST join to a trusted meter receipt, a confirmed reason adjudication where an
incident affects economics, retained evidence and one settlement batch.
**VS01-ACC-004:** A fault-injection run MUST preserve the exact pre-fault
generation and idempotency scope in its evidence. **VS01-ACC-005:** A lab
worker MUST stop on owner reclaim or lease fail-stop without interrupting an
interactive owner's session. **VS01-ACC-006:** The test MUST run with public
adapters disabled and synthetic data only.

## Evidence contract and observability

Each run records repository/commit IDs, pinned contract bundle root,
configuration digest, synthetic issuer and provider IDs, scenario ID, UTC
start/end times, correlation ID, fault injection, expected/observed outcome,
relevant API response and reason code, event sequence, database transaction
and outbox status, classification and placement trace, lease generation,
worker stop/result digest, signed receipt, adjudication where applicable,
evidence-object digest, batch/ledger commitment, and operator decision.
Secrets, raw keys, private host addresses and workload content do not enter
the public evidence package. The evidence manifest labels simulated versus
real service observations and declares omitted checks.

Counters and traces must reveal queue depth, registry staleness, policy
latency, offer exclusions, active lease generations, worker disconnect age,
receipt overlaps, pending settlement batches and projector drift. A zero
counter is evidence only when the corresponding instrumentation and query are
included in the run.

## Risks, recovery, capacity and performance limits

The development profile must set bounded request size, queue depth, policy
timeout, capability age, worker disconnect window, lease lifetime, retry
budget, evidence retention and batch retry limits. Their numerical values are
not yet accepted; H-013 binds measured development defaults and institutions
choose their own approved limits. Performance acceptance is measured against
those declared bounds and includes maximum classification latency, time to
stop a reclaimed worker, and recovery time after store or ledger loss. No
throughput or campus capacity claim may be inferred from one worker.

Rollback restores the last contract-compatible controller release and policy
bundle without lowering classification or trust requirements. A pending
settlement batch remains pending until independently reconciled. An active
lease follows its signed expiry and fail-stop rules rather than being silently
extended by a control-plane rollback.

## Implementation handoff and unresolved gates

The implementation owner is `psdc-compute` for H-014. `psdc-cloud` supplies
the evidence/settlement boundary and `psdc-deployment-template` supplies the
synthetic standalone environment. H-014 cannot be D2 until H-001–H-013 have
versioned interfaces and their own D2 packets. A nominated security reviewer,
contract consumer and Algonquin institution reviewer must check the test
topology and failure oracle; no appointment is assumed here.

Before the harness is coded, the owners must freeze: the workload
pending/denied API; exact reason-code mappings; provider/capability freshness;
lease activation and cancel race behavior; worker sandbox and owner-reclaim
thresholds; meter interval authority; disputed reason effects; settlement
hold/replay; test ledger interface; development resource limits; and evidence
retention. The scenario matrix is designed to expose these decisions, not to
silently make them.

## Testing and verification status

Run `npm ci --ignore-scripts` and `npm run test:contracts` in the architecture
repository to check the matrix's shape and category coverage. That check is
structural only. H-014 reaches D3 only after the real, separately reviewed
end-to-end harness observes every applicable scenario in a reproducible
development environment, includes failure injection and rollback evidence,
passes license/security checks, and produces a signed evidence manifest.
Production approval remains D4 and institution-owned.

## References

- [Vertical Slice Completion Plan](Vertical-Slice-Completion-Plan.md)
- [Implementation Handoff Backlog](Implementation-Handoff-Backlog.md)
- [H-006 Workload Classification Handoff](H-006-Workload-Classification-Handoff.md)
- [Implementation Handoff Standard](../standards/Implementation-Handoff-Standard.md)
