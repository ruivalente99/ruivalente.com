"use client";

import { createContext, useContext } from "react";

const InitialDataContext = createContext<Record<string, unknown>>({});

export function InitialDataProvider({
  value,
  children,
}: {
  value: Record<string, unknown>;
  children: React.ReactNode;
}) {
  return <InitialDataContext.Provider value={value}>{children}</InitialDataContext.Provider>;
}

export function useInitialData(): Record<string, unknown> {
  return useContext(InitialDataContext);
}
