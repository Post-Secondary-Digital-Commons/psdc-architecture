# Workload Submission Contract Trace

> Standard: PSDC-DOC-001
> Document type: contract-specification
> Status: D1 partial; not an implementation handoff
> Owner: PSDC Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-08
> Governing decisions: ADR-0013, ADR-0026, ADR-0029, ADR-0030, ADR-0031

## Purpose and boundary

`workload.submit.v1` is the common, institution-sovereign admission interface.
It accepts an immutable requested workload for classification and policy review.
It does not authorize execution, choose a provider, issue a lease, release a key,
or settle credits. A successful HTTP response means accepted **for
classification**, not admitted for execution. The same contract applies to
every institution; issuer, domain, network and production-policy values belong
in that institution's deployment binding.

This trace is a D1 contract candidate for [H-006](../roadmap/Implementation-Handoff-Backlog.md).
H-006 remains D0 until its prerequisites, conditional rules, security behavior,
and D2 handoff packet are complete. No product runtime is represented here.

## Exact contract chain

| Step | Normative artifact | Binding checked |
|---|---|---|
| Concept | [Workload Classification](./Workload-Classification.md) | Classification precedes bidding, placement and lease issuance |
| Interface registry | [Machine-readable trace](../../contracts/traceability/workload-submit.trace.json) | `workload.submit.v1`, owner `psdc-compute` |
| HTTP request | [Compute OpenAPI](../../contracts/compute/compute-control-plane.openapi.json) | `POST /workloads`, `submitWorkload`, idempotency parameter, manifest request `$ref` |
| Manifest | [Workload schema](../../contracts/compute/workload-manifest.schema.json) | `urn:psdc:contracts:compute:workload-manifest:1` |
| Accepted response | Compute OpenAPI | HTTP 202, same manifest schema; not an execution authorization |
| Event | [Compute AsyncAPI](../../contracts/events/compute-fabric.asyncapi.json) | `workloadSubmitted`, type `org.psdc.compute.workload.submitted.v1` |
| Event envelope | [Event envelope schema](../../contracts/events/event-envelope.schema.json) | Source, institution, ordering scope, idempotency and expiry metadata |
| Event data | [Reference-only data schema](../../contracts/events/workload-submitted-data.schema.json) | Only `workloadId`; consumer fetches the manifest through an authorized API |
| Evidence | [Fixtures](../../contracts/fixtures/) | Positive manifest, invalid classification, event data and envelope |
| Validator | [Binding validator](../../contracts/validate-contract-bindings.mjs) | Checks the live operation/message, not merely names elsewhere in a file |
| Adversarial check | [Mutation tests](../../contracts/test-contract-bindings.mjs) | Breaks live refs, event type/body, idempotency and lease bindings |

The event is a notification, not a distribution channel for full manifests or
student data. `dataschema` refers to the event's `data` shape, not the source
manifest. Consumers must resolve `workloadId` through an authorized read and
re-check institution, purpose, classification and current policy. A stale,
unauthorized or unavailable manifest must not be reconstructed from the event.

## Version, producer, consumer and compatibility

The candidate major contract version is 1. The institution-owned workload API
is the producer of the immutable manifest and the submitted event; the
classifier, policy adapter and authorized event consumers are consumers.
`psdc-compute` owns the common schema and binding. An institutional fork binds
its issuer and network values without changing the common major-version
semantics. The migration boundary for changes is described below.

## Request and processing sequence

1. The institution gateway authenticates the caller and enforces the client
   route; authentication alone grants no admission authority.
2. `POST /workloads` checks the idempotency header, manifest shape, signature,
   requester/institution binding, policy decision and referenced-object scope.
   The latter contextual checks are **not** proven by JSON Schema.
3. The service persists the immutable request and an outbox record atomically
   under one institutional authority. A replay of the same authorized key and
   identical request returns the same accepted result; a conflicting payload
   for the key is rejected. Transactional behavior remains unimplemented.
4. The classifier records eligibility separately. Only then may downstream
   market, placement and lease services act. A 202 response or submitted event
   must never be interpreted as a lease or execution promise.
5. The outbox publishes the reference-only event at least once. Consumers
   deduplicate by the governed event identity and reject stale or out-of-order
   messages within their ordering scope. This remains a runtime obligation.

## Failure, privacy and compatibility obligations

Malformed shape yields 400/422; unauthorized scope yields 403; an idempotency
conflict yields 409. The owning API specification must still settle the exact
error-to-reason-code mapping, timeout response, status polling, cancellation,
and retention/deletion behavior before H-006 is D2. No provider may receive a
manifest while identity, authorization, classification, residency, data access,
or budget controls are unresolved.

The reference-only event avoids broadcasting a full workload request, but the
ID and metadata are still governed institutional information. Event access,
retention and replay policy must be bound in the institution profile. Major
request/response or event-data changes require a new contract version and
consumer migration assessment; adding a field cannot silently alter admission
semantics. The trace validator does not replace a compatibility suite.

## Evidence and known gaps

The repository's contract suite checks schema/fixture validity, the live
OpenAPI and AsyncAPI bindings, and eight seeded binding mutations. This is
**structural** evidence only. No authorization service, transactional outbox,
classifier, network gateway, event broker, requester client or retry behavior
was executed.

Three earlier lease-contract findings remain separate H-008/H-010 blockers:

- The signed `leaseDurationSeconds` is measured from worker acceptance, which
  can be late. A per-generation remaining-duration or cumulative-lineage bound
  is needed so delayed acceptance and repeated renewal cannot outlive the
  authorized absolute window without relying on an unsynchronized worker clock.
- The live lease API request-body `$ref` and registry `machineId` require
  mutation-tested binding. The binding validator in this change addresses this
  *structural* defect, not lease transactionality or authorization.
- Provider-controlled reason fields are assertions. Receipts and settlement
  need an authoritative adjudication result before fault or preemption affects
  credits; the current registry and receipt schema do not supply that authority.

The older [classification specification](./Workload-Classification.md) also
lists admission fields that the present manifest schema does not require,
including criticality, accountable owner, budget ceiling, and service recovery
objectives. The contract owner must reconcile per-workload mandatory fields,
conditional requirements by workload class, and institution-policy inputs before
claiming H-006 D2. Several common contract fixtures still contain Algonquin
example identifiers; they need institution-neutral replacements and an overlay
example before common conformance release.

## Verification and next gate

### Validation and conformance

From this repository root, run `npm ci` and `npm run test:contracts`. A clean
run shows the schema/fixture count, official API parser results, eight rejected
mutations and a reproducible candidate bundle. Re-run against the merge commit;
an isolated worktree's workspace-relative link checker may report the existing
documentation-audit link to the parent workspace script, which is not evidence
of a new contract-link defect.

The next bounded task is a D2 H-006 packet with a decision table for each
workload class, exact policy/error/timeout behavior, neutral fixtures,
authorization and duplicate-command tests, rollback and consumer review.
That task must not start product implementation merely because this trace is
present.
