import type { TopicNotes } from "@/features/notes";

export const selectionSortNotes: TopicNotes = {
  topicId: "selection-sort",
  title: "Selection Sort",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `SelectionSort iteratively **swaps the minimum into the next spot**.

On pass $i$, the prefix $A[0..i-1]$ is already in its final sorted position. The algorithm scans the remaining unsorted suffix, finds the smallest remaining value, and swaps it into index $i$.

Unlike Insertion Sort, that prefix is not merely sorted relative to itself — those values will never move again.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `Selection Sort is an **in-place comparison sorting algorithm** that iteratively selects the minimum element from an unsorted portion of the list and swaps it into its correct position.

Source: *L10.Sorting.pptx*, slides 4–5.`,
    },
    {
      id: "visual",
      title: "Visual example",
      markdown: `Trace $A = [7, 3, 5, 1, 9]$.

1. Unsorted region $[7, 3, 5, 1, 9]$. Minimum is $1$ at index $3$. Swap with index $0$ → $[1, 3, 5, 7, 9]$.
2. Unsorted region $[3, 5, 7, 9]$. Minimum is already at the front. No effective change.
3. Remaining passes find that each next prefix element is already the minimum of what remains.

After the first outer-loop iteration the array is $[1, 3, 5, 7, 9]$ because $1$ was swapped with $7$. The later values happened to already be in order after that swap — do not assume that is typical.`,
    },
    {
      id: "pseudocode",
      title: "Pseudocode",
      markdown: `\`\`\`text
SelectionSort(A):
    n = length of A
    for i = 0 to n - 1:
        min_index = i
        for j = i + 1 to n - 1:
            if A[j] < A[min_index]:
                min_index = j
        swap A[i] and A[min_index]
\`\`\`

The inner loop **always** walks the entire suffix. There is no early-exit flag.`,
    },
    {
      id: "worked",
      title: "Worked example",
      markdown: `Array $[64, 25, 12, 22, 11]$, $n = 5$.

| $i$ | Suffix scanned | min_index value | After swap |
| --- | --- | --- | --- |
| 0 | 64, 25, 12, 22, 11 | 11 | $[11, 25, 12, 22, 64]$ |
| 1 | 25, 12, 22, 64 | 12 | $[11, 12, 25, 22, 64]$ |
| 2 | 25, 22, 64 | 22 | $[11, 12, 22, 25, 64]$ |
| 3 | 25, 64 | 25 | $[11, 12, 22, 25, 64]$ |
| 4 | 64 | 64 | $[11, 12, 22, 25, 64]$ |`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `The algorithm **always** performs

$$
(n-1) + (n-2) + \\cdots + 1 = \\frac{n(n-1)}{2}
$$

comparisons, **regardless of the input array's initial order**. Best, average, and worst case are therefore all $\\Theta(n^2)$ (the lecture writes $O(n^2)$).

**Space:** Selection Sort is in-place. It needs only a constant amount of extra memory beyond the input array: $O(1)$.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Claiming a sorted array makes Selection Sort linear. The inner scan still runs in full.
- Confusing “sorted prefix” with Insertion Sort’s prefix. In Selection Sort the prefix is in **final** position.
- Counting only swaps. The quadratic cost is the **comparisons**, not the $O(n)$ swaps.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Memorize the comparison count $\\frac{n(n-1)}{2}$, not just “$O(n^2)$”.
- Be ready to hand-trace one outer iteration: find min in the suffix, then swap once.
- Space is $O(1)$. Do not write $O(n)$ extra space.`,
    },
  ],
};
