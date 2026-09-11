# Open-Source-Only Technology Policy

> Status: Adopted baseline implementing ADR-0008 and ADR-0017
> Applies to: code, infrastructure, control planes, data stores, clients, build
> systems, observability, AI runtimes, media pipelines, and federation

## Policy statement

The Post-Secondary Digital Commons is self-hosted and open-source by default. Teams
select technology for capability, security, interoperability, maintainability,
community health, and total lifecycle cost—not because a vendor bundles it with a
cloud account.

## Admission test

A dependency may enter the reference stack only when reviewers can answer “yes”
to all mandatory questions:

1. Is the required edition distributed under an OSI-approved license?
2. Can an institution build or obtain the complete required software without a private
   vendor repository?
3. Can it run without a vendor-hosted control plane, license server, or SaaS
   account?
4. Are HA, SSO, security, audit, backup, and recovery available in the open edition?
5. Are configuration, schemas, APIs, and stored data exportable in documented
   formats?
6. Can the component be monitored, upgraded, rolled back, backed up, restored, and
   replaced by the institution's operators?
7. Does the project publish security reporting and supported-release information?
8. Can the team maintain a safe version without depending on one student's account?
9. Is mandatory telemetry absent or fully disableable?
10. Does the integration avoid leaking private data or precise spatial data?

## Not acceptable for the core

- SaaS-only services;
- proprietary public-cloud primitives with no self-hosted equivalent;
- “open core” products when required operational or security features are closed;
- source-available licenses that restrict use, competition, scale, or production;
- opaque hosted AI APIs as the only inference path;
- proprietary identity, event, telemetry, container, model, or storage protocols;
- undocumented vendor extensions embedded in shared contracts.

## Infrastructure-as-code policy

ADR-0017 selects OpenTofu plus Ansible. OpenTofu is distributed under MPL-2.0 and
requires no source-available exception. Terraform has no standing exception and
may be evaluated only as a bounded compatibility target through the normal
dependency review. Infrastructure state remains institution-controlled.

## Allowed boundary dependencies

Institutional Entra and Brightspace integrations may exist because the College
controls those upstream relationships. They are adapters, not the platform's
internal identity or academic protocol. College-approved systems remain
authoritative for the corresponding production identity and academic data;
development, testing, demonstrations, and standalone operation use self-hosted
test providers and contract fixtures that cannot become parallel production
authorities.

## Documentation tooling

The canonical format is plain UTF-8 Markdown in Git. Obsidian is an optional local
editor and graph viewer, not a runtime dependency. Notes must remain readable in a
text editor and Git forge. Essential workflows may not require a proprietary
Obsidian plugin.

## Enforcement

- Maintain a software bill of materials for every release.
- Run automated license, dependency, image, and vulnerability checks.
- Record each accepted component in the technology catalog with license, upstream,
  owner, version policy, data formats, and replacement plan.
- Review exceptions at least annually and before major upgrades.
- Reject changes that introduce mandatory vendor control without an approved ADR.
- Test OpenTofu modules, provider locks, plans and state recovery at each supported release.
