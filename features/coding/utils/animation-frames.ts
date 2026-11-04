import type { AnimFrame, SortAlgorithmId } from "../types";

function clone(arr: number[]) {
  return [...arr];
}

function frame(
  array: number[],
  message: string,
  highlights: AnimFrame["highlights"] = {}
): AnimFrame {
  return { array: clone(array), message, highlights };
}

function selectionFrames(input: number[]): AnimFrame[] {
  const a = clone(input);
  const frames: AnimFrame[] = [frame(a, "Start Selection Sort")];
  const n = a.length;

  for (let i = 0; i < n; i += 1) {
    let min = i;
    frames.push(
      frame(a, `Outer pass i=${i}: find minimum in unsorted suffix`, {
        sorted: Array.from({ length: i }, (_, idx) => idx),
        comparing: [i],
      })
    );

    for (let j = i + 1; j < n; j += 1) {
      frames.push(
        frame(a, `Compare A[${j}]=${a[j]} with current min A[${min}]=${a[min]}`, {
          sorted: Array.from({ length: i }, (_, idx) => idx),
          comparing: [j, min],
        })
      );
      if (a[j]! < a[min]!) {
        min = j;
        frames.push(
          frame(a, `New minimum at index ${min}`, {
            sorted: Array.from({ length: i }, (_, idx) => idx),
            writing: [min],
          })
        );
      }
    }

    if (min !== i) {
      frames.push(
        frame(a, `Swap A[${i}]=${a[i]} with A[${min}]=${a[min]}`, {
          swapping: [i, min],
          sorted: Array.from({ length: i }, (_, idx) => idx),
        })
      );
      [a[i], a[min]] = [a[min]!, a[i]!];
    }

    frames.push(
      frame(a, `Prefix [0..${i}] is in final position`, {
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      })
    );
  }

  frames.push(frame(a, "Selection Sort complete", { sorted: a.map((_, i) => i) }));
  return frames;
}

function insertionFrames(input: number[]): AnimFrame[] {
  const a = clone(input);
  const frames: AnimFrame[] = [frame(a, "Start Insertion Sort")];

  for (let i = 1; i < a.length; i += 1) {
    const key = a[i]!;
    let j = i - 1;
    frames.push(
      frame(a, `Insert key=${key} from index ${i}`, {
        sorted: Array.from({ length: i }, (_, idx) => idx),
        writing: [i],
      })
    );

    while (j >= 0 && a[j]! > key) {
      frames.push(
        frame(a, `Shift A[${j}]=${a[j]} right`, {
          comparing: [j],
          swapping: [j + 1],
          sorted: Array.from({ length: i }, (_, idx) => idx),
        })
      );
      a[j + 1] = a[j]!;
      j -= 1;
    }

    a[j + 1] = key;
    frames.push(
      frame(a, `Place key=${key} at index ${j + 1}`, {
        writing: [j + 1],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      })
    );
  }

  frames.push(frame(a, "Insertion Sort complete", { sorted: a.map((_, i) => i) }));
  return frames;
}

function bubbleFrames(input: number[]): AnimFrame[] {
  const a = clone(input);
  const frames: AnimFrame[] = [frame(a, "Start Bubble Sort")];
  const n = a.length;

  for (let i = 0; i < n; i += 1) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j += 1) {
      frames.push(
        frame(a, `Compare adjacent A[${j}]=${a[j]} and A[${j + 1}]=${a[j + 1]}`, {
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
        })
      );
      if (a[j]! > a[j + 1]!) {
        frames.push(
          frame(a, `Swap out-of-order pair`, {
            swapping: [j, j + 1],
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
          })
        );
        [a[j], a[j + 1]] = [a[j + 1]!, a[j]!];
        swapped = true;
      }
    }
    frames.push(
      frame(a, swapped ? `End of pass ${i}` : `No swaps — array sorted, early exit`, {
        sorted: Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx),
      })
    );
    if (!swapped) {
      break;
    }
  }

  frames.push(frame(a, "Bubble Sort complete", { sorted: a.map((_, i) => i) }));
  return frames;
}

function mergeFrames(input: number[]): AnimFrame[] {
  const frames: AnimFrame[] = [frame(input, "Start Merge Sort — divide by position")];
  const a = clone(input);

  function mergeSort(lo: number, hi: number) {
    if (hi - lo <= 1) {
      frames.push(
        frame(a, `Base case: subarray [${lo}..${hi - 1}]`, {
          writing: hi > lo ? [lo] : [],
        })
      );
      return;
    }

    const mid = Math.floor((lo + hi) / 2);
    frames.push(
      frame(a, `Split [${lo}..${hi - 1}] at mid=${mid}`, {
        left: Array.from({ length: mid - lo }, (_, i) => lo + i),
        right: Array.from({ length: hi - mid }, (_, i) => mid + i),
      })
    );
    mergeSort(lo, mid);
    mergeSort(mid, hi);

    const left = a.slice(lo, mid);
    const right = a.slice(mid, hi);
    let i = 0;
    let j = 0;
    let k = lo;

    while (i < left.length && j < right.length) {
      frames.push(
        frame(a, `Merge: compare ${left[i]} and ${right[j]}`, {
          comparing: [lo + i, mid + j].filter((idx) => idx < hi),
          left: Array.from({ length: left.length - i }, (_, t) => lo + i + t),
          right: Array.from({ length: right.length - j }, (_, t) => mid + j + t),
        })
      );
      if (left[i]! <= right[j]!) {
        a[k] = left[i]!;
        frames.push(frame(a, `Write ${left[i]} into result`, { writing: [k] }));
        i += 1;
      } else {
        a[k] = right[j]!;
        frames.push(frame(a, `Write ${right[j]} into result`, { writing: [k] }));
        j += 1;
      }
      k += 1;
    }

    while (i < left.length) {
      a[k] = left[i]!;
      frames.push(frame(a, `Drain left: write ${left[i]}`, { writing: [k] }));
      i += 1;
      k += 1;
    }
    while (j < right.length) {
      a[k] = right[j]!;
      frames.push(frame(a, `Drain right: write ${right[j]}`, { writing: [k] }));
      j += 1;
      k += 1;
    }

    frames.push(
      frame(a, `Merged range [${lo}..${hi - 1}]`, {
        sorted: Array.from({ length: hi - lo }, (_, t) => lo + t),
      })
    );
  }

  mergeSort(0, a.length);
  frames.push(frame(a, "Merge Sort complete", { sorted: a.map((_, i) => i) }));
  return frames;
}

function quickFrames(input: number[]): AnimFrame[] {
  const a = clone(input);
  const frames: AnimFrame[] = [frame(a, "Start Quick Sort — split by value (pivot = first)")];

  function partition(lo: number, hi: number) {
    const pivot = a[lo]!;
    let j = lo;
    frames.push(
      frame(a, `Partition [${lo}..${hi}] with pivot=${pivot}`, {
        pivot: lo,
        left: Array.from({ length: hi - lo + 1 }, (_, i) => lo + i),
      })
    );

    for (let i = lo + 1; i <= hi; i += 1) {
      frames.push(
        frame(a, `Compare A[${i}]=${a[i]} with pivot ${pivot}`, {
          pivot: lo,
          comparing: [i],
        })
      );
      if (pivot > a[i]!) {
        j += 1;
        frames.push(
          frame(a, `${a[i]} < pivot — move left via swap with index ${j}`, {
            pivot: lo,
            swapping: [i, j],
          })
        );
        [a[i], a[j]] = [a[j]!, a[i]!];
      }
    }

    frames.push(
      frame(a, `Place pivot at index ${j}`, {
        swapping: [lo, j],
        pivot: j,
      })
    );
    [a[lo], a[j]] = [a[j]!, a[lo]!];
    frames.push(
      frame(a, `Pivot ${pivot} is in final position ${j}`, {
        sorted: [j],
        pivot: j,
      })
    );
    return j;
  }

  function quick(lo: number, hi: number) {
    if (lo > hi) {
      return;
    }
    if (lo === hi) {
      frames.push(frame(a, `Base case: single element at ${lo}`, { sorted: [lo] }));
      return;
    }
    const p = partition(lo, hi);
    quick(lo, p - 1);
    quick(p + 1, hi);
  }

  quick(0, a.length - 1);
  frames.push(frame(a, "Quick Sort complete", { sorted: a.map((_, i) => i) }));
  return frames;
}

function mergeArraysFrames(input: number[]): AnimFrame[] {
  // Treat even split of seed as two sorted halves after sorting each half.
  const mid = Math.floor(input.length / 2);
  const left = [...input.slice(0, mid)].sort((x, y) => x - y);
  const right = [...input.slice(mid)].sort((x, y) => x - y);
  const frames: AnimFrame[] = [
    frame([...left, ...right], `Merge sorted halves [${left.join(", ")}] and [${right.join(", ")}]`),
  ];
  const out: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    const display = [...out, ...left.slice(i), ...right.slice(j)];
    frames.push(
      frame(display, `Compare ${left[i]} and ${right[j]}`, {
        comparing: [out.length, out.length + (left.length - i > 0 ? 0 : 0)],
        left: Array.from({ length: left.length - i }, (_, t) => out.length + t),
        right: Array.from(
          { length: right.length - j },
          (_, t) => out.length + (left.length - i) + t
        ),
      })
    );
    if (left[i]! <= right[j]!) {
      out.push(left[i]!);
      i += 1;
    } else {
      out.push(right[j]!);
      j += 1;
    }
    frames.push(frame([...out, ...left.slice(i), ...right.slice(j)], `Write next merged value`, {
      writing: [out.length - 1],
    }));
  }

  while (i < left.length) {
    out.push(left[i]!);
    i += 1;
    frames.push(frame([...out, ...left.slice(i), ...right.slice(j)], "Drain left", {
      writing: [out.length - 1],
    }));
  }
  while (j < right.length) {
    out.push(right[j]!);
    j += 1;
    frames.push(frame([...out, ...left.slice(i), ...right.slice(j)], "Drain right", {
      writing: [out.length - 1],
    }));
  }

  frames.push(frame(out, "Merge complete", { sorted: out.map((_, idx) => idx) }));
  return frames;
}

function partitionOnlyFrames(input: number[]): AnimFrame[] {
  const a = clone(input);
  const frames: AnimFrame[] = [frame(a, "Partition around first element as pivot")];
  const lo = 0;
  const hi = a.length - 1;
  const pivot = a[lo]!;
  let j = lo;

  for (let i = lo + 1; i <= hi; i += 1) {
    frames.push(frame(a, `Compare A[${i}]=${a[i]} with pivot ${pivot}`, { pivot: lo, comparing: [i] }));
    if (pivot > a[i]!) {
      j += 1;
      frames.push(frame(a, `Swap into left region at ${j}`, { pivot: lo, swapping: [i, j] }));
      [a[i], a[j]] = [a[j]!, a[i]!];
    }
  }

  frames.push(frame(a, `Swap pivot into index ${j}`, { swapping: [lo, j] }));
  [a[lo], a[j]] = [a[j]!, a[lo]!];
  frames.push(
    frame(a, `Done. Left of pivot < ${pivot}, right > ${pivot}`, {
      pivot: j,
      sorted: [j],
    })
  );
  return frames;
}

export function buildAnimationFrames(algorithm: SortAlgorithmId, seed: number[]) {
  switch (algorithm) {
    case "selection_sort":
      return selectionFrames(seed);
    case "insertion_sort":
      return insertionFrames(seed);
    case "bubble_sort":
      return bubbleFrames(seed);
    case "merge_sort":
      return mergeFrames(seed);
    case "quick_sort":
      return quickFrames(seed);
    case "merge_arrays":
      return mergeArraysFrames(seed);
    case "partition":
      return partitionOnlyFrames(seed);
    default:
      return [frame(seed, "No animation for this algorithm")];
  }
}
