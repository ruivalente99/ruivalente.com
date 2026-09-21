"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface TerminalWindowContextValue {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  openTerminal: (options?: { cwd?: string; command?: string }) => void;
  closeTerminal: () => void;
  minimizeTerminal: () => void;
  restoreTerminal: () => void;
  maximizeTerminal: () => void;
  toggleTerminal: () => void;
  pendingCommand: string | null;
  consumePendingCommand: () => string | null;
}

const TerminalWindowContext = createContext<TerminalWindowContextValue | null>(null);

export function TerminalWindowProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [pendingCommand, setPendingCommand] = useState<string | null>(null);

  const openTerminal = useCallback((options?: { cwd?: string; command?: string }) => {
    setIsOpen(true);
    setIsMinimized(false);
    if (options?.command) {
      setPendingCommand(options.command);
    }
  }, []);

  const closeTerminal = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const minimizeTerminal = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const restoreTerminal = useCallback(() => {
    setIsMinimized(false);
    setIsOpen(true);
  }, []);

  const maximizeTerminal = useCallback(() => {
    setIsMaximized((prev) => !prev);
  }, []);

  const toggleTerminal = useCallback(() => {
    setIsOpen((prevOpen) => {
      if (!prevOpen) {
        setIsMinimized(false);
        return true;
      }
      if (isMinimized) {
        setIsMinimized(false);
        return true;
      }
      return false;
    });
  }, [isMinimized]);

  const consumePendingCommand = useCallback(() => {
    const cmd = pendingCommand;
    setPendingCommand(null);
    return cmd;
  }, [pendingCommand]);

  // Global hotkey: Ctrl+` or Cmd+` toggles terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        toggleTerminal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTerminal]);

  return (
    <TerminalWindowContext.Provider
      value={{
        isOpen,
        isMinimized,
        isMaximized,
        openTerminal,
        closeTerminal,
        minimizeTerminal,
        restoreTerminal,
        maximizeTerminal,
        toggleTerminal,
        pendingCommand,
        consumePendingCommand,
      }}
    >
      {children}
    </TerminalWindowContext.Provider>
  );
}

export function useTerminalWindow() {
  const context = useContext(TerminalWindowContext);
  if (!context) {
    throw new Error("useTerminalWindow must be used within a TerminalWindowProvider");
  }
  return context;
}
