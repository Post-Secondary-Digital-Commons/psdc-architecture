# ADR-0020: Post-Secondary Digital Commons Is the Shared Platform Name

> Status: Accepted
> Date: 2026-09-10
> Scope: Shared architecture, software, contracts, documentation and federation
> Decision owner: Project founder

## Context

The reusable platform is intended for independently governed post-secondary
institutions. Naming shared software or architecture after Algonquin incorrectly
implies that Algonquin is a central operator, tenant host, identity authority or
owner of peer deployments.

The shared name must communicate the post-secondary commons without implying a
central federation operator. Federation remains a capability and operating
model, not part of the product name.

## Decision

The canonical shared platform name is **Post-Secondary Digital Commons**,
abbreviated **PSDC** where an acronym is useful.

- PSDC names shared architecture, protocols, contracts, schemas, reference
  software, conformance tests and federation profiles.
- Each post-secondary institution operates a complete standalone **institution
  deployment** under its own authority, branding and technology selections.
- **Algonquin Digital Platform** and the `AC` product names refer only to the
  Algonquin reference deployment and its deployment overlay.
- Shared component names are Commons Cloud Fabric, Commons Compute Fabric,
  Commons AI Fabric, Commons Media and Spatial Fabric, and Commons Social Fabric.
- Shared repositories use the neutral `psdc-*` prefix. `algonquin-*` names are
  reserved for Algonquin's institution-owned forks and deployment overlay.
- Federation is optional, explicitly trusted, revocable and incapable of
  becoming a peer's local identity, policy, data or infrastructure authority.

Algonquin maintains the first reference implementation and demonstrates a
conforming deployment. It does not operate a mandatory global control plane.

## Governance model

Local clubs may steward development, community governance, education and
deployment proposals. The institution remains accountable for production
identity, student data, keys, infrastructure, policy, moderation, compliance,
service continuity and risk acceptance.

## Consequences

- Documentation must use PSDC for shared material and reserve Algonquin naming
  for an explicitly labelled deployment example or overlay.
- Institution branding and component choice can differ without breaking
  federation, provided the selected protocol profiles pass conformance tests.
- A disconnected institution continues operating its local platform.
