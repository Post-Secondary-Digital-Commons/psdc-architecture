# ADR-0019: Happy Is the Mobile AI Client Foundation

> Status: Accepted
> Date: 2026-09-10
> Scope: PSDC mobile client and cross-device agent supervision
> Decision owner: Project founder; exact-source import requires legal and security review

## Context

The mobile client should supervise and continue AI work without placing a full
privileged agent runtime on a phone. Happy provides an MIT-licensed Expo mobile
and web application, encrypted synchronization server, CLI/agent bridge, push
notifications, and device handoff. Its upstream wrappers foreground Codex and
Claude Code, while the platform requires provider-neutral, self-hosted operation.

## Decision

`psdc-mobile` will use an immutable, verified MIT-licensed Happy
baseline as its mobile scaffold. React Native through Expo replaces Flutter as
the accepted mobile implementation default for this client.

The adopted architecture separates four replaceable parts:

1. the Happy-derived mobile UI;
2. an institution-controlled Commons Session Relay carrying end-to-end encrypted
   session payloads;
3. an Commons Session Host beside the authorized workspace and agent runtime; and
4. adapter-specific agent engines behind the shared Agent Session Contract.

The first feature set is encrypted pairing, session discovery and status, live
event continuity, permission requests, allow-once/deny decisions, opaque push
notifications, device handoff, reconnect cursors, plans, todos, diffs, and
artifact previews. The relay must not need transcript plaintext, workspace files,
model credentials, or unrestricted shell access.

Happy-hosted infrastructure, direct dependence on proprietary agent services,
plaintext server-side transcript search, public session sharing, telemetry, and
automatic privileged-action approval are excluded from the core.

## Alternatives

- **Happier:** evaluate selected multi-agent and self-hosting patterns as design
  evidence; do not silently substitute its rapidly changing alpha codebase.
- **Native React Native/Expo implementation:** long-term replacement path when
  downstream maintenance exceeds its budget.
- **Flutter:** remains an open alternative for a distinct future mobile product,
  but is no longer this client's default.

## Implementation gates

Before source import or public pilot:

1. pin an immutable Happy commit and record archive checksum, license inventory,
   dependency locks, SBOM, and imported file inventory;
2. review the cryptographic protocol, key lifecycle, account recovery, device
   revocation, replay protection, and metadata leakage;
3. prove self-hosted relay operation with all Happy-hosted endpoints disabled;
4. implement provider-neutral session adapters and route inference through the
   Commons AI Gateway;
5. complete iOS/Android accessibility, background, notification, deep-link, and
   signed-update tests; and
6. test lost device, compromised relay, offline queue, handoff race, and host
   disappearance scenarios.

## Consequences

The mobile product gains a tested interaction model while the shared protocol,
relay, identity, policy, and compute remain institution-controlled. Mobile is a
supervision surface, not a remote-shell bypass or a new source of provider lock-in.

## References

- [Happy repository](https://github.com/slopus/happy)
- [Happy MIT license](https://github.com/slopus/happy/blob/main/LICENSE)
- [Happier feature reference](https://github.com/happier-dev/happier)
