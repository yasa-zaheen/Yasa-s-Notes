import type { TopicNotes } from "@/features/notes";

export const closestPairNotes: TopicNotes = {
  topicId: "closest-pair",
  title: "Closest Pair",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Given $n$ points in the plane, find the pair with minimum Euclidean distance. Brute force checks every pair in $O(n^2)$. Divide-and-conquer sorts by $x$, solves left and right halves, then carefully checks a thin **strip** around the dividing line — only a constant number of $y$-neighbors can beat the current best distance $d$.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `**Input:** set $P$ of $n$ points in the 2D plane.

**Output:** minimum distance between the closest pair (lecture also discusses returning the pair).

**Brute force:** for every pair $(p,q)$ update \`minDist\`. Time $O(n^2)$.

**Preprocessing:** sort by $x$-coordinate (and maintain a $y$-sorted view \`Py\` for later). Sorting costs $O(n \\log n)$.

Source: *L15.Divide&ConquerContinued.pptx*, slides 9–22.`,
    },
    {
      id: "divide",
      title: "Divide and recurse",
      markdown: `**Base case:** if $2 \\le n \\le 3$ (lecture also writes $n \\le 3$), solve by brute force.

**Divide:** take middle point $P[n/2]$ in the $x$-sorted array:

- $P_{\\mathrm{left}} = P[0..n/2]$
- $P_{\\mathrm{right}} = P[n/2+1..n-1]$

Recurse on both halves. Let $d_L$ and $d_R$ be the minimum distances found; set $d = \\min\\{d_L, d_R\\}$.

**Gap:** $d$ is not yet global — a closer pair may have one point on each side of the separating line.`,
    },
    {
      id: "strip",
      title: "The strip",
      markdown: `Build a **strip** of points whose $x$-coordinate is within distance $d$ of the middle vertical line (equivalently $|\\mathrm{point}.x - \\mathrm{mid}_x| < d$), taken from the $y$-sorted list \`Py\`.

Then run \`ClosestInStrip(Strip, d)\`: for each point, compare it with the **next 7** points in the strip (lecture loop \`j\` from $i+1$ to $\\min(i+7, \\mathrm{length})$).

Strip work is $O(n)$ — linear in the number of strip points.`,
    },
    {
      id: "proof",
      title: "Why ≤ 7 neighbors",
      markdown: `Lecture proof idea: no more than seven other points can be closer to a point $p$ than the current $d_{\\min}$ inside the $2d \\times d$ (style) strip region.

Divide the relevant rectangle into **eight congruent** rectangles of side at most $d/2$. Each small rectangle’s diagonal is

$$
\\sqrt{(d/2)^2 + (d/2)^2} < d
$$

so each small rectangle holds at most one point of interest. Hence only a constant number of candidates (lecture: compare next **7** points) need checking.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `Recurrence (after sorting):

$$
T(n) = 2T(n/2) + O(n)
$$

which solves to $O(n \\log n)$. Initial $x$/$y$ sorts are also $O(n \\log n)$.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Stopping after left/right recursion and skipping the strip — crossing pairs can be closer.
- Comparing every strip pair ($O(n^2)$) instead of the next-7 window.
- Forgetting the strip is ordered by **$y$**.
- Claiming the whole algorithm is $O(n)$ because the strip pass is linear — the recursion tree still costs $O(n \\log n)$.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Pre-sort by $x$; base case 2–3 points brute force.
- $d = \\min(d_L,d_R)$; strip within $d$ of midline; ≤7 $y$-neighbors.
- Recurrence $T(n)=2T(n/2)+O(n) \\Rightarrow O(n\\log n)$.`,
    },
  ],
};
