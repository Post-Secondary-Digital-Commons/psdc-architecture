# ADR-0005: Standard Platform Primitives

> Status: Accepted
> Scope: Data, infrastructure, APIs, events, telemetry, security, and artifacts

## Decision

Use established standards and mature implementations by default:

| Concern | Default boundary or reference |
|---|---|
| Relational data | PostgreSQL-compatible interfaces |
| Cache/coordination | Redis-compatible behavior implemented with Valkey where appropriate |
| Objects | S3-compatible object storage and content-addressed concepts |
| Containers/artifacts | OCI formats and registries |
| API definitions | OpenAPI for REST; gRPC/Protobuf where justified |
| Events | CloudEvents envelopes and AsyncAPI where appropriate |
| Observability | OpenTelemetry signals and context propagation |
| Transport security | Standard TLS/mTLS mechanisms |
| Secrets | Established secret-management infrastructure |

These are defaults, not permission to select products without requirements,
security, operational, licensing, and institutional review.

## Consequences

No `AlgonquinDB`, proprietary container format, custom tracing protocol, or novel
storage transport is created without an exception ADR satisfying ADR-0001.
