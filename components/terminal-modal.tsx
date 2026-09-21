"use client";

import { useEffect } from "react";
import { useTerminalWindow } from "./terminal/terminal-window-context";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const { openTerminal, closeTerminal, isOpen: windowIsOpen } = useTerminalWindow();

  useEffect(() => {
    if (isOpen) {
      openTerminal();
    }
  }, [isOpen, openTerminal]);

  useEffect(() => {
    if (!windowIsOpen && isOpen) {
      onClose();
    }
  }, [windowIsOpen, isOpen, onClose]);

  return null;
}