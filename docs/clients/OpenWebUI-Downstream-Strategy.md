# Open WebUI Baseline and License Boundary

> Status: Normative supporting policy for ADR-0009
> Domain: clients
> Owner: Commons AI Fabric client team and open-source review
> Last reviewed: 2026-09-10

## Purpose

Define the exact boundary between the preferred BSD-licensed source scaffold and
later Open WebUI material that the platform may not consume under its
open-source-only policy.

## Accepted use

- Open WebUI v0.6.5 is the preferred initial source foundation for `psdc-web`.
- The exact tag, immutable commit and eligible file inventory are verified in the
  implementation import pull request before source enters repository history.
- Required BSD notices, copyright, attribution, dependency licenses, and file
  provenance remain preserved.
- PSDC Web evolves independently and talks only to Commons AI gateway APIs.

## Prohibited use

- Do not configure current Open WebUI as a core production dependency.
- Do not merge, cherry-pick, copy, or mechanically reproduce post-v0.6.5 code or
  assets without a new file-level license review and approved ADR.
- Do not imply endorsement by the Open WebUI project.
- Do not use an enterprise license to bypass ADR-0008 without superseding it.

## Compatibility and observation

Current releases may be exercised as external clients against the documented
OpenAI-compatible API. Interoperability tests may observe requests and responses;
they do not make current source or assets available for reuse.

## Maintenance implication

The v0.6.5 baseline is frozen. The PSDC Web team owns security fixes, dependency updates,
browser compatibility, accessibility, and feature work. LibreChat or a native
client remains the exit path if that burden becomes unsafe or unsustainable.

## Settled architecture constraints

- Clients consume shared platform APIs and do not implement provider, identity,
  policy, academic, compute, or storage integrations independently.
- Open WebUI v0.6.6+ remains compatibility-only.
- ADR-0009 governs source provenance and native evolution.
- Any exception requires evidence, license review, an owner, and a superseding ADR.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0006: Thin, Upstream-Compatible Product Forks
- ADR-0008: Open-Source, Self-Hosted Core
- ADR-0009: PSDC Web Foundation

## References

- [PSDC Web Foundation](./PSDC-Web-Foundation.md)
- `psdc-web:docs/upstream/Open-WebUI-Provenance-Policy.md`
- [Open WebUI license explanation](https://docs.openwebui.com/license/)
- [Open WebUI license notice](https://github.com/open-webui/open-webui/blob/main/LICENSE_NOTICE)
