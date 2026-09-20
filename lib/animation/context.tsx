"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AnimationContextType {
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  toggleAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

const STORAGE_KEY = "ruivalente_block_animations";

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [animationsEnabled, setAnimationsEnabledState] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setAnimationsEnabledState(stored === "true");
      } else if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setAnimationsEnabledState(false);
      }
    } catch {
      // Ignore localStorage read errors
    }
    setMounted(true);
  }, []);

  const setAnimationsEnabled = (enabled: boolean) => {
    setAnimationsEnabledState(enabled);
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
    } catch {
      // Ignore localStorage write errors
    }
  };

  const toggleAnimations = () => {
    setAnimationsEnabled(!animationsEnabled);
  };

  return (
    <AnimationContext.Provider
      value={{
        animationsEnabled,
        setAnimationsEnabled,
        toggleAnimations,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation(): AnimationContextType {
  const context = useContext(AnimationContext);
  if (!context) {
    return {
      animationsEnabled: true,
      setAnimationsEnabled: () => {},
      toggleAnimations: () => {},
    };
  }
  return context;
}
