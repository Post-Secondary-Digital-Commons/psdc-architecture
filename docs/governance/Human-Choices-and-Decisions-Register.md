# Human Choices and Decisions Register

> Status: Normative decision register; all project-controlled defaults accepted
> Owner: Platform governance
> Last updated: 2026-09-11
> Purpose: Consolidate decisions that cannot be safely inferred or delegated to
> software, an AI agent, a vendor, or an individual contributor

## How to use this register

Each choice needs one accountable decision owner, consulted reviewers, evidence,
a decision date, and an ADR or policy link when consequential. On 2026-09-10 the
project founder accepted every listed default as the working project baseline
through ADR-0016 and reconfirmed all project-controlled defaults on 2026-09-11.

Acceptance sets direction; it does not fabricate measured quantities, appoint an
external institution owner, complete implementation, or grant legal, consortium,
institutional or government approval. Where a default says “evaluate,” “define,”
or “select after evidence,” the selection method, preference and rejection
criteria are decided. The later result is implementation evidence, not an open
architecture choice.

There are no unaccepted project-controlled defaults in this register. Changes to
them require an ADR. External approvals and measured site values remain mandatory
release evidence under the authority named in each row.

Decision states:

- **Accepted:** explicitly decided and recorded.
- **Proposed:** recommended but still needs the named human authority.
- **Open:** alternatives and evidence must be developed.
- **Blocked:** external authority or evidence is required.
- **Deferred:** intentionally postponed until its gate approaches.

## Already accepted constitutional choices

| ID | Accepted choice | Record |
|---|---|---|
| A-001 | Standards first; adopt → extend → compatible fork → build | ADR-0001 |
| A-002 | Institutional identity integrates through OIDC/OAuth; no separate AI passwords | ADR-0002, modified by A-008 |
| A-003 | Commons AI Fabric exposes OpenAI-compatible and native Commons API boundaries | ADR-0003 |
| A-004 | Commons Compute Fabric is runtime-agnostic and owns campus orchestration | ADR-0004 |
| A-005 | APIs, events, OCI artifacts, storage, data and telemetry use standard primitives | ADR-0005 |
| A-006 | Adopted products remain thin, upstream-compatible forks/extensions | ADR-0006 |
| A-007 | Brightspace uses supported D2L mechanisms; no scraping | ADR-0007 |
| A-008 | The core is open-source and self-hosted with no mandatory outside vendor | ADR-0008 |
| A-009 | PSDC Web uses `psdc-web` and prefers the frozen Open WebUI v0.6.5 BSD baseline as gated scaffolding | ADR-0009 |
| A-010 | The core is provider-neutral while College-approved systems remain authoritative in production | ADR-0010 |
| A-011 | Superseded Terraform preference retained only as decision history | ADR-0011, superseded by ADR-0017 |
| A-012 | The reusable architecture is a tenant-neutral Post-Secondary Digital Commons; Algonquin is its first deployment | ADR-0012 |
| A-013 | Use institution resources first, post-secondary federation second, Canadian commercial capacity third and hyperscalers last | ADR-0013 |
| A-014 | The Social Fabric is Fediverse- and ActivityPub-based | ADR-0014 |
| A-015 | Model funding at CA$30 per participating student per enrolled month | ADR-0015 |
| A-016 | Every register default is accepted as the working project baseline | ADR-0016 |
| A-017 | OpenTofu + Ansible is the IaC default; Terraform is not a default or standing exception | ADR-0017 |
| A-018 | PSDC Desktop uses the verified OpenWork MIT core outside `ee/`; Den and hosted services are excluded | ADR-0018 |
| A-019 | PSDC Mobile uses the verified Happy MIT Expo baseline with an institution-controlled E2EE relay | ADR-0019 |
| A-020 | Post-Secondary Digital Commons is the shared platform name; Algonquin names only its reference deployment | ADR-0020 |
| A-021 | Shared clients are institution-branded, signed and authenticated; no upstream-vendor or global Commons account is required | ADR-0021 |
| A-022 | Use independent repositories per fabric, client and institution deployment; allow Happy-style package workspaces only inside one cohesive product | ADR-0022 |
| A-023 | Commons and institution code live in separate GitHub organizations; each institution repository is a thin fork of its Commons counterpart | ADR-0023 |
| A-024 | New PSDC-authored material defaults to Apache-2.0 with upstream-first institutional and commercial contribution policy | ADR-0024 |
| A-025 | The browser and PWA product is an independent `psdc-web` repository with a thin institution fork, beginning with `algonquin-web` | ADR-0025 |

## 1. Mission, governance, and institutional ownership

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| GOV-001 | Final platform mission and measurable outcomes | Open engineering and student-service platform, not a Copilot replacement | Founders + faculty advisor + institutional sponsor | Before public proposal |
| GOV-002 | Legal/project owner before College adoption | Student-governed project with explicit contributor agreement | Club governance | Before external contributions |
| GOV-003 | Production service owner | College unit owns production identity, infrastructure, secrets and continuity | ITS/institutional executive | Before institutional pilot |
| GOV-004 | Club versus institutional decision rights | Club owns roadmap proposals; College owns production risk acceptance | Club + College sponsor | Before pilot |
| GOV-005 | Service RACI for every ecosystem | One accountable owner per service and contract | Program steering group | Before implementation |
| GOV-006 | Repository model | Polyrepo by bounded product; a workspace/vault repository coordinates checkouts but contains no product source | Architecture council | Accepted by ADR-0022; verify migration before retiring source checkout |
| GOV-007 | Naming, domains and trademarks | Institution deployment names, domains and marks require local approval | College communications/legal | Before public branding |
| GOV-008 | Code and documentation license | Apache-2.0 for new PSDC-authored code, configuration and documentation; imported material retains its original approved license | Governance + legal | Accepted by ADR-0024; legal review before first public release |
| GOV-009 | Contribution governance and code of conduct | Public, documented, student-accessible process | Club governance | Before public repository |
| GOV-010 | Funding and budget authority | Transparent annual infrastructure and operations budget | Sponsor + finance owner | Before procurement |
| GOV-011 | Data stewards by domain | Named steward for identity, academic, media, social and telemetry data | Institutional owners | Before real data |
| GOV-012 | Architecture council composition and quorum | Students, faculty, ITS, security/privacy, accessibility and operations | Institutional sponsor | Before accepting major ADRs |
| GOV-013 | Conflict-of-interest and vendor-gift policy | Mandatory disclosure; no vendor-driven architecture | Governance + procurement | Before vendor contact |
| GOV-014 | Project sunset and data-disposition authority | College-approved exit plan for every production service | Service owner + privacy | Before production |
| GOV-015 | Institution deployment sovereignty | Every post-secondary can operate, upgrade, restore and exit independently; local clubs steward while institutions retain production authority | Each institution + local club | Normative decision; local operating agreement before production |

## 2. Open-source policy and supply chain

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| OSS-001 | Definition of acceptable open source | OSI-approved license and fully self-hostable required edition | Architecture + legal | Accepted by ADR-0008 |
| OSS-002 | Permitted-license allowlist | Approve permissive and copyleft families explicitly | Legal + open-source reviewers | Before dependency automation |
| OSS-003 | Copyleft use in services, clients and libraries | Evaluate distribution/network-copyleft implications by artifact | Legal + maintainers | Before selection |
| OSS-004 | Open-core products | Reject when required HA/security/operations are closed | Architecture council | Before selection |
| OSS-005 | Proprietary hardware drivers or firmware | Prefer open drivers; require exception ADR where unavoidable | Infrastructure + security | Before hardware purchase |
| OSS-006 | External SaaS exception process | No core SaaS; time-bounded exception with export and exit plan | Architecture + service owner | Before connection |
| OSS-007 | Fork patch budget | Set maximum downstream patches and sync target per product | Product owner + maintainers | Before first fork |
| OSS-008 | Upstream contribution policy | Upstream generally useful work by default | Open-source governance | Before first fork |
| OSS-009 | Supported version policy | Pin supported releases; scheduled upgrades and EOL response | Operations + security | Before deployment |
| OSS-010 | SBOM and dependency-signing standards | Generate SBOMs and sign all release artifacts | Security + release engineering | Before releases |
| OSS-011 | Community-health threshold | Define maintainer activity, security response and bus-factor minimums | Architecture council | Before adoption |
| OSS-012 | Obsidian's role despite being proprietary | Optional editor only; Markdown/Git remain canonical | Documentation maintainers | Accepted by ADR-0008 |
| OSS-013 | Source-available IaC exception | No standing exception; OpenTofu is the MPL-2.0 default | Legal + infrastructure | ADR-0011 superseded by ADR-0017 |

## 3. Platform architecture and contracts

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| ARC-001 | Initial modularity | Modular monoliths per domain before microservice extraction | Architecture council | Before code scaffold |
| ARC-002 | Synchronous API style | REST/OpenAPI by default; gRPC only with measured need | Contract maintainers | Before API implementation |
| ARC-003 | Event broker | NATS JetStream; Apache Pulsar/Kafka are scale-driven alternatives | Cloud + operations | Accepted default; exact release before evented workflows |
| ARC-004 | Workflow engine | Temporal Community; Argo Workflows for Kubernetes batch semantics | Platform + operations | Accepted default; exact release before durable workflows |
| ARC-005 | Contract source format | OpenAPI, AsyncAPI, Protobuf and JSON Schema by interface type | Contract maintainers | Before SDK generation |
| ARC-006 | API/versioning policy | Compatibility windows and additive evolution first | Architecture council | Before v1 API |
| ARC-007 | Error, pagination and idempotency conventions | One cross-platform profile | Contract maintainers | Before public API |
| ARC-008 | Event ordering and delivery semantics | At-least-once with idempotent consumers unless justified | Architecture + consumers | Before event bus |
| ARC-009 | Tenant/project/resource hierarchy | Organization → project → environment → resource | Governance + platform | Before authorization model |
| ARC-010 | Region, zone and failure-domain model | Start with one region and explicit zones | Infrastructure + SRE | Before HA design |
| ARC-011 | Spatial identifier and coordinate model | Open identifiers with CRS, precision, time, provenance and privacy | Spatial working group | Before spatial data |
| ARC-012 | Shared schema registry ownership | Umbrella contract team | Architecture council | Before cross-system events |
| ARC-013 | Cross-repository release compatibility | Publish support matrix and contract tests | Release engineering | Before independent releases |
| ARC-014 | Public versus private API boundary | Explicit allowlist; internal APIs never accidentally exposed | Security + service owners | Before ingress |
| ARC-015 | Data ownership | One owning service; no cross-service database reads | Architecture council | Accepted principle; enforce before code |
| ARC-016 | Reusable platform identity | Tenant-neutral Post Secondary Digital Commons with thin institution deployment overlays | Architecture council | Accepted by ADR-0012 |
| ARC-017 | Federation locality order | Institution → regional/provincial/Canadian federation → Canadian provider → hyperscaler | Architecture + policy | Accepted by ADR-0013 |
| ARC-018 | Cross-fabric federation model | Federate permitted capabilities/services, never one shared trust or data domain | Federation governance | Before federation contracts |
| ARC-019 | Neutral resource naming | Institution, Tenant, Subject, Course, ComputeProvider/Node/Cell and Federation | Contract maintainers | Before v1 schemas |

## 4. Commons Cloud and core infrastructure

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| CLD-001 | Host Linux distribution | Debian | Infrastructure team | Before provisioning |
| CLD-002 | Private-cloud scope | Start Kubernetes-first; add required OpenStack services only for VM/bare-metal demand | Architecture + infrastructure | Before Phase 1 hardware |
| CLD-003 | OpenStack deployment method | Evaluate Kolla-Ansible versus OpenStack-Ansible | Infrastructure + SRE | Before OpenStack pilot |
| CLD-004 | Kubernetes distribution | RKE2 for managed production; K3s for edge/development | Infrastructure + security | Accepted default; validate before cluster build |
| CLD-005 | CNI | Cilium; Calico is the open exit path | Network + security | Accepted default; validate against campus networking |
| CLD-006 | Ingress/API gateway | Envoy Gateway; Traefik/ingress-nginx are alternatives | Platform + security | Accepted default; threat/performance test before public APIs |
| CLD-007 | Bare-metal load balancer | MetalLB; PureLB is the open alternative | Network team | Accepted default; validate before HA ingress |
| CLD-008 | Ceph topology and failure domains | Dedicated storage nodes when production begins | Storage + SRE | Before persistent pilot data |
| CLD-009 | PostgreSQL HA operator/topology | Select open operator or native automation after recovery test | Data + SRE | Before production DB |
| CLD-010 | Valkey topology | Sentinel versus Cluster based on workload | Data + SRE | Before distributed cache |
| CLD-011 | Object namespace and lifecycle | One S3-compatible naming, retention and ownership standard | Storage + governance | Before asset storage |
| CLD-012 | Secrets system | OpenBao | Security + operations | Before real secrets |
| CLD-013 | Policy engine | Open Policy Agent | Security + policy owners | Before authorization enforcement |
| CLD-014 | Internal PKI | step-ca/cert-manager integration and trust hierarchy | Security + ITS | Before mTLS |
| CLD-015 | Git forge | Forgejo | Developer platform team | Before self-hosted migration |
| CLD-016 | OCI registry | Harbor | Release engineering + security | Before container releases |
| CLD-017 | CI engine | Woodpecker CI for the first slice; Tekton for justified Kubernetes-native pipelines | Developer platform + operators | Accepted default; exact release before automated builds |
| CLD-018 | GitOps engine | Argo CD; Flux is the open exit path | Platform + SRE | Accepted default; exact release before shared environments |
| CLD-019 | IaC tools and module policy | OpenTofu + Ansible; OSI-licensed providers/modules preferred | Infrastructure team + legal | Accepted by ADR-0017; concrete backend before reproducible environment |
| CLD-020 | Search service | OpenSearch only when PostgreSQL search is insufficient | Data architecture | Before adding search cluster |

## 5. Identity, privacy, and institutional adapters

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| ID-001 | Self-hosted identity broker | Keycloak for brokering and normalization, not institutional authority | Security + identity team | Before user auth |
| ID-002 | Entra integration | Expected College-approved production upstream through OIDC/OAuth | ITS identity owner | Architecture accepted; configuration before institutional pilot |
| ID-003 | Local development identity | Keycloak test realm with synthetic identities; never production student accounts | Security + developers | Architecture accepted; fixtures before auth development |
| ID-004 | Institutional/public social identity linking | Explicit opt-in, revocable, minimal linkage | Privacy + Fediverse governance | Before account linking |
| ID-005 | Role versus attribute model | Coarse RBAC plus policy attributes/scopes | Security + domain owners | Before access control |
| ID-006 | Student/faculty/staff/guest claim mapping | Map only institution-approved claims | ITS + privacy | Before SSO launch |
| ID-007 | MFA policy | Institutional MFA for privileged and institutional access | Security + ITS | Before pilot |
| ID-008 | Session and refresh-token lifetimes | Risk-tiered; short privileged sessions | Security | Before login release |
| ID-009 | Service/workload identity | Short-lived certificates or tokens, no shared static keys | Security + platform | Before service deployment |
| ID-010 | Device identity and attestation | Separate Commons Compute Fabric and client-device profiles | Security + Commons Compute Fabric | Before worker enrollment |
| ID-011 | SCIM provisioning | Use only if institution supports required lifecycle safely | ITS + identity team | Before automated provisioning |
| ID-012 | Guest/affiliate access | Deny by default until sponsor and expiry model exists | Governance + security | Before external users |
| PRIV-001 | Data classification taxonomy | College taxonomy mapped to platform enforcement | Privacy/security + records | Before real data |
| PRIV-002 | Default retention by data class | Minimize and delete automatically | Privacy + service owners | Before persistence |
| PRIV-003 | Consent and withdrawal UX | Granular, understandable and auditable | Privacy + UX | Before personalization |
| PRIV-004 | Precise spatial data policy | Private and reduced precision by default | Privacy + spatial group | Before location features |

## 6. Commons AI Fabric

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| AI-001 | Gateway implementation language/framework | Python + FastAPI for the MVP; Go only after measured data-plane pressure | AI platform team | Accepted default; exact release before coding |
| AI-002 | OpenAI compatibility profile | Publish exact supported endpoints, fields, streaming and errors | AI architecture | Before client integration |
| AI-003 | Native Commons API v1 scope | Identity, usage, projects, policies and tools first | Product + AI architecture | Before API lock |
| AI-004 | Initial inference engines | vLLM production; SGLang alternative; llama.cpp local/edge | AI/ML + infrastructure | Accepted default; exact releases before model pilot |
| AI-005 | Initial model aliases | AC Fast, General, Reasoning and Code | AI governance | Before user pilot |
| AI-006 | Models behind aliases | Select by open license, evaluation, hardware, safety and cost | Model review board | Before each release |
| AI-007 | Acceptable model licenses | Define redistribution, use and derivative-weight rules | Legal + AI governance | Before model download |
| AI-008 | Local-only versus local-preferred routing policy | Default local-preferred; sensitive classes local-only | Privacy + AI policy | Before second backend |
| AI-009 | Proprietary cloud inference | Disabled; exception only through ADR-0008 process | Architecture council | Accepted default |
| AI-010 | User/course/research quotas | Evidence-based and transparent | Product + capacity owner | Before broad pilot |
| AI-011 | Prompt/response storage | Off or minimized by default; explicit feature-specific purpose | Privacy + AI owners | Before logging content |
| AI-012 | Model telemetry granularity | Operational metadata without prompt content by default | Privacy + SRE | Before observability |
| AI-013 | RAG architecture | PostgreSQL/pgvector first; separate engine after measured need | AI/ML + data | Before knowledge service |
| AI-014 | Retrieval source and citation policy | Authorized sources, provenance and user-visible citations | Academic + AI governance | Before RAG pilot |
| AI-015 | Evaluation framework and release thresholds | Task, safety, fairness, latency and resource benchmarks | Model review board | Before alias changes |
| AI-016 | Tool registry governance | Reviewed schemas, scopes, risk and owner for every tool | Security + product | Before agents |
| AI-017 | Agent confirmation levels | Read, propose, confirm, execute tiers | Product + security + UX | Before action tools |
| AI-018 | Agent memory | User-controlled, scoped, inspectable and deletable | Privacy + product | Before persistent memory |
| AI-019 | Prompt/system-policy versioning | Versioned, reviewed and rollbackable | AI governance | Before production prompts |
| AI-020 | Academic integrity behavior | Align with College assessment policy and faculty controls | Academic governance | Before course use |
| AI-021 | Web AI client basis | `psdc-web`, bootstrapped from verified Open WebUI v0.6.5 BSD source and evolved natively | Project founder + architecture | Accepted by ADR-0009 |
| AI-022 | Exact web baseline provenance | Pin verified tag/commit, checksums, file inventory, notices, lockfiles and SBOM | Legal + security + open-source review | Before source import |
| AI-023 | Legacy web maintenance ownership | Name maintainers and security/accessibility backport targets | AI client owner + security + accessibility | Before source import |
| AI-024 | Post-v0.6.5 contamination control | Automated license gate plus manual review; no casual copy, merge or cherry-pick | Open-source review + release engineering | Before repository history begins |
| AI-025 | Native web evolution thresholds | Replace inherited components by product fit, security debt, accessibility and lifecycle cost | Product + client architecture | Before Study/Work/Campus expansion |

## 7. Commons Compute Fabric Campus Compute Fabric

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| Commons Compute Fabric-001 | Machines eligible for enrollment | Explicitly authorized College/test assets only | ITS + asset owners | Before deployment |
| Commons Compute Fabric-002 | Worker implementation language | Choose for safe cross-platform service operation and maintainability | Commons Compute Fabric team | Before coding |
| Commons Compute Fabric-003 | Enrollment and attestation method | Short-lived enrollment plus device identity and revocation | Security + Commons Compute Fabric | Before worker pilot |
| Commons Compute Fabric-004 | Hardware/capability schema | Versioned cross-platform schema with sanitized examples | Commons Compute Fabric + contracts | Before census |
| Commons Compute Fabric-005 | Idle detection signals | OS-native activity plus institution-approved policy | ITS desktop + privacy | Before opportunistic work |
| Commons Compute Fabric-006 | Interactive-user protection | Immediate preemption/drain target and resource caps | ITS desktop + Commons Compute Fabric | Before lab pilot |
| Commons Compute Fabric-007 | Scheduler strategy | Borrow HTCondor policy; build only institution-specific layer | Commons Compute Fabric architecture | Before jobs |
| Commons Compute Fabric-008 | Kubernetes relationship | Stable GPU pools may use Kubernetes; opportunistic nodes need separate policy | Commons Compute Fabric + cloud | Before GPU jobs |
| Commons Compute Fabric-009 | Trust tiers | Define institutional, managed lab, research and volunteer tiers | Security + resource owners | Before mixed fleet |
| Commons Compute Fabric-010 | Workload sandbox | OCI isolation plus stronger controls by trust/data class | Security + Commons Compute Fabric | Before arbitrary jobs |
| Commons Compute Fabric-011 | Network access from jobs | Deny by default; policy-controlled egress | Security + network | Before jobs |
| Commons Compute Fabric-012 | Preemption/checkpoint contract | Capability-based and optional; never assume every runtime supports it | Commons Compute Fabric + runtime owners | Before long jobs |
| Commons Compute Fabric-013 | Initial runtime adapters | CPU job runner, then vLLM and llama.cpp; SGLang is the alternative serving adapter | Commons Compute Fabric + AI | Before each milestone |
| Commons Compute Fabric-014 | Distributed inference entry criteria | Only after independent replicas, topology and failure tests | Commons Compute Fabric research board | Deferred |
| Commons Compute Fabric-015 | exo/SwarmLLM research status | Experimental; no production dependency | Commons Compute Fabric research board | Accepted default |
| Commons Compute Fabric-016 | Model-cache placement and eviction | Content-addressed, verified and policy-aware | Commons Compute Fabric + storage | Before model distribution |
| Commons Compute Fabric-017 | Volunteer compute | Separate opt-in trust tier with public policy | Governance + security + legal | Deferred |
| Commons Compute Fabric-018 | Power/thermal limits | Hardware-owner policy and automatic protection | Facilities + ITS | Before sustained workloads |
| Commons Compute Fabric-019 | Resource accounting | Transparent CPU/GPU/memory/energy metrics by project | Capacity + governance | Before quotas |
| Commons Compute Fabric-020 | Campus topology confidentiality | Expose abstract zones, not sensitive network/site details | Security + facilities | Before cross-system API |

## 8. Commons Media and Spatial Fabric and spatial platform

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| MED-001 | Universal asset identity and manifest | Content hash plus stable logical asset/version identifiers | Media + contracts | Before first asset |
| MED-002 | Canonical object layout | Ceph RGW with portable S3-compatible paths and metadata | Media + storage | Before ingestion |
| MED-003 | Processing workflow engine | Reuse chosen platform workflow engine | Media + platform | Before pipelines |
| MED-004 | Image/video engines | FFmpeg, GStreamer and open image libraries | Media engineering | Before pipeline code |
| MED-005 | 3D interchange | glTF-first where capability fits | Spatial/media group | Before 3D assets |
| MED-006 | 4DGS manifest/profile | Versioned open profile; do not lock to one renderer | Spatial/media group | Before 4DGS ingestion |
| MED-007 | Browser renderer | Evaluate open WebGPU/WebXR stacks | Media UX + accessibility | Before viewer |
| MED-008 | LOD/progressive streaming strategy | Open manifests and negotiated fallbacks | Media architecture | Before large spatial media |
| MED-009 | Spatial audio representation | Select open format and fallback profile | Media + accessibility | Before spatial audio |
| MED-010 | Capture consent and bystander protection | Required workflow and redaction before publication | Privacy + media governance | Before capture features |
| MED-011 | Rights/license metadata | Mandatory provenance and reuse rights on every publishable asset | Legal + media owners | Before publishing |
| MED-012 | Content moderation responsibilities | Media policy before AI/Fediverse publication | Trust/safety + media | Before public content |
| MED-013 | Rendition retention | Retain reproducible masters and policy-defined derivatives | Records + storage | Before production storage |
| MED-014 | AI-generated media labeling | Provenance metadata and visible disclosure policy | AI/media governance | Before generation |
| MED-015 | Delivery authorization/CDN | Self-hosted delivery first; no mandatory vendor CDN | Media + network | Before public scale |

## 9. Commons Social Fabric

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| FED-001 | Adopted product suite | Mastodon social; Pixelfed photos; PeerTube video; Lemmy communities; WriteFreely blogs; Owncast live, each only when its capability enters scope | Fediverse team | Accepted projects; exact releases before product pilots |
| FED-002 | One domain versus product subdomains | One identity namespace with clear product endpoints | Product + DNS owner | Before federation |
| FED-003 | Shared versus product-local actors | Define portable actor ownership and migration | Fediverse architecture | Before accounts |
| FED-004 | Institutional identity link | Optional and revocable; public persona separate by default | Privacy + governance | Before SSO |
| FED-005 | Private, allowlisted or public federation | Start local/allowlisted; public after readiness review | Trust/safety + sponsor | Before federation launch |
| FED-006 | Instance rules and age/access policy | Human-authored, transparent and appealable | Community governance | Before users |
| FED-007 | Moderation authority and appeals | Independent roles, escalation and audit | Trust/safety governance | Before users |
| FED-008 | Domain/instance blocking policy | Graduated controls with emergency authority | Trust/safety + security | Before public federation |
| FED-009 | Remote media proxy and retention | SSRF-safe proxy, bounded cache and content policy | Security + media | Before federation |
| FED-010 | Search/discoverability consent | Opt-in rules appropriate to audience | Privacy + product | Before indexing |
| FED-011 | Direct/private message expectations | Clearly state limits; do not promise E2E encryption without it | Security + product | Before messaging |
| FED-012 | Spatial attachment precision | Public place or reduced precision; exact location requires consent | Privacy + spatial group | Before spatial federation |
| FED-013 | ActivityStreams spatial extension strategy | Draft extension and interoperability tests before FEP proposal | Standards working group | Deferred |
| FED-014 | Upstream fork strategy per product | Thin extensions and explicit patch budget | Open-source governance | Before customization |
| FED-015 | Federation interoperability certification | Controlled test peers and release gate | QA + Fediverse operators | Before public launch |
| FED-016 | Social federation protocol | ActivityPub/ActivityStreams and related Fediverse standards | Fediverse architecture | Accepted by ADR-0014 |
| FED-017 | Federation scopes | Institution, regional, provincial, Canadian and public scopes with separate trust policy | Federation governance | Before cross-institution pilot |
| FED-018 | Compute/resource settlement | Auditable contribution/consumption ledger; no cryptocurrency requirement | Consortium finance + federation operators | Before shared capacity |

## 10. Academic and student-life integration

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| EDU-001 | Institutional approval path | Formal sponsor, privacy/security review and D2L owner | College leadership | Before integration |
| EDU-002 | Brightspace integration mode | Supported OAuth API and/or LTI 1.3 by use case | D2L owner + architecture | Before development |
| EDU-003 | Initial scope | Read-only courses, content, assignments and deadlines | Academic governance | Before pilot |
| EDU-004 | Course-content ingestion and retention | Index only authorized content with course lifecycle deletion | Faculty + privacy | Before RAG |
| EDU-005 | Faculty control plane | Per-course enablement, sources, policies and visibility | Faculty governance | Before course rollout |
| EDU-006 | Assessment-policy enforcement | Map College/faculty rules to visible AI behavior | Academic integrity owners | Before assessed use |
| EDU-007 | Student data shown to faculty | No private AI activity by default; define legitimate exceptions | Privacy + academic governance | Before analytics |
| EDU-008 | Mastery/adaptive tutoring model | Transparent, challengeable and not used for official grading | Faculty + students + privacy | Before personalization |
| EDU-009 | Calendar/task synchronization | Read first; writes require preview and confirmation | Product + security | Before write scopes |
| EDU-010 | Event registration and booking actions | Low-consequence actions first with receipts | Service owners + product | Before actions |
| EDU-011 | High-consequence academic actions | Exclude until dedicated policy and human confirmation design | Registrar + legal + security | Deferred |
| EDU-012 | Student support escalation | Define when AI hands off to a human and emergency limitations | Student services | Before concierge launch |
| EDU-013 | Personalization and memory | Explicit opt-in, inspectable, editable and deletable | Privacy + students | Before memory |
| EDU-014 | Academic provider boundary | Clients and agents use the internal Academic Service only | Architecture council | Accepted by ADR-0010 |
| EDU-015 | Development academic fixtures | Synthetic, deterministic and free of College production data | Academic owners + privacy + QA | Before academic development |

## 11. Clients, UX, and developer platform

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| UX-001 | Shared design system | One accessible token/component system across products | UX/accessibility leads | Before multiple clients |
| UX-002 | Accessibility target | WCAG-aligned institutional target with real user testing | Accessibility office + UX | Before public pilot |
| UX-003 | Web framework | Svelte/SvelteKit-compatible evolution; React/Vue alternatives | Client team | Accepted default; exact release before web build |
| UX-004 | Desktop foundation | OpenWork MIT core outside `ee/`; current React/Electron shell is gated; Tauri is the replacement path | Desktop team + security | ADR-0018; exact commit, provenance, threat/accessibility test before import |
| UX-005 | Mobile foundation | Happy MIT Expo/React Native baseline; self-hosted E2EE relay | Mobile team + accessibility + security | ADR-0019; exact commit, crypto/self-host/accessibility test before import |
| UX-006 | Offline behavior | Define cached data, encryption and conflict rules per client | Product + security | Before offline mode |
| UX-007 | Client update distribution | Self-hosted signed updates and rollback | Release + security | Before desktop/mobile release |
| UX-008 | Voice/camera permissions | Just-in-time, purpose-specific and revocable | Privacy + UX | Before sensors |
| UX-009 | Cross-device continuity | Server session refs, not unrestricted device-state replication | Security + product | Before multi-device |
| UX-010 | Agent session relay | Institution-controlled, content-blind relay with E2EE endpoint payloads | Security + operations | Normative decision; implementation must pass the v1 cryptography and recovery profile |
| UX-011 | Remote permission modes | `allow_once` and `deny` first; no automatic approval or durable mobile grants by default | Security + product | Before remote tool approval |
| UX-012 | Push notification content | Opaque wake token and coarse event class only | Privacy + mobile + operations | Before push provider integration |
| UX-013 | Happy ecosystem feature scope | Pairing, continuity, inbox, handoff, offline queue, diffs and artifacts first; voice/collaboration later | Product + security + accessibility | Accepted scope; each later feature needs its listed gate |
| UX-014 | White-labelled client access | Institution portal, signed deployment manifest/build, institution OIDC and institution endpoints; no OpenWork/Happy account | Client + identity + release teams | Normative decision; distribution must pass the v1 signed-manifest profile |
| DEV-001 | Initial SDK languages | Python and TypeScript; CLI alongside | Developer platform | Before public API |
| DEV-002 | Application registration | Self-service only after review and scope model mature | Security + developer platform | Before third-party apps |
| DEV-003 | Student developer scopes/quotas | Least privilege with project isolation and transparent limits | Governance + platform | Before SDK pilot |
| DEV-004 | API stability promise | Semantic/versioned contract with deprecation windows | Architecture council | Before v1 |
| DEV-005 | Build service | Self-hosted OCI builds with isolated runners | Release + security | Before hosted builds |
| DEV-006 | Templates and golden paths | Provide examples without making one language mandatory | Developer experience | Before onboarding |
| DEV-007 | Agent/app marketplace review | Security, permissions, privacy, accessibility and ownership review | Governance + security | Deferred |

## 12. Security, reliability, and operations

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| SEC-001 | Threat-model methodology and reviewers | Shared methodology with domain threat models | Security leadership | Before real data |
| SEC-002 | Network segmentation zones | Management, storage, workload, user, federation and lab boundaries | Network + security | Before deployment |
| SEC-003 | Egress policy | Deny or allowlist by workload/data class | Security + domain owners | Before production |
| SEC-004 | Vulnerability remediation targets | Severity-based SLAs and emergency process | Security + service owners | Before release |
| SEC-005 | Artifact signing and verification | Sign images, packages, manifests and releases | Supply-chain security | Before releases |
| SEC-006 | Secret rotation cadence | Risk-based automatic rotation where possible | Security + operations | Before production |
| SEC-007 | Audit-event scope and access | Record privileged/security actions; minimize user-content exposure | Security + privacy | Before audit logging |
| SEC-008 | Incident authority and communications | Named commander, privacy/legal paths and student-safe process | Institutional sponsor | Before pilot |
| SEC-009 | Penetration testing scope | Independent review before public/federated exposure | Security leadership | Before public launch |
| SEC-010 | AI prompt injection/tool security gates | Isolation, untrusted-content labeling and action confirmation | AI security | Before agents/tools |
| OPS-001 | Service tiers and SLOs | Define criticality per service instead of one platform-wide number | Service owners + SRE | Before production |
| OPS-002 | Telemetry stack | OpenTelemetry, Prometheus and selected open backends | SRE | Before pilot |
| OPS-003 | Log/trace/metric retention | Data-class-aware minimums | SRE + privacy | Before telemetry storage |
| OPS-004 | On-call/support model | College-owned production rota; students not sole responders | ITS + service owners | Before production |
| OPS-005 | Backup scope and frequency | Service-owned plan with tested restore | Data owners + SRE | Before persistent data |
| OPS-006 | RPO/RTO by service | Choose from business impact analysis | Service owner + institution | Before HA procurement |
| OPS-007 | Maintenance windows and notice | Published windows plus emergency change path | Operations governance | Before pilot |
| OPS-008 | Capacity headroom | Set CPU/GPU/storage/network thresholds and queue policy | Capacity owners | Before broad access |
| OPS-009 | Disaster recovery site/topology | Decide after failure-domain and data-residency analysis | Institution + SRE | Before production |
| OPS-010 | Chaos and recovery exercises | Scheduled tests with safe scope and evidence | SRE + security | Before production certification |

## 13. Hardware, facilities, cost, and sustainability

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| HW-001 | Initial authorized hardware inventory | Small dedicated pilot plus explicitly approved test workers | ITS asset owners | Before deployment |
| HW-002 | Accelerator strategy | Prefer hardware with sustainable open driver support | Infrastructure + procurement | Before purchase |
| HW-003 | NVIDIA/proprietary driver exception | Use only if capability need outweighs lock-in and exit path exists | Architecture + procurement | Before purchase |
| HW-004 | Storage hardware and redundancy | Size from measured workload and failure objectives | Storage + finance | Before Ceph build |
| HW-005 | GPU/network fabric | Add specialized interconnect only after workload evidence | Commons Compute Fabric/AI + finance | Before scale-out |
| HW-006 | Power, cooling and facilities capacity | Facilities-approved sustained load envelope | Facilities + ITS | Before deployment |
| HW-007 | Hardware lifecycle and e-waste | Repair, reuse, secure disposal and replacement policy | Sustainability + asset management | Before procurement |
| FIN-001 | Cost allocation model | Transparent project/service usage without student surprise billing | Governance + finance | Before quotas |
| FIN-002 | Student quota philosophy | Equitable baseline plus reviewed academic/research exceptions | Governance + capacity | Before pilot |
| FIN-003 | No-vendor budget implication | Fund hardware, staffing, power, backup and training explicitly | Sponsor + finance | Before commitment |
| FIN-004 | Sustainability metrics | Track energy, utilization, carbon context and avoided cloud spend | Sustainability + operations | Before scale |
| FIN-005 | Student funding planning basis | CA$30 per participating student per enrolled month | Founder + finance | Accepted assumption by ADR-0015; external approval outstanding |
| FIN-006 | Funding presentation | Gross digital-commons funding, not profit or consumer subscription revenue | Governance + finance | Before business case publication |
| FIN-007 | Federation allocation | Separate institution, provincial, Canadian, engineering, student innovation and reserve pools | Consortium governance | Before multi-institution funding |

## 14. Roadmap and launch gates

| ID | Human choice | Accepted project default | Decision authority | Gate |
|---|---|---|---|---|
| ROAD-001 | First integrated MVP | Keycloak + gateway + one local model + basic web client + telemetry | Steering group | Before implementation sprint |
| ROAD-002 | Commons Compute Fabric first milestone | Census and telemetry only | Commons Compute Fabric team + ITS | Before worker coding |
| ROAD-003 | Media first milestone | Asset manifest + one local processing pipeline | Media team | Before pipeline coding |
| ROAD-004 | Fediverse first milestone | Local actor/note and controlled test peer | Fediverse + trust/safety | Before federation coding |
| ROAD-005 | Pilot population and size | Small opt-in club/research cohort | Sponsor + privacy/security | Before pilot |
| ROAD-006 | Exit criteria by phase | Security, reliability, accessibility, support and user-value evidence | Steering group | Before each phase |
| ROAD-007 | Commons Compute Fabric integration point | After identity, sandboxing, preemption and operational tests | AI/Media/Commons Compute Fabric owners | Before routing workloads |
| ROAD-008 | Brightspace integration point | After institutional authorization and core AI stability | Academic owners | Before course pilot |
| ROAD-009 | Public federation launch | After moderation, abuse, media proxy, privacy and incident tests | Trust/safety + institution | Before public federation |
| ROAD-010 | Spatial/4DGS public support | After format, fallback, privacy and accessibility profile approval | Spatial/media group | Before publication |
| ROAD-011 | Production handoff | Named College owner, runbooks, support, backups and recovery evidence | Institutional sponsor | Before production |
| ROAD-012 | Stop/go authority | Named human body can pause unsafe or unsustainable work | Governance | Before pilot |
| ROAD-013 | Second-institution gate | Validate tenant neutrality and white-labelling before Ontario federation | Architecture + consortium sponsor | After the first institution pilot |
| ROAD-014 | Ontario federation gate | Start with 3–5 institutions after trust, settlement and interoperability proofs | Consortium governance | After second-institution pilot |
| ROAD-015 | Canadian expansion gate | Expand only after provincial sovereignty, operations and economics are proven | Canadian consortium governance | After Ontario production evidence |

## Decision record template

For each open/proposed row, record:

```text
Decision ID:
State:
Accountable owner:
Consulted reviewers:
Decision deadline / gate:
Requirements and evidence:
Options considered:
Selected option and rationale:
Security/privacy/accessibility impact:
Open-source/license verification:
Operational and cost impact:
Migration, rollback and exit plan:
ADR/policy/specification links:
Review date:
```

## Implementation authorization evidence queue

The product and technology defaults are accepted. The following evidence and
external-authority actions are required by implementation and release gates; none
changes the architecture unless its result triggers a new ADR:

1. Appoint governance, sponsor and production owners and ratify operating responsibility for the accepted repository model.
2. Complete legal review of Apache-2.0, DCO and the separate participant upstream-contribution agreement; automate the open-source admission policy.
3. Confirm the first integrated MVP's accountable owner and pilot audience.
4. Validate the accepted host OS, Kubernetes, ingress, CNI and development topology.
5. Choose the Keycloak realm/claim model and obtain approval for the production
   Entra adapter without creating parallel institutional accounts.
6. Implement the accepted gateway baseline and freeze its exact compatibility profile.
7. Select the first exact local model release from license and hardware evidence.
8. Approve data classification, prompt retention and telemetry boundaries.
9. Run the Commons Compute Fabric census and approve hardware, worker and enrollment/attestation details.
10. Verify the Open WebUI v0.6.5 tag/commit, licenses, provenance, security state,
    accessibility baseline and maintenance ownership before importing source.
11. Name accountable owners for Cloud, AI, Commons Compute Fabric, Media, Fediverse, security/privacy,
    accessibility, operations and contracts.
12. Select the exact OpenTofu release, state backend and provider/module allowlist.
13. Define the second-institution pilot and federation trust agreement.
