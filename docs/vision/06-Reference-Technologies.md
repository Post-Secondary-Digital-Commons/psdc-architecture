# 06 Reference Technologies

> Status: Normative reference baseline; exact release selection is an implementation gate
> Domain: vision
> Owner: Platform architecture
> Last reviewed: 2026-09-10

## Purpose

Identify standards and mature implementations that teams must evaluate before
proposing custom infrastructure. A reference technology is not an automatic final
product selection; it establishes the comparison baseline and expected boundary.

## Scope

- In scope: interfaces, formats, protocols, engines, orchestration systems, and
  upstream products named in accepted decisions.
- Out of scope: procurement, production approval, version pinning, and declaring a
  single implementation suitable for every workload.
- Constraint: selections require security, privacy, licensing, accessibility,
  operations, cost, institutional, and interoperability review.

## Reference matrix

| Capability | Standard/default boundary | Reference implementations or projects | Decision posture |
|---|---|---|---|
| Institutional login | OIDC/OAuth 2.x | Keycloak broker; College-approved Entra upstream in production | Broker normalizes claims but is not institutional authority |
| Provisioning | SCIM where supported | Keycloak and open provisioning components | Institutional tooling is an optional adapter |
| REST APIs | OpenAPI | Mature framework selected by service team | Contract first |
| Internal RPC | gRPC/Protobuf where justified | Mature language runtimes | Use only when REST/events do not fit |
| Events | CloudEvents; AsyncAPI | NATS JetStream; Pulsar/Kafka alternatives | NATS is default; portable envelope and schemas |
| AI client API | OpenAI-compatible | Commons AI Gateway | Compatibility surface plus native Commons API |
| Stable GPU inference | Runtime adapter contract | vLLM default; SGLang alternative | Adopt as engines, not platform protocol |
| Edge/local inference | Runtime adapter contract | llama.cpp | Adopt behind adapter |
| Experimental heterogeneous inference | Runtime adapter contract | exo, SwarmLLM | Research tier only until proven |
| Opportunistic compute | Standard job/capability contract | HTCondor policy model | Reference, interoperate, or adopt components |
| Stable cluster scheduling | Kubernetes APIs | RKE2 production; K3s edge/dev | Normative default; do not recreate |
| Distributed application execution | Adapter/job contract | Ray; Dask alternative | No added engine until measured need |
| Relational data | SQL/PostgreSQL compatibility | PostgreSQL | Default reference |
| Cache/coordination | Redis-compatible semantics | Valkey | Do not depend on proprietary Redis modules |
| Object storage | S3-compatible API | Ceph RGW; Garage/SeaweedFS alternatives | Ceph accepted; exact topology later |
| Immutable artifact distribution | Content addressing and integrity manifests | Existing CAS/object tooling | Do not invent model transport |
| Containers | OCI image/runtime/distribution specs | Mature OCI ecosystem | Required portability boundary |
| Infrastructure as code | OpenTofu module/provider/state profile | OpenTofu + Ansible | Accepted under ADR-0017; institution-controlled state |
| Observability | OpenTelemetry | Compatible collectors/backends | Required signal/context boundary |
| Transport security | TLS/mTLS and standard PKI | Institutional/approved tooling | No custom cryptography |
| Secrets | Established secret-management APIs | OpenBao | No secrets in repositories or hosted control-plane requirement |
| LMS | Supported D2L APIs, OAuth, LTI 1.3 | Brightspace-supported tooling | No scraping |
| Web client | OpenAI-compatible and native Commons APIs | Independent `psdc-web` browser/PWA product; verified Open WebUI v0.6.5 BSD source is the eligible bootstrap | Provenance gate under ADR-0009 and ownership under ADR-0025; current releases are compatibility references only |
| Coding client | Supported extension/fork surfaces | OpenCode | MIT-licensed candidate; thin downstream strategy |
| Federation | ActivityPub and related web standards | Mature Fediverse products | Shared governed federation edge |

## Evaluation requirement

Every production selection records requirements, alternatives, compatibility,
security, operations, licensing, total lifecycle cost, upgrade path, exit plan,
and why the selected implementation is appropriate for its workload.

## Settled architecture constraints

- The platform creates distinctive value in orchestration, integration, policy, user experience, academic intelligence, student services, and campus-resource coordination while keeping its technology open-source.
- Mature standards and upstream implementations are adopted or extended before a new infrastructure primitive is proposed.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0008: Open-Source, Self-Hosted Core
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Decision status

- Decision: Project-level defaults are listed in the full stack catalog.
- Implementation evidence gate: verify exact releases, transitive licenses, security posture,
  owners, capacity fit, accessibility and exit tests before production.

## References

- [Full Technology Stack and Open-Source Alternatives](14-Full-Technology-Stack-and-Open-Source-Alternatives.md)
