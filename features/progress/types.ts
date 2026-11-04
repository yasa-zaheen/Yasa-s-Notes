import type { Difficulty, Phase1QuestionType, StudentAnswer } from "@/features/questions";

export type MasteryLevel =
  | "not_started"
  | "learning"
  | "practicing"
  | "proficient"
  | "mastered";

export type SessionConfig = {
  courseId: string;
  lessonId: string;
  topicIds: string[];
  types: Phase1QuestionType[];
  difficulty: Difficulty | "mixed" | "adaptive";
  count: number;
  feedbackMode: "immediate" | "exam";
  questionIds?: string[];
};

export type Attempt = {
  id: string;
  sessionId: string;
  questionId: string;
  courseId: string;
  lessonId: string;
  topicId: string;
  type: Phase1QuestionType;
  difficulty: Difficulty;
  correct: boolean;
  skipped: boolean;
  timestamp: number;
  elapsedMs: number;
};

export type PracticeSession = {
  id: string;
  config: SessionConfig;
  questionIds: string[];
  answers: Record<string, StudentAnswer>;
  skipped: string[];
  revealed: string[];
  currentIndex: number;
  startedAt: number;
  completedAt?: number;
  questionStartedAt: number;
};

export type ProgressState = {
  hasHydrated: boolean;
  attempts: Attempt[];
  sessions: PracticeSession[];
  activeSession: PracticeSession | null;
  questionBookmarks: string[];
  noteBookmarks: string[];
};
