# Post-Secondary Digital Commons


> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: none; index governed by repository policy

Umbrella architecture and contract repository for the tenant-neutral
Post-Secondary Digital Commons and its Algonquin reference deployment. This
repository contains the system context, ownership boundaries,
governance, security requirements, and shared contracts used by the Commons
Cloud, Compute, AI, Media and Spatial, and Social Fabrics, plus Web, Desktop and
Mobile clients.

It intentionally contains no deployable product service. Product implementations
live in the sibling repositories under the workspace root.

## Ecosystem control documents

- [Consolidated ecosystem architecture](./docs/architecture/Consolidated-Ecosystem-Architecture.md)
- [Dependency contract](./docs/architecture/Ecosystem-Dependency-Contract.md)
- [Cross-pollination and shared capabilities](./docs/architecture/Cross-Pollination-and-Shared-Capabilities.md)
- [Repository and Obsidian linking model](./docs/architecture/Repository-and-Obsidian-Linking-Model.md)
- [Human choices and decisions register](./docs/governance/Human-Choices-and-Decisions-Register.md)
- [GitHub repository governance](./docs/governance/GitHub-Repository-Governance.md)
- [Repository access and onboarding policy](./docs/governance/Repository-Access-and-Onboarding-Policy.md)
- [Open-source-only policy](./docs/vision/11-Open-Source-Only-Policy.md)
- [Open-source reference stack](./docs/vision/12-Open-Source-Reference-Stack.md)
- [Full technology stack and alternatives](./docs/vision/14-Full-Technology-Stack-and-Open-Source-Alternatives.md)
- [Commons architecture](./docs/vision/constitutional/Post-Secondary-Digital-Commons-Architecture.md)
- [Naming and sovereignty](./docs/architecture/Federated-Commons-Naming-and-Sovereignty.md)
- [Federated social governance](./docs/fediverse/Federated-Social-Governance-Policy.md)
- [Institution-branded client access](./docs/clients/Institution-Branded-Client-Distribution-and-Access.md)
- [Ecosystem implementation readiness](./docs/roadmap/Ecosystem-Implementation-Readiness-2026-09-11.md)
- [Documentation debt to implementation-grade plan](./docs/roadmap/Documentation-Debt-to-Implementation-Grade-Plan.md)
- [Architecture authority and precedence](./docs/architecture/Architecture-Authority-and-Precedence.md)
- [P0 architecture baseline and remediation register](./docs/architecture/P0-Architecture-Baseline-and-Remediation-Register.md)
- [Executable contract portfolio](./docs/architecture/Executable-Contract-Portfolio.md)
- [Vertical slice completion plan](./docs/roadmap/Vertical-Slice-Completion-Plan.md)
- [Semantic clone removal plan](./docs/roadmap/Semantic-Clone-Removal-Plan.md)
- [Implementation handoff standard](./docs/standards/Implementation-Handoff-Standard.md)
- [Implementation handoff backlog](./docs/roadmap/Implementation-Handoff-Backlog.md)
- [Documentation completion audit](./docs/architecture/Documentation-Completion-Audit-2026-09-11.md)
- [Specification completeness standard](./docs/architecture/Specification-Completeness-Standard.md)
- [Ecosystem documentation quality and scope standard](./docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [AI documentation review rubric](./docs/standards/AI-Documentation-Review-Rubric.md)
- [PSDC Web foundation](./docs/clients/PSDC-Web-Foundation.md)
- [ADR-0009: web bootstrap](./docs/architecture/architecture-decision-records/ADR-0009-psdc-ai-web-foundation.md)
- [ADR-0010: institutional production authorities](./docs/architecture/architecture-decision-records/ADR-0010-provider-neutral-core-institutional-production-authority.md)
- [ADR-0017: OpenTofu default](./docs/architecture/architecture-decision-records/ADR-0017-opentofu-default.md)
- [ADR-0025: independent web client](./docs/architecture/architecture-decision-records/ADR-0025-independent-web-client-repository.md)
- [ADR-0026: sovereign derived fabrics](./docs/architecture/architecture-decision-records/ADR-0026-sovereign-derived-fabrics.md)
- [ADR-0027: portable DID and VC identity](./docs/architecture/architecture-decision-records/ADR-0027-portable-did-vc-identity.md)
- [ADR-0028: private content and storage fabric](./docs/architecture/architecture-decision-records/ADR-0028-private-content-and-storage-fabric.md)
- [ADR-0029: institutional resource market and metering](./docs/architecture/architecture-decision-records/ADR-0029-unified-institutional-resource-metering.md)
- [ADR-0030: network copyleft and commercial contribution](./docs/architecture/architecture-decision-records/ADR-0030-network-copyleft-and-commercial-contribution.md)
- [ADR-0031: off-chain operations and on-chain settlement](./docs/architecture/architecture-decision-records/ADR-0031-off-chain-operations-and-on-chain-settlement.md)
- [ADR-0032: data-plane gateway and two-axis roadmap](./docs/architecture/architecture-decision-records/ADR-0032-data-plane-gateway-and-two-axis-roadmap.md)
- [ADR-0033: dual-lane adaptive AI sessions](./docs/architecture/architecture-decision-records/ADR-0033-dual-lane-adaptive-ai-sessions.md)
- [ADR-0034: governed agent skills and workspace knowledge plane](./docs/architecture/architecture-decision-records/ADR-0034-governed-agent-skills-and-workspace-knowledge-plane.md)
- [Dual-lane adaptive session architecture](./docs/ai/Dual-Lane-Adaptive-Session-Architecture.md)
- [Minimal conversation experience](./docs/product/Minimal-Conversation-Experience.md)
- [Typing and draft privacy](./docs/governance/Typing-and-Draft-Privacy.md)
- [Adaptive AI vertical slice](./docs/roadmap/Adaptive-AI-Vertical-Slice.md)
- [Workspace knowledge and agent skills](./docs/architecture/Workspace-Knowledge-and-Agent-Skills.md)

## Shared contract domains

- `contracts/identity/` — normalized identities and roles
- `contracts/academic/` — normalized academic resources and provider operations
- `contracts/events/` — cross-system event envelopes
- `contracts/activitypub/` — federation-facing protocol contracts
- `contracts/spatial/` — spatial and temporal-spatial metadata
- `contracts/ai/` — model and inference references
- `contracts/compute/` — jobs, capacity, and worker references
- `contracts/storage/` — object manifests and governed placement tokens
- `contracts/network/` — path capabilities and lease-bound reservations
- `contracts/security/` — KMS operation grants and wrapped key envelopes
- `contracts/economics/` — settlement batches and ledger commitments
- `contracts/common/` — shared structural primitives
- `contracts/fixtures/` — executable positive, negative, timeout, retry, revocation, and failure cases
- `contracts/media/` — assets, renditions, and media metadata

Run `npm ci --ignore-scripts` and `npm run test:contracts` to validate all schemas and
fixtures. These contracts are D1 candidates; their presence does not claim that the services
or production integrations exist.

## Purpose

This index explains the purpose and placement of the psdc-architecture repository and links readers to the authoritative documents it contains.

## Allowed contents

This repository may contain scoped documentation, contracts, configuration examples, tests, and navigation links owned by psdc-architecture.

## Prohibited contents

It MUST NOT contain secrets, credentials, private infrastructure values, unrelated product source, copied institution overrides, or undocumented external dependencies.

## Owner

The owning role is PSDC Architecture Maintainers; accountable maintenance remains with RedjiJB until a second maintainer is appointed.

## Contents

- `.github`
- `.gitignore`
- `contracts`
- `CONTRIBUTING.md`
- `docs`
- `LICENSE`
- `NOTICE`
- `README.md`

## Contribution and change control

Changes MUST use a pull request, preserve the repository boundary, update affected links and contracts, and pass the structural and substantive documentation audits before merge.

## References

- [Ecosystem documentation quality standard](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [Repository governance](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/governance/GitHub-Repository-Governance.md)

