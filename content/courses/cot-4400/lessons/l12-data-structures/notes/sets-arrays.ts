import type { TopicNotes } from "@/features/notes";

export const setsArraysNotes: TopicNotes = {
  topicId: "sets-arrays",
  title: "Array-Based Sets",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `A **set** (or dictionary) is an abstract data type for storing and retrieving values. Multiple valid implementations exist.

Primary operations:

- \`Search(x)\`: location of $x$, or NIL if not contained.
- \`Insert(x)\`: add $x$.
- \`Delete(x)\`: remove $x$.

Additional: \`Build(data)\`, \`Max()\`, \`Min()\`, \`Successor(x)\`, \`Predecessor(x)\`.

Arrays give two natural implementations: **unsorted** (fast insert/delete, slow search) vs. **sorted** (fast search / extrema / neighbors, slow insert/delete).`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `Lecture observations for array-based sets:

- Search is much faster in sorted (binary search) than unsorted (linear search).
- Inserting and deleting are much faster in unsorted.
  - Insertion: double capacity as needed.
  - Deletion: swap the element to the end and decrement size.
- Processing after sorting an array is much faster than processing elements one-by-one.
- Arrays are not used frequently for sets; linked lists are even worse (search and insert take $O(n)$).

Source: *L12.DataStructures.pptx*, slides 23–25.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `| Operation | Unsorted array | Sorted array |
| --- | --- | --- |
| Search($x$) | $\\Theta(n)$ | $\\Theta(\\lg n)$ |
| Delete($x$) | $\\Theta(1)$ | $\\Theta(n)$ |
| Insert($x$) | $\\Theta(1)$, amortized | $\\Theta(n)$ |
| Build | n/a | $\\Theta(n \\lg n)$ |
| Min() / Max() | $\\Theta(n)$ | $\\Theta(1)$ |
| Predecessor($x$) / Successor($x$) | $\\Theta(n)$ | $\\Theta(1)$ |

Unsorted delete is $\\Theta(1)$ because you can swap-to-end and shrink; sorted delete must shift to keep order.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Claiming unsorted \`Delete\` is $\\Theta(n)$ because of “finding” — after \`Search\` finds the index, the lecture’s delete itself is $\\Theta(1)$ via swap-to-end.
- Forgetting sorted \`Build\` costs $\\Theta(n \\lg n)$ (sort).
- Assuming sorted insert is $\\Theta(\\lg n)$ like binary search. Finding the spot is logarithmic; shifting elements is $\\Theta(n)$.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Know the full comparison table cold — especially Search vs. Insert/Delete trade-off.
- Sorted array: Min/Max/Pred/Succ are $\\Theta(1)$; unsorted they are $\\Theta(n)$.
- Phrase the trade-off: sorted accelerates search; unsorted accelerates insert/delete.`,
    },
  ],
};
