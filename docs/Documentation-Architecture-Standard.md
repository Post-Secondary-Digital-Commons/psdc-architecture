# Documentation Architecture Standard

## Purpose

Keep architecture work consistent across Commons Cloud, Commons Compute Fabric, Commons AI Fabric, Commons Media and Spatial Fabric,
Commons Social Fabric, the extended Commons fabrics, spatial support, clients, sovereign
institution deployments, and federation.

## Document hierarchy

1. Vision and principles define purpose and non-negotiable constraints.
2. Reference architecture defines the whole system and ownership boundaries.
3. Subsystem architecture refines one bounded domain.
4. Specifications define interoperable behavior and interfaces.
5. ADRs record consequential decisions and alternatives.
6. Threat models challenge trust assumptions and controls.
7. Operational documents explain how production is observed and operated.
8. Runbooks define deterministic incident procedures.
9. Roadmaps establish dependency order, milestones, and exit criteria.

Lower-level documents must cite and conform to higher-level documents unless an
approved ADR changes them.

Within one level, the newest accepted ADR controls. A document explicitly marked
superseded is historical, not conflicting guidance. ADR-0017 therefore controls
IaC and ADR-0011 remains history. Conversation exports are provenance rather than
normative architecture.

## Required document metadata

- Status: normative specification, implementation-gated, approved, deprecated,
  superseded, or historical
- Owning team and accountable role
- Reviewers and approval authority
- Creation and last-reviewed dates
- Related systems, contracts, ADRs, risks, and roadmap phase
- Intended audience and confidentiality classification

## Required architecture sections

Every service or subsystem architecture document addresses:

1. Purpose and institutional value
2. Scope, exclusions, assumptions, and constraints
3. Functional and quality requirements
4. Interfaces, APIs, events, schemas, and compatibility
5. Dependencies and ownership boundaries
6. Data model, residency, retention, deletion, and migration
7. Identity, authorization, security, privacy, safety, and compliance
8. Deployment environments, configuration, secrets, and upgrades
9. Scaling, capacity, performance, cost, and sustainability
10. Failure modes, availability, recovery, and degraded operation
11. Metrics, logs, traces, alerts, and service objectives
12. Standards and upstream projects
13. Build, adopt, fork, or integrate rationale
14. Testing, validation, and release criteria
15. Operational ownership and runbooks
16. Roadmap, decision status, and change log

Sections may state “not applicable” with a reason; they must not be silently
omitted.

## ADR requirements

An ADR contains status, context, decision drivers, considered options, decision,
positive and negative consequences, security/privacy impact, operational impact,
migration or rollback plan, and links to superseded decisions.

Use the established sequential identifiers. `ADR-XXXX.md` remains the template
and never represents an accepted decision.

## Specification completion rule

A normative specification authorizes implementation only when its purpose, scope,
accountable owner, dependencies, interfaces, data handling, security and privacy,
failure behaviour, release gates, acceptance tests, operations, change authority,
and references are explicit. Site values and measured implementation evidence are
supplied later through governed manifests and release evidence; they are not
architectural blanks. Removing empty markers alone is not sufficient.

## Naming and links

- Preserve the canonical filenames listed in this suite.
- Use relative links within the repository.
- Link to the owning repository rather than copying implementation details.
- Link standards and upstream projects to their authoritative sources.
- Avoid embedding secrets, private infrastructure addresses, personal data, or
  precise private spatial data.
