import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CodingProblemList, getCodingProblemsForLesson } from "@/features/coding";
import { getCourses, getLesson } from "@/features/courses";

export function generateStaticParams() {
  return getCourses().flatMap((course) =>
    course.lessons.map((lesson) => ({
      courseId: course.id,
      lessonId: lesson.id,
    }))
  );
}

async function CodingListContent({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const match = getLesson(courseId, lessonId);

  if (!match) {
    notFound();
  }

  const problems = getCodingProblemsForLesson(courseId, lessonId);

  return (
    <CodingProblemList course={match.course} lesson={match.lesson} problems={problems} />
  );
}

export default function CodingListPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading problems…</p>}>
      <CodingListContent params={params} />
    </Suspense>
  );
}
