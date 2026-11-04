import type { TopicNotes } from "@/features/notes";

export const oneSidedSearchNotes: TopicNotes = {
  topicId: "one-sided-search",
  title: "One-Sided Binary Search",
  sections: [
    {
      id: "intuition",
      title: "Intuitive explanation",
      markdown: `Binary search is not only for sorted arrays. Whenever you can decide “too high” vs “too low,” you can bisect a numeric range — for example estimating a root. If you lack a known upper bound, **one-sided search** grows the bound exponentially, then finishes with ordinary binary search.`,
    },
    {
      id: "definition",
      title: "Formal definition",
      markdown: `Lecture applications:

- Estimating a root (e.g. of $2 - n^2$ between 1 and 2) by guessing midpoints until sufficiently close — needs upper and lower bounds
- **One-sided search:** start at a minimum value, **double until too large**, then binary search between the last success and the first failure

Source: *L14.Divide&Conquer.pptx*, slides 36–37.`,
    },
    {
      id: "worked",
      title: "Worked example",
      markdown: `Assume $n$ is a large number and you need a suitable power-of-two bound.

**Exhaustive / doubling idea:** try every power of $2$ until you exceed $n$. That takes $\\Theta(\\lg n)$ time.

**One-sided binary search:**

1. Double the power of $2$ until it is too high
2. Binary search between the last success and the first failure

Also $\\Theta(\\lg n)$ time.`,
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      markdown: `Trying successive powers of $2$ until exceeding $n$ examines $O(\\lg n)$ candidates → $\\Theta(\\lg n)$.

The follow-up binary search on an interval of length $O(n)$ (between a power of two just below/above) is also $\\Theta(\\lg n)$.

Overall: $\\Theta(\\lg n)$.`,
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      markdown: `- Thinking one-sided search needs the full sorted array API — it needs a monotone predicate.
- Claiming doubling to find a bound is $O(n)$ because values grow to $n$; the **number of doublings** is logarithmic.
- Forgetting the second phase: after doubling, you still binary search between last success and first failure.`,
    },
    {
      id: "exam",
      title: "Exam tips",
      markdown: `- Phrase: double until too high, then binary search between last success and first failure.
- Bound-finding by powers of $2$ until exceeding $n$ is $\\Theta(\\lg n)$.
- Root-finding by bisection needs explicit upper and lower bounds unless you use one-sided search.`,
    },
  ],
};
