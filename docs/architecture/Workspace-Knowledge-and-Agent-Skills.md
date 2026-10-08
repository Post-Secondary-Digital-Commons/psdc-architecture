# Workspace Knowledge and Agent Skills Architecture

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Developer Experience Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0022, ADR-0023, ADR-0034

## Purpose and context

The PSDC workspace root is an Obsidian-compatible human knowledge plane and a
machine-readable control plane over independent repositories. It provides maps,
status and agent guidance without merging product ownership or making generated
notes authoritative.

## Scope and out of scope

The scope is workspace navigation, catalogs, evidence views and agent workflow
configuration. Product source, shared runtime databases, secrets and institution
deployment values are out of scope and MUST remain in their owning repositories.

## Authority and component model

```text
accepted ADRs/register/policies
        -> contracts
        -> owning specifications
        -> signed institution overlays
        -> generated maps/dashboards
        -> personal working notes
```

`repos.yaml` catalogs repositories and dependencies. The Platform Home links the
current state. Generated views include repository/dependency catalog, authority
map, evidence/readiness registry, contract explorer, documentation debt and
active vertical slices. `psdc-agent-skills` owns pinned, tested common agent
workflows; repositories consume a versioned manifest rather than mutable latest.

## Requirements

- `WS-KNOW-001`: every catalog entry MUST identify repository, authority class, owner, interfaces, dependencies, lifecycle/evidence state and institution overlays.
- `WS-KNOW-002`: generated pages MUST identify their source files, commit and generation time and MUST NOT introduce normative requirements.
- `WS-KNOW-003`: product repositories MUST remain independently clonable, testable, releasable and operable.
- `WS-KNOW-004`: a skill invocation MUST declare its repository set and external mutation authority before writing.
- `WS-KNOW-005`: accepted decisions, observed evidence, inference and proposal MUST remain visibly distinct in agent outputs and registers.
- `WS-KNOW-006`: common skills MUST use institution-neutral examples; institution values live in overlays.

## Workspace products

| Product | Source | Output | Authority |
|---|---|---|---|
| command center | repos, Git, validators and decision register | current dashboard | derived |
| dependency catalog | `repos.yaml` and owning contracts | graph and tables | derived map |
| authority map | ADRs, policies and repository owners | precedence/navigation | derived map |
| evidence registry | test and review manifests | readiness claims with provenance | evidence index |
| contract explorer | schemas, APIs, events and fixtures | concept-to-contract navigation | derived |
| agent workspace | pinned skills and policy | repeatable agent workflows | governed tool configuration |

## Interfaces and dependencies

The workspace reads `repos.yaml`, Git metadata, validator reports, contracts and
document control blocks through read-only generators. Repository-local manifests
declare a skill-pack version. No product depends at runtime on Obsidian or a
generated dashboard.

## Deployment, capacity and scaling

The knowledge plane is a local/static workspace product and MAY be published as a
sanitized static site. Generators use bounded parallel reads and cache only
rebuildable indexes. Growth is managed by repository/domain maps rather than one
fully loaded graph.

## Failure, privacy and recovery

A stale dashboard is marked stale rather than silently reused. Missing repository
or detached remote is an explicit error. Personal notes and chat exports are
excluded from generated public bundles unless selected and reviewed. The
workspace can be reconstructed from `repos.yaml`, Git remotes and repository
sources; `.obsidian/workspace.json` is convenience state, not critical data.

## Testing and acceptance

- `WS-KNOW-ACC-001`: every catalogued repository resolves to one verified root and remote.
- `WS-KNOW-ACC-002`: links from Platform Home and generated maps resolve.
- `WS-KNOW-ACC-003`: changing a generated page cannot change a contract or accepted decision.
- `WS-KNOW-ACC-004`: evidence labels prevent a documented-only capability from appearing implemented.
- `WS-KNOW-ACC-005`: a bounded skill cannot mutate an undeclared sibling repository.

## References

- [ADR-0034](./architecture-decision-records/ADR-0034-governed-agent-skills-and-workspace-knowledge-plane.md)
- [Repository and Obsidian Linking Model](./Repository-and-Obsidian-Linking-Model.md)
