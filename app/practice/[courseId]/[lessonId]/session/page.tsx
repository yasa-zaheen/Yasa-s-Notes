import { Suspense } from "react";

import { getCourses } from "@/features/courses";
import { SessionRunner } from "@/features/practice";

export function generateStaticParams() {
  return getCourses().flatMap((course) =>
    course.lessons.map((lesson) => ({
      courseId: course.id,
      lessonId: lesson.id,
    }))
  );
}

async function PracticeSessionContent({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  return <SessionRunner courseId={courseId} lessonId={lessonId} />;
}

export default function PracticeSessionPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading session…</p>}>
      <PracticeSessionContent params={params} />
    </Suspense>
  );
}
