# 08 Standards Compatibility Matrix

> Status: Normative compatibility targets; conformance results are implementation evidence
> Domain: vision
> Owner: Platform architecture and quality engineering
> Last reviewed: 2026-09-10

## Purpose

Define the platform's expected compatibility surfaces and the evidence needed to
claim conformance.

## Scope

- In scope: selected external interfaces, formats, protocols, telemetry, identity,
  infrastructure, LMS, and federation boundaries.
- Out of scope: claiming certification before a conformance suite or independent
  test evidence exists.
- Constraint: versions and intentional deviations must be documented per service.

## Compatibility commitments

| Boundary | Target compatibility | Required evidence |
|---|---|---|
| Institutional authentication | OIDC/OAuth profile approved for Entra | Login, logout, refresh, expiry, revocation, MFA, device-flow, and negative tests |
| AI inference clients | Documented OpenAI-compatible subset | Golden requests/responses against OpenWebUI, OpenCode, SDKs, and selected third-party clients |
| Native Commons APIs | Versioned REST/OpenAPI | Schema validation, backward-compatibility checks, and generated-client tests |
| Internal RPC | gRPC/Protobuf where selected | Wire compatibility and version-skew tests |
| Events | CloudEvents envelope; AsyncAPI where selected | Schema registry validation, replay, duplicate, ordering, and version-evolution tests |
| Containers and artifacts | OCI | Build, pull, signature, SBOM, scan, and runtime interoperability tests |
| Object storage | S3-compatible subset | CRUD, multipart, range, integrity, auth, lifecycle, and failure tests |
| Observability | OpenTelemetry | Trace-context propagation and semantic-convention validation |
| Brightspace | Supported D2L OAuth/API/LTI contracts | Sandbox contract tests and vendor-change regression suite |
| Fediverse | ActivityPub/ActivityStreams profile | Controlled peer interop, signatures, discovery, inbox/outbox, retry, moderation, and abuse tests |
| Spatial media | Selected open formats/profiles | Multi-viewer fixtures, capability negotiation, fallback, provenance, and privacy tests |
| Commons Compute Fabric runtimes | AC job/runtime adapter contract | Capability negotiation, cancellation, preemption, failure, accounting, and replacement-adapter tests |
| Infrastructure as code | OpenTofu module/provider/state profile | Format, validate, plan, provider-lock, policy, drift, import, and state-recovery tests |
| Commons federation | Trust, capability, workload-envelope, artifact, and ledger contracts | Two-institution discovery, authorization, execution, revocation, reconciliation, and exit tests |

## Compatibility status vocabulary

- Planned: architecture intent only.
- Partial: named subset implemented; gaps documented.
- Compatible: conformance suite passes for supported versions.
- Certified: externally or institutionally reviewed evidence exists.
- Deprecated: supported only through a published migration window.

No document may use “compatible” without naming the profile, versions, tested
behaviors, known deviations, and evidence location.

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

## Decision status

- Accepted targets: The named profiles are approved targets, not claims that
  conformance has already been achieved.
- Implementation evidence gate: pin versions, build suites, document deviations, and publish
  evidence before using `Compatible` or `Certified` status.

## References

- [Ecosystem Implementation Readiness](../roadmap/Ecosystem-Implementation-Readiness-2026-09-11.md)
- [Full Technology Stack and Open-Source Alternatives](14-Full-Technology-Stack-and-Open-Source-Alternatives.md)
