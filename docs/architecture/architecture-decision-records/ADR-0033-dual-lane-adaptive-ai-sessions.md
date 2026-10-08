# ADR-0033: Dual-Lane Adaptive AI Sessions

> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC AI Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0003, ADR-0008, ADR-0012, ADR-0013, ADR-0032

> Date: 2026-10-07
> Scope: interactive AI sessions, model cooperation, session context, privacy, caching, capacity degradation, and client experience
> Decision owner: PSDC founder

## Context and decision drivers

PSDC must provide useful institution-owned AI to a broad student population even
when the available accelerators cannot run the largest model for every token of
every session. The client must remain responsive, accessible and understandable;
protected drafts and behavioural telemetry must not become an undeclared source
of profiling; and an optimization must not bypass the institution gateway or
confuse documentation with a deployed capability.

The accepted interaction concept uses an extremely quiet conversation surface, a
small low-latency dialogue model, and an asynchronous larger deliberative model.
The architecture needs precise boundaries because “cache” can mean application
state, semantic answer reuse, a model-independent context package, or a
model-specific KV cache. Likewise, changing model weights is fine-tuning;
conditioning a model with session state is not.

## Decision drivers

1. Useful first response under constrained shared compute.
2. Escalation to stronger reasoning when risk, complexity or uncertainty warrants it.
3. Institution-controlled identity, policy, data, model and compute boundaries.
4. No raw keystroke profiling or pre-submit transmission by default.
5. Accessible progressive disclosure rather than hidden system state.
6. Open-source, replaceable serving, routing and cache components.
7. Model-independent session artifacts with provenance, expiry and deletion.
8. Measurable quality, fairness, privacy and cost rather than token savings alone.

## Considered options

| Option | Benefits | Costs and disposition |
|---|---|---|
| Largest model for every turn | Consistent maximum model capability | Rejected as the default because capacity, latency and energy scale poorly and overload has no useful degraded mode. |
| Small model only | Predictable cost and latency | Rejected because complex, high-risk and evidence-heavy tasks need escalation. |
| Per-session live fine-tuning | Appears highly personalized | Rejected as a default because it changes weights, consumes scarce compute, complicates deletion/evaluation and creates poisoning and adapter-lifecycle risks. |
| Dual-lane session with a structured context package | Responsive interaction plus bounded strong-model deliberation | Accepted. |
| Stream every keystroke to the large model | Earliest possible background work | Rejected by default; an explicit anticipatory mode may send minimized, debounced content after consent and policy checks. |

## Decision

1. PSDC SHALL implement interactive AI as a **dual-lane adaptive session**:
   a fast interaction lane and an asynchronous deliberative lane, coordinated by
   an institution-owned session orchestrator behind the institution gateway.
2. The fast lane MAY answer bounded low-risk requests, ask clarification questions,
   render results and maintain interaction, but MUST escalate when the session
   package is absent, stale, contradicted, outside scope, or below a calibrated
   confidence/risk threshold.
3. The deliberative lane SHALL produce a versioned, model-independent
   `SessionContextPackage`; it MUST NOT expose hidden chain-of-thought as a
   contract or require a client to understand a provider-specific representation.
4. Session adaptation SHALL use context, retrieval, explicit preferences and
   governed memory by default. Live per-session weight fine-tuning is prohibited
   unless a later ADR defines training data authority, isolation, evaluation,
   deletion, rollback and capacity evidence.
5. UI state, semantic result caches, context packages and KV/prefix caches SHALL
   be separately named, owned, isolated, retained, invalidated and measured.
   A KV cache SHALL NOT be assumed portable between different models.
6. Raw inter-keystroke timing SHALL remain on the device and SHALL NOT influence
   service priority. Unsubmitted drafts SHALL remain local by default. Optional
   anticipatory processing requires explicit opt-in, a visible indicator,
   debouncing, cancellation, minimization and no durable memory by default.
7. Generated response availability and presentation pacing SHALL be distinct
   states. A client MUST NOT imply that deliberate slow reveal is ongoing model
   reasoning and MUST offer immediate reveal and accessibility controls.
8. Developer mode SHALL expose route, model, context version, evidence, tools,
   policy outcome, cache class/hit, latency, resource usage, retry and trace data,
   but MUST NOT expose secrets, protected content, raw hidden reasoning or data
   outside the viewer's authorization.
9. Capacity degradation SHALL preserve policy and authorization, prefer bounded
   smaller-model service over silent failure, expose queue/degraded state, and
   maintain equitable quotas and approved accessibility accommodations.
10. Routing and placement are separate decisions: `psdc-ai` chooses the approved
    capability/model route; `psdc-compute` chooses an eligible execution provider
    under workload, data, locality, lease and federation constraints.

## Consequences

The architecture creates explicit session-orchestrator, context-compiler,
verifier and route-decision responsibilities. It reduces repeated strong-model
work and supports graceful degradation, but adds distributed state, cache
invalidation, evaluation, privacy and observability obligations. A fast response
is not necessarily a complete answer; the UX must make escalation and refinement
understandable without becoming noisy.

## Security, privacy and safety

The institution gateway remains the only client path to model runtimes. Session
packages are classified derived data, not harmless caches. They require purpose,
authorization, residency, retention, export and deletion controls. Cache keys
MUST include tenant/institution, user or approved sharing scope, model/version,
policy version and relevant data classification. Timing side channels, prompt
injection, package tampering, stale evidence, cross-user cache reuse, malicious
tools, inference denial of service and behavioural profiling are explicit threats.

## Operations and economics

Operators SHALL measure strong-model invocation rate, false non-escalation,
unnecessary escalation, cache hit rate by cache class, time to first useful
response, completion quality, task completion, per-task resource consumption,
queue time, cancellation, fairness and privacy events. Token reduction alone is
not an acceptance metric. Institution manifests select exact SLOs, quotas,
models, capacity pools and federation permissions.

## Migration and rollback

The first implementation SHALL be the bounded adaptive-session vertical slice on
synthetic or explicitly approved data. Existing OpenAI-compatible clients remain
supported through the gateway; they may omit the new native contracts and receive
a conventional single-lane session. Rollback disables anticipatory processing
and dual-lane routing while retaining session export and audit evidence.

## Validation

- `ADR33-ACC-001`: schemas reject unversioned or structurally unscoped context packages; consumer conformance tests reject packages that are expired, from another institution, or outside current authorization and policy scope. Schema validation alone does not establish those contextual facts.
- `ADR33-ACC-002`: a test proves unsubmitted typing produces no network request in default mode.
- `ADR33-ACC-003`: a stale or contradicted package causes escalation or an explicit bounded refusal, not an unsupported answer.
- `ADR33-ACC-004`: capacity exhaustion returns a visible degraded route without bypassing policy or using an unapproved provider.
- `ADR33-ACC-005`: presentation pacing can be disabled and is not reported as model execution.
- `ADR33-ACC-006`: developer mode exposes route and evidence provenance without protected prompts or hidden reasoning.

## References and supersession

- [Dual-Lane Adaptive Session Architecture](../../ai/Dual-Lane-Adaptive-Session-Architecture.md)
- [Minimal Conversation Experience](../../product/Minimal-Conversation-Experience.md)
- [Typing and Draft Privacy](../../governance/Typing-and-Draft-Privacy.md)
- [ADR-0032](./ADR-0032-data-plane-gateway-and-two-axis-roadmap.md)

