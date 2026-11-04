import { z } from "zod";

export const difficultySchema = z.enum(["easy", "medium", "hard"]);
export const phase1TypeSchema = z.enum([
  "mcq",
  "multi_select",
  "algorithm_trace",
  "complexity",
]);
export const questionTypeSchema = z.enum([
  "mcq",
  "multi_select",
  "algorithm_trace",
  "coding",
  "complexity",
  "written",
  "fill_blank",
]);

const baseQuestionSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  lessonId: z.string(),
  topicId: z.string(),
  difficulty: difficultySchema,
  prompt: z.string(),
  explanation: z.string(),
  hints: z.array(z.string()).optional(),
  tags: z.array(z.string()),
  sourceReference: z.string().optional(),
  estimatedTimeSeconds: z.number().int().positive().optional(),
});

export const mcqQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("mcq"),
  options: z.array(z.string()).min(4),
  correctIndex: z.number().int().nonnegative(),
  distractorExplanations: z.array(z.string()).optional(),
});

export const multiSelectQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("multi_select"),
  options: z.array(z.string()).min(4),
  correctIndices: z.array(z.number().int().nonnegative()).min(1),
  distractorExplanations: z.array(z.string()).optional(),
});

export const algorithmTraceQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("algorithm_trace"),
  algorithm: z.enum([
    "selection_sort",
    "insertion_sort",
    "bubble_sort",
    "merge_sort",
    "quick_sort",
    "partition",
  ]),
  array: z.array(z.number()),
  task: z.enum(["predict_array", "identify_index", "count"]),
  correctArray: z.array(z.number()).optional(),
  correctIndex: z.number().int().optional(),
  correctCount: z.number().int().optional(),
  indexLabel: z.string().optional(),
  sortedUntil: z.number().int().optional(),
});

export const complexityQuestionSchema = baseQuestionSchema.extend({
  type: z.literal("complexity"),
  format: z.enum(["choice", "expression"]),
  options: z.array(z.string()).min(4).optional(),
  correctIndex: z.number().int().nonnegative().optional(),
  acceptedExpressions: z.array(z.string()).optional(),
  distractorExplanations: z.array(z.string()).optional(),
});

export const questionSchema = z.discriminatedUnion("type", [
  mcqQuestionSchema,
  multiSelectQuestionSchema,
  algorithmTraceQuestionSchema,
  complexityQuestionSchema,
]);

export type Difficulty = z.infer<typeof difficultySchema>;
export type QuestionType = z.infer<typeof questionTypeSchema>;
export type Phase1QuestionType = z.infer<typeof phase1TypeSchema>;
export type McqQuestion = z.infer<typeof mcqQuestionSchema>;
export type MultiSelectQuestion = z.infer<typeof multiSelectQuestionSchema>;
export type AlgorithmTraceQuestion = z.infer<typeof algorithmTraceQuestionSchema>;
export type ComplexityQuestion = z.infer<typeof complexityQuestionSchema>;
export type Question = z.infer<typeof questionSchema>;

export type StudentAnswer =
  | { type: "mcq"; index: number }
  | { type: "multi_select"; indices: number[] }
  | { type: "algorithm_trace"; array?: number[]; index?: number; count?: number }
  | { type: "complexity"; index?: number; expression?: string };
