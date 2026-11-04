import type { TopicNotes } from "@/features/notes";

export const bubbleSortNotes: TopicNotes = {
  topicId: "bubble-sort",
  title: "Bubble Sort",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `BubbleSort **swaps consecutive elements that are out of order** and **repeats until no swaps occur**.

Large values “bubble” toward the right. After pass $i$, the largest $i$ items are in their final positions at the end of the array.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until no swaps are needed, which indicates that the list is sorted.

Source: *L10.Sorting.pptx*, slides 4 and 7. The lecture version includes the \`swapped\` early-exit flag.`,
    },
    {
      id: "visual",
      title: "Visual example",
      markdown: `Array $[4, 3, 5, 2]$.

Pass $i = 0$:

- compare $4,3$ → swap → $[3, 4, 5, 2]$
- compare $4,5$ → no swap
- compare $5,2$ → swap → $[3, 4, 2, 5]$

$5$ is now in final position. Later passes only need to look at the shrinking unsorted prefix.`,
    },
    {
      id: "pseudocode",
      title: "Pseudocode",
      markdown: `\`\`\`text
BubbleSort(A):
    n = length of A
    for i = 0 to n - 1:
        swapped = False
        for j = 0 to n - i - 2:
            if A[j] > A[j + 1]:
                swap A[j] and A[j + 1]
                swapped = True
        if not swapped:
            break
\`\`\`

The inner bound $n - i - 2$ skips the suffix that is already in final position.`,
    },
    {
      id: "worked",
      title: "Worked example",
      markdown: `Already-sorted input $[1, 2, 3, 4]$: the first pass performs $3$ adjacent comparisons, never sets \`swapped\`, and breaks. That is the $O(n)$ best case.

Reverse-sorted input performs about $n(n-1)/2$ comparisons and never triggers early exit until the end.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `**Time**

- Best case $O(n)$: occurs when the array is already sorted (early termination).
- Worst and average case $O(n^2)$: reverse order or randomly ordered. Requires $n(n-1)/2$ comparisons.

**Space:** $O(1)$, in-place.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Forgetting the lecture’s \`swapped\` break, then claiming best case $O(n^2)$.
- Inner loop running to $n-1$ on every pass (wastes comparisons on the already-bubbled suffix).
- Thinking Bubble Sort is $O(n \\log n)$. It is not.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Review line from the lecture: *swap consecutive elements that are out of order; repeat until no swaps occur*.
- If the question shows the optimized flag, best case is $O(n)$.
- Comparison count in the unoptimized / worst case is the same triangular number as Selection Sort: $n(n-1)/2$.`,
    },
  ],
};
