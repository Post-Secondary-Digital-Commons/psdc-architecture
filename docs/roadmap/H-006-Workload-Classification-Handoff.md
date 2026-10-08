# H-006 Workload Admission and Classification Handoff

> Standard: PSDC-DOC-001
> Document type: roadmap
> Status: H-006 D0; D1 contract material partial; **not D2 build-ready**
> Owner: PSDC Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-08
> Inspected common baseline: `89e7d13ed67759b6720ba5b900909d2bf01015a9`
> Governing decisions: ADR-0013, ADR-0026, ADR-0029, ADR-0030, ADR-0031, ADR-0032

## Problem and outcome

A schema-valid workload can still be unsafe or impossible to place. A student
must not receive an apparent execution promise merely because the API stored a
request, and a provider must not bid before institutional policy and the
backend family are resolved. H-006 delivers one institution-owned admission
seam and an explainable classifier. A caller can submit once, observe its
classification or denial, and distinguish acceptance from execution.

This packet adapts the governed `to-spec` structure to PSDC's contract and
evidence rules. It is a candidate, not an accepted change to the Decision
Register. No issue was opened and no product implementation was run.

## User stories

1. As a requester, I want one idempotent submission so a retry cannot create a second workload.
2. As a requester, I want a stable, policy-safe rejection so I can correct my request without seeing another user's data.
3. As an institutional policy owner, I want classification to precede bidding so a cheap offer cannot bypass a hard boundary.
4. As a scheduler, I want a signed, versioned eligible-backend result so I do not infer policy from a manifest.
5. As a provider, I want stale or revoked capability assertions excluded before offers are requested.
6. As an operator, I want a trace of rejected backend families and policy versions so an unexpected route is explainable.
7. As an institution, I want local-only work to continue when public adapters are disabled.
8. As a security reviewer, I want protected content, secrets, and raw identity data excluded from events and classifier logs.
9. As a consumer implementer, I want deterministic denial and timeout cases so I can test fail-closed behavior.
10. As an institutional fork maintainer, I want local policy bindings without changing the common manifest or API semantics.

## Dependencies, boundary and phase order

`psdc-architecture` owns the common v1 schema and behavioral cases;
`psdc-compute` will implement the API, classifier and admission adapter. The
institution gateway authenticates the caller, but only institutional policy
authorizes the request and scope. H-002/C0 contracts, H-003/C1 contracts,
H-004 operational state/outbox and H-005 provider/capability registry are
prerequisites. H-007 market resolver consumes the classification; it cannot
widen an eligible set. The eventual H-008 lease alone authorizes execution.

The **single high seam** is `POST /workloads` followed by
`GET /workloads/{workloadId}/classification` in the existing compute OpenAPI.
`202` means accepted for classification. The older architecture prose naming
`POST /v1/workload-classifications` was inconsistent and is corrected in
[Workload Classification](../campus-compute-fabric/Workload-Classification.md).
A status/denial read is still missing; adding it is a contract change, not an
implementer invention.

## Candidate v1 decision table

The requester-supplied class is a claim to validate, not proof of eligibility.
The table gives the **default backend family**, before hard policy, provider
capability, storage and network filters. `backendPreferences` may narrow this
set, never add an incompatible family. Alternative adapters require a separately
versioned capability and conformance decision.

| Manifest class | Default backend | Additional conditions | Hard exclusion |
|---|---|---|---|
| `opportunistic_task` | `task` | preemptible, retryable, noncritical; lab workers only for approved data | production-critical or nonpreemptible lab work |
| `independent_task_graph` | `task` | independent authorized stages; v1 accepts one manifest only, not a graph definition | graph-edge execution without a graph contract |
| `parameter_sweep` | `task` | loosely coupled/independent units | tightly coupled communication |
| `container_service` | `kubernetes` | service objectives and managed pool | task worker as persistent service |
| `vm` | `openstack` | `vm://` image and service objectives | container-only backend |
| `hpc_mpi` | `slurm` | tightly coupled, named network profile, topology/path approval | automatic task-fabric fallback |
| `ai_inference` | `kubernetes` | institution-approved model route and data boundary; a one-shot task adapter needs separate approval | direct model endpoint bypass |
| `ai_service` | `kubernetes` | service objectives, model route, managed pool | opportunistic worker as primary service |
| `critical_service` | `kubernetes` or `openstack` | nonpreemptible, production-certified local pool, HA and failure-domain policy | lab, unapproved partner or public adapter |

This table is a **candidate behavioral rule** derived from the accepted
workload taxonomy; it has not been accepted as a new ADR. In particular,
`independent_task_graph` currently lacks graph/stage schema, so v1 must not
claim graph execution. Bare-metal and mixed pipelines are not v1 classes.
The synthetic cases at
[classification decision cases](../../contracts/compute/classification-decision-cases.v1.json)
encode this table and rejection examples without institution-specific values.

Filter order is: schema and signature; caller/institution/project binding;
software-license and admission-policy decisions; object classification and
authorization; declared scope/residency/trust; class/backend compatibility;
fresh signed provider/capability status; resource/network/storage feasibility;
budget preauthorization. Price and bids are **not** classification inputs.
False, unknown, expired or unavailable hard controls fail closed. A
`no_eligible_backend` result is distinct from malformed or forbidden input.

## Candidate API behavior and state

| Condition | External result | Internal evidence; no secret details |
|---|---|---|
| Valid new request | `202` immutable manifest | accepted, outbox notification; no lease |
| Same authorized idempotency key and canonical payload | same `202` result and workload ID | replay linked to original decision |
| Same key, different payload | `409` problem | conflict; no second workload |
| Malformed JSON or schema | `400` or `422` problem, mapping to be frozen | validation path, no protected values |
| Caller lacks institution/project/object scope | `403` problem | policy reason retained internally |
| Policy or identity dependency unavailable | retryable `503` candidate | fail closed; no provider call |
| Accepted but classification pending | status response not yet contracted | no fabricated record or success |
| Valid request with zero eligible providers | terminal unschedulable record not yet contracted | exclusions and capability snapshot digest |
| Capability stale/revoked | exclude provider, then unschedulable if none remain | provider assertion and freshness evidence |

The OpenAPI presently lacks `503` and a pending/denied status representation;
the classification-record schema requires a nonempty `eligibleBackends` array,
so it cannot encode unschedulable. It also lacks explicit policy version,
expiry, and rejected-backend reasons promised by the architecture text. Those
are **D1 contract blockers**, not details for product code to invent.
Use a new compatible response/record version with migration evidence; do not
silently reinterpret v1 or replace `404` with a denial.

Atomic persistence of the manifest plus outbox, authorization, bounded timeout,
idempotency replay and consistent reads are H-004/H-006 runtime obligations.
No synchronous provider call occurs before allow. Reclassification appends a
new signed decision and never mutates historical evidence. A cancellation
requested during pending classification must fence later offers; the cancel
operation is not yet contracted.

## Data, trust, security and limits

The manifest may reference governed objects; it must not carry object bytes,
keys or secrets. Events carry a reference only. Gateway, API, policy adapter,
classifier, registries and market are separate trust boundaries. Verify
requester signature, policy-decision issuer and expiry, provider/capability
signature and sequence, object permissions and current revocation. Do not
trust a provider's price or self-reported capability as institutional
authorization. Logs use reason codes, digests and pseudonymous IDs, not
protected content. Institution bindings set retention and lawful basis; a
common fixture cannot set them for all institutions.

Bounded request size, queue depth, classification deadline, capability age,
policy freshness and rate limits remain unmeasured site/profile values. D2
requires explicit defaults or institution-bound policy with tests. A timeout
must not convert into an allow; retries preserve idempotency and ordering.

## Testing decisions and evidence

Test the public API and classifier output as one seam, not internal helper
calls. Run all cases with synthetic data against an implementation adapter:
positive for every v1 class, policy denial, wrong backend preference, scope
conflict, stale/revoked capability, no eligible backend, duplicate request,
timeout, registry outage, and policy-version change. Assert exact disposition,
backend set, reason codes and absence of provider calls on denial. Change only
price in a paired case to prove it cannot reverse a hard exclusion.

The current structural case checker validates coverage and manifest shape. It
is **not** an executed classifier, independent semantic oracle, authorization
test, performance result, deployment or production evidence. D2 needs an
owner-reviewed conformance harness contract and consumer review; D3 needs
`psdc-compute` implementation runs, transaction/race tests, security review,
SBOM and signed evidence manifest. D4 needs separate institutional admission.

## Migration, rollback and consumer review

Release a new version for any status/record shape change. Inventory consumers
in `psdc-compute`, `psdc-cloud` economics/evidence, Web/Desktop/Mobile clients,
institution overlays and event subscribers. Require old/new read compatibility
or an explicit cutover window; record decisions in an ADR or approved contract
change. A shadow classifier may compare decisions without placing work.
Rollback disables enforcement for **new** classifications, returns to the last
accepted policy/contract version, and leaves active leases under their own
expiry rules; it never routes to a weaker provider. Preserve old decisions and
outbox state for replay/reconciliation.

## Phase H1 exit criteria, risks and reviewer handoff

This is the H1 admission phase in the
[implementation handoff backlog](Implementation-Handoff-Backlog.md). The exit
criteria below are gates, not claims that the gates have passed. The principal
risk is that a schema-valid request is mistaken for an authorized placement.

1. **H006-D2-001:** Freeze status/denial/pending/timeout API, reason-code mapping, cancellation
   and unschedulable record, including exact compatibility migration.
2. **H006-D2-002:** Decide graph-class semantics: prohibit graph execution under v1 or add a
   separate graph contract; no implicit stage authorization.
3. **H006-D2-003:** Review and accept the class/backend table and independent decision oracle.
4. **H006-D2-004:** Specify policy freshness, capability age, queue/time limits, size bounds,
   resource quotas and institution-binding points.
5. **H006-D2-005:** Review object, network, production and federation hard filters with
   security/privacy and at least one product consumer.
6. **H006-D2-006:** Pin exact released C0/C1 contract bundle and H-004/H-005 API behavior.
7. **H006-D2-007:** Assign an engineering lead and independent security/consumer reviewers;
   maintainer accountability alone is not evidence of their review.
8. **H006-D2-008:** Produce clean bootstrap commands and a synthetic-only test environment in
   `psdc-compute`; prohibit real student or institutional records in test data.

The H-006 packet stays D0 until its prerequisite and reviewer gates are closed;
the attached contract material is only D1 partial. `psdc-compute` must not
implement ambiguous behavior from this candidate as though it were accepted.
