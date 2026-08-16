"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query the way React 19 wants external state read:
 * through `useSyncExternalStore` rather than `useState` + `useEffect`.
 *
 * The effect-and-setState version of this triggers a cascading render on mount
 * (and `react-hooks/set-state-in-effect` rightly rejects it). This version also
 * gives a correct, explicit server snapshot instead of guessing.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverValue, [serverValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True only after hydration. Server and first client render both return false. */
const subscribeToNothing = () => () => {};

export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

/**
 * The motion gate used across the site. Defaults to `true` on the server so
 * nothing animation-dependent renders in a pre-animation state during SSR.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", true);
}
