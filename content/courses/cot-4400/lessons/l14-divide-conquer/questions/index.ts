import type { Question } from "@/features/questions";

import { binarySearchQuestions } from "./binary-search";
import { dcExamplesQuestions } from "./dc-examples";
import { designStrategiesQuestions } from "./design-strategies";
import { matrixStrassenQuestions } from "./matrix-strassen";
import { oneSidedSearchQuestions } from "./one-sided-search";

export const l14DivideConquerQuestions: Question[] = [
  ...designStrategiesQuestions,
  ...binarySearchQuestions,
  ...dcExamplesQuestions,
  ...matrixStrassenQuestions,
  ...oneSidedSearchQuestions,
];
