# ADR-0008: Open-Source, Self-Hosted Core

> Status: Accepted
> Date: 2026-09-10
> Scope: Entire Algonquin Digital Platform
> Decision owner: Project founder; institutional ratification still required

## Context

The platform must remain operable, inspectable, teachable, and migratable without
paying for or depending on an external vendor's hosted control plane, proprietary
cloud API, closed database, license server, or SaaS-only feature.

Algonquin may still need to interoperate with institutional systems such as Entra
or Brightspace. Those integrations must remain boundary adapters rather than
foundational runtime dependencies.

## Decision

The core platform uses software distributed under an OSI-approved open-source
license and capable of being deployed on infrastructure controlled by Algonquin.

Core operation must not require:

- an external SaaS account or hosted control plane;
- a proprietary cloud provider API;
- a paid enterprise edition for security, high availability, backup, SSO, audit,
  or basic operations;
- a remote license check or mandatory telemetry service;
- a proprietary data format without an open export and migration path;
- credentials held by an outside vendor.

Every component must have local deployment documentation, reproducible
configuration, documented data ownership, backup/restore, monitoring, upgrade,
rollback, and replacement procedures.

## External boundary adapters

Entra, Brightspace, email/SMS carriers, public federation peers, or other
institutional/external services may be integrated only through optional adapters.
The owning document must define:

- what capability becomes unavailable when the external system is down;
- a local development and test substitute;
- the minimum data and permissions crossing the boundary;
- disablement, migration, and credential-revocation procedures;
- whether institutional policy makes the adapter mandatory for a particular
  production deployment.

The platform core must continue operating when an optional adapter is disabled.
This portability rule does not authorize local/test providers as alternate
production authorities: production institutional login and academic data use
College-approved providers as defined by ADR-0010.

## Exceptions

Hardware firmware, accelerator drivers, regulatory services, or institutionally
mandated systems may make a fully open stack impossible in a specific deployment.
An exception requires its own ADR, named owner, affected capability, risk,
containment boundary, open alternative analysis, exit plan, and review date.

## Consequences

- Procurement and convenience do not override portability.
- “Source available” is not treated as open source.
- License and dependency scans become release gates.
- Obsidian may be used as an optional editor, but standard Markdown and ordinary
  relative links remain the documentation source format.
- The project must invest in operating its own infrastructure and developing
  internal skills rather than outsourcing control.
