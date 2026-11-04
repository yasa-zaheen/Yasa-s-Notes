import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getCourses, getLesson } from "@/features/courses";
import { SessionConfigForm } from "@/features/practice";

export function generateStaticParams() {
  return getCourses().flatMap((course) =>
    course.lessons.map((lesson) => ({
      courseId: course.id,
      lessonId: lesson.id,
    }))
  );
}

async function PracticeConfigContent({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
  searchParams: Promise<{ topics?: string }>;
}) {
  const { courseId, lessonId } = await params;
  const { topics } = await searchParams;
  const match = getLesson(courseId, lessonId);

  if (!match) {
    notFound();
  }

  const initialTopics = topics ? topics.split(",").filter(Boolean) : [];

  return (
    <SessionConfigForm
      course={match.course}
      lesson={match.lesson}
      initialTopics={initialTopics}
    />
  );
}

export default function PracticeConfigPage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
  searchParams: Promise<{ topics?: string }>;
}) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading practice…</p>}>
      <PracticeConfigContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
