# GitHub Repository Governance

> Status: Active bootstrap baseline  
> Effective: 2026-09-11  
> Applies to: `Post-Secondary-Digital-Commons` and `Algonquin-Digital-Commons`

## Purpose

Repository settings are part of the platform's control plane. They determine who
can change protected history, how common work reaches an institution, and which
evidence must exist before a change merges. This baseline protects all 19 hosted
repositories while the project has one confirmed maintainer and no operational
self-hosted CI service.

## Current controls

| Control | Common repositories | Algonquin forks |
|---|---:|---:|
| Pull request required for `main` | Yes | Yes |
| Applies to administrators | Yes | Yes |
| Required approving reviews | 0, temporary | 0, temporary |
| Dismiss stale reviews | Yes | Yes |
| Resolve review conversations | Yes | Yes |
| Force-push protected `main` | No | No |
| Delete protected `main` | No | No |
| Delete merged topic branches | Yes | Yes |
| Linear history required | Yes | No |
| Merge commits enabled | No | Yes |
| Required status checks | Pending CI | Pending CI |

Zero required approvals does not mean review is unnecessary. It is a bootstrap
exception: GitHub does not allow a pull-request author to approve their own
change, and `RedjiJB` is presently the only confirmed maintainer. Once a second
authorized maintainer exists, require at least one approval and code-owner review.

## Why institution forks allow merge commits

An institution fork contains both common history and institution-only overlay
commits. After common `main` advances, rebasing the overlay would rewrite commits
already published by the institution and would require a force-push. Force-pushes
are deliberately prohibited.

The safe synchronization model is therefore:

```text
common main ─────────────── C2
       \                 /
institution main ── A1 ── M
```

`C2` is a new common commit, `A1` is an Algonquin overlay, and `M` is the reviewed
merge that joins both histories. Common repositories remain linear because they
do not carry an institution overlay.

## Change workflow

For a normal common change:

1. Branch from current common `main`.
2. Commit a coherent change with its tests and documentation.
3. Push the topic branch to common `origin`.
4. Open a pull request and resolve review conversations.
5. Merge by squash or rebase after required checks pass.

For an upstream synchronization into an institution fork:

1. Fetch both the institution `origin` and common `upstream`.
2. Branch from institution `main`.
3. Merge `upstream/main` into the synchronization branch without rewriting
   published institution commits.
4. Resolve conflicts in favor of neutral contracts plus explicit institution
   configuration; never copy another institution's private overlay.
5. Push the branch, open an institution pull request, run conformance checks, and
   merge with history preservation.

## Promotion gates

Before calling repository governance production-ready:

- appoint at least two maintainers in each governing organization;
- add repository or path-specific CODEOWNERS;
- require one independent approval and code-owner review;
- deploy self-hosted Woodpecker CI and require its stable status contexts;
- require contract, license, secret, security, accessibility, and provenance
  checks appropriate to each repository;
- define emergency access, audit review, maintainer departure, and compromised
  credential procedures;
- sign releases and publish verifiable SBOMs and provenance attestations; and
- test one complete common-to-Algonquin synchronization through pull requests.

## Failure modes

- Enabling one required approval with only one maintainer creates a governance
  deadlock rather than meaningful review.
- Requiring status contexts before a stable CI pipeline reports them makes every
  pull request unmergeable.
- Requiring linear history on a diverged institution fork encourages unsafe
  force-pushes or destroys visible common ancestry.
- Allowing merge commits in common repositories makes release history harder to
  audit without providing a synchronization benefit.
- Treating settings as documentation only permits GitHub configuration drift;
  the future governance check must compare live API state with the manifest.
