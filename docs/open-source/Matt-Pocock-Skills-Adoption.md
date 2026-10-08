# Matt Pocock Skills Adoption

> Standard: PSDC-DOC-001
> Document type: provenance-record
> Status: Initial import recorded; behavioral review open
> Owner: PSDC Developer Experience Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0001, ADR-0008, ADR-0034

> Import state: reviewed upstream subset imported into the common skill pack; product implementation remains gated.

## Purpose and upstream

Upstream is `https://github.com/mattpocock/skills`, advertised as small,
adaptable, composable agent engineering skills and licensed MIT. PSDC intends to
adapt selected workflow concepts rather than subscribe every repository to an
unreviewed mutable bundle.

## Commit, tag and license

The common [`psdc-agent-skills`](https://github.com/Post-Secondary-Digital-Commons/psdc-agent-skills)
repository pins `mattpocock/skills` commit
`f3fc5632f401156837ee3872f14fe33ccf1024ea` in its skill registry. Its
`config/upstream-files.sha256` records included-file digests, and
`THIRD_PARTY_NOTICES.md` carries MIT attribution. Consumer repositories pin the
common skill-pack commit separately. These records establish provenance and
structural adoption, not behavioral confinement of a future agent invocation.

## Included and excluded paths

Included paths are limited to the approved candidate skills and required license
or documentation files. Plugins, marketplace packaging, unrelated skills,
newsletter assets, release automation and unreviewed scripts are excluded by
default.

## Approved candidate scope

Initial candidates are `setup-matt-pocock-skills`, `grill-with-docs`,
`domain-modeling`, `to-spec`, `to-tickets`, `wayfinder`, `research` and
`writing-for-agents`. `code-review`, `diagnosing-bugs` and `tdd` are deferred to
implementation. `implement` and `implement-spec` are disabled until explicit
tests prove branch, authority, subagent, review and cross-repository boundaries.

## Required PSDC adaptations

- accepted decisions can be challenged only through a superseding ADR;
- proposal, documentation, contract, test, implementation, deployment and production evidence remain separate;
- common artifacts stay institution-neutral;
- each invocation declares repository and external-write scope;
- remote issues, PRs and messages are disclosed mutations;
- generated artifacts record sources, commit, model/tool and review status;
- Codex and Claude configuration point to one canonical PSDC policy;
- skills use a pinned manifest, never an implicit `latest` in governed automation.

PSDC adaptations MUST preserve upstream attribution, MUST pass the declared scope
tests and MUST NOT enable an excluded skill merely because it exists upstream.

## Provenance and security gate

For each new or updated import, record commit, tag, retrieval date, tree digest, MIT notice,
included paths, excluded paths, script/dependency inventory, network behavior,
filesystem writes, issue-tracker behavior, model/subagent invocation, security
review, test results, local modifications, update cadence, patch budget and exit
procedure. Test in a disposable repository with fake remotes and canary files
outside the allowed root.

## Acceptance criteria

- `SKILL-ACC-001`: provenance manifest reproduces the reviewed upstream tree.
- `SKILL-ACC-002`: scope test fails the skill when it attempts an undeclared sibling write.
- `SKILL-ACC-003`: a decision-conflict test produces an ADR proposal instead of modifying an accepted rule.
- `SKILL-ACC-004`: remote mutation is blocked without explicit workflow authority.
- `SKILL-ACC-005`: attribution and license notices survive redistribution and modification.

## References

- [ADR-0034](../architecture/architecture-decision-records/ADR-0034-governed-agent-skills-and-workspace-knowledge-plane.md)
- [Workspace Knowledge and Agent Skills Architecture](../architecture/Workspace-Knowledge-and-Agent-Skills.md)
