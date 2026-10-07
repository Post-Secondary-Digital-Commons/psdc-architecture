# Adaptive AI Vertical Slice

> Standard: PSDC-DOC-001
> Document type: roadmap
> Status: Normative plan; implementation not started
> Owner: PSDC AI, Web and Compute Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0032, ADR-0033

## Outcome, assumptions and boundaries

This slice proves one student can use the minimal web surface, submit a synthetic
course question, receive a fast clarification, obtain a deliberative context
package and receive a cited answer while routing, privacy, capacity and developer
evidence remain visible. It creates no production deployment and uses no protected
institution data.

The plan MUST preserve gateway, privacy, accessibility and evidence gates at every
phase and MUST stop when a declared stop condition occurs.

## Dependencies and critical path

```text
contracts -> deterministic router -> fake fast/strong adapters
          -> session orchestrator -> verifier -> minimal web client
          -> compute placement stub/receipt -> evaluation and failure tests
```

## Delivery phases

| Stage | Work | Exit evidence |
|---|---|---|
| 0 | accept ADR and contracts | validators and traceability pass |
| 1 | implement deterministic in-memory session state and generation checks | unit/property tests, stale-result rejection |
| 2 | implement fake fast/strong model adapters and context compiler | contract tests and recorded fixtures |
| 3 | implement verifier and route/degradation policy | positive, negative, timeout, cancellation and overload tests |
| 4 | implement minimal accessible web journey and developer view | browser, accessibility and privacy network tests |
| 5 | integrate one self-hosted small and one strong model behind gateway | reproducible deployment and representative benchmark |
| 6 | integrate approved compute lease/receipt and optional cache candidates | placement, metering, isolation and rollback evidence |

## Required scenarios

1. `ROAD-AI-001`: Simple low-risk fast-only answer.
2. `ROAD-AI-002`: Complex question with clarification and strong-model package.
3. `ROAD-AI-003`: Goal change that cancels stale deliberation.
4. `ROAD-AI-004`: Strong capacity unavailable with disclosed smaller-model degradation.
5. `ROAD-AI-005`: Evidence missing or revoked with refresh/refusal.
6. `ROAD-AI-006`: Cross-user package/cache attempt rejected.
7. `ROAD-AI-007`: Default typing produces no request.
8. `ROAD-AI-008`: Accessible immediate reveal overrides pacing.
9. `ROAD-AI-009`: Developer trace reconstructs route without protected content.

## Gates, risks and stop conditions

Security, privacy, accessibility, contract, licensing, observability and recovery
gates are mandatory at each affected stage. Stop on cross-user disclosure,
gateway bypass, unsupported high-risk fast response, inaccessible critical
journey, unreproducible route result or inability to cancel stale work. Roll back
to the last stage's signed fixture and deployment manifest.

## Ownership and handoff

Architecture owns contracts; `psdc-ai` owns orchestrator/router/compiler/verifier;
`psdc-web` owns the client; `psdc-compute` owns placement/lease; `psdc-cloud`
owns gateway and operational state; deployment-template owns manifests. Each
repository produces its own implementation handoff and release evidence.

## Definition of done

The slice is complete only when every scenario passes against real local model
adapters, evidence is reproducible from a clean checkout, the threat model has no
unaccepted critical finding, measured quality/capacity results are published and
the institution owner explicitly decides whether to advance. Documentation and
schemas alone do not satisfy this plan.

## Exit criteria and evidence

Each phase exits only with the table's evidence, clean contract and documentation
gates, traceable defects, and an owner decision. The final evidence package adds
benchmark inputs/results, SBOM/provenance, accessibility report, threat review,
failure traces and rollback rehearsal.

## References

- [Dual-Lane Adaptive Session Architecture](../ai/Dual-Lane-Adaptive-Session-Architecture.md)
- [Adaptive Session Evaluation](../testing/Adaptive-Session-Evaluation.md)
