# Repository and Obsidian Linking Model

> Status: Normative polyrepo and vault model
> Governing decisions: ADR-0022, ADR-0023
> Last reviewed: 2026-09-11

## Source-of-truth model

The ecosystem is a collection of independent Git repositories, not a grand
monorepo. The `psdc-workspace` checkout root is a lightweight coordinator and Obsidian
vault containing repository metadata and maps only. Product and architecture
content remains canonical in its owning repository.

Neutral upstream checkouts live under `common/`; institution forks live under
`institutions/<institution>/`. The workspace manifest records organization role,
repository slug, fork counterpart, remote, local checkout directory,
default branch and optional contract compatibility version. Bootstrap tooling may
clone or update repositories, but the workspace repository must ignore their
checkout directories and must never commit nested product source.

## Ownership

- `psdc-architecture` owns constitutional architecture, cross-system contracts,
  dependency rules, governance, human decisions and conformance profiles.
- Each fabric repository owns its implementation architecture, code,
  infrastructure, security evidence, runbooks and releases.
- `psdc-web`, `psdc-desktop`, and `psdc-mobile` own their separate upstream
  provenance, downstream patches, product releases and store/package pipelines.
- Each institution deployment repository owns only local configuration, branding,
  policy overlays, environment composition and operational evidence.
- `psdc-workspace` owns navigation and developer checkout metadata, never runtime
  code or deployment secrets.

Every institution repository uses `origin` for its institution-owned GitHub fork
and `upstream` for the corresponding Commons repository. GitHub organization
separation is implemented as a repository-by-repository fork map because GitHub
does not fork an organization as one object.

## Cross-repository links

Canonical documents identify another source as
`<repository-slug>:<path>@<released-version>`. Web links use the configured forge
remote. Obsidian maps may additionally link to sibling local checkouts, but those
links are conveniences and cannot be the sole reference.

Shared contracts are consumed from signed releases or OCI/package registries,
not copied between repositories. A compatibility manifest states tested contract
and component versions for each institution release.

## Product-local workspaces

A repository may use pnpm, Cargo, Go, Python or another package workspace for
tightly coupled packages that share ownership and a release train. The Happy-style
pattern is appropriate inside `psdc-mobile`; it is not a reason to place
Cloud, AI, Compute, Media and Social into one Git history.

## Obsidian portability

The parent workspace directory can be opened as one Obsidian vault so users can
navigate all checked-out repositories. Markdown and Git remain canonical, no
Obsidian plugin is required, and repository READMEs remain usable when cloned
alone. The vault configuration contains no product source or secrets.

## Migration

The former `Algonquin` grand-monorepo is preserved read-only as migration source
until histories, licenses, links, contract releases and independent CI checks are
verified. New implementation work begins in the independent repositories.
