import type { Question } from "@/features/questions";

import { closestPairQuestions } from "./closest-pair";
import { convexHullQuestions } from "./convex-hull";
import { maxSubarrayQuestions } from "./max-subarray";

export const l15DivideConquerContinuedQuestions: Question[] = [
  ...closestPairQuestions,
  ...convexHullQuestions,
  ...maxSubarrayQuestions,
];
