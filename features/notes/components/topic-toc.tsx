"use client";

// Imports
import { cn } from "@/lib/utils";

import type { TopicNotes } from "../types";

// Component
export function TopicToc({
  topics,
  activeId,
}: {
  topics: TopicNotes[];
  activeId?: string;
}) {
  return (
    <nav className="space-y-4">
      <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
        On this page
      </p>
      <ol className="space-y-3">
        {topics.map((topic) => (
          <li key={topic.topicId}>
            <a
              href={`#${topic.topicId}`}
              className={cn(
                "text-sm font-medium hover:text-foreground",
                activeId === topic.topicId
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {topic.title}
            </a>
            <ul className="mt-1 space-y-1 border-l pl-3">
              {topic.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${topic.topicId}-${section.id}`}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </nav>
  );
}
