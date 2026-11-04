import type { LessonNotes } from "@/features/notes";

import { bubbleSortNotes } from "./bubble-sort";
import { comparisonSortingNotes } from "./comparison-sorting";
import { counterfeitCoinNotes } from "./counterfeit-coin";
import { insertionSortNotes } from "./insertion-sort";
import { mergeSortNotes } from "./merge-sort";
import { quickSortNotes } from "./quick-sort";
import { selectionSortNotes } from "./selection-sort";

export const l10SortingNotes: LessonNotes = {
  courseId: "cot-4400",
  lessonId: "l10-sorting",
  intro:
    "Lecture 10 (Oguzhan Topsakal) reviews quadratic sorts, then MergeSort and QuickSort, and finishes with the comparison-based lower bound and the counterfeit-coin exercise. Notes follow *L10.Sorting.pptx*.",
  topics: [
    selectionSortNotes,
    insertionSortNotes,
    bubbleSortNotes,
    mergeSortNotes,
    quickSortNotes,
    comparisonSortingNotes,
    counterfeitCoinNotes,
  ],
};
