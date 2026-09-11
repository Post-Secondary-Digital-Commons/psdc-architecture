# Specification Completeness Standard

> Status: Normative specification
> Owner: PSDC Architecture Maintainer
> Effective: 2026-09-11

## Purpose

This standard defines when Post Secondary Digital Commons architecture and
scope documentation is complete enough to authorize implementation. It prevents
empty outlines from being treated as architecture while keeping measured
deployment evidence separate from design decisions.

## Completion rule

A specification is complete when it defines all of the following without an
unresolved architectural choice:

1. purpose, users, scope, and exclusions;
2. normative behaviour and quality requirements;
3. versioned interfaces and compatibility rules;
4. ownership and dependency boundaries;
5. data classification, residency, retention, and deletion rules;
6. authentication, authorization, privacy, safety, and threat controls;
7. deployment model, configuration ownership, and secret boundaries;
8. capacity model and resource controls;
9. failure behaviour, recovery, and rollback;
10. observability, testing, and implementation acceptance gates;
11. the selected open-source default and the migration boundary for alternatives;
12. the ADR or governance authority that controls changes.

The specification may require site values in an institution deployment manifest
without becoming incomplete. Examples include DNS names, node counts, storage
capacity, recovery objectives, retention periods, identity issuer identifiers,
and named on-call personnel. The specification must define the schema, allowed
ranges, decision owner, validation rule, and safe default for every such value.

## Normative language

The words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**,
**SHOULD**, **SHOULD NOT**, and **MAY** express requirement strength. A deviation
from MUST or SHALL requires a recorded ADR and compatibility assessment.

## Default cross-cutting requirements

Every capability specification inherits these requirements:

- Interfaces SHALL be versioned, documented, authenticated where non-public,
  bounded by timeouts, and testable without a proprietary service.
- Mutating operations SHALL be idempotent or carry an idempotency key and SHALL
  produce an auditable result.
- Services SHALL enforce least privilege, deny by default, validate inputs at
  trust boundaries, and keep secrets outside source and images.
- Data SHALL have an owner, classification, residency policy, retention rule,
  export path, and deletion path before production use.
- Deployments SHALL be reproducible with OpenTofu, Kubernetes manifests or Helm,
  and GitOps reconciliation; institution secrets and site values stay in the
  institution deployment repository.
- Components SHALL publish health, readiness, structured logs, metrics, traces,
  security events, and saturation indicators without leaking protected data.
- A release SHALL have automated tests, dependency and secret scans, an SBOM,
  a rollback procedure, backup and restore evidence where stateful, and a named
  operational owner.
- Protocols and data SHALL remain portable. A proprietary dependency MAY be an
  optional adapter but SHALL NOT become the only supported path.
- Accessibility, privacy, security, and federation policy tests are release
  gates, not post-release enhancements.

## Design-time defaults

Unless a more specific specification overrides them through an ADR:

| Concern | Normative default |
|---|---|
| Availability class | Three replicas across failure domains for production control-plane services; graceful degradation for optional features |
| API compatibility | Current major version plus one prior major version during a documented migration window |
| Transport | TLS 1.3 preferred; TLS 1.2 minimum only where interoperability requires it |
| Identity | OIDC for authentication, OAuth 2.1-style authorization, short-lived tokens, institutional issuer authority |
| Authorization | Central policy decision with local enforcement and deny-by-default rules |
| Events | CloudEvents envelope and AsyncAPI documentation where asynchronous integration is used |
| APIs | OpenAPI 3.1 for HTTP APIs; explicit schemas for every request, response, and error |
| Storage | PostgreSQL for relational state, Valkey for ephemeral coordination, S3-compatible object storage for objects |
| Infrastructure | OpenTofu, Kubernetes, Helm, and GitOps using open interfaces |
| Telemetry | OpenTelemetry-compatible traces, metrics, and logs |
| Recovery | Restore is tested before production; service-specific RPO and RTO are declared in the institution manifest |
| Supply chain | Locked dependencies, provenance, SBOM, signature verification, vulnerability and secret scans |

## Implementation authorization gate

Implementation may begin when the owning repository links its work item to the
applicable specification and ADRs. Production release additionally requires:

- completed threat model and privacy assessment;
- approved institution deployment manifest;
- passing automated acceptance and interoperability tests;
- capacity and failure testing against declared objectives;
- rollback and restore evidence;
- accessibility conformance for user-facing components;
- named service owner and incident escalation path;
- license, provenance, and upstream-maintenance review.

These are implementation deliverables, not unresolved architecture decisions.

## Change control

Specifications change through pull requests. Contract-breaking changes,
security-boundary changes, new mandatory dependencies, licensing changes, or
federation-policy changes require an ADR. Institution overlays MAY tighten local
policy but SHALL NOT weaken common security, portability, accessibility, or
protocol-compatibility requirements.
