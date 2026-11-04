import type { TopicNotes } from "@/features/notes";

export const schedulingTotalTimeNotes: TopicNotes = {
  topicId: "scheduling-total-time",
  title: "Minimizing Total Time",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `A hair stylist has customers with known treatment times. **Time in the system** for a customer is waiting time plus service time. The goal is to order clients so the **total** time in the system (sum over customers) is minimized. Greedy answer: schedule **shortest service first**.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `Minimize total time in the system across jobs with service times $t_i$.

**Brute force:** consider all $n!$ schedules and pick the minimum total.

Source: *L16.GreedyApproach.pptx*, slides 19–24.`,
    },
    {
      id: "worked",
      title: "Worked example",
      markdown: `Service times $t_1=5$, $t_2=10$, $t_3=4$.

| Schedule | Total time in the system |
| --- | --- |
| $[1,2,3]$ | 39 |
| $[1,3,2]$ | 38 |
| $[2,1,3]$ | 44 |
| $[2,3,1]$ | 43 |
| $[3,1,2]$ | **32** (optimal) |
| $[3,2,1]$ | 37 |

For $[1,2,3]$: finish times accumulate as $5$, $5+10=15$, $15+4=19$; total time in system $5+15+19=39$.`,
    },
    {
      id: "greedy",
      title: "Greedy algorithm",
      markdown: `Optimal schedule: job with **smallest service time first**, then next-smallest, and so on.

\`\`\`text
sort the jobs by service time in nondecreasing order;
while (the instance is not solved) {
    schedule the next job; // selection + feasibility
    if (there are no more jobs) // solution check
        the instance is solved;
}
\`\`\`

Complexity $O(n \\log n)$ from sorting — huge improvement vs $O(n!)$.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Scheduling longest jobs first (maximizes waiting for others).
- Confusing total time in system with makespan (finish of the last job only).
- Claiming the algorithm is $O(n!)$ after sorting.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Shortest service first; example $[3,1,2]$ totals 32.
- $n!$ schedules brute force vs $O(n\\log n)$ sort.
- Know how to compute total time in system from a schedule.`,
    },
  ],
};
