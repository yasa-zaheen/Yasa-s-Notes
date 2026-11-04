import type { TopicNotes } from "@/features/notes";

export const bstNotes: TopicNotes = {
  topicId: "bst",
  title: "Binary Search Trees",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `A **binary search tree (BST)** is a non-linear, **recursive** linked data structure. Each node defines a BST (subtree). Each node has two children; use a NIL link if there is no left/right child.

Ordering invariant (lecture wording):

- All elements in the **left** subtree are **equal or smaller**.
- All elements in the **right** subtree are **equal or larger**.

Nodes also generally store a parent pointer (NIL for the root).`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `**Search($x$).** Binary search starting at \`Search(root, x)\`. Worst case: $h$ calls (height of the BST). $\\Theta(1)$ time per call → $\\Theta(h)$ total.

**Insert($x$).** Binary search; insert as root or call \`Insert(root, x)\`. $\\Theta(h)$ time.

**Delete($x$).** Binary search, then special cases depending on children:

1. **0 children:** delete.
2. **1 child:** replace with child.
3. **2 children:** find the **right subtree (RST) min**, then swap.

Worst-case analysis for delete: $\\Theta(h)$ to find $x$, $\\Theta(h)$ to find RST min → $\\Theta(h)$ total.

Source: *L12.DataStructures.pptx*, slides 26–28.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `**How tall are BSTs?**

| Case | Height |
| --- | --- |
| Best | $\\Theta(\\lg n)$ |
| Average | $\\Theta(\\lg n)$ |
| Worst | $\\Theta(n)$ |

**Balanced BSTs** (Red-Black, AVL, etc.) guarantee $\\Theta(\\lg n)$ height with constant overhead. Lecture: we are **not** covering balanced-BST details.

| Operation | BST | Balanced BST |
| --- | --- | --- |
| Search / Insert / Delete | $\\Theta(h)$ | $\\Theta(\\lg n)$ |
| Build | $\\Theta(n \\lg n)$ | $\\Theta(n \\lg n)$ |
| Min / Max / Pred / Succ | $\\Theta(h)$ | $\\Theta(\\lg n)$ |

Source: *L12.DataStructures.pptx*, slides 29–30.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Writing “left $<$ node $<$ right” and forgetting the lecture allows **equals** on a side (“equal or smaller / equal or larger”).
- For the 2-child delete case, inventing an arbitrary neighbor instead of the **RST min** (then swap).
- Claiming ordinary BSTs always run in $\\Theta(\\lg n)$. That is only best/average height — worst height is $\\Theta(n)$.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Memorize delete cases: 0 / 1 / 2 children, and **RST min** for two children.
- Height: best/avg $\\Theta(\\lg n)$, worst $\\Theta(n)$; ops are $\\Theta(h)$.
- Balanced BSTs exist to force $\\Theta(\\lg n)$ height — details not required.`,
    },
  ],
};
