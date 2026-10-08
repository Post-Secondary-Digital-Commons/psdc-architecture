# Contract Conformance Fixtures

> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Active executable test corpus
> Owner: PSDC Architecture Maintainers and domain contract owners
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-27
> Governing decisions: ADR-0001, ADR-0031

## Purpose and categories

Each `*.fixture.json` wraps one contract instance with its schema ID and expected structural and
domain outcome. `positive/` proves accepted shapes; `negative/` proves structural rejection;
`timeout/`, `retry/`, `revocation/`, and `failure/` provide structurally valid terminal or
recovery records with asserted status and reason paths.

## Evidence boundary

The runner proves JSON syntax, Draft 2020-12 structure, reference resolution, positive coverage,
category coverage, and the declared status/reason values. It does not prove cryptographic
signatures, wall-clock ordering, registry state, policy truth, capacity arithmetic, Merkle
construction, ledger consensus, or backend behavior. Those belong to service and vertical-slice
conformance tests.

## Allowed and prohibited contents

Only deterministic synthetic data is allowed. Real people, student records, credentials,
private topology, actual keys, production endpoints, or copied operational evidence are
prohibited. Common fixtures use `institution.example` and other neutral example
identifiers; Algonquin-specific sample bindings belong in the Algonquin overlay.
The validator rejects an Algonquin identifier in this common corpus. Negative
fixtures must use unmistakably fake values. Signature values are synthetic
placeholders, not a proof that the rewritten fixture bytes have valid signatures.

## Change control

Every new production schema requires a positive fixture. Every safety-relevant constraint needs
a negative or failure fixture, and every state-machine change must update timeout, retry,
revocation, and failure expectations where applicable.

## References

- [Fixture Case Schema](fixture-case.schema.json)
- [Shared Executable Contracts](../README.md)
