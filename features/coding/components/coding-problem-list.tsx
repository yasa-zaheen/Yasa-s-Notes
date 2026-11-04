"use client";

// Imports
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course, Lesson } from "@/features/courses";

import type { CodingProblem } from "../types";

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
export function CodingProblemList({
  course,
  lesson,
  problems,
}: {
  course: Course;
  lesson: Lesson;
  problems: CodingProblem[];
}) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          {course.code} · Lesson {lesson.number}
        </p>
        <h1 className="font-heading text-3xl tracking-tight">Algorithm Practice</h1>
        <p className="max-w-2xl text-muted-foreground">
          LeetCode-style Python problems for {lesson.title}. Read the prompt, scrub the
          step-by-step animation, write your implementation, then Run / Submit against tests.
        </p>
      </header>

      {problems.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No coding problems for this lesson yet.
        </p>
      ) : (
        <div className="grid gap-3">
          {problems.map((problem, index) => (
            <Link
              key={problem.id}
              href={`/practice/${course.id}/${lesson.id}/code/${problem.id}`}
            >
              <Card className="transition-colors hover:bg-accent/40">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle className="text-base">
                        <span className="mr-2 font-mono text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {problem.title}
                      </CardTitle>
                      <CardDescription>
                        Implement <code className="font-mono text-xs">{problem.functionName}</code>{" "}
                        · animation + tests included
                      </CardDescription>
                    </div>
                    <Badge
                      variant={DIFFICULTY_VARIANT[problem.difficulty]}
                      className="capitalize"
                    >
                      {problem.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
