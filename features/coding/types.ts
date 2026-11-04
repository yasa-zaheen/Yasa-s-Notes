export type SortAlgorithmId =
  | "selection_sort"
  | "insertion_sort"
  | "bubble_sort"
  | "merge_sort"
  | "quick_sort"
  | "merge_arrays"
  | "partition";

export type AnimHighlight = {
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  pivot?: number;
  writing?: number[];
  left?: number[];
  right?: number[];
};

export type AnimFrame = {
  array: number[];
  highlights: AnimHighlight;
  message: string;
};

export type CodingTestCase = {
  id: string;
  name: string;
  input: unknown;
  expected: unknown;
  hidden?: boolean;
};

export type CodingProblem = {
  id: string;
  courseId: string;
  lessonId: string;
  topicId: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  algorithm: SortAlgorithmId;
  description: string;
  functionName: string;
  starterCode: string;
  solutionCode: string;
  solutionExplanation: string;
  constraints: string[];
  examples: { input: string; output: string; explanation?: string }[];
  visibleTests: CodingTestCase[];
  hiddenTests: CodingTestCase[];
  animationSeed: number[];
};

export type TestRunResult = {
  id: string;
  name: string;
  hidden: boolean;
  passed: boolean;
  input: unknown;
  expected: unknown;
  actual?: unknown;
  error?: string;
  runtimeMs?: number;
};

export type CodeExecutionResult = {
  ok: boolean;
  results: TestRunResult[];
  stdout: string;
  error?: string;
  mode: "pyodide";
};
