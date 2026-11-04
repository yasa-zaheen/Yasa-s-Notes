"use client";

// Imports
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { getCodingProblemsForLesson } from "@/features/coding";
import type { Course, Lesson } from "@/features/courses";
import { useProgressStore, type SessionConfig } from "@/features/progress";
import {
  filterQuestions,
  getQuestionBank,
  selectQuestions,
  type Phase1QuestionType,
} from "@/features/questions";

// Constants
const TYPE_OPTIONS: { id: Phase1QuestionType; label: string }[] = [
  { id: "mcq", label: "Multiple choice" },
  { id: "multi_select", label: "Multi-select" },
  { id: "algorithm_trace", label: "Algorithm tracing" },
  { id: "complexity", label: "Complexity analysis" },
];

const PHASE2_TYPES = ["Written explanations", "Fill-in-the-blank", "Exam simulation"];

const LENGTHS = [5, 10, 20] as const;

// Component
export function SessionConfigForm({
  course,
  lesson,
  initialTopics,
}: {
  course: Course;
  lesson: Lesson;
  initialTopics: string[];
}) {
  const router = useRouter();
  const startSession = useProgressStore((state) => state.startSession);

  const [topicIds, setTopicIds] = useState<string[]>(
    initialTopics.length > 0 ? initialTopics : lesson.topics.map((topic) => topic.id)
  );
  const [types, setTypes] = useState<Phase1QuestionType[]>(["mcq", "algorithm_trace"]);
  const [difficulty, setDifficulty] = useState<SessionConfig["difficulty"]>("mixed");
  const [length, setLength] = useState<number | "custom">(10);
  const [customCount, setCustomCount] = useState(8);
  const [feedbackMode, setFeedbackMode] = useState<SessionConfig["feedbackMode"]>("immediate");

  const count = length === "custom" ? Math.max(1, customCount) : length;

  const available = useMemo(
    () =>
      filterQuestions(getQuestionBank(), {
        courseId: course.id,
        lessonId: lesson.id,
        topicIds,
        types,
        difficulty,
        count,
      }),
    [course.id, lesson.id, topicIds, types, difficulty, count]
  );

  function toggle<T>(list: T[], value: T) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
  }

  function start() {
    const config: SessionConfig = {
      courseId: course.id,
      lessonId: lesson.id,
      topicIds,
      types,
      difficulty,
      count,
      feedbackMode,
    };
    const questions = selectQuestions(getQuestionBank(), config);

    if (questions.length === 0) {
      return;
    }

    startSession(config, questions.map((question) => question.id));
    router.push(`/practice/${course.id}/${lesson.id}/session`);
  }

  const codingProblems = getCodingProblemsForLesson(course.id, lesson.id);
  const codingHref = `/practice/${course.id}/${lesson.id}/code`;

  if (lesson.status === "placeholder") {
    return (
      <p className="text-muted-foreground">
        Practice for this lesson will unlock when its notes and question bank are added.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          {course.code} · Lesson {lesson.number}
        </p>
        <h1 className="font-heading text-3xl tracking-tight">Practice {lesson.title}</h1>
        <p className="text-muted-foreground">
          Combine topics and question types, or open Algorithm Practice for Python coding with
          step-by-step animations.
        </p>
      </header>

      {codingProblems.length > 0 ? (
        <section className="rounded-xl border bg-muted/20 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="font-heading text-lg">Algorithm Practice</h2>
              <p className="text-sm text-muted-foreground">
                {codingProblems.length} Python problems with Description, Animation, Solution, and
                Run / Submit tests.
              </p>
            </div>
            <Button nativeButton={false} render={<Link href={codingHref} />}>
              Open coding workspace
            </Button>
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="font-heading text-lg">Topics</h2>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={topicIds.length === lesson.topics.length}
            onCheckedChange={(checked) => {
              setTopicIds(checked ? lesson.topics.map((topic) => topic.id) : []);
            }}
          />
          All topics
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          {lesson.topics.map((topic) => (
            <label key={topic.id} className="flex items-start gap-2 rounded-lg border p-3 text-sm">
              <Checkbox
                checked={topicIds.includes(topic.id)}
                onCheckedChange={() => setTopicIds(toggle(topicIds, topic.id))}
              />
              <span>
                <span className="font-medium">{topic.title}</span>
                <span className="mt-0.5 block text-muted-foreground">{topic.summary}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg">Question types</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {TYPE_OPTIONS.map((option) => (
            <label key={option.id} className="flex items-center gap-2 rounded-lg border p-3 text-sm">
              <Checkbox
                checked={types.includes(option.id)}
                onCheckedChange={() => setTypes(toggle(types, option.id))}
              />
              {option.label}
            </label>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {PHASE2_TYPES.map((label) => (
            <span
              key={label}
              className="rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground"
            >
              {label} · Phase 2
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <h2 className="font-heading text-lg">Difficulty</h2>
          {(["easy", "medium", "hard", "mixed", "adaptive"] as const).map((value) => (
            <label key={value} className="flex items-center gap-2 text-sm capitalize">
              <Checkbox
                checked={difficulty === value}
                onCheckedChange={() => setDifficulty(value)}
              />
              {value === "adaptive" ? "Adaptive (mixed for now)" : value}
            </label>
          ))}
        </div>

        <div className="space-y-2">
          <h2 className="font-heading text-lg">Length</h2>
          {LENGTHS.map((value) => (
            <label key={value} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={length === value}
                onCheckedChange={() => setLength(value)}
              />
              {value} questions
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={length === "custom"}
              onCheckedChange={(checked) => setLength(checked ? "custom" : 10)}
            />
            Custom
          </label>
          {length === "custom" ? (
            <Input
              type="number"
              min={1}
              max={40}
              value={customCount}
              onChange={(event) => setCustomCount(Number(event.target.value))}
              className="w-24"
            />
          ) : null}
        </div>

        <div className="space-y-2">
          <h2 className="font-heading text-lg">Feedback</h2>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={feedbackMode === "immediate"}
              onCheckedChange={() => setFeedbackMode("immediate")}
            />
            Immediate
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={feedbackMode === "exam"}
              onCheckedChange={() => setFeedbackMode("exam")}
            />
            End of session
          </label>
        </div>
      </section>

      <div className="flex items-center justify-between gap-4 border-t pt-4">
        <p className="text-sm text-muted-foreground">
          {available.length} matching question{available.length === 1 ? "" : "s"} in the bank.
          Session will use {Math.min(count, available.length)}.
        </p>
        <Button onClick={start} disabled={available.length === 0 || topicIds.length === 0 || types.length === 0}>
          Start practice
        </Button>
      </div>
    </div>
  );
}
