import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const root = path.dirname(fileURLToPath(import.meta.url));
const matrix = JSON.parse(fs.readFileSync(path.join(root, "acceptance", "vs01.scenarios.json"), "utf8"));
assert.equal(matrix.scenarioSet, "VS-01");
assert.equal(matrix.maturity, "D0-acceptance-design-not-executed");
assert.equal(matrix.environment, "single-institution-synthetic-development-only");
const ids = new Set();
const categories = new Set();
for (const item of matrix.scenarios) {
  assert.match(item.id, /^VS01-\d{3}$/);
  assert.ok(!ids.has(item.id), `duplicate scenario ${item.id}`);
  ids.add(item.id);
  assert.ok(matrix.requiredCategories.includes(item.category), item.id);
  categories.add(item.category);
  assert.ok(typeof item.injectAt === "string" && item.injectAt.length > 0, `${item.id}: injectAt`);
  for (const field of ["stimulus", "expected"]) assert.ok(typeof item[field] === "string" && item[field].length > 10, `${item.id}: ${field}`);
  for (const field of ["forbidden", "evidence"]) assert.ok(Array.isArray(item[field]) && item[field].length > 0, `${item.id}: ${field}`);
}
assert.deepEqual([...categories].sort(), [...matrix.requiredCategories].sort());
assert.ok(matrix.scenarios.length >= 18);
process.stdout.write(`VS-01 acceptance matrix structurally valid: ${ids.size} synthetic scenarios, ${categories.size} categories. No runtime executed.\n`);
