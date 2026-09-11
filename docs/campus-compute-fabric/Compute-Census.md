# Compute Census

> Status: Normative specification; implementation gated
> Domain: campus-compute-fabric
> Owner: PSDC Campus Compute Fabric Working Group; accountable maintainer RedjiJB until delegation
> Last reviewed: 2026-09-11

## Purpose and outcome

This specification defines **Compute Census** as part of the Post Secondary Digital
Commons. Its required outcome is institution-controlled heterogeneous campus compute with explicit capability, trust, scheduling, and preemption contracts. An implementation conforms
only when it satisfies this document, the linked ADRs, and the common
[Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Compute Census.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- The Compute Census capability SHALL provide institution-controlled heterogeneous campus compute with explicit capability, trust, scheduling, and preemption contracts.
- The capability SHALL have a versioned configuration schema, explicit safe
  defaults, validation before activation, and a reversible change procedure.
- User-visible and administrative behaviour SHALL be accessible, explainable,
  auditable, and bounded by institution policy and user authority.
- An implementation SHALL expose only the minimum capability required by its
  callers and SHALL reject unknown, unauthorized, malformed, expired, or
  unsupported requests with stable machine-readable errors.
- Institution deployments SHALL be independently operable and SHALL remain
  compatible with the common contract and conformance suite.

## Interfaces, APIs, events, and contracts

- Required interoperability boundary: versioned node capability, enrollment, job, lifecycle, artifact, accounting, and result schemas.
- HTTP interfaces SHALL use OpenAPI 3.1, explicit request and response schemas,
  documented error codes, pagination for collections, and bounded timeouts.
- Asynchronous interfaces SHALL use versioned schemas and CloudEvents envelopes;
  delivery semantics, ordering, replay, deduplication, and dead-letter behaviour
  SHALL be declared per event.
- Mutations SHALL be idempotent or accept an idempotency key. Long-running work
  SHALL expose status, cancellation, expiry, and result retrieval.
- Consumers SHALL depend on contracts rather than another service's database,
  internal queue, filesystem, or implementation-specific API.

## Dependencies and ownership boundaries

- This domain owns its schemas, policy enforcement points, migrations, service
  metadata, and compatibility tests.
- Identity, authorization, secrets, telemetry, object storage, notifications,
  and gateway functions SHALL be consumed through their owning common contracts.
- Mandatory runtime dependencies SHALL be open-source and self-hostable. An
  external or proprietary service MAY be an optional adapter with a tested local
  replacement and SHALL NOT be required for standalone institutional operation.
- Circular synchronous dependencies are prohibited. Cross-domain workflows SHALL
  define a coordinating owner and compensating behaviour.

## Data, state, residency, and retention

- Governed information includes node attestations, hardware capabilities, job metadata, immutable artifacts, utilization records, and bounded diagnostic logs.
- Every data class SHALL declare an authoritative owner, purpose, classification,
  residency, retention, export, correction, archival, and deletion rule in the
  institution manifest before production activation.
- Services SHALL minimize copied data, preserve provenance, encrypt protected
  state and backups, and prevent telemetry from becoming an undeclared secondary
  record system.
- Cache and derived data SHALL be rebuildable or explicitly protected by backup
  and recovery objectives. Deletion SHALL propagate to indexes, caches,
  derivatives, replicas, and backups according to the declared retention policy.

## Security, privacy, safety, and compliance

- Domain controls SHALL include mutual authentication, signed enrollment, sandboxed workloads, trust tiers, least-privilege worker identities, and rapid revocation.
- Authentication SHALL use the institution-approved identity issuer;
  authorization SHALL be deny-by-default, least-privilege, policy-driven, and
  enforced at every trust boundary.
- Secrets SHALL use institution-controlled secret storage, short-lived credentials
  where possible, documented rotation, and immediate revocation procedures.
- Threat modelling SHALL cover misuse, compromised identities, malicious inputs,
  dependency compromise, data exfiltration, denial of service, and unsafe
  automation. High-impact actions require explicit confirmation and audit.
- Logs, traces, diagnostics, and model context SHALL exclude protected content
  unless explicitly required, minimized, access-controlled, and retained by policy.

## Deployment, environments, and configuration

- The common repository SHALL contain portable schemas, reference configuration,
  conformance tests, and reusable OpenTofu, Helm, Kubernetes, or container assets.
- Each institution fork SHALL contain only branding, adapters, policy overlays,
  release configuration, and signed site values. Secrets SHALL never be committed.
- Development SHALL use synthetic data. Staging SHALL exercise production-like
  identity, policy, backup, upgrade, and failure behaviour without production data.
- Production changes SHALL use reviewed GitOps promotion, immutable versioned
  artifacts, health gates, rollback, and recorded provenance.

## Capacity, scaling, cost, and sustainability

- Capacity SHALL be controlled by quotas, concurrency limits, bounded queues,
  admission control, backpressure, and per-tenant fairness.
- The institution manifest SHALL declare demand assumptions, normal and peak
  capacity, saturation thresholds, scale limits, resource budgets, and service
  objectives using the common schema.
- Scale-out SHALL preserve authorization, ordering, idempotency, data consistency,
  and auditability. Overload SHALL degrade optional work before protected or
  interactive work and SHALL never bypass security controls.
- Resource and energy consumption SHALL be observable and included in lifecycle
  and capacity decisions.

## Failure, recovery, and compatibility

- Required lifecycle behaviour includes interactive-user priority, drain and preemption, thermal and power limits, checkpoint recovery, and failure-domain-aware scheduling.
- Dependencies SHALL have timeouts, bounded retries with jitter, circuit breakers,
  health reporting, and documented degraded modes. Security and authorization
  failures SHALL fail closed.
- Stateful implementations SHALL meet manifest-declared RPO and RTO values and
  prove backup restoration before production. Stateless components SHALL be
  replaceable from source, configuration, and signed artifacts.
- Releases SHALL support rollback and a compatibility window covering the current
  major contract version and one prior major version unless an ADR documents a
  safer domain-specific migration.

## Observability, testing, and operational readiness

- Implementations SHALL publish health, readiness, structured logs, metrics,
  traces, security events, usage, latency, error, and saturation signals through
  OpenTelemetry-compatible boundaries without exposing protected data.
- Required tests include unit, schema, contract, authorization, privacy, failure,
  upgrade, rollback, accessibility where user-facing, performance, and
  institution-standalone conformance tests.
- A release requires a named owner, runbook, threat model, dependency lock,
  license inventory, SBOM, vulnerability and secret scans, signed provenance,
  recovery evidence, and passing acceptance tests.

## Standards and implementation strategy

- Adopted boundary and strategy: OCI artifacts, S3-compatible objects, OpenTelemetry, and runtime adapters behind Commons-owned contracts.
- Implementations SHALL follow **adopt → extend → compatible fork → build**.
  Building a new primitive requires an ADR demonstrating that mature alternatives
  fail the requirements and that long-term maintenance is funded.
- Product selection is replaceable behind the contract. Product-specific APIs
  SHALL remain inside adapters and SHALL NOT leak into portable clients or domain
  contracts.

## Settled architecture constraints

- Commons Compute Fabric owns campus-specific enrollment, topology, trust, idle detection, scheduling, preemption, accounting, and integration.
- Execution engines remain plugins behind versioned job, capability, lifecycle, and result contracts.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Acceptance criteria

The specification is satisfied when an implementation evidence package proves:

1. versioned schemas and examples validate;
2. contract and compatibility tests pass;
3. identity and least-privilege authorization tests pass;
4. threat, privacy, accessibility, and license reviews are recorded as applicable;
5. capacity limits, degraded modes, and failure recovery behave as declared;
6. observability and audit evidence identify success, failure, and saturation;
7. backup, restore, upgrade, and rollback are demonstrated where applicable;
8. a standalone institution deployment passes the common conformance suite;
9. no mandatory proprietary service or undocumented cross-domain dependency exists.

## Decision status

There are no unresolved architecture choices in this specification. Institution
values are supplied through the governed deployment-manifest schema, and
implementation evidence is collected at the implementation authorization and
production release gates. Changes follow ADR-based change control.

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)