"use client";

// Imports
import { MarkdownRenderer } from "@/features/notes";
import type { Question } from "@/features/questions";

// Component
export function ExplanationPanel({
  question,
  correct,
}: {
  question: Question;
  correct: boolean;
}) {
  const distractors =
    "distractorExplanations" in question ? question.distractorExplanations : undefined;

  return (
    <div className="space-y-3 rounded-lg border bg-card p-4">
      <p className="text-sm font-medium">{correct ? "Correct" : "Not quite"}</p>
      <MarkdownRenderer markdown={question.explanation} />
      {distractors && distractors.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Why other choices fail
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {distractors.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {question.sourceReference ? (
        <p className="font-mono text-[11px] text-muted-foreground">{question.sourceReference}</p>
      ) : null}
    </div>
  );
}
