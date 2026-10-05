import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const contractsRoot = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(contractsRoot, "..");
const packageMetadata = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "package.json"), "utf8"));
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "psdc-contract-bundle-"));

try {
  const manifests = [];
  for (const run of ["run-a", "run-b"]) {
    const outputRoot = path.join(temporaryRoot, run);
    const result = spawnSync(process.execPath, [path.join(contractsRoot, "build-contract-bundle.mjs"), outputRoot], {
      cwd: repositoryRoot,
      encoding: "utf8"
    });
    if (result.status !== 0) throw new Error(`Bundle build ${run} failed: ${result.stderr || result.stdout}`);
    const bundleRoot = path.join(outputRoot, `${packageMetadata.name}-${packageMetadata.version}`);
    manifests.push(fs.readFileSync(path.join(bundleRoot, "manifest.json"), "utf8"));
  }
  if (manifests[0] !== manifests[1]) throw new Error("Two clean bundle builds produced different manifests");
  const manifest = JSON.parse(manifests[0]);

  // The content root must not depend on the checkout's line endings. Copy the sources with CRLF
  // line endings, build from the copy, and require the same content root.
  const crlfRoot = path.join(temporaryRoot, "crlf-copy");
  const toCrlf = (text) => text.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
  const copyTree = (from, to) => {
    fs.mkdirSync(to, { recursive: true });
    for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
      const source = path.join(from, entry.name);
      const target = path.join(to, entry.name);
      if (entry.isDirectory()) copyTree(source, target);
      else if (/\.(?:json|md|mjs)$/.test(entry.name) || ["LICENSE", "NOTICE"].includes(entry.name)) fs.writeFileSync(target, toCrlf(fs.readFileSync(source, "utf8")), "utf8");
      else fs.copyFileSync(source, target);
    }
  };
  copyTree(contractsRoot, path.join(crlfRoot, "contracts"));
  for (const rootFile of ["package.json", "LICENSE", "NOTICE"]) {
    fs.writeFileSync(path.join(crlfRoot, rootFile), toCrlf(fs.readFileSync(path.join(repositoryRoot, rootFile), "utf8")), "utf8");
  }
  const crlfOutput = path.join(temporaryRoot, "run-crlf");
  const crlfResult = spawnSync(process.execPath, [path.join(crlfRoot, "contracts", "build-contract-bundle.mjs"), crlfOutput], { cwd: crlfRoot, encoding: "utf8" });
  if (crlfResult.status !== 0) throw new Error(`CRLF bundle build failed: ${crlfResult.stderr || crlfResult.stdout}`);
  const crlfManifest = JSON.parse(fs.readFileSync(path.join(crlfOutput, `${packageMetadata.name}-${packageMetadata.version}`, "manifest.json"), "utf8"));
  if (crlfManifest.contentRoot !== manifest.contentRoot) throw new Error(`Content root depends on line endings: LF ${manifest.contentRoot} versus CRLF ${crlfManifest.contentRoot}`);
  console.log(`Bundle reproducibility passed: ${manifest.files.length} files, content root ${manifest.contentRoot}.`);
} finally {
  const resolvedTemporaryRoot = path.resolve(temporaryRoot);
  const resolvedSystemTemp = path.resolve(os.tmpdir());
  if (!resolvedTemporaryRoot.startsWith(resolvedSystemTemp + path.sep) || !path.basename(resolvedTemporaryRoot).startsWith("psdc-contract-bundle-")) {
    throw new Error(`Refusing to remove unexpected temporary path: ${resolvedTemporaryRoot}`);
  }
  fs.rmSync(resolvedTemporaryRoot, { recursive: true, force: true });
}
