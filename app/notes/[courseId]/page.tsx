import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getCourse, getCourses } from "@/features/courses";
import { LessonList } from "@/features/notes";

export function generateStaticParams() {
  return getCourses().map((course) => ({ courseId: course.id }));
}

async function CourseNotesContent({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getCourse(courseId);

  if (!course) {
    notFound();
  }

  return <LessonList course={course} />;
}

export default function CourseNotesPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading course…</p>}>
      <CourseNotesContent params={params} />
    </Suspense>
  );
}
