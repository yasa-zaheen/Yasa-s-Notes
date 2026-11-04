"use client";

// Imports
import Link from "next/link";
import { ArrowLeft, Play, RotateCcw, Send } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkdownRenderer } from "@/features/notes";

import type { CodeExecutionResult, CodingProblem } from "../types";
import { runPythonTests } from "../utils/pyodide-runner";
import { AlgorithmAnimator } from "./algorithm-animator";
import { CodeEditor } from "./code-editor";
import { TestResultsPanel } from "./test-results-panel";

// Helpers
const DIFFICULTY_VARIANT: Record<
  CodingProblem["difficulty"],
  "default" | "secondary" | "outline"
> = {
  easy: "default",
  medium: "secondary",
  hard: "outline",
};

// Component
export function CodingWorkspace({ problem }: { problem: CodingProblem }) {
  // State
  const [code, setCode] = useState(problem.starterCode);
  const [leftTab, setLeftTab] = useState("description");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<CodeExecutionResult | null>(null);

  const backHref = useMemo(
    () => `/practice/${problem.courseId}/${problem.lessonId}/code`,
    [problem.courseId, problem.lessonId]
  );

  // Functions
  async function execute(includeHidden: boolean) {
    setRunning(true);
    setResult(null);
    try {
      const next = await runPythonTests(problem, code, { includeHidden });
      setResult(next);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="flex h-svh flex-col">
      <header className="flex shrink-0 items-center gap-3 border-b px-4 py-3">
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href={backHref} />}>
          <ArrowLeft data-icon="inline-start" />
          Problems
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex"
          nativeButton={false}
          render={<Link href="/" />}
        >
          Home
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-heading text-base tracking-tight sm:text-lg">
            {problem.title}
          </h1>
        </div>
        <Badge variant={DIFFICULTY_VARIANT[problem.difficulty]} className="capitalize">
          {problem.difficulty}
        </Badge>
        <Badge variant="outline">Python</Badge>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-2">
        <section className="flex min-h-0 flex-col border-b lg:border-r lg:border-b-0">
          <Tabs value={leftTab} onValueChange={setLeftTab} className="flex min-h-0 flex-1 flex-col gap-0">
            <div className="shrink-0 border-b px-3 pt-3">
              <TabsList variant="line">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="animation">Animation</TabsTrigger>
                <TabsTrigger value="solution">Solution</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="description" className="min-h-0 flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-5 p-4 sm:p-5">
                  <MarkdownRenderer markdown={problem.description} />

                  <div className="space-y-2">
                    <h3 className="font-heading text-sm font-semibold">Examples</h3>
                    {problem.examples.map((example, index) => (
                      <div key={example.input} className="space-y-1 rounded-lg border bg-muted/30 p-3">
                        <p className="text-xs font-medium text-muted-foreground">
                          Example {index + 1}
                        </p>
                        <pre className="font-mono text-xs whitespace-pre-wrap">
                          {`Input: ${example.input}\nOutput: ${example.output}`}
                          {example.explanation ? `\nExplanation: ${example.explanation}` : ""}
                        </pre>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading text-sm font-semibold">Constraints</h3>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {problem.constraints.map((constraint) => (
                        <li key={constraint}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="animation" className="min-h-0 flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 sm:p-5">
                  <AlgorithmAnimator algorithm={problem.algorithm} seed={problem.animationSeed} />
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="solution" className="min-h-0 flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-4 p-4 sm:p-5">
                  <MarkdownRenderer markdown={problem.solutionExplanation} />
                  <div className="h-[360px]">
                    <CodeEditor value={problem.solutionCode} readOnly />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCode(problem.solutionCode);
                      setLeftTab("description");
                    }}
                  >
                    Use this solution in editor
                  </Button>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </section>

        <section className="flex min-h-0 flex-col">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b px-3 py-2">
            <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Code · {problem.functionName}
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCode(problem.starterCode);
                  setResult(null);
                }}
              >
                <RotateCcw data-icon="inline-start" />
                Reset
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={running}
                onClick={() => void execute(false)}
              >
                <Play data-icon="inline-start" />
                Run
              </Button>
              <Button type="button" size="sm" disabled={running} onClick={() => void execute(true)}>
                <Send data-icon="inline-start" />
                Submit
              </Button>
            </div>
          </div>

          <div className="min-h-0 flex-1 p-3">
            <CodeEditor value={code} onChange={setCode} />
          </div>

          <div className="max-h-[40%] shrink-0 overflow-y-auto">
            <TestResultsPanel result={result} running={running} />
          </div>
        </section>
      </div>
    </div>
  );
}
