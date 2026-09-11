# ADR-0009: Bootstrap Algonquin AI Web from the Open WebUI v0.6.5 BSD Baseline

> Status: Accepted
> Date: 2026-09-10
> Scope: AC AI web client
> Decision owner: Project founder; license plan requires institutional legal review

## Context

The preferred initial interaction and landing-page experience resembles Open
WebUI, but the platform requires OSI-approved software, institutional rebranding,
and independence from vendor licensing. Open WebUI documents that code through
v0.6.5 remains BSD-3-Clause while v0.6.6 and later uses a non-OSI-approved license
with branding restrictions.

The web client must also grow beyond generic chat into Algonquin-specific Study,
Work, Code, Campus, course, agent, notification, and student-service experiences.

## Decision

The architectural component is `psdc-ai/apps/web`, named for its role rather
than an upstream implementation.

Its preferred bootstrap foundation is the BSD-3-Clause Open WebUI v0.6.5 source.
The import is a one-time, provenance-controlled source baseline from an immutable
tag and commit verified before code is copied. The result is developed as
**Algonquin AI Web**, not as a continuously synchronized Open WebUI downstream.

The implementation must:

- retain all BSD-3-Clause copyright and license notices required by the baseline;
- record the exact source URL, tag, commit, checksums, import date, file inventory,
  dependency lockfiles, and initial SBOM;
- keep third-party attribution visible in source distributions and an appropriate
  licenses/about surface without representing Open WebUI endorsement;
- license Algonquin-authored changes under the project license selected through
  the governance register, subject to compatibility review;
- connect only to Commons AI gateway contracts and never directly to model runtimes,
  identity providers, academic providers, or infrastructure services;
- evolve toward an Algonquin-native information architecture and design system;
- remain replaceable by another client without changing gateway or domain APIs.

Code, assets, patches, or generated artifacts from Open WebUI after the v0.6.5
license boundary must not be copied, merged, cherry-picked, or used as an upstream
source without file-level license review and an approved ADR. Later releases may
be used for protocol interoperability testing without becoming a dependency.

## Alternatives

- **LibreChat:** retain as an OSI-license and maintainability fallback candidate;
  verify the exact release and transitive dependency licenses before selection.
- **Algonquin-native client from zero:** long-term architectural direction, but a
  slower initial path.
- **Open WebUI v0.6.6+:** rejected as the default because the required release
  license is not OSI-approved and conflicts with institution-scale rebranding.

## Implementation gates

No source import or production deployment occurs until:

1. legal confirms the exact tag/commit and attribution plan;
2. security reviews the frozen baseline and dependency age;
3. maintainers accept responsibility for backports, browser changes,
   accessibility, dependencies, and vulnerability response;
4. the project code and documentation licenses are selected;
5. the web-client contract and replacement tests are defined.

## Consequences

- The desired initial experience can be preserved without accepting the current
  non-OSI license.
- Upstream security and feature updates cannot be merged casually; Algonquin owns
  maintenance and independent implementation after the baseline.
- The proportion of inherited code may decline naturally as native Study, Work,
  Code, and Campus experiences replace generic components.
- Failing a gate above changes the preferred implementation to another eligible
  client or an Algonquin-native build; it does not change the gateway architecture.

## References

- [Open WebUI license explanation](https://docs.openwebui.com/license/)
- [Open WebUI license notice](https://github.com/open-webui/open-webui/blob/main/LICENSE_NOTICE)

