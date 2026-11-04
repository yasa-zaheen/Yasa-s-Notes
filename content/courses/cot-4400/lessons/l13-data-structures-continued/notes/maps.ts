import type { TopicNotes } from "@/features/notes";

export const mapsNotes: TopicNotes = {
  topicId: "maps",
  title: "Maps",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `A **map** is an abstraction of a function.

Main operations:

- \`Insert(x, y)\`: declares that $f(x) = y$.
- \`Delete(x)\`: declares that $f(x)$ does not have a value.
- \`Search(x)\`: returns $y$ such that $f(x) = y$, or NIL if $f(x)$ has no value.

Example: **letter frequencies** — associate a count with each letter ($f(E) = 12$, etc.), used in cryptography.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `Two main implementations:

**Array-based map (direct map).** Array of all possible $x$ values. Stores $f(x)$ in \`arr[x]\` (NIL if not initialized). All main operations are constant time. **Only useful when the input domain is small.**

**Set-based map (a.k.a. hash map).** Set of ordered $(x, y)$ pairs, added/searched by $x$. Search returns the associated $y$. Time complexity determined by the hash table or balanced BST (BBST).

Source: *L13.DataStructuresContinued.pptx*, slides 23–24.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `$D$ = size of the domain ($x$ values). Starred entries are **expected** complexity for a hash table.

| Operation | Array-based | Set-based (hash) | Set-based (BBST) |
| --- | --- | --- | --- |
| Add($x$, $y$) / Delete($x$) / Insert($x$) | $\\Theta(1)$ | $\\Theta(1)^*$ | $O(\\lg n)$ |
| Build() | $\\Theta(D)$ | $\\Theta(n)$ | $O(n \\lg n)$ |

**Power of maps:** store values computed repeatedly (lookup table). Especially powerful with direct maps. Can improve **best-case** performance by caching problem instances → solutions; best-case analysis is not useful to compare algorithm quality.

Source: *L13.DataStructuresContinued.pptx*, slides 26–29.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Using an array-based map when the domain is huge — Build is $\\Theta(D)$, and space scales with $D$.
- Forgetting that hash-map $\\Theta(1)$ bounds are **expected**, not worst-case guarantees.
- Confusing map \`Insert(x, y)\` (associate value) with set \`Insert(x)\` (membership only).`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Operations: Insert($x$, $y$), Delete($x$), Search($x$).
- Array map: $\\Theta(1)$ ops, Build $\\Theta(D)$; only for small domains.
- Hash map: expected $\\Theta(1)$ for the main ops; Build $\\Theta(n)$.`,
    },
  ],
};
