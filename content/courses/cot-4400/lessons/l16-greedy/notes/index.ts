import type { LessonNotes } from "@/features/notes";

import { greedyStrategyNotes } from "./greedy-strategy";
import { makeChangeNotes } from "./make-change";
import { schedulingDeadlinesNotes } from "./scheduling-deadlines";
import { schedulingTotalTimeNotes } from "./scheduling-total-time";

export const l16GreedyNotes: LessonNotes = {
  courseId: "cot-4400",
  lessonId: "l16-greedy",
  intro:
    "Lecture 16 (Oguzhan Topsakal) introduces the greedy design template, then make-change, minimizing total time in the system, and scheduling with deadlines. Notes follow *L16.GreedyApproach.pptx*.",
  topics: [
    greedyStrategyNotes,
    makeChangeNotes,
    schedulingTotalTimeNotes,
    schedulingDeadlinesNotes,
  ],
};
