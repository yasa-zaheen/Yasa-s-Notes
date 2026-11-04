import type { TopicNotes } from "@/features/notes";

export const convexHullNotes: TopicNotes = {
  topicId: "convex-hull",
  title: "Convex Hull",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `The **convex hull** of a point set is the smallest convex polygon containing every point — like wrapping a rubber band (or string around nails) around the outermost points. Those outermost points are the **extreme points** that become hull vertices.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `A set is **convex** if for any two points $p,q$ in the set, the entire segment $\\overline{pq}$ lies in the set.

A **convex hull** (convex envelope / closure) is the **smallest convex polygon** containing the given points.

An **extreme point** of a convex set is not the middle point of any segment with endpoints in the set (triangle → 3 vertices; circle → whole circumference).

Source: *L15.Divide&ConquerContinued.pptx*, slides 24–26.`,
    },
    {
      id: "brute",
      title: "Brute-force line test",
      markdown: `Segment $\\overline{p_i p_j}$ is on the hull boundary **iff** all other points lie on the **same side** of the line through $p_i$ and $p_j$.

Line through $(x_1,y_1),(x_2,y_2)$: $ax + by = c$ with

$$
a = y_2 - y_1,\\quad b = x_1 - x_2,\\quad c = x_1 y_2 - y_1 x_2
$$

Check the sign of $ax + by - c$ for all other points.

For each of $n(n-1)/2$ pairs, test $n-2$ points → $(n-2)\\cdot n(n-1)/2 = O(n^3)$.`,
    },
    {
      id: "dc",
      title: "Divide-and-conquer",
      markdown: `**Pre-process:** sort points by $x$-coordinate — $O(n \\log n)$.

**Divide:** split at median $x$ into left and right halves ($O(1)$ after sorting).

**Conquer:** recursively compute convex hulls of each half.

**Merge:** find **upper** and **lower tangents** connecting the two hulls, then combine exterior chains (\`MergeHulls\` / \`FindUpperTangent\` / \`FindLowerTangent\`). Merge is $O(n)$.

Base case: $n \\le 3$ (or 1–3 points) return the points themselves (ordered as needed).`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `$$
T(n) = 2T(n/2) + O(n)
$$

Master Theorem case with $\\log_b a = c = 1$ → $\\Theta(n \\log n)$. Plus the initial sort: overall $O(n \\log n)$.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Confusing “convex set” with “convex hull of a set.”
- Forgetting the same-side line test for the brute-force boundary edges.
- Skipping upper/lower tangents and concatenating hulls — that is not a correct merge.
- Quoting only $O(n^3)$ brute force and forgetting the $O(n\\log n)$ D&C.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Definition: smallest convex polygon containing the points; extreme points = vertices.
- Brute force $O(n^3)$ via same-side tests.
- D&C: sort by $x$, recurse left/right, merge via upper/lower tangents → $O(n\\log n)$.`,
    },
  ],
};
