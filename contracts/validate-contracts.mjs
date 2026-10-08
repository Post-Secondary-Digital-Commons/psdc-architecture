import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createHash, createPublicKey, verify } from "node:crypto";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import SwaggerParser from "@apidevtools/swagger-parser";
import { DiagnosticSeverity, Parser, fromFile } from "@asyncapi/parser";
import canonicalize from "canonicalize";
import { validateWorkloadSubmitTrace, validateLeaseCommandBindings, validateReasonAdjudicationBinding } from "./validate-contract-bindings.mjs";

const contractsRoot = path.dirname(fileURLToPath(import.meta.url));

function walk(directory, suffix) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(fullPath, suffix) : (entry.name.endsWith(suffix) ? [fullPath] : []);
    })
    .sort();
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`${path.relative(contractsRoot, filePath)} is not valid JSON: ${error.message}`);
  }
}

function pointerGet(document, pointer) {
  if (pointer === "") return document;
  if (!pointer.startsWith("/")) throw new Error(`JSON Pointer must begin with '/': ${pointer}`);
  return pointer.slice(1).split("/").reduce((current, segment) => {
    const key = segment.replaceAll("~1", "/").replaceAll("~0", "~");
    return current === undefined || current === null ? undefined : current[key];
  }, document);
}

function collectRefs(value, refs = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectRefs(item, refs);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key === "$ref" && typeof item === "string") refs.push(item);
      else collectRefs(item, refs);
    }
  }
  return refs;
}

function validateExternalRefs(document, filePath, failures) {
  for (const ref of collectRefs(document)) {
    if (ref.startsWith("#") || ref.startsWith("urn:") || /^[a-z]+:\/\//i.test(ref)) continue;
    const filePart = ref.split("#", 1)[0];
    const target = path.resolve(path.dirname(filePath), filePart);
    if (!fs.existsSync(target)) failures.push(`${path.relative(contractsRoot, filePath)}: unresolved external $ref ${ref}`);
  }
}

function compareOrdered(instance, pointers, relativePath, failures) {
  for (let index = 0; index < pointers.length - 1; index += 1) {
    const left = pointerGet(instance, pointers[index]);
    const right = pointerGet(instance, pointers[index + 1]);
    if (left === undefined || right === undefined) continue;
    const leftTime = Date.parse(left);
    const rightTime = Date.parse(right);
    if (!Number.isFinite(leftTime) || !Number.isFinite(rightTime) || leftTime > rightTime) {
      failures.push(`${relativePath}: semantic ordering requires ${pointers[index]} <= ${pointers[index + 1]}`);
    }
  }
}

function decimalToNano(value) {
  const match = /^(-?)(\d+)(?:\.(\d{1,9}))?$/.exec(value);
  if (!match) return undefined;
  const magnitude = BigInt(match[2]) * 1000000000n + BigInt((match[3] ?? "").padEnd(9, "0"));
  return match[1] === "-" ? -magnitude : magnitude;
}

function validateSemantics(schemaId, instance, relativePath, failures) {
  const timelines = {
    "urn:psdc:contracts:common:authorization-decision:1": [["/issuedAt", "/expiresAt"]],
    "urn:psdc:contracts:common:signed-object-envelope:1": [["/signedAt", "/expiresAt"]],
    "urn:psdc:contracts:events:event-envelope:1": [["/time", "/expiresat"]],
    "urn:psdc:contracts:compute:capability:1": [["/observedAt", "/expiresAt"], ["/drain/requestedAt", "/observedAt"]],
    "urn:psdc:contracts:compute:workload-manifest:1": [["/submittedAt", "/schedule/deadline"]],
    "urn:psdc:contracts:compute:offer:1": [["/availableFrom", "/expiresAt"]],
    "urn:psdc:contracts:compute:lease:1": [["/issuedAt", "/activateBy", "/expiresAt"], ["/issuedAt", "/activatedAt", "/expiresAt"], ["/issuedAt", "/renewalDeadline", "/expiresAt"], ["/issuedAt", "/activationGrant/grantedAt", "/activatedAt", "/expiresAt"], ["/activatedAt", "/activateBy"]],
    "urn:psdc:contracts:compute:usage-receipt:1": [["/interval/startedAt", "/interval/endedAt", "/recordedAt"]],
    "urn:psdc:contracts:storage:placement:1": [["/issuedAt", "/expiresAt"]],
    "urn:psdc:contracts:network:path:1": [["/observedAt", "/expiresAt"]],
    "urn:psdc:contracts:network:reservation:1": [["/issuedAt", "/activateBy", "/expiresAt"], ["/issuedAt", "/terminalAt"]],
    "urn:psdc:contracts:security:kms-operation-grant:1": [["/notBefore", "/expiresAt"], ["/notBefore", "/revocation/revokedAt"]],
    "urn:psdc:contracts:economics:settlement-batch:1": [["/window/startedAt", "/window/endedAt", "/createdAt", "/disputeDeadline"]],
    "urn:psdc:contracts:economics:ledger-commitment:1": [["/submittedAt", "/finalizedAt"]],
    "urn:psdc:contracts:economics:dispute-case:1": [["/openedAt", "/responseDueAt"], ["/openedAt", "/resolvedAt"]]
  };
  for (const pointers of timelines[schemaId] ?? []) compareOrdered(instance, pointers, relativePath, failures);

  if (schemaId === "urn:psdc:contracts:network:path:1" && instance.bandwidth?.availableMbps > instance.bandwidth?.capacityMbps) {
    failures.push(`${relativePath}: available bandwidth exceeds path capacity`);
  }
  if (schemaId === "urn:psdc:contracts:storage:placement:1") {
    if (instance.durability.minimumHealthyProviders > instance.providers.length) failures.push(`${relativePath}: minimumHealthyProviders exceeds assigned provider count`);
    if (instance.repairPolicy.repairThreshold > instance.repairPolicy.targetHealthyProviders) failures.push(`${relativePath}: repairThreshold exceeds targetHealthyProviders`);
  }
  if (schemaId === "urn:psdc:contracts:economics:settlement-batch:1") {
    if (instance.sequenceRange.start > instance.sequenceRange.end) failures.push(`${relativePath}: sequenceRange.start exceeds sequenceRange.end`);
    const deltas = instance.balanceDeltas.map(({ delta }) => decimalToNano(delta.amount));
    if (deltas.some((value) => value === undefined) || deltas.reduce((sum, value) => sum + value, 0n) !== 0n) failures.push(`${relativePath}: balance deltas must sum exactly to zero at 9-decimal IRU precision`);
  }
}

const reasonRegistry = readJson(path.join(contractsRoot, "common", "reason-codes.registry.json"));
const reasonsByCode = new Map(reasonRegistry.codes.map((entry) => [entry.code, entry]));
const preemptionCategories = new Set(["owner_reclaim", "capacity_reclaim", "drain_deadline"]);
const leaseReasonStatuses = new Set(["released", "expired", "revoked", "failed"]);

function validateReasonRules(schemaId, instance, relativePath, failures) {
  if (schemaId === "urn:psdc:contracts:compute:lease:1" && leaseReasonStatuses.has(instance.status)) {
    const code = instance.reason?.code;
    const entry = reasonsByCode.get(code);
    if (!code) failures.push(`${relativePath}: lease in terminal status ${instance.status} requires a reason code`);
    else if (!entry) failures.push(`${relativePath}: lease reason code ${code} is not in the reason-code registry`);
    else if (!entry.appliesTo.includes(`lease:${instance.status}`)) failures.push(`${relativePath}: reason code ${code} does not apply to lease status ${instance.status}`);
  }
  if (schemaId === "urn:psdc:contracts:compute:usage-receipt:1") {
    const code = instance.reason?.code;
    const entry = code === undefined ? undefined : reasonsByCode.get(code);
    if (code !== undefined && !entry) failures.push(`${relativePath}: receipt reason code ${code} is not in the reason-code registry`);
    if (entry?.usageOutcomes && !entry.usageOutcomes.includes(instance.outcome)) failures.push(`${relativePath}: reason code ${code} is inconsistent with outcome ${instance.outcome}`);
    if (instance.outcome === "preempted" && !(entry && preemptionCategories.has(entry.category))) failures.push(`${relativePath}: outcome preempted requires a registered owner_reclaim, capacity_reclaim or drain_deadline reason code`);
  }
  if (schemaId === "urn:psdc:contracts:compute:lease:1") {
    const windowSeconds = (Date.parse(instance.expiresAt) - Date.parse(instance.issuedAt)) / 1000;
    if (instance.leaseDurationSeconds > windowSeconds) failures.push(`${relativePath}: leaseDurationSeconds exceeds the window between issuedAt and expiresAt`);
    if (instance.maximumDisconnectedSeconds > instance.leaseDurationSeconds) failures.push(`${relativePath}: maximumDisconnectedSeconds exceeds leaseDurationSeconds`);
    if (instance.activationGrant) {
      const grant = instance.activationGrant;
      const remainingWindow = (Date.parse(instance.expiresAt) - Date.parse(grant.grantedAt)) / 1000;
      if (grant.generation !== instance.generation) failures.push(`${relativePath}: activation grant generation does not match lease generation`);
      if (grant.remainingDurationSeconds > remainingWindow) failures.push(`${relativePath}: activation grant exceeds remaining expiry window`);
      if (grant.remainingDurationSeconds > instance.leaseDurationSeconds) failures.push(`${relativePath}: activation grant exceeds lease duration cap`);
      if (instance.maximumDisconnectedSeconds > grant.remainingDurationSeconds) failures.push(`${relativePath}: disconnected bound exceeds activation grant`);
    }
  }
  if (schemaId === "urn:psdc:contracts:compute:reason-adjudication:1") {
    if (instance.adjudicatorId === instance.providerId) failures.push(`${relativePath}: provider cannot adjudicate its own reason assertion`);
    if (instance.status === "confirmed") {
      const determined = reasonsByCode.get(instance.determinedReasonCode);
      if (!determined || !determined.appliesTo.some((target) => target.startsWith("lease:"))) failures.push(`${relativePath}: determined reason is not a registered lease reason`);
      if (instance.effects.providerFault && !determined?.providerFault) failures.push(`${relativePath}: provider fault effect contradicts determined reason`);
      if (instance.effects.settlementDisposition === "penalty_review" && !instance.effects.providerFault) failures.push(`${relativePath}: penalty review requires an adjudicated provider fault`);
      if (instance.policyDecision.outcome !== "allow") failures.push(`${relativePath}: confirmed adjudication requires an allowing policy decision`);
    }
  }
  if (schemaId === "urn:psdc:contracts:compute:capability:1" && instance.drain) {
    const entry = reasonsByCode.get(instance.drain.reasonCode);
    if (!entry || !entry.appliesTo.includes("capability:draining")) failures.push(`${relativePath}: drain.reasonCode ${instance.drain.reasonCode} is not a registered capability drain reason`);
  }
}

function validateRegistry(failures) {
  const seen = new Set();
  const categories = new Set(["normal", "timeout", "owner_reclaim", "capacity_reclaim", "drain_deadline", "revocation_for_cause", "fault"]);
  for (const entry of reasonRegistry.codes) {
    if (!/^[A-Z][A-Z0-9_]{2,63}$/.test(entry.code)) failures.push(`reason-codes.registry.json: invalid code ${entry.code}`);
    if (seen.has(entry.code)) failures.push(`reason-codes.registry.json: duplicate code ${entry.code}`);
    seen.add(entry.code);
    if (!categories.has(entry.category)) failures.push(`reason-codes.registry.json: ${entry.code} has unknown category ${entry.category}`);
    if (!Array.isArray(entry.appliesTo) || entry.appliesTo.length === 0) failures.push(`reason-codes.registry.json: ${entry.code} must apply to at least one status`);
    for (const target of entry.appliesTo ?? []) if (!/^(lease|capability):[a-z_]+$/.test(target)) failures.push(`reason-codes.registry.json: ${entry.code} has malformed appliesTo ${target}`);
    if (preemptionCategories.has(entry.category) && entry.appliesTo.some((t) => t.startsWith("lease:")) && JSON.stringify(entry.usageOutcomes) !== JSON.stringify(["preempted"])) {
      failures.push(`reason-codes.registry.json: preemption code ${entry.code} must map only to outcome preempted`);
    }
  }
}

// strictRequired is disabled because conditional branches require properties declared on the
// root object; every other strict-mode check remains enabled.
const ajv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false, allowUnionTypes: true, validateFormats: true });
addFormats(ajv);

const schemaFiles = walk(contractsRoot, ".schema.json");
const schemas = schemaFiles.map((filePath) => ({ filePath, schema: readJson(filePath) }));
const ids = new Set();

for (const { filePath, schema } of schemas) {
  if (!schema.$id) throw new Error(`${path.relative(contractsRoot, filePath)} has no $id`);
  if (ids.has(schema.$id)) throw new Error(`Duplicate schema $id: ${schema.$id}`);
  ids.add(schema.$id);
  ajv.addSchema(schema, schema.$id);
}

const fixtureSchemaId = "urn:psdc:contracts:fixtures:case:1";
const fixtureValidator = ajv.getSchema(fixtureSchemaId);
if (!fixtureValidator) throw new Error(`Required fixture schema not registered: ${fixtureSchemaId}`);

const fixtureFiles = walk(path.join(contractsRoot, "fixtures"), ".fixture.json");
const fixtureIds = new Set();
const categories = new Set();
const positiveCoverage = new Set();
const failures = [];
validateRegistry(failures);

for (const filePath of fixtureFiles) {
  const fixture = readJson(filePath);
  const relativePath = path.relative(contractsRoot, filePath);
  if (/algonquin/i.test(JSON.stringify(fixture))) failures.push(`${relativePath}: common conformance fixture contains an institution-specific Algonquin identifier`);

  if (!fixtureValidator(fixture)) {
    failures.push(`${relativePath}: invalid fixture wrapper: ${ajv.errorsText(fixtureValidator.errors, { separator: "; " })}`);
    continue;
  }
  if (fixtureIds.has(fixture.fixtureId)) {
    failures.push(`${relativePath}: duplicate fixtureId ${fixture.fixtureId}`);
    continue;
  }
  fixtureIds.add(fixture.fixtureId);
  categories.add(fixture.category);

  const validator = ajv.getSchema(fixture.schemaId);
  if (!validator) {
    failures.push(`${relativePath}: unknown schemaId ${fixture.schemaId}`);
    continue;
  }

  const valid = validator(fixture.instance);
  if (valid !== fixture.expected.schemaValid) {
    failures.push(`${relativePath}: expected schemaValid=${fixture.expected.schemaValid}, got ${valid}; ${ajv.errorsText(validator.errors, { separator: "; " })}`);
  }

  if (fixture.category === "positive" && valid) positiveCoverage.add(fixture.schemaId);
  if (valid) {
    const semanticFailures = [];
    validateSemantics(fixture.schemaId, fixture.instance, relativePath, semanticFailures);
    validateReasonRules(fixture.schemaId, fixture.instance, relativePath, semanticFailures);
    const expectedViolation = fixture.expected.semanticViolation;
    if (expectedViolation === undefined) failures.push(...semanticFailures);
    else if (!semanticFailures.some((message) => message.includes(expectedViolation))) failures.push(`${relativePath}: expected a semantic violation containing ${JSON.stringify(expectedViolation)}, got ${semanticFailures.length === 0 ? "none" : semanticFailures.join(" | ")}`);
  } else if (fixture.expected.semanticViolation !== undefined) {
    failures.push(`${relativePath}: semanticViolation expectation requires a schema-valid instance`);
  }

  const assertions = [
    ["statusPath", "expectedStatus"],
    ["reasonPath", "expectedReasonCode"]
  ];
  for (const [pathField, expectedField] of assertions) {
    if (fixture.expected[pathField] !== undefined) {
      const observed = pointerGet(fixture.instance, fixture.expected[pathField]);
      if (observed !== fixture.expected[expectedField]) {
        failures.push(`${relativePath}: ${fixture.expected[pathField]} expected ${JSON.stringify(fixture.expected[expectedField])}, got ${JSON.stringify(observed)}`);
      }
    }
  }
}

const productionSchemas = schemas
  .map(({ schema }) => schema.$id)
  .filter((id) => !id.includes(":common:") && !id.includes(":fixtures:"));
for (const schemaId of productionSchemas) {
  if (!positiveCoverage.has(schemaId)) failures.push(`No positive fixture covers ${schemaId}`);
}

for (const requiredCategory of ["positive", "negative", "timeout", "retry", "revocation", "failure"]) {
  if (!categories.has(requiredCategory)) failures.push(`Missing required fixture category: ${requiredCategory}`);
}

const stateMachineFiles = walk(path.join(contractsRoot, "state-machines"), ".machine.json");
const stateMachineValidator = ajv.getSchema("urn:psdc:contracts:common:state-machine:1");
const machineIds = new Set();
const machinesById = new Map();

for (const filePath of stateMachineFiles) {
  const machine = readJson(filePath);
  const relativePath = path.relative(contractsRoot, filePath);
  if (!stateMachineValidator(machine)) {
    failures.push(`${relativePath}: invalid state machine: ${ajv.errorsText(stateMachineValidator.errors, { separator: "; " })}`);
    continue;
  }
  if (machineIds.has(machine.machineId)) failures.push(`${relativePath}: duplicate machineId ${machine.machineId}`);
  machineIds.add(machine.machineId);
  machinesById.set(machine.machineId, machine);

  const contract = schemas.find(({ schema }) => schema.$id === machine.contractSchemaId)?.schema;
  if (!contract) {
    failures.push(`${relativePath}: unknown contractSchemaId ${machine.contractSchemaId}`);
    continue;
  }
  const contractStates = pointerGet(contract, machine.statePointer);
  if (!Array.isArray(contractStates)) {
    failures.push(`${relativePath}: statePointer ${machine.statePointer} does not resolve to an enum array`);
    continue;
  }
  const declared = new Set(machine.states);
  const expected = new Set(contractStates);
  if (declared.size !== expected.size || [...declared].some((state) => !expected.has(state))) {
    failures.push(`${relativePath}: states do not exactly match ${machine.contractSchemaId}${machine.statePointer}`);
  }
  for (const state of [...machine.initialStates, ...machine.terminalStates]) {
    if (!declared.has(state)) failures.push(`${relativePath}: undeclared initial/terminal state ${state}`);
  }

  const transitionKeys = new Set();
  for (const transition of machine.transitions) {
    if (!declared.has(transition.from) || !declared.has(transition.to)) {
      failures.push(`${relativePath}: transition ${transition.action} references an undeclared state`);
    }
    if (machine.terminalStates.includes(transition.from)) {
      failures.push(`${relativePath}: terminal state ${transition.from} has outbound transition ${transition.action}`);
    }
    const key = `${transition.from}\u0000${transition.action}\u0000${transition.to}`;
    if (transitionKeys.has(key)) failures.push(`${relativePath}: duplicate transition ${transition.from}/${transition.action}/${transition.to}`);
    transitionKeys.add(key);
  }

  const reachable = new Set(machine.initialStates);
  let changed = true;
  while (changed) {
    changed = false;
    for (const transition of machine.transitions) {
      if (reachable.has(transition.from) && !reachable.has(transition.to)) {
        reachable.add(transition.to);
        changed = true;
      }
    }
  }
  for (const state of machine.states) {
    if (!reachable.has(state)) failures.push(`${relativePath}: state ${state} is unreachable from an initial state`);
  }
}

const transitionCasePath = path.join(contractsRoot, "state-machines", "state-transition-cases.json");
const transitionCases = readJson(transitionCasePath);
const transitionCaseValidator = ajv.getSchema("urn:psdc:contracts:common:state-transition-cases:1");
if (!transitionCaseValidator(transitionCases)) {
  failures.push(`state-machines/state-transition-cases.json: ${ajv.errorsText(transitionCaseValidator.errors, { separator: "; " })}`);
} else {
  const caseIds = new Set();
  const coverage = new Map([...machineIds].map((id) => [id, new Set()]));
  for (const testCase of transitionCases.cases) {
    if (caseIds.has(testCase.caseId)) failures.push(`state-machines/state-transition-cases.json: duplicate caseId ${testCase.caseId}`);
    caseIds.add(testCase.caseId);
    const machine = machinesById.get(testCase.machineId);
    if (!machine) {
      failures.push(`state-machines/state-transition-cases.json: unknown machineId ${testCase.machineId}`);
      continue;
    }
    coverage.get(testCase.machineId).add(testCase.kind);
    const transition = machine.transitions.find(({ from, action, to }) => from === testCase.from && action === testCase.action && to === testCase.to);
    if (testCase.expectedAllowed && !transition) failures.push(`state-machines/state-transition-cases.json: ${testCase.caseId} expected an allowed transition that is not declared`);
    if (!testCase.expectedAllowed && transition) failures.push(`state-machines/state-transition-cases.json: ${testCase.caseId} expected denial but transition is declared`);
    if (testCase.kind === "replay" && transition && !transition.idempotent) failures.push(`state-machines/state-transition-cases.json: ${testCase.caseId} replays a non-idempotent transition`);
  }
  for (const [machineId, kinds] of coverage) {
    if (!kinds.has("positive") || !kinds.has("negative")) failures.push(`state-machines/state-transition-cases.json: ${machineId} requires positive and negative transition coverage`);
  }
}

const canonicalizationVectors = readJson(path.join(contractsRoot, "vectors", "canonicalization.vectors.json"));
for (const vector of canonicalizationVectors.cases ?? []) {
  const observedCanonical = canonicalize(vector.input);
  const observedDigest = createHash("sha256").update(observedCanonical, "utf8").digest("hex");
  if (observedCanonical !== vector.expectedCanonical) failures.push(`vectors/canonicalization.vectors.json: ${vector.id} canonical bytes differ`);
  if (observedDigest !== vector.expectedSha256) failures.push(`vectors/canonicalization.vectors.json: ${vector.id} SHA-256 differs`);
}

const signatureVectors = readJson(path.join(contractsRoot, "vectors", "signature.vectors.json"));
for (const vector of signatureVectors.cases ?? []) {
  if (vector.algorithm !== "Ed25519") {
    failures.push(`vectors/signature.vectors.json: ${vector.id} has unsupported test algorithm ${vector.algorithm}`);
    continue;
  }
  const payload = vector.payloadEncoding === "rfc8785-json" ? Buffer.from(canonicalize(vector.payload), "utf8") : Buffer.from(vector.payload, "utf8");
  const publicKeyDer = Buffer.concat([Buffer.from("302a300506032b6570032100", "hex"), Buffer.from(vector.publicKeyHex, "hex")]);
  const publicKey = createPublicKey({ key: publicKeyDer, format: "der", type: "spki" });
  const observedValid = verify(null, payload, publicKey, Buffer.from(vector.signatureHex, "hex"));
  if (observedValid !== vector.expectedValid) failures.push(`vectors/signature.vectors.json: ${vector.id} expected valid=${vector.expectedValid}, got ${observedValid}`);
}

const openApiFiles = walk(contractsRoot, ".openapi.json");
const operationIds = new Set();
for (const filePath of openApiFiles) {
  const document = readJson(filePath);
  const relativePath = path.relative(contractsRoot, filePath);
  validateExternalRefs(document, filePath, failures);
  if (!/^3\.1\./.test(document.openapi ?? "")) failures.push(`${relativePath}: OpenAPI version must be 3.1.x`);
  if (!document.info?.title || !document.info?.version) failures.push(`${relativePath}: info.title and info.version are required`);
  if (!document.paths || Object.keys(document.paths).length === 0) failures.push(`${relativePath}: at least one path is required`);
  if (path.basename(filePath) === "compute-control-plane.openapi.json") {
    const registry = readJson(path.join(contractsRoot, "compute", "lease-commands.registry.json"));
    const machine = readJson(path.join(contractsRoot, "state-machines", "lease.machine.json"));
    const machineActions = new Set(machine.transitions.map((transition) => transition.action));
    const registered = new Map();
    for (const command of registry.commands) {
      if (registered.has(command.action)) failures.push(`lease-commands.registry.json: duplicate action ${command.action}`);
      registered.set(command.action, command);
      if (!registry.classifications.includes(command.classification)) failures.push(`lease-commands.registry.json: ${command.action} has unknown classification ${command.classification}`);
      if (!machineActions.has(command.action)) failures.push(`lease-commands.registry.json: ${command.action} is not a lease state-machine action`);
      if ((command.classification === "external_command") !== (command.apiAction !== undefined)) failures.push(`lease-commands.registry.json: ${command.action} must declare apiAction exactly when it is an external_command`);
      if (command.requiresExpectedGeneration !== true) failures.push(`lease-commands.registry.json: ${command.action} must require expectedGeneration`);
    }
    for (const action of machineActions) if (!registered.has(action)) failures.push(`lease-commands.registry.json: state-machine action ${action} is not classified`);
    const leasePath = document.paths?.[registry.openApi.path]?.post;
    const apiActions = document.paths?.[registry.openApi.path]?.parameters?.find((parameter) => parameter.name === "action")?.schema?.enum ?? [];
    const externalActions = registry.commands.filter((command) => command.classification === "external_command").map((command) => command.apiAction);
    if (leasePath?.operationId !== registry.openApi.operationId) failures.push(`${relativePath}: ${registry.openApi.path} must use operationId ${registry.openApi.operationId}`);
    for (const apiAction of apiActions) if (!externalActions.includes(apiAction)) failures.push(`${relativePath}: API action ${apiAction} is not a registered external lease command`);
    for (const apiAction of externalActions) if (!apiActions.includes(apiAction)) failures.push(`${relativePath}: registered external command ${apiAction} is missing from the API action enum`);
    const leaseTransitionSchema = document.components?.requestBodies?.[registry.openApi.requestBody]?.content?.["application/json"]?.schema;
    for (const field of ["authorizationDecisionId", "reason", "expectedGeneration"]) {
      if (!leaseTransitionSchema?.required?.includes(field)) failures.push(`${relativePath}: ${registry.openApi.requestBody} must require ${field}`);
    }
    if (leaseTransitionSchema?.properties?.expectedGeneration?.minimum !== 1) failures.push(`${relativePath}: expectedGeneration must be an integer with minimum 1`);
  }
  try {
    await SwaggerParser.validate(filePath, { resolve: { external: false } });
  } catch (error) {
    failures.push(`${relativePath}: official OpenAPI parser rejected document: ${error.message}`);
  }
  for (const [route, pathItem] of Object.entries(document.paths ?? {})) {
    for (const method of ["get", "post", "put", "patch", "delete"]) {
      const operation = pathItem[method];
      if (!operation) continue;
      if (!operation.operationId) failures.push(`${relativePath}: ${method.toUpperCase()} ${route} has no operationId`);
      else if (operationIds.has(operation.operationId)) failures.push(`${relativePath}: duplicate operationId ${operation.operationId}`);
      else operationIds.add(operation.operationId);
      if (!operation.responses || Object.keys(operation.responses).length === 0) failures.push(`${relativePath}: ${operation.operationId ?? route} has no responses`);
    }
  }
}

const asyncApiFiles = walk(contractsRoot, ".asyncapi.json");
const schemaById = new Map(schemas.map(({ schema }) => [schema.$id, schema]));
const urnResolver = {
  schema: "urn",
  canRead: (uri) => uri.toString().startsWith("urn:psdc:contracts:"),
  read: (uri) => {
    const schema = schemaById.get(uri.toString().split("#", 1)[0]);
    return schema ? JSON.stringify(schema) : undefined;
  }
};
for (const filePath of asyncApiFiles) {
  const document = readJson(filePath);
  const relativePath = path.relative(contractsRoot, filePath);
  validateExternalRefs(document, filePath, failures);
  if (!/^3\.1\./.test(document.asyncapi ?? "")) failures.push(`${relativePath}: AsyncAPI version must be 3.1.x`);
  if (!document.info?.title || !document.info?.version) failures.push(`${relativePath}: info.title and info.version are required`);
  if (!document.channels || Object.keys(document.channels).length === 0) failures.push(`${relativePath}: at least one channel is required`);
  for (const [messageName, message] of Object.entries(document.components?.messages ?? {})) {
    if (!message.payload?.$ref) failures.push(`${relativePath}: message ${messageName} must reference an event-envelope payload`);
    const dataSchemaId = message["x-psdc-data-schema"];
    if (!dataSchemaId || !ids.has(dataSchemaId)) failures.push(`${relativePath}: message ${messageName} has unknown x-psdc-data-schema ${dataSchemaId}`);
  }
  const parser = new Parser({ __unstable: { resolver: { resolvers: [urnResolver] } } });
  const parsed = await fromFile(parser, filePath).parse();
  for (const diagnostic of parsed.diagnostics.filter(({ severity }) => severity <= DiagnosticSeverity.Warning)) {
    failures.push(`${relativePath}: official AsyncAPI parser ${DiagnosticSeverity[diagnostic.severity].toLowerCase()}: ${diagnostic.message}`);
  }
  if (!parsed.document) failures.push(`${relativePath}: official AsyncAPI parser produced no document`);
}

const trace = readJson(path.join(contractsRoot, "traceability", "workload-submit.trace.json"));
const computeOpenApi = readJson(path.join(contractsRoot, "compute", "compute-control-plane.openapi.json"));
const computeAsyncApi = readJson(path.join(contractsRoot, "events", "compute-fabric.asyncapi.json"));
const fixtureById = new Map(fixtureFiles.map((filePath) => {
  const fixture = readJson(filePath);
  return [fixture.fixtureId, fixture];
}));
failures.push(...validateWorkloadSubmitTrace({
  trace,
  manifestSchema: schemaById.get(trace.manifestSchemaId),
  eventDataSchema: schemaById.get(trace.event.dataSchemaId),
  openApi: computeOpenApi,
  asyncApi: computeAsyncApi,
  fixtures: fixtureById
}));
failures.push(...validateLeaseCommandBindings({
  registry: readJson(path.join(contractsRoot, "compute", "lease-commands.registry.json")),
  machine: readJson(path.join(contractsRoot, "state-machines", "lease.machine.json")),
  openApi: computeOpenApi
}));
failures.push(...validateReasonAdjudicationBinding({
  schema: schemaById.get("urn:psdc:contracts:compute:reason-adjudication:1"),
  openApi: computeOpenApi,
  positiveFixture: fixtureById.get("positive.compute.reason-adjudication")
}));

if (failures.length > 0) {
  for (const failure of failures) console.error(`ERROR ${failure}`);
  console.error(`Contract validation failed: ${failures.length} finding(s).`);
  process.exit(1);
}

console.log(`Contract validation passed: ${schemas.length} schemas, ${fixtureFiles.length} fixtures, ${productionSchemas.length} production contracts, ${stateMachineFiles.length} executable state machines, ${transitionCases.cases.length} transition cases, ${canonicalizationVectors.cases.length} canonicalization vectors, ${signatureVectors.cases.length} signature vectors, ${openApiFiles.length} OpenAPI document(s), ${asyncApiFiles.length} AsyncAPI document(s), all required scenario categories present.`);
