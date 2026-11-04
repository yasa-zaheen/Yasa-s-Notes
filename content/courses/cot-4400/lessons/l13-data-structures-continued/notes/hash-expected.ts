import type { TopicNotes } from "@/features/notes";

export const hashExpectedNotes: TopicNotes = {
  topicId: "hash-expected",
  title: "Hash Tables Expected Case",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Lesson 12 left hash tables looking **awful** in the worst case. Lecture question: why would anyone ever use a hash table?

Answer: **bad worst-case complexity but great expected-case complexity.**

Udi Manber (quoted on the slide): “The three most important techniques are hashing, hashing, and hashing.”`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `**Expected-case assumptions** (lecture):

- Hash function produces $\\Theta(1)$ collisions.
- Each inserted value has $\\Theta(1)$ duplicates.

Under those assumptions, hashing and scanning take $\\Theta(1)$ time for Search, Insert, and Delete.

Source: *L13.DataStructuresContinued.pptx*, slide 21.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `Expected-case table (separate chaining and open addressing):

| Operation | Separate chaining | Open addressing |
| --- | --- | --- |
| Search($x$) | $\\Theta(1)$ | $\\Theta(1)$ |
| Delete($x$) | $\\Theta(1)$ | $\\Theta(1)$ |
| Insert($x$) | $\\Theta(1)$ | $\\Theta(1)$ |
| Build | $O(n)$ | $O(n)$ |
| Resize | $\\Theta(1)$, amortized | $\\Theta(1)$, amortized |
| Min / Max / Pred / Succ | $O(n)$ | $O(n)$ |

Lecture reaction: “This is amazing!”

Contrast with balanced BST Search/Insert/Delete at $O(\\lg n)$ — hashing wins on the primary ops in expectation, but order statistics (Min, Max, Pred, Succ) remain linear.

Source: *L13.DataStructuresContinued.pptx*, slide 22.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Quoting only the L12 worst-case $O(n)$ table and concluding hash tables are useless.
- Forgetting the assumptions: $\\Theta(1)$ collisions and $\\Theta(1)$ duplicates.
- Claiming Min/Max become $\\Theta(1)$ under hashing — expected table still lists them $O(n)$.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- One-liner: bad worst case, great expected case → expected Search/Insert/Delete $\\Theta(1)$.
- State the $\\Theta(1)$-collisions assumption explicitly.
- Know what hashing does **not** accelerate: Min, Max, Predecessor, Successor.`,
    },
  ],
};
