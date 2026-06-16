"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      themes={[
        "light",
        "dark",
        "glass",
        "midnight",
        "dark-side",
        "pink",
        "dracula",
        "retro",
        "cyberpunk",
        "forest",
        "sunset",
        "nord",
        "gruvbox",
        "solarized",
        "synthwave",
        "terminal",
        "system"
      ]}
    >
      {children}
    </NextThemesProvider>
  );
}