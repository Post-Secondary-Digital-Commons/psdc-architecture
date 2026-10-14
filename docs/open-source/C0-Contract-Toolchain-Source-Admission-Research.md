# C0 contract toolchain: source-admission research

> Status: Research evidence; **not an admission or release approval**  
> Scope: Common `psdc-architecture` development toolchain only  
> Inspected repository revision: `45b64a1f6303df47599fc52b4bba8135342e8730`  
> Inspected: 2026-10-14  
> Decision owner for admission: PSDC Architecture Maintainers, subject to the [license policy](License-Policy.md) and qualified review where required

## Boundary and result

The two direct dependencies below are pinned as **development dependencies** in [`package.json`](../../package.json), and the lockfile identifies immutable npm tarball URLs and SHA-512 Subresource Integrity (SRI) values. The npm registry's version metadata reports the same integrity values and associates each publication with a Git commit that exists at the upstream repository's corresponding version tag. The installed packages contain the stated license files. This is good provenance evidence for a **candidate** toolchain, but it is not source admission: the full dependency/build graph, tarball-to-source comparison, vulnerability review, notice obligations, and release authority remain open.

The local `contracts/build-contract-bundle.mjs` selects only contract `.json`/`.md` files plus the repository's `LICENSE` and `NOTICE` for its candidate bundle. It does not select `node_modules` or these packages. That is an observed build-script boundary, **not** proof that every future generated artifact or distribution excludes their code. Ajv validates schemas and fixtures in `contracts/validate-contracts.mjs` and related test scripts; `canonicalize` supplies RFC 8785-style JSON canonicalization for signature vectors and event tests. Neither package is an identity, policy, contract-release, or institution-approval authority.

| Package | Exact direct pin and npm lock evidence | Upstream source and license evidence | Current use / included boundary |
|---|---|---|---|
| `ajv` | `8.20.0`; [`ajv-8.20.0.tgz`](https://registry.npmjs.org/ajv/-/ajv-8.20.0.tgz); `sha512-Thbli+OlOj+iMPYFBVBfJ3OmCAnaSyNn4M1vz9T6Gka5Jt9ba/HIR56joy65tY6kx/FCF5VXNB819Y7/GUrBGA==` in [`package-lock.json`](../../package-lock.json) and [npm version metadata](https://registry.npmjs.org/ajv/8.20.0). | [Upstream tag `v8.20.0`](https://github.com/ajv-validator/ajv/tree/v8.20.0) resolves to [`0fba0b8e649909613cfce0999b149cd08f4a4987`](https://github.com/ajv-validator/ajv/commit/0fba0b8e649909613cfce0999b149cd08f4a4987), matching npm `gitHead`; version package metadata declares MIT and the [tag's LICENSE](https://github.com/ajv-validator/ajv/blob/v8.20.0/LICENSE) contains MIT terms and copyright notice. | `ajv/dist/2020.js` is used by contract validation/test scripts. Tool process dependency only; not selected by the current contract-bundle builder. |
| `canonicalize` | `5.1.0`; [`canonicalize-5.1.0.tgz`](https://registry.npmjs.org/canonicalize/-/canonicalize-5.1.0.tgz); `sha512-bab9+WefZljqQ8jT0qRwVmTyzAUU63K97QIQD3agynIBrb6sa5M2eAy8Hv8K3p4V9+ONVYZKtGYl4Dg+/5Gumw==` in [`package-lock.json`](../../package-lock.json) and [npm version metadata](https://registry.npmjs.org/canonicalize/5.1.0). | [Upstream tag `v5.1.0`](https://github.com/erdtman/canonicalize/tree/v5.1.0) resolves to [`31fb117afde3ef305b2e1d99bde539bf6300bc62`](https://github.com/erdtman/canonicalize/commit/31fb117afde3ef305b2e1d99bde539bf6300bc62), matching npm `gitHead`; version package metadata declares Apache-2.0 and the [tag's LICENSE](https://github.com/erdtman/canonicalize/blob/v5.1.0/LICENSE) contains Apache License 2.0. | Imported by validation and event-test scripts to canonicalize JSON. Tool process dependency only; not selected by the current contract-bundle builder. |

The version, URL, integrity, and license fields above were read from this repository's `package-lock.json`, the installed `node_modules/<name>/package.json` and `LICENSE` files, and the npm registry's own version metadata (`npm view <name>@<version> ... --json`). GitHub's repository API confirmed both commits and tags. The SHA-512 values pin npm artifacts; they **do not** by themselves establish that the tarballs exactly reproduce the Git trees or that all bundled/generated files have been reviewed.

## Included, excluded, and inherited risk

- **Included today:** third-party package code executes in the local/CI contract validation process. Ajv's declared runtime dependencies are `fast-deep-equal`, `fast-uri`, `json-schema-traverse`, and `require-from-string` (see the [Ajv npm metadata](https://registry.npmjs.org/ajv/8.20.0) and lockfile). `canonicalize` declares no direct runtime dependencies in the inspected npm package metadata. This is not a full transitive-license inventory.
- **Excluded from the current candidate bundle by construction:** package source, package binaries, all of `node_modules`, and JavaScript test/build scripts. The builder's path filter is the evidence; a generated binding or later packaging route needs its own inspection.
- **Authority retained by PSDC:** contract interpretation, fixture acceptance, release signing, dependency admission, and institution-specific policy. Passing Ajv validation or canonicalization cannot promote a candidate contract to a released one.
- **Patch/fork posture:** no local patch or fork of either dependency was observed in the inspected checkout. This is a direct-package adoption candidate, not a recommendation to fork. Update ownership, cadence, and replacement triggers have not been assigned.

## Gates before an admission decision

1. Produce a complete direct/transitive SBOM and file-level license/NOTICE review for the toolchain, including `ajv-formats`, Swagger Parser, AsyncAPI Parser, and their graphs. Check any generated or redistributed code separately.
2. Re-fetch the exact tarballs under the lockfile SRI, compare the published contents with the tagged sources/build process, and retain immutable digest and retrieval evidence. Review npm provenance/signature evidence if available; Git tag equality with `gitHead` is not a signature verification.
3. Run a dated vulnerability/advisory scan against the **full pinned graph**, review findings and maintainers' security-update path, and define a patch/update owner, cadence, and replacement trigger. A clean scan at one date does not prove future safety.
4. Confirm that the actual release package and generated bindings contain no unreviewed third-party code; preserve MIT and Apache-2.0 notices wherever applicable. Have the qualified license reviewer decide compatibility and distribution duties; this note makes no legal conclusion.
5. Create the governed, machine-readable component adoption record(s), link the repo catalog and consuming PRs to the immutable record revision, and obtain Architecture Maintainer admission. Record what was tested, what was not, and the review-expiry trigger.

No independent package test, tarball/source diff, SBOM, vulnerability scan, or legal approval was performed for this research note. Its observed claims are limited to local package metadata/files, source-code import/build paths, npm publication metadata, and upstream GitHub commit/tag/license records.
