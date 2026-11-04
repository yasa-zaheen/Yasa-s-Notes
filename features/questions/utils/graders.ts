import type { Question, StudentAnswer } from "../types";

function arraysEqual(a: number[] | undefined, b: number[] | undefined) {
  if (!a || !b || a.length !== b.length) {
    return false;
  }

  return a.every((value, index) => value === b[index]);
}

function sameSet(a: number[], b: number[]) {
  if (a.length !== b.length) {
    return false;
  }

  const left = [...a].sort((x, y) => x - y);
  const right = [...b].sort((x, y) => x - y);
  return left.every((value, index) => value === right[index]);
}

export function normalizeExpression(value: string) {
  return value
    .toLowerCase()
    .replace(/\\/g, "")
    .replace(/\s+/g, "")
    .replace(/theta/g, "θ")
    .replace(/omega/g, "ω")
    .replace(/lg/g, "log")
    .replace(/log_2/g, "log")
    .replace(/log2/g, "log");
}

export function gradeQuestion(question: Question, answer: StudentAnswer | undefined) {
  if (!answer || answer.type !== question.type) {
    return false;
  }

  if (question.type === "mcq" && answer.type === "mcq") {
    return answer.index === question.correctIndex;
  }

  if (question.type === "multi_select" && answer.type === "multi_select") {
    return sameSet(answer.indices, question.correctIndices);
  }

  if (question.type === "algorithm_trace" && answer.type === "algorithm_trace") {
    if (question.task === "predict_array") {
      return arraysEqual(answer.array, question.correctArray);
    }

    if (question.task === "identify_index") {
      return answer.index === question.correctIndex;
    }

    return answer.count === question.correctCount;
  }

  if (question.type === "complexity" && answer.type === "complexity") {
    if (question.format === "choice") {
      return answer.index === question.correctIndex;
    }

    const submitted = normalizeExpression(answer.expression ?? "");
    return (question.acceptedExpressions ?? []).some(
      (item) => normalizeExpression(item) === submitted
    );
  }

  return false;
}
