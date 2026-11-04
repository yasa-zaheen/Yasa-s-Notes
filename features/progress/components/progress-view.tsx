"use client";

// Imports
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourse } from "@/features/courses";

import { useHydratedProgress } from "../hooks/use-hydrated-progress";
import { useProgressStore } from "../store";
import {
  accuracyOf,
  computeMastery,
  groupAttemptsByTopic,
  MASTERY_LABELS,
} from "../utils/mastery";

// Component
export function ProgressView() {
  const hydrated = useHydratedProgress();
  const attempts = useProgressStore((state) => state.attempts);
  const course = getCourse("cot-4400");

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">Loading analytics…</p>;
  }

  const byTopic = groupAttemptsByTopic(attempts);
  const byDifficulty = ["easy", "medium", "hard"] as const;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl tracking-tight">Progress</h1>
        <p className="text-muted-foreground">
          Mastery depends on repeated performance across question types and difficulties.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        {byDifficulty.map((difficulty) => {
          const subset = attempts.filter((attempt) => attempt.difficulty === difficulty);
          return (
            <Card key={difficulty}>
              <CardHeader>
                <CardTitle className="capitalize">{difficulty}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {subset.length} attempts · {Math.round(accuracyOf(subset) * 100)}%
              </CardContent>
            </Card>
          );
        })}
      </section>

      {course?.lessons.map((lesson) => (
        <section key={lesson.id} className="space-y-3">
          <h2 className="font-heading text-xl">
            Lesson {lesson.number} — {lesson.title}
          </h2>
          <div className="grid gap-3">
            {lesson.topics.map((topic) => {
              const topicAttempts = byTopic.get(topic.id) ?? [];
              const mastery = computeMastery(topicAttempts);

              return (
                <Link
                  key={topic.id}
                  href={`/practice/cot-4400/${lesson.id}?topics=${topic.id}`}
                  className="block"
                >
                  <Card className="transition-colors hover:bg-accent/40">
                    <CardHeader>
                      <div className="flex items-center justify-between gap-3">
                        <CardTitle>{topic.title}</CardTitle>
                        <Badge variant={mastery === "mastered" ? "default" : "secondary"}>
                          {MASTERY_LABELS[mastery]}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      {topicAttempts.length} attempts ·{" "}
                      {Math.round(accuracyOf(topicAttempts) * 100)}% accuracy
                      {topicAttempts.length > 0
                        ? ` · last ${new Date(
                            topicAttempts[topicAttempts.length - 1]?.timestamp ?? 0
                          ).toLocaleDateString()}`
                        : ""}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
