# Post-Secondary Digital Commons

Umbrella architecture and contract repository for the tenant-neutral
Post-Secondary Digital Commons and its Algonquin reference deployment. This
repository contains the system context, ownership boundaries,
governance, security requirements, and shared contracts used by the Commons
Cloud, Compute, AI, Media and Spatial, and Social Fabrics.

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
- [Ecosystem gap analysis](./docs/roadmap/Ecosystem-Gap-Analysis-2026-09-10.md)
- [Commons AI Web foundation](./docs/clients/Commons-AI-Web-Foundation.md)
- [ADR-0009: web bootstrap](./docs/architecture/architecture-decision-records/ADR-0009-psdc-ai-web-foundation.md)
- [ADR-0010: institutional production authorities](./docs/architecture/architecture-decision-records/ADR-0010-provider-neutral-core-institutional-production-authority.md)
- [ADR-0017: OpenTofu default](./docs/architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

## Shared contract domains

- `contracts/identity/` — normalized identities and roles
- `contracts/academic/` — normalized academic resources and provider operations
- `contracts/events/` — cross-system event envelopes
- `contracts/activitypub/` — federation-facing protocol contracts
- `contracts/spatial/` — spatial and temporal-spatial metadata
- `contracts/ai/` — model and inference references
- `contracts/compute/` — jobs, capacity, and worker references
- `contracts/media/` — assets, renditions, and media metadata
