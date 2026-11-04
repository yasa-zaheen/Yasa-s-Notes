import type { TopicNotes } from "@/features/notes";

export const dataOrganizationNotes: TopicNotes = {
  topicId: "data-organization",
  title: "Data Organization",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Nearly all interesting algorithms perform operations on data. **Organization of data significantly impacts performance.**

Main idea from lecture:

- Spend time upfront to organize data well.
- Reduce time complexity on common operations.
- Trade-off: reduce time complexity at the expense of space.

Ask: What are my main operations? What data structure would accelerate these? Does sorting make the problem easier (e.g., replace linear search with binary search)? Am I recalculating the same things over and over? Does computing an index (metadata) help?`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `Lecture categories of data structures:

**Contiguous.** Allocate a single chunk of memory. Retrieve elements by locating the data’s index in the chunk. Very fast if elements are accessed consecutively (caching). No memory wasted on storing pointers. $O(1)$ for pointer arithmetic ($\\text{address} = \\text{base} + i \\times \\text{element size}$) vs. following $k$ links in $O(k)$ time. Examples: arrays, dynamic arrays.

**Link-based.** Data live in small “islands” connected via pointers. Retrieve by starting at the head/tail/root and traversing links. Supports irregular structure (graphs, trees). Easier for the memory manager to allocate. Easy to modify structure by changing links (vs. copying data). Examples: linked lists, trees (BST, AVL), graphs.

**Hybrid.** Combine the best of both. Examples: hash tables with chaining (array of buckets; each bucket may be a linked list); B-trees (nodes containing an array of values and pointers to other nodes).

Source: *L12.DataStructures.pptx*, slides 4–8.`,
    },
    {
      id: "worked",
      title: "Worked example — HeapSort motivation",
      markdown: `Why study data structures? They are a fundamental component of algorithms; organization strongly impacts performance.

Example from lecture: **SelectionSort** is $\\Theta(n^2)$.

With a **heap**: building takes $\\Theta(n)$ and deleting the min takes $\\Theta(\\lg n)$. That transforms $\\Theta(n^2)$ SelectionSort into $\\Theta(n \\lg n)$ **HeapSort**.

Source: *L12.DataStructures.pptx*, slide 5.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Treating “data structure choice” as cosmetic. Lecture: organization **significantly** impacts performance.
- Assuming contiguous always wins. Contiguous is great for consecutive access and pointer arithmetic; link-based wins for irregular structure and cheap structural edits.
- Forgetting hybrids exist. Hash tables (chaining) and B-trees are explicit hybrid examples.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Name the three categories: contiguous, link-based, hybrid — with one example each.
- Quote the HeapSort motivation: heap build $\\Theta(n)$ + delete-min $\\Theta(\\lg n)$ turns SelectionSort into $\\Theta(n \\lg n)$ HeapSort.
- Be ready to argue the space/time trade-off: organize upfront to accelerate common operations.`,
    },
  ],
};
