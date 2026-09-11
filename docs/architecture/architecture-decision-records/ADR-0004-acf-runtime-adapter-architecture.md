# ADR-0004: ACF Is Runtime-Agnostic

> Status: Accepted
> Scope: Algonquin Compute Fabric

## Context

Existing engines already solve model serving and distributed execution problems.
ACF's unique problem is safely coordinating authorized campus resources.

## Decision

ACF owns node enrollment, device identity and attestation, hardware discovery,
campus topology, trust tiers, idle detection, scheduling policy, preemption,
resource accounting, and institutional integration. Execution engines remain
plugins behind versioned runtime and job interfaces.

Initial/reference adapters may include vLLM, SGLang, llama.cpp, exo, SwarmLLM, and
future runtimes. HTCondor informs opportunistic desktop policy; Kubernetes or
GPUStack may manage stable GPU resources; Ray may be evaluated where distributed
serving provides evidence-based value.

## Consequences

- ACF does not become a model server or proprietary distributed runtime.
- Adapter capability negotiation is explicit and testable.
- Experimental heterogeneous sharding cannot define the baseline job contract.
- Replacing an engine does not require redesigning enrollment or scheduling.
