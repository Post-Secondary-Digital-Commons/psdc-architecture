# Cross-Pollination and Shared Capabilities

> Status: Normative interaction model; implementation gated
> Goal: Encourage reuse and collaboration without collapsing ownership boundaries

## Shared capability map

| Capability | Primary owner | Contributors/consumers | Cross-pollination outcome |
|---|---|---|---|
| Identity and scopes | Commons Cloud | Every ecosystem | One login and authorization vocabulary |
| Policy bundles | Commons Cloud + domain teams | AI, Commons Compute Fabric, Media, Fediverse | Shared engine; domain-owned rules |
| Compute jobs | Commons Compute Fabric | AI, Media, Fediverse, Cloud | One schedulable workload contract |
| AI inference and agents | Commons AI Fabric | Academic, Media, Fediverse, Cloud admin | Reusable intelligence behind one gateway |
| Media assets and provenance | Media Fabric | AI, Fediverse, academic clients | One asset identity and rendition pipeline |
| ActivityPub publication | Fediverse | Media and AI | One secure federation boundary |
| Spatial identity | Umbrella contract | Cloud, Commons Compute Fabric, AI, Media, Fediverse | Places/scenes connect without shared databases |
| Events and workflows | Commons Cloud | Every ecosystem | Portable asynchronous integration |
| Observability | Commons Cloud | Every ecosystem | End-to-end traces and shared operations |
| SDK and developer portal | Commons Cloud + product teams | Student developers | One discovery and access experience |
| Academic contracts | Umbrella contract team | AI, agents, clients, institution adapters | One provider-neutral academic vocabulary |
| Data classification and lineage | Domain data owners | Every fabric | Sovereign handling with portable manifests |
| Federation conformance | Consortium governance + contract team | Every participating institution | Interoperability without a central super-admin |
| Resource ledger | Federation governance | Compute, AI, Media, research and finance | Auditable contribution/use without exposing workload content |
| Communications contracts | Cloud + product teams | Academic, social, operations, agents | One consent-aware notification boundary |

## Joint product flows

### Spatial campus story

Commons Compute Fabric reports coarse resource locality; Media Fabric stores spatial captures and
scenes; Commons AI Fabric reasons over authorized campus/place context; Fediverse publishes
privacy-reduced place or event objects; Commons Cloud supplies shared place identifiers
and policy. Precise location never becomes a universal shared table.

### Accessible media story

Media Fabric produces renditions and provenance. Commons AI Fabric generates candidate
captions, transcripts, descriptions, and translations. Human or policy review
approves them. Fediverse publishes the approved accessible representation.

### Student project story

The developer portal issues least-privilege scopes. A student application uses AC
AI, submits a batch job to Commons Compute Fabric, stores a result through Media Fabric, and publishes
through Fediverse without receiving cluster, model-provider, storage, or federation
credentials.

### Research workflow

Researchers define a reproducible container and data manifest, Commons Compute Fabric schedules it,
Media Fabric stores outputs, AI supports analysis, and the platform records lineage,
usage, consent, retention, and publication policy.

### Operations workflow

All systems emit OpenTelemetry context and CloudEvents lifecycle events. Operators
can follow one request through gateway, policy, compute, storage, AI/media work, and
federation without forcing all services into one codebase.

### Cross-institution research story

A researcher publishes an approved data/model manifest and bounded workload
envelope. Local infrastructure is preferred; an approved federation peer may
execute the job without receiving the researcher's directory, private source data
or unrestricted credentials. Results return as signed, content-addressed
artifacts; usage reconciliation records resource classes rather than content.

### Academic-to-social story

An institution-authorized academic event can be transformed into an accessible
public event object only through explicit purpose, privacy and moderation checks.
The Academic Service remains the source of permitted facts, Media Fabric owns
renditions, AI suggests accessibility enrichment, and the Fediverse node owns the
public actor and ActivityPub delivery.

## Collaboration rules

- Share contracts, schemas, test fixtures, design tokens, threat patterns, and
  operational conventions through the umbrella repository.
- Keep domain code in the owning repository.
- Prefer an adapter over importing another subsystem's implementation.
- Create a joint ADR when a decision constrains two or more ecosystems.
- Assign one primary owner even when several teams contribute.
- A shared component must have a support and deprecation plan.
- Cross-pollination cannot expand a user's permissions or data purpose implicitly.
- Reuse tenant-neutral schemas and tests; institution branding and authority stay
  in deployment overlays.
- Federation follows the accepted locality ladder and workload envelope.

## Required cross-system reviews

Every integration is reviewed by the producer, consumer, security/privacy,
operations, and contract maintainers. Student-facing changes also require
accessibility and UX review; institutional data changes require the appropriate
College owner.
