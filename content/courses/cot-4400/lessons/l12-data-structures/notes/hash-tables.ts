import type { TopicNotes } from "@/features/notes";

export const hashTablesNotes: TopicNotes = {
  topicId: "hash-tables",
  title: "Hash Tables",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `A **hash table** is a sparse array-based data structure. Insert elements according to a **hash function**: a function that maps elements in the domain to integers $0$ through $m-1$ (array size minus one). The hash function **must take $\\Theta(1)$ time**. Most hash functions use modulus to ensure the range.

Lecture example: size $m = 10$, hash $= \\bmod 10$, insert $3, 15, 27, 82, 96, 100$.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `**Collisions:** two values map to the same location (e.g., insert $25$ into the example table).

Two basic solutions:

**Separate chaining.** Each location is the head of a linked list. Append the new element. Never “need” to reallocate.

**Open addressing.** Find the next open location and insert there. Can scan quadratically to avoid “congestion.” No links, so the table can be larger with the same memory. Deleting is tricky; capacity must be managed carefully.

Both potentially require scanning to find an element.

Source: *L12.DataStructures.pptx*, slides 31–32.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `Operations (lecture worst-case framing):

- **Search($x$):** hash, then scan linked list (or until empty location). Worst case $\\Theta(n)$.
- **Insert($x$):** hash, then append to list (or scan for open location). Worst case $\\Theta(1)$ (chaining) or $\\Theta(n)$ (open addressing).
- **Delete($x$):** hash, then delete from list (or mark as deleted). Worst case $\\Theta(n)$.

| Operation | Separate chaining | Open addressing |
| --- | --- | --- |
| Search($x$) | $O(n)$ | $O(n)$ |
| Delete($x$) | $O(n)$ | $O(n)$ |
| Insert($x$) | $O(1)$ | $O(n)$ |
| Build | $O(m + n)$ | $O(m + n^2)$ |
| Resize | $O(m + n)$ | $O(m + n^2)$ |

Here $m$ is capacity and $n$ is size. Lecture reaction: “This is awful! Why would anyone ever use a hash table?” — answered in Lesson 13 (expected case).

Source: *L12.DataStructures.pptx*, slides 33–34.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Claiming hashing itself can be superlinear. Lecture requires the hash function to run in $\\Theta(1)$.
- Confusing chaining vs. open addressing: chaining stores a list per bucket; open addressing probes for the next open slot.
- Treating worst-case $O(n)$ search as the reason hash tables are useless — L12 ends on that cliffhanger; expected case is L13.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Hash maps domain elements to $\\{0,\\ldots,m-1\\}$ in $\\Theta(1)$.
- Name both collision strategies and one property of each.
- Worst-case Search/Delete are $\\Theta(n)$ / $O(n)$; know the table’s Insert row differs for chaining vs. open addressing.`,
    },
  ],
};
