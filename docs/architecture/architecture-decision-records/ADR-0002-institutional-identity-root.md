# ADR-0002: Institutional Identity Is the Root of Access

> Status: Accepted
> Scope: Institutional users and services

## Context

Creating separate Algonquin AI or platform usernames and passwords would duplicate
identity lifecycle, weaken offboarding and MFA, and fragment authorization.

## Decision

Microsoft Entra and Algonquin institutional SSO remain the root for institutional
human identity. Applications use OIDC/OAuth flows and scopes, then map normalized
claims into local authorization. Headless clients use an approved device flow.
Workload and service identities use standard machine-to-machine mechanisms and
remain distinct from human sessions.

As clarified by
[ADR-0010](./ADR-0010-provider-neutral-core-institutional-production-authority.md),
Entra is the expected College-approved upstream for production institutional
users but is not embedded as the platform's internal identity contract. A
self-hosted open-source broker provides protocol brokering and claim normalization;
it does not replace the College as identity authority. Development, CI,
demonstration, and standalone environments use approved local/test identities.

Public Fediverse identity remains explicitly separated from institutional identity
unless a user performs a policy-approved account link.

## Consequences

- No platform-native password database for institutional users.
- The identity broker normalizes tenants and claims without becoming the source of
  institutional truth.
- RBAC/ABAC decisions are local policy decisions built on normalized identity.
- Identity outage and token compromise require documented degraded modes and
  incident procedures.
- The institutional adapter can be disabled or replaced without changing internal
  identity contracts, but institutional production login then becomes unavailable.
- Local/test accounts cannot be promoted into a parallel production account system
  for students, faculty, or staff.
