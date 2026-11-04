import type { TopicNotes } from "@/features/notes";

export const schedulingDeadlinesNotes: TopicNotes = {
  topicId: "scheduling-deadlines",
  title: "Scheduling with Deadlines",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Jobs each take **one unit** of time. A job yields its **profit** only if it **starts by its deadline**; otherwise profit is zero. You need not schedule every job. Greedy idea: consider jobs in **nonincreasing profit** order and add a job only if some feasible schedule still exists for the chosen set.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `- Each job takes one unit of time
- Profit if the job starts before or at its deadline; else no profit
- Goal: maximize total profit
- Not all jobs must be scheduled

Example (slide 25): jobs with deadlines/profits $(2,30)$, $(1,35)$, $(2,25)$, $(1,40)$. Optimal among listed schedules includes $[4,1]$ with profit $70$.

Source: *L16.GreedyApproach.pptx*, slides 25–29.`,
    },
    {
      id: "pseudocode",
      title: "Pseudocode",
      markdown: `\`\`\`text
sort the jobs in nonincreasing order by profit;
S = ∅;
while (the instance is not solved) {
    select next job; // selection
    if (S is feasible with this job added) // feasibility
        add this job to S;
    if (there are no more jobs) // solution check
        the instance is solved;
}
\`\`\`

Worst case $O(n \\log n)$ (dominated by sorting; lecture).`,
    },
    {
      id: "worked",
      title: "Worked example",
      markdown: `Larger instance (jobs already shown sorted by profit on slides 28–29):

| Job | Deadline | Profit |
| --- | --- | --- |
| 1 | 3 | 40 |
| 2 | 1 | 35 |
| 3 | 1 | 30 |
| 4 | 3 | 25 |
| 5 | 1 | 20 |
| 6 | 3 | 15 |
| 7 | 2 | 10 |

Greedy trace:

1. $S=\\emptyset$
2. Add 1 → $\\{1\\}$ feasible
3. Add 2 → $\\{1,2\\}$ feasible (\`[2,1]\`)
4. Reject 3 — no feasible sequence for $\\{1,2,3\\}$
5. Add 4 → $\\{1,2,4\\}$ feasible (\`[2,1,4]\`)
6. Reject 5, 6, 7

Final $S=\\{1,2,4\\}$; feasible sequences include $[2,1,4]$ or $[2,4,1]$.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Sorting by deadline instead of nonincreasing profit.
- Adding a job without a feasibility check (two deadline-1 jobs both cannot start at time 1).
- Assuming all jobs must appear in the schedule.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Unit-time jobs; profit iff start by deadline.
- Sort nonincreasing profit; add if feasible set.
- Be ready to replay the $\\{1,2,4\\}$ trace.
- Complexity $O(n\\log n)$ worst case per lecture.`,
    },
  ],
};
