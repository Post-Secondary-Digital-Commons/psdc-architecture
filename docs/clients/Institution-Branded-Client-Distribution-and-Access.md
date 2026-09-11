# Institution-Branded Client Distribution and Access

> Status: Normative distribution architecture; implementation gated
> Applies to: OpenWork-derived desktop, Happy-derived mobile and web companion
> Governing decisions: ADR-0002, ADR-0008, ADR-0018, ADR-0019, ADR-0020, ADR-0021

## Access model

Users do not create OpenWork, Happy or PSDC-wide vendor accounts. They start at
their institution's portal, download that institution's signed client, and sign in
through its OIDC provider. The client talks only to that deployment's endpoints.

```text
institution portal / software catalogue
              |
      signed deployment manifest
              |
   +----------+-----------+
   |                      |
desktop build          mobile build/PWA
   |                      |
institution OIDC      institution OIDC
   |                      |
AI Gateway      Session Relay / pairing
   +---------- Session Host --------+
```

## Signed deployment manifest

One signed, versioned manifest configures a neutral client build with:

- institution and product display names, logos, colours and accessibility theme;
- portal, support, privacy, terms and incident-reporting URLs;
- OIDC issuer, client IDs, redirect URIs and requested scopes;
- AI Gateway, Session Relay, update feed and optional social endpoints;
- allowed federation profile and data-residency region;
- feature flags, tool/permission modes and classification policy reference;
- signing-key identifiers, manifest expiry and rollback version; and
- push wake profile with no content-bearing payloads.

The binary contains no privileged secret. It verifies the manifest using a pinned
institution/deployment trust root and refuses expired, incorrectly scoped or
downgraded manifests.

The draft machine-readable shape is
[Institution Deployment Manifest](../../contracts/deployment/deployment-manifest.schema.json).

## Desktop journey

1. The user visits `ai.<institution-domain>` or its software catalogue.
2. They install an institution-signed Windows, macOS or Linux OpenWork-derived
   build; managed labs and staff workstations may receive it through institutional
   endpoint management, while students and staff may download the same signed
   package for a supported personal computer.
3. First launch loads/verifies the deployment manifest and opens Authorization
   Code + PKCE login in the system browser.
4. The deployment issues bounded user/device tokens; no upstream OpenWork account
   is created.
5. The user explicitly grants a workspace folder. The local Session Host starts
   with that root, advertised capabilities and local policy.
6. Models appear as institution-defined aliases and all inference routes through
   the local AI Gateway.
7. Updates come from an institution-controlled signed feed with rollback.

Desktop remains usable for permitted local work when the federation network or
mobile relay is unavailable.

## Campus fleet and personal-device distribution

Desktop access is intended to be propagated across authorized campus machines,
but it is a different role from a Commons Compute Fabric worker:

| Role | Installed where | Purpose | Compute-fabric participation |
|---|---|---|---|
| Desktop client | Managed labs, classrooms, staff devices and personal computers | Interactive AI and agent workspace | None by default |
| Session Host | With the desktop client or on an institution host | Executes the user's explicitly authorized local tools | Does not contribute general capacity |
| Compute worker | Only on institution-approved nodes | Runs scheduled fabric workloads | Explicit enrollment, attestation and policy required |

An institution may publish the desktop package through its normal endpoint
management system for automatic installation and updates. Open-source deployment
paths include Ansible, WAPT, Munki, WinGet/Chocolatey-compatible repositories and
Linux package repositories; an institution may also use an already-approved
device-management system without making it a Commons dependency.

For personal devices, the institution portal provides signed installers and
checksums for Windows, macOS and Linux, with an optional self-hosted package
repository. Installation does not grant administrative, filesystem or compute
worker privileges. The user grants workspace roots and tool permissions after
login, and may remove the client and revoke the device from the portal.

A personal machine may join the Compute Fabric only through a separate,
conspicuous, opt-in volunteer-compute enrollment. That enrollment uses a distinct
package/service, consent record, device identity, resource limits, pause/exit
controls and revocation path. It is never bundled silently with desktop access.

## Mobile journey

1. The user installs the institution-branded Happy-derived iOS/Android app from
   an approved app-store listing or institution distribution channel, or opens
   its self-hosted progressive web companion.
2. The app verifies the same deployment manifest and signs in through institution
   OIDC; no Happy account is created.
3. The user scans a short-lived QR code from desktop or chooses an authorized
   institution-hosted session.
4. Endpoint keys are established; the institution Session Relay transports
   ciphertext and cannot read the session.
5. The phone can observe, message, interrupt and make bounded permission decisions
   according to local policy. The Session Host remains execution authority.
6. Device loss triggers local revocation and affected session-key rotation.

Self-hosted ntfy/UnifiedPush is preferred where supported. APNs/FCM are optional
opaque wake adapters. Standard iOS native distribution/signing can introduce an
Apple dependency; the self-hosted web companion and foreground/manual sync remain
the vendor-independent access path.

## Mobile publication channels

The release target supports Apple App Store and Google Play publication, but no
Commons mobile build has yet been published. Each listing must identify the
institution or an accountable Commons consortium publisher, link the deployment's
privacy/support pages, and ship the same open-source client with manifest-selected
branding and endpoints. A single neutral multi-institution app may be offered
later, but it must discover only signed deployment manifests and cannot create a
global account.

Public stores are convenience channels, not architectural dependencies. The
portable access set is:

- self-hosted installable PWA for iOS, Android and desktop browsers;
- reproducible Android APK plus optional F-Droid-compatible repository; and
- foreground/manual synchronization when proprietary push is unavailable.

Apple App Store and Google Play accounts, signing, review and optional APNs/FCM
are external distribution adapters. Store removal must not prevent browser/PWA
access or operation of the institution-hosted services. iOS native installation
outside Apple's permitted channels remains an operating-system constraint rather
than a capability the Commons can guarantee.

## White-label implementation boundary

Branding is configuration and institution-owned assets, not long-lived source
forks for every school. Shared UI behavior, security fixes and accessibility stay
upstream in the PSDC client code. Institution-specific integrations use adapters
and deployment manifests. A source fork is reserved for genuine product-policy or
platform differences and must retain contract conformance.

Code-license compliance does not grant upstream trademarks. Institution builds
use approved local product names and assets, preserve required copyright/license
attribution in source and About/Notices surfaces, and do not imply endorsement by
OpenWork or Happy.

## Multi-institution users

A user chooses a home deployment and may add another institution only through an
explicit account/link invitation. Tokens, device registrations, session keys and
workspaces remain scoped to one deployment. Federation does not merge accounts or
create a global identity.
