# Identity Provider Contract

> Status: Normative architecture contract
> Governing decisions: ADR-0002, ADR-0008, ADR-0010

## Purpose

Keep applications independent of identity vendors while preserving
College-authoritative identity for institutional production users.

## Roles

| Role | Responsibility |
|---|---|
| Identity authority | Owns the person's institutional lifecycle and assurance; College-approved IdP in production |
| Identity broker | Performs OIDC/OAuth/SAML brokering and normalized claim mapping; expected implementation is Keycloak |
| Identity adapter | Terminates provider-specific configuration, tokens, claims, identifiers and errors |
| Policy service | Converts normalized identity plus resource context into authorization decisions |
| Application | Consumes normalized subject, roles, scopes and assurance only |

The broker is not automatically the authority. Local/test authorities are valid
only for development, CI, demonstrations, and explicitly standalone deployments.

## Minimum normalized subject

```text
IdentitySubject
  subject_id             opaque platform identifier
  issuer_id              normalized authority reference
  subject_type           human | workload | device
  affiliations[]         student | faculty | staff | researcher | affiliate
  groups[]               approved normalized group references
  roles[]                coarse platform roles
  scopes[]               delegated capabilities
  assurance              authentication method and assurance class
  tenant                  institutional or standalone tenant reference
  issued_at / expires_at
```

Email addresses, provider tenant IDs, Entra object IDs, and provider group names
are adapter inputs, not durable cross-system identifiers.

## Required operations

- authenticate through standards-based browser or device flows;
- normalize a validated identity assertion;
- refresh or terminate a session according to policy;
- resolve approved lifecycle/affiliation changes;
- expose provider health without leaking credentials;
- revoke sessions and mappings after compromise or offboarding.

## Implementations

- **Production institutional:** College-approved OIDC/OAuth authority, expected to
  be Microsoft Entra, through the institutional adapter.
- **Development/CI:** self-hosted Keycloak test realm or deterministic test
  adapter containing synthetic identities only.
- **Workloads/devices:** separately governed certificates or short-lived tokens;
  never impersonate a human authority.

## Failure contract

When the production authority is unavailable, new institutional login reports a
clear upstream outage. Existing sessions follow expiry and risk policy. The system
must not silently fall back to local student accounts or weaken assurance.

## Prohibited coupling

- clients calling Entra directly;
- authorization based on raw provider group names outside the adapter;
- production institutional accounts stored in the development realm;
- treating public Fediverse identity as institutional identity without explicit,
  revocable linking.
