# Commons Cloud Service Taxonomy v1


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: Commons Cloud architecture
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-10
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose

Define which capabilities belong in Commons Cloud and how they differ from product
services owned by Commons Compute Fabric, Commons AI Fabric, Commons Media and Spatial Fabric, and Commons Social Fabric.

## Scope

- In scope: shared edge, identity, projects/tenants, policy, service catalog,
  metering, provisioning, compute, storage, network, data, events, observability,
  secrets, developer services, and hybrid-cloud brokerage.
- Out of scope: academic behavior, AI prompts and agents, media semantics, social
  feeds, federation moderation, and Commons Compute Fabric worker internals.
- Constraint: Commons Cloud exposes standard service contracts and may adopt mature
  platforms rather than becoming a custom cloud implementation.

## Taxonomy

The [self-service cloud product proposal](../../product/Self-Service-Cloud-Product-and-Console.md)
adds an institution-branded console, account/project lifecycle and optional paid
capacity to this taxonomy. It records founder product direction but is not an
accepted commercial offer: course enrollment is not proposed as a universal
prerequisite, while eligible account population and paid-service activation remain
institution decisions. The services below are architecture scope, not proof of a
deployed cloud or AWS/Azure feature parity.

| Domain | Services | Boundary posture |
|---|---|---|
| Access edge | ingress, API gateway, load balancing, DNS, egress | Standard network and TLS mechanisms |
| Identity | Keycloak broker, OIDC/OAuth, workload identity, service accounts | College-approved upstream is authoritative; broker normalizes claims |
| Organization | organizations, projects, tenants, membership, quotas | Institution policy over portable resource models |
| Catalog | service discovery, ownership, versions, health, documentation | Standard APIs and metadata |
| Provisioning | declarative requests, workflows, reconciliation, lifecycle | Adapters to adopted platforms |
| Compute | VMs, containers, batch, managed Kubernetes, accelerators, serverless | Established hypervisor/OCI/Kubernetes interfaces |
| Storage | object, block, file, snapshots, backup, archive | S3-compatible and adopted storage systems |
| Network | virtual networks, IPAM, routing, firewall, VPN, private connectivity | Standard network primitives |
| Data | managed relational, cache, vector, search, lake, catalog | Established engines behind managed contracts |
| Integration | events, queues, pub/sub, webhooks, durable workflows | CloudEvents/AsyncAPI and mature brokers |
| Security | secrets, KMS, PKI, artifact signing, policy integration | Approved standard systems; no custom cryptography |
| Observability | metrics, logs, traces, dashboards, alerting | OpenTelemetry-compatible signals |
| Developer | OpenAPI, SDKs, OCI registry, CI/CD, GitOps, templates | Portable developer interfaces |
| Hybrid/federation brokerage | local, Commons Compute Fabric, approved post-secondary peers, and external-provider adapters | Explicit workload envelope and institution-first locality ladder |

## Placement rule

A capability belongs in Commons Cloud only when at least two ecosystems need the same
non-domain-specific behavior and centralized operation materially improves
security, reliability, governance, or efficiency. Shared code alone is not enough;
product-specific semantics remain with the owning ecosystem.

## Settled architecture constraints

- The platform creates distinctive value in orchestration, integration, policy, user experience, academic intelligence, student services, and campus-resource coordination while keeping its technology open-source.
- Mature standards and upstream implementations are adopted or extended before a new infrastructure primitive is proposed.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Decision status

- Decision: Inherits the accepted ADRs and consolidated technology defaults.
- Implementation evidence gate: define concrete service contracts, owners, SLOs, state, recovery,
  topology and release gates before implementation.

## Interfaces and contracts

**VISION-CCSTV-001:** Cross-system interactions MUST use versioned APIs, schemas, events, or federation protocols owned by the referenced repository. Producers, consumers, compatibility windows, idempotency, authorization context, and machine-readable errors MUST be explicit; direct database or private queue access is prohibited.

## Dependencies and ownership

The owning fabric retains its data, policy, release, and failure boundary. Shared identity, secrets, storage, events, telemetry, and compute are consumed through Commons contracts. Mandatory dependencies MUST be self-hostable and open source; institution overlays MAY add stricter policy but MUST NOT fork a common contract silently.

## Security, privacy, and safety

Trust boundaries MUST use institution-controlled identity, deny-by-default authorization, least privilege, secret rotation, minimized telemetry, and explicit data classification/residency/retention/deletion. Protected content, credentials, and private infrastructure values MUST NOT appear in maps, logs, or committed configuration.

## Deployment and implementation

The common organization owns portable contracts, reference configuration, OpenTofu modules, conformance fixtures, and upstream-compatible improvements. Institution organizations own branding, signed site values, policy overlays, adapters, and operational approvals. Development uses synthetic data; production promotion is reviewed, observable, reversible, and provenance-recorded.

## Capacity and scaling

Implementations MUST declare workload assumptions, quotas, concurrency, queue limits, saturation thresholds, resource budgets, and service objectives. Scale-out MUST preserve authorization, ordering, idempotency, auditability, and locality; overload degrades optional work before protected or interactive work.

## Failure, recovery, and compatibility

Dependencies require timeouts, bounded retries, circuit breakers, health signals, and documented degraded modes. Authorization and security failures fail closed. Stateful deployments declare RPO/RTO and restore evidence; contract changes require migration, compatibility windows, rollback, and an ADR when behavior is incompatible.

## Testing and evidence

Evidence MUST include contract and schema validation, authorization/privacy/security tests, failure and recovery exercises, capacity measurements, accessibility where user-facing, SBOM/license review, signed provenance, and standalone institution conformance. The workspace structural and substantive documentation gates are required before release authorization.

## References

- [Technology Defaults and Alternatives](../13-Technology-Defaults-and-Alternatives.md)
- [Ecosystem Dependency Contract](../../architecture/Ecosystem-Dependency-Contract.md)

