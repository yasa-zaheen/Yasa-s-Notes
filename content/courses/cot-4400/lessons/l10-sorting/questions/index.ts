import type { Question } from "@/features/questions";

import { bubbleSortQuestions } from "./bubble-sort";
import { comparisonSortingQuestions } from "./comparison-sorting";
import { counterfeitCoinQuestions } from "./counterfeit-coin";
import { insertionSortQuestions } from "./insertion-sort";
import { mergeSortQuestions } from "./merge-sort";
import { quickSortQuestions } from "./quick-sort";
import { selectionSortQuestions } from "./selection-sort";

export const l10SortingQuestions: Question[] = [
  ...selectionSortQuestions,
  ...insertionSortQuestions,
  ...bubbleSortQuestions,
  ...mergeSortQuestions,
  ...quickSortQuestions,
  ...comparisonSortingQuestions,
  ...counterfeitCoinQuestions,
];
