"use client";

// Imports
import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLesson } from "@/features/courses";
import {
  getQuestionById,
  gradeQuestion,
  notesPathForQuestion,
  selectQuestions,
  type Question,
} from "@/features/questions";
import {
  accuracyOf,
  computeMastery,
  MASTERY_LABELS,
  useHydratedProgress,
  useProgressStore,
} from "@/features/progress";

import { ExplanationPanel } from "./explanation-panel";
import { MarkdownRenderer } from "@/features/notes";

// Component
export function SessionResults({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const hydrated = useHydratedProgress();
  const sessions = useProgressStore((state) => state.sessions);
  const attempts = useProgressStore((state) => state.attempts);
  const startSession = useProgressStore((state) => state.startSession);

  const session = sessions.find((item) => item.id === sessionId);
  const sessionAttempts = attempts.filter((attempt) => attempt.sessionId === sessionId);

  const byTopic = useMemo(() => {
    const groups = new Map<string, typeof sessionAttempts>();

    for (const attempt of sessionAttempts) {
      groups.set(attempt.topicId, [...(groups.get(attempt.topicId) ?? []), attempt]);
    }

    return [...groups.entries()];
  }, [sessionAttempts]);

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">Loading results…</p>;
  }

  if (!session) {
    return <p className="text-sm text-muted-foreground">No saved session with this id.</p>;
  }

  const lesson = getLesson(session.config.courseId, session.config.lessonId)?.lesson;
  const scored = sessionAttempts.filter((attempt) => !attempt.skipped);
  const correctCount = scored.filter((attempt) => attempt.correct).length;
  const incorrect = sessionAttempts.filter((attempt) => !attempt.skipped && !attempt.correct);

  function retryIncorrect() {
    const ids = incorrect.map((attempt) => attempt.questionId);
    if (ids.length === 0 || !session) {
      return;
    }

    const config = {
      ...session.config,
      count: ids.length,
      questionIds: ids,
    };
    const questions = selectQuestions(
      ids
        .map((id) => getQuestionById(id))
        .filter((question): question is Question => Boolean(question)),
      config
    );

    startSession(
      config,
      questions.map((question) => question.id)
    );
    router.push(`/practice/${session.config.courseId}/${session.config.lessonId}/session`);
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          Session results
        </p>
        <h1 className="font-heading text-3xl tracking-tight">
          {Math.round(accuracyOf(sessionAttempts) * 100)}% accuracy
        </h1>
        <p className="text-muted-foreground">
          {correctCount} correct · {incorrect.length} incorrect · {sessionAttempts.filter((a) => a.skipped).length} skipped
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href={`/practice/${session.config.courseId}/${session.config.lessonId}`} />}
        >
          New session
        </Button>
        <Button onClick={retryIncorrect} disabled={incorrect.length === 0}>
          Retry incorrect
        </Button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2">
        {byTopic.map(([topicId, topicAttempts]) => {
          const title = lesson?.topics.find((topic) => topic.id === topicId)?.title ?? topicId;
          const mastery = computeMastery(
            attempts.filter((attempt) => attempt.topicId === topicId)
          );

          return (
            <Card key={topicId}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <span>{title}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {MASTERY_LABELS[mastery]}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {Math.round(accuracyOf(topicAttempts) * 100)}% this session ·{" "}
                {topicAttempts.length} question{topicAttempts.length === 1 ? "" : "s"}
              </CardContent>
            </Card>
          );
        })}
      </section>

      {incorrect.length > 0 ? (
        <section className="space-y-4">
          <h2 className="font-heading text-xl">Incorrect answers</h2>
          {incorrect.map((attempt) => {
            const question = getQuestionById(attempt.questionId);
            if (!question) {
              return null;
            }

            return (
              <Card key={attempt.id}>
                <CardHeader>
                  <CardTitle className="text-base">
                    <MarkdownRenderer markdown={question.prompt} className="space-y-0" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ExplanationPanel
                    question={question}
                    correct={gradeQuestion(question, session.answers[question.id])}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={<Link href={notesPathForQuestion(question)} />}
                  >
                    Open notes for this topic
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </section>
      ) : null}
    </div>
  );
}
