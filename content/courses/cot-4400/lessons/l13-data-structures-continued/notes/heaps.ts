import type { TopicNotes } from "@/features/notes";

export const heapsNotes: TopicNotes = {
  topicId: "heaps",
  title: "Heap Implementation",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Heaps are implemented as **arrays**. Because a heap is a **complete** binary tree, the array has no “gaps.”

Indexing (1-based, as in lecture):

- Root at index $1$.
- Children of element $i$ at $2i$ and $2i+1$.
- Parent at $\\lfloor i/2 \\rfloor$.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `Descriptions assume a **max-heap**.

**Insert($x$).** Append to the array. Swap with parents until the parent is larger (or at the root) — percolate up. $\\Theta(\\lg n)$ time.

**Max().** Return the root. $\\Theta(1)$ time.

**DeleteMax().** Swap max with the last element and call \`PercolateDown(1)\` (also called sift-down). $\\Theta(\\lg n)$ time.

**PercolateDown($i$).** If \`heap[i]\` is smaller than its max child, swap; repeat until it is larger than its max child or is a leaf. If $i$ has children, then $2i \\le n$. Let \`mc\` hold the child to compare; update \`mc\` to the greater child when \`heap[mc+1] > heap[mc]\`.

**Heapify().** Call \`PercolateDown(i)\` from end to beginning — iterate backward from $\\lfloor n/2 \\rfloor$ to $1$, because nodes beyond $n/2$ are leaves and already satisfy the heap property. $\\Theta(n)$ time total (not $O(n \\lg n)$: most percolate calls do not reach full depth).

Source: *L13.DataStructuresContinued.pptx*, slides 31–36.`,
    },
    {
      id: "worked",
      title: "Worked example — HeapSort exercise",
      markdown: `Lecture exercise: draw the max heap built from $\\{8, 4, 6, 9, 2, 7, 1\\}$, then show the heap at the end of every iteration of the for-loop in HeapSort.

Sample beginning heap (tree / array view from the solution slides): root $9$, then $8, 7, 4, 2, 6, 1$.

After successive DeleteMax-style HeapSort iterations the sorted suffix grows: e.g. after iter 1 the max $9$ sits at the end; later iterations place $8, 7, \\ldots$ until the array is sorted.

Source: *L13.DataStructuresContinued.pptx*, slides 42–44.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `| Operation | Time |
| --- | --- |
| Insert (percolate up) | $\\Theta(\\lg n)$ |
| Max | $\\Theta(1)$ |
| DeleteMax + PercolateDown | $\\Theta(\\lg n)$ |
| Heapify | $\\Theta(n)$ |

Naïve Heapify bound $O(n \\lg n)$ ( $n/2$ calls × $O(\\lg n)$ ) is loose; lecture: most calls do not reach full depth → $\\Theta(n)$.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Storing the root at index $0$ when following this lecture’s indexing ($1$-based: children $2i$, $2i+1$).
- Claiming Heapify is $\\Theta(n \\lg n)$ — lecture emphasizes the tighter $\\Theta(n)$ analysis.
- Forgetting to swap max with the **last** element before PercolateDown on DeleteMax.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Memorize indices: root $1$, children $2i$ / $2i+1$, parent $\\lfloor i/2 \\rfloor$.
- Insert = append + percolate up; DeleteMax = swap with last + PercolateDown($1$).
- Heapify from $\\lfloor n/2 \\rfloor$ down to $1$ in $\\Theta(n)$.
- Be ready to draw a small max-heap / HeapSort trace like $\\{8,4,6,9,2,7,1\\}$.`,
    },
  ],
};
