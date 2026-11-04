import type { TopicNotes } from "@/features/notes";

export const priorityQueuesNotes: TopicNotes = {
  topicId: "priority-queues",
  title: "Priority Queues",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `A **priority queue** is an abstract data type for finding maxima or minima.

Main operations:

- \`Insert(x)\`: add a value.
- \`Max()\` / \`Min()\`: return the max/min value.
- \`DeleteMax()\` / \`DeleteMin()\`: delete and return the max/min.

Analogous to enqueue, dequeue, and peek — but ordered by priority (extremum), not arrival time.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `**Primary implementation: heap** — a complete binary tree with the heap property:

- **Max-heap:** every child has value $\\le$ its parent’s value. Consequence: root is the max.
- **Min-heap:** every child has value $\\ge$ its parent’s value. Consequence: root is the min.

Extra op: \`Heapify(arr)\` builds a heap from an unsorted array.

Source: *L13.DataStructuresContinued.pptx*, slide 30.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `Comparison of priority-queue implementations (lecture table):

| Operation | Heap | Unsorted array | Sorted array | Balanced BST |
| --- | --- | --- | --- | --- |
| Insert($x$) | $\\Theta(\\lg n)$ | $\\Theta(1)$ | $\\Theta(n)$ | $O(\\lg n)$ |
| Max() | $\\Theta(1)$ | $\\Theta(1)$ | $\\Theta(1)$ | $\\Theta(1)$ |
| DeleteMax() | $\\Theta(\\lg n)$ | $\\Theta(n)$ | $\\Theta(1)$ | $O(\\lg n)$ |
| Build / Heapify | $\\Theta(n)$ | $\\Theta(n)$ | $\\Theta(n \\lg n)$ | $\\Theta(n \\lg n)$ |

Lecture notes: BST has similar complexity but higher coefficients. A binary heap is optimized for retrieving the min or max in $O(1)$ time; other operations (search, predecessor, etc.) are inefficient ($O(n)$) due to the lack of total ordering. Min-max heaps and Fibonacci heaps are mentioned as more complex alternatives.

Source: *L13.DataStructuresContinued.pptx*, slides 38–39.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Treating a priority queue as a FIFO queue. Removal order is by **priority**, not insertion time.
- Expecting efficient arbitrary Search/Predecessor on a binary heap — lecture: those are not good ($O(n)$).
- Confusing the ADT (priority queue) with one implementation (heap).`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Name Insert, Max/Min, DeleteMax/DeleteMin.
- Heap property + complete binary tree ⇒ root is the extremum ⇒ Max/Min in $\\Theta(1)$.
- Heap Insert / DeleteMax are $\\Theta(\\lg n)$; Heapify/Build is $\\Theta(n)$.`,
    },
  ],
};
