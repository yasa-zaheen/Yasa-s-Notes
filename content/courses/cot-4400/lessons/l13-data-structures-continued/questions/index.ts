import type { Question } from "@/features/questions";

import { hashExpectedQuestions } from "./hash-expected";
import { heapsQuestions } from "./heaps";
import { mapsQuestions } from "./maps";
import { priorityQueuesQuestions } from "./priority-queues";

export const l13DataStructuresContinuedQuestions: Question[] = [
  ...hashExpectedQuestions,
  ...mapsQuestions,
  ...priorityQueuesQuestions,
  ...heapsQuestions,
];
