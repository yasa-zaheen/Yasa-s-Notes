import { l10SortingNotes } from "@/content/courses/cot-4400/lessons/l10-sorting/notes";
import { l12DataStructuresNotes } from "@/content/courses/cot-4400/lessons/l12-data-structures/notes";
import { l13DataStructuresContinuedNotes } from "@/content/courses/cot-4400/lessons/l13-data-structures-continued/notes";
import { l14DivideConquerNotes } from "@/content/courses/cot-4400/lessons/l14-divide-conquer/notes";
import { l15DivideConquerContinuedNotes } from "@/content/courses/cot-4400/lessons/l15-divide-conquer-continued/notes";
import { l16GreedyNotes } from "@/content/courses/cot-4400/lessons/l16-greedy/notes";

import type { LessonNotes } from "../types";

const NOTES: LessonNotes[] = [
  l10SortingNotes,
  l12DataStructuresNotes,
  l13DataStructuresContinuedNotes,
  l14DivideConquerNotes,
  l15DivideConquerContinuedNotes,
  l16GreedyNotes,
];

export function getLessonNotes(courseId: string, lessonId: string) {
  return NOTES.find((notes) => notes.courseId === courseId && notes.lessonId === lessonId);
}

export function getAllLessonNotes() {
  return NOTES;
}

export function noteBookmarkId(
  courseId: string,
  lessonId: string,
  topicId: string,
  sectionId: string
) {
  return `${courseId}:${lessonId}:${topicId}:${sectionId}`;
}
