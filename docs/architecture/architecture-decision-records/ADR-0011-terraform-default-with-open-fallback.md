# ADR-0011: Terraform Is the Default IaC CLI with an OpenTofu Exit Path

> Status: Superseded by ADR-0017
> Date: 2026-09-10
> Scope: Infrastructure provisioning toolchain
> Decision owner: Project founder; legal review required before multi-institution distribution

## Supersession

The project founder reversed this choice on 2026-09-10. ADR-0017 selects
OpenTofu plus Ansible as the default and restores the OSI-approved-only baseline.
This record remains as decision history and must not be used as current guidance.

## Context

The project founder prefers Terraform as the default infrastructure-as-code tool.
Current Terraform is source-available under the Business Source License 1.1, not
an OSI-approved license. This conflicts with ADR-0008's default admission rule.
Terraform is a build/provisioning tool rather than a production runtime service,
and the platform can avoid Terraform Cloud and Terraform Enterprise.

## Historical decision (superseded)

This record formerly selected Terraform CLI plus Ansible as the default IaC
toolchain through a narrow exception to ADR-0008. ADR-0017 has removed that
exception and all active guidance below is retained for history only.

- Use the self-managed CLI only; HCP Terraform and Terraform Enterprise are not
  required architecture components.
- Store state in institution-controlled encrypted storage with locking, backup,
  access control, and recovery procedures.
- Do not embed or redistribute Terraform with a paid white-label offering until
  legal review confirms the exact use under the applicable license.
- Prefer providers under OSI-approved licenses and inventory every provider and
  module in the SBOM/license register.
- Keep modules within a tested Terraform/OpenTofu-compatible subset where
  practical; isolate implementation-specific behavior behind small modules.
- Run migration validation against OpenTofu for critical modules before each
  platform release.

OpenTofu is the designated open-source replacement if Terraform's license,
distribution terms, functionality, or vendor direction becomes unacceptable.
Ansible remains the configuration-management complement and an independent
fallback for workflows that do not need Terraform state.

## Consequences

- The preferred operator workflow uses Terraform terminology and directory names.
- The stack is no longer literally OSI-only across every development tool; the
  production runtime remains open-source and self-hosted.
- License review becomes especially important before offering the commons to
  other institutions.
- Portability tests and provider-neutral state/data practices reduce, but do not
  eliminate, migration cost.

## References

- [Terraform repository and license](https://github.com/hashicorp/terraform)
- [Terraform BSL license text](https://github.com/hashicorp/terraform/blob/main/LICENSE)
- [OpenTofu](https://opentofu.org/)
