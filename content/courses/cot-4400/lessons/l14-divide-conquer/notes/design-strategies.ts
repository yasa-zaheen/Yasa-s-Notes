import type { TopicNotes } from "@/features/notes";

export const designStrategiesNotes: TopicNotes = {
  topicId: "design-strategies",
  title: "Design Strategies",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Algorithm design strategies are **templates** for creating algorithms. They must be adapted to a specific problem, but they give you more tools for approaching difficult problems.

The lecture’s well-known approaches are:

- Divide and Conquer
- Greedy
- Dynamic Programming
- Backtracking

The straightforward fallback for any problem is **brute force / exhaustive search**.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `**Exhaustive search** systematically enumerates all possible solutions, trying every option until the correct or optimal answer is found.

**Divide-and-conquer** reduces complexity of high-complexity algorithms by:

1. Dividing a large problem into two or more subproblems of roughly the same size
2. Solving subproblems via recursion (small instances directly — the base case)
3. Combining subproblem solutions into a solution for the full problem

It is a **top-down** approach: the top-level answer comes from going down to smaller instances.

Source: *L14.Divide&Conquer.pptx*, slides 4–10.`,
    },
    {
      id: "exhaustive",
      title: "Exhaustive search",
      markdown: `Time complexity varies by problem but is often very high. Lecture examples:

- Searching a list: $O(n)$
- Checking all subsets of a size-$n$ set: $O(2^n)$
- Generating all permutations of $n$ elements: $O(n!)$

**Exhaustive sorting:** a set of $n$ elements has $n!$ permutations. Checking whether a permutation is sorted takes $O(n)$ time. Total: $O(n! \\cdot n)$.

**Pros:** simplicity; completeness (guarantees a solution if one exists); applicable to most problems; always gets the correct/optimum answer.

**Cons:** inefficiency for large inputs; poor scalability; almost always the slowest solution; often infeasible.`,
    },
    {
      id: "dc-template",
      title: "Divide-and-conquer template",
      markdown: `Lecture Divide & Conquer steps:

- **Divide:** break the problem into smaller, more manageable subproblems
- **Conquer:** solve subproblems recursively or by a base case
- **Combine:** merge subproblem solutions into the final answer

General strategy stated in lecture:

1. Divide the problem into **equal parts**
2. Solve subproblems recursively
3. Solve small instances directly
4. Combine solutions

**Intuition:** if combining solutions is easier than solving directly, a divide-and-conquer solution will likely be faster.`,
    },
    {
      id: "analysis",
      title: "Pros, cons, and optimal substructure",
      markdown: `**Pros** (lecture):

- Reduces complexity for several problems
- Easy to prove correctness via **strong induction**
- Easy to analyze with the **Master Theorem**
- Works very well with parallel computing

**Cons:**

- The problem must exhibit **optimal substructure** — the solution must be related to subproblem solutions
- Sometimes has poor complexity even with optimal substructure (lecture example: computing Fibonacci numbers recursively)
- **Dynamic programming** solves that overlapping-subproblem issue

Source: *L14.Divide&Conquer.pptx*, slides 20 and 38.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Treating exhaustive search as “always wrong.” It is complete and correct; it is just usually too slow.
- Forgetting that exhaustive sorting costs $O(n! \\cdot n)$, not merely $O(n!)$.
- Claiming every recursive algorithm is divide-and-conquer. D&C specifically divides into roughly equal parts and combines.
- Ignoring optimal substructure: without it, combining subproblem answers does not yield the global answer.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Name the four templates: D&C, Greedy, DP, Backtracking.
- Quote exhaustive-sorting complexity as $O(n! \\cdot n)$.
- D&C analysis tools emphasized in lecture: Master Theorem and strong induction.
- Flag “needs optimal substructure” as a D&C requirement.`,
    },
  ],
};
