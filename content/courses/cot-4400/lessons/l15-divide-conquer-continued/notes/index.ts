import type { LessonNotes } from "@/features/notes";

import { closestPairNotes } from "./closest-pair";
import { convexHullNotes } from "./convex-hull";
import { maxSubarrayNotes } from "./max-subarray";

export const l15DivideConquerContinuedNotes: LessonNotes = {
  courseId: "cot-4400",
  lessonId: "l15-divide-conquer-continued",
  intro:
    "Lecture 15 (Oguzhan Topsakal) continues divide-and-conquer with closest pair of points, convex hull, and maximum contiguous subarray sum. Notes follow *L15.Divide&ConquerContinued.pptx*.",
  topics: [closestPairNotes, convexHullNotes, maxSubarrayNotes],
};
