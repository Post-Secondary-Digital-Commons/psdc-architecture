# Proposed C0 toolchain adoption records

These JSON records follow the pinned `psdc-upstream-adoption` record schema. The
[catalog](catalog.json) maps each stable component ID to one file. Both records are
**proposed**, not accepted. They describe development-tool dependencies, not a
product runtime or contract-release authority.

The [source research](../C0-Contract-Toolchain-Source-Admission-Research.md)
and [dated checks](../evidence/C0-Toolchain-Checks-2026-10-14.json) are evidence
inputs. The [SPDX snapshot](../evidence/C0-Toolchain.spdx.json) is a complete
lockfile-derived package inventory, but npm sets `filesAnalyzed: false` for
every package. A declared license and a zero-finding npm audit do not perform
the required file-level, tarball/source, legal or security review.

To validate the proposed records with the pinned common skill pack:

```powershell
py -3 <pinned-psdc-agent-skills>/scripts/Validate-Adoption.py `
  docs/open-source/adoption-records/ajv.json `
  docs/open-source/adoption-records/canonicalize.json
npm run sbom:toolchain
```

The path placeholder above must be replaced with the locally checked-out
`psdc-agent-skills` revision from `.psdc/agent-skills.yaml`; it is not a
download command. Neither check changes `status` to `accepted`. Only the
named decision owner can approve that transition after the open gates close.
