# Dual-Lane Adaptive Session Architecture

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC AI Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0003, ADR-0008, ADR-0013, ADR-0032, ADR-0033

## Purpose, outcomes and stakeholders

This specification defines a responsive, privacy-preserving institutional AI
session that combines a continuously available fast interaction lane with an
asynchronous strong-model deliberative lane. Students receive useful interaction
under constrained capacity without losing escalation, evidence, institutional
policy, accessibility or control.

Measurable outcomes are time to first useful response, correct escalation,
completed user task, evidence quality, policy conformance, equitable capacity
access and resource consumed per successful task. Stakeholders are students,
faculty, staff, researchers, accessibility services, AI operators, security,
privacy, capacity owners and federation partners.

## Scope, exclusions and prohibited responsibilities

In scope are session orchestration, model routing, context-package production,
verification, client state, retrieval coordination, capacity degradation and
observability. Exact institution models, hardware, quotas, legal bases and SLOs
belong in signed deployment profiles.

The architecture does not authorize a model to act, replace institutional
identity, expose a runtime to a client, store raw chain-of-thought, or fine-tune
weights during ordinary sessions. The fast model MUST NOT treat a context package
as authorization or as evidence beyond its cited scope.

### Out of scope

Model training pipelines, institution hardware quantities, course content,
grading authority and public-provider procurement are outside this specification.

## Requirements and invariants

- `AI-SESSION-001`: Every client request MUST enter through the institution gateway and receive a session, policy and trace context before inference.
- `AI-SESSION-002`: The orchestrator MUST select fast, deliberative, parallel or degraded handling from a versioned route policy and emit a route decision.
- `AI-SESSION-003`: A fast-lane answer MUST be bounded by its approved task classes, current context package and verifier policy.
- `AI-SESSION-004`: The deliberative lane MUST publish a versioned context package with evidence, assumptions, open questions, expiry and supersession.
- `AI-SESSION-005`: A stale, revoked, contradicted or unauthorized context package MUST NOT be used for a final answer.
- `AI-SESSION-006`: Cancellation MUST stop queued work and prevent a late result from silently replacing newer session state.
- `AI-SESSION-007`: Session adaptation MUST NOT be described or implemented as fine-tuning unless model weights or adapters are actually trained under a separately approved lifecycle.
- `AI-SESSION-008`: Route policy MUST NOT prioritize users from typing speed, inferred disability, emotional state or purchasing power.
- `AI-SESSION-009`: Routing and compute placement MUST remain distinct, independently auditable decisions.
- `AI-SESSION-010`: A final response MUST identify evidence freshness and whether it was produced from fast-only, deliberative or degraded handling.

## Architecture and component responsibilities

```text
Client conversation surface
        |
Institution data-plane gateway
        |
Session orchestrator ---- policy/consent/identity
        |
        +---- Fast lane: dialogue, clarification, rendering
        |
        +---- Deliberative lane: retrieval, tools, planning, synthesis
        |                         |
        |                  Context compiler
        |                         |
        +---------- SessionContextPackage
        |
Response verifier ---- evidence, freshness, safety, scope
        |
Streaming response and presentation controller
```

The client owns local drafts and presentation preferences. The gateway owns the
external trust boundary. The orchestrator owns session generation and cancellation
ordering. The router owns model-capability selection but not provider placement.
The context compiler owns package structure and provenance. The verifier owns the
allow/escalate/refuse decision for proposed responses. Compute owns leases and
provider placement; storage owns governed persistence.

## Interfaces, schemas and compatibility

Native clients use `SessionContextPackage`, `ModelRouteDecision`,
`ContextRefreshEvent` and `PresentationState`. Conventional OpenAI-compatible
clients may omit them and receive a single-lane compatibility session. Long work
uses status, cancellation and result retrieval. Every mutation carries an
idempotency key and expected session generation; a late result with an older
generation is discarded and recorded.

## Dependencies and adapters

The architecture depends on identity/policy, gateway, retrieval, governed
storage, compute placement, metering and telemetry only through versioned
contracts. Model servers, cache products and tool runtimes remain adapters and
MUST NOT become sources of session authority.

## Control flow and data flow

1. The client opens a session and receives local/default privacy and pacing state.
2. On explicit submit, the gateway authenticates, authorizes, classifies and rate-limits.
3. The router evaluates task, risk, uncertainty, latency budget, capacity and cache availability.
4. The fast lane acknowledges, answers a bounded request or asks a clarifying question.
5. When selected, the deliberative lane retrieves authorized evidence and performs bounded tool work.
6. The context compiler publishes the next package generation.
7. The verifier accepts, escalates or refuses the proposed response.
8. The client streams the response and independently controls presentation pace.
9. Metering records model route and resources without placing protected content in the ledger.

## Data, state, residency, retention and deletion

Authoritative state is the session record plus immutable generation metadata;
packages are derived protected data. Drafts default to local ephemeral state.
Session packages, semantic caches and KV caches have separate retention classes.
Deletion revokes packages, removes governed cache entries and propagates through
indexes, replicas and recoveries according to retention policy. Audit records use
digests and minimized references, not prompts or responses by default.

## Dependency and failure matrix

| Dependency | Needed for | Timeout/failure | Required behavior |
|---|---|---|---|
| Identity/policy | every remote operation | deny, timeout, issuer unavailable | fail closed; local draft remains usable |
| Fast model | immediate dialogue | overload or unavailable | queue briefly, use approved local fallback, or expose unavailable state |
| Deliberative model | complex reasoning | overload, timeout, cancellation | retain fast lane; mark pending or degraded; never fabricate result |
| Retrieval | grounded evidence | partial/stale/unavailable | identify missing evidence and narrow/refuse |
| Context store | multi-turn continuity | conflict or stale generation | optimistic-generation check; reload or start bounded session |
| Compute resolver | provider placement | no eligible provider | return capacity reason; never bypass classification/locality |
| Verifier | release of response | unavailable | high-risk response fails closed; low-risk behavior follows signed profile |

## Security, privacy, safety and abuse cases

Threats include prompt injection, malicious retrieved content, tool escalation,
cross-user caches, package forgery, rollback to stale policy, session fixation,
timing inference, denial of service and behavioural profiling. Packages and route
decisions are integrity protected; tool requests use separate authorization;
cache scope is salted by trust boundary; telemetry excludes content; and raw
keystroke timing never leaves the device under the common default.

## Deployment, capacity and recovery

The fast and deliberative lanes deploy as independent pools. The fast pool is
reserved for interactive availability; strong-model workloads are queued and may
use approved federation. Continuous batching, quantization, prefix caching,
semantic caching, specialized small models and disaggregated prefill/decode MAY be
used only after quality and isolation tests. Recovery reconstructs sessions from
authoritative metadata and packages, not from an assumed surviving KV cache.

## Observability and operations

Required signals include route, queue, TTFT, inter-token latency, context-package
generation, cache class and hit scope, escalation outcome, cancellation, evidence
freshness, verifier decision, compute provider class and resource receipt. User
content is excluded unless a separately authorized diagnostic capture is active.

## Testing, conformance and acceptance

- `AI-SESSION-ACC-001`: default pre-submit typing produces zero gateway traffic.
- `AI-SESSION-ACC-002`: a simple low-risk fixture completes on the fast lane with a valid route decision.
- `AI-SESSION-ACC-003`: a complex fixture creates a new package and the fast lane consumes only the accepted generation.
- `AI-SESSION-ACC-004`: stale, cross-user, cross-institution and revoked packages are rejected.
- `AI-SESSION-ACC-005`: a cancelled deliberation result cannot overwrite a newer generation.
- `AI-SESSION-ACC-006`: loss of large-model capacity leaves an explicit degraded experience and preserves policy.
- `AI-SESSION-ACC-007`: accessibility tests cover keyboard, screen reader, reduced motion, pacing bypass and conventional input fallback.

## Alternatives, implementation sequence and change control

Implement contracts and a deterministic router first; then a synthetic single
institution slice; then calibrated route evaluation; then optional anticipatory
mode; then approved federation. A new model, cache or router remains replaceable
behind these contracts. Changing the privacy default, per-session training rule,
gateway boundary or routing/placement separation requires a superseding ADR.

## References

- [ADR-0033](../architecture/architecture-decision-records/ADR-0033-dual-lane-adaptive-ai-sessions.md)
- [Session Context Package](./Session-Context-Package.md)
- [Cache Taxonomy and Isolation](./Cache-Taxonomy-and-Isolation.md)
- [Capacity and Graceful Degradation](./Capacity-and-Graceful-Degradation.md)
