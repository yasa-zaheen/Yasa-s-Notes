import type { TopicNotes } from "@/features/notes";

export const insertionSortNotes: TopicNotes = {
  topicId: "insertion-sort",
  title: "Insertion Sort",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `InsertionSort iteratively **inserts the next value into a sorted array**.

Think of sorting cards in your hand: the left side is already sorted. You take the next card (the key) and slide larger cards one slot to the right until the key’s correct hole opens.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `Insertion Sort is an **in-place, comparison-based** sorting algorithm that builds the final sorted array one element at a time. It iteratively takes the next element and inserts it into its correct position within the sorted portion of the array.

Source: *L10.Sorting.pptx*, slide 6.`,
    },
    {
      id: "visual",
      title: "Visual example",
      markdown: `Start with $[5, 2, 4, 6, 1]$.

- $i = 1$, key $= 2$: shift $5$ right → $[2, 5, 4, 6, 1]$
- $i = 2$, key $= 4$: shift $5$ right → $[2, 4, 5, 6, 1]$
- $i = 3$, key $= 6$: already in place
- $i = 4$, key $= 1$: shift $6,5,4,2$ right → $[1, 2, 4, 5, 6]$`,
    },
    {
      id: "pseudocode",
      title: "Pseudocode",
      markdown: `\`\`\`text
InsertionSort(A):
    n = length of A
    for i = 1 to n - 1:
        key = A[i]
        j = i - 1
        while j >= 0 and A[j] > key:
            A[j + 1] = A[j]
            j = j - 1
        A[j + 1] = key
\`\`\`

The inner loop **shifts**, it does not swap the key on every comparison.`,
    },
    {
      id: "worked",
      title: "Worked example",
      markdown: `Best case: $A$ already sorted. The \`while\` test \`A[j] > key\` fails immediately for every $i$. One comparison per outer iteration, $\\Theta(n)$ time.

Worst case: reverse-sorted. Every key walks all the way to index $0$, producing about $n^2/2$ comparisons.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `**Time**

- Best case $O(n)$: occurs when the array is already sorted. Only one comparison is needed per element.
- Worst and average case $O(n^2)$: reverse order (worst) or randomly ordered (average). Each element must be compared with previous elements, leading to approximately $n^2/2$ comparisons.

**Space:** $O(1)$. Insertion Sort is in-place.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Writing best-case $O(n^2)$. That is Selection Sort, not Insertion Sort.
- Swapping the key on every step instead of shifting.
- Forgetting the inner loop also stops when it finds a value $\\le$ key (for this increasing-order version).`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- The lecture’s one-line summary is: *iteratively insert next value into sorted array*.
- Name the input that produces each bound: sorted → $O(n)$, reverse → $O(n^2)$.
- Contrast with Selection Sort: Insertion Sort **can** be linear; Selection Sort cannot.`,
    },
  ],
};
