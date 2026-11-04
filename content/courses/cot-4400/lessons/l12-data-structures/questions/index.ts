import type { Question } from "@/features/questions";

import { bstQuestions } from "./bst";
import { dataOrganizationQuestions } from "./data-organization";
import { hashTablesQuestions } from "./hash-tables";
import { setsArraysQuestions } from "./sets-arrays";
import { stacksQueuesQuestions } from "./stacks-queues";

export const l12DataStructuresQuestions: Question[] = [
  ...dataOrganizationQuestions,
  ...stacksQueuesQuestions,
  ...setsArraysQuestions,
  ...bstQuestions,
  ...hashTablesQuestions,
];
