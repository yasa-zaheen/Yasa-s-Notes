"use client";

// Imports
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { findTopicInCourse, getCourse } from "@/features/courses";

import { useHydratedProgress } from "../hooks/use-hydrated-progress";
import { useProgressStore } from "../store";
import { accuracyOf, MASTERY_LABELS, weakTopics } from "../utils/mastery";

// Component
export function DashboardView() {
  const hydrated = useHydratedProgress();
  const attempts = useProgressStore((state) => state.attempts);
  const sessions = useProgressStore((state) => state.sessions);
  const course = getCourse("cot-4400");

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">Loading progress…</p>;
  }

  const recent = [...sessions].reverse().slice(0, 4);
  const weak = weakTopics(attempts);
  const scored = attempts.filter((attempt) => !attempt.skipped);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          COT 4400
        </p>
        <h1 className="font-heading text-3xl tracking-tight">Dashboard</h1>
        <p className="max-w-2xl text-muted-foreground">
          Track mastery across Sorting, Data Structures, Divide & Conquer, and
          Greedy — then jump into a weak topic.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Questions attempted</CardDescription>
            <CardTitle className="text-3xl">{scored.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Accuracy</CardDescription>
            <CardTitle className="text-3xl">{Math.round(accuracyOf(attempts) * 100)}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Sessions</CardDescription>
            <CardTitle className="text-3xl">{sessions.length}</CardTitle>
          </CardHeader>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weak topics</CardTitle>
            <CardDescription>Recommended from repeated misses, not a single miss.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {weak.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Practice any Exam 2 lesson to generate recommendations.
              </p>
            ) : (
              weak.map((item) => {
                const match = findTopicInCourse("cot-4400", item.topicId);
                const title = match?.topic.title ?? item.topicId;
                const lessonId = match?.lesson.id ?? "l10-sorting";

                return (
                  <div key={item.topicId} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className="text-xs text-muted-foreground">
                        {match ? `Lesson ${match.lesson.number}` : "Topic"} ·{" "}
                        {Math.round(item.accuracy * 100)}% · {MASTERY_LABELS[item.mastery]}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      nativeButton={false}
                      render={
                        <Link href={`/practice/cot-4400/${lessonId}?topics=${item.topicId}`} />
                      }
                    >
                      Practice
                    </Button>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recent.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sessions yet.</p>
            ) : (
              recent.map((session) => {
                const sessionAttempts = attempts.filter(
                  (attempt) => attempt.sessionId === session.id
                );
                const lesson = getCourse(session.config.courseId)?.lessons.find(
                  (item) => item.id === session.config.lessonId
                );

                return (
                  <Link
                    key={session.id}
                    href={`/practice/${session.config.courseId}/${session.config.lessonId}/results/${session.id}`}
                    className="block rounded-lg border p-3 text-sm hover:bg-accent/40"
                  >
                    <p className="font-medium">
                      Lesson {lesson?.number ?? "?"} — {lesson?.title ?? "Session"} ·{" "}
                      {Math.round(accuracyOf(sessionAttempts) * 100)}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(session.startedAt).toLocaleString()} ·{" "}
                      {session.questionIds.length} questions
                    </p>
                  </Link>
                );
              })
            )}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg">Course lessons</h2>
        <div className="flex flex-wrap gap-2">
          {course?.lessons.map((lesson) => (
            <Button
              key={lesson.id}
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href={`/notes/cot-4400/${lesson.id}`} />}
            >
              L{lesson.number} {lesson.title}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
