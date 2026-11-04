import type { Question } from "@/features/questions";

const meta = {
  courseId: "cot-4400",
  lessonId: "l12-data-structures",
  topicId: "stacks-queues",
} as const;

export const stacksQueuesQuestions: Question[] = [
  {
    ...meta,
    id: "l12-sq-mcq-lifo",
    type: "mcq",
    difficulty: "easy",
    prompt: "Stacks support push/pop in which order?",
    options: ["FIFO", "LIFO", "Sorted order", "Random access order"],
    correctIndex: 1,
    explanation: "Stacks: Last-In, First-Out (LIFO). Queues are FIFO.",
    sourceReference: "L12.DataStructures.pptx, slide 9",
    tags: ["stack"],
  },
  {
    ...meta,
    id: "l12-sq-mcq-fifo",
    type: "mcq",
    difficulty: "easy",
    prompt: "Queues support enqueue/dequeue in which order?",
    options: ["LIFO", "FIFO", "Heap order", "BST order"],
    correctIndex: 1,
    explanation: "Queues: First-In, First-Out (FIFO). Lecture calls this more “fair.”",
    sourceReference: "L12.DataStructures.pptx, slide 9",
    tags: ["queue"],
  },
  {
    ...meta,
    id: "l12-sq-mcq-bad-enlarge",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "If the array enlarges by $+1$ on every overflow, average cost per push over $n$ pushes is",
    options: ["$\\Theta(1)$", "$O(\\lg n)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 2,
    explanation:
      "Bad policy: increment by 1 costs $\\Theta(n)$ every time. Average cost per push: $O(n)$.",
    sourceReference: "L12.DataStructures.pptx, slide 11",
    tags: ["amortized", "enlargement"],
  },
  {
    ...meta,
    id: "l12-sq-mcq-double",
    type: "mcq",
    difficulty: "easy",
    prompt: "Best array enlargement policy in lecture for amortized $\\Theta(1)$ push?",
    options: [
      "Increment capacity by 1",
      "Increment by a fixed $k$",
      "Double the array size",
      "Never enlarge; fail when full",
    ],
    correctIndex: 2,
    explanation:
      "Best policy: double array size. Cost $\\Theta(n)$ after powers of two; average cost per push $\\Theta(1)$.",
    sourceReference: "L12.DataStructures.pptx, slide 11",
    tags: ["amortized"],
  },
  {
    ...meta,
    id: "l12-sq-mcq-postfix",
    type: "mcq",
    difficulty: "medium",
    prompt: "Evaluating a postfix expression like \`6 1 7 - +\` is best done with a",
    options: ["Queue", "Stack", "Sorted array", "Max-heap"],
    correctIndex: 1,
    explanation:
      "Operators combine the last two numbers. That is LIFO behavior — use a stack. Lecture result for \`6 1 7 - +\` is $0$.",
    sourceReference: "L12.DataStructures.pptx, slides 16–21",
    tags: ["postfix"],
  },
  {
    ...meta,
    id: "l12-sq-multi",
    type: "multi_select",
    difficulty: "medium",
    prompt: "Select the lecture facts about stacks and queues.",
    options: [
      "They are abstract data structures defining a set of operations",
      "They generally do not support random access",
      "Deque supports push, pop, enqueue, and dequeue",
      "Build is $\\Theta(1)$ for both stack and queue",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Abstract ADTs; no random access; deques support all four ops. Build is $\\Theta(n)$, not $\\Theta(1)$.",
    sourceReference: "L12.DataStructures.pptx, slides 9, 15",
    tags: ["properties"],
  },
  {
    ...meta,
    id: "l12-sq-cx-push",
    type: "complexity",
    difficulty: "medium",
    format: "choice",
    prompt: "With doubling enlargement, push is",
    options: [
      "$\\Theta(n)$ every push",
      "$\\Theta(1)$ worst-case every push with no exceptions",
      "$\\Theta(1)$ amortized",
      "$\\Theta(n \\lg n)$ amortized",
    ],
    correctIndex: 2,
    explanation:
      "If capacity $> size$, just add; otherwise enlarge. Lecture lists push as $\\Theta(1)$ amortized.",
    sourceReference: "L12.DataStructures.pptx, slides 11–12",
    tags: ["amortized", "complexity"],
  },
];
