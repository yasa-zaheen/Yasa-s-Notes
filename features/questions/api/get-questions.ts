import { l10SortingQuestions } from "@/content/courses/cot-4400/lessons/l10-sorting/questions";
import { l12DataStructuresQuestions } from "@/content/courses/cot-4400/lessons/l12-data-structures/questions";
import { l13DataStructuresContinuedQuestions } from "@/content/courses/cot-4400/lessons/l13-data-structures-continued/questions";
import { l14DivideConquerQuestions } from "@/content/courses/cot-4400/lessons/l14-divide-conquer/questions";
import { l15DivideConquerContinuedQuestions } from "@/content/courses/cot-4400/lessons/l15-divide-conquer-continued/questions";
import { l16GreedyQuestions } from "@/content/courses/cot-4400/lessons/l16-greedy/questions";

import { questionSchema, type Question } from "../types";

const BANK: Question[] = questionSchema.array().parse([
  ...l10SortingQuestions,
  ...l12DataStructuresQuestions,
  ...l13DataStructuresContinuedQuestions,
  ...l14DivideConquerQuestions,
  ...l15DivideConquerContinuedQuestions,
  ...l16GreedyQuestions,
]);

export function getQuestionBank(): Question[] {
  return BANK;
}

export function getQuestionById(id: string) {
  return BANK.find((question) => question.id === id);
}

export function getQuestionsForLesson(courseId: string, lessonId: string) {
  return BANK.filter(
    (question) => question.courseId === courseId && question.lessonId === lessonId
  );
}

export function notesPathForQuestion(question: Question) {
  return `/notes/${question.courseId}/${question.lessonId}#${question.topicId}`;
}
