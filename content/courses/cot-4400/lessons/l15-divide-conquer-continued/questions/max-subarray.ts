import type { Question } from "@/features/questions";

const meta = {
  courseId: "cot-4400",
  lessonId: "l15-divide-conquer-continued",
  topicId: "max-subarray",
} as const;

export const maxSubarrayQuestions: Question[] = [
  {
    ...meta,
    id: "l15-ms-mcq-goal",
    type: "mcq",
    difficulty: "easy",
    prompt: "Maximum subarray sum seeks:",
    options: [
      "A contiguous subarray with maximum sum",
      "Any subsequence ignoring contiguity",
      "The median element only",
      "A permutation that sorts the array",
    ],
    correctIndex: 0,
    explanation:
      "Slides 41/43: maximum contiguous subarray sum (indices giving that sum).",
    tags: ["definition"],
    sourceReference: "L15.Divide&ConquerContinued.pptx, slides 41, 43",
  },
  {
    ...meta,
    id: "l15-ms-mcq-three",
    type: "mcq",
    difficulty: "easy",
    prompt: "D&C max-subarray compares which three candidates?",
    options: [
      "Best left, best right, and best crossing",
      "Best left only",
      "MST, shortest paths, and Huffman",
      "Upper tangent, lower tangent, and strip",
    ],
    correctIndex: 0,
    explanation:
      "Left-only, right-only, and crossing (slides 44–46, 50).",
    tags: ["divide-and-conquer"],
    sourceReference: "L15.Divide&ConquerContinued.pptx, slides 44–46",
  },
  {
    ...meta,
    id: "l15-ms-mcq-crossing",
    type: "mcq",
    difficulty: "medium",
    prompt: "A crossing maximum is formed by:",
    options: [
      "Best sum ending at mid plus best sum starting after mid",
      "Sorting both halves then merging",
      "Multiplying left and right sums",
      "Taking only the middle element",
    ],
    correctIndex: 0,
    explanation:
      "Crossing sides are computed separately then added (slides 47–49).",
    tags: ["crossing"],
    sourceReference: "L15.Divide&ConquerContinued.pptx, slides 47–49",
  },
  {
    ...meta,
    id: "l15-ms-mcq-not-enough",
    type: "mcq",
    difficulty: "easy",
    prompt:
      "After recursive left/right solves, is $\\max(\\mathrm{left},\\mathrm{right})$ enough?",
    options: [
      "No — crossing subarrays must be handled",
      "Yes — crossing cannot improve the answer",
      "Yes — if the array is sorted",
      "No — you must run Strassen next",
    ],
    correctIndex: 0,
    explanation: "Slide 44–46: “Just take the max from either half?” — crossing is TODO.",
    tags: ["crossing"],
    sourceReference: "L15.Divide&ConquerContinued.pptx, slides 44–46",
  },
  {
    ...meta,
    id: "l15-ms-cx",
    type: "complexity",
    difficulty: "medium",
    format: "choice",
    prompt:
      "With linear crossing work, $T(n)=2T(n/2)+\\Theta(n)$. Master Theorem gives:",
    options: ["$\\Theta(n)$", "$\\Theta(n \\log n)$", "$\\Theta(n^2)$", "$\\Theta(2^n)$"],
    correctIndex: 1,
    explanation: "Slide 51: Master Theorem on that recurrence → $\\Theta(n\\log n)$.",
    tags: ["complexity", "master-theorem"],
    sourceReference: "L15.Divide&ConquerContinued.pptx, slide 51",
  },
  {
    ...meta,
    id: "l15-ms-multi",
    type: "multi_select",
    difficulty: "medium",
    prompt: "Select correct lecture claims about max subarray D&C.",
    options: [
      "Split the array in half",
      "Crossing left and right contributions can be computed separately",
      "Combine compares left, right, and span results",
      "The combine step is $O(1)$ with no scans",
    ],
    correctIndices: [0, 1, 2],
    explanation:
      "Split + separate crossing scans + max of three. Combine uses two linear-style loops, not $O(1)$ only.",
    tags: ["max-subarray"],
    sourceReference: "L15.Divide&ConquerContinued.pptx, slides 44–51",
  },
  {
    ...meta,
    id: "l15-ms-mcq-scan-dir",
    type: "mcq",
    difficulty: "medium",
    prompt:
      "To get the best contribution on the left of mid, the lecture idea is to:",
    options: [
      "Iterate with indices decreasing from mid and track the maximum sum",
      "Only look at index 0",
      "Sort the left half by value",
      "Apply binary search for the minimum",
    ],
    correctIndex: 0,
    explanation:
      "Slides 48–49: scan decreasing on one side and increasing on the other to find best halves of a crossing sum.",
    tags: ["crossing"],
    sourceReference: "L15.Divide&ConquerContinued.pptx, slides 48–49",
  },
  {
    ...meta,
    id: "l15-ms-mcq-return",
    type: "mcq",
    difficulty: "easy",
    prompt: "Lecture \`MaxSubarraySum\` returns an array describing:",
    options: [
      "Start index, end index, and sum",
      "Only the midpoint",
      "Seven Strassen products",
      "A full sorted copy of $A$",
    ],
    correctIndex: 0,
    explanation:
      "Slide 52 comment: returns length-three array — start, end, sum.",
    tags: ["pseudocode"],
    sourceReference: "L15.Divide&ConquerContinued.pptx, slide 52",
  },
  {
    ...meta,
    id: "l15-ms-cx-combine",
    type: "complexity",
    difficulty: "hard",
    format: "choice",
    prompt:
      "Crossing work is two scans over the halves then a constant comparison. That non-recursive work is:",
    options: ["$\\Theta(1)$", "$\\Theta(\\log n)$", "$\\Theta(n)$", "$\\Theta(n^2)$"],
    correctIndex: 2,
    explanation:
      "Slide 51: two separate loops then constant comparison → linear combine, hence $+\\Theta(n)$ in the recurrence. Supplementary emphasis on naming the combine cost.",
    tags: ["complexity", "supplementary"],
    sourceReference: "L15.Divide&ConquerContinued.pptx, slide 51",
  },
];
