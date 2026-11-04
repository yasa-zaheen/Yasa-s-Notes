"use client";

// Imports
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Bookmark, BookmarkCheck, Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  getQuestionById,
  gradeQuestion,
  type StudentAnswer,
} from "@/features/questions";
import { useHydratedProgress, useProgressStore } from "@/features/progress";

import { ExplanationPanel } from "./explanation-panel";
import { QuestionPrompt } from "./question-prompt";
import { QuestionResponse } from "./question-response";

// Component
export function SessionRunner({
  courseId,
  lessonId,
}: {
  courseId: string;
  lessonId: string;
}) {
  const router = useRouter();
  const hydrated = useHydratedProgress();
  const session = useProgressStore((state) => state.activeSession);
  const saveAnswer = useProgressStore((state) => state.saveAnswer);
  const skipQuestion = useProgressStore((state) => state.skipQuestion);
  const revealQuestion = useProgressStore((state) => state.revealQuestion);
  const setActiveIndex = useProgressStore((state) => state.setActiveIndex);
  const completeSession = useProgressStore((state) => state.completeSession);
  const toggleQuestionBookmark = useProgressStore((state) => state.toggleQuestionBookmark);
  const questionBookmarks = useProgressStore((state) => state.questionBookmarks);

  const question = useMemo(() => {
    if (!session) {
      return undefined;
    }

    return getQuestionById(session.questionIds[session.currentIndex] ?? "");
  }, [session]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (
      !session ||
      session.config.courseId !== courseId ||
      session.config.lessonId !== lessonId
    ) {
      router.replace(`/practice/${courseId}/${lessonId}`);
    }
  }, [courseId, hydrated, lessonId, router, session]);

  useEffect(() => {
    if (!question || question.type !== "algorithm_trace" || question.task !== "predict_array") {
      return;
    }

    if (session?.answers[question.id]) {
      return;
    }

    saveAnswer(question.id, { type: "algorithm_trace", array: [...question.array] });
  }, [question, saveAnswer, session]);

  if (!hydrated || !session || !question) {
    return <p className="text-sm text-muted-foreground">Loading session…</p>;
  }

  const activeSession = session;
  const currentQuestion = question;
  const index = activeSession.currentIndex;
  const total = activeSession.questionIds.length;
  const answer = activeSession.answers[currentQuestion.id];
  const revealed =
    activeSession.config.feedbackMode === "immediate" &&
    activeSession.revealed.includes(currentQuestion.id);
  const bookmarked = questionBookmarks.includes(currentQuestion.id);
  const isCorrect = revealed ? gradeQuestion(question, answer) : false;
  const progressValue = Math.round(((index + (revealed ? 1 : 0)) / total) * 100);

  function finish() {
    const completed = completeSession();
    if (completed) {
      router.push(`/practice/${courseId}/${lessonId}/results/${completed.id}`);
    }
  }

  function go(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= total) {
      return;
    }

    setActiveIndex(nextIndex);
  }

  function submit() {
    if (activeSession.config.feedbackMode === "immediate") {
      revealQuestion(currentQuestion.id);
      return;
    }

    if (index === total - 1) {
      finish();
      return;
    }

    go(index + 1);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {index + 1} of {total}
          </span>
          <Button variant="ghost" size="sm" nativeButton={false} render={<Link href={`/notes/${courseId}/${lessonId}#${currentQuestion.topicId}`} />}>
            Open notes
          </Button>
        </div>
        <Progress value={progressValue} />
      </div>

      <QuestionPrompt question={currentQuestion} />
      <QuestionResponse
        question={currentQuestion}
        answer={answer}
        revealed={revealed}
        onChange={(next: StudentAnswer) => saveAnswer(currentQuestion.id, next)}
      />

      {currentQuestion.hints && revealed === false ? (
        <details className="rounded-lg border p-3 text-sm">
          <summary className="flex cursor-pointer items-center gap-2 font-medium">
            <Lightbulb className="size-4" /> Hint
          </summary>
          <p className="mt-2 text-muted-foreground">{currentQuestion.hints.join(" ")}</p>
        </details>
      ) : null}

      {revealed ? <ExplanationPanel question={currentQuestion} correct={isCorrect} /> : null}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => go(index - 1)} disabled={index === 0}>
            Previous
          </Button>
          {!revealed ? (
            <Button
              variant="ghost"
              onClick={() => {
                skipQuestion(currentQuestion.id);
                if (index === total - 1) {
                  finish();
                  return;
                }
                go(index + 1);
              }}
            >
              Skip
            </Button>
          ) : null}
          <Button
            variant="ghost"
            onClick={() => toggleQuestionBookmark(currentQuestion.id)}
          >
            {bookmarked ? <BookmarkCheck /> : <Bookmark />}
            Bookmark
          </Button>
        </div>

        <div className="flex gap-2">
          {revealed && index < total - 1 ? (
            <Button onClick={() => go(index + 1)}>Next</Button>
          ) : null}
          {revealed && index === total - 1 ? (
            <Button onClick={finish}>See results</Button>
          ) : null}
          {!revealed ? (
            <Button onClick={submit} disabled={answer === undefined}>
              {activeSession.config.feedbackMode === "exam" && index === total - 1
                ? "Submit session"
                : "Submit"}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
