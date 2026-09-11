# ADR-0025: Independent Web Client Repository

> Status: Accepted
> Date: 2026-09-11

## Context

The browser client was initially scoped inside `psdc-ai/apps/web`, while the
desktop and mobile clients had independent repositories. The embedded layout
mixed a user-facing product lifecycle with the AI service lifecycle and made
institution branding, accessibility review, browser security, and independent
release management harder to govern.

## Decision

The common browser client SHALL live in `psdc-web`. Each institution SHALL use a
thin fork, beginning with `algonquin-web`, for branding, issuer discovery,
institution policy, supported domain names, and release configuration.

The web client SHALL:

- communicate with platform services only through documented gateway contracts;
- use OIDC authorization-code flow with PKCE and secure same-site session cookies;
- avoid storing bearer tokens in browser persistent storage;
- meet WCAG 2.2 AA and support keyboard-only and assistive-technology operation;
- provide responsive Chat, Study, Work, Code, Campus, account, privacy, and
  administration experiences according to role;
- support installable progressive-web-app metadata without requiring installation;
- use institution-neutral packages and keep institution branding in the fork;
- preserve Open WebUI provenance constraints if the approved historical baseline
  is imported; no upstream source is imported merely by creating the repository;
- release independently from `psdc-ai`, `psdc-desktop`, and `psdc-mobile`.

The former `psdc-ai/apps/web` path SHALL contain only a migration notice after
the documentation is moved. AI services SHALL NOT contain browser-client source.

## Interfaces

`psdc-web` consumes the AI gateway, identity discovery, academic, files,
notifications, media, social, and action-gateway APIs. It owns no authoritative
institutional data and accesses no inference engine, database, object store,
learning-management system, or federation server directly.

## Consequences

- Browser release and security policy can evolve independently.
- Common and institution-specific concerns have the same fork model as desktop
  and mobile.
- Two repositories are added to the ecosystem inventory.
- Shared API contracts remain owned by their domain repositories rather than by
  the web client.
