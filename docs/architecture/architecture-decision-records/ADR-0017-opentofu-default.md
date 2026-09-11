# ADR-0017: OpenTofu Is the Default Infrastructure-as-Code CLI

> Status: Accepted; supersedes ADR-0011
> Date: 2026-09-10
> Scope: Infrastructure provisioning toolchain
> Decision owner: Project founder

## Context

The platform requires a self-hosted, open-source infrastructure-as-code workflow
that can be shared across institutionally sovereign deployments. ADR-0011 briefly
selected Terraform through a source-available exception. The founder has reversed
that decision in favour of an OSI-approved default.

## Decision

OpenTofu plus Ansible is the default infrastructure-as-code toolchain.

- Use OpenTofu terminology, CLI workflows and `infrastructure/opentofu/`
  directories throughout the active architecture.
- Store state in institution-controlled encrypted storage with locking, access
  control, backup and tested recovery.
- Prefer providers and modules under OSI-approved licenses; inventory exact
  versions and transitive dependencies in the SBOM/license register.
- Keep modules provider-conscious and isolate provider-specific behavior behind
  small modules and institution deployment overlays.
- Use Ansible for host/application configuration and for workflows that do not
  require declarative infrastructure state.
- Do not require a hosted control plane, vendor account or proprietary registry.
- Terraform may be evaluated only as a non-default compatibility target when a
  concrete migration or provider constraint justifies it; it receives no standing
  exception to the open-source policy.

## Consequences

- The full accepted default stack again satisfies the OSI-license admission rule
  at the project level, subject to exact-release and dependency verification.
- The former Terraform legal exception and release migration test are removed
  from the critical path.
- Existing Terraform-language ecosystem familiarity can usually be reused, but
  OpenTofu behavior and provider compatibility remain the tested authority.

## References

- [OpenTofu repository](https://github.com/opentofu/opentofu)
- [OpenTofu MPL-2.0 license](https://github.com/opentofu/opentofu/blob/main/LICENSE)
