import type { TopicNotes } from "@/features/notes";

export const dcExamplesNotes: TopicNotes = {
  topicId: "dc-examples",
  title: "Classic D&C Examples",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Classic divide-and-conquer problems share the same pattern: split into equal parts, recurse, then combine. Lecture exercises after binary search are **MergeSort**, **findMax**, and **natural-number exponentiation** by squaring.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `General strategy (lecture):

1. Divide the problem into equal parts
2. Solve subproblems recursively
3. Solve small instances directly
4. Combine solutions

**MergeSort** (as a D&C pattern): split the array in half → recursively sort each half → merge sorted arrays. Base case: $0$ or $1$ element.

$$
T(n) = 2T(n/2) + \\Theta(n) = \\Theta(n \\log n)
$$

Source: *L14.Divide&Conquer.pptx*, slides 11, 21–27.`,
    },
    {
      id: "find-max",
      title: "findMax(i, j)",
      markdown: `Find the maximum in \`list[i..j]\` by splitting the index range:

\`\`\`text
findMax(i, j, list):
    if i == j:
        return list[i]
    mid = (i + j) // 2
    left_max = findMax(i, mid, list)
    right_max = findMax(mid + 1, j, list)
    if left_max > right_max:
        return left_max
    else:
        return right_max
\`\`\`

Base case: a single index. Combine step: take the max of the two halves.`,
    },
    {
      id: "exponentiation",
      title: "Exponentiation by squaring",
      markdown: `Compute $a^n$ for real $a$ and nonnegative integer $n$.

Lecture algorithm **QuickPow**:

\`\`\`text
QuickPow(a, n):
    if n = 0:
        return 1
    t = QuickPow(a, ⌊n/2⌋)
    if n is even:
        return t²
    else:
        return a · t²
\`\`\`

Hint from lecture: focus on even $n$ first; handle odd $n$ with the extra factor of $a$.

Each recursive call halves the exponent, so the depth is $\\Theta(\\lg n)$ (supplementary tight reading of the recurrence; the slides emphasize the D&C structure).`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- For \`findMax\`, forgetting \`i == j\` and recursing forever.
- Computing $a^n$ by $n$ multiplications instead of squaring — that is linear in $n$, not D&C.
- For odd $n$, returning only $t^2$ and dropping the factor of $a$.
- Confusing MergeSort’s combine ($\\Theta(n)$ merge) with findMax’s combine ($\\Theta(1)$ comparison).`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Be ready to write \`findMax\` with mid-split and \`max\` combine.
- QuickPow: $n=0 \\rightarrow 1$; even $\\rightarrow t^2$; odd $\\rightarrow a \\cdot t^2$.
- MergeSort recurrence $T(n)=2T(n/2)+\\Theta(n)$ is the template for many later D&C analyses.`,
    },
  ],
};
