# Post-Secondary Digital Commons — Consolidated Architecture

> Status: Normative architecture; implementation gated
> Owner: Platform architecture
> Governing decisions: ADR-0001 through ADR-0025

## Commons system model

```text
       Post-Secondary Digital Commons
 institution experience | reusable neutral core | federation
                              |
        Algonquin reference deployment and future peers
                              |
                  Commons Cloud Fabric
 identity | policy | APIs | events | data | storage | observability
                              |
         +--------------------+---------------------+
         |                    |                     |
 Commons Compute     Commons AI Fabric    Commons Media and Spatial
      Fabric          models/agents/study    image/video/3D/4DGS
         |                    |                     |
         +--------------------+---------------------+
                              |
                  Commons Social Fabric
       social | photos | video | communities | blogs
                              |
                    ActivityPub federation
```

The platform is the tenant-neutral Post-Secondary Digital Commons. Algonquin is the
first sovereign reference deployment; institution-specific identity, LMS,
branding, data and policy live in its deployment overlay. The umbrella repository owns constitutional architecture, shared contracts,
cross-system dependency rules, decision records, and the human decision register.
It is not a runtime service.

## Ecosystem responsibilities

### Commons Cloud Fabric

Provides self-hosted identity brokering, service and workload identity, ingress,
service discovery, policy evaluation, events, secrets, certificates, databases,
object storage, observability, registry, GitOps, and common operational tooling.
It must not absorb AI, scheduling, media, or social-product business logic.

### Commons Compute Fabric

Coordinates authorized dedicated and opportunistic compute. It owns node
enrollment, attestation, capabilities, campus topology, trust, idle policy,
scheduling, preemption, accounting, caches, and runtime adapters. It does not
invent model serving or container runtimes.

### Commons AI Fabric

Owns the AI gateway, OpenAI-compatible and native APIs, model aliases, routing,
policy integration, inference adapters, knowledge/RAG, academic capabilities,
agents, tools, and evaluations. It exposes product APIs but does not own the
browser, desktop, or mobile product repositories. No client bypasses the gateway.

### Client products

`psdc-web`, `psdc-desktop`, and `psdc-mobile` own the common browser/PWA,
desktop, and mobile experiences respectively. Each consumes versioned APIs and
identity discovery through its institution-signed deployment manifest. Each
institution maintains a thin, independently releasable fork—such as
`algonquin-web`—for branding, distribution, approved endpoints, and local policy.
Clients never own model routing, institutional identity, LMS records, social
state, or another service's database.

### Commons Media and Spatial Fabric

Owns media identity, manifests, provenance, rights, moderation, transformation,
spatial/4DGS representations, processing orchestration, renditions, and delivery.
Binary assets remain in object storage, not Git or social databases.

### Commons Social Fabric

Owns social actors, posts, communities, blogs, local timelines, moderation,
notifications, and the only public ActivityPub boundary. It references Media
Fabric assets and may request AI capabilities, but it remains functional for text
social use when either optional system is unavailable.

## Extended Commons fabrics

The five implementation repositories remain the immediate delivery units. The
expanded architecture also recognizes Academic, Data, Developer, Communications,
and Research and Innovation as logical fabrics. They compose existing services
and umbrella contracts until independent ownership or deployment evidence
justifies a new repository or runtime boundary.

| Logical fabric | Durable boundary |
|---|---|
| Academic | Provider-neutral course, enrolment, content and assessment contracts |
| Data | Classification, sovereignty, lineage, catalogs and authorized exchange |
| Developer | Forge, CI, registry, SDKs, templates, sandbox and service discovery |
| Communications | Notification/message contracts and optional channel adapters |
| Research and innovation | Reproducible environments, manifests, grants and publication lineage |

## Shared planes

| Plane | Canonical owner | Required behavior |
|---|---|---|
| Identity | Commons Cloud Fabric/Keycloak | OIDC/OAuth; institution-authoritative IdP adapter in production, local/test provider elsewhere |
| Policy | Commons Cloud Fabric plus domain policy owners | OPA-compatible evaluation and versioned policy |
| Events | Commons Cloud Fabric | CloudEvents envelope, AsyncAPI, schema compatibility |
| Data | Each service | Service-owned PostgreSQL schemas; no cross-service SQL |
| Objects | Commons Cloud Fabric/Ceph | S3-compatible references, checksums, lifecycle, retention |
| Secrets | Commons Cloud Fabric/OpenBao | Short-lived access, rotation, audit, no repository secrets |
| Observability | Commons Cloud Fabric/OpenTelemetry | Shared trace context and exportable telemetry |
| Spatial | Umbrella contract; domain implementations | Shared identifiers, provenance, precision, privacy |
| Federation | Commons Social Fabric | ActivityPub policy, delivery, verification, and abuse controls |
| Compute | Commons Compute Fabric | Capability-based jobs and lifecycle events |
| Academic | Umbrella contract plus institution adapter | Provider-neutral academic resources; Brightspace authoritative only for institution production |
| Federation trust | Each institution plus consortium governance | Bilateral/consortium profiles, revocation and conformance; no global super-admin |
| Client discovery | Client product repositories plus institution deployment overlay | Signed deployment manifest, OIDC discovery, API origins, feature policy, branding and support metadata |

## Core end-to-end flows

### AI inference

Web/desktop/mobile/CLI client → institution deployment discovery → OIDC → Commons Cloud edge → Commons AI policy/routing → local runtime or Commons Compute Fabric →
streamed response → usage and OpenTelemetry events.

### Media generation and publication

Client → Media API → policy/provenance → local or Commons Compute processing → Ceph object →
approved rendition → Fediverse publication request → ActivityPub delivery.

### Federated content enrichment

Fediverse receives and verifies an activity → moderation/policy → optional AI
classification or accessibility description → optional Media normalization →
local timeline and search. If optional enrichment is unavailable, policy decides
whether to publish without enrichment, queue, or quarantine.

### Academic assistance

Institution-approved LMS adapter → internal Academic Service contract → user-authorized Commons AI
knowledge context → gateway inference → response with source attribution. Core AI
does not scrape Brightspace or require it for non-academic use.

### Cross-institution capability placement

A workload is evaluated against its explicit envelope and placed on the user's
device, dedicated institution infrastructure, campus fabric, regional federation,
Ontario federation, Canadian federation, Canadian commercial provider, or a
global/external provider in that order. If no permitted location is available,
the platform queues, degrades, or fails; it never widens data or trust policy
silently.

## Architecture invariants

1. Everything needed for core operation is open source and self-hostable; OpenTofu is the IaC default.
2. External vendors are optional adapters or explicitly approved exceptions.
3. Shared contracts are implementation-neutral and versioned.
4. No repository imports another repository's private code or reads its database.
5. Optional dependencies define timeout, fallback, queue, recovery, and user UX.
6. Public federation never bypasses Fediverse moderation and security.
7. Precise private spatial data does not cross boundaries by default.
8. Model and media binaries stay outside Git.
9. Human approval remains explicit for high-consequence agent actions.
10. Every production dependency has an owner, SLO, backup, upgrade, and exit plan.
11. Commons core schemas and code use institution-neutral names and configuration.
12. Each institution keeps sovereign identity, academic, data, compute, policy,
    moderation, keys, state and operational authority.
13. Federation exchanges approved capabilities and references, not unrestricted
    raw directories, LMS databases, private vector stores, secrets or precise location.
14. Web, desktop, and mobile remain independent products with separate release
    trains; they share contracts and design tokens rather than private source imports.
