import type { TopicNotes } from "@/features/notes";

export const binarySearchNotes: TopicNotes = {
  topicId: "binary-search",
  title: "Binary Search",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Binary search finds a target in a **sorted** array by looking at the middle element and discarding half the remaining range each time.

The key observation: in a sorted array, **only one half** can contain the target. That cuts the number of recursive calls to one — which is why the good version is logarithmic, not linear.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `**Input:** sorted array \`data\` of length $n$, and target $t$.

**Output:** index $i$ such that \`data[i] = t\`, or $-1$ if $t$ is not in the array.

Exhaustive search checks every value (worst case $O(n)$). Stopping early when \`data[i] > t\` does **not** improve the worst case.

Source: *L14.Divide&Conquer.pptx*, slides 15–19.`,
    },
    {
      id: "naive-vs-better",
      title: "Naïve vs better binary search",
      markdown: `**Naïve D&C idea:** split the array in half and search **each** half.

$$
T(n) = 2T(n/2) + \\Theta(1) = \\Theta(n)
$$

by the Master Theorem — no better than linear search.

**Better binary search:** because the array is sorted, search only the half that can contain $t$:

$$
T(n) = T(n/2) + \\Theta(1) = \\Theta(\\lg n)
$$

by the Master Theorem.`,
    },
    {
      id: "pseudocode",
      title: "Pseudocode",
      markdown: `Lecture implementation (tail recursive — no work after the recursive call):

\`\`\`text
BinarySearch(low, high):
    if low > high:
        return -1
    else:
        mid = (low + high) / 2
        if x == S[mid]:
            return mid
        else if x < S[mid]:
            return BinarySearch(low, mid - 1)
        else:
            return BinarySearch(mid + 1, high)
\`\`\`

When \`low > high\`, the search range is empty → return $-1$.`,
    },
    {
      id: "worked",
      title: "Worked example",
      markdown: `Search for $x = 18$ in a sorted array (lecture slide 18 walkthrough).

1. Compute \`mid = (low + high)/2\`.
2. Compare $x$ to \`S[mid]\`.
3. Shrink to the left half if $x$ is smaller, right half if larger.
4. Repeat until found or \`low > high\`.

Each comparison halves the remaining interval, so after $\\Theta(\\lg n)$ steps the range collapses.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `Correct (one-sided recurse) binary search:

$$
T(n) = T(n/2) + \\Theta(1) = \\Theta(\\lg n)
$$

The lecture writes $\\Theta(\\lg n)$ via the Master Theorem.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Searching **both** halves (naïve version) and still claiming $\\Theta(\\lg n)$.
- Forgetting the empty-range base case \`low > high → -1\`.
- Applying binary search to an **unsorted** array — the one-half observation fails.
- Writing mid incorrectly so the interval never shrinks (off-by-one bugs).`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Memorize \`mid = (low + high)/2\` and the \`low > high → -1\` base case.
- Contrast $2T(n/2)+\\Theta(1)=\\Theta(n)$ vs $T(n/2)+\\Theta(1)=\\Theta(\\lg n)$.
- Lecture calls the good version **tail recursive**.`,
    },
  ],
};
