# ADR-0022: Polyrepo Ecosystem with Product-Local Package Workspaces

> Status: Accepted
> Date: 2026-09-10
> Scope: Source control, releases, ownership and developer workspace
> Decision owner: Project founder

## Context

The Commons contains independently operated fabrics, clients and institution
deployments. A single Git repository would couple permissions, release cadence,
issue tracking, history and ownership across boundaries that are intended to be
sovereign. At the same time, tightly coupled packages inside one product benefit
from a workspace layout like Happy's app, agent, CLI, server and wire packages.

## Decision

Use a **polyrepo ecosystem**. Each independently owned, secured, versioned or
deployed product is a separate Git repository. A small workspace repository owns
only checkout metadata, Obsidian navigation and contributor bootstrap tooling; it
does not vendor or version product source.

The initial repository set is:

| Repository | Boundary |
|---|---|
| `psdc-architecture` | Constitutional architecture, governance, shared contracts, ADRs and conformance profiles |
| `psdc-cloud` | Commons Cloud Fabric |
| `psdc-ai` | AI gateway, routing, policy integration, model adapters and closely coupled service packages |
| `psdc-compute` | Commons Compute Fabric |
| `psdc-media` | Commons Media and Spatial Fabric |
| `psdc-social` | Commons Social Fabric and ActivityPub integration |
| `psdc-web` | Browser client, Web BFF, PWA, accessibility, branding contract and web releases |
| `psdc-desktop` | OpenWork-derived desktop product and Session Host client integration |
| `psdc-mobile` | Happy-derived mobile companion, agent adapters and wire protocol packages |
| `psdc-deployment-template` | Neutral institution-deployment composition, branding and policy template |
| `psdc-workspace` | Repository manifest, bootstrap tooling and Obsidian maps only |

Each institution maintains its own thin forks, including a deployment repository
forked from `psdc-deployment-template`, as refined by ADR-0023. It consumes
released Commons artifacts and contracts; it does not turn the workspace
repository into a central operations plane.

Inside a product repository, a package workspace is allowed when packages share
one product lifecycle, security boundary and release train. This does not permit
unrelated fabrics to be recombined into a grand monorepo.

Cross-repository dependencies use released, versioned artifacts and contracts:

- OCI images and Helm/OCI packages for deployable services;
- language packages for SDKs and reusable libraries;
- signed JSON Schema, OpenAPI, AsyncAPI and Protobuf releases for contracts;
- signed deployment manifests for institution configuration; and
- a compatibility manifest and conformance tests for supported version sets.

Private source imports, Git subtrees, copied schemas and cross-repository database
access are prohibited. Temporary local checkout paths are developer convenience,
not runtime or release dependencies.

## Consequences

- Teams can release, secure, archive and transfer ownership independently.
- Client forks preserve their own upstream provenance and patch histories.
- Cross-repository compatibility and automated contract testing become mandatory.
- Coordinated changes use an architecture/contract change first, then repository
  implementation pull requests, then an Algonquin deployment integration change.
- The existing grand-monorepo checkout becomes migration source only after the
  split is verified; it is retained until history and artifacts are safely
  transferred.
