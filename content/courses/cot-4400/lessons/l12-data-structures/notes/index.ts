import type { LessonNotes } from "@/features/notes";

import { bstNotes } from "./bst";
import { dataOrganizationNotes } from "./data-organization";
import { hashTablesNotes } from "./hash-tables";
import { setsArraysNotes } from "./sets-arrays";
import { stacksQueuesNotes } from "./stacks-queues";

export const l12DataStructuresNotes: LessonNotes = {
  courseId: "cot-4400",
  lessonId: "l12-data-structures",
  intro:
    "Lecture 12 (Oguzhan Topsakal) surveys how data organization affects performance, then stacks/queues, array-based sets, BSTs, and hash tables (worst-case view). Notes follow *L12.DataStructures.pptx*.",
  topics: [
    dataOrganizationNotes,
    stacksQueuesNotes,
    setsArraysNotes,
    bstNotes,
    hashTablesNotes,
  ],
};
