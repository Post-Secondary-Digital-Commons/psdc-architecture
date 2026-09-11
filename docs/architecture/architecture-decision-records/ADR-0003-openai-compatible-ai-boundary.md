# ADR-0003: OpenAI-Compatible External AI Boundary

> Status: Accepted
> Scope: AI clients and model-provider integrations

## Context

OpenWebUI, OpenCode, SDKs, IDEs, and many existing applications already understand
OpenAI-compatible APIs. A proprietary inference protocol would force every client
to implement Algonquin-specific behavior.

## Decision

AC AI exposes a versioned OpenAI-compatible API for broadly portable inference
operations and a separate versioned native Commons API for institution-specific
capabilities. Model providers and runtimes implement an internal common adapter
interface. Clients never connect directly to providers.

## Consequences

- Compatible clients can integrate without custom inference transport.
- Algonquin-specific identity, policy, usage, academic, and agent features remain
  available without distorting the compatibility API.
- Compatibility behavior needs conformance tests and documented intentional gaps.
- Providers and runtimes can change without changing client contracts.
