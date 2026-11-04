"use client";

// Imports
import { CheckCircle2, CircleX, LoaderCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { CodeExecutionResult } from "../types";

// Helpers
function formatValue(value: unknown) {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

// Component
export function TestResultsPanel({
  result,
  running,
}: {
  result: CodeExecutionResult | null;
  running: boolean;
}) {
  if (running) {
    return (
      <div className="flex items-center gap-2 border-t px-4 py-3 text-sm text-muted-foreground">
        <LoaderCircle className="size-4 animate-spin" />
        Running Python tests in the browser…
      </div>
    );
  }

  if (!result) {
    return (
      <div className="border-t px-4 py-3 text-sm text-muted-foreground">
        Run your code against the visible examples, or Submit to include hidden tests.
      </div>
    );
  }

  if (result.error && result.results.length === 0) {
    return (
      <div className="space-y-2 border-t px-4 py-3">
        <p className="text-sm font-medium text-destructive">Runtime error</p>
        <pre className="overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
          {result.error}
        </pre>
      </div>
    );
  }

  const passed = result.results.filter((item) => item.passed).length;
  const total = result.results.length;

  return (
    <div className="space-y-3 border-t px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">
          {result.ok ? "Accepted" : "Wrong Answer"}
          <span className="ml-2 font-normal text-muted-foreground">
            {passed}/{total} passed
          </span>
        </p>
        <Badge variant={result.ok ? "default" : "secondary"}>
          {result.ok ? "All tests passed" : "Needs work"}
        </Badge>
      </div>

      {result.stdout ? (
        <pre className="overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
          {result.stdout}
        </pre>
      ) : null}

      <ul className="space-y-2">
        {result.results.map((item) => (
          <li
            key={item.id}
            className={cn(
              "rounded-lg border p-3 text-sm",
              item.passed ? "border-chart-1/30 bg-chart-1/5" : "border-destructive/30 bg-destructive/5"
            )}
          >
            <div className="flex items-center gap-2">
              {item.passed ? (
                <CheckCircle2 className="size-4 text-chart-1" />
              ) : (
                <CircleX className="size-4 text-destructive" />
              )}
              <span className="font-medium">
                {item.hidden ? "Hidden test" : item.name}
              </span>
              {item.runtimeMs !== undefined ? (
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  {item.runtimeMs}ms
                </span>
              ) : null}
            </div>

            {!item.hidden ? (
              <div className="mt-2 space-y-1 font-mono text-xs text-muted-foreground">
                <p>Input: {formatValue(item.input)}</p>
                <p>Expected: {formatValue(item.expected)}</p>
                {item.actual !== undefined ? <p>Got: {formatValue(item.actual)}</p> : null}
                {item.error ? <p className="text-destructive">{item.error}</p> : null}
              </div>
            ) : item.error ? (
              <p className="mt-2 font-mono text-xs text-destructive">{item.error}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
