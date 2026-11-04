import type { TopicNotes } from "@/features/notes";

export const maxSubarrayNotes: TopicNotes = {
  topicId: "max-subarray",
  title: "Maximum Subarray Sum",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Given an array of integers (positive and negative), find a **contiguous** subarray whose sum is maximized. Brute force tries many subarrays. Divide-and-conquer splits the array, solves left and right recursively, then handles subarrays that **cross** the midpoint by combining the best left-ending sum with the best right-starting sum.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `**Problem:** find indices giving the maximum contiguous subarray sum.

Brute force nested loops over start/end (or start + running sum) check many subarrays. Lecture asks: how many subarrays? Keeping partial sums, the straightforward algorithm can take quadratic time.

Source: *L15.Divide&ConquerContinued.pptx*, slides 40–52.`,
    },
    {
      id: "dc-structure",
      title: "Divide-and-conquer structure",
      markdown: `1. Split the array in half at \`mid\`
2. Recursively solve left and right
3. Conquer by taking the max among:
   - best subarray entirely in the left half
   - best entirely in the right half
   - best **crossing** subarray

Just taking $\\max(\\mathrm{left},\\mathrm{right})$ is **not** enough — crossing must be handled.`,
    },
    {
      id: "crossing",
      title: "Crossing subarrays",
      markdown: `A crossing optimum is the sum of:

- the best sum of a subarray **ending at mid** (scan leftward from mid), plus
- the best sum of a subarray **starting just after mid** (scan rightward from mid+1)

The two sides do not interfere — compute them **separately**, each in linear time over that half, then add.

Overall combine step: two $O(n)$-style scans then a constant-time comparison of left, right, and span results.`,
    },
    {
      id: "pseudocode",
      title: "Pseudocode sketch",
      markdown: `Lecture returns \`[start, end, sum]\`:

\`\`\`text
MaxSubarraySum(A, left, right):
    mid = left + (right - left) / 2
    LeftResult  = MaxSubarraySum(A, left, mid)
    RightResult = MaxSubarraySum(A, mid + 1, right)
    // spanning: best rightward from mid+1, best leftward from mid
    SpanResult = [bestLeftInd, bestRightInd, leftSum + rightSum]
    return max of LeftResult, RightResult, SpanResult
\`\`\``,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `$$
T(n) = 2T(n/2) + \\Theta(n)
$$

Master Theorem → $\\Theta(n \\log n)$ (lecture: Master Theorem on this recurrence after noting the linear crossing work).`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Ignoring crossing subarrays.
- Thinking the crossing scan is $O(n^2)$ — each side is one linear pass.
- Confusing contiguous max-sum with subsequence (non-contiguous) problems.
- Writing $T(n)=2T(n/2)+\\Theta(1)$ and claiming linear time.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Three candidates: left, right, crossing.
- Crossing = best suffix of left half + best prefix of right half.
- $T(n)=2T(n/2)+\\Theta(n) \\Rightarrow \\Theta(n\\log n)$ by Master Theorem.`,
    },
  ],
};
