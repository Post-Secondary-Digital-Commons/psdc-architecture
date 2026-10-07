# AI Capacity and Graceful Degradation

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC AI and Compute Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0013, ADR-0029, ADR-0033

## Purpose and outcomes

This specification defines how institutional AI remains useful and fair when
models, accelerators, memory, network or federation capacity are constrained.
The outcome is explicit bounded degradation rather than hidden quality loss,
unbounded queues or policy bypass.

## Scope and out of scope

This document covers AI admission, queues, route degradation and interaction with
compute placement. Hardware procurement, building power, model training and
institution-specific numerical SLOs are out of scope.

## Architecture and ownership

The AI router owns capability degradation; the gateway owns admission and quotas;
compute owns provider placement and leases; operators own reservations and SLOs;
governance owns equitable allocation policy.

## Dependencies and adapters

Identity, policy, compute census, leases, metering, caches and telemetry are
versioned dependencies. Serving engines and federation transports are replaceable
adapters and MUST fail through stable reason codes.

## Requirements

- `AI-CAP-001`: The gateway MUST enforce per-user, project and service budgets before model execution.
- `AI-CAP-002`: Route policy MUST reserve fast-lane capacity and MUST prevent background deliberation from starving interactive clarification.
- `AI-CAP-003`: Critical academic or accessibility allocations MUST be explicit policy classes, not inferred from typing behavior or profile guesses.
- `AI-CAP-004`: Every degradation MUST return the selected capability, limitation, queue state and available user choices.
- `AI-CAP-005`: Public or federated placement is allowed only when workload classification, identity, policy, residency, lease and provider trust permit it.
- `AI-CAP-006`: The system MUST support cancellation, deadline, maximum queue age and resource ceilings.
- `AI-CAP-007`: Optimization claims require measurements on representative institutional workloads.

## Degradation ladder

```text
preferred strong route
  -> alternate approved strong instance
  -> approved federated instance
  -> smaller specialized model with disclosed limits
  -> retrieval/navigation-only response
  -> queued asynchronous result
  -> explicit unavailable/refusal
```

Authorization, evidence and safety never degrade. An institution may omit any
step, especially federation, through its signed profile.

## Optimization portfolio

Continuous batching, prefix caching, semantic caching, quantization, speculative
decoding, specialized small models, disaggregated prefill/decode and offline
precomputation are candidates. Each is enabled independently behind a feature
flag and requires quality, privacy, cancellation, overload and rollback evidence.

## Security and privacy

Admission and degradation never weaken classification, consent, locality or tool
authorization. Queue and capacity telemetry exclude prompt content and protected
user attributes.

## Deployment and implementation

Deploy separate fast and deliberative pools with independent autoscaling and
reservations. Begin with deterministic routing and synthetic load, then enable one
optimization at a time behind rollback-capable feature flags.

## Scheduling and placement boundary

The AI router chooses an approved model/capability and latency-quality class. The
compute resolver filters and scores eligible providers and returns a lease. The AI
router cannot name an ineligible node; compute cannot substitute an unapproved
model. Both decisions share a trace ID and produce separate evidence.

## Failure and recovery matrix

| Condition | User-visible result | Operator action |
|---|---|---|
| fast pool saturated | short bounded queue or approved local fallback | protect reservation; shed background work |
| strong pool saturated | clarify/continue fast lane; async or degraded option | scale, federate if approved, or enforce queue ceiling |
| cache layer lost | slower response | recompute; never fail authorization open |
| federation link lost | local ladder only | stop new remote leases; reconcile outstanding receipts |
| verifier lost | high-risk output withheld | restore verifier or route to approved equivalent |

## Acceptance and evidence

- `AI-CAP-ACC-001`: overload test proves background work cannot consume the fast-lane reservation.
- `AI-CAP-ACC-002`: no eligible strong provider produces an explicit degraded route and stable reason code.
- `AI-CAP-ACC-003`: cancellation stops queue and compute work within the profile deadline and produces a receipt.
- `AI-CAP-ACC-004`: fairness report detects allocation disparity and excludes typing-speed features.
- `AI-CAP-ACC-005`: federation loss never sends a protected workload to a public adapter.

## References

- [Inference Scheduling](./Inference-Scheduling.md)
- [Model Router](./Model-Router.md)
- [Student Quota Model](../economics/Student-Quota-Model.md)
