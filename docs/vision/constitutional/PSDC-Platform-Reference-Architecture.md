# Post-Secondary Digital Commons Reference Architecture

> Status: Normative reference architecture; implementation gated
> Domain: vision
> Owner: Platform architecture
> Last reviewed: 2026-09-10

## Purpose

Define the top-level systems, dependency direction, shared boundaries, and runtime
flows for the complete platform.

## Scope

- In scope: logical ecosystems, shared platform services, contracts, identity,
  compute, data, clients, federation, spatial context, and hybrid deployment.
- Out of scope: final product selection, physical topology, sizing, and production
  approval.
- Constraint: every system must work in a minimal independent mode before optional
  sibling systems become hard dependencies.

## Logical architecture

```text
users, developers, administrators, institutions, federated peers
                              |
                web / desktop / mobile / CLI / SDK
                              |
      institution experience | neutral core | federation
                              |
              Commons Cloud Fabric shared platform edge
                              |
         identity | policy | catalog | events | observability
                              |
      +-----------------------+-----------------------+
      |                       |                       |
 Commons Compute      Commons AI Fabric    Commons Media and Spatial
      Fabric          models/agents/study     assets/pipelines/spatial
      |                       |                       |
      +-----------------------+-----------------------+
                              |
                   Commons Social Fabric
             social products + ActivityPub boundary
```

## Ownership boundaries

- Commons Cloud Fabric owns common platform capabilities, not product business logic.
- Commons Compute Fabric owns safe campus-resource coordination, not model-serving internals.
- Commons AI Fabric owns AI access, routing, policy integration, knowledge, and agents.
- `psdc-web`, `psdc-desktop`, and `psdc-mobile` own independently released
  client products; institution forks own branding, approved discovery, signing,
  distribution, and support metadata.
- Commons Media and Spatial Fabric owns media identity, provenance, processing, spatial media, and
  delivery.
- Commons Social Fabric owns social products, moderation, and the public ActivityPub edge.
- The umbrella repository owns cross-system contracts and constitutional decisions.

## Required shared contracts

- normalized human, service, device, workload, and public-identity references;
- service authentication and authorization context;
- CloudEvents-compatible event envelope and schema evolution rules;
- API versioning, error, idempotency, pagination, and trace conventions;
- spatial identifiers, precision, provenance, privacy, and retention metadata;
- AI model aliases, inference requests, policy context, usage, and results;
- compute capabilities, jobs, cancellation, preemption, accounting, and results;
- media assets, renditions, provenance, rights, moderation, and delivery references;
- ActivityPub profiles and internal publication requests.
- institution-signed client deployment manifests covering identity discovery,
  API origins, enabled capabilities, branding, release channels, and support.

## Representative request flow

1. A client authenticates through institutional OIDC/OAuth.
2. Commons Cloud Fabric resolves service route and propagates normalized identity, policy, and
   trace context.
3. The owning product validates authorization and data classification.
4. Work executes locally or through an adapter to an approved backend.
5. Durable state remains in the owning service; large artifacts use object storage.
6. Events use versioned portable envelopes.
7. Telemetry uses OpenTelemetry conventions.
8. Public social federation passes only through Commons Social Fabric policy and delivery.
9. Compute, artifact, research and service federation use their owning capability
   contracts, explicit peer trust and the institution-first locality ladder.

## Dependency rules

- No cross-repository private imports or database access.
- No client-to-model-provider bypass.
- No client-to-identity-directory, LMS database, social database, worker-agent,
  object-store, or model-runtime bypass.
- No Commons Compute Fabric dependency until it meets workload isolation and operational criteria.
- No public federation before moderation and security readiness.
- Every optional dependency defines timeout, fallback, queueing, and recovery.
- No federation peer becomes a local identity, LMS, policy, database, secrets or
  infrastructure-state authority.

## Settled architecture constraints

- The platform creates distinctive value in orchestration, integration, policy, user experience, academic intelligence, student services, and campus-resource coordination while keeping its technology open-source.
- Mature standards and upstream implementations are adopted or extended before a new infrastructure primitive is proposed.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0014: Fediverse Social Fabric
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain
- ADR-0020: Post-Secondary Digital Commons Is the Shared Platform Name
- ADR-0021: Institution-Branded Client Access
- ADR-0022: Polyrepo Ecosystem
- ADR-0023: Institution Organization Fork Model
- ADR-0025: Independent Web Client Repository

## Decision status

- Decision: Inherits the accepted ADRs and consolidated technology defaults.
- Specification disposition: architecture choices and version-1 contract profiles
  are complete. Exact releases, physical inventory, measured sizing, test results,
  named institutional operators, and production approvals are implementation and
  release evidence; they do not reopen this architecture unless an ADR changes it.

## References

- [Consolidated Ecosystem Architecture](../../architecture/Consolidated-Ecosystem-Architecture.md)
- [Ecosystem Dependency Contract](../../architecture/Ecosystem-Dependency-Contract.md)
