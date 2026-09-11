# 02 Architecture Principles

> Status: Normative architecture principles
> Domain: vision
> Owner: Platform architecture
> Last reviewed: 2026-09-10

## Purpose

Define the durable rules used to choose technologies, design boundaries, review
exceptions, and keep the complete platform interoperable and maintainable.

## Scope

- In scope: all repositories, services, clients, integrations, infrastructure,
  protocols, extensions, forks, and research prototypes intended to become part of
  the Post-Secondary Digital Commons.
- Out of scope: pinning an exact release or site value before requirements,
  measurements and institutional constraints are known.
- Constraint: production identity, College data, infrastructure, and policy require
  institutional ownership and approval.

## Principles

### 1. Standards first

Use open and industry standards at system boundaries. A standard is valuable when
it enables independent implementations, existing tools, conformance testing, and
an exit path from a product—not merely because its name is familiar.

### 2. Adopt, extend, fork, then build

Evaluate mature implementations before creating a component. Prefer supported
configuration and plugins. Maintain a compatible fork only when institution-specific
value cannot be delivered cleanly upstream. Build a new primitive only with a
documented exception under ADR-0001.

### 3. Build institution-specific value in deployment overlays

Invest original engineering in academic intelligence, student services, campus
agents, privacy and policy, accessible UX, institutional integration, media and
spatial workflows, and intelligent coordination of College resources.

### 4. Stable contracts, replaceable implementations

Clients and sibling systems depend on versioned APIs, events, schemas, and
capability contracts. They do not depend on a vendor name, private database,
internal module, machine, cluster, or deployment topology.

### 5. Institutional identity, local authorization

Each institution's approved IdP is its institutional identity root; Entra is the
expected institution production upstream. Keycloak brokers and normalizes claims
without becoming a second institutional directory. Services perform
least-privilege authorization using normalized claims, scopes, roles, attributes,
resource policy, and data classification. Public social identity remains separate.

### 6. Control plane over reinvention

The Commons Cloud and Compute Fabrics add orchestration, policy, inventory, placement, accounting,
topology, trust, and lifecycle control around mature data-plane systems. They do
not recreate hypervisors, container formats, object protocols, or model servers.

### 7. One shared AI gateway

AI clients use the gateway's OpenAI-compatible or native Commons API. Providers and
runtimes are adapters. Policy and identity cannot be bypassed through direct
client-to-provider connections.

### 8. Upstream-compatible products

Eligible OSI-licensed clients, including OpenCode, and adopted Fediverse products
remain thin downstream forks or extension layers. Every patch has an owner, test,
upstream/removal plan, and maintenance budget. ADR-0009 separately treats Open
WebUI v0.6.5 as a frozen BSD scaffold for institution-branded web-client development;
current releases are compatibility targets, not eligible platform dependencies.

### 9. Supported institutional integrations

Use supported D2L, Microsoft, and other institutional interfaces. Scraping,
credential impersonation, and undocumented protocols are not architecture.

### 10. Observable and operable by design

Every production capability defines health, metrics, logs, traces, service
objectives, failure behavior, runbooks, ownership, backup/recovery, and capacity
limits before broad rollout.

### 11. Privacy and safety at the boundary

Data classification, purpose, residency, retention, consent, location precision,
content safety, and agent confirmation are enforced before data or actions cross a
service, cloud, provider, federation, or device boundary.

### 12. Research without production coupling

Experimental engines, heterogeneous sharding, volunteer compute, and emerging
spatial formats may be explored behind adapters. Production services cannot depend
on them until security, performance, failure, and operational exit criteria pass.

### 13. Sovereign Commons federation

Keep core schemas and software institution-neutral. Each institution controls its
identity, academics, data, policy, compute, moderation, keys and operations.
Federation exchanges only approved capabilities and references within explicit
trust and workload envelopes.

### 14. Open-source and self-hosted defaults

Use the accepted stack catalog. OpenTofu and Ansible are the IaC baseline. A
source-available or SaaS-only component needs an explicit exception ADR and can
never silently become a core dependency.

## Settled architecture constraints

- The platform creates distinctive value in orchestration, integration, policy, user experience, academic intelligence, student services, and campus-resource coordination while keeping its technology open-source.
- Mature standards and upstream implementations are adopted or extended before a new infrastructure primitive is proposed.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0008: Open-Source, Self-Hosted Core
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain
- ADR-0020: Post-Secondary Digital Commons Is the Shared Platform Name

## Decision status

- Decision: The principles and project technology defaults are approved.
- Implementation evidence gate: add exact releases, measured thresholds, named owners,
  institutional approvals and evidence at each implementation gate.

## References

- [Technology Defaults and Alternatives](13-Technology-Defaults-and-Alternatives.md)
- [Post-Secondary Digital Commons Architecture](constitutional/Post-Secondary-Digital-Commons-Architecture.md)
