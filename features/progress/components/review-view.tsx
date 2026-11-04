"use client";

// Imports
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllLessonNotes, MarkdownRenderer } from "@/features/notes";
import { getQuestionById, notesPathForQuestion } from "@/features/questions";

import { useHydratedProgress } from "../hooks/use-hydrated-progress";
import { useProgressStore } from "../store";

// Component
export function ReviewView() {
  const hydrated = useHydratedProgress();
  const attempts = useProgressStore((state) => state.attempts);
  const questionBookmarks = useProgressStore((state) => state.questionBookmarks);
  const noteBookmarks = useProgressStore((state) => state.noteBookmarks);

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">Loading review…</p>;
  }

  const missed = [...attempts]
    .reverse()
    .filter((attempt) => !attempt.skipped && !attempt.correct)
    .slice(0, 20);

  const allNotes = getAllLessonNotes();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl tracking-tight">Review</h1>
        <p className="text-muted-foreground">
          Incorrect answers, bookmarked questions, and saved note sections. Spaced repetition
          lands in Phase 3; this list is the durable queue.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-heading text-xl">Incorrect answers</h2>
        {missed.length === 0 ? (
          <p className="text-sm text-muted-foreground">No misses stored yet.</p>
        ) : (
          missed.map((attempt) => {
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
                <CardContent>
                  <Button
                    size="sm"
                    variant="outline"
                    nativeButton={false}
                    render={<Link href={notesPathForQuestion(question)} />}
                  >
                    Open notes
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl">Bookmarked questions</h2>
        {questionBookmarks.length === 0 ? (
          <p className="text-sm text-muted-foreground">Bookmark a question during practice.</p>
        ) : (
          questionBookmarks.map((id) => {
            const question = getQuestionById(id);
            if (!question) {
              return null;
            }

            return (
              <Card key={id}>
                <CardHeader>
                  <CardTitle className="text-base">
                    <MarkdownRenderer markdown={question.prompt} className="space-y-0" />
                  </CardTitle>
                </CardHeader>
              </Card>
            );
          })
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl">Bookmarked notes</h2>
        {noteBookmarks.length === 0 ? (
          <p className="text-sm text-muted-foreground">Bookmark a section while reading.</p>
        ) : (
          noteBookmarks.map((id) => {
            const [courseId, lessonId, topicId, sectionId] = id.split(":");
            const notes = allNotes.find(
              (item) => item.courseId === courseId && item.lessonId === lessonId
            );
            const topic = notes?.topics.find((item) => item.topicId === topicId);
            const section = topic?.sections.find((item) => item.id === sectionId);

            return (
              <Card key={id}>
                <CardHeader>
                  <CardTitle className="text-base">
                    {topic?.title ?? "Notes"} — {section?.title ?? sectionId}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    size="sm"
                    variant="outline"
                    nativeButton={false}
                    render={
                      <Link
                        href={`/notes/${courseId}/${lessonId}#${topicId}-${sectionId}`}
                      />
                    }
                  >
                    Jump to section
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </section>
    </div>
  );
}
