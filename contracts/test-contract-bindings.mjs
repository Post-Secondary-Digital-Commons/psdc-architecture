import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateWorkloadSubmitTrace, validateLeaseCommandBindings } from "./validate-contract-bindings.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const read = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const fixturePaths = [
  "fixtures/positive/workload-manifest.fixture.json",
  "fixtures/negative/workload-invalid-classification.fixture.json",
  "fixtures/positive/workload-submitted-data.fixture.json",
  "fixtures/positive/event-envelope.fixture.json"
];
const input = {
  trace: read("traceability/workload-submit.trace.json"),
  manifestSchema: read("compute/workload-manifest.schema.json"),
  eventDataSchema: read("events/workload-submitted-data.schema.json"),
  openApi: read("compute/compute-control-plane.openapi.json"),
  asyncApi: read("events/compute-fabric.asyncapi.json"),
  fixtures: new Map(fixturePaths.map((file) => { const fixture = read(file); return [fixture.fixtureId, fixture]; }))
};
const lease = {
  registry: read("compute/lease-commands.registry.json"),
  machine: read("state-machines/lease.machine.json"),
  openApi: input.openApi
};

assert.deepEqual(validateWorkloadSubmitTrace(input), []);
assert.deepEqual(validateLeaseCommandBindings(lease), []);

function mutateWorkload(name, mutate, expected) {
  const copy = structuredClone(input);
  mutate(copy);
  assert.ok(validateWorkloadSubmitTrace(copy).some((finding) => finding.includes(expected)), `${name} escaped validation`);
}
function mutateLease(name, mutate, expected) {
  const copy = structuredClone(lease);
  mutate(copy);
  assert.ok(validateLeaseCommandBindings(copy).some((finding) => finding.includes(expected)), `${name} escaped validation`);
}

mutateWorkload("wrong live request ref", (copy) => { copy.openApi.paths["/workloads"].post.requestBody.content["application/json"].schema.$ref = "offer.schema.json"; }, "request-body schema ref");
mutateWorkload("missing live idempotency parameter", (copy) => { copy.openApi.paths["/workloads"].post.parameters = []; }, "idempotency parameter");
mutateWorkload("wrong live event data schema", (copy) => { copy.asyncApi.components.messages.workloadSubmitted["x-psdc-data-schema"] = copy.trace.manifestSchemaId; }, "event data schema");
mutateWorkload("wrong event fixture type", (copy) => { copy.fixtures.get(copy.trace.fixtures.positiveEventEnvelope).instance.type = "org.psdc.compute.offer.changed.v1"; }, "envelope fixture type");
mutateWorkload("protected event body", (copy) => { copy.fixtures.get(copy.trace.fixtures.positiveEventEnvelope).instance.data.purpose = "private student work"; }, "only the manifest reference");
mutateLease("wrong registry machine", (copy) => { copy.registry.machineId = "compute.offer.v1"; }, "machineId");
mutateLease("unbound transition request body", (copy) => { copy.openApi.paths["/leases/{leaseId}/{action}"].post.requestBody.$ref = "#/components/requestBodies/ProviderTransitionRequest"; }, "request body does not reference");
mutateLease("missing bound generation fence", (copy) => { copy.openApi.components.requestBodies.LeaseTransitionRequest.content["application/json"].schema.required = ["authorizationDecisionId", "reason"]; }, "generation fence");

console.log("Contract binding mutation tests passed: 8 adversarial changes rejected.");
