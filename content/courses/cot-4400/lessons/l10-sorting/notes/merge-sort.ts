import type { TopicNotes } from "@/features/notes";

export const mergeSortNotes: TopicNotes = {
  topicId: "merge-sort",
  title: "Merge Sort",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `MergeSort is the lecture’s first **fast** sorting algorithm. InsertionSort and SelectionSort are $O(n^2)$. MergeSort splits by **position**, sorts the halves recursively, and merges them.

Base case: an array of one element is already sorted.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `Description from the lecture:

1. Split the array into two halves.
2. Sort the half-arrays recursively.
3. Base case: one element.
4. Combine two sorted half-arrays into one sorted array.

Source: *L10.Sorting.pptx*, slides 8–13.`,
    },
    {
      id: "visual",
      title: "Visual example",
      markdown: `Split $[38, 27, 43, 3]$ into $L = [38, 27]$ and $R = [43, 3]$, then into singletons, then merge upward:

- merge $[38]$ and $[27]$ → $[27, 38]$
- merge $[43]$ and $[3]$ → $[3, 43]$
- merge $[27, 38]$ and $[3, 43]$ → $[3, 27, 38, 43]$`,
    },
    {
      id: "merging",
      title: "Merging",
      markdown: `Fill in the result **left-to-right**.

- The next value is $\\min(\\text{left head}, \\text{right head})$.
- After one array is empty, just append the other.
- Time to combine: $\\Theta(n)$. Better than $O(n^2)$.

This linear merge is why the recursion is worth it.`,
    },
    {
      id: "pseudocode",
      title: "Pseudocode",
      markdown: `Lecture structure:

- $2$ recursive calls
- input size is divided by $2$
- then a $\\Theta(n)$ merge

A standard recurrence matching that structure:

$$
T(n) = 2T(n/2) + \\Theta(n), \\quad T(1) = \\Theta(1)
$$`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `Each level of the recursion tree takes $O(n)$ to merge.

How many times do we merge? How many levels $L$ do we have?

$$
L = \\log n
$$

Complexity:

$$
O(n \\cdot L) = O(n \\log n)
$$

**Space (additional):** Merge Sort needs $\\Theta(n)$ auxiliary storage for the merged result. The lecture emphasizes the time bound; the extra array is the usual implementation cost. Marked as additional where the slides do not state a space bound.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Writing $T(n) = T(n/2) + \\Theta(n)$ (only one recursive call).
- Claiming Merge Sort is in-place like QuickSort. The lecture later contrasts: Quick Sort works in place; merge uses extra storage.
- Forgetting that merge itself is $\\Theta(n)$, not $\\Theta(1)$.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Recursion tree argument: $L = \\log n$ levels, $O(n)$ work each, product $O(n \\log n)$.
- Merge fills left-to-right from two sorted heads.
- Later lecture point: in Merge Sort the **combine** step does the work; the divide step does hardly anything.`,
    },
  ],
};
