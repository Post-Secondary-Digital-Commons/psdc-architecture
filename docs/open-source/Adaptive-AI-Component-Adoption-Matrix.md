# Adaptive AI Component Adoption Matrix

> Standard: PSDC-DOC-001
> Document type: provenance-record
> Status: Proposed; import gated
> Owner: PSDC AI and Open Source Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0001, ADR-0008, ADR-0033

> Import state: no source imported by this decision package.

## Purpose and evaluation boundary

This record maps established open-source work to the adaptive-session design. A
candidate is not a dependency until its exact commit, license, security,
accessibility, operations and exit evidence is approved.

## Upstream, commit and tag policy

Upstreams are the official RouteLLM, vLLM, SGLang, LMCache, llm-d and GPTCache
repositories plus primary cascade/speculative-decoding research. No commit or tag
is accepted yet; each implementation PR MUST pin one immutable revision.

## License status

Candidate licenses require per-revision verification and notice capture. Listing
a project here is not a legal compatibility conclusion.

## Included and excluded source

Included source will be the minimum adapter/runtime paths approved by a provenance
PR. Examples, hosted-provider defaults, telemetry integrations, deployment code
and unrelated tools are excluded unless separately justified and reviewed.

## Candidate matrix

| Need | Candidate | Intended use | Do not inherit blindly | Status |
|---|---|---|---|---|
| model-capability routing | RouteLLM | evaluate/calibrate fast versus strong route strategies | hosted-provider defaults and vendor benchmark claims | research candidate |
| efficient serving | vLLM | continuous batching, prefix caching, quantization and serving | direct client endpoint or insecure shared cache | preferred candidate |
| alternative serving | SGLang | structured/agent serving and prefix reuse | provider-specific semantics in PSDC contracts | evaluated alternative |
| tiered KV reuse | LMCache | persist/transfer model-compatible KV state | treating KV as model-independent memory | preferred candidate |
| inference request placement | llm-d Router | load, priority and cache-locality-aware pod routing | replacing PSDC policy or compute lease authority | integration candidate |
| semantic result reuse | GPTCache patterns | policy-scoped stable-result reuse | caching personalized or time-sensitive answers without revalidation | pattern candidate |
| model cascade research | FrugalGPT | quality/cost evaluation patterns | assuming API cost is PSDC's only objective | research precedent |
| draft/verify acceleration | speculative decoding implementations | reduce decode latency for compatible model pairs | confusing token drafting with the fast dialogue lane | optional optimization |

## Adoption requirements

- `OSS-ADAPT-001`: every import MUST pin a tag and commit and record retrieval digest, license and notices.
- `OSS-ADAPT-002`: every candidate MUST have a replacement boundary and an institution-operable self-hosted path.
- `OSS-ADAPT-003`: upstream benchmarks are hypotheses until reproduced on approved hardware and workloads.
- `OSS-ADAPT-004`: no candidate may bypass PSDC gateway, policy, session, storage, compute lease or evidence contracts.
- `OSS-ADAPT-005`: vulnerabilities, maintainer health, dependency tree, build reproducibility and patch budget require owner approval.

## Exit and abort criteria

Abort or isolate a candidate when its license becomes incompatible, security
cannot be patched within the service target, data must leave institutional
control, the adapter exposes backend credentials, required semantics cannot be
mapped, or maintained replacement cost exceeds its measured benefit.

## Acceptance evidence

An adoption PR includes provenance manifest, license scan, dependency SBOM,
reproducible build, isolation and failure tests, representative benchmark,
accessibility impact where applicable, operations runbook, patch budget and exit
test. Until then this matrix authorizes research only.

## References

- [Standards Contribution Strategy](./Standards-Contribution-Strategy.md)
- [Dual-Lane Adaptive Session Architecture](../ai/Dual-Lane-Adaptive-Session-Architecture.md)
