"use client";

// Imports
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { MarkdownRenderer } from "@/features/notes";

// Helpers
function optionClass(state: "idle" | "correct" | "incorrect" | "missed") {
  if (state === "correct") {
    return "border-chart-1 bg-chart-1/10";
  }

  if (state === "incorrect") {
    return "border-destructive/50 bg-destructive/10";
  }

  if (state === "missed") {
    return "border-chart-1/50 bg-chart-1/5";
  }

  return "border-border hover:bg-accent/40";
}

function stateFor(
  index: number,
  selected: number[],
  revealed: boolean,
  correct: number[]
): "idle" | "correct" | "incorrect" | "missed" {
  if (!revealed) {
    return "idle";
  }

  const isCorrect = correct.includes(index);
  const isSelected = selected.includes(index);

  if (isSelected && isCorrect) {
    return "correct";
  }

  if (isSelected && !isCorrect) {
    return "incorrect";
  }

  if (!isSelected && isCorrect) {
    return "missed";
  }

  return "idle";
}

// Component
export function ChoiceList({
  options,
  selected,
  correct,
  revealed,
  multiple,
  onChange,
}: {
  options: string[];
  selected: number[];
  correct: number[];
  revealed: boolean;
  multiple: boolean;
  onChange: (indices: number[]) => void;
}) {
  if (multiple) {
    return (
      <div className="space-y-2">
        {options.map((option, index) => {
          const checked = selected.includes(index);
          const state = stateFor(index, selected, revealed, correct);

          return (
            <label
              key={option}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border p-3",
                optionClass(state)
              )}
            >
              <Checkbox
                checked={checked}
                disabled={revealed}
                onCheckedChange={(value) => {
                  if (value) {
                    onChange([...selected, index]);
                    return;
                  }

                  onChange(selected.filter((item) => item !== index));
                }}
              />
              <div className="min-w-0 flex-1">
                <MarkdownRenderer markdown={option} className="space-y-0 text-sm leading-6" />
              </div>
            </label>
          );
        })}
      </div>
    );
  }

  const radioValue = selected[0] !== undefined ? String(selected[0]) : "";

  return (
    <RadioGroup
      value={radioValue}
      disabled={revealed}
      onValueChange={(value) => {
        if (typeof value === "string") {
          onChange([Number(value)]);
        }
      }}
      className="gap-2"
    >
      {options.map((option, index) => {
        const state = stateFor(index, selected, revealed, correct);

        return (
          <label
            key={option}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border p-3",
              optionClass(state)
            )}
          >
            <RadioGroupItem value={String(index)} />
            <div className="min-w-0 flex-1">
              <MarkdownRenderer markdown={option} className="space-y-0 text-sm leading-6" />
            </div>
          </label>
        );
      })}
    </RadioGroup>
  );
}
