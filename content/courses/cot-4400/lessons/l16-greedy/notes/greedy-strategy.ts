import type { TopicNotes } from "@/features/notes";

export const greedyStrategyNotes: TopicNotes = {
  topicId: "greedy-strategy",
  title: "Greedy Strategy",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Greedy algorithms usually attack **optimization** problems (“find the best/largest/smallest…”). You formulate the problem as a **sequence of decisions**, and at each step you take the locally best available option — irreversibly — hoping the sequence yields a global optimum.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `**Properties (lecture):**

- More straightforward (simple logic) than some other designs
- Solution via a sequence of choices, each appearing best at that step
- Once a choice is made, it **cannot** be reconsidered
- Locally optimal decisions; **global optimality is not guaranteed**
- Often lead to very efficient solutions

Source: *L16.GreedyApproach.pptx*, slides 6–9.`,
    },
    {
      id: "steps",
      title: "Greedy approach steps",
      markdown: `Lecture template:

1. **Initialization:** solution starts as an **empty set**; items are added until the set represents a solution
2. **Selection procedure:** greedily grab the next best item by the greedy criterion (locally optimal), without considering potential drawbacks
3. **Feasibility check & update:** if the new set is feasible, update the current solution
4. **Solution check & termination:** decide whether the set is a complete solution and when to stop`,
    },
    {
      id: "applications",
      title: "Applications",
      markdown: `**Optimal solutions (lecture list):** change making for “normal” coin denominations; MST; single-source shortest paths; simple scheduling; Huffman codes.

**Approximations:** TSP; 0-1 Knapsack; other combinatorial optimization problems.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Assuming every greedy algorithm is always optimal.
- Reconsidering past choices — that is backtracking/DP territory, not classic greedy irreversibility.
- Skipping the feasibility check and accepting an invalid partial set.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Memorize: empty-set init → selection → feasibility → solution check.
- “Locally optimal, irreversible; global optimum not guaranteed.”
- Know which classic problems greed can solve optimally vs approximate.`,
    },
  ],
};
