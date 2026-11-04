import type { TopicNotes } from "@/features/notes";

export const counterfeitCoinNotes: TopicNotes = {
  topicId: "counterfeit-coin",
  title: "Counterfeit Coin Problem",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `The lecture uses the **counterfeit coin** problem as a lower-bound exercise in the same style as CBS, but the branching factor is $3$, not $2$.`,
    },
    {
      id: "definition",
      title: "Problem setup",
      markdown: `**Input:** a stack of $n$ coins, all identical except for one counterfeit, which **weighs less**.

**Output:** index of the counterfeit coin.

**Primary operation:** weigh any two sets of coins on a scale. Returns $<$, $>$, or $=$.

Source: *L10.Sorting.pptx*, slides 38–39.`,
    },
    {
      id: "reasoning",
      title: "Decision-tree reasoning",
      markdown: `The lecture asks three questions and answers them:

1. What is the number of possible outputs for an input of size $n$?  
   **$n$** — any one of the coins could be the counterfeit.

2. How many execution paths do $k$ weighings yield?  
   **$3^k$** — each weighing has $3$ possibilities.

3. Find a lower bound on the weighings required.  
   $3^k \\ge n \\Rightarrow k = \\log_3 n$.`,
    },
    {
      id: "worked",
      title: "Worked example",
      markdown: `For $n = 9$ coins, $k$ must satisfy $3^k \\ge 9$, so $k \\ge 2$. The classic strategy: weigh $3$ vs $3$.

- The lighter side contains the counterfeit, or
- If equal, the counterfeit is in the $3$ left out.

One more weighing of two of those three isolates the light coin.`,
    },
    {
      id: "complexity",
      title: "Lower bound",
      markdown: `$$
k = \\Omega(\\log_3 n)
$$

Compare with CBS: binary outcomes $\\Rightarrow 2^k \\ge n!$. Here ternary outcomes $\\Rightarrow 3^k \\ge n$. Same proof pattern, different alphabet size and different number of inputs/outputs.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Using $n!$ possible outputs. There are only $n$ candidate coins.
- Using $2^k$ paths. A balance scale has three results.
- Assuming the counterfeit could be heavier. This lecture instance is **lighter only**.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Write $3^k \\ge n$ then take $\\log_3$.
- State all three lecture answers: $n$ outputs, $3^k$ paths, $k = \\log_3 n$.
- Be ready to contrast this with the CBS argument on the previous slides.`,
    },
  ],
};
