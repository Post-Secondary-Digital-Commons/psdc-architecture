# Commercial and Institutional Upstream Contribution Policy

> Status: Accepted project policy; participation agreement language requires legal review
> Governing decision: ADR-0024

PSDC is permissively licensed so institutions, researchers, students and
businesses can adopt it without a mandatory vendor relationship. The project asks
all downstream users to return reusable fixes, security improvements,
accessibility work, integrations and performance improvements to the owning
Commons repository.

## Required for recognized participants

An organization seeking official PSDC certification, consortium membership,
shared release infrastructure, use of Commons certification marks or paid project
support must sign a separate participation agreement requiring it to:

1. identify generally useful modifications;
2. offer those modifications upstream under the repository's inbound license;
3. provide reproducible tests and required security information;
4. disclose incompatible private patches in its compatibility report; and
5. preserve confidential institutional data and secrets when contributing.

This obligation comes from the participation agreement, not the Apache-2.0 public
license. General users who have not signed such an agreement are strongly
encouraged—but not legally compelled—to contribute modifications.

## Fork policy

- Prefer an upstream issue/design proposal before implementation.
- Keep branding, domains, IdP/LMS mappings and local policy in the institution
  deployment repository.
- Maintain a documented downstream patch queue and maximum divergence budget.
- Never send student records, credentials, private configuration or other
  institution-protected information upstream.
- Route vulnerability details through the private security process before public
  disclosure.

## Terminology

Changes move **upstream** from an institution or business fork to the canonical
Commons repository. Commons releases then flow **downstream** to institution
forks.

