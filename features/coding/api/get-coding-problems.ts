import {
  getCodingProblem as getL10CodingProblem,
  getCodingProblemsForLesson as getL10CodingProblemsForLesson,
  l10CodingProblems,
} from "@/content/courses/cot-4400/lessons/l10-sorting/coding/problems";

import type { CodingProblem } from "../types";

const ALL_PROBLEMS: CodingProblem[] = [...l10CodingProblems];

export function getAllCodingProblems() {
  return ALL_PROBLEMS;
}

export function getCodingProblem(problemId: string) {
  return getL10CodingProblem(problemId) ?? ALL_PROBLEMS.find((problem) => problem.id === problemId);
}

export function getCodingProblemsForLesson(courseId: string, lessonId: string) {
  if (courseId === "cot-4400" && lessonId === "l10-sorting") {
    return getL10CodingProblemsForLesson(courseId, lessonId);
  }

  return ALL_PROBLEMS.filter(
    (problem) => problem.courseId === courseId && problem.lessonId === lessonId
  );
}
