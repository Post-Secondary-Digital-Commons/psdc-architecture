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
Ed25519 vectors, proves lifecycle state/transition coverage, and performs two clean bundle builds
to prove byte-for-byte manifest reproducibility. It does not verify live signer authority,
authorization currency, external revocation, referenced-object existence, transport behavior,
or database transactionality; service conformance tests still own those semantics.

The local H-001 signing experiment adds a detached Ed25519 attestation for a
**candidate** bundle. `sign-contract-bundle.mjs` first verifies every declared
file, sorted path and content-root digest, then signs the RFC 8785 canonical
manifest with a caller-supplied private key. `verify-contract-bundle.mjs`
rechecks the bytes and signature against a separately trusted public key, an
expected key ID, and a content root pinned independently by the consumer. The
consumer must obtain that pin from a trusted release/channel record, not from
the bundle it is about to verify. The private key is never included in the
bundle or printed.
For a synthetic development key, run the bundle builder, then:

```powershell
node contracts/sign-contract-bundle.mjs <bundle-directory> <synthetic-private-key.pem> did:web:institution.example#bundle-test
node contracts/verify-contract-bundle.mjs <bundle-directory> <synthetic-public-key.pem> did:web:institution.example#bundle-test <trusted-content-root-sha256>
```

The test generates its own ephemeral key and covers wrong keys, changed files,
changed manifest/signature, duplicate signing, wrong or missing consumer pins,
and undeclared files. A passing
candidate attestation is **not** a contract release: key custody, revocation,
source provenance, consumer compatibility, independent review, and a release
authorization record remain unresolved. No institutional signing key belongs
in this repository.

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
