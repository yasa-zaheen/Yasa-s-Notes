import type { Attempt, MasteryLevel } from "../types";

export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  not_started: "Not Started",
  learning: "Learning",
  practicing: "Practicing",
  proficient: "Proficient",
  mastered: "Mastered",
};

export function computeMastery(attempts: Attempt[]): MasteryLevel {
  const scored = attempts.filter((attempt) => !attempt.skipped);

  if (scored.length === 0) {
    return "not_started";
  }

  const accuracy = scored.filter((attempt) => attempt.correct).length / scored.length;
  const types = new Set(scored.map((attempt) => attempt.type));
  const difficulties = new Set(scored.map((attempt) => attempt.difficulty));

  if (scored.length >= 12 && accuracy >= 0.85 && types.size >= 2 && difficulties.size >= 2) {
    return "mastered";
  }

  if (scored.length >= 8 && accuracy >= 0.7 && types.size >= 2) {
    return "proficient";
  }

  if (scored.length >= 5 && accuracy >= 0.5) {
    return "practicing";
  }

  return "learning";
}

export function accuracyOf(attempts: Attempt[]) {
  const scored = attempts.filter((attempt) => !attempt.skipped);

  if (scored.length === 0) {
    return 0;
  }

  return scored.filter((attempt) => attempt.correct).length / scored.length;
}

export function groupAttemptsByTopic(attempts: Attempt[]) {
  const groups = new Map<string, Attempt[]>();

  for (const attempt of attempts) {
    const current = groups.get(attempt.topicId) ?? [];
    current.push(attempt);
    groups.set(attempt.topicId, current);
  }

  return groups;
}

export function weakTopics(attempts: Attempt[], limit = 3) {
  const ranked = [...groupAttemptsByTopic(attempts).entries()]
    .map(([topicId, topicAttempts]) => ({
      topicId,
      accuracy: accuracyOf(topicAttempts),
      count: topicAttempts.length,
      mastery: computeMastery(topicAttempts),
    }))
    .filter((item) => item.count > 0 && item.mastery !== "mastered")
    .sort((a, b) => a.accuracy - b.accuracy || b.count - a.count);

  return ranked.slice(0, limit);
}
