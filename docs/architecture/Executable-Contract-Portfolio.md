# Executable Contract Portfolio

> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative plan; contracts not implemented unless marked released
> Owner: PSDC Architecture Maintainers and Contract Owners
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-04
> Governing decisions: ADR-0001, ADR-0004, ADR-0013, ADR-0026, ADR-0027, ADR-0028, ADR-0029, ADR-0031

## Purpose

This portfolio converts architecture prose into independently testable boundaries. It defines
what must become JSON Schema, OpenAPI, AsyncAPI, signed state-machine input, or conformance
fixture before implementation teams can depend on it. Listing a contract here does not claim
that the file exists or is released.

## Scope and boundaries

The portfolio covers cross-service and cross-institution data, event, API, signature, and state
machine contracts. It excludes internal function signatures, backend-private objects that do
not cross an adapter, site secrets, implementation source, and institution values that belong
in a deployment profile. A contract conveys data and authority references; it never grants
authority merely because an object validates structurally.

## Dependencies, relationships, and interfaces

C0 contracts are prerequisites for C1 through C3. Compute and storage operations depend on
identity/policy decisions; settlement depends on finalized leases, receipts, and retained
evidence; federation depends on institution trust profiles. Relationships use released package
versions and conformance fixtures rather than copied schema files or shared database tables.

## Contract construction standard

All JSON contracts use JSON Schema 2020-12, stable identifiers, explicit additional-property
behavior, UTC timestamps, bounded strings/arrays, units, classifications, authority scope,
schema version, producer identity, idempotency key, and stable reason codes. Signed objects use
deterministic canonical JSON and declare their canonicalization version. HTTP APIs use OpenAPI;
asynchronous events use AsyncAPI and CloudEvents-compatible envelopes. Each contract release
includes positive, boundary, invalid, unknown-version, replay, tamper, and privacy fixtures.

Compatibility is semantic-versioned. A consumer ignores only fields explicitly declared safe
to ignore. A breaking field, meaning, authorization, signature, or state-machine change creates
a new major version and migration window. Generated language bindings are artifacts, not the
source of truth.

## Priority classes

- **C0 authority primitives:** identity, references, signatures, errors, idempotency, policy
  decisions, and event envelopes used by every slice.
- **C1 first vertical slice:** minimum compute, storage-evidence, and settlement contracts for
  an internal opportunistic task.
- **C2 backend and federation expansion:** Kubernetes, OpenStack, Slurm, storage tiers, identity
  portability, and institution exchange.
- **C3 client and advanced operations:** user sessions, AI routing, app distribution, production
  admission, and advanced governance.

## Portfolio register

| Priority | Contract ID and planned artifact | Producer | Consumer | Governing invariant |
|---|---|---|---|---|
| C0 | COMMON-EVENT-001 event envelope | any domain service | event consumers | version, scope, actor, correlation, idempotency, time |
| C0 | COMMON-ERROR-001 error and reason code | APIs and controllers | clients/operators | machine-actionable denial without sensitive leakage |
| C0 | COMMON-REF-001 resource reference | registries and workflows | every domain | globally unique typed reference without shared database keys |
| C0 | AUTHZ-DECISION-001 policy decision | policy engine | admission/services | allow/deny, policy version, evidence, expiry |
| C0 | SIGNED-OBJECT-001 signature envelope | authorized signer | verifier | canonical bytes, key ID, algorithm, scope, replay bound |
| C1 | COMPUTE-PROVIDER-001 provider registration | provider authority | resolver | ownership, trust, endpoints, status, expiry |
| C1 | COMPUTE-CAPABILITY-001 capability advertisement | worker/backend agent | resolver and scheduler | typed resources, topology, freshness, confidence |
| C1 | COMPUTE-WORKLOAD-001 workload manifest | requestor/API | classifier | purpose, resources, data class, objectives, allowed backends |
| C1 | COMPUTE-CLASS-001 classification record | classifier/policy | market and scheduler | eligibility before price optimization |
| C1 | COMPUTE-OFFER-001 provider offer | approved provider | market resolver | capacity, price/credit, constraints, expiry, signature |
| C1 | COMPUTE-PLACE-001 placement decision | resolver/scheduler | lease service and auditor | candidates, objective terms, exclusions, selected proof |
| C1 | COMPUTE-LEASE-001 resource lease | lease service | requestor/provider/backends | reservation, lifecycle, renewal, cancellation, authority |
| C1 | METER-RECEIPT-001 usage receipt | trusted meter | settlement builder/disputes | measured units, lease link, interval, quality, signature |
| C1 | SETTLE-BATCH-001 settlement batch | batch builder | ledger/verifier | sequence, prior root, receipt root, versions, totals, evidence |
| C1 | DISPUTE-CASE-001 dispute state | participant/authority | settlement and governance | admissible evidence, deadlines, resolution, appeal |
| C2 | STORAGE-OBJECT-001 object manifest | storage client/authority | placement and retrieval | digest, classification, tier, encryption, retention, owner |
| C2 | STORAGE-PLACE-001 placement token | storage authority | providers/gateway | authorized tier, zones, expiry, repair policy, no raw content |
| C2 | STORAGE-CUSTODY-001 custody event | storage provider/controller | audit and owner | receipt, movement, repair, access, deletion lifecycle |
| C2 | STORAGE-DELETE-001 deletion evidence | providers/controller | data authority/auditor | scope, attempts, proofs, exceptions, completion state |
| C2 | STORAGE-FED-001 federation transfer manifest | source institution | destination gateway | purpose, consent/authority, cipher object, receipt, expiry |
| C2 | NET-CAPABILITY-001 path capability | network authority/agent | scheduler | zone, bandwidth, latency class, isolation, expiry |
| C2 | NET-RESERVE-001 network reservation | scheduler/network controller | workload/backend | authorized path/QoS without exposing private topology |
| C2 | ID-ISSUER-001 issuer registry entry | identity authority | verifiers/wallets | DID, credential types, keys, status endpoint, jurisdiction |
| C2 | ID-LINK-001 account link | student plus institution | identity broker | consent, institutional account, DID, proof, revocation |
| C2 | VC-STUDENT-001 portable credential profiles | authorized issuer | wallet/verifier | W3C VC compatibility, minimum disclosure, status, expiry |
| C2 | KEY-GRANT-001 key operation grant | policy/KMS authority | KMS clients | operation, subject, key class, purpose, expiry, approval |
| C2 | KEY-ENVELOPE-001 encrypted data-key envelope | KMS/encryption client | authorized decryptor | cipher suite, wrapping key, context, rotation, no plaintext key |
| C3 | PROD-SERVICE-001 production service profile | service owner | admission authority | SLO, data, dependencies, capacity, recovery, support |
| C3 | PROVIDER-CERT-001 provider certification | conformance authority | resolver/federation | capability/test scope, issuer, validity, revocation |
| C3 | CLIENT-SESSION-001 user/agent session | client/gateway | session host/tools | user authority, permissions, model route, E2EE handoff |

## Required state machines

The lease, dispute, storage custody/deletion, credential status, settlement batch, provider
certification, and production admission contracts each require an explicit state diagram and a
machine-executable transition table. Invalid, stale, unauthorized, skipped, duplicate, and
replayed transitions fail with stable reason codes. Terminal records are corrected through new
linked records, not mutation that destroys evidence.

## Waves 1–2 executable contract status — 2026-09-29

The following requested data contracts now have strict Draft 2020-12 schema candidates and
synthetic conformance fixtures. They are D1 candidates, not released service APIs or running
implementations.

| Contract group | Executable artifacts | Evidence completed | Evidence still required for release |
|---|---|---|---|
| provider and capability | `contracts/compute/provider.schema.json`, `capability.schema.json` | active/revoked/unavailable shapes; signature structure; fixture validation | registry API, live signature/revocation/freshness tests, independent consumer |
| C0 common/event | five standalone C0 schemas plus event envelope | reference/error/authorization/signature structure, replay metadata, two canonicalization vectors and three Ed25519 positive/tamper vectors | key-revocation/rotation vectors, event duplicate/reorder harness, independent implementation |
| workload | workload manifest plus classification record | purpose, classification, resource/runtime, locality, network/storage, schedule/retry constraints; invalid classification fixture | live authorization/classifier behavior, size/rate limits, independent producer |
| offer, decision, lease, receipt | four compute schemas | positive, expiry, retry/failure, fencing/status/reason fixtures | transactional capacity, auction replay, clock, generation and meter conformance |
| object and storage placement | two storage schemas | envelope-only encryption references; Tier 5 constraint; plaintext-key rejection | custody, repair, deletion, federation-transfer schemas and provider implementation |
| network path and reservation | two network schemas | privacy-minimized zones/capacity; active/revoked/unavailable fixtures | controller acknowledgement, capacity/QoS arithmetic, site profile and recovery tests |
| KMS grant and key envelope | two security schemas | purpose/operation/resource binding; wrapped key only; revocation fixture | live policy/time/use/quorum/key-state enforcement and compromise recovery |
| settlement, ledger, dispute | three economics schemas | roots, versions, evidence, exact balanced-delta check, deadlines, final/rejected/open fixtures, dispute lifecycle | canonical byte vectors, Merkle proof builder, chain/projector and compensating-entry tests |
| API and event surfaces | OpenAPI 3.1 compute control plane; AsyncAPI 3.1 compute/economics events | official parser validation, unique operation IDs, response presence, external-reference and event payload-schema checks | auth/rate/size profiles, generated clients and broker conformance |
| lifecycle tables | 13 machines for every current status-bearing schema | exact enum parity, reachability, terminal-state and duplicate-transition checks; 28 positive/negative/replay cases | future custody/deletion, credential and production-admission contracts plus service race/recovery tests |
| fixture and bundle framework | common definitions, fixture schemas, pinned local validators and deterministic bundle builder | 31 schemas, 48 fixtures, all six categories, canonical/signature vectors, a reason-code registry, selected semantics, two-build equality across a 119-file candidate bundle | release signing, generated docs/bindings, CI integration and independent implementation |

The exact evidence boundary and commands are documented in [Shared Executable
Contracts](../../contracts/README.md). JSON Schema cannot enforce current time, signature
validity, external authority, referenced-object existence, or every cross-field rule. The local
runner now covers selected ordering, capacity, repair and exact sum-to-zero invariants; service
handoffs still own live authorization, concurrency, persistence, transport and cryptography.

## Ownership and repository routing

Contract source belongs in the owning common repository. A product repository consumes a
released contract package or pinned source artifact; it does not copy and edit the schema.
Institution repositories supply deployment profiles and conformance evidence, not competing
wire formats. Every contract names a primary owner and at least one independent consumer review
before release.

## Release evidence

A contract reaches “released” only when it has:

1. normative schema/API/event definition and human-readable semantics;
2. positive, negative, boundary, replay, authorization, and privacy fixtures;
3. compatibility classification and migration/rollback instructions;
4. one reference producer and one independently implemented or independently reviewed consumer;
5. generated documentation and binding reproducibility;
6. threat-model review, fuzz/property-test plan, and size/rate limits; and
7. a signed release manifest with provenance and license.

## Acceptance criteria

- **CONTRACT-ACC-001:** VS-01 can be traced only through C0/C1 contracts with no undocumented
  shared database or filesystem coupling;
- **CONTRACT-ACC-002:** every denied input produces a stable reason code and no secret-bearing
  diagnostic;
- **CONTRACT-ACC-003:** older compatible fixtures pass a newer minor-version implementation and
  incompatible fixtures fail before state mutation;
- **CONTRACT-ACC-004:** canonical signed fixtures verify identically in two independent
  implementations;
- **CONTRACT-ACC-005:** an institution can replace a reference service while preserving the
  released contract and conformance suite.

## Validation, staleness, and contradiction handling

CI validates schemas, examples, references, compatibility fixtures, canonical signatures, and
generated artifacts. A portfolio row is stale when the owning ADR, producer, consumer, protocol,
or data classification changes without a reviewed update. A contradiction blocks the affected
contract release and follows the architecture conflict-resolution procedure; modification time
or an implementation-specific example never resolves it.

## References

- [Architecture Authority and Precedence](Architecture-Authority-and-Precedence.md)
- [P0 Remediation Register](P0-Architecture-Baseline-and-Remediation-Register.md)
- [Implementation Handoff Standard](../standards/Implementation-Handoff-Standard.md)
- [Vertical Slice Completion Plan](../roadmap/Vertical-Slice-Completion-Plan.md)
