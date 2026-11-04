import type { LessonNotes } from "@/features/notes";

import { hashExpectedNotes } from "./hash-expected";
import { heapsNotes } from "./heaps";
import { mapsNotes } from "./maps";
import { priorityQueuesNotes } from "./priority-queues";

export const l13DataStructuresContinuedNotes: LessonNotes = {
  courseId: "cot-4400",
  lessonId: "l13-data-structures-continued",
  intro:
    "Lecture 13 (Oguzhan Topsakal) continues data structures: expected-case hashing, maps, priority queues, and heap implementation (including Heapify and a HeapSort exercise). Notes follow *L13.DataStructuresContinued.pptx*.",
  topics: [
    hashExpectedNotes,
    mapsNotes,
    priorityQueuesNotes,
    heapsNotes,
  ],
};
