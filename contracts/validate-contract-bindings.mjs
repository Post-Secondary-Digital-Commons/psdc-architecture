/** Live document bindings for the first compute interface and lease command registry. */

export function validateWorkloadSubmitTrace({ trace, manifestSchema, eventDataSchema, openApi, asyncApi, fixtures }) {
  const findings = [];
  const fail = (condition, message) => { if (!condition) findings.push(`workload-submit trace: ${message}`); };
  fail(trace.interfaceId === "workload.submit.v1" && trace.ownerRepository === "psdc-compute", "interface ownership differs from the catalog");
  fail(trace.manifestSchemaId === "urn:psdc:contracts:compute:workload-manifest:1" &&
    trace.operation.requestSchemaRef === "workload-manifest.schema.json" &&
    trace.operation.responseSchemaRef === "workload-manifest.schema.json" &&
    trace.operation.acceptedStatus === "202", "trace changes the candidate manifest or accepted-response contract");
  fail(trace.event.dataSchemaId === "urn:psdc:contracts:events:workload-submitted-data:1", "trace changes the reference-only event data contract");
  fail(manifestSchema?.$id === trace.manifestSchemaId, "manifest schema ID does not match the trace");
  fail(eventDataSchema?.$id === trace.event.dataSchemaId, "event data schema ID does not match the trace");
  fail(JSON.stringify(eventDataSchema?.required) === JSON.stringify(["workloadId"]) && eventDataSchema?.additionalProperties === false,
    "event data must be a bounded workload-ID reference, not an unscoped manifest copy");

  const operation = openApi.paths?.[trace.operation.path]?.[trace.operation.method];
  fail(operation?.operationId === trace.operation.operationId, "live OpenAPI operationId differs from the trace");
  fail(operation?.requestBody?.content?.["application/json"]?.schema?.$ref === trace.operation.requestSchemaRef, "live OpenAPI request-body schema ref differs from the manifest binding");
  fail(operation?.responses?.[trace.operation.acceptedStatus]?.content?.["application/json"]?.schema?.$ref === trace.operation.responseSchemaRef, "live OpenAPI accepted-response schema ref differs from the trace");
  fail(operation?.parameters?.some((parameter) => parameter.$ref === trace.operation.idempotencyParameterRef), "live operation lacks its required idempotency parameter");

  const message = asyncApi.components?.messages?.[trace.event.messageName];
  fail(message?.payload?.$ref === trace.event.envelopeSchemaRef, "live AsyncAPI message does not use the governed event envelope");
  fail(message?.["x-psdc-event-type"] === trace.event.eventType, "live AsyncAPI event type differs from the trace");
  fail(message?.["x-psdc-data-schema"] === trace.event.dataSchemaId, "live AsyncAPI event data schema differs from the trace");
  fail(asyncApi.channels?.computeEvents?.messages?.[trace.event.messageName]?.$ref === `#/components/messages/${trace.event.messageName}`, "event is not reachable from the compute channel");

  for (const [kind, id, schemaId, valid] of [
    ["positiveManifest", trace.fixtures.positiveManifest, trace.manifestSchemaId, true],
    ["negativeManifest", trace.fixtures.negativeManifest, trace.manifestSchemaId, false],
    ["positiveEventData", trace.fixtures.positiveEventData, trace.event.dataSchemaId, true],
    ["positiveEventEnvelope", trace.fixtures.positiveEventEnvelope, "urn:psdc:contracts:events:event-envelope:1", true]
  ]) {
    const fixture = fixtures.get(id);
    fail(fixture?.schemaId === schemaId && fixture?.expected?.schemaValid === valid,
      `${kind} fixture is missing or bound to the wrong schema/expected result`);
  }
  const envelope = fixtures.get(trace.fixtures.positiveEventEnvelope)?.instance;
  const eventData = fixtures.get(trace.fixtures.positiveEventData)?.instance;
  const manifest = fixtures.get(trace.fixtures.positiveManifest)?.instance;
  fail(envelope?.type === trace.event.eventType && envelope?.dataschema === trace.event.dataSchemaId,
    "event envelope fixture type or dataschema differs from the live message");
  fail(envelope?.data?.workloadId === eventData?.workloadId && eventData?.workloadId === manifest?.workloadId,
    "event reference does not identify the positive workload manifest");
  fail(envelope?.data && Object.keys(envelope.data).length === 1 && envelope.subject === `workload/${manifest?.workloadId}`,
    "event fixture must contain only the manifest reference and a matching subject");
  return findings;
}

export function validateLeaseCommandBindings({ registry, machine, openApi }) {
  const findings = [];
  const fail = (condition, message) => { if (!condition) findings.push(`lease command binding: ${message}`); };
  fail(registry.machineId === machine.machineId && machine.machineId === "compute.lease.v1", "registry machineId differs from the live lease state machine");
  const pathItem = openApi.paths?.[registry.openApi.path];
  const operation = pathItem?.post;
  fail(operation?.operationId === registry.openApi.operationId, "registry operationId differs from the live OpenAPI operation");
  fail(operation?.requestBody?.$ref === `#/components/requestBodies/${registry.openApi.requestBody}`,
    "live operation request body does not reference the registry's transition request body");
  const request = openApi.components?.requestBodies?.[registry.openApi.requestBody]?.content?.["application/json"]?.schema;
  fail(request?.required?.includes("expectedGeneration") && request?.properties?.expectedGeneration?.type === "integer" && request?.properties?.expectedGeneration?.minimum === 1,
    "bound transition request body lacks a generation fence");
  return findings;
}
