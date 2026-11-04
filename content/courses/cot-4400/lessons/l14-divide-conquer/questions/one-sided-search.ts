import type { Question } from "@/features/questions";

const meta = {
  courseId: "cot-4400",
  lessonId: "l14-divide-conquer",
  topicId: "one-sided-search",
} as const;

export const oneSidedSearchQuestions: Question[] = [
  {
    ...meta,
    id: "l14-oss-mcq-idea",
    type: "mcq",
    difficulty: "easy",
    prompt: "One-sided binary search (lecture) starts by:",
    options: [
      "Starting at a min value and doubling until too large",
      "Searching both halves of an unsorted array",
      "Building a strip within distance $d$ of a midline",
      "Sorting jobs by nonincreasing profit",
    ],
    correctIndex: 0,
    explanation:
      "Slide 36: start with min value, double until too large, then binary search between last success and first failure.",
    tags: ["one-sided-search"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 36",
  },
  {
    ...meta,
    id: "l14-oss-mcq-second-phase",
    type: "mcq",
    difficulty: "easy",
    prompt: "After doubling finds a failure bound, one-sided search next:",
    options: [
      "Binary searches between last success and first failure",
      "Runs exhaustive search on the full $[1,n]$ range",
      "Applies Strassen’s seven products",
      "Returns $-1$ immediately",
    ],
    correctIndex: 0,
    explanation: "Binary search between last success and first failure.",
    tags: ["one-sided-search"],
    sourceReference: "L14.Divide&Conquer.pptx, slides 36–37",
  },
  {
    ...meta,
    id: "l14-oss-cx-powers",
    type: "complexity",
    difficulty: "medium",
    format: "choice",
    prompt:
      "Trying every power of $2$ until exceeding large $n$ takes (lecture):",
    options: ["$\\Theta(n)$", "$\\Theta(\\lg n)$", "$\\Theta(n^2)$", "$\\Theta(2^n)$"],
    correctIndex: 1,
    explanation: "Slide 37: $\\Theta(\\lg n)$ time.",
    tags: ["complexity"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 37",
  },
  {
    ...meta,
    id: "l14-oss-mcq-root",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "Estimating a root by guessing midpoints (e.g. between 1 and 2) needs:",
    options: [
      "Upper and lower bounds",
      "An unsorted adjacency list",
      "Seven matrix multiplications",
      "A greedy feasibility check only",
    ],
    correctIndex: 0,
    explanation:
      "Ordinary bisection needs upper and lower bounds; one-sided search is the alternative when a bound is missing (slide 36).",
    tags: ["binary-search", "roots"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 36",
  },
  {
    ...meta,
    id: "l14-oss-multi",
    type: "multi_select",
    difficulty: "medium",
    prompt: "Which claims match the one-sided search slides?",
    options: [
      "Binary search applies beyond sorted-array lookup",
      "Doubling then refining is $\\Theta(\\lg n)$",
      "Exhaustive power-of-two probing until $> n$ is $\\Theta(\\lg n)$",
      "One-sided search requires Master Theorem case $a=8$",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Slides 36–37 cover general binary search uses and $\\Theta(\\lg n)$ doubling/search. Strassen’s $a=8$ is unrelated.",
    tags: ["one-sided-search"],
    sourceReference: "L14.Divide&Conquer.pptx, slides 36–37",
  },
  {
    ...meta,
    id: "l14-oss-mcq-why-log",
    type: "mcq",
    difficulty: "hard",
    prompt:
      "Why is “try powers of 2 until exceed $n$” logarithmic rather than linear in $n$?",
    options: [
      "The number of doublings grows like $\\lg n$, not like $n$",
      "Each trial scans all $n$ array indices",
      "Master Theorem forces $O(n)$ for any doubling loop",
      "You only try the single value $2^n$",
    ],
    correctIndex: 0,
    explanation:
      "You examine $2^0,2^1,\\ldots$ until surpassing $n$ — about $\\lg n$ trials. Tagged supplementary for the counting argument wording; the $\\Theta(\\lg n)$ claim is on slide 37.",
    tags: ["complexity", "supplementary"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 37",
  },
];
