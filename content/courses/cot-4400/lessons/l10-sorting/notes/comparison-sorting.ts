import type { TopicNotes } from "@/features/notes";

export const comparisonSortingNotes: TopicNotes = {
  topicId: "comparison-sorting",
  title: "Comparison-Based Sorting",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Everything discussed so far — SelectionSort, InsertionSort, BubbleSort, MergeSort, QuickSort — is a **comparison-based sorting (CBS)** algorithm: it operates by comparing pairs of elements.

Those algorithms are $O(n^2)$ or $O(n \\lg n)$. Is there a faster comparison-based sorting algorithm?

**No.** At least not comparison-based.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `Comparison-based sorting: sorting by comparing elements and swapping.

The proof idea is based on **execution paths** of the algorithm: the instructions executed for a given input (if statements, loop conditions, and so on).

- An execution path defines all comparisons and swaps.
- The execution path **must be different for different inputs** (different permutations).

Source: *L10.Sorting.pptx*, slides 31–37.`,
    },
    {
      id: "decision-tree",
      title: "Decision trees and permutations",
      markdown: `An array of size $n$ has $n!$ total permutations. That is the minimum number of execution paths needed to be correct: every permutation needs its own path.

Each comparison has **2 outcomes** (true or false). After $k$ comparisons the number of execution paths is at most $2^k$.`,
    },
    {
      id: "lower-bound",
      title: "The Ω(n lg n) lower bound",
      markdown: `Main idea:

- $n!$ permutations, so we need $\\ge n!$ execution paths.
- Every comparison doubles the number of potential execution paths.
- Execution paths $= 2^k$.
- Minimum comparisons: $2^k \\ge n!$, so $k = \\Omega(n \\lg n)$.

All CBS algorithms therefore require $\\Omega(n \\lg n)$ time to be correct.

Stirling’s approximation $n! \\ge (n/e)^n$ (additional detail used to finish the logarithm) gives

$$
k \\ge \\log_2(n!) \\ge n \\log_2 n - n \\log_2 e = \\Omega(n \\lg n).
$$`,
    },
    {
      id: "worked",
      title: "Worked example",
      markdown: `For $n = 3$ there are $3! = 6$ permutations. A comparison tree must isolate all six leaves. Height $k$ must satisfy $2^k \\ge 6$, so $k \\ge 3$. You cannot sort three arbitrary items with only two pairwise comparisons in the worst case.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Writing $2^k \\ge n$ instead of $2^k \\ge n!$. The $n$ bound is the counterfeit-coin problem, not CBS.
- Claiming radix/counting sort contradict the bound. They are **not** comparison-based; the lecture’s “No!” applies to CBS only.
- Using $\\log_{10}$ or forgetting that $k = \\log_2(n!)$.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Quote the chain: $n!$ paths, $2^k$ paths after $k$ comparisons, $2^k \\ge n! \\Rightarrow k = \\Omega(n \\lg n)$.
- Name the algorithms covered: SelectionSort, InsertionSort, MergeSort, QuickSort (BubbleSort as well).
- The bound is **worst-case minimum comparisons**, not a claim about average-case programming-language speed.`,
    },
  ],
};
