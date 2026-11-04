import type { Question } from "@/features/questions";

const meta = {
  courseId: "cot-4400",
  lessonId: "l12-data-structures",
  topicId: "data-organization",
} as const;

export const dataOrganizationQuestions: Question[] = [
  {
    ...meta,
    id: "l12-org-mcq-impact",
    type: "mcq",
    difficulty: "easy",
    prompt: "According to lecture, organization of data",
    options: [
      "Has little effect on algorithm performance",
      "Significantly impacts performance",
      "Only matters for sorting algorithms",
      "Is purely a space concern, never time",
    ],
    correctIndex: 1,
    explanation:
      "Lecture: “Organization of data significantly impacts performance.” Spend time upfront to organize data well and reduce time on common operations.",
    sourceReference: "L12.DataStructures.pptx, slide 4",
    tags: ["motivation"],
  },
  {
    ...meta,
    id: "l12-org-mcq-contiguous",
    type: "mcq",
    difficulty: "easy",
    prompt: "Which structures are lecture examples of contiguous organization?",
    options: [
      "Linked lists and graphs",
      "Arrays and dynamic arrays",
      "BSTs and AVL trees",
      "Only B-trees",
    ],
    correctIndex: 1,
    explanation: "Contiguous examples: arrays and dynamic arrays — one chunk of memory, index-based access.",
    sourceReference: "L12.DataStructures.pptx, slide 6",
    tags: ["contiguous"],
  },
  {
    ...meta,
    id: "l12-org-mcq-pointer-arith",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "In contiguous structures, locating element $i$ via pointer arithmetic is typically",
    options: ["$O(k)$ for $k$ links", "$O(1)$", "$O(\\lg n)$", "$O(n)$"],
    correctIndex: 1,
    explanation:
      "Address $= \\text{base} + i \\times \\text{element size}$ is $O(1)$, versus following $k$ links in $O(k)$ time in link-based structures.",
    sourceReference: "L12.DataStructures.pptx, slide 6",
    tags: ["contiguous"],
  },
  {
    ...meta,
    id: "l12-org-mcq-hybrid",
    type: "mcq",
    difficulty: "easy",
    prompt: "Hash tables with chaining are categorized as",
    options: ["Contiguous only", "Link-based only", "Hybrid", "Neither contiguous nor link-based"],
    correctIndex: 2,
    explanation:
      "Hybrid: an array stores the buckets; each bucket may contain a linked list for collisions.",
    sourceReference: "L12.DataStructures.pptx, slide 8",
    tags: ["hybrid"],
  },
  {
    ...meta,
    id: "l12-org-mcq-heapsort",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "Lecture: a heap that builds in $\\Theta(n)$ and delete-min in $\\Theta(\\lg n)$ transforms SelectionSort into HeapSort of complexity",
    options: ["$\\Theta(n)$", "$\\Theta(n \\lg n)$", "$\\Theta(n^2)$", "$\\Theta(\\lg n)$"],
    correctIndex: 1,
    explanation:
      "Heap: $\\Theta(n)$ to build and $\\Theta(\\lg n)$ to delete min. That turns $\\Theta(n^2)$ SelectionSort into $\\Theta(n \\lg n)$ HeapSort.",
    sourceReference: "L12.DataStructures.pptx, slide 5",
    tags: ["heapsort", "motivation"],
  },
  {
    ...meta,
    id: "l12-org-multi-cats",
    type: "multi_select",
    difficulty: "medium",
    prompt: "Which statements match the lecture’s data-structure categories?",
    options: [
      "Contiguous: single chunk of memory; index-based retrieval",
      "Link-based: islands connected by pointers",
      "B-trees are a hybrid example",
      "Link-based structures never support trees",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Contiguous / link-based / hybrid as defined on slides 6–8. Trees (e.g., BST, AVL) are link-based examples; B-trees are hybrid.",
    sourceReference: "L12.DataStructures.pptx, slides 6–8",
    tags: ["categories"],
  },
  {
    ...meta,
    id: "l12-org-cx-build-heap",
    type: "complexity",
    difficulty: "easy",
    format: "choice",
    prompt: "Time to build a heap, as cited when motivating HeapSort?",
    options: ["$\\Theta(1)$", "$\\Theta(\\lg n)$", "$\\Theta(n)$", "$\\Theta(n^2)$"],
    correctIndex: 2,
    explanation: "Slide 5: heap takes $\\Theta(n)$ time to build and $\\Theta(\\lg n)$ to delete min.",
    sourceReference: "L12.DataStructures.pptx, slide 5",
    tags: ["heap", "complexity"],
  },
];
