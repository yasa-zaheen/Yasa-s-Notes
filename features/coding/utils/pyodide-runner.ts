import type { CodingProblem, CodeExecutionResult, TestRunResult } from "../types";

type PyodideInterface = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (text: string) => void }) => void;
};

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

let pyodidePromise: Promise<PyodideInterface> | null = null;

const PYODIDE_VERSION = "0.27.5";
const PYODIDE_INDEX = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Pyodide runtime."));
    document.head.appendChild(script);
  });
}

export async function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await loadScript(`${PYODIDE_INDEX}pyodide.js`);
      if (!window.loadPyodide) {
        throw new Error("Pyodide loader missing after script load.");
      }
      return window.loadPyodide({ indexURL: PYODIDE_INDEX });
    })();
  }

  return pyodidePromise;
}

function toPythonLiteral(value: unknown): string {
  return JSON.stringify(value)
    .replace(/\btrue\b/g, "True")
    .replace(/\bfalse\b/g, "False")
    .replace(/\bnull\b/g, "None");
}

function buildHarness(problem: CodingProblem, userCode: string, tests: CodingProblem["visibleTests"]) {
  const cases = tests
    .map((test) => {
      return `{
  "id": ${JSON.stringify(test.id)},
  "name": ${JSON.stringify(test.name)},
  "hidden": ${test.hidden ? "True" : "False"},
  "input": ${toPythonLiteral(test.input)},
  "expected": ${toPythonLiteral(test.expected)},
}`;
    })
    .join(",\n");

  return `
import json, time, copy, traceback

${userCode}

__tests__ = [${cases}]
__results__ = []

def __call_fn__(fn, payload):
    if isinstance(payload, dict):
        return fn(**copy.deepcopy(payload))
    if isinstance(payload, list):
        return fn(copy.deepcopy(payload))
    return fn(copy.deepcopy(payload))

def __normalize__(value):
    if isinstance(value, tuple):
        return [__normalize__(item) for item in value]
    if isinstance(value, list):
        return [__normalize__(item) for item in value]
    if isinstance(value, dict):
        return {key: __normalize__(item) for key, item in value.items()}
    return value

fn = globals().get(${JSON.stringify(problem.functionName)})
if fn is None:
    raise NameError("Define a function named ${problem.functionName}")

for case in __tests__:
    started = time.time()
    try:
        actual = __call_fn__(fn, case["input"])
        expected = case["expected"]
        passed = __normalize__(actual) == __normalize__(expected)
        __results__.append({
            "id": case["id"],
            "name": case["name"],
            "hidden": case["hidden"],
            "passed": bool(passed),
            "input": case["input"],
            "expected": expected,
            "actual": __normalize__(actual),
            "runtimeMs": int((time.time() - started) * 1000),
        })
    except Exception as exc:
        __results__.append({
            "id": case["id"],
            "name": case["name"],
            "hidden": case["hidden"],
            "passed": False,
            "input": case["input"],
            "expected": case["expected"],
            "error": "".join(traceback.format_exception_only(type(exc), exc)).strip(),
            "runtimeMs": int((time.time() - started) * 1000),
        })

json.dumps(__results__)
`;
}

export async function runPythonTests(
  problem: CodingProblem,
  userCode: string,
  options?: { includeHidden?: boolean }
): Promise<CodeExecutionResult> {
  const stdoutParts: string[] = [];

  try {
    const pyodide = await getPyodide();
    pyodide.setStdout({
      batched: (text) => {
        stdoutParts.push(text);
      },
    });

    const tests = options?.includeHidden
      ? [...problem.visibleTests, ...problem.hiddenTests]
      : problem.visibleTests;

    const raw = await pyodide.runPythonAsync(buildHarness(problem, userCode, tests));
    const parsed = JSON.parse(String(raw)) as TestRunResult[];

    return {
      ok: parsed.every((result) => result.passed),
      results: parsed,
      stdout: stdoutParts.join(""),
      mode: "pyodide",
    };
  } catch (error) {
    return {
      ok: false,
      results: [],
      stdout: stdoutParts.join(""),
      error: error instanceof Error ? error.message : String(error),
      mode: "pyodide",
    };
  }
}
