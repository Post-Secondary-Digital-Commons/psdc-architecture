# Ecosystem Documentation Quality and Scope Standard


> Standard: PSDC-DOC-001
> Document type: governance-standard
> Status: Normative
> Owner: PSDC Architecture Maintainer
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-13
> Governing decisions: ADR-0001, ADR-0012, ADR-0013; applicable document-specific ADRs

> Applies to: every Markdown document in common and institution repositories

## Purpose

This standard defines when a Post-Secondary Digital Commons document is complete,
fully scoped, and safe to use as an implementation authority. It prevents an
empty outline, directory label, short concept note, repeated boilerplate, or
document with headings but no decisions from being counted as a completed
specification.

The standard is stricter than a link or marker check. Structural hygiene proves
that a file is readable; this standard proves that the document communicates the
concrete decisions, boundaries, mechanics, failure behavior, and verification
evidence required by its declared purpose.

## Governing principles

1. **Classify before evaluating.** Every document declares its type. Required
   depth follows the type, not an arbitrary word count.
2. **Specificity over boilerplate.** Requirements name the affected capability,
   actor, interface, state, dependency, or failure condition.
3. **Decisions over candidate lists.** A normative document selects a default;
   alternatives are recorded with a change trigger and migration boundary.
4. **Boundaries over aspiration.** Each document says what its subject owns,
   does not own, and is prohibited from bypassing.
5. **Mechanics over labels.** “Handles identity” is not a mechanism. The
   document must explain protocol, authority, inputs, outputs, state, trust, and
   failure behavior.
6. **Verifiable completion.** Acceptance criteria identify observable evidence
   that can pass or fail.
7. **Honest maturity.** A complete design may be implementation-gated. Missing
   measurements and approvals are evidence to collect, not hidden choices.
8. **Institution sovereignty.** Common documents stay institution-neutral;
   institution values and stricter policies live in signed deployment overlays.
9. **Open implementation.** Required core behavior has a self-hostable,
   open-source implementation path and documented exit alternatives.
10. **Traceable claims.** Separate accepted decisions, measured observations,
    source-backed facts, inferences, estimates, and proposed controls. Name the
    source revision and scope when a claim depends on an external project.
11. **Reader-complete explanations.** Define specialized terms on first use,
    explain the steps and state changes behind an important mechanism, and
    include a concrete example and failure case where misinterpretation could
    change implementation or security behavior.

## Required control block

Every Markdown document except `CONTRIBUTING.md`, generated license material,
and generated notices SHALL include this block immediately after its title:

```text
> Standard: PSDC-DOC-001
> Document type: governance-standard
> Status: Normative
> Owner: <durable owning role>
> Accountable maintainer: <role or named maintainer>
> Last reviewed: YYYY-MM-DD
> Governing decisions: <ADR identifiers or "none">
```

`Owner` is a durable role, not only a person. A `Historical` document identifies
its replacement. A `Template` document is explicitly non-normative. Draft content
belongs on a topic branch and SHALL NOT be presented as complete on `main`.

## Document types and required sections

### Architecture specification

Use for system, subsystem, service, application, protocol, data, integration,
security, deployment, or infrastructure architecture. It SHALL contain:

- purpose, measurable outcomes, context, stakeholders, and use cases;
- scope, exclusions, and prohibited responsibilities;
- requirements, invariants, and stable requirement identifiers;
- architecture and component responsibilities;
- interfaces, schemas, producers, consumers, and compatibility;
- data/state ownership, classification, residency, retention, deletion, and export;
- control flow, data flow, dependencies, timeouts, fallbacks, and failure matrix;
- trust boundaries, security, privacy, safety, and abuse cases;
- deployment topology, configuration, secret boundaries, and environment separation;
- capacity, performance, quotas, availability, degradation, recovery, backup, and rollback;
- observability, operational ownership, incident and escalation model;
- test strategy, conformance fixtures, alternatives, trade-offs, and open-source default;
- implementation sequence, migration, binary acceptance criteria, evidence, and traceability.

It SHALL include at least one component or flow diagram, one dependency/failure
matrix, named interface contracts, stable requirements, and binary acceptance
criteria.

### Architecture map

Use for a system context, ownership, dependency, traceability, or
cross-pollination map. It SHALL identify the mapped scope, source-of-truth
documents, ownership boundaries, relationship/dependency semantics, assumptions,
known omissions, and the validation method used to detect stale links or
contradictions. A map SHALL link to the implementation-authorizing
specifications it summarizes and SHALL NOT silently introduce requirements that
are absent from those specifications. It does not authorize implementation by
itself.

### Component or service specification

Use for an executable, library, agent, connector, adapter, runtime, package, or
API. It SHALL define consumers, owned/prohibited responsibilities, inputs and
outputs, APIs/events, state lifecycle, dependencies, retry/idempotency, failure
behavior, authorization, secrets, deployment, telemetry, capacity, compatibility,
release, rollback, tests, provenance, and acceptance evidence.

### Policy or governance standard

Use for security, privacy, moderation, licensing, contribution, access, data,
operations, or organizational rules. It SHALL define authority, actors, normative
rules, roles, separation of duties, enforcement points, deny/fail behavior,
exceptions with approver and expiry, audit evidence, review cadence, violation
response, appeal where relevant, and acceptance criteria.

### Runbook or operational procedure

Use for incident, recovery, release, maintenance, or repeatable operations. It
SHALL define trigger, symptoms, severity, safety constraints, prerequisites,
permissions, backups, hypotheses, diagnostics, ordered actions, expected results,
verification, rollback, stop conditions, escalation, communication, retained
evidence, rehearsal cadence, and post-incident follow-up. Commands state the
environment, privileges, inputs, side effects, expected output, and safe rollback.

### Architecture decision record

Use for a durable consequential decision. It SHALL record status, date, context,
drivers, options and evidence, decision, consequences, security/privacy/
operations/cost/portability effects, migration, rollback, validation, review
triggers, and affected documents, repositories, contracts, and gates.

### Product or experience specification

Use for web, desktop, mobile, social, academic, administrative, and developer
experiences. It SHALL define users, needs, journeys, outcomes, included/excluded/
deferred capabilities, information architecture, interaction states, permissions,
consent, accessibility, privacy, abuse handling, responsive/offline/degraded/error
states, telemetry minimization, dependencies/fallbacks, acceptance scenarios, and
release evidence.

### Data or contract specification

Use for OpenAPI, AsyncAPI, JSON Schema, events, identity, media, compute,
deployment, or federation contracts. It SHALL define namespace, version, owner,
producers, consumers, fields, constraints, examples, auth context, validation,
canonicalization, idempotency, errors, compatibility, deprecation, migration,
privacy, residency, retention, deletion, audit, and conformance fixtures.

### Roadmap or implementation plan

Use for staged delivery. It SHALL define outcome, assumptions, dependencies,
critical path, phases, owners, entry and exit criteria, security/privacy/
accessibility/operations/licensing gates, risks, mitigations, stop conditions,
rollback, decision points, and evidence produced. Dates alone are not a roadmap.

### Provenance or upstream-adoption record

Use for third-party source or artifact adoption. It SHALL identify upstream,
immutable commit/tag, retrieval date, checksums, signatures, included/excluded
paths, license and notices, vulnerability/dependency/build/accessibility/privacy/
security review, local modifications, patch budget, update policy, contribution,
abort criteria, fallback, replacement, and approval evidence. A pre-import policy
must explicitly say `Import state: no source imported` and define future evidence.

### Institution deployment profile

Use for a thin institution fork or overlay. It SHALL define institution authority,
support, release ownership, upstream synchronization, permitted overrides,
prohibited divergence, identity/endpoints/domains/branding/features/policy/data
schemas, signing, secrets, approvals, promotion, rollback, incidents, standalone
operation, federation, and conformance evidence.

### Repository or directory index

Use only for navigation and placement. It SHALL state repository/directory purpose,
allowed contents, prohibited contents, owner, child-document/component inventory,
authoritative architecture/contract/policy/ADR links, and contribution/change
rules. It may be concise, but a one-line README or bare folder label is not
conformant and cannot substitute for a specification.

### Historical record or authoring template

Historical records identify date, source, retention reason, and current replacement.
Templates include all required headings for their target type, author instructions,
and explicit non-normative status. Neither is a current completed specification.

## Requirement quality

For code-facing documents, the [engineering and code standard](Ecosystem-Engineering-and-Code-Standard.md)
adds public-interface documentation, security-invariant comments, schema
field descriptions, fixture expectations, and review evidence. It does not
replace this document's type-specific completeness rules. Reader-facing
tutorials, procedures, reference, and explanation SHOULD be separated by
purpose following [Diátaxis](https://diataxis.fr/); an architecture
specification still carries the normative requirements in one owning place.

Examples and diagrams MUST match the current named contract version. A
security-sensitive explanation MUST state its threat actor, trust boundary,
assumptions, limits, failure mode, and what evidence would substantiate the
claim. Detailed prose is required where it removes ambiguity, but repeated
boilerplate, untestable adjectives, and paragraph-by-paragraph code narration
do not satisfy scope.

Every normative requirement SHALL use a stable identifier such as
`CLOUD-ARCH-001`, a responsible actor, normative language (`MUST`, `SHALL`,
`SHOULD`, or `MAY`), a condition and expected outcome, and a linked acceptance
criterion or evidence type.

Weak:

> The platform should be secure and scalable.

Conformant:

> `CLOUD-ARCH-014`: The edge gateway MUST reject a request whose issuer,
> audience, signature, expiry, or scope fails validation, MUST emit a redacted
> security event carrying the trace identifier, and MUST NOT forward the request.

## Acceptance-criteria quality

Each criterion states the requirement or risk, preconditions and environment,
input/action/fault, observable expected result, evidence artifact and owner, and
pass/fail boundary. “Test security,” “works as expected,” and “verify the service”
are not acceptance criteria.

## Anti-boilerplate rules

A document fails when substantive paragraphs are copied from unrelated domains,
requirements could move to another domain without changing nouns/interfaces/state/
failures, headings contain only generic process language, a technology is named
without a replaceable contract, or a dependency lacks direction, necessity class,
timeout, fallback, exchanged data, and ownership. Cross-cutting requirements may
be referenced, but each document must explain their domain-specific application.

## Maturity levels

| Level | Meaning | May be called fully scoped? |
|---|---|---:|
| 0 — Stub | Empty file, title, folder label, or idea fragment | No |
| 1 — Indexed | Navigation and placement are defined | Only for an index |
| 2 — Conceptual | Purpose and high-level model exist; mechanics or boundaries are missing | No |
| 3 — Implementation-ready | Design, mechanics, failure behavior, controls, and binary acceptance evidence are defined | Yes |
| 4 — Production-evidenced | Level 3 plus measured implementation, institutional, operational, and release evidence | Yes |

Current architecture, component, policy, product, contract, roadmap, provenance,
and runbook documents on `main` SHALL meet Level 3. Indexes SHALL meet Level 1
and link to the Level-3 documents they organize. Level 4 cannot be claimed before
implementation and deployment evidence exists.

## Machine-enforced conformance

The checker SHALL evaluate document control metadata, recognized type/status,
required headings, substantive content, stable requirements, dependency/failure
coverage, acceptance evidence, unresolved markers, links, JSON/YAML, duplicate
paragraphs, generic-language warnings, supersession, and common/fork consistency.
Automated checks are necessary but a maintainer must still review domain
specificity, factual consistency, coherence, and whether criteria distinguish a
correct implementation from an incorrect one.

## Definition of done

A documentation set is fully scoped only when every file is classified; current
content documents meet their type; indexes link to authoritative content; choices
are accepted or ADR-governed; dependencies and forks agree; machine validation
passes with no suppressed errors; human scope review confirms specificity; and the
completion audit records files, exceptions, evidence, and date.

Until all of those conditions are met, the ecosystem SHALL be described as
“documentation remediation in progress,” not fully scoped.

## Change control and related standards

Changes to types, maturity, acceptance rules, or enforcement require a pull
request in `psdc-architecture` and review of the workspace validator. Institution
overlays may be stricter but may not weaken this common standard.

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Documentation Architecture Standard](../Documentation-Architecture-Standard.md)
- [Repository and Obsidian Linking Model](../architecture/Repository-and-Obsidian-Linking-Model.md)
- [Decision Traceability Matrix](../architecture/Decision-Traceability-Matrix.md)

## Required controls

Implementations MUST satisfy the required controls and provide evidence before claiming conformance.

## Maturity

Maturity is recorded as proposed, active, accepted, or retired with an accountable owner.

## Change control

Change control requires review, impact analysis, linked decisions, and a supersession or migration note where behavior changes.
