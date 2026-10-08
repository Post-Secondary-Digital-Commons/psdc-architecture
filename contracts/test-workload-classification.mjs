import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = path.dirname(fileURLToPath(import.meta.url));
const read = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const ajv = new Ajv2020({ strict: true, strictRequired: false, allowUnionTypes: true, allErrors: true });
addFormats(ajv);
const definitions = read("common/definitions.schema.json");
const schema = read("compute/workload-manifest.schema.json");
ajv.addSchema(definitions, definitions.$id);
ajv.addSchema(schema, schema.$id);
const validate = ajv.getSchema(schema.$id);
const base = read("fixtures/positive/workload-manifest.fixture.json").instance;
let caseCount = 0;

function expectValid(name, mutate) {
  caseCount += 1;
  const instance = structuredClone(base);
  mutate(instance);
  assert.equal(validate(instance), true, `${name}: ${ajv.errorsText(validate.errors)}`);
}
function expectInvalid(name, mutate) {
  caseCount += 1;
  const instance = structuredClone(base);
  mutate(instance);
  assert.equal(validate(instance), false, `${name}: unexpectedly admitted`);
}

assert.equal(validate(base), true, ajv.errorsText(validate.errors));
caseCount += 1;
for (const field of ["accountableOwnerId", "criticality", "parallelism", "networkRequirements", "storageRequirements", "budgetCeiling", "softwareLicenseDecision"]) {
  expectInvalid(`missing ${field}`, (item) => { delete item[field]; });
}
expectInvalid("missing project", (item) => { delete item.requester.projectId; });
expectInvalid("missing residency", (item) => { delete item.placement.residencyCountries; });
expectInvalid("missing scratch", (item) => { delete item.resources.ephemeralStorageBytes; });
expectInvalid("missing ingress", (item) => { delete item.networkRequirements.ingressMode; });
expectInvalid("service without recovery targets", (item) => { item.workloadClass = "container_service"; });
expectValid("service with recovery targets", (item) => {
  item.workloadClass = "container_service";
  item.serviceObjectives = { availabilityTargetPercent: "99.9", rpoSeconds: 300, rtoSeconds: 900, maximumLatencyMs: 250 };
});
expectInvalid("critical workload marked preemptible", (item) => {
  item.criticality = "critical";
  item.serviceObjectives = { availabilityTargetPercent: "99.9", rpoSeconds: 300, rtoSeconds: 900, maximumLatencyMs: 250 };
});
expectInvalid("VM with container image", (item) => {
  item.workloadClass = "vm";
  item.serviceObjectives = { availabilityTargetPercent: "99.9", rpoSeconds: 300, rtoSeconds: 900, maximumLatencyMs: 250 };
});
expectValid("VM with VM image", (item) => {
  item.workloadClass = "vm";
  item.runtime.imageRef = "vm://images.example/vm-1";
  item.serviceObjectives = { availabilityTargetPercent: "99.9", rpoSeconds: 300, rtoSeconds: 900, maximumLatencyMs: 250 };
});
expectInvalid("MPI without network profile", (item) => {
  item.workloadClass = "hpc_mpi";
  item.parallelism.interTaskCommunication = "tightly_coupled";
});
expectValid("MPI with tightly coupled network", (item) => {
  item.workloadClass = "hpc_mpi";
  item.parallelism.interTaskCommunication = "tightly_coupled";
  item.networkRequirements.networkProfileId = "network.hpc.fabric";
});

process.stdout.write(`Workload classification contract passed: ${caseCount} core and conditional cases.\n`);
