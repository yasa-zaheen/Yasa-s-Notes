import type { Difficulty, Phase1QuestionType, Question } from "../types";

export type QuestionFilter = {
  courseId: string;
  lessonId: string;
  topicIds: string[];
  types: Phase1QuestionType[];
  difficulty: Difficulty | "mixed" | "adaptive";
  count: number;
  questionIds?: string[];
};

function shuffle<T>(items: T[]) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapWith = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapWith]] = [copy[swapWith], copy[index]];
  }

  return copy;
}

export function filterQuestions(bank: Question[], filter: QuestionFilter) {
  if (filter.questionIds?.length) {
    const wanted = new Set(filter.questionIds);
    return bank.filter((question) => wanted.has(question.id));
  }

  return bank.filter((question) => {
    if (question.courseId !== filter.courseId) {
      return false;
    }

    if (question.lessonId !== filter.lessonId) {
      return false;
    }

    if (filter.topicIds.length > 0 && !filter.topicIds.includes(question.topicId)) {
      return false;
    }

    if (!filter.types.includes(question.type)) {
      return false;
    }

    if (filter.difficulty === "easy" || filter.difficulty === "medium" || filter.difficulty === "hard") {
      return question.difficulty === filter.difficulty;
    }

    return true;
  });
}

export function selectQuestions(bank: Question[], filter: QuestionFilter) {
  const matches = filterQuestions(bank, filter);

  if (filter.questionIds?.length) {
    return filter.questionIds
      .map((id) => matches.find((question) => question.id === id))
      .filter((question): question is Question => Boolean(question));
  }

  return shuffle(matches).slice(0, filter.count);
}
