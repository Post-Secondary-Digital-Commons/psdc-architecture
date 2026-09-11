# PSDC Web Foundation

> Status: Normative web foundation; implementation gated
> Owner: PSDC Web Working Group
> Decisions: ADR-0009 and ADR-0025

## Architectural identity

`psdc-web` is the neutral browser and PWA application. Each deployment supplies
its institution-approved product identity through configuration.

```text
PSDC Web
        |
Web client contract
        |
Commons AI Gateway
        |
identity | policy | models | knowledge | tools | academic services
```

The client does not know whether inference runs on a laptop, a dedicated cluster,
or Commons Compute Fabric. It does not call Entra, Brightspace, model servers, databases, or object
stores directly.

## Bootstrap decision

Begin from an immutable, verified copy of Open WebUI v0.6.5 because the desired
landing and conversation experience exists in its BSD-3-Clause code. Treat that
source as a possible foundation for PSDC Web, not as a moving upstream.

Current Open WebUI releases remain useful protocol-compatibility targets but are
not eligible source dependencies under ADR-0008. LibreChat remains the first
fallback candidate if legal, security, maintenance, or accessibility review rejects
the legacy baseline.

## Product evolution

The target navigation and experience encompasses:

- **Chat:** general conversations, files, tools, model aliases, and history;
- **Study:** courses, assignments, grounded study sessions, and faculty controls;
- **Work:** projects, documents, local tools, and governed agents;
- **Code:** repositories, development sessions, SDKs, and OpenCode handoff;
- **Campus:** schedule, events, clubs, notifications, and campus services.

Inherited generic components may remain where they meet requirements. Native
components replace them when an institution workflow, accessibility, security, or
maintenance case justifies the change.

## Source-provenance controls

Before import, create a provenance manifest containing:

| Field | Required value |
|---|---|
| Upstream | Canonical Open WebUI repository URL |
| Baseline | Exact v0.6.5 tag and immutable commit |
| Integrity | Archive and file checksums |
| License | Verified BSD-3-Clause text and applicable notices |
| Inventory | Imported, removed, and generated files |
| Dependencies | Lockfiles, license inventory, and initial SBOM |
| Approval | Legal, security, accessibility, and maintenance reviewers |

Maintain a `THIRD_PARTY_NOTICES` file and clear per-file provenance where needed.
Automated license checks must reject later Open WebUI license material.

## Maintenance model

The downstream Commons maintainers own dependency upgrades, vulnerability remediation, browser support,
accessibility improvements, tests, and feature development. Security fixes from
post-v0.6.5 Open WebUI are specifications to analyze and independently address,
not patches to copy without review.

## Exit conditions

Replace the baseline when its security debt, framework age, accessibility gap, or
maintenance cost exceeds the measured cost of another OSI-licensed client or a
fully native implementation. The gateway contract makes that replacement local to
`psdc-web`.
