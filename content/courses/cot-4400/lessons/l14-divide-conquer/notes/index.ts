import type { LessonNotes } from "@/features/notes";

import { binarySearchNotes } from "./binary-search";
import { dcExamplesNotes } from "./dc-examples";
import { designStrategiesNotes } from "./design-strategies";
import { matrixStrassenNotes } from "./matrix-strassen";
import { oneSidedSearchNotes } from "./one-sided-search";

export const l14DivideConquerNotes: LessonNotes = {
  courseId: "cot-4400",
  lessonId: "l14-divide-conquer",
  intro:
    "Lecture 14 (Oguzhan Topsakal) introduces algorithm design templates, contrasts exhaustive search with divide-and-conquer, then develops binary search, classic D&C examples, Strassen matrix multiplication, and one-sided binary search. Notes follow *L14.Divide&Conquer.pptx*.",
  topics: [
    designStrategiesNotes,
    binarySearchNotes,
    dcExamplesNotes,
    matrixStrassenNotes,
    oneSidedSearchNotes,
  ],
};
