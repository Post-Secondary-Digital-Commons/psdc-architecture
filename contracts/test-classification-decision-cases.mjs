import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = path.dirname(fileURLToPath(import.meta.url));
const read = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const suite = read("compute/classification-decision-cases.v1.json");
const base = read(path.join("compute", suite.baseManifestFixture)).instance;
const definitions = read("common/definitions.schema.json");
const manifestSchema = read("compute/workload-manifest.schema.json");
const ajv = new Ajv2020({ strict: true, strictRequired: false, allowUnionTypes: true, allErrors: true });
addFormats(ajv);
ajv.addSchema(definitions, definitions.$id);
ajv.addSchema(manifestSchema, manifestSchema.$id);
const validate = ajv.getSchema(manifestSchema.$id);
const defaults = {
  opportunistic_task: ["task"], independent_task_graph: ["task"], parameter_sweep: ["task"],
  container_service: ["kubernetes"], vm: ["openstack"], hpc_mpi: ["slurm"],
  ai_inference: ["kubernetes"], ai_service: ["kubernetes"],
  critical_service: ["kubernetes", "openstack"]
};
function merge(target, patch) {
  for (const [key, value] of Object.entries(patch)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      target[key] = merge(target[key] ?? {}, value);
    } else target[key] = value;
  }
  return target;
}
// This oracle checks the proposed table and hard-filter precedence only.
// It is deliberately not a substitute for exercising the psdc-compute API.
function expectedDecision(manifest, context) {
  if (context.policy === "deny") return { disposition: "denied", backends: [], reasonCodes: ["POLICY_DENIED"] };
  if (context.policy === "timeout") return { disposition: "unavailable", backends: [], reasonCodes: ["POLICY_UNAVAILABLE"] };
  if (context.scope === "external_unapproved") return { disposition: "denied", backends: [], reasonCodes: ["SCOPE_NOT_APPROVED"] };
  if (manifest.criticality === "critical" && context.scope !== "production_local") {
    return { disposition: "unschedulable", backends: [], reasonCodes: ["PRODUCTION_POOL_REQUIRED"] };
  }
  if (context.capability === "stale") return { disposition: "unschedulable", backends: [], reasonCodes: ["CAPABILITY_STALE"] };
  if (context.capability === "revoked") return { disposition: "unschedulable", backends: [], reasonCodes: ["CAPABILITY_REVOKED"] };
  const backends = defaults[manifest.workloadClass].filter((backend) => manifest.backendPreferences.includes(backend));
  if (backends.length === 0) return { disposition: "unschedulable", backends: [], reasonCodes: ["BACKEND_INCOMPATIBLE"] };
  return { disposition: "eligible", backends, reasonCodes: [] };
}
assert.equal(suite.status, "structural-conformance-candidate-not-runtime-evidence");
const seenIds = new Set();
const coveredClasses = new Set();
const dispositions = new Set();
for (const item of suite.cases) {
  assert.ok(!seenIds.has(item.id), `duplicate case ${item.id}`);
  seenIds.add(item.id);
  const manifest = merge(structuredClone(base), item.manifestPatch);
  assert.equal(validate(manifest), true, `${item.id}: ${ajv.errorsText(validate.errors)}`);
  const expected = item.expected;
  assert.ok(["eligible", "denied", "unschedulable", "unavailable"].includes(expected.disposition), item.id);
  assert.ok(Array.isArray(expected.backends) && Array.isArray(expected.reasonCodes), item.id);
  assert.equal(new Set(expected.backends).size, expected.backends.length, item.id);
  assert.equal(new Set(expected.reasonCodes).size, expected.reasonCodes.length, item.id);
  assert.ok(expected.backends.every((backend) => defaults[manifest.workloadClass].includes(backend)), item.id);
  assert.ok(expected.backends.every((backend) => manifest.backendPreferences.includes(backend)), item.id);
  assert.equal(expected.backends.length > 0, expected.disposition === "eligible", item.id);
  assert.equal(expected.reasonCodes.length === 0, expected.disposition === "eligible", item.id);
  assert.deepEqual(expected, expectedDecision(manifest, item.context), `${item.id}: decision table mismatch`);
  if (expected.disposition === "eligible") coveredClasses.add(manifest.workloadClass);
  dispositions.add(expected.disposition);
}
assert.deepEqual([...coveredClasses].sort(), Object.keys(defaults).sort(), "each v1 class needs an eligible case");
assert.deepEqual([...dispositions].sort(), ["denied", "eligible", "unavailable", "unschedulable"]);
process.stdout.write(`Classification decision cases and candidate oracle agree: ${seenIds.size} cases, ${coveredClasses.size} v1 classes. No classifier executed.\n`);
