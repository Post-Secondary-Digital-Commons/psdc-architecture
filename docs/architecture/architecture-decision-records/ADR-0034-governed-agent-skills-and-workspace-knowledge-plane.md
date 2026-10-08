# ADR-0034: Governed Agent Skills and Workspace Knowledge Plane

> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Developer Experience Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0001, ADR-0008, ADR-0012, ADR-0022, ADR-0023

> Date: 2026-10-07
> Scope: Obsidian workspace, repository catalog, agent skills, upstream skill adoption, and generated-artifact authority
> Decision owner: PSDC founder

## Context and decision drivers

PSDC is a polyrepo ecosystem with an Obsidian-compatible workspace at its root.
Humans and coding agents need one navigable knowledge plane without turning the
systems into a monorepo or allowing generated summaries to override contracts,
ADRs or institution authority. Matt Pocock's MIT-licensed skills provide useful
small, composable patterns for domain modelling, research, specification,
ticketing, review and debugging, but their generic workflow does not encode PSDC
authority, evidence states, common/institution separation or cross-repository
mutation boundaries.

## Decision drivers

- Preserve logical polyrepo ownership and independent releases.
- Give humans an Obsidian graph and generated command center over shared sources.
- Give agents concise, versioned domain and workflow instructions.
- Pin and review third-party skill source before distribution.
- Prevent a skill, dashboard or generated note from becoming accidental authority.

## Considered options

| Option | Benefit | Disposition |
|---|---|---|
| One grand monorepo | One filesystem and tool configuration | Rejected by ADR-0022. |
| Copy all upstream skills into every repository | Fast installation | Rejected because it multiplies drift and supply-chain review. |
| Use upstream skills without modification | Low maintenance | Rejected because PSDC-specific authority and evidence controls are absent. |
| Governed common skill pack plus thin per-repository manifests | Reuse with bounded local scope | Accepted. |

## Decision

1. `C:\Users\jredj\dev\psdc` remains the workspace control and Obsidian knowledge
   root; product repositories remain independent siblings described by `repos.yaml`.
2. Obsidian notes and generated dashboards SHALL be navigation and explanation
   views. Normative authority remains, in order, accepted decisions and policies,
   contracts, owning specifications, and signed institution overlays.
3. The workspace SHALL grow a generated command center, repository/dependency
   catalog, authority map, evidence/readiness registry, contract explorer and
   governed agent-workspace index.
4. The common `psdc-agent-skills` repository owns reviewed PSDC adaptations,
   an upstream lock, license notices, policy and tests. Consuming repositories
   pin an immutable skill-pack commit. A versioned release remains a separate
   distribution gate. Institution-specific agent behavior belongs in thin
   institution overlays or forks.
5. The initial approved upstream candidates are setup, grill-with-docs,
   domain-modeling, to-spec, to-tickets, wayfinder, research and
   writing-for-agents. Code-review, diagnosing-bugs and TDD are deferred until
   implementation begins. Autonomous implementation skills remain disabled until
   their authority, branch, review and cross-repository behavior is tested.
6. No upstream source is approved for import until an immutable commit is pinned
   and its scripts, dependencies, licenses, network actions, file writes and issue
   tracker mutations pass provenance and security review.
7. PSDC adaptations SHALL enforce accepted-decision precedence, explicit evidence
   states, institution-neutral common fixtures, bounded repository scope,
   disclosed external mutations and provenance for generated artifacts.

## Consequences

The workspace becomes easier for humans and agents to navigate without merging
repositories. PSDC accepts maintenance of a small governed skill distribution and
must periodically reconcile upstream improvements. This ADR accepts the adoption
strategy. A separate provenance record must name the imported upstream revision
and checks actually performed; structural tests do not prove agent behavior or
authorize product implementation.

## Security, privacy and safety

Skills execute with the agent's available filesystem and network authority, so
they are supply-chain code even when expressed as Markdown instructions. A skill
must not read secrets, broaden scope, publish content, create remote artifacts or
launch subagents unless the invoking workflow authorizes that behavior. Review
bundles exclude protected conversations and institution data by default.

## Operations and economics

The common skills repository owns releases, compatibility tests and upstream
tracking. Each consuming repository records a pinned skill-pack version. The
workspace dashboard reports adoption and drift but does not modify repositories.

## Migration and rollback

Start with documentation-only skill adaptations in a disposable test repository.
Rollback removes the per-repository manifest and generated agent configuration;
normative PSDC documents remain unaffected. Upstream attribution and historical
provenance remain in Git history.

## Validation

- `ADR34-ACC-001`: the workspace graph resolves every repository to its owning remote and authority class.
- `ADR34-ACC-002`: a generated dashboard cannot change an accepted decision or contract.
- `ADR34-ACC-003`: a skill test proves it cannot write outside the declared repository set without explicit authorization.
- `ADR34-ACC-004`: the upstream lock records commit, retrieval date, license and content digest before import.
- `ADR34-ACC-005`: Codex and Claude steering files point to one compatible canonical policy and do not silently diverge.

## References and supersession

- [Workspace Knowledge and Agent Skills](../Workspace-Knowledge-and-Agent-Skills.md)
- [Matt Pocock Skills Adoption](../../open-source/Matt-Pocock-Skills-Adoption.md)
- [Repository and Obsidian Linking Model](../Repository-and-Obsidian-Linking-Model.md)

