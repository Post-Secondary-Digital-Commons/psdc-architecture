# Repository Access and Onboarding Policy

> Status: Active bootstrap policy  
> Effective: 2026-09-11  
> Applies to: Both PSDC GitHub organizations

## Principle

Joining a club is not equivalent to receiving write access. Public repositories
already let anyone read, fork, propose changes, and participate in public review.
Privileges are added only when a role requires them, for the shortest practical
duration, and without bypassing protected branches.

## Access model

| Person or team | GitHub access | Can push repository branches? | Can update protected `main`? | Intended use |
|---|---|---:|---:|---|
| Public participant | Public read/fork | Only in personal fork | No | Learn, test, report issues, submit pull requests |
| Organization member with no team | No additional organization grant | No | No | Membership identity only |
| `Club Members` team | Triage | No | No | Manage issues, labels, milestones and pull-request coordination |
| Trusted contributor | Prefer personal fork; temporary write only when justified | If explicitly granted | No | Sustained implementation without merge authority |
| `Maintainers` team | Maintain | Yes, except protected refs | No during bootstrap | Repository operations and review preparation |
| `RedjiJB` | Organization owner and allowed protected-branch actor | Yes through pull requests | Yes through pull requests | Bootstrap governance authority |

Do not give a student, volunteer, vendor, or ordinary club participant the
organization Owner role. Do not use repository Admin as a substitute for a
missing workflow. Do not add a person to `Maintainers` merely so they can clone a
public repository.

## Onboarding procedure

1. Confirm the person's identity and institutional or community relationship.
2. Require two-factor authentication before organization membership.
3. Start with public participation or the `Club Members` triage team.
4. Have code contributors work from personal forks and pull requests whenever
   possible; this needs no organization write permission.
5. Grant temporary repository-specific write only when personal forks cannot
   support a documented workflow.
6. Promote to `Maintainers` only after sustained contribution, security training,
   license/provenance understanding, and explicit owner approval.
7. Record who approved elevated access, its purpose, scope and review date.
8. Review membership and elevated access at least once per academic term.

## Protected-branch authority

During the single-owner bootstrap phase, only `RedjiJB` is in the protected-main
push restriction. A maintainer may prepare and review work but cannot merge it.
This prevents a newly added or compromised maintainer account from replacing
canonical history.

When a second accountable maintainer is appointed:

1. verify 2FA and recovery procedures;
2. add both accountable maintainers to a dedicated protected-branch team;
3. require one approval and code-owner review;
4. prohibit the pull-request author from supplying the decisive approval;
5. add stable self-hosted CI status checks; and
6. test ordinary change, emergency recovery and maintainer-removal scenarios.

## Security and content controls

All current repositories use secret scanning and push protection, dependency
vulnerability alerts, automated security fixes, private vulnerability reporting,
web commit signoff, protected `main`, and disabled repository wikis. Security
reports containing exploit details or personal information must use private
vulnerability reporting rather than a public issue.

These controls reduce risk but do not replace human review. Push protection can
miss novel credentials, dependency automation can propose unsafe upgrades, and a
repository owner can still perform high-impact administrative actions.

## Offboarding and incident response

When access is no longer required or an account may be compromised:

1. remove the person from elevated teams immediately;
2. remove repository-specific grants and active invitations;
3. revoke deploy, signing, package, runner and environment credentials outside
   GitHub as separate actions;
4. inspect audit logs, branches, tags, releases, webhooks, applications and recent
   permission changes;
5. rotate any secret the account could access;
6. review unmerged and recently merged work; and
7. record the incident or routine offboarding outcome without exposing protected
   personal or security data.

Removing GitHub membership alone does not revoke credentials copied to another
system. Offboarding is complete only when every trust boundary has been checked.

## Current exceptions and gaps

- `RedjiJB` is the only accountable maintainer, so an independent approval is not
  yet technically enforceable without blocking owner-authored changes.
- CODEOWNERS and required code-owner review remain pending a second maintainer and
  final path ownership assignments.
- Self-hosted CI status checks and signed releases are not implemented.
- Organization-wide 2FA enforcement must be enabled and verified in the GitHub
  settings UI even though the current audit found no member with 2FA disabled.
- Protected release-tag and environment-deployment policies remain to be defined
  before publishing executable artifacts.
