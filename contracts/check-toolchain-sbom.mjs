import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// npm includes a fresh creation time and random document namespace on each run.
// Compare the substantive package/dependency graph, not those two identifiers.
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evidenceRoot = path.join(repositoryRoot, "docs", "open-source", "evidence");
const adoptionRoot = path.join(repositoryRoot, "docs", "open-source", "adoption-records");
const snapshotPath = path.join(evidenceRoot, "C0-Toolchain.spdx.json");
const metadataPath = path.join(evidenceRoot, "C0-Toolchain.meta.json");
const mode = process.argv[2] ?? "--check";
if (!["--check", "--write", "--refresh"].includes(mode)) {
  throw new Error("Usage: npm run sbom:toolchain -- [--check|--write|--refresh]");
}
const npmEntrypoint = process.env.npm_execpath;
if (!npmEntrypoint) throw new Error("Run through npm run sbom:toolchain so the npm CLI is pinned to this environment");
const result = spawnSync(process.execPath, [npmEntrypoint, "sbom", "--package-lock-only", "--sbom-format", "spdx"], {
  cwd: repositoryRoot,
  encoding: "utf8",
  maxBuffer: 32 * 1024 * 1024
});
if (result.error || result.status !== 0) throw new Error(`npm sbom failed: ${result.error?.message ?? result.stderr}`);
const generated = JSON.parse(result.stdout);
const sha256 = (data) => createHash("sha256").update(data).digest("hex");
// Git may check text artifacts out with CRLF on Windows. Hash the canonical LF
// representation so the recorded digest identifies content across platforms.
const canonicalTextSha256 = (data) => sha256(data.toString("utf8").replace(/\r\n/g, "\n"));
const lockSha256 = canonicalTextSha256(fs.readFileSync(path.join(repositoryRoot, "package-lock.json")));

function normalized(document) {
  assert.equal(document.spdxVersion, "SPDX-2.3");
  assert.ok(Array.isArray(document.packages) && document.packages.length > 0);
  assert.ok(Array.isArray(document.relationships));
  const ids = document.packages.map((pkg) => pkg.SPDXID);
  assert.equal(new Set(ids).size, ids.length, "Duplicate SPDX package ID");
  for (const pkg of document.packages) {
    assert.ok(pkg.licenseDeclared && pkg.licenseDeclared !== "NOASSERTION", `${pkg.name} has no declared license`);
    assert.equal(pkg.filesAnalyzed, false, "npm lockfile SBOM is not a file-level license scan");
  }
  const packages = document.packages.map(({ SPDXID, name, versionInfo, licenseDeclared, downloadLocation, checksums, externalRefs }) =>
    ({ SPDXID, name, versionInfo, licenseDeclared, downloadLocation, checksums, externalRefs }))
    .sort((left, right) => left.SPDXID.localeCompare(right.SPDXID));
  const relationships = document.relationships.map(({ spdxElementId, relatedSpdxElement, relationshipType }) =>
    ({ spdxElementId, relatedSpdxElement, relationshipType }))
    .sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)));
  return { documentDescribes: document.documentDescribes, packages, relationships };
}

const expectedGraph = normalized(generated);
const catalog = JSON.parse(fs.readFileSync(path.join(adoptionRoot, "catalog.json"), "utf8"));
assert.equal(catalog.schemaVersion, 1);
assert.equal(catalog.status, "proposed-only");
const componentIds = new Set();
const recordPaths = new Set();
for (const entry of catalog.records) {
  assert.match(entry.path, /^[a-z0-9-]+\.json$/);
  assert.ok(!componentIds.has(entry.componentId) && !recordPaths.has(entry.path), "Duplicate adoption catalog entry");
  componentIds.add(entry.componentId);
  recordPaths.add(entry.path);
  const record = JSON.parse(fs.readFileSync(path.join(adoptionRoot, entry.path), "utf8"));
  assert.equal(record.componentId, entry.componentId);
  assert.equal(record.repository, "psdc-architecture");
  assert.equal(record.status, "proposed", "Toolchain records cannot self-promote to accepted");
}
const unlisted = fs.readdirSync(adoptionRoot).filter((name) => name.endsWith(".json") && name !== "catalog.json" && !recordPaths.has(name));
assert.deepEqual(unlisted, [], "Adoption record exists outside the component catalog");
if (mode === "--check") {
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  const snapshotBytes = fs.readFileSync(snapshotPath);
  assert.equal(metadata.packageLockSha256, lockSha256, "Snapshot lockfile digest is stale");
  assert.equal(metadata.snapshotSha256, canonicalTextSha256(snapshotBytes), "Stored SPDX snapshot was modified");
  const crlfSnapshot = Buffer.from(snapshotBytes.toString("utf8").replace(/\r?\n/g, "\r\n"), "utf8");
  assert.equal(metadata.snapshotSha256, canonicalTextSha256(crlfSnapshot), "Snapshot digest must survive CRLF checkout");
  const stored = JSON.parse(snapshotBytes);
  assert.deepEqual(normalized(stored), expectedGraph, "Pinned dependency graph differs from stored SPDX snapshot");
  assert.equal(metadata.packageCount, stored.packages.length);
  const checks = JSON.parse(fs.readFileSync(path.join(evidenceRoot, "C0-Toolchain-Checks-2026-10-14.json"), "utf8"));
  assert.equal(checks.packageLockSha256, lockSha256);
  assert.equal(checks.sbom.packageCount, stored.packages.length);
  const licenseCounts = Object.fromEntries(Object.entries(checks.sbom.declaredLicenseCounts).sort());
  const observedLicenses = Object.fromEntries([...stored.packages.reduce((counts, pkg) =>
    counts.set(pkg.licenseDeclared, (counts.get(pkg.licenseDeclared) ?? 0) + 1), new Map())].sort());
  assert.deepEqual(observedLicenses, licenseCounts, "Declared-license summary differs from SPDX inventory");
  if (Date.parse(checks.audit.refreshBy) < Date.now()) {
    console.warn(`Dated npm advisory evidence expired at ${checks.audit.refreshBy}; refresh before an admission decision.`);
  }
  console.log(`Toolchain SBOM check passed: ${stored.packages.length} declared-license packages; file contents unanalysed.`);
} else {
  if (mode === "--write" && (fs.existsSync(snapshotPath) || fs.existsSync(metadataPath))) {
    throw new Error("Refusing to overwrite existing SBOM evidence; use --refresh after reviewing the lockfile change");
  }
  fs.mkdirSync(evidenceRoot, { recursive: true });
  const snapshotBytes = Buffer.from(`${JSON.stringify(generated, null, 2)}\n`, "utf8");
  const metadata = {
    schemaVersion: 1,
    status: "generated-inventory-not-admission",
    packageLockSha256: lockSha256,
    snapshotSha256: canonicalTextSha256(snapshotBytes),
    packageCount: generated.packages.length,
    generatedAt: new Date().toISOString(),
    limitation: "npm package-lock SPDX inventory only; no file-level license, provenance or vulnerability clearance"
  };
  fs.writeFileSync(snapshotPath, snapshotBytes);
  fs.writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`, "utf8");
  console.log(`Wrote ${generated.packages.length}-package SPDX inventory and evidence metadata.`);
}
