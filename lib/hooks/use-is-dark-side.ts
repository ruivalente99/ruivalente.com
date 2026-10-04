"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * True only after mount when the secret dark-side theme is active.
 *
 * The theme lives in localStorage, so the server (and the first client render)
 * can never know it. Gating on mount keeps the first client render identical
 * to the server HTML and avoids hydration mismatches.
 */
export function useIsDarkSide(): boolean {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && theme === "dark-side";
}
