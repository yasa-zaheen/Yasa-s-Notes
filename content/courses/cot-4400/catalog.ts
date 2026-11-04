import type { Course } from "@/features/courses";

export const cot4400Course: Course = {
  id: "cot-4400",
  code: "COT 4400",
  title: "Analysis of Algorithms",
  description:
    "Lecture-aligned notes and practice for sorting, data structures, divide-and-conquer, and greedy algorithms.",
  lessons: [
    {
      id: "l10-sorting",
      number: 10,
      title: "Sorting",
      status: "ready",
      topics: [
        {
          id: "selection-sort",
          title: "Selection Sort",
          summary: "Iteratively swap the minimum into the next spot.",
        },
        {
          id: "insertion-sort",
          title: "Insertion Sort",
          summary: "Insert each next value into the sorted prefix.",
        },
        {
          id: "bubble-sort",
          title: "Bubble Sort",
          summary: "Swap consecutive out-of-order pairs until none remain.",
        },
        {
          id: "merge-sort",
          title: "Merge Sort",
          summary: "Split by position, recurse, then merge in linear time.",
        },
        {
          id: "quick-sort",
          title: "Quick Sort",
          summary: "Split by value around a pivot, then recurse in place.",
        },
        {
          id: "comparison-sorting",
          title: "Comparison-Based Sorting",
          summary: "Decision trees, permutations, and the Ω(n lg n) bound.",
        },
        {
          id: "counterfeit-coin",
          title: "Counterfeit Coin Problem",
          summary: "Ternary weighings and a lower bound of log₃ n.",
        },
      ],
    },
    {
      id: "l12-data-structures",
      number: 12,
      title: "Data Structures Overview",
      status: "ready",
      topics: [
        {
          id: "data-organization",
          title: "Data Organization",
          summary: "Contiguous, link-based, and hybrid structures.",
        },
        {
          id: "stacks-queues",
          title: "Stacks & Queues",
          summary: "LIFO/FIFO ADTs with amortized Θ(1) array ops.",
        },
        {
          id: "sets-arrays",
          title: "Array-Based Sets",
          summary: "Search, insert, and delete on unsorted/sorted arrays.",
        },
        {
          id: "bst",
          title: "Binary Search Trees",
          summary: "Recursive trees with search, insert, and delete.",
        },
        {
          id: "hash-tables",
          title: "Hash Tables",
          summary: "Hashing, collisions, chaining, and open addressing.",
        },
      ],
    },
    {
      id: "l13-data-structures-continued",
      number: 13,
      title: "Data Structures Continued",
      status: "ready",
      topics: [
        {
          id: "hash-expected",
          title: "Hash Tables Expected Case",
          summary: "Why hashing is used despite bad worst cases.",
        },
        {
          id: "maps",
          title: "Maps",
          summary: "Function abstraction: Insert(x,y), Search(x), Delete(x).",
        },
        {
          id: "priority-queues",
          title: "Priority Queues",
          summary: "Insert, Max/Min, DeleteMax/DeleteMin.",
        },
        {
          id: "heaps",
          title: "Heap Implementation",
          summary: "Array heaps, percolate, heapify, and Heapsort.",
        },
      ],
    },
    {
      id: "l14-divide-conquer",
      number: 14,
      title: "Divide & Conquer",
      status: "ready",
      topics: [
        {
          id: "design-strategies",
          title: "Design Strategies",
          summary: "Exhaustive search vs divide-and-conquer templates.",
        },
        {
          id: "binary-search",
          title: "Binary Search",
          summary: "Search a sorted array by repeatedly halving.",
        },
        {
          id: "dc-examples",
          title: "Classic D&C Examples",
          summary: "Find max, exponentiation, and merge-based patterns.",
        },
        {
          id: "matrix-strassen",
          title: "Matrix Multiplication & Strassen",
          summary: "Eight multiplies vs Strassen’s seven.",
        },
        {
          id: "one-sided-search",
          title: "One-Sided Binary Search",
          summary: "Binary search beyond sorted arrays.",
        },
      ],
    },
    {
      id: "l15-divide-conquer-continued",
      number: 15,
      title: "Divide & Conquer Continued",
      status: "ready",
      topics: [
        {
          id: "closest-pair",
          title: "Closest Pair",
          summary: "Find the nearest points in the plane.",
        },
        {
          id: "convex-hull",
          title: "Convex Hull",
          summary: "Smallest convex polygon containing the points.",
        },
        {
          id: "max-subarray",
          title: "Maximum Subarray Sum",
          summary: "Best contiguous sum via crossing conquer step.",
        },
      ],
    },
    {
      id: "l16-greedy",
      number: 16,
      title: "Greedy Approach",
      status: "ready",
      topics: [
        {
          id: "greedy-strategy",
          title: "Greedy Strategy",
          summary: "Locally optimal choices and irreversibility.",
        },
        {
          id: "make-change",
          title: "Make Change",
          summary: "Largest-coin-first change making.",
        },
        {
          id: "scheduling-total-time",
          title: "Minimizing Total Time",
          summary: "Shortest job first scheduling.",
        },
        {
          id: "scheduling-deadlines",
          title: "Scheduling with Deadlines",
          summary: "Profit-ordered feasible job sets.",
        },
      ],
    },
  ],
};
