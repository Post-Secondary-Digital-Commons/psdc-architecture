# Adaptive Session Evaluation

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC AI Evaluation Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0033

## Purpose and evaluation questions

This specification determines whether dual-lane sessions deliver correct,
useful, equitable and policy-compliant outcomes for less compute. It prevents
latency or token savings from hiding quality, privacy or escalation failures.

## Scope and out of scope

The scope is route, model, cache, UX, privacy, fairness, accessibility, failure
and resource evaluation. Production grading or automated academic decisions are
out of scope and MUST NOT be inferred from benchmark scores.

## Evaluation architecture and ownership

The evaluation harness submits versioned scenario manifests through the gateway,
captures route and execution evidence, scores task-specific outcomes and stores a
reproducible report. Domain reviewers own correctness rubrics; AI evaluation owns
the harness; privacy/security/accessibility owners approve their gates.

## Interfaces and dependencies

Inputs are scenario manifests, fixed model/policy/deployment versions and approved
datasets. Outputs are signed metric/evidence reports. Dependencies include the
gateway, telemetry, contract fixtures, model registry and compute receipts.

## Security, privacy and policy

Synthetic or licensed/de-identified datasets are the default. Evaluation has no
special production-data authority, and reports MUST minimize prompts and protected
attributes while retaining reproducibility.

## Deployment, capacity and routing

Runs use isolated evaluation projects with declared quotas. Load profiles cover
steady state, burst, overload and federation loss. Route thresholds are promoted
only after a signed comparison against the current baseline.

## Failure, recovery and availability

Partial telemetry, scorer failure or missing fixtures invalidates the affected
result rather than recording zero. Interrupted runs resume from immutable case IDs
or restart; results from mixed undeclared versions are rejected.

## Required metrics

| Dimension | Measures |
|---|---|
| quality | task success, grounded correctness, citation validity, user correction |
| routing | strong invocation, false non-escalation, unnecessary escalation, route stability |
| latency | time to first useful response, context refresh, completion and queue percentiles |
| capacity | GPU/CPU/memory/network/energy and institutional resource units per successful task |
| cache | hit rate by class, recompute saved, stale/invalid hits, isolation failures |
| safety/privacy | policy denial accuracy, draft transmissions, unauthorized reuse, tool incidents |
| fairness/accessibility | outcome and wait-time disparity, assistive-technology completion, pacing control |
| reliability | cancellation, timeout, retry, stale-generation and degraded-mode correctness |

## Dataset and experiment controls

Evaluation sets SHALL represent course tutoring, navigation, research, coding,
administration and adversarial tasks, with risk and difficulty labels reviewed by
domain owners. Protected production conversations are excluded unless separately
approved and minimized. Baselines include fast-only, strong-only and deterministic
rules. Model/version, policy, prompt, hardware, cache state and capacity are fixed
or recorded for reproducibility.

## Requirements

- `AI-EVAL-001`: route thresholds MUST be calibrated on representative institutional tasks, not vendor benchmarks alone.
- `AI-EVAL-002`: false non-escalation on high-risk tasks is a release-blocking metric.
- `AI-EVAL-003`: cache evaluation MUST include poisoned, stale, revoked and cross-tenant cases.
- `AI-EVAL-004`: accessibility and fairness slices MUST be reported without inferring protected traits from typing cadence.
- `AI-EVAL-005`: every optimization MUST compare successful-task resource use and quality against the current baseline.

## Acceptance gates

Exact numerical thresholds remain institution deployment decisions, but release
requires no critical privacy/security failure, no unauthorized provider route,
all high-risk fixtures escalated or safely refused, accessible journey completion,
reproducible evaluation artifacts and a signed owner decision. Missing data is a
failed gate, not a zero value.

## References

- [AI Evaluation](./AI-Evaluation.md)
- [Capacity and Graceful Degradation](../ai/Capacity-and-Graceful-Degradation.md)
