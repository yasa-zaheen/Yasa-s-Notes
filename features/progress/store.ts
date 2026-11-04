"use client";

// Imports
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { gradeQuestion, getQuestionById, type StudentAnswer } from "@/features/questions";

import type { Attempt, PracticeSession, ProgressState, SessionConfig } from "./types";

// Types
type ProgressActions = {
  setHasHydrated: () => void;
  startSession: (config: SessionConfig, questionIds: string[]) => string;
  setActiveIndex: (index: number) => void;
  saveAnswer: (questionId: string, answer: StudentAnswer) => void;
  skipQuestion: (questionId: string) => void;
  revealQuestion: (questionId: string) => void;
  toggleQuestionBookmark: (questionId: string) => void;
  toggleNoteBookmark: (bookmarkId: string) => void;
  completeSession: () => PracticeSession | null;
  clearActiveSession: () => void;
};

export type ProgressStore = ProgressState & ProgressActions;

function createId() {
  return crypto.randomUUID();
}

const emptyState: ProgressState = {
  hasHydrated: false,
  attempts: [],
  sessions: [],
  activeSession: null,
  questionBookmarks: [],
  noteBookmarks: [],
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...emptyState,

      setHasHydrated: () => set({ hasHydrated: true }),

      startSession: (config, questionIds) => {
        const session: PracticeSession = {
          id: createId(),
          config,
          questionIds,
          answers: {},
          skipped: [],
          revealed: [],
          currentIndex: 0,
          startedAt: Date.now(),
          questionStartedAt: Date.now(),
        };

        set({ activeSession: session });
        return session.id;
      },

      setActiveIndex: (index) => {
        const session = get().activeSession;
        if (!session) {
          return;
        }

        set({
          activeSession: {
            ...session,
            currentIndex: index,
            questionStartedAt: Date.now(),
          },
        });
      },

      saveAnswer: (questionId, answer) => {
        const session = get().activeSession;
        if (!session) {
          return;
        }

        set({
          activeSession: {
            ...session,
            answers: { ...session.answers, [questionId]: answer },
            skipped: session.skipped.filter((id) => id !== questionId),
          },
        });
      },

      skipQuestion: (questionId) => {
        const session = get().activeSession;
        if (!session) {
          return;
        }

        set({
          activeSession: {
            ...session,
            skipped: session.skipped.includes(questionId)
              ? session.skipped
              : [...session.skipped, questionId],
          },
        });
      },

      revealQuestion: (questionId) => {
        const session = get().activeSession;
        if (!session) {
          return;
        }

        set({
          activeSession: {
            ...session,
            revealed: session.revealed.includes(questionId)
              ? session.revealed
              : [...session.revealed, questionId],
          },
        });
      },

      toggleQuestionBookmark: (questionId) => {
        const bookmarks = get().questionBookmarks;
        set({
          questionBookmarks: bookmarks.includes(questionId)
            ? bookmarks.filter((id) => id !== questionId)
            : [...bookmarks, questionId],
        });
      },

      toggleNoteBookmark: (bookmarkId) => {
        const bookmarks = get().noteBookmarks;
        set({
          noteBookmarks: bookmarks.includes(bookmarkId)
            ? bookmarks.filter((id) => id !== bookmarkId)
            : [...bookmarks, bookmarkId],
        });
      },

      completeSession: () => {
        const session = get().activeSession;
        if (!session) {
          return null;
        }

        const completed: PracticeSession = {
          ...session,
          completedAt: Date.now(),
        };

        const attempts: Attempt[] = session.questionIds.map((questionId) => {
          const question = getQuestionById(questionId);
          const answer = session.answers[questionId];
          const skipped = session.skipped.includes(questionId) && answer === undefined;
          const correct = Boolean(question && !skipped && gradeQuestion(question, answer));

          return {
            id: createId(),
            sessionId: session.id,
            questionId,
            courseId: session.config.courseId,
            lessonId: session.config.lessonId,
            topicId: question?.topicId ?? "unknown",
            type: question?.type ?? "mcq",
            difficulty: question?.difficulty ?? "easy",
            correct,
            skipped,
            timestamp: Date.now(),
            elapsedMs: Math.max(0, Date.now() - session.questionStartedAt),
          };
        });

        set({
          activeSession: completed,
          sessions: [...get().sessions, completed],
          attempts: [...get().attempts, ...attempts],
        });

        return completed;
      },

      clearActiveSession: () => set({ activeSession: null }),
    }),
    {
      name: "yasas-notes-progress",
      skipHydration: true,
      partialize: (state) => ({
        attempts: state.attempts,
        sessions: state.sessions,
        activeSession: state.activeSession,
        questionBookmarks: state.questionBookmarks,
        noteBookmarks: state.noteBookmarks,
      }),
    }
  )
);
