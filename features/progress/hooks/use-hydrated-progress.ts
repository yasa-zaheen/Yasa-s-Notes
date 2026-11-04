"use client";

// Imports
import { useEffect } from "react";

import { useProgressStore } from "../store";

// Hook
export function useHydratedProgress() {
  const hasHydrated = useProgressStore((state) => state.hasHydrated);
  const setHasHydrated = useProgressStore((state) => state.setHasHydrated);

  useEffect(() => {
    const persistApi = useProgressStore.persist;

    const finish = () => {
      setHasHydrated();
    };

    if (persistApi.hasHydrated()) {
      finish();
      return;
    }

    const unsub = persistApi.onFinishHydration(finish);
    void persistApi.rehydrate();
    return unsub;
  }, [setHasHydrated]);

  return hasHydrated;
}
