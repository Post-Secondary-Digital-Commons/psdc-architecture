import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import canonicalize from "canonicalize";

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

export function readAndVerifyBundle(bundleRoot) {
  const root = path.resolve(bundleRoot);
  if (!fs.lstatSync(root).isDirectory()) throw new Error("Bundle root must be a real directory");
  const actualPaths = [];
  function walk(directory) {
    for (const child of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, child.name);
      if (child.isSymbolicLink()) throw new Error(`Bundle contains a symbolic link: ${fullPath}`);
      if (child.isDirectory()) walk(fullPath);
      else if (child.isFile()) actualPaths.push(path.relative(root, fullPath).replaceAll("\\", "/"));
      else throw new Error(`Bundle contains an unsupported entry: ${fullPath}`);
    }
  }
  walk(root);
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
  if (manifest.manifestVersion !== "1.0" || manifest.releaseStatus !== "candidate-unsigned" ||
      manifest.signatureRequiredForRelease !== true ||
      manifest.contentRootAlgorithm !== "SHA-256 over sorted path NUL digest LF records" ||
      !Array.isArray(manifest.files)) {
    throw new Error("Unsupported or malformed candidate bundle manifest");
  }
  const entries = manifest.files;
  let lastPath = "";
  for (const entry of entries) {
    if (!entry || typeof entry.path !== "string" || !/^[a-zA-Z0-9][a-zA-Z0-9/._-]*$/.test(entry.path) ||
        entry.path.includes("\\") || entry.path.split("/").some((part) => part === ".." || part === "." || part === "") ||
        entry.path <= lastPath || !Number.isSafeInteger(entry.bytes) || entry.bytes < 0 ||
        !/^[a-f0-9]{64}$/.test(entry.sha256)) {
      throw new Error(`Invalid or unordered bundle path: ${entry?.path}`);
    }
    lastPath = entry.path;
    const file = path.join(root, ...entry.path.split("/"));
    const stat = fs.lstatSync(file);
    if (!stat.isFile()) throw new Error(`Bundle entry is not a regular file: ${entry.path}`);
    const bytes = fs.readFileSync(file);
    if (bytes.length !== entry.bytes || sha256(bytes) !== entry.sha256) {
      throw new Error(`Bundle entry digest mismatch: ${entry.path}`);
    }
  }
  const contentRoot = sha256(Buffer.from(entries.map(({ path: filePath, sha256: digest }) => `${filePath}\u0000${digest}\n`).join(""), "utf8"));
  if (contentRoot !== manifest.contentRoot) throw new Error("Bundle content root mismatch");
  const declared = new Set([...entries.map((entry) => entry.path), "manifest.json", "signature.json"]);
  for (const actual of actualPaths) {
    if (!declared.has(actual)) throw new Error(`Undeclared bundle file: ${actual}`);
  }
  return { manifest, canonicalBytes: Buffer.from(canonicalize(manifest), "utf8") };
}
