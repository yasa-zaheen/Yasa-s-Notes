"use client";

// Imports
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course } from "@/features/courses";

// Component
export function PracticeHome({ courses }: { courses: Course[] }) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl tracking-tight">Practice</h1>
        <p className="text-muted-foreground">
          Interactive sessions by course, lesson, topic, and question type.
        </p>
      </header>

      {courses.map((course) => (
        <section key={course.id} className="space-y-3">
          <div>
            <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              {course.code}
            </p>
            <h2 className="font-heading text-xl">{course.title}</h2>
          </div>
          <div className="grid gap-3">
            {course.lessons.map((lesson) => (
              <Link key={lesson.id} href={`/practice/${course.id}/${lesson.id}`}>
                <Card className="transition-colors hover:bg-accent/40">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle>
                        Lesson {lesson.number} — {lesson.title}
                      </CardTitle>
                      <Badge variant={lesson.status === "ready" ? "default" : "secondary"}>
                        {lesson.status === "ready" ? "Ready" : "Soon"}
                      </Badge>
                    </div>
                    <CardDescription>
                      {lesson.topics.length > 0
                        ? lesson.topics.map((topic) => topic.title).join(" · ")
                        : "Waiting on lecture content."}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
