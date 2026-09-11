# Ecosystem Implementation Readiness — 2026-09-11

> Status: Architecture and scope complete; implementation not started
> Repository scope: one workspace, ten common products, ten Algonquin forks

## Executive finding

The ecosystem has crossed the architecture baseline. It now has a normative
polyrepo topology, client and fabric boundaries, open-source technology defaults,
versioned contract profiles, institution-fork model, GitHub governance, security
requirements, release gates, operational requirements and acceptance criteria.
The next work is implementation evidence, not additional horizontal architecture.

No document should claim that the platform is deployed. Completion here means the
team can start implementation without making an unrecorded architecture choice.
Measured capacity, exact environment values, institutional registrations, threat
reviews, build evidence and releases are produced by the gates already specified.

## Documentation readiness

| Area | State | Governing result |
|---|---|---|
| Constitutional vision | Complete | Institution sovereignty, open standards, federation locality and user rights are normative |
| Repository ownership | Complete | Ten common products, ten Algonquin forks and a workspace coordinator |
| Web client | Complete specification | Independent browser/PWA repository, BFF boundary, feature scope, security and release model |
| Desktop client | Complete specification | OpenWork-eligible boundary, Session Host, local sandbox, distribution and provenance gate |
| Mobile client | Complete specification | Happy-eligible boundary, encrypted relay, device lifecycle, stores and portable distribution |
| Cloud, AI, compute, media and social | Complete specifications | Interfaces, data, security, failure, operations and acceptance criteria defined |
| Shared contracts | Version 1 architecture profiles | Identity, academic, events, ActivityPub, spatial, AI, sessions, deployment, compute and media |
| Technology stack | Complete decision | Open-source self-hosted defaults and replacement paths recorded |
| Human choices | Defaults accepted | Future changes use ADRs; site values use signed institution deployment manifests |
| GitHub governance | Active | Protected main, deny-by-default membership, security features and mandatory organization 2FA |
| CI and release gates | Complete specification | Woodpecker, open-source scanners, signing, provenance, SBOM and evidence requirements defined |
| Operations and reliability | Complete specification | Ownership, telemetry, incident, backup, recovery, capacity and runbook requirements defined |

## Implementation work authorized by the specifications

The following are execution work, not documentation gaps:

1. deploy a self-hosted Woodpecker server and isolated agents;
2. implement documentation, contract, secret, dependency, license and security checks;
3. implement the identity broker, policy service and AI gateway vertical slice;
4. configure PostgreSQL, Valkey, S3-compatible storage and OpenTelemetry services;
5. implement PSDC Web against the common contracts and produce its provenance evidence;
6. implement desktop Session Host and mobile content-blind Session Relay integration;
7. create signed Algonquin branding, identity, endpoint, residency and policy manifests;
8. perform the campus hardware census and run a non-disruptive compute pilot;
9. deploy controlled media and ActivityPub federation pilots;
10. produce tests, threat models, privacy assessments, capacity measurements,
    accessibility evidence, recovery evidence, SBOMs, signatures and runbooks;
11. add a second accountable maintainer and then activate one independent approval
    and required code-owner review.

## Dependency-ordered implementation sequence

```text
governance and self-hosted CI
          |
identity + policy + contracts
          |
AI gateway + local inference + telemetry
          |
PSDC Web vertical slice
          |
desktop host + mobile relay
          |
academic and campus adapters
          |
compute, media and social pilots
          |
cross-institution conformance and federation
```

## Readiness boundary

Architecture is considered complete for implementation because every capability
has a defined owner, scope, contract boundary, data and security policy, failure
model, open-source default, acceptance gate and change process. Production
readiness cannot be claimed until the corresponding implementation evidence exists.
