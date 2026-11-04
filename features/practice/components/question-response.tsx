"use client";

// Imports
import { Input } from "@/components/ui/input";
import type { Question, StudentAnswer } from "@/features/questions";

import { ArrayVisual } from "./array-visual";
import { ChoiceList } from "./choice-list";

// Helpers
function asMcq(answer: StudentAnswer | undefined) {
  return answer?.type === "mcq" ? answer.index : undefined;
}

function asMulti(answer: StudentAnswer | undefined) {
  return answer?.type === "multi_select" ? answer.indices : [];
}

function asTrace(answer: StudentAnswer | undefined) {
  return answer?.type === "algorithm_trace" ? answer : undefined;
}

function asComplexity(answer: StudentAnswer | undefined) {
  return answer?.type === "complexity" ? answer : undefined;
}

// Component
export function QuestionResponse({
  question,
  answer,
  revealed,
  onChange,
}: {
  question: Question;
  answer: StudentAnswer | undefined;
  revealed: boolean;
  onChange: (answer: StudentAnswer) => void;
}) {
  if (question.type === "mcq") {
    const selected = asMcq(answer);

    return (
      <ChoiceList
        options={question.options}
        selected={selected === undefined ? [] : [selected]}
        correct={[question.correctIndex]}
        revealed={revealed}
        multiple={false}
        onChange={(indices) => onChange({ type: "mcq", index: indices[0] ?? -1 })}
      />
    );
  }

  if (question.type === "multi_select") {
    return (
      <ChoiceList
        options={question.options}
        selected={asMulti(answer)}
        correct={question.correctIndices}
        revealed={revealed}
        multiple
        onChange={(indices) => onChange({ type: "multi_select", indices })}
      />
    );
  }

  if (question.type === "complexity") {
    const current = asComplexity(answer);

    if (question.format === "choice" && question.options) {
      return (
        <ChoiceList
          options={question.options}
          selected={current?.index === undefined ? [] : [current.index]}
          correct={question.correctIndex === undefined ? [] : [question.correctIndex]}
          revealed={revealed}
          multiple={false}
          onChange={(indices) =>
            onChange({ type: "complexity", index: indices[0] ?? -1 })
          }
        />
      );
    }

    return (
      <Input
        value={current?.expression ?? ""}
        disabled={revealed}
        placeholder="e.g. log_3 n"
        className="max-w-sm font-mono"
        onChange={(event) =>
          onChange({ type: "complexity", expression: event.target.value })
        }
      />
    );
  }

  const trace = asTrace(answer);
  const values = trace?.array ?? question.array;

  if (question.task === "predict_array") {
    return (
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Starting array</p>
        <ArrayVisual values={question.array} sortedUntil={question.sortedUntil} />
        <p className="text-xs text-muted-foreground">Your prediction</p>
        <ArrayVisual
          values={values}
          mode={revealed ? "display" : "edit"}
          onChangeValue={(index, value) => {
            const next = [...values];
            next[index] = value;
            onChange({ type: "algorithm_trace", array: next });
          }}
        />
        {revealed && question.correctArray ? (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Correct array</p>
            <ArrayVisual values={question.correctArray} />
          </div>
        ) : null}
      </div>
    );
  }

  if (question.task === "identify_index") {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Select the {question.indexLabel ?? "target"} index.
        </p>
        <ArrayVisual
          values={question.array}
          mode={revealed ? "display" : "select"}
          activeIndex={revealed ? question.correctIndex : trace?.index}
          onSelectIndex={(index) => onChange({ type: "algorithm_trace", index })}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <ArrayVisual values={question.array} />
      <Input
        type="number"
        value={trace?.count ?? ""}
        disabled={revealed}
        placeholder="Count"
        className="max-w-40 font-mono"
        onChange={(event) =>
          onChange({
            type: "algorithm_trace",
            count: Number(event.target.value),
          })
        }
      />
    </div>
  );
}
