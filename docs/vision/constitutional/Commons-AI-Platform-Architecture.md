# Commons AI Fabric Platform Architecture

> Status: Normative platform architecture; implementation gated
> Domain: vision
> Owner: Commons AI Fabric architecture
> Last reviewed: 2026-09-10

## Purpose

Define the shared AI platform used by web, desktop, mobile, coding, academic,
agent, SDK, and third-party clients.

## Scope

- In scope: gateway, identity mapping, API compatibility, model registry and
  aliases, provider/runtime adapters, routing, policy, usage, knowledge, agents,
  tools, evaluation, academic integration, clients, and observability.
- Out of scope: proprietary model-serving protocols, separate client-to-provider
  integrations, or a second platform-native password system.
- Constraint: the MVP works with one local backend; cloud and Commons Compute Fabric remain optional
  adapters with policy-aware routing.

## Architecture

```text
Web | OpenCode | Desktop | Mobile | CLI | SDK | academic clients
                                  |
                           Commons AI Gateway
           identity | authorization | policy | usage | audit | API contracts
                                  |
              model registry + stable aliases + capability router
                                  |
       local runtime | dedicated cluster | Commons Compute Fabric adapter | user-owned edge adapter
                                  |
             vLLM | SGLang | llama.cpp | other replaceable engines
```

## API boundaries

- `/v1/...`: documented OpenAI-compatible operations and conformance profile.
- `/commons/v1/...`: institution-neutral identity, usage, projects, policies, academic,
  agent, tool, files, knowledge, and campus capabilities.
- Internal provider interface: streaming, capabilities, health, usage, errors,
  cancellation, policy metadata, and model-result normalization.

Clients never receive provider credentials or bypass gateway policy.

## Model abstraction

Stable aliases such as AC Fast, AC General, AC Reasoning, AC Code, AC Research,
AC Vision, and AC Private map to approved implementations. Routing considers
capability, data classification, user/course policy, locality, capacity, latency,
cost, health, and provider availability.

Workload envelopes express user-device allowance, institution-only processing,
approved federation geography, commercial-provider allowance, data class,
retention, cost and fallback. Placement follows ADR-0013's locality ladder. Commons Compute Fabric
is added as a capability backend only after its production criteria pass. The
older `CAMPUS_ONLY`, `SELF_HOSTED`, and `USER_EDGE_ALLOWED` labels may remain API
convenience profiles only when their exact envelope expansion is documented.

## Agent boundary

The model proposes structured plans and tool calls. Deterministic services enforce
scope, data policy, action risk, preview, confirmation, execution, verification,
receipts, idempotency, and audit. Scheduling and reminders live in task/workflow
services rather than model memory.

## Product strategy

PSDC Web is implementation-independent at the architecture boundary. Its
preferred initial scaffold is the frozen Open WebUI v0.6.5 BSD source under
ADR-0009; current releases are compatibility-only. It evolves into a native
Chat/Study/Work/Code/Campus experience. Eligible clients such as OpenCode remain
thin upstream-compatible integrations. Original effort goes into gateway
orchestration, identity, academic knowledge, campus agents, privacy/policy,
accessible UX, evaluation, and developer APIs.

## Settled architecture constraints

- The platform creates distinctive value in orchestration, integration, policy, user experience, academic intelligence, student services, and campus-resource coordination while keeping its technology open-source.
- Mature standards and upstream implementations are adopted or extended before a new infrastructure primitive is proposed.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0008: Open-Source, Self-Hosted Core
- ADR-0009: PSDC Web Foundation
- ADR-0010: Provider-Neutral Core with Institutional Production Authorities
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Decision status

- Decision: Python/FastAPI gateway, vLLM production adapter, llama.cpp
  local adapter, PostgreSQL/pgvector, and provider-neutral contracts.
- Implementation evidence gate: select exact model releases and licenses, implement contracts,
  threat controls, evaluation gates, SLOs and institutional approvals.

## References

- [Full Technology Stack and Open-Source Alternatives](../14-Full-Technology-Stack-and-Open-Source-Alternatives.md)
- [PSDC Web Foundation](../../clients/PSDC-Web-Foundation.md)
