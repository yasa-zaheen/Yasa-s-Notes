import type { Question } from "@/features/questions";

const meta = {
  courseId: "cot-4400",
  lessonId: "l14-divide-conquer",
  topicId: "matrix-strassen",
} as const;

export const matrixStrassenQuestions: Question[] = [
  {
    ...meta,
    id: "l14-ms-mcq-naive",
    type: "mcq",
    difficulty: "easy",
    prompt: "Naïve matrix multiplication time complexity in lecture?",
    options: ["$O(n)$", "$O(n^2)$", "$O(n^3)$", "$O(n^{\\log_2 7})$"],
    correctIndex: 2,
    explanation: "Triple loop over $i,j,k$ → $O(n^3)$ (slide 29).",
    tags: ["matrix-multiplication"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 29",
  },
  {
    ...meta,
    id: "l14-ms-mcq-eight",
    type: "mcq",
    difficulty: "easy",
    prompt:
      "Straightforward D&C matrix multiply uses how many half-size multiplications?",
    options: ["4", "6", "7", "8"],
    correctIndex: 3,
    explanation:
      "Each of $C_{11},C_{12},C_{21},C_{22}$ needs two products → 8 multiplies (slides 30–33).",
    tags: ["divide-and-conquer"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 33",
  },
  {
    ...meta,
    id: "l14-ms-cx-eight",
    type: "complexity",
    difficulty: "medium",
    format: "choice",
    prompt: "For $T(n)=8T(n/2)+O(n^2)$, Master Theorem / lecture bound?",
    options: ["$O(n^2)$", "$O(n^{\\log_2 7})$", "$O(n^3)$", "$O(n \\log n)$"],
    correctIndex: 2,
    explanation: "$\\Theta(n^{\\log_2 8})=\\Theta(n^3)$ — same order as naïve (slides 32–33).",
    tags: ["recurrence", "master-theorem"],
    sourceReference: "L14.Divide&Conquer.pptx, slides 32–33",
  },
  {
    ...meta,
    id: "l14-ms-mcq-seven",
    type: "mcq",
    difficulty: "easy",
    prompt: "Strassen reduces recursive multiplications to:",
    options: ["5", "6", "7", "8"],
    correctIndex: 2,
    explanation: "Strassen’s idea is seven recursive multiplications (slide 34).",
    tags: ["strassen"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 34",
  },
  {
    ...meta,
    id: "l14-ms-cx-strassen",
    type: "complexity",
    difficulty: "medium",
    format: "choice",
    prompt:
      "$T(n)=7T(n/2)+O(n^2)$ simplifies (lecture) to approximately:",
    options: [
      "$O(n^2)$",
      "$O(n^3)$",
      "$O(n^{\\log_2 7}) \\approx O(n^{2.8074})$",
      "$O(7^n)$",
    ],
    correctIndex: 2,
    explanation:
      "Slide 35: $O(n^{\\log_2 7})$ which is approximately $O(n^{2.8074})$.",
    tags: ["strassen", "complexity"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 35",
  },
  {
    ...meta,
    id: "l14-ms-multi-practice",
    type: "multi_select",
    difficulty: "hard",
    prompt:
      "Lecture reasons Strassen is often not preferred for practical applications:",
    options: [
      "Constants are high; naïve can win for typical sizes",
      "Sparse matrices have better specialized methods",
      "Recursive submatrices take extra space",
      "It asymptotically worse than $O(n^3)$",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Slide 35 lists high constants, sparse-matrix alternatives, extra space, and precision issues. Asymptotically Strassen is better than $O(n^3)$.",
    tags: ["strassen", "practice"],
    sourceReference: "L14.Divide&Conquer.pptx, slide 35",
  },
];
