# Ecosystem Dependency Contract

> Status: Normative dependency contract; implementation evidence gated
> Purpose: Make runtime, build, feature, and external dependencies explicit

## Dependency classes

- **Foundation:** required for the production system to start or authenticate.
- **Capability:** required only for a named feature; the rest of the system works.
- **Asynchronous:** work can queue while the dependency is unavailable.
- **Development:** used to build/test; absent from production runtime.
- **External adapter:** outside the self-hosted core and always isolatable.
- **Federation peer:** another sovereign institution; trusted only for explicitly
  negotiated capabilities, scopes, data classes and time periods.

## Runtime dependency matrix

| Consumer | Dependency | Class | Contract | Required failure behavior |
|---|---|---|---|---|
| Web, desktop, and mobile clients | Institution deployment discovery | Foundation | Signed deployment manifest v1 | Reject unsigned, expired, or institution-mismatched configuration; retain only a previously verified manifest within its policy lifetime |
| Web, desktop, and mobile clients | Commons Cloud identity | Foundation | OIDC discovery, authorization code with PKCE, normalized claims | End the affected sign-in flow safely; never fall back to a vendor or global Commons account |
| Web, desktop, and mobile clients | Product APIs | Capability by route | OpenAPI, streaming, event and error profiles | Disable or degrade only the affected feature and display a traceable service state |
| All products | Commons Cloud identity | Foundation | OIDC/OAuth claims and scopes | Existing sessions follow policy; new login reports identity outage |
| Commons Cloud identity | College institutional IdP | External adapter; required for institutional production login | OIDC/OAuth adapter | Local/test environments continue; institutional login reports upstream outage |
| All products | Commons Cloud policy | Foundation or local cache | Versioned policy query/bundle | Fail closed for privileged actions; documented safe cache for low-risk reads |
| All products | Commons Cloud events | Asynchronous | CloudEvents/AsyncAPI | Durable local outbox and replay |
| All products | Commons Cloud telemetry | Asynchronous | OTLP | Bounded local buffering; product remains available |
| Commons AI Fabric | Local inference runtime | Foundation for AI requests | Provider adapter | Health-aware routing, queue, or explicit unavailable response |
| Commons AI Fabric | Commons Compute Fabric | Capability | Compute job/runtime contract | Fall back to dedicated local runtime or queue |
| Commons AI Fabric | External model provider | External adapter | Provider adapter | Disabled by default; never required for core operation |
| Commons AI Fabric | Brightspace | External adapter | Supported D2L/OAuth/LTI adapter | Academic features degrade; general AI remains available |
| Commons AI Fabric development/CI | Local academic provider | Development | Internal Academic Service contract and deterministic fixtures | Tests fail explicitly; no external LMS call |
| Commons AI Fabric | Media Fabric | Capability | Asset and job APIs | Text-only operation remains available |
| Commons AI Fabric | Fediverse | Capability | Internal publication API | Publication queues or fails explicitly; inference remains available |
| Media Fabric | Ceph object storage | Foundation | S3-compatible objects | Reject new writes safely; preserve metadata and retry |
| Media Fabric | Local media runtime | Foundation for processing | Runtime adapter | Queue jobs and surface capacity state |
| Media Fabric | Commons Compute Fabric | Capability | Compute jobs | Use local workers or queue |
| Media Fabric | Commons AI Fabric | Capability | AI Gateway | Skip/queue AI enrichment according to policy |
| Media Fabric | Fediverse | Capability | Publication API | Assets remain usable without federation |
| Fediverse | PostgreSQL/object storage | Foundation | Owned schema and S3-compatible media | Safe read-only or unavailable mode by failure type |
| Fediverse | Media Fabric | Capability | Asset/rendition references | Text posts remain available; media processing queues |
| Fediverse | Commons AI Fabric | Capability | AI Gateway | Moderation fallback policy; no silent safety bypass |
| Fediverse | Commons Compute Fabric | Asynchronous | Compute jobs | Queue background work |
| Commons Compute Fabric | Commons Cloud identity/PKI | Foundation in production | Device/workload identity | Reject untrusted enrollment and privileged jobs |
| Commons Compute Fabric | Commons Cloud events/telemetry | Asynchronous | CloudEvents/OTLP | Local durable state and replay |
| Commons Compute Fabric | Ceph object storage | Capability/Foundation by job | S3-compatible artifact refs | Do not start jobs lacking verified inputs; retry result upload |
| Any fabric | Institution deployment configuration | Foundation | Versioned neutral configuration schema | Reject invalid configuration; never infer another institution's values |
| Academic Service | Institution LMS | External adapter | Provider-neutral academic contract | Academic features degrade; core and other fabrics continue |
| Communications | Email/SMS/push channel | External adapter or capability | Notification delivery contract | Queue, retry, offer in-app delivery, or report unavailable by consent/policy |
| Local scheduler | Federation peer | Federation peer/capability | Capability, workload-envelope, artifact and ledger contracts | Continue locally, try the next permitted tier, queue, or fail explicitly |
| Social node | Fediverse peer | Federation peer/capability | ActivityPub/ActivityStreams | Local use continues; retry delivery and apply local moderation/block policy |

## Prohibited dependency cycles

- Commons Cloud cannot require Commons AI Fabric, Media Fabric, Fediverse, or Commons Compute Fabric to authenticate,
  route, observe, or recover core platform services.
- Commons Compute Fabric scheduling cannot call Commons AI Fabric to make mandatory placement decisions.
- Commons AI Fabric policy cannot require Fediverse or Media Fabric availability.
- Media storage cannot require a Fediverse database.
- Fediverse identity cannot silently become institutional identity.
- A federation peer cannot become a local identity, policy, secrets, LMS, database
  or infrastructure-state authority.
- A central Commons service cannot require unrestricted access to sovereign
  institution data in order to perform discovery, routing or accounting.
- A client cannot call model runtimes, institutional directories, LMS databases,
  social databases, worker agents, or storage backends directly.

Optional enrichment may call across these boundaries, but the fallback remains
deterministic and documented.

## Contract ownership

The producer owns availability and compatibility of its contract. The consumer
owns timeouts, retries, circuit breaking, fallback, queues, and user-visible
degradation. Both own contract tests and incident communication.

## Change process

1. Propose the contract change in the umbrella repository.
2. Identify producers, consumers, data classification, and failure behavior.
3. Add schema examples and compatibility tests.
4. Review security, privacy, operations, and open-source implications.
5. Version the contract and publish a migration window.
6. Upgrade consumers before removing old producer behavior.

## Federation dependency requirements

Every peer dependency declares institution identity, trust anchors, supported
contract versions, data and geographic envelope, workload/resource classes,
timeouts, retry and revocation, audit fields, incident contacts, reconciliation,
conformance evidence and exit/data-disposition behavior. Trust is denied by
default and cannot transitively spread from one peer to another.
