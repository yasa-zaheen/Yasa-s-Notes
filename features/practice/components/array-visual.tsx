"use client";

// Imports
import { cn } from "@/lib/utils";

// Component
export function ArrayVisual({
  values,
  activeIndex,
  sortedUntil,
  mode = "display",
  onChangeValue,
  onSelectIndex,
}: {
  values: number[];
  activeIndex?: number;
  sortedUntil?: number;
  mode?: "display" | "edit" | "select";
  onChangeValue?: (index: number, value: number) => void;
  onSelectIndex?: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value, index) => {
        const selected = activeIndex === index;
        const sorted = sortedUntil !== undefined && index <= sortedUntil;

        return (
          <div key={`${index}-${mode}`} className="flex flex-col items-center gap-1">
            <span className="font-mono text-[10px] text-muted-foreground">{index}</span>
            {mode === "edit" ? (
              <input
                aria-label={`Value at index ${index}`}
                className="h-12 w-12 rounded-lg border bg-card text-center font-mono text-sm"
                value={Number.isNaN(value) ? "" : String(value)}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  onChangeValue?.(index, Number.isNaN(next) ? 0 : next);
                }}
              />
            ) : (
              <button
                type="button"
                disabled={mode !== "select"}
                onClick={() => onSelectIndex?.(index)}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg border font-mono text-sm",
                  sorted && "border-chart-1/40 bg-chart-1/10",
                  selected && "border-foreground bg-foreground text-background",
                  mode === "select" && "hover:border-foreground"
                )}
              >
                {value}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
