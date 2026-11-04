import type { TopicNotes } from "@/features/notes";

export const quickSortNotes: TopicNotes = {
  topicId: "quick-sort",
  title: "Quick Sort",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `QuickSort is another $n \\log n$ sorting algorithm, but it splits the dataset according to **value**, not **position**.

- “Small half”: less than some value
- “Large half”: larger than some value
- **Pivot:** the value used to split the dataset

Equal values can go on either side.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `Lecture pseudocode outline:

1. Select a pivot. Naïve strategy: pick the first element.
2. Start at the left and right ends of the array.
3. Swap values larger than the pivot to the RHS.
4. Swap values smaller than the pivot to the LHS.
5. Insert the pivot where the two halves meet.
6. Recursively sort each half.
7. Base case: arrays with $0$ or $1$ elements are sorted.

Source: *L10.Sorting.pptx*, slides 15–29.`,
    },
    {
      id: "partition",
      title: "Partition",
      markdown: `**Problem:** partition the array $S$ for Quicksort.

The lecture’s partition uses the **first item as the pivot item**. Whenever an item is found to be less than the pivot item, it is moved to the left side of the array.

- $i$ has the item currently compared
- $j$ has the information about where the pivot should be placed

\`\`\`text
void partition(int low, int high, int pivotpoint) {
    int i;
    int j = low;
    keytype pivotitem = S[low];        // first item is pivot item
    for (i = low + 1; i <= high; i++) {
        if (pivotitem > S[i]) {
            j++;
            exchange S[i] and S[j];
        }
    }
    pivotpoint = j;
    exchange S[low] and S[pivotpoint]; // put pivotitem at pivotpoint
}
\`\`\`

The time for a given recursive call on an $n$-element subarray is $\\Theta(n)$.`,
    },
    {
      id: "pseudocode",
      title: "Quicksort pseudocode",
      markdown: `\`\`\`text
quicksort(int low, int high, Array array) {
    if (low > high) { return }
    pivotElementIndex = low
    pivotUpdatedIndex = partition(array, pivotElementIndex)
    quicksort(low, pivotUpdatedIndex, array)
    quicksort(pivotUpdatedIndex + 1, high, array)
}
\`\`\`

After partition, the pivot sits in its **final sorted index**.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `Choose pivot (different strategies) $+\\,\\Theta(1)$. Swap / partition $+\\,\\Theta(n)$. Then recurse on both sides.

$$
T(n) = T(L) + T(R) + \\Theta(n)
$$

The recursion **depends on the pivot**.

**Worst case.** The pivot chosen by partition is always the smallest or the largest element:

$$
T(n) = T(n-1) + \\Theta(n) \\Rightarrow O(n^2)
$$

Unrolling:

$$
cn + c(n-1) + c(n-2) + \\cdots + 2c = c\\big((n+1)(n/2) - 1\\big)
$$

**Best case.** Partitions are as evenly balanced as possible; each partition has at most $n/2$ elements:

$$
T(n) = 2T(n/2) + \\Theta(n) \\Rightarrow \\Omega(n \\lg n)
$$

**Average case.** $\\Theta(n \\log n)$. Selecting the pivot randomly makes a badly unbalanced split unlikely.`,
    },
    {
      id: "vs-merge",
      title: "Quicksort vs Merge Sort",
      markdown: `- Merge Sort: the divide step does hardly anything; all the real work happens in the combine (merge) step.
- Quick Sort: the divide step does the work and the combine step does nothing. Quick Sort works **in place**.
- Worst case $W(t) = \\Theta(n^2)$, average $A(t) = \\Theta(n \\log n)$.

Why use Quicksort when Merge Sort is at least as good? The constant factor hidden in the big-Θ notation for Quicksort is quite good. **In practice, Quicksort outperforms Merge Sort**, and it significantly outperforms Selection Sort and Insertion Sort.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Always writing $O(n \\log n)$ without the worst-case $O(n^2)$ caveat.
- Recursing on ranges that still include the pivot (infinite loop / duplicated pivot work).
- Claiming Quicksort’s extra space is $\\Theta(n)$ like Merge Sort. The lecture stresses that it works in place (recursion stack is a separate, usually $O(\\log n)$ average / $O(n)$ worst detail; treat stack depth as additional unless a question asks).`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Know $T(n) = T(L)+T(R)+\\Theta(n)$ and both specializations.
- Naïve pivot = first element. Sorted or reverse-sorted input is a classic worst case for that strategy.
- Be able to trace partition: items less than the pivot migrate left; then swap the pivot into index $j$.`,
    },
  ],
};
