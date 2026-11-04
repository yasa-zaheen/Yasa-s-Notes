import type { TopicNotes } from "@/features/notes";

export const stacksQueuesNotes: TopicNotes = {
  topicId: "stacks-queues",
  title: "Stacks & Queues",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Stacks and queues are **abstract data structures**: they define a set of operations and are generally implemented as arrays.

- **Stacks:** \`push()\` and \`pop()\`. **Last-In, First-Out (LIFO)**. Clears out “new” work quickly.
- **Queues:** \`enqueue()\` and \`dequeue()\`. **First-In, First-Out (FIFO)**. More “fair”: delay between enqueue and dequeue is balanced.
- **Deques** (pronounced “decks”): support all four operations.

Choice of stack vs. queue changes the order elements are removed. They do **not** support random access.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `**Array implementation (lecture).**

- Stack: add/remove from the end.
- Queue: add to the end, remove from the front.
- \`capacity\`: allocated array size — increase when the array is full.
- \`size\`: number of elements / used capacity — increase when adding.

**Array enlargement policy** (amortized analysis):

| Policy | Cost pattern | Average cost per push |
| --- | --- | --- |
| Bad: increment by $1$ | $\\Theta(n)$ every time | $O(n)$ |
| Better: increment by $k$ | $\\Theta(n)$ every $k$th time | depends on $k$ (space trade-off) |
| Best: **double** array size | $\\Theta(n)$ after powers of two | $\\Theta(1)$ amortized |

Doubling: the array will be at least half-full if not deleting. Caution on huge increments: small stacks may be mostly empty space.

Source: *L12.DataStructures.pptx*, slides 9–15.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `| Operation | Stack | Queue | Deque |
| --- | --- | --- | --- |
| Push($x$) | $\\Theta(1)$, amort. | n/a | $\\Theta(1)$, amort. |
| Pop() | $\\Theta(1)$ | n/a | $\\Theta(1)$ |
| Enqueue() | n/a | $\\Theta(1)$, amort. | $\\Theta(1)$, amort. |
| Dequeue() | n/a | $\\Theta(1)$ | $\\Theta(1)$ |
| Build | $\\Theta(n)$ | $\\Theta(n)$ | $\\Theta(n)$ |

- \`push\` / \`enqueue\`: if \`capacity > size\`, just add; otherwise enlarge first → $\\Theta(1)$ amortized.
- \`pop\`: remove last element → $\\Theta(1)$.
- \`dequeue\`: advance the “head” pointer → $\\Theta(1)$.

All operations are (amortized) constant-time.`,
    },
    {
      id: "worked",
      title: "Worked example — postfix",
      markdown: `In **postfix** expressions, operators appear after the values they affect.

- \`5 7 +\` means $5 + 7 = 12$.
- Operators combine the **last two numbers** into a value.

Lecture traces:

- \`6 1 - 7 +\` $= \`5 7 +\` $= 12$
- \`6 1 7 - +\` $= \`6 -6 +\` $= 0$

A **stack** is the right structure: push numbers; on an operator, pop two values, combine, push the result.

Source: *L12.DataStructures.pptx*, slides 16–21.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Claiming every \`push\` is always $\\Theta(1)$ even under a $+1$ enlargement policy. Bad policy makes average cost $O(n)$.
- Using a queue for postfix. Operators need the **last** two values → LIFO / stack.
- Saying stacks/queues support random access. Lecture: they do not.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Memorize LIFO vs. FIFO and the summary table (amortized $\\Theta(1)$ push/enqueue; $\\Theta(1)$ pop/dequeue).
- Doubling is the **best** enlargement policy for $\\Theta(1)$ amortized push.
- Postfix: stack; walk an example like \`6 1 7 - +\` to $0$.`,
    },
  ],
};
