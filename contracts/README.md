# Shared Executable Contracts

> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative contract source; individual maturity recorded below
> Owner: PSDC Architecture Maintainers and domain contract owners
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-04
> Governing decisions: ADR-0001, ADR-0026, ADR-0027, ADR-0028, ADR-0029, ADR-0031

## Purpose

This directory owns institution-neutral, versioned PSDC data contracts and conformance
fixtures. A schema defines structure and a fixture records an expected outcome; neither grants
authorization, proves a signature, establishes current time, or proves that an implementation
exists.

## Current executable baseline

Waves 1 and 2 add validated Draft 2020-12 domain schemas plus C0 event, error, reference,
authorization, signed-object and state-machine contracts. Classification and dispute records,
an OpenAPI 3.1 compute control-plane boundary, an AsyncAPI 3.1 event surface, and 13 executable
lifecycle tables are now included.
The schemas are **v1 candidates at D1 contract readiness**: local schema/fixture validation
passes, but API bindings, independent implementations, signature verification, compatibility
windows, and released package signing remain implementation handoffs.

## Contents

- `common/` — shared structural definitions only;
- `compute/` — provider, capability, workload, market, decision, lease, and receipt records;
- `storage/` — object manifests and authority-issued placement tokens;
- `network/` — privacy-minimized path capabilities and lease-bound reservations;
- `security/` — purpose-bound KMS operation grants and wrapped data-key envelopes;
- `economics/` — deterministic settlement batches and ledger commitments;
- `events/` — CloudEvents-compatible envelope and AsyncAPI compute/economics surface;
- `state-machines/` — machine-executable lifecycle instances checked against schema enums;
- `vectors/` — RFC 8785 canonicalization and Ed25519 positive/tamper vectors;
- `fixtures/` — positive, negative, timeout, retry, revocation, and failure cases;
- existing `identity/`, `academic/`, `events/`, `activitypub/`, `spatial/`, `ai/`,
  `agent-sessions/`, `deployment/`, and `media/` profiles; and
- `validate-contracts.mjs` — strict local contract validation and fixture-coverage gate.

## Validation

From the repository root, run:

```powershell
npm ci --ignore-scripts
npm run test:contracts
npm audit --audit-level=moderate
```

The runner validates every schema in strict Draft 2020-12 mode, resolves registered URN
references, checks fixtures, enforces positive coverage and all six scenario categories, checks
relative timestamp ordering and selected arithmetic invariants, validates local API/event
references with the official OpenAPI and AsyncAPI parsers, verifies fixed canonicalization and
Ed25519 vectors, exercises duplicate, conflicting, out-of-order, expired and
institution-scoped event delivery through a deterministic consumer model, proves lifecycle
state/transition coverage, checks fixed synthetic key rotation and revocation
vectors for new authorization, and performs two clean bundle builds
to prove byte-for-byte manifest reproducibility. It also builds and attests one
candidate bundle with an ephemeral development key, then rejects changed content,
manifest, signature, key identity, duplicate attestation and unlisted files.
It does not verify live signer authority,
authorization currency, external revocation, referenced-object existence, transport behavior,
or database transactionality. The event consumer model keeps its state in memory;
production consumers must persist deduplication and domain mutations atomically.
The key vectors test eligibility for new authorization only; historical audit,
signer authority, key registry freshness and offline revocation require service
policy and runtime evidence.
Service conformance tests still own those semantics.

### Development bundle attestation

The bundle builder produces a `candidate-unsigned` manifest. The attestation tool verifies
its file hashes and content root before adding a **development** signature over the exact
manifest bytes. The verifier checks the same file set and hashes and validates the signature
against a public key supplied out of band. These tools do not promote a bundle to a released
contract package or establish an authoritative signing key.

```powershell
node contracts/build-contract-bundle.mjs <empty-output-directory>
node contracts/attest-contract-bundle.mjs <bundle-directory> <ephemeral-private-key.pem> <key-id>
node contracts/verify-contract-bundle.mjs <bundle-directory> <public-key.pem> <key-id>
```

Generate and keep development private keys outside the repository and bundle. A real release
requires an approved signing authority, key rotation/revocation process, license/provenance
record, generated bindings and documentation, independent consumer evidence, and release
approval under the executable contract portfolio. The detached `attestation.json` is not a
substitute for any of those gates.

## Allowed and prohibited contents

Contracts, examples, generated documentation, validation tooling, and synthetic conformance
fixtures are allowed. Secrets, plaintext keys, credentials, private addresses, protected
student data, product implementation source, copied institution overrides, and undocumented
external dependencies are prohibited. Negative fixtures may name a prohibited field only to
prove that the schema rejects it and must never contain a real value.

## Ownership and compatibility

The domain named by each subdirectory owns semantics. Institution and product repositories pin
released contract artifacts and must not copy/edit schemas into private dialects. Additive
minor changes require backward fixtures; meaning, authorization, signature, required-field, or
state-machine changes require a new major contract version and migration plan.

## Contribution and change control

Changes require owner review, updated positive and negative fixtures, affected-consumer review,
documentation/link validation, contract validation, license/provenance review, and a migration
classification. A schema candidate becomes released only after the executable contract
portfolio's release evidence is complete.

## References

- [Executable Contract Portfolio](../docs/architecture/Executable-Contract-Portfolio.md)
- [Implementation Handoff Standard](../docs/standards/Implementation-Handoff-Standard.md)
- [Architecture Authority and Precedence](../docs/architecture/Architecture-Authority-and-Precedence.md)
