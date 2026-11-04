"use client";

// Imports
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/features/notes";
import type { Question } from "@/features/questions";

// Component
export function QuestionPrompt({ question }: { question: Question }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">{question.difficulty}</Badge>
        <Badge variant="secondary">{question.type.replaceAll("_", " ")}</Badge>
        {question.tags.includes("supplementary") ? (
          <Badge variant="outline">Additional content</Badge>
        ) : null}
      </div>
      <MarkdownRenderer markdown={question.prompt} />
    </div>
  );
}
