# Source Decision Import — 2026-09-10

> Status: Complete import record
> Source type: User-provided chat excerpt
> Scope: Standards-first architecture decisions

## Imported principle

Algonquin-specific engineering value belongs at the orchestration, integration,
policy, UX, academic, student-service, and campus-resource coordination layers.
Infrastructure standards and mature implementations should be adopted, extended,
or integrated rather than recreated.

## Normalized decisions

| Source decision | Architecture record |
|---|---|
| Use standards and mature implementations before building | ADR-0001 |
| Use Entra/Algonquin SSO through OIDC/OAuth | ADR-0002 |
| Expose OpenAI-compatible AI endpoints and common provider adapters | ADR-0003 |
| Keep ACF runtime-agnostic and own only campus-specific orchestration | ADR-0004 |
| Use standard data, API, event, OCI, telemetry, storage, TLS, and secret primitives | ADR-0005 |
| Keep eligible clients and adopted products as thin downstream forks | ADR-0006; Open WebUI eligibility superseded by ADR-0008 |
| Use supported D2L/Brightspace interfaces and do not scrape | ADR-0007 |

## Reference projects preserved as references

HTCondor, Kubernetes, GPUStack, vLLM, SGLang, llama.cpp, Ray, exo, and SwarmLLM
are recorded as projects to adopt, interoperate with, or evaluate. The source does
not establish one product or version as mandatory for every environment.

PostgreSQL, Redis-compatible coordination through Valkey, object storage, OCI, OpenTelemetry,
OpenAPI, CloudEvents, AsyncAPI, gRPC/Protobuf, TLS/mTLS, and established secret
management are recorded as default standards or mature primitives subject to
workload and institutional review.

## Intentionally unresolved

The source does not settle:

- exact versions, vendors, hosting environment, procurement, or support model;
- the final policy engine, event broker, object store, secrets system, or database
  topology;
- which workloads justify gRPC, Ray, distributed inference, or heterogeneous
  sharding;
- production Entra tenant configuration or institutional claims;
- licensing, data-residency, accessibility, security, and operational approval;
- quantitative SLOs, quotas, capacity, cost, recovery targets, and rollout dates.

Those were recorded as unresolved items in the owning documents at import time. They must not be inferred
from a reference technology name.

## Later constitutional clarification

ADR-0008 requires an OSI-approved license and fully self-hosted core for every
selection. It makes Entra and Brightspace provider-specific boundary adapters and
excludes current Open WebUI releases as dependencies. ADR-0009 subsequently chose
the v0.6.5 BSD source as a gated web scaffold, and ADR-0010 clarified that
College-approved systems remain authoritative for institutional production. This
preserves the imported source as a historical record without allowing older
product assumptions to override current policy.

## Propagation

All 434 Markdown specifications from the master suite contain applicable settled
constraints and ADR traceability. The OpenAPI normative profile now contains equivalent
machine-readable decision metadata. The constitutional documents and core
standards documents were expanded into drafts where the source contained enough
decision content.
