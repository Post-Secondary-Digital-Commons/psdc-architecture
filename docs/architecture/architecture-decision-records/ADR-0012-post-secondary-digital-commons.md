# ADR-0012: Build a Tenant-Neutral Post-Secondary Digital Commons

> Status: Accepted
> Date: 2026-09-10
> Scope: Entire ecosystem
> Decision owner: Project founder

## Context

The architecture is intended to be white-labelled by post-secondary institutions
across Ontario and eventually Canada. Encoding Algonquin into reusable contracts,
resource types, or core business logic would make a second deployment a fork.

## Decision

The reusable architecture is a **Post-Secondary Digital Commons**. Algonquin is
the first reference deployment and proving ground, not the identity of the core.

The logical architecture has three layers:

1. **Institution experience:** branding, SSO, LMS, policy, data boundaries,
   applications, agents, model catalog, and local resources.
2. **Reusable commons core and fabrics:** tenant-neutral identity, academic, AI,
   compute, data/storage, media/spatial, social, agent, service, developer,
   communications, and research capabilities.
3. **Federation:** explicitly trusted capacity and services across regional,
   provincial, and Canadian scopes.

Shared contracts use neutral concepts such as `Institution`, `Tenant`, `Subject`,
`Course`, `ComputeProvider`, `ComputeNode`, `ComputeCell`, `InferenceProvider`, and
`Federation`. Algonquin-specific names, claims, policies, branding, and adapters
belong in an Algonquin deployment overlay.

Repository boundaries are governed by ADR-0022: independent fabric, client,
architecture and institution-deployment repositories, with product-local package
workspaces permitted for tightly coupled components. A second institution pilot
remains the validation gate for tenant neutrality.

## Consequences

- Every resource and event needs an institution/tenant boundary.
- Cross-tenant access is denied unless an explicit federation contract permits it.
- White-labelling is configuration and extension, not a core fork.
- Shared repositories use neutral `psdc-*` names. Algonquin naming is confined to
  `algonquin-psdc-deployment` and Algonquin-operated release channels.
- Not all fabrics federate the same data or trust level.
