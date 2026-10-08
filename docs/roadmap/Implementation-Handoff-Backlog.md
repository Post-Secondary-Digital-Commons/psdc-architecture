# Implementation Handoff Backlog

> Standard: PSDC-DOC-001
> Document type: roadmap
> Status: Normative planning backlog; no packet is implementation-complete
> Owner: PSDC Architecture Maintainers and Engineering Leads
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-04
> Governing decisions: ADR-0013, ADR-0022, ADR-0023, ADR-0026, ADR-0029, ADR-0030, ADR-0031

## Purpose, outcome, and scope

This backlog turns the first complete vertical slice, VS-01 internal opportunistic lab task,
into bounded implementation handoffs. The outcome is a reproducible institutional-development
demonstration from request through policy, placement, execution, evidence, and test-ledger
settlement. It excludes protected student data, public provider networks, public tokens,
production admission, and the later Kubernetes, OpenStack, Slurm, storage, identity-portability,
and client slices.

## Maturity and authority

All packets below are currently **Planned** and no higher than D0 unless the packet says
otherwise. A planned file path is not a released contract. Each packet MUST reach D2 under the
Implementation Handoff Standard before coding and MUST carry its own evidence before D3. The
architecture repository owns common contracts; product repositories implement them; the
deployment template supplies institution-neutral example deployment profiles.

## Dependencies and phase order

    Phase H0: toolchain and C0 contracts
                    |
                    v
    Phase H1: operational state + registries + admission
                    |
                    v
    Phase H2: offer + placement + lease + worker
                    |
                    v
    Phase H3: metering + evidence + settlement
                    |
                    v
    Phase H4: deployment + integrated VS-01 evidence

No later phase may compensate for an authorization or contract defect in an earlier phase.

## Stable backlog requirements

- **HANDOFF-BACKLOG-001:** An implementation packet MUST NOT begin before its required upstream
  packet and released contract dependencies are satisfied.
- **HANDOFF-BACKLOG-002:** A packet MUST NOT bypass the owning contract, authority, policy
  decision, or repository boundary to accelerate the demonstration.
- **HANDOFF-BACKLOG-003:** Every D3 claim MUST identify the exact tests and signed evidence that
  distinguish implemented behavior from planned or simulated behavior.
- **HANDOFF-BACKLOG-004:** VS-01 MUST remain executable without a public provider, public token,
  public content network, proprietary hosted control plane, or protected student record.

## Handoff packets

| ID | Target repository | Deliverable and boundary | Required inputs | Exit criteria and evidence | Initial maturity |
|---|---|---|---|---|---|
| H-001 | psdc-architecture | contract build/lint/bundle toolchain for JSON Schema, OpenAPI, AsyncAPI and fixtures | PSDC-DOC-001, ADR-0030, contract standard | clean build produces signed versioned bundles, docs, license/provenance and negative fixtures | D1 partial: pinned schema/API/event/state-machine/vector checks and reproducible 107-file unsigned candidate bundle pass; signing, generation and CI remain |
| H-002 | psdc-architecture | C0 event, error, resource-reference, authorization-decision and signed-object contracts | H-001, identity/policy authority | two independent fixture implementations agree on validation, canonical bytes and reason codes | D1 partial: five C0 candidates, fixtures, event binding, RFC 8785 hashes and Ed25519 valid/tamper vectors pass locally; key-lifecycle vectors and independent implementation remain |
| H-003 | psdc-architecture | C1 provider, capability, workload, classification, offer, decision, lease, receipt and settlement-batch contracts | H-002, compute/storage/ledger specs | complete state/field semantics, privacy limits, compatibility tests and consumer reviews | D1 partial: schemas, classification/dispute, officially parsed OpenAPI/AsyncAPI candidates, all 13 current lifecycles, 28 transition cases and selected semantics pass; compatibility/independent review remain |
| H-004 | psdc-compute | PostgreSQL operational schema, migrations and transactional outbox library/service | H-002; ADR-0031 | crash/replay/duplicate tests prove atomic transition plus exactly-once effective handling | D0 |
| H-005 | psdc-compute | provider and capability registry APIs with freshness, revocation and policy scope | H-003, H-004, development identity | unauthorized/stale/forged providers fail; state export/import and audit pass | D0 |
| H-006 | psdc-compute | workload API, classifier and policy-admission adapter | H-002 through H-005 | eligible and denied fixtures produce deterministic classifications and no backend call before allow | D0 |
| H-007 | psdc-compute | sovereign offer collection and multi-attribute resolver with deterministic fallback | H-003, H-005, H-006 | policy filters precede scoring; replay yields same winner/tie break; degraded fallback is bounded | D0 |
| H-008 | psdc-compute | lease service and backend-neutral lifecycle state machine | H-003, H-004, H-007 | generation, renewal, cancellation, expiry, retry, race and recovery tests pass | D0 |
| H-009 | psdc-compute | minimal outbound-only lab worker and Golem-derived task adapter | H-003, H-008, sandbox threat profile | enroll, attest, run synthetic task, meter, cancel, drain, quarantine and lose node safely | D0 |
| H-010 | psdc-compute | trusted usage meter and signed receipt producer | H-002, H-003, H-008, H-009 | unit/boundary clock tests, tamper rejection, duplicate interval detection and reconciliation pass | D0 |
| H-011 | psdc-cloud | governed evidence-object service and deterministic settlement batch builder | H-002, H-003, H-010; storage/KMS profiles | canonical replay, Merkle inclusion/mutation, retention/access and missing-object failure tests pass | D0 |
| H-012 | psdc-cloud | bounded Cosmos SDK/CometBFT test-ledger modules, projector and reconciliation service | H-011, ADR-0031 | commitment, settlement, dispute, compensating transaction, quorum-loss and projector rebuild pass | D0 |
| H-013 | psdc-deployment-template | OpenTofu/Ansible development profile for PostgreSQL, NATS, policy, evidence store, compute services and test ledger | H-004 through H-012 | clean offline-capable deployment, pinned images, secrets separation, backup/restore and teardown pass | D0 |
| H-014 | psdc-compute | VS-01 orchestrated acceptance suite, operator runbook and evidence manifest | all prior packets | every VS-01 positive, denial, duplicate, cancellation, node/network/ledger loss and tamper scenario passes | D0 |

The [H-006 candidate packet](H-006-Workload-Classification-Handoff.md) collects
partial D1 contract material and synthetic decision cases. It does not promote
H-006 above D0: the status/denial API, consumer review, prerequisites and
independent classifier conformance evidence remain open.

## Packet preparation checklist

Before promotion to D2, the owner MUST create the full handoff packet with exact contract
versions, source/provenance baselines, issue-sized scope, data classification, trust boundary,
commands, fixtures, resource limits, failure cases, observability, migration, rollback, reviewer,
and evidence paths. Packet H-009 must identify the exact upstream-derived source and excluded
paths; H-012 must exclude source-available Cosmos enterprise paths; H-013 must not embed real
addresses, credentials, or institution authority.

## Integration and repository rules

- `psdc-architecture` releases contracts before consumers pin them.
- `psdc-compute` owns compute control-plane and lab worker implementation; it does not copy
  contracts into a private schema dialect.
- `psdc-cloud` owns shared evidence/ledger platform implementation behind released contracts;
  it does not become the workload-authorizing authority.
- `psdc-deployment-template` demonstrates configuration and conformance without containing
  institution secrets or claiming production approval.
- The future Algonquin repositories consume these releases as institution forks/overlays after
  the common slice passes; Algonquin values are not introduced into the common handoffs.

## Risks and controls

| Risk | Control |
|---|---|
| building all services before testing value | H-014 acceptance design is reviewed before H-004 implementation begins |
| backend-specific fields leak into common contracts | independent consumer review and adapter conformance fixtures |
| market price overrides safety | H-006 eligibility output is a hard input to H-007 and cannot be widened by offers |
| duplicate events or settlement | transactional outbox, idempotency, sequence ranges and deterministic replay |
| lab node exposes institutional data | synthetic public test inputs only; sandbox and outbound-only worker profile |
| license/provenance contamination | H-001 release gate and repository-specific ADR-0030 migration record |
| test ledger becomes production authority | explicit test profile, no real balances/data, D4 institution gate remains separate |

## Evidence, exit criteria, and change control

The backlog exits VS-01 planning when H-001 through H-014 each reach D2, all C0/C1 contracts are
released, the integrated acceptance harness exists before component completion, and every owner
and reviewer is assigned. VS-01 implementation completes only when H-014 reaches D3 with a
signed evidence manifest. Production remains prohibited until a separate D4 admission.

A handoff may not alter authority, license boundary, common contract, privacy classification, or
settlement invariant locally. Such a change returns to the owning specification/ADR and updates
all affected packets. Deferred work records a new owner and dependency; it cannot be hidden in
“future work” inside a completed packet.

## References

- [Implementation Handoff Standard](../standards/Implementation-Handoff-Standard.md)
- [Executable Contract Portfolio](../architecture/Executable-Contract-Portfolio.md)
- [Vertical Slice Completion Plan](Vertical-Slice-Completion-Plan.md)
- [P0 Architecture Baseline](../architecture/P0-Architecture-Baseline-and-Remediation-Register.md)
