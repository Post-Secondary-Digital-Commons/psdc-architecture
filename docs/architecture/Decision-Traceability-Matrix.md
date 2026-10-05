# Decision Traceability Matrix


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: Applicable ADRs and repository governance

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
| ADR-0024 Permissive license and contribution policy | Historical licensing decision | Superseded by ADR-0030; remains relevant to artifacts not lawfully migrated |
| ADR-0025 Independent web client repository | `psdc-web`, institutional web forks, client discovery, Web BFF, browser security and releases | Browser/PWA ownership is independent from the AI service repository and follows the same thin-fork model as desktop and mobile |
| ADR-0026 Sovereign derived fabric | Compute, storage and ledger framework composition | PSDC authority and contracts govern bounded upstream-derived mechanisms; public networks are explicit adapters |
| ADR-0027 Portable identity | Institutional identity, W3C DIDs, VCs, wallets and transfer | Portable claims accompany but never replace local authentication and authorization |
| ADR-0028 Six-tier storage | Object manifests, placement, custody, repair, federation and public archive | Protected content remains encrypted/off-ledger; Tier 4 is governed federation and Tier 5 intentional public permanence |
| ADR-0029 Unified resource metering | Compute, storage and network leases, receipts and institutional credits | One non-transferable accountable resource model across backends |
| ADR-0030 Network copyleft and commercial contribution | PSDC service/client/contract license boundaries and participant agreements | AGPL target for services, open interoperability contracts, and mandatory upstream offers for recognized participants |
| ADR-0031 Off-chain operations and on-chain settlement | PostgreSQL, evidence storage, batch builder, Cosmos-derived ledger and reconciliation | Fast mutable local operation with deterministic federated settlement; the ledger is not the scheduler database |
| ADR-0032 Data-plane gateway boundary and two-axis roadmap | Client access to backends; ordering of common implementation waves versus institution phases | Clients reach storage, inference and workers only through the institution gateway; waves and phases are separate axes with an accepted mapping |

## Required use

Every architecture document identifies applicable ADRs. A design that conflicts
with an accepted ADR either changes to comply or proposes a superseding ADR with a
migration and compatibility plan.

## Purpose and mapped scope

This map explains the relationships represented by **Decision Traceability Matrix**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

## Scope and exclusions

The map covers only the documents, repositories, capabilities, and relationships explicitly named here. It excludes secrets, private infrastructure values, undocumented vendor commitments, and requirements that belong in an owning specification.

## Ownership boundaries

The owning repository remains authoritative for each capability and contract. This map may summarize and link, but it MUST NOT redefine a product boundary, institution policy, or signed deployment value. Cross-repository changes require the owning ADR or contract update.

## Dependency and relationship semantics

A relationship means a declared contract, event, protocol, deployment dependency, or navigation link; it does not mean shared database or filesystem access. Producers and consumers MUST use the referenced versioned contract, and circular synchronous dependencies require an accepted ADR.

## Source of truth and references

The source of truth is the linked document in the owning repository plus its accepted ADRs, schemas, and deployment profiles. When a link crosses repositories it MUST use a canonical hosted URL or a workspace-relative path that the structural checker can resolve.

## Validation and staleness

The map is valid only while links resolve, referenced control blocks and versions remain current, and no newer accepted ADR contradicts the summary. Run Test-Documentation.ps1 and Test-DocumentQuality.ps1; stale or contradictory entries MUST be corrected, superseded, or marked historical with an owner and expiry.
