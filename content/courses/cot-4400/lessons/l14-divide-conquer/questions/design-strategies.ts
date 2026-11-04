import type { Question } from "@/features/questions";

const meta = {
  courseId: "cot-4400",
  lessonId: "l14-divide-conquer",
  topicId: "design-strategies",
} as const;

export const designStrategiesQuestions: Question[] = [
  {
    ...meta,
    id: "l14-ds-mcq-templates",
    type: "mcq",
    difficulty: "easy",
    prompt:
      "Which set matches the lecture’s well-known algorithm design approaches?",
    options: [
      "Divide and Conquer, Greedy, Dynamic Programming, Backtracking",
      "Bubble Sort, Heap Sort, Radix Sort, Counting Sort",
      "BFS, DFS, Dijkstra, Prim",
      "Hashing, Caching, Pipelining, Branch prediction",
    ],
    correctIndex: 0,
    explanation:
      "Slide 4 lists Divide and Conquer, Greedy, Dynamic Programming, and Backtracking as the well-known approaches (templates).",
    tags: ["templates"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 4",
    estimatedTimeSeconds: 30,
  },
  {
    ...meta,
    id: "l14-ds-mcq-exhaustive-sort",
    type: "mcq",
    difficulty: "easy",
    prompt:
      "Exhaustive sorting checks all $n!$ permutations, each in $O(n)$ time. Total complexity?",
    options: ["$O(n!)$", "$O(n! \\cdot n)$", "$O(n^2)$", "$O(2^n)$"],
    correctIndex: 1,
    explanation:
      "Lecture: $n!$ permutations, each sorted-check costs $O(n)$, so $O(n! \\cdot n)$.",
    tags: ["exhaustive-search", "complexity"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 8",
  },
  {
    ...meta,
    id: "l14-ds-mcq-dc-goal",
    type: "mcq",
    difficulty: "easy",
    prompt: "Stated goal of divide-and-conquer in lecture?",
    options: [
      "Reduce complexity of high-complexity algorithms",
      "Always use the locally best irreversible choice",
      "Memoize overlapping subproblems in a table",
      "Enumerate every feasible candidate then backtrack",
    ],
    correctIndex: 0,
    explanation:
      "Slide 10: goal is to reduce complexity of high-complexity algorithms by dividing, recursing, and combining.",
    tags: ["divide-and-conquer"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 10",
  },
  {
    ...meta,
    id: "l14-ds-multi-exhaustive-pros",
    type: "multi_select",
    difficulty: "medium",
    prompt: "Which are lecture pros of exhaustive search?",
    options: [
      "Simplicity — easy to design and implement",
      "Completeness — guarantees a solution if one exists",
      "Always asymptotically fastest for large $n$",
      "Always gets the correct/optimum answer",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Pros include simplicity, completeness, and always getting the correct/optimum answer. Inefficiency / being almost always slowest is a con.",
    tags: ["exhaustive-search"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 9",
  },
  {
    ...meta,
    id: "l14-ds-mcq-optimal-substructure",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "A stated con of divide-and-conquer is that the problem must exhibit:",
    options: [
      "Optimal substructure",
      "Amortized constant-time updates",
      "A greedy-choice property only",
      "Unit-cost hashing",
    ],
    correctIndex: 0,
    explanation:
      "Slides 20/38: the problem must exhibit optimal substructure — the solution must be related to subproblem solutions.",
    tags: ["optimal-substructure"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 20",
  },
  {
    ...meta,
    id: "l14-ds-multi-dc-pros",
    type: "multi_select",
    difficulty: "medium",
    prompt: "Select lecture pros of divide-and-conquer analysis/use.",
    options: [
      "Easy to prove correctness via strong induction",
      "Easy to analyze with the Master Theorem",
      "Works very well with parallel computing",
      "Never requires optimal substructure",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Pros include induction proofs, Master Theorem analysis, and parallel computing. Optimal substructure is required — that is a con when missing.",
    tags: ["divide-and-conquer", "master-theorem"],
    sourceReference: "L14.Divide&Conquer.pptx, slides 20, 38",
  },
  {
    ...meta,
    id: "l14-ds-cx-subsets",
    type: "complexity",
    difficulty: "easy",
    format: "choice",
    prompt:
      "Lecture example: checking all subsets of a set of size $n$ has which complexity?",
    options: ["$O(n)$", "$O(n \\log n)$", "$O(2^n)$", "$O(n!)$"],
    correctIndex: 2,
    explanation: "Slide 7: all subsets → $O(2^n)$ (exponential).",
    tags: ["exhaustive-search", "complexity"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 7",
  },
];
