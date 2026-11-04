"use client";

// Imports
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useEffectEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

import type { AnimFrame, SortAlgorithmId } from "../types";
import { buildAnimationFrames } from "../utils/animation-frames";

// Constants
const SPEEDS = [
  { label: "0.5×", ms: 900 },
  { label: "1×", ms: 500 },
  { label: "2×", ms: 250 },
] as const;

// Helpers
function cellClass(frame: AnimFrame, index: number) {
  const { highlights } = frame;
  if (highlights.swapping?.includes(index)) {
    return "border-chart-5/50 bg-chart-5/20 text-foreground";
  }
  if (highlights.writing?.includes(index)) {
    return "border-chart-4/50 bg-chart-4/20 text-foreground";
  }
  if (highlights.pivot === index) {
    return "border-chart-2/60 bg-chart-2/20 text-foreground";
  }
  if (highlights.comparing?.includes(index)) {
    return "border-foreground bg-foreground text-background";
  }
  if (highlights.sorted?.includes(index)) {
    return "border-chart-1/40 bg-chart-1/15 text-foreground";
  }
  if (highlights.left?.includes(index)) {
    return "border-chart-3/40 bg-chart-3/10 text-foreground";
  }
  if (highlights.right?.includes(index)) {
    return "border-chart-2/40 bg-chart-2/10 text-foreground";
  }
  return "border-border bg-card text-foreground";
}

// Component
export function AlgorithmAnimator({
  algorithm,
  seed,
}: {
  algorithm: SortAlgorithmId;
  seed: number[];
}) {
  // State
  const frames = useMemo(() => buildAnimationFrames(algorithm, seed), [algorithm, seed]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);

  const frame = frames[index] ?? frames[0]!;
  const maxIndex = Math.max(0, frames.length - 1);

  // Effects / callbacks
  const advance = useEffectEvent(() => {
    setIndex((current) => {
      if (current >= maxIndex) {
        setPlaying(false);
        return current;
      }
      return current + 1;
    });
  });

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
  }, [algorithm, seed]);

  useEffect(() => {
    if (!playing) {
      return;
    }

    const id = window.setInterval(() => {
      advance();
    }, SPEEDS[speedIdx]!.ms);

    return () => window.clearInterval(id);
  }, [playing, speedIdx]);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Step {index + 1} / {frames.length}
        </p>
        <p className="min-h-10 text-sm leading-relaxed font-medium">{frame.message}</p>
      </div>

      <div className="flex flex-wrap items-end gap-2 rounded-xl border bg-muted/30 p-4">
        {frame.array.map((value, cellIndex) => (
          <div key={`${cellIndex}-${value}`} className="flex flex-col items-center gap-1">
            <span className="font-mono text-[10px] text-muted-foreground">{cellIndex}</span>
            <div
              className={cn(
                "flex h-12 min-w-12 items-center justify-center rounded-lg border px-2 font-mono text-sm transition-colors",
                cellClass(frame, cellIndex)
              )}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Slider
          min={0}
          max={maxIndex}
          step={1}
          value={[index]}
          onValueChange={(next) => {
            const value = Array.isArray(next) ? next[0] : next;
            setIndex(typeof value === "number" ? value : 0);
            setPlaying(false);
          }}
        />

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Reset"
            onClick={() => {
              setIndex(0);
              setPlaying(false);
            }}
          >
            <RotateCcw />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Previous step"
            disabled={index === 0}
            onClick={() => {
              setPlaying(false);
              setIndex((current) => Math.max(0, current - 1));
            }}
          >
            <SkipBack />
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => setPlaying((current) => !current)}
            disabled={index >= maxIndex && !playing}
          >
            {playing ? <Pause data-icon="inline-start" /> : <Play data-icon="inline-start" />}
            {playing ? "Pause" : "Play"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Next step"
            disabled={index >= maxIndex}
            onClick={() => {
              setPlaying(false);
              setIndex((current) => Math.min(maxIndex, current + 1));
            }}
          >
            <SkipForward />
          </Button>

          <div className="ml-auto flex items-center gap-1">
            {SPEEDS.map((speed, idx) => (
              <Button
                key={speed.label}
                type="button"
                size="xs"
                variant={speedIdx === idx ? "default" : "outline"}
                onClick={() => setSpeedIdx(idx)}
              >
                {speed.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
        <Legend swatch="border-foreground bg-foreground" label="Comparing" invert />
        <Legend swatch="border-chart-5/50 bg-chart-5/20" label="Swapping" />
        <Legend swatch="border-chart-4/50 bg-chart-4/20" label="Writing" />
        <Legend swatch="border-chart-2/60 bg-chart-2/20" label="Pivot" />
        <Legend swatch="border-chart-1/40 bg-chart-1/15" label="Sorted" />
      </div>
    </div>
  );
}

function Legend({
  swatch,
  label,
  invert = false,
}: {
  swatch: string;
  label: string;
  invert?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "inline-block size-3 rounded-sm border",
          swatch,
          invert && "bg-foreground"
        )}
      />
      {label}
    </span>
  );
}
