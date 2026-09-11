# ADR-0024: Apache-2.0 with Upstream-First Contribution Policy

> Status: Accepted
> Date: 2026-09-11
> Scope: PSDC-authored code, configuration and documentation
> Decision owner: Project founder; legal review required before public release

## Context

The project requires a permissive open-source license while strongly preferring
that improvements, especially commercially funded improvements, return to the
Commons. A permissive OSI license cannot compel every user or business to publish
or contribute modifications. Adding such a condition would no longer be a
permissive license and could make a custom license non-open-source.

## Decision

- License new PSDC-authored code, configuration and documentation under
  Apache License 2.0 by default.
- Preserve the original license, copyright and notices for imported MIT, BSD,
  Apache or other approved upstream material. Do not relicense third-party work.
- Require modified distributed files to retain the notices required by their
  licenses and maintain a generated third-party notice inventory.
- Use Developer Certificate of Origin sign-off for accepted contributions.
- Adopt an upstream-first contribution policy for every institution fork.
- Require organizations receiving official certification, consortium membership,
  shared release infrastructure, trademarks or paid project support to agree
  separately to offer generally useful improvements upstream. This participation
  agreement supplements but does not alter the public Apache-2.0 license.
- Ask unaffiliated commercial users to contribute improvements upstream and report
  security issues, while accurately stating that this request is not a license
  condition.

If mandatory network-use reciprocity becomes more important than permissiveness,
the project may evaluate AGPL-3.0-or-later for selected server repositories in a
future legal and compatibility ADR. MPL-2.0 may be evaluated for file-level
distribution reciprocity. Neither is the current default.

## Consequences

- Businesses may legally use and privately modify Apache-2.0 code without sending
  changes back unless a separate agreement applies.
- The project gains explicit patent protection, attribution/notice requirements
  and broad reuse rights without vendor-use restrictions.
- Upstream contribution is enforced through fork governance, certification,
  consortium and support agreements—not through a misleading custom addendum to
  the permissive license.
- Every repository must carry `LICENSE`, `NOTICE`, `CONTRIBUTING.md` and a
  third-party license inventory before public release.

