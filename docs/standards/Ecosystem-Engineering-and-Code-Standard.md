# Ecosystem Engineering and Code Standard

> Standard: PSDC-DOC-001
> Engineering standard: PSDC-ENG-001
> Document type: governance-standard
> Status: Proposed for owner review; normative after accepted merge
> Owner: PSDC Engineering Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-13
> Governing decisions: ADR-0001, ADR-0012, ADR-0013, ADR-0026; repository-specific accepted ADRs also apply
> Applies to: common repositories, compatible institution forks, and authored code, contracts, tests, configuration, scripts, and generated artifacts

## Purpose, authority, and evidence

This standard defines the minimum reviewable engineering practice across the
polyrepo ecosystem. It complements the [documentation-quality standard](Ecosystem-Documentation-Quality-Standard.md),
[implementation handoff standard](Implementation-Handoff-Standard.md), and
machine-readable contracts. It does not change an accepted ADR, a released wire
contract, an institution's lawful authority, or a language-specific toolchain.
Repository-specific guidance may be stricter; a weaker rule needs an accepted
exception with owner, scope, compensating control, expiry, and removal plan.

**ENG-001:** Every change MUST identify its owning repository, contract or
interface, accepted decision or approved task, trust boundary, affected
consumers, and evidence level. A documentation change does not prove runtime
behavior; a unit test does not prove deployment; a deployment does not prove
production reliability.

**ENG-002:** An implementation MUST preserve common/institution separation.
Common code and fixtures are institution-neutral. Local branding, identity
bindings, network topology, credentials, retention values, and approvals belong
in the institution overlay or deployment profile. A fork claiming compatibility
MUST pass the common conformance suite for its pinned contract versions.

## Design and implementation

**ENG-010:** Before adding an abstraction, locate the owning contract, existing
implementation, upstream project, and consumers. Record adopt/adapt/patch/fork/
build rationale for a consequential dependency. Keep the smallest coherent
module that owns an invariant; do not copy authority or policy into clients.

**ENG-011:** Public interfaces MUST define input and output types, validation,
authorization, error taxonomy, versioning, compatibility, timeouts, retry and
idempotency behavior, and side effects. Reject unknown or unauthorized inputs
at the declared boundary. Changes to a released cross-repository interface
require a versioned contract, migration window, and compatibility tests.

**ENG-012:** A stateful operation MUST state its owner and durable state,
transaction boundary, uniqueness and fencing rules, concurrency assumptions,
clock assumptions, and recovery behavior. A message handler MUST tolerate
declared duplicate, delayed, reordered, and replayed delivery. Receipts and
ledger commitments MUST not be used as a substitute for operational state.

**ENG-013:** Dependency calls MUST have bounded timeout, cancellation, retry
budget, backoff, and a declared failure state. Retries of a side-effecting
operation MUST carry an idempotency key or equivalent deduplication proof.
Fallbacks MUST preserve data classification, residency, authorization, and
criticality; cost or availability cannot silently downgrade a hard control.

**ENG-014:** Resource ownership MUST be explicit: close handles and streams,
release leases and reservations, bound queues and memory, and clean temporary
data according to the relevant retention policy. Destructive cleanup MUST be
scoped to exact validated targets and produce auditable evidence where required.

## Detailed code documentation and comments

Comments are part of the maintained interface. Their job is to carry reasoning
that the names, types, code, tests, and contracts cannot express concisely.
They MUST stay synchronized with behavior. Reviewers SHOULD reject comments
that merely narrate syntax, promise untested security, or duplicate a governing
contract verbatim.

**ENG-020:** Each public module, API, exported type, command, and nontrivial
function MUST have a discoverable contract in the language's native form
(docstring, doc comment, generated API reference, or adjacent specification).
State purpose, inputs, outputs, side effects, error and cancellation behavior,
authority assumptions, and a short example when misuse is likely. Small
private helpers may rely on clear names and tests.

**ENG-021:** Add a *why* comment adjacent to each non-obvious security,
privacy, concurrency, data-custody, compatibility, recovery, or performance
decision. Explain the invariant, threat or failure being prevented, why the
obvious alternative fails, and the source decision or fixture when relevant.
Comments MUST NOT claim that a TEE, encryption, attestation, test, or policy
provides a guarantee beyond its measured boundary.

**ENG-022:** Document every intentionally surprising behavior: lease expiry
and clock conversion; retry deduplication; key release and revocation;
deletion/tombstone limits; provider visibility; federation routing; fallback
placement; and compatibility exceptions. Put durable policy in its owning
document and use a short code pointer to it, so implementations do not create
competing normative copies.

**ENG-023:** In schema formats without comments, use `description`, field
constraints, examples, and linked human-readable contract notes. Every
field whose omission changes security, authority, privacy, retry, or lifecycle
behavior MUST document that effect and have a negative fixture. Generated
source MUST name its generator and editing rule, not accumulate hand edits.

**ENG-024:** A `TODO` MUST have an issue or decision identifier, owner,
condition for removal, and a safe current behavior. A vague TODO cannot hide
an authorization bypass or unimplemented failure path. Dead comments and
superseded links are removed with the code they describe.

Example of a useful comment:

```python
# Fence on the lease generation before writing usage: a delayed worker receipt
# from generation N must not debit the renewed generation N+1. See the lease
# state machine and the duplicate-receipt fixture.
if receipt.generation != active_lease.generation:
    raise StaleLeaseReceipt()
```

`# Compare generations` would repeat the code and omit the reason.

## Security, privacy, and supply chain

**ENG-030:** Map the actor, asset, trust boundary, threat, enforcement point,
and failure mode for each new authority or data flow. Authentication, policy
decision, and enforcement MUST be distinguishable. Apply least privilege,
deny-by-default, input validation, output encoding, and secret minimization.
Log identifiers and decisions, not protected payloads or keys.

**ENG-031:** A provider or node administrator is a separate trust principal
from the workload owner. Container or ordinary VM isolation MUST NOT be
documented as confidential execution against that administrator. A stronger
claim requires an explicit threat model, measured and independently verified
TEE evidence, key-release policy bound to that evidence, and failure tests.
See [Confidential Execution and Provider Visibility](../security/Confidential-Execution-and-Provider-Visibility.md).

**ENG-032:** Dependencies MUST be pinned or constrained according to the
repository's release policy, have license and provenance review, and be
scanned at a recorded revision. Release artifacts SHOULD carry SBOM and
integrity evidence. Vulnerability findings need owner, severity, disposition,
expiry for temporary exceptions, and retest evidence. An imported upstream
component is not safe merely because it is open source.

**ENG-033:** Development and tests MUST use synthetic or explicitly approved
data. Never put production secrets, private student records, raw credentials,
or unredacted security evidence into code, fixtures, telemetry, or public PRs.

## Testing and evidence

**ENG-040:** Each behavioral change MUST have a test that could fail if the
change were absent. Select unit, contract, integration, system, and operational
checks according to the affected boundary; record checks not run. Structural
schema validity is not evidence that authorization, isolation, or recovery works.

**ENG-041:** Contract-changing work MUST include positive, negative,
unauthorized, duplicate/replay, timeout, retry, revocation, and dependency-loss
cases where applicable. Stateful and concurrent paths need tests for stale
generation, race, partial commit, restart, and rollback. A real bug fix SHOULD
include a regression case that reproduces the root cause before the fix.

**ENG-042:** High-risk security claims require adversarial tests and a named
verifier independent of the implementation author when practical. TEE key
release, protected-data placement, deletion, identity transfer, financial
settlement, and critical-service recovery need end-to-end evidence at the
claimed environment, not only mocks.

**ENG-043:** Test reports MUST record command, revision, environment,
fixtures, observed outcome, known omissions, and whether evidence applies to
Common, an institution overlay, or both. A failing check is reported as failing;
it is not buried under a passing aggregate.

## Review, change, and release

**ENG-050:** A PR MUST be small enough to review coherently and describe
purpose, affected contract versions, alternatives, trust-boundary changes,
compatibility, tests and omissions, migration, rollback, and owners. Review
MUST examine both repository standards and the originating specification.
The change author MUST NOT treat an AI review or passing CI as human approval.

**ENG-051:** A release candidate MUST have clean reproducible build inputs,
format/lint/type and contract checks, required tests, dependency/security
review, release notes, rollback plan, and institution-specific promotion gates.
No single universal formatter replaces language-native tools. The owning
repository records exact commands and versions in its developer documentation.

**ENG-052:** Institution promotion MUST separately verify local identity,
keys, network, capacity, accessibility, privacy, backup/restore, observability,
operator training, and failure drills. Common conformance is necessary but
not sufficient for a production claim.

## Application by artifact

| Artifact | Minimum authored evidence | Local verification |
|---|---|---|
| Code module | ownership, public API, invariants, edge-case comments, tests | language-native formatter, static analysis, focused tests |
| JSON Schema/OpenAPI/AsyncAPI | owner, version, field semantics, security/compatibility descriptions, fixtures | schema parser, reference resolution, conformance suite |
| State machine/event consumer | transitions, fencing, idempotency, clocks, duplicate/replay behavior | transition and failure fixtures |
| OpenTofu/Ansible/Kubernetes | safe defaults, privilege/secret/network boundaries, rollback, environment assumptions | format/validate/plan and policy checks; no implicit apply |
| User-facing client | accessibility, consent, error/offline states, localization boundary | unit, accessibility, security, and end-to-end checks |
| Documentation/runbook | document type, authority, mechanics, binary acceptance, reviewer | documentation validators and human semantic review |

## Conformance and exceptions

A reviewer records each applicable `ENG-*` control as **pass**, **fail**,
**not applicable with reason**, or **not yet evidenced**. Language-specific
repositories may publish a stricter adapter, but MUST link here and state
which controls they implement. A proposed exception records owner, affected
revision and consumers, risk, compensating control, approver, expiry, and
retest or removal plan. No exception silently changes a common contract.

This standard itself is not proof of code quality. The first adoption review
SHALL sample one contract, one implementation, one infrastructure change, and
one institution overlay against the controls, record ambiguous wording, and
update the owning checks before claiming ecosystem-wide enforcement.

## Required evidence and maturity

The owning repository MUST retain a revision-bound checklist for applicable
controls, exact check commands and outputs, review findings, unresolved risks,
and any exception record. The maturity of that evidence is recorded separately
as proposed, structurally checked, implemented, deployed, or production proven;
passing documentation checks cannot advance an implementation state.

## Definition of done

A change meets this standard only when applicable controls have passing
evidence or an approved, unexpired exception; the owning contracts and docs
agree; affected consumers and institution overlays have a migration path;
tests cover the material failure cases; and the PR states what was not tested.

## Change control

Changes to this standard require a reviewed architecture PR, affected-repo and
validator impact analysis, and a migration note for existing consumers. A
language-specific adapter may add stricter checks but may not silently relax
this common boundary. This proposed standard becomes binding only after owner
review and accepted merge.

## Source standards and related authority

- [NIST Secure Software Development Framework, SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final): secure development and verification practices.
- [OWASP Application Security Verification Standard](https://owasp.org/projects/asvs): application security requirements; use an explicitly pinned version in an implementation handoff.
- [Diátaxis](https://diataxis.fr/): separate tutorial, how-to, reference, and explanation for learner-facing material.
- [NIST Application Container Security Guide, SP 800-190](https://csrc.nist.gov/pubs/sp/800/190/final): container and host risk model.
- [Ecosystem Documentation Quality and Scope Standard](Ecosystem-Documentation-Quality-Standard.md).
- [Architecture Authority and Precedence](../architecture/Architecture-Authority-and-Precedence.md).
