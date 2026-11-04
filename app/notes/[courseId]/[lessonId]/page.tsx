import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getCourses, getLesson } from "@/features/courses";
import { getLessonNotes, LessonNotesViewer } from "@/features/notes";

export function generateStaticParams() {
  return getCourses().flatMap((course) =>
    course.lessons.map((lesson) => ({
      courseId: course.id,
      lessonId: lesson.id,
    }))
  );
}

async function LessonNotesContent({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const match = getLesson(courseId, lessonId);

  if (!match) {
    notFound();
  }

  return (
    <LessonNotesViewer
      course={match.course}
      lesson={match.lesson}
      notes={getLessonNotes(courseId, lessonId)}
    />
  );
}

export default function LessonNotesPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading notes…</p>}>
      <LessonNotesContent params={params} />
    </Suspense>
  );
}
