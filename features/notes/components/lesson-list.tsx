"use client";

// Imports
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course } from "@/features/courses";

// Component
export function LessonList({ course }: { course: Course }) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          {course.code}
        </p>
        <h1 className="font-heading text-3xl tracking-tight">{course.title}</h1>
        <p className="text-muted-foreground">{course.description}</p>
      </header>

      <div className="grid gap-3">
        {course.lessons.map((lesson) => (
          <Link key={lesson.id} href={`/notes/${course.id}/${lesson.id}`}>
            <Card className="transition-colors hover:bg-accent/40">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>
                    Lesson {lesson.number} — {lesson.title}
                  </CardTitle>
                  <Badge variant={lesson.status === "ready" ? "default" : "secondary"}>
                    {lesson.status === "ready" ? "Ready" : "Placeholder"}
                  </Badge>
                </div>
                <CardDescription>
                  {lesson.topics.length > 0
                    ? lesson.topics.map((topic) => topic.title).join(" · ")
                    : "Content will be added when lecture notes are supplied."}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
