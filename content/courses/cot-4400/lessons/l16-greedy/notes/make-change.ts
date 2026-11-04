import type { TopicNotes } from "@/features/notes";

export const makeChangeNotes: TopicNotes = {
  topicId: "make-change",
  title: "Make Change",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `A clerk returns change using as few coins as possible. With an **unlimited** supply of coins, the greedy rule is: always take the **largest** coin that does not overshoot the remaining amount. Works for familiar denominations; can fail for weird ones (lecture: a 12¢ coin).`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `**Problem:** minimize the number of coins returned as change.

**Assumption:** unlimited supply of coins.

**Solution set:** the amount of change in the customer’s hand.

- **Selection:** look for the largest coin (value is the greedy criterion)
- **Feasibility:** adding the coin must not make the change exceed the amount owed
- **Solution check:** change value equals the amount owed

Source: *L16.GreedyApproach.pptx*, slides 12–16.`,
    },
    {
      id: "pseudocode",
      title: "Pseudocode",
      markdown: `\`\`\`text
while (instance is not solved) {
    grab the largest remaining coin;
    if (adding the coin makes the change exceed amount owed) {
        reject coin;
    } else {
        add the coin to the change;
        if (total value of the change equals the amount owed) {
            the instance is solved;
        }
    }
}
\`\`\`

Marked on slide 16: Selection, Feasibility Check, Solution Check.`,
    },
    {
      id: "worked",
      title: "Worked examples",
      markdown: `**16 cents:** apply largest-coin-first with standard coins (lecture prompt on slide 14).

**Weird denomination:** “What if we had a 12 cent coin? Is the solution optimal? Are there better solutions with fewer coins?” — greedy can fail.

**27¢ with coins 50, 10, 5, 2, 1** (slide 17 table): take 10, 10, 5, 2 → remaining 0 (50 is rejected as too large initially).`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Claiming greedy change-making is optimal for every coin system.
- Forgetting the feasibility reject when a coin exceeds the remainder.
- Assuming limited coin counts — lecture assumes unlimited supply.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Unlimited coins; grab largest; reject if exceed; stop when equal.
- Cite the 12¢ counterexample idea when asked when greedy fails.
- Trace a small amount (16¢ or 27¢) step by step.`,
    },
  ],
};
