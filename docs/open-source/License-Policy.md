# Open-Source License and Component-Boundary Policy

> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Normative
> Owner: PSDC Open Source Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0001, ADR-0008, ADR-0026, ADR-0030

## Purpose and authority

This policy preserves an OSI-open, self-hostable core while using reciprocity at selected
software boundaries and carefully bounded permissive or copyleft upstream projects. PSDC Architecture Maintainers own the source
admission decision; repository owners maintain compliance; legal counsel or authorized
institutional review is required before public release of a derived work or unresolved
compatibility decision.

This document is an engineering policy, not legal advice. The exact license text and exact
imported commit control.

## Resolved licensing model

1. PSDC-authored network and control-plane services target AGPL-3.0-or-later; distributed
   workers/CLI agents target GPL-3.0-or-later where compatible; clients receive an explicit
   OSI-license decision with MPL-2.0 as the default candidate; protocols, schemas,
   conformance fixtures and interface definitions use Apache-2.0. Documentation remains
   Apache-2.0 unless its repository approves another open-content license.
2. Third-party code retains its original license, copyright, notices and source obligations.
   PSDC does not relabel upstream work as Apache-2.0.
3. An OSI license cannot forbid commercial use. AGPL can require corresponding source for a
   modified covered service used over a network, but it does not require submission to PSDC.
   A separate participation/certification/support agreement requires recognized commercial
   and institutional participants to offer generally useful improvements upstream.
4. GPL/AGPL code, including PSDC-authored reciprocal services, lives in an inventoried
   component whose corresponding source, modifications, notices and user/source-offer
   obligations are satisfied. A network or process boundary is an architectural aid, not an
   automatic legal conclusion.
5. Source-available/non-OSI directories, editions or dependencies are excluded from the
   required core. There is no standing exception for a convenient enterprise feature.
6. License admission is per repository, path, commit and build graph. A project's marketing
   label does not cover every subdirectory or dependency.

## Upstream license and integration chart

Verified against upstream repositories on 2026-09-25; re-verify at source-admission time.

| Upstream/component | Observed license posture | PSDC integration boundary | Required action |
|---|---|---|---|
| Akash node/provider | Apache-2.0 | compatible fork or bounded Apache-derived service-placement adapter | preserve NOTICE/history; upstream-first patches |
| Golem Yagna | GPL-3.0 | separate GPL service/repository behind PSDC API, or clean design-derived implementation | publish corresponding modified source when required; do not copy into Apache core |
| Golem yapapi | LGPL-3.0 | separately assessed client/library boundary | verify linking/distribution obligations at exact version |
| Kubo | dual Apache-2.0/MIT | configure upstream private nodes first; bounded fork only if contract cannot be met | record chosen license path, both upstream notices where required, private-network hardening |
| Tahoe-LAFS | GPL-2.0-or-later or TGPPL option | concepts/design or separate GPL service | choose the OSI GPL path if code is used; legal review TGPPL is not the core default |
| Storj server repository | AGPL-3.0 | separate compliant service or design-derived encryption/erasure implementation | provide modified network-service source as required; keep out of Apache combined work |
| Sia renterd | MIT at reviewed repository | exact-component adapter or design-derived storage contract | audit every imported Sia repository/dependency separately |
| Cosmos SDK core | Apache-2.0 | bounded internal ledger modules | explicitly exclude source-available enterprise paths; retain NOTICE |
| Cosmos SDK enterprise/group path | source-available evaluation terms observed | prohibited required-core input | do not import, build or depend on it |
| Kubernetes | Apache-2.0 | upstream distribution and APIs; avoid unnecessary fork | adapters/plugins upstream-first |
| OpenStack projects | generally Apache-2.0; verify project | upstream deployment and standard APIs | project-level SBOM/license verification |
| Slurm | GPL-2.0 | separately deployed scheduler behind adapter | preserve license/source duties; no code copied into Apache core |
| OpenTofu | MPL-2.0 | tool dependency and modules | preserve file-level MPL obligations for modified covered files |

## Component admission record

The [C0 contract-toolchain source-admission research](C0-Contract-Toolchain-Source-Admission-Research.md)
captures candidate provenance for two pinned development dependencies. It is research
evidence, not an admission decision or a substitute for the requirements below.

Before source or binaries enter a release, the owner MUST record:

- upstream organization/repository and immutable commit/tag;
- retrieval date, cryptographic digest and signature verification;
- included and explicitly excluded paths;
- SPDX expression, copyright and NOTICE/source-offer obligations;
- direct/transitive dependency and generated/bundled artifact license scan;
- intended use: unmodified dependency, configured deployment, linked library, separate
  service, compatible fork, clean-room implementation or design inspiration;
- local modifications and whether they form a derivative/combined work;
- build/release/source publication procedure;
- maintainer, security contact, patch budget, update cadence and replacement;
- legal/security/architecture approvals and expiry/review triggers.

An SBOM scanner assists but does not replace file-level or dependency-graph review.

## Copyleft boundary rules

- GPL/AGPL components live in clearly named repositories or upstream mirrors with their
  license and complete source/build material.
- PSDC Apache services communicate through documented versioned network/CLI/file contracts
  and do not copy headers, modules or generated code without compatibility review.
- AGPL user interaction includes an obvious corresponding-source path for the deployed
  modified version.
- Container packaging does not erase obligations. Static/dynamic linking, plugins, shared
  generated code and intimate IPC receive explicit review.
- Copyleft modifications are contributed upstream where useful and published under the
  required license; private institutional data/configuration is removed.

## Exceptions

Any exception records exact component/path, legal rationale, distribution mode, risk,
compensating controls, approver and expiry. It cannot make non-OSI code a mandatory core
dependency or waive an upstream license obligation.

## Contribution-back policy

Recognized participants—consortium members, certified deployments, supported organizations
or users of certification marks/shared release infrastructure—must sign a separate agreement
to offer generally useful fixes, security improvements, accessibility work, integrations
and performance changes upstream. Confidential data, local secrets and institution-specific
policy are excluded. General users who sign no agreement remain subject to the applicable
Apache, MPL, GPL, or AGPL obligations. AGPL corresponding-source publication does not by
itself require submission to or acceptance by PSDC.

## Enforcement points and deny behavior

Repository templates, dependency update review, SBOM/license scans, release gates, container
registries and deployment admission enforce this policy. An unknown, non-OSI, incompatible
or missing-license component is quarantined and cannot enter a release. Exceptions require
scope, legal basis, compensating controls, approver and expiry; an exception cannot make a
non-OSI dependency part of the mandatory open core.

## Data, audit and retention

The license register retains immutable source references, scans, decisions, notices, source
offers, patch publications, exceptions and approvals for the life of the release plus the
institution-required legal period. It contains no credentials or protected student data.
Published source archives remain available for the duration required by their licenses.

## Failure and violation response

| Condition | Response |
|---|---|
| license missing/ambiguous | stop import/release; obtain authoritative text and review |
| source-available path enters build | quarantine artifact, remove dependency and rebuild |
| required notice/source offer omitted | stop distribution, correct package and notify affected release owners |
| upstream changes license | pin last compliant version, assess fork/replace, no automatic update |
| copyleft source not published | halt affected service release and publish compliant source or remove it |
| patch contains private data | revoke/publication cleanup, incident review and history remediation |
| maintainer unavailable | freeze major divergence and use upstream version or replacement plan |

## Alternatives and trade-offs

Apache-2.0 maximizes adoption and patent clarity but cannot compel publication of service
modifications. AGPL across every artifact would strengthen network reciprocity but would
unnecessarily burden protocols, independent implementations, libraries, and some client
distribution paths. A custom business-use license would not be OSI open source. The selected
boundary-specific model uses AGPL for PSDC network services, reciprocal licenses where
appropriate for distributed programs, Apache-2.0 for interoperability contracts, and
participation agreements for an enforceable upstream offer from recognized organizations.

## Migration and rollback

Existing dependencies, PSDC-authored files, contributors, linking relationships, generated
artifacts, and distribution channels are inventoried and classified. A repository is
relicensed only after qualified legal review establishes copyright authority or obtains the
required consent. Nonconforming code is removed, isolated under its license, or replaced.
During migration, no release may broaden distribution. Rollback restores the last
license-cleared artifact and notice/source package; it never deletes compliance evidence or
falsely relabels code.

## Binary acceptance criteria

- **OS-LP-ACC-001:** every release file maps to an SPDX license and immutable provenance;
- **OS-LP-ACC-002:** the build excludes all prohibited source-available paths and fails when
  one is injected;
- **OS-LP-ACC-003:** GPL/AGPL fixtures produce the required separate source package, notices
  and source-access path;
- **OS-LP-ACC-004:** the open core builds and tests without proprietary or public-network
  dependencies, and Apache-licensed contracts remain independently implementable;
- **OS-LP-ACC-005:** an auditor can reproduce the third-party notice and source-offer bundle
  from the SBOM/register;
- **OS-LP-ACC-006:** recognized-participant contribution duties are traceable to the
  separate agreement and are not misrepresented as an open-source field-of-use restriction.

## Review cadence and references

Review every release and on any upstream license, ownership, repository, packaging or
distribution change.

- [ADR-0030](../architecture/architecture-decision-records/ADR-0030-network-copyleft-and-commercial-contribution.md)
- [ADR-0024, superseded](../architecture/architecture-decision-records/ADR-0024-permissive-license-and-upstream-contribution.md)
- [Fork Management](Fork-Management.md)
- [Commercial and Institutional Upstream Contribution Policy](../governance/Commercial-and-Institutional-Upstream-Contribution-Policy.md)
- [Dependency Policy](Dependency-Policy.md)
