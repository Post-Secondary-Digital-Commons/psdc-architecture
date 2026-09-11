# Decision Traceability Matrix

| Decision | Primary documents | Platform-wide effect |
|---|---|---|
| ADR-0001 Standards-first | Vision principles, build/adopt/fork, open-source strategy | Every new primitive and protocol |
| ADR-0002 Institutional identity | Identity, clients, academic, cloud, Fediverse separation | Authentication and account lifecycle |
| ADR-0003 AI compatibility boundary | AI gateway/APIs/router, clients, SDKs | All inference clients and providers |
| ADR-0004 Commons Compute Fabric runtime adapters | Commons Compute Fabric architecture, scheduler, runtime backends | Compute execution and engine replacement |
| ADR-0005 Standard primitives | Cloud, storage, data, network, integration, operations | Infrastructure and interoperability |
| ADR-0006 Thin forks | Eligible AI clients, OpenCode, Fediverse deployments, open-source policy | Upgrade and patch management |
| ADR-0007 Supported Brightspace | Academic architecture, identity, agents, clients | LMS integration and permissions |
| ADR-0008 Open-source self-hosted core | Entire reference stack, deployment, clients, adapters, documentation | License eligibility, vendor independence, and exit paths |
| ADR-0009 Commons AI Web foundation | Commons AI Fabric web application, licensing, provenance, client roadmap | Frozen BSD bootstrap and native product evolution |
| ADR-0010 Institutional production authorities | Identity broker, Entra adapter, Academic Service, Brightspace adapter | Provider-neutral contracts with College-authoritative production data |
| ADR-0011 Terraform default with open fallback | Historical infrastructure choice | Superseded by ADR-0017; not current guidance |
| ADR-0012 Post-Secondary Digital Commons | Constitutional architecture, tenancy, repository boundaries | Institution-neutral reusable core with Algonquin as reference deployment |
| ADR-0013 Institution-first locality | Scheduling, data placement, federation and provider selection | Local-first ladder and explicit workload envelopes |
| ADR-0014 Fediverse social fabric | Social, photos, video, communities and blogs | ActivityPub is the durable social federation protocol |
| ADR-0015 Commons funding assumption | Economics, capacity and phased planning | CA$30 per enrolled student-month is a planning input, not approved revenue |
| ADR-0016 Accepted register defaults | Entire technology and architecture register | Defaults are implementation baselines; measured values and external approvals remain open |
| ADR-0017 OpenTofu default | Infrastructure scaffolds, module policy, state and license controls | OpenTofu + Ansible default with no standing source-available exception |
| ADR-0018 OpenWork desktop foundation | Commons AI Fabric desktop, local workspace/tool mediation, session host | MIT-only import boundary; no `ee/`, Den, hosted MCP, or provider bypass |
| ADR-0019 Happy mobile foundation | Commons AI Fabric mobile, session relay, pairing, permissions, notifications and handoff | MIT Expo baseline; self-hosted content-blind E2EE relay and provider-neutral sessions |
| ADR-0020 Shared platform name | All shared architecture, contracts, software, documentation and conformance | Post-Secondary Digital Commons is canonical; Algonquin names only the reference deployment |
| ADR-0021 Institution-branded client access | Web, desktop, mobile, manifest, signing, OIDC, distribution and pairing | Institution portal/account/endpoints; neutral shared code; no upstream-vendor or global Commons account |
| ADR-0022 Polyrepo ecosystem | Git boundaries, releases, ownership, clients, deployment overlays and developer workspace | Independent repositories per bounded product; Happy-style package workspaces only within one cohesive product |
| ADR-0023 Institution fork model | GitHub organizations, white-labelling, upstream synchronization and institution release ownership | Repository-by-repository thin forks; institution `origin`, Commons `upstream`, deployment-manifest configuration |
| ADR-0024 Permissive license and contribution policy | Licensing, patents, notices, commercial use and upstream contribution | Apache-2.0 default; upstream-first governance and separate participant agreements, not a non-OSI license condition |
| ADR-0025 Independent web client repository | `psdc-web`, institutional web forks, client discovery, Web BFF, browser security and releases | Browser/PWA ownership is independent from the AI service repository and follows the same thin-fork model as desktop and mobile |

## Required use

Every architecture document identifies applicable ADRs. A design that conflicts
with an accepted ADR either changes to comply or proposes a superseding ADR with a
migration and compatibility plan.
