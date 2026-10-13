# Contributing

Follow the [engineering and code standard](docs/standards/Ecosystem-Engineering-and-Code-Standard.md)
for interfaces, security boundaries, comments, tests, review evidence, and
release claims. Documentation follows the
[ecosystem documentation standard](docs/standards/Ecosystem-Documentation-Quality-Standard.md).
Repository-specific language rules may be stricter and must name their checks.

Contributions are accepted under the license of the repository. Every commit must
include a Developer Certificate of Origin sign-off using `git commit -s`.

## Upstream-first rule

Institution and commercial forks should propose generally useful fixes,
accessibility improvements, security work, integrations and performance changes
to the canonical Commons repository first. Keep branding, domains, identity/LMS
mappings, secrets and local policy in the institution deployment repository.

Do not contribute protected institutional data, credentials or confidential
vulnerability details through a public pull request.

This architecture and contract repository currently remains Apache-2.0 unless and
until a lawful repository-specific migration is completed. Other PSDC repositories
may use AGPL, GPL, MPL or another approved OSI license under ADR-0030. Contributors
must check the exact repository and file license rather than assuming one platform-wide
license.

AGPL corresponding-source duties do not themselves require PSDC to accept a pull
request. Recognized consortium, certification, federation-service,
shared-infrastructure, trademark and support participants must separately offer
generally useful improvements upstream under their participation agreement. General
commercial users retain the rights and duties of the public license; no PSDC document
may misstate a commercial-use restriction as OSI open source.
