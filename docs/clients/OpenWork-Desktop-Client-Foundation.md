# OpenWork Desktop Client Foundation

> Status: Normative foundation; source import authorized only at the implementation provenance gate
> Owner: Commons AI Fabric desktop team
> Governing decision: ADR-0018

## Product role

The institution-branded OpenWork-derived desktop is the workstation client for
long-running AI work. It owns
desktop interaction, workspace selection, local previews, diff review, and safe
local tool mediation. It does not own identity, provider routing, policy, durable
institutional records, or cross-device authorization.

## Component boundary

```text
OpenWork-derived desktop UI and shell
        │
        ├── local workspace grant + tool sandbox
        ├── Commons Session Host / agent adapter
        │         └── Commons AI Gateway ── policy/router ── approved model runtime
        └── optional E2EE session channel ── Commons Session Relay ── mobile
```

The current upstream OpenWork core is React + Electron + `openwork-server` and is
MIT outside `ee/`. The import must exclude `ee/`, Den, hosted MCP URLs, hosted
inference, cloud workers, subscription features, and provider-specific shortcuts
that bypass the gateway.

## First release scope

- Institutional sign-in and local device registration.
- Explicit folder/workspace grants with visible scope and revocation.
- Create, resume, interrupt, and archive agent sessions.
- Streaming messages, plans, todos, tool calls, permission prompts, diffs, files,
  artifacts, and receipts.
- OpenCode adapter first; adapters remain replaceable.
- Gateway model aliases rather than upstream provider/model identifiers.
- Signed desktop packages and self-hosted update metadata with rollback.
- Optional pairing with Happy-derived mobile through the encrypted relay.

## Security invariants

- Renderer code never receives durable host-owner or provider credentials.
- Local server binds to loopback unless a separately reviewed authenticated
  remote mode is enabled.
- IPC, deep links, file URLs, navigation, clipboard, updater, and spawned commands
  use explicit allowlists.
- Permission decisions bind session, request, action digest, device, actor, and
  expiry. `allow_once` cannot become a durable rule accidentally.
- The desktop remains useful with the relay offline; the relay never becomes a
  path around local policy.

## Delivery slices

1. Provenance-only import rehearsal and reproducible upstream build.
2. AC Gateway adapter and synthetic identity.
3. Workspace grants, permission receipts, and tool sandbox.
4. Shared session contract and local host.
5. Mobile pairing, encrypted relay, handoff, and notifications.
6. Accessibility, signed distribution, update rollback, and pilot evidence.

## Acceptance evidence

Record exact upstream commit, licenses, SBOM, dependency scan, IPC threat model,
accessibility results, supported OS matrix, installer/update signatures, adapter
contract tests, offline behavior, and downstream patch size before release.

Users obtain the client and authenticate through the flow defined in
[Institution-Branded Client Distribution and Access](Institution-Branded-Client-Distribution-and-Access.md).
