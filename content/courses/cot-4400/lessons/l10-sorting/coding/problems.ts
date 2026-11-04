import type { CodingProblem } from "@/features/coding";

const meta = {
  courseId: "cot-4400",
  lessonId: "l10-sorting",
} as const;

export const l10CodingProblems: CodingProblem[] = [
  {
    ...meta,
    id: "code-selection-sort",
    topicId: "selection-sort",
    title: "Implement Selection Sort",
    difficulty: "easy",
    algorithm: "selection_sort",
    functionName: "selection_sort",
    description: `Implement **Selection Sort** in Python.

On each outer pass \`i\`, find the minimum in the unsorted suffix \`A[i..]\` and swap it into index \`i\`.

The lecture always performs \`n(n-1)/2\` comparisons regardless of input order.`,
    constraints: [
      "1 ≤ len(arr) ≤ 200",
      "Mutate and return the same list (in-place)",
      "Values are integers",
    ],
    examples: [
      {
        input: "arr = [7, 3, 5, 1, 9]",
        output: "[1, 3, 5, 7, 9]",
        explanation: "First pass swaps 1 into index 0.",
      },
      {
        input: "arr = [64, 25, 12, 22, 11]",
        output: "[11, 12, 22, 25, 64]",
      },
    ],
    starterCode: `def selection_sort(arr: list[int]) -> list[int]:
    """Sort arr in-place with selection sort and return it."""
    # Write your code here
    return arr
`,
    solutionCode: `def selection_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n):
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr
`,
    solutionExplanation:
      "Outer loop fixes index `i`. Inner loop finds `min_index` in the suffix, then one swap places that minimum into final position.",
    animationSeed: [7, 3, 5, 1, 9],
    visibleTests: [
      { id: "v1", name: "Example 1", input: [7, 3, 5, 1, 9], expected: [1, 3, 5, 7, 9] },
      { id: "v2", name: "Already sorted", input: [1, 2, 3], expected: [1, 2, 3] },
      { id: "v3", name: "Reverse", input: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] },
    ],
    hiddenTests: [
      { id: "h1", name: "Duplicates", input: [3, 1, 2, 1], expected: [1, 1, 2, 3], hidden: true },
      { id: "h2", name: "Single", input: [42], expected: [42], hidden: true },
      { id: "h3", name: "Negatives", input: [0, -2, 5, -1], expected: [-2, -1, 0, 5], hidden: true },
    ],
  },
  {
    ...meta,
    id: "code-insertion-sort",
    topicId: "insertion-sort",
    title: "Implement Insertion Sort",
    difficulty: "easy",
    algorithm: "insertion_sort",
    functionName: "insertion_sort",
    description: `Implement **Insertion Sort**.

For each key at index \`i\`, shift larger elements in the sorted prefix one slot right, then insert the key into its hole.`,
    constraints: [
      "1 ≤ len(arr) ≤ 200",
      "In-place sort; return the same list",
    ],
    examples: [
      {
        input: "arr = [5, 2, 4, 6, 1]",
        output: "[1, 2, 4, 5, 6]",
      },
    ],
    starterCode: `def insertion_sort(arr: list[int]) -> list[int]:
    """Sort arr in-place with insertion sort and return it."""
    # Write your code here
    return arr
`,
    solutionCode: `def insertion_sort(arr: list[int]) -> list[int]:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr
`,
    solutionExplanation:
      "Best case is nearly sorted (few shifts). Worst case reverse-sorted shifts each key across the whole prefix.",
    animationSeed: [5, 2, 4, 6, 1],
    visibleTests: [
      { id: "v1", name: "Example", input: [5, 2, 4, 6, 1], expected: [1, 2, 4, 5, 6] },
      { id: "v2", name: "Sorted", input: [1, 2, 3, 4], expected: [1, 2, 3, 4] },
    ],
    hiddenTests: [
      { id: "h1", name: "Duplicates", input: [2, 2, 1], expected: [1, 2, 2], hidden: true },
      { id: "h2", name: "Two", input: [9, 1], expected: [1, 9], hidden: true },
    ],
  },
  {
    ...meta,
    id: "code-bubble-sort",
    topicId: "bubble-sort",
    title: "Implement Bubble Sort",
    difficulty: "easy",
    algorithm: "bubble_sort",
    functionName: "bubble_sort",
    description: `Implement **Bubble Sort** with the lecture's early-exit flag.

Repeatedly swap adjacent out-of-order pairs. If a pass makes no swaps, break.`,
    constraints: ["1 ≤ len(arr) ≤ 200", "In-place; return the list"],
    examples: [
      { input: "arr = [4, 3, 5, 2]", output: "[2, 3, 4, 5]" },
    ],
    starterCode: `def bubble_sort(arr: list[int]) -> list[int]:
    """Sort arr in-place with bubble sort (early exit) and return it."""
    # Write your code here
    return arr
`,
    solutionCode: `def bubble_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
`,
    solutionExplanation:
      "After pass `i`, the largest `i+1` values sit at the right. The `swapped` flag gives O(n) best case on sorted input.",
    animationSeed: [4, 3, 5, 2],
    visibleTests: [
      { id: "v1", name: "Example", input: [4, 3, 5, 2], expected: [2, 3, 4, 5] },
      { id: "v2", name: "Sorted early exit", input: [1, 2, 3], expected: [1, 2, 3] },
    ],
    hiddenTests: [
      { id: "h1", name: "Reverse", input: [3, 2, 1], expected: [1, 2, 3], hidden: true },
    ],
  },
  {
    ...meta,
    id: "code-merge-sort",
    topicId: "merge-sort",
    title: "Implement Merge Sort",
    difficulty: "medium",
    algorithm: "merge_sort",
    functionName: "merge_sort",
    description: `Implement **Merge Sort**.

Split the array into halves recursively, then merge two sorted halves left-to-right in Θ(n).

You may allocate a new list for the merged result.`,
    constraints: ["1 ≤ len(arr) ≤ 200"],
    examples: [
      { input: "arr = [38, 27, 43, 3]", output: "[3, 27, 38, 43]" },
    ],
    starterCode: `def merge_sort(arr: list[int]) -> list[int]:
    """Return a new sorted list using merge sort."""
    # Write your code here
    return arr
`,
    solutionCode: `def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return list(arr)

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)


def merge(left: list[int], right: list[int]) -> list[int]:
    i = j = 0
    out: list[int] = []
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1
    out.extend(left[i:])
    out.extend(right[j:])
    return out
`,
    solutionExplanation:
      "Base case is length ≤ 1. Recurrence T(n)=2T(n/2)+Θ(n) gives O(n log n). The lecture: combine step does the real work.",
    animationSeed: [38, 27, 43, 3],
    visibleTests: [
      { id: "v1", name: "Example", input: [38, 27, 43, 3], expected: [3, 27, 38, 43] },
      { id: "v2", name: "Single", input: [7], expected: [7] },
    ],
    hiddenTests: [
      { id: "h1", name: "Duplicates", input: [2, 1, 2, 0], expected: [0, 1, 2, 2], hidden: true },
      { id: "h2", name: "Odd length", input: [5, 1, 4, 2, 8], expected: [1, 2, 4, 5, 8], hidden: true },
    ],
  },
  {
    ...meta,
    id: "code-quick-sort",
    topicId: "quick-sort",
    title: "Implement Quick Sort",
    difficulty: "medium",
    algorithm: "quick_sort",
    functionName: "quick_sort",
    description: `Implement **Quick Sort** using the lecture partition (pivot = first element).

Partition so values less than the pivot move left, then place the pivot, then recurse on both sides.`,
    constraints: ["1 ≤ len(arr) ≤ 200", "In-place preferred; return the sorted list"],
    examples: [
      { input: "arr = [5, 3, 8, 1, 9, 4]", output: "[1, 3, 4, 5, 8, 9]" },
    ],
    starterCode: `def quick_sort(arr: list[int]) -> list[int]:
    """Sort arr with quicksort (first-element pivot) and return it."""
    # Write your code here
    return arr
`,
    solutionCode: `def quick_sort(arr: list[int]) -> list[int]:
    def partition(low: int, high: int) -> int:
        pivot = arr[low]
        j = low
        for i in range(low + 1, high + 1):
            if pivot > arr[i]:
                j += 1
                arr[i], arr[j] = arr[j], arr[i]
        arr[low], arr[j] = arr[j], arr[low]
        return j

    def sort_range(low: int, high: int) -> None:
        if low >= high:
            return
        p = partition(low, high)
        sort_range(low, p - 1)
        sort_range(p + 1, high)

    if arr:
        sort_range(0, len(arr) - 1)
    return arr
`,
    solutionExplanation:
      "Lecture partition: `pivotitem = S[low]`, grow left side with `j`, finally exchange pivot into `j`. Worst case O(n²) when pivot is always extreme.",
    animationSeed: [5, 3, 8, 1, 9, 4],
    visibleTests: [
      { id: "v1", name: "Example", input: [5, 3, 8, 1, 9, 4], expected: [1, 3, 4, 5, 8, 9] },
      { id: "v2", name: "Sorted", input: [1, 2, 3], expected: [1, 2, 3] },
    ],
    hiddenTests: [
      { id: "h1", name: "Reverse", input: [4, 3, 2, 1], expected: [1, 2, 3, 4], hidden: true },
      { id: "h2", name: "Duplicates", input: [2, 2, 1, 3], expected: [1, 2, 2, 3], hidden: true },
    ],
  },
  {
    ...meta,
    id: "code-merge-arrays",
    topicId: "merge-sort",
    title: "Merge Two Sorted Arrays",
    difficulty: "easy",
    algorithm: "merge_arrays",
    functionName: "merge",
    description: `Implement the **merge** step used by Merge Sort.

Given two sorted lists \`left\` and \`right\`, return one sorted list. Fill left-to-right using the smaller head; when one side empties, append the rest.`,
    constraints: ["0 ≤ len(left), len(right) ≤ 200", "Inputs are already sorted ascending"],
    examples: [
      {
        input: "left = [27, 38], right = [3, 43]",
        output: "[3, 27, 38, 43]",
      },
    ],
    starterCode: `def merge(left: list[int], right: list[int]) -> list[int]:
    """Merge two sorted lists into one sorted list."""
    # Write your code here
    return []
`,
    solutionCode: `def merge(left: list[int], right: list[int]) -> list[int]:
    i = j = 0
    out: list[int] = []
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1
    out.extend(left[i:])
    out.extend(right[j:])
    return out
`,
    solutionExplanation: "Linear Θ(n) combine. After one array empties, append the other.",
    animationSeed: [38, 27, 43, 3],
    visibleTests: [
      {
        id: "v1",
        name: "Example",
        input: { left: [27, 38], right: [3, 43] },
        expected: [3, 27, 38, 43],
      },
      {
        id: "v2",
        name: "One empty",
        input: { left: [], right: [1, 2] },
        expected: [1, 2],
      },
    ],
    hiddenTests: [
      {
        id: "h1",
        name: "Interleaved",
        input: { left: [1, 4, 7], right: [2, 3, 8] },
        expected: [1, 2, 3, 4, 7, 8],
        hidden: true,
      },
    ],
  },
  {
    ...meta,
    id: "code-partition",
    topicId: "quick-sort",
    title: "Partition Around a Pivot",
    difficulty: "medium",
    algorithm: "partition",
    functionName: "partition",
    description: `Implement the lecture **partition** using the first element as pivot.

Return a tuple \`(arr, pivot_index)\` after rearranging so left values are < pivot and the pivot sits at \`pivot_index\`.`,
    constraints: ["1 ≤ len(arr) ≤ 200"],
    examples: [
      {
        input: "arr = [5, 3, 8, 1, 9, 4]",
        output: "([4, 3, 1, 5, 9, 8], 3)",
        explanation: "Pivot 5 ends at index 3.",
      },
    ],
    starterCode: `def partition(arr: list[int]) -> tuple[list[int], int]:
    """Partition arr around first element. Return (arr, pivot_index)."""
    # Write your code here
    return arr, 0
`,
    solutionCode: `def partition(arr: list[int]) -> tuple[list[int], int]:
    low = 0
    high = len(arr) - 1
    pivot = arr[low]
    j = low
    for i in range(low + 1, high + 1):
        if pivot > arr[i]:
            j += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[low], arr[j] = arr[j], arr[low]
    return arr, j
`,
    solutionExplanation:
      "Whenever an item is less than the pivot, increment `j` and swap. Finally exchange the pivot into index `j`.",
    animationSeed: [5, 3, 8, 1, 9, 4],
    visibleTests: [
      {
        id: "v1",
        name: "Example",
        input: [5, 3, 8, 1, 9, 4],
        expected: [[4, 3, 1, 5, 9, 8], 3],
      },
    ],
    hiddenTests: [
      {
        id: "h1",
        name: "Pivot smallest",
        input: [1, 4, 3, 2],
        expected: [[1, 4, 3, 2], 0],
        hidden: true,
      },
      {
        id: "h2",
        name: "Pivot largest",
        input: [9, 1, 2],
        expected: [[2, 1, 9], 2],
        hidden: true,
      },
    ],
  },
];

export function getCodingProblem(id: string) {
  return l10CodingProblems.find((problem) => problem.id === id);
}

export function getCodingProblemsForLesson(courseId: string, lessonId: string) {
  return l10CodingProblems.filter(
    (problem) => problem.courseId === courseId && problem.lessonId === lessonId
  );
}
