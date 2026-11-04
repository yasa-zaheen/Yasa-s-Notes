import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CodingWorkspace, getAllCodingProblems, getCodingProblem } from "@/features/coding";
import { getCourses } from "@/features/courses";

export function generateStaticParams() {
  const courses = getCourses();
  const problems = getAllCodingProblems();

  return problems.flatMap((problem) => {
    const courseExists = courses.some(
      (course) =>
        course.id === problem.courseId &&
        course.lessons.some((lesson) => lesson.id === problem.lessonId)
    );

    if (!courseExists) {
      return [];
    }

    return [
      {
        courseId: problem.courseId,
        lessonId: problem.lessonId,
        problemId: problem.id,
      },
    ];
  });
}

async function CodingWorkspaceContent({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string; problemId: string }>;
}) {
  const { courseId, lessonId, problemId } = await params;
  const problem = getCodingProblem(problemId);

  if (!problem || problem.courseId !== courseId || problem.lessonId !== lessonId) {
    notFound();
  }

  return <CodingWorkspace problem={problem} />;
}

export default function CodingWorkspacePage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string; problemId: string }>;
}) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading workspace…</p>}>
      <CodingWorkspaceContent params={params} />
    </Suspense>
  );
}
