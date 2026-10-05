import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageMetadata = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "package.json"), "utf8"));
const outputRoot = path.resolve(process.argv[2] ?? path.join(repositoryRoot, "dist"));
const bundleName = `${packageMetadata.name}-${packageMetadata.version}`;
const bundleRoot = path.join(outputRoot, bundleName);

if (fs.existsSync(bundleRoot)) {
  throw new Error(`Refusing to overwrite existing bundle directory: ${bundleRoot}`);
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(fullPath) : [fullPath];
    })
    .sort();
}

const contractRoot = path.join(repositoryRoot, "contracts");
const included = walk(contractRoot)
  .filter((filePath) => /\.(?:json|md)$/.test(filePath))
  .map((filePath) => ({ source: filePath, relative: path.relative(repositoryRoot, filePath).replaceAll("\\", "/") }));
for (const rootFile of ["LICENSE", "NOTICE"]) {
  included.push({ source: path.join(repositoryRoot, rootFile), relative: rootFile });
}
// Code-point order, not locale order, so the manifest is identical on every platform.
included.sort((left, right) => (left.relative < right.relative ? -1 : left.relative > right.relative ? 1 : 0));

fs.mkdirSync(bundleRoot, { recursive: true });
const files = [];
for (const entry of included) {
  // Every bundled file is UTF-8 text. Normalize CRLF to LF so a Windows checkout with autocrlf
  // yields the same bytes, digests and content root as a Linux checkout.
  const bytes = Buffer.from(fs.readFileSync(entry.source, "utf8").replace(/\r\n/g, "\n"), "utf8");
  const target = path.join(bundleRoot, ...entry.relative.split("/"));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, bytes);
  files.push({
    path: entry.relative,
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex")
  });
}

const contentRoot = createHash("sha256")
  .update(files.map(({ path: filePath, sha256 }) => `${filePath}\u0000${sha256}\n`).join(""), "utf8")
  .digest("hex");
const manifest = {
  manifestVersion: "1.0",
  package: { name: packageMetadata.name, version: packageMetadata.version, license: packageMetadata.license },
  releaseStatus: "candidate-unsigned",
  signatureRequiredForRelease: true,
  contentRootAlgorithm: "SHA-256 over sorted path NUL digest LF records",
  contentRoot,
  files
};
fs.writeFileSync(path.join(bundleRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ bundleRoot, files: files.length, contentRoot, releaseStatus: manifest.releaseStatus }));
