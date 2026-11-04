"use client";

// Imports
import Link from "next/link";
import { Bookmark, BookmarkCheck, PenLine } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Course, Lesson } from "@/features/courses";
import { useHydratedProgress, useProgressStore } from "@/features/progress";

import { noteBookmarkId } from "../api/get-notes";
import type { LessonNotes } from "../types";
import { MarkdownRenderer } from "./markdown-renderer";
import { TopicToc } from "./topic-toc";

// Component
export function LessonNotesViewer({
  course,
  lesson,
  notes,
}: {
  course: Course;
  lesson: Lesson;
  notes: LessonNotes | undefined;
}) {
  const hydrated = useHydratedProgress();
  const noteBookmarks = useProgressStore((state) => state.noteBookmarks);
  const toggleNoteBookmark = useProgressStore((state) => state.toggleNoteBookmark);
  const practiceHref = `/practice/${course.id}/${lesson.id}`;

  if (lesson.status === "placeholder" || !notes) {
    return (
      <div className="space-y-6">
        <header className="space-y-2">
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            {course.code} · Lesson {lesson.number}
          </p>
          <h1 className="font-heading text-3xl tracking-tight">{lesson.title}</h1>
        </header>
        <p className="max-w-xl text-muted-foreground">
          Notes for this lesson are a placeholder. Lesson 10 — Sorting is fully
          populated; this outline exists so new lectures can drop in without a
          rebuild.
        </p>
      </div>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10">
      <article className="min-w-0 space-y-12">
        <header className="space-y-4">
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            {course.code} · Lesson {lesson.number}
          </p>
          <h1 className="font-heading text-3xl tracking-tight">{lesson.title}</h1>
          <MarkdownRenderer
            markdown={notes.intro}
            className="max-w-2xl text-muted-foreground"
          />
          <Button nativeButton={false} render={<Link href={practiceHref} />}>
            <PenLine />
            Practice this lesson
          </Button>
        </header>

        {notes.topics.map((topic) => (
          <section key={topic.topicId} id={topic.topicId} className="scroll-mt-24 space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b pb-3">
              <h2 className="font-heading text-2xl tracking-tight">{topic.title}</h2>
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href={`${practiceHref}?topics=${topic.topicId}`} />}
              >
                Practice topic
              </Button>
            </div>

            {topic.sections.map((section) => {
              const bookmarkId = noteBookmarkId(
                course.id,
                lesson.id,
                topic.topicId,
                section.id
              );
              const bookmarked = hydrated && noteBookmarks.includes(bookmarkId);

              return (
                <section
                  key={section.id}
                  id={`${topic.topicId}-${section.id}`}
                  className="scroll-mt-24 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-lg">{section.title}</h3>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={bookmarked ? "Remove bookmark" : "Bookmark section"}
                      onClick={() => toggleNoteBookmark(bookmarkId)}
                    >
                      {bookmarked ? <BookmarkCheck /> : <Bookmark />}
                    </Button>
                  </div>
                  <MarkdownRenderer markdown={section.markdown} />
                </section>
              );
            })}
          </section>
        ))}
      </article>

      <aside className="sticky top-8 hidden self-start lg:block">
        <TopicToc topics={notes.topics} />
        <div className="mt-8 space-y-2">
          <Badge variant="outline">Lecture-aligned</Badge>
          <p className="text-xs text-muted-foreground">
            Bookmark a section, then jump back from Review.
          </p>
        </div>
      </aside>
    </div>
  );
}
