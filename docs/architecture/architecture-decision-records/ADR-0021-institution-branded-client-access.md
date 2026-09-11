# ADR-0021: Clients Are Institution-Branded and Institution-Authenticated

> Status: Accepted
> Date: 2026-09-10
> Scope: Web, desktop, mobile, CLI and client distribution
> Decision owner: Project founder

## Context

Independent deployments need a coherent way to brand, configure, sign,
distribute and authenticate shared clients. Requiring an OpenWork, Happy or
Commons-wide hosted account would violate institution sovereignty.

## Decision

Shared client code is neutral. Each institution produces or approves a signed
deployment manifest and signed build containing its branding and public endpoint
configuration. Users enter through their institution's portal and authenticate
using Authorization Code + PKCE against the institution deployment's OIDC broker.

- No OpenWork, Happy, Algonquin or global PSDC account is required.
- Gateway, relay, update, support, privacy and optional social endpoints come from
  the signed deployment manifest.
- The manifest contains no privileged secret and has expiry, signature and
  rollback protection.
- Desktop packages use institution-controlled release/update infrastructure.
- Institutions may deploy the desktop client to managed campus endpoints and
  offer the same signed installers to users of supported personal computers.
- Desktop client installation, Session Host execution and Compute Fabric worker
  enrollment are distinct roles. Client installation never enrolls a device as a
  compute worker; volunteer compute requires separate explicit consent,
  attestation, limits and revocation.
- Mobile supports institution-built native apps and a self-hosted web companion.
- Apple App Store and Google Play are supported convenience channels but are not
  required for core access. No public-store release exists until an accountable
  publisher, signing process, privacy listing and release gate are complete.
- Native app-store, APNs or FCM integrations are optional operating-system edge
  adapters; core access and foreground/manual synchronization remain independent.
- Mobile pairs to an authorized local or institution-hosted Session Host using an
  expiring challenge and endpoint keys.
- Branding and deployment configuration do not require a permanent source fork.

## Consequences

Institutions can deliver coherent white-labelled applications while sharing
security and accessibility maintenance. Users trust their institution rather than
an upstream client vendor, and cross-institution accounts remain explicitly
separate unless linked through a scoped federation workflow.
