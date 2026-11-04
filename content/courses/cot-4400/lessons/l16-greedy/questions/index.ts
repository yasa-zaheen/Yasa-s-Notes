import type { Question } from "@/features/questions";

import { greedyStrategyQuestions } from "./greedy-strategy";
import { makeChangeQuestions } from "./make-change";
import { schedulingDeadlinesQuestions } from "./scheduling-deadlines";
import { schedulingTotalTimeQuestions } from "./scheduling-total-time";

export const l16GreedyQuestions: Question[] = [
  ...greedyStrategyQuestions,
  ...makeChangeQuestions,
  ...schedulingTotalTimeQuestions,
  ...schedulingDeadlinesQuestions,
];
