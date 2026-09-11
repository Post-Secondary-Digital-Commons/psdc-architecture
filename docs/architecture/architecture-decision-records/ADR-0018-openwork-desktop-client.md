# ADR-0018: OpenWork MIT Core Is the Desktop AI Client Foundation

> Status: Accepted
> Date: 2026-09-10
> Scope: PSDC desktop client
> Decision owner: Project founder; exact-source import requires legal and security review

## Context

The platform needs a Windows, macOS, and Linux desktop client with a workspace,
agent sessions, files, diffs, tools, and local execution. OpenWork provides an
active open-source desktop foundation, but its repository is directory-split:
the desktop application and core outside `ee/` are MIT, while `ee/` contains the
source-available OpenWork Den control plane and related enterprise services.

The Digital Commons cannot make a hosted control plane, vendor MCP endpoint,
provider account, or source-available component part of its required core.

## Decision

`psdc-desktop` will be scaffolded from an immutable, verified commit
of the MIT-licensed OpenWork core outside `ee/`. The current upstream uses a
React interface, Electron shell, and an OpenWork server; the exact pinned commit,
not this observation, determines the imported implementation.

The downstream client will:

- connect model traffic only through the Commons AI Gateway;
- use institutional identity and policy through platform contracts;
- keep provider credentials out of the client whenever the gateway can hold them;
- place OpenCode or another agent engine behind the Agent Session Contract;
- require explicit workspace grants and least-privilege local tool permissions;
- default privileged actions to ask, allow once, or deny—never auto-approve;
- remain usable without OpenWork Den, `api.openworklabs.com`, or any hosted
  OpenWork service;
- retain required MIT notices and record file-level provenance; and
- keep the desktop shell replaceable without changing gateway or session APIs.

No material under `ee/`, OpenWork EE License, hosted Den integration, hosted MCP
URL, inference control plane, or subscription-gated feature is eligible for the
open-source core. Similar functionality is built from platform primitives or an
independently reviewed OSI-licensed component.

## Alternatives

- **Tauri native client:** open alternative if OpenWork's Electron footprint,
  security model, accessibility, or maintainability fails the import gate.
- **Native web-derived shell:** longer-term option after the shared client and
  session contracts stabilize.
- **OpenWork EE/Den:** rejected from the core because it is not wholly OSI-licensed
  and introduces a vendor control-plane dependency.

## Implementation gates

Before source import or distribution:

1. resolve a release/tag to an immutable commit and archive its checksum;
2. prove that the import contains no `ee/` files or incompatible assets;
3. archive licenses, dependency locks, file inventory, and initial SBOM;
4. complete security review of Electron, local server, IPC, updater, keychain,
   workspace authorization, URL handling, and tool execution;
5. complete accessibility and signed-update/rollback tests;
6. define the AC Gateway and Agent Session adapter acceptance suite; and
7. name maintainers and a maximum downstream patch budget.

## Consequences

OpenWork accelerates the desktop experience without defining platform APIs. The
project accepts the cost of maintaining a constrained downstream and may move to
Tauri or a native client if the gate or patch budget fails.

## References

- [OpenWork repository](https://github.com/different-ai/openwork)
- [OpenWork MIT license for the core](https://github.com/different-ai/openwork/blob/dev/LICENSE)
- [OpenWork EE license](https://github.com/different-ai/openwork/blob/dev/ee/LICENSE)
