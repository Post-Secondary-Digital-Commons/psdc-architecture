import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const script = path.join(root, "test-event-delivery.py");
const tracePath = path.join(root, "events/event-delivery.trace.json");
const candidates = process.env.PSDC_PYTHON
  ? [[process.env.PSDC_PYTHON]]
  : process.platform === "win32" ? [["py", "-3"], ["python"]] : [["python3"], ["python"]];
let interpreter;
for (const candidate of candidates) {
  const probe = spawnSync(candidate[0], [...candidate.slice(1), "--version"], { encoding: "utf8" });
  if (!probe.error && probe.status === 0) {
    interpreter = candidate;
    break;
  }
}
if (!interpreter) throw new Error("Python 3.8+ is required for the independent C0 event model; set PSDC_PYTHON if needed");

function run(trace) {
  return spawnSync(interpreter[0], [...interpreter.slice(1), script, trace], { encoding: "utf8" });
}

const positive = run(tracePath);
assert.equal(positive.status, 0, positive.stderr || positive.stdout);
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "psdc-event-trace-"));
try {
  const mutated = JSON.parse(fs.readFileSync(tracePath, "utf8"));
  mutated.cases[0].expected = "duplicate";
  const mutationPath = path.join(temporaryRoot, "wrong-expectation.json");
  fs.writeFileSync(mutationPath, JSON.stringify(mutated));
  const negative = run(mutationPath);
  assert.notEqual(negative.status, 0, "Python model accepted an incorrect trace expectation");
  assert.match(negative.stderr, /first: expected duplicate, got applied/);
  console.log(positive.stdout.trim());
  console.log("Cross-language trace mutation rejected.");
} finally {
  const resolved = path.resolve(temporaryRoot);
  const systemTemp = path.resolve(os.tmpdir());
  if (!resolved.startsWith(systemTemp + path.sep) || !path.basename(resolved).startsWith("psdc-event-trace-")) {
    throw new Error(`Refusing to remove unexpected temporary path: ${resolved}`);
  }
  fs.rmSync(resolved, { recursive: true, force: true });
}
