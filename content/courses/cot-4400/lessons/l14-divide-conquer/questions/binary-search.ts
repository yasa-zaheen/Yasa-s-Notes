import type { Question } from "@/features/questions";

const meta = {
  courseId: "cot-4400",
  lessonId: "l14-divide-conquer",
  topicId: "binary-search",
} as const;

export const binarySearchQuestions: Question[] = [
  {
    ...meta,
    id: "l14-bs-mcq-input",
    type: "mcq",
    difficulty: "easy",
    prompt: "Binary search as taught requires which input property?",
    options: [
      "A sorted array",
      "A max-heap",
      "An unsorted linked list",
      "A hash table with chaining",
    ],
    correctIndex: 0,
    explanation:
      "Input is a sorted array of length $n$ plus target $t$ (slides 15–17).",
    tags: ["binary-search"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 15",
  },
  {
    ...meta,
    id: "l14-bs-mcq-empty",
    type: "mcq",
    difficulty: "easy",
    prompt:
      "In the lecture \`BinarySearch(low, high)\` code, what happens when \`low > high\`?",
    options: [
      "Return $-1$",
      "Return \`mid\`",
      "Search both halves",
      "Throw an exception (required by lecture)",
    ],
    correctIndex: 0,
    explanation: "If \`low > high\`, return $-1$ — the search range is empty.",
    tags: ["pseudocode", "base-case"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 19",
  },
  {
    ...meta,
    id: "l14-bs-mcq-mid",
    type: "mcq",
    difficulty: "easy",
    prompt: "How does the lecture compute \`mid\`?",
    options: [
      "\`mid = (low + high)/2\`",
      "\`mid = low\`",
      "\`mid = high - 1\`",
      "\`mid = low * high\`",
    ],
    correctIndex: 0,
    explanation: "Slide 19: \`mid = (low + high)/2\`.",
    tags: ["pseudocode"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 19",
  },
  {
    ...meta,
    id: "l14-bs-mcq-naive",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "Naïve “search both halves” binary search satisfies $T(n)=2T(n/2)+\\Theta(1)$. Master Theorem gives:",
    options: ["$\\Theta(1)$", "$\\Theta(\\lg n)$", "$\\Theta(n)$", "$\\Theta(n^2)$"],
    correctIndex: 2,
    explanation:
      "Slide 16: $T(n)=\\Theta(n)$ — no better than linear search.",
    tags: ["recurrence", "master-theorem"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 16",
  },
  {
    ...meta,
    id: "l14-bs-cx-better",
    type: "complexity",
    difficulty: "medium",
    format: "choice",
    prompt:
      "Better binary search uses $T(n)=T(n/2)+\\Theta(1)$. Bound via Master Theorem?",
    options: ["$\\Theta(n)$", "$\\Theta(\\lg n)$", "$\\Theta(n \\lg n)$", "$\\Theta(2^n)$"],
    correctIndex: 1,
    explanation:
      "Only one recursive call on half the size → $\\Theta(\\lg n)$ (slide 17).",
    tags: ["complexity", "master-theorem"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 17",
  },
  {
    ...meta,
    id: "l14-bs-multi",
    type: "multi_select",
    difficulty: "medium",
    prompt: "Which statements match lecture binary search?",
    options: [
      "Only one half of a sorted array can contain the target",
      "The good recurrence has a single recursive call",
      "Early exit when \`data[i] > t\` improves worst-case exhaustive search to $O(\\log n)$",
      "The lecture marks the recursive implementation as tail recursive",
    ],
    correctIndices: [0, 1, 3],
    explanation:
      "Sortedness → one half; $T(n)=T(n/2)+\\Theta(1)$; slide 19 notes tail recursion. Early exit on linear scan does not improve worst case (slide 15).",
    tags: ["binary-search"],
    sourceReference: "L14.Divide&Conquer.pptx, slides 15–19",
  },
];
