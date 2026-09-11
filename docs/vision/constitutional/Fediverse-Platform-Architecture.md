# Fediverse Platform Architecture

> Status: Normative federation architecture; local moderation ratification is a deployment gate
> Domain: vision
> Owner: Commons Social Fabric architecture and trust/safety
> Last reviewed: 2026-09-10

## Purpose

Define the shared social-product and public-federation architecture for AC Social,
Photos, Video, Communities, Blogs, events, live media, and spatial attachments.

## Scope

- In scope: local actors, social products, ActivityPub/ActivityStreams,
  WebFinger/NodeInfo, inbox/outbox, delivery, discovery, media integration,
  moderation, abuse prevention, identity separation, and interoperability tests.
- Out of scope: independent federation implementations in each product or silent
  linking of public social identity to institutional records.
- Constraint: public federation follows security, privacy, moderation, support,
  media-proxy, and incident-readiness approval.

## Architecture

```text
social | photos | video | communities | blogs | events | live
                               |
       actors | search | notifications | moderation | media references
                               |
                 governed ActivityPub gateway
      discovery | signatures | inbox/outbox | delivery | peer policy
                               |
                      federated network
```

## Product and upstream posture

Mastodon, Pixelfed, PeerTube, Lemmy, WriteFreely, Owncast, and other mature
projects are evaluated as upstream products or interoperability peers. Use
configuration, extensions, shared services, and upstream contribution before
maintaining forks. No product creates a private variant of ActivityPub.

## Identity separation

Institutional SSO may authorize local access, but institutional and public social
identity are separate records and namespaces. Account linking is explicit,
revocable, least privilege, auditable, and does not disclose institutional roles
or activity by default.

## Shared media and spatial support

Commons Media and Spatial Fabric owns source assets, renditions, provenance, rights, and spatial
representations. Commons Social Fabric owns social publication, visibility, moderation, and
federated representation. Public objects use safe renditions and privacy-reduced
spatial metadata with capability-negotiated fallbacks.

## Federation controls

- actor/key verification and rotation;
- SSRF-resistant discovery and media retrieval;
- durable idempotent inbox/outbox processing;
- bounded retries, backpressure, and per-peer health;
- domain, actor, object, and content federation policy;
- reports, moderation, appeals, audit, and emergency blocking;
- rate limits, abuse detection, and privacy-preserving telemetry;
- interoperability suites for supported ActivityStreams profiles and extensions.

## Settled architecture constraints

- The platform creates distinctive value in orchestration, integration, policy, user experience, academic intelligence, student services, and campus-resource coordination while keeping its technology open-source.
- Mature standards and upstream implementations are adopted or extended before a new infrastructure primitive is proposed.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0008: Open-Source, Self-Hosted Core
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0014: Fediverse Social Fabric
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Decision status

- Decision: ActivityPub/ActivityStreams is the durable public social
  boundary; Mastodon, Pixelfed, PeerTube, Lemmy, WriteFreely and Owncast are
  replaceable open-source implementations.
- Implementation evidence gate: select exact releases, domain/actor policy, moderation staffing,
  legal/privacy controls, conformance evidence, SLOs and incident procedures.

## References

- [Full Technology Stack and Open-Source Alternatives](../14-Full-Technology-Stack-and-Open-Source-Alternatives.md)
- [Ecosystem Dependency Contract](../../architecture/Ecosystem-Dependency-Contract.md)
