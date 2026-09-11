# Federated Commons Naming and Sovereignty

> Status: Accepted
> Governing decision: ADR-0020

## Canonical names

| Shared/Federated concept | Canonical name | Algonquin deployment name |
|---|---|---|
| Complete framework | Post-Secondary Digital Commons (PSDC) | Algonquin Digital Platform |
| Shared service foundation | Commons Cloud Fabric | AC Cloud |
| Compute orchestration | Commons Compute Fabric | ACF Campus Compute Fabric |
| AI and agent services | Commons AI Fabric | AC AI |
| Media and spatial services | Commons Media and Spatial Fabric | AC Media Fabric |
| Social products and ActivityPub edge | Commons Social Fabric | AC Fediverse |

Shared schemas, API names, package namespaces, deployment variables and user-facing
defaults must be institution-neutral. Algonquin names may appear in the Algonquin
overlay, deployment documentation, examples explicitly labelled as Algonquin, and
current repository paths retained for migration compatibility.

## Standalone requirement

Every institution deployment must be installable, operable, backed up, restored,
upgraded and exited without an Algonquin account, network connection, control
plane, signing key, DNS zone, identity provider, database, relay or administrator.

The deployment owns its:

- source/configuration fork and release cadence;
- identity, academic adapters and public domains;
- policies, data, keys, secrets, models and infrastructure state;
- client branding, signing and distribution;
- social moderation and federation relationships;
- compute admission and resource-sharing rules; and
- observability, backups, incidents, continuity and exit plan.

## Federation relationship

Peers exchange only capabilities and objects covered by a mutually enabled
protocol profile. Federation cannot grant administrative access or silently
widen data residency, retention, identity, academic, compute or moderation policy.
Removing every peer connection leaves all local capabilities operational.

## Club and institution roles

The local club is the open technical community and steward of its distribution.
It may develop integrations, operate approved non-production environments, train
contributors and propose federation peers. The institution authorizes production
systems and remains the accountable data, security and service authority.

## Conformance, not uniformity

Institutions may replace the default database, client, runtime, scheduler, social
server or deployment mechanism. A peer is compatible when its enabled protocol
versions, security profile, object semantics, failure behavior and revocation
mechanisms pass the shared conformance suite. Identical internal stacks are not
required.

