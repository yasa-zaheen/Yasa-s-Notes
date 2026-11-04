"use client";

// Imports
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course } from "@/features/courses";

// Component
export function CourseList({ courses }: { courses: Course[] }) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl tracking-tight">Notes</h1>
        <p className="text-muted-foreground">
          Course materials, organized hierarchically. Start with Analysis of Algorithms.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <Link key={course.id} href={`/notes/${course.id}`}>
            <Card className="h-full transition-colors hover:bg-accent/40">
              <CardHeader>
                <Badge variant="outline">{course.code}</Badge>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {course.lessons.length} lessons
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
