import type { ReactNode } from "react";
import type { VDir } from "@/lib/terminal/filesystem";

/** When set, the next input line is fed to the handler instead of the shell. */
export interface InteractiveHandler {
  prompt: string;
  onLine: (line: string) => void;
  onCtrlC?: () => void;
}

export type EffectName = "matrix" | "crt" | "flip" | "glitch";

/** Everything a command needs to talk back to the terminal. */
export interface TermAPI {
  fsRoot: VDir;
  getCwd(): string;
  setCwd(path: string): void;
  print(node: ReactNode): void;
  println(text?: string, cls?: string): void;
  printLines(lines: string[], cls?: string): void;
  clear(): void;
  getUser(): string;
  setUser(user: string): void;
  getThemeName(): string;
  /** returns false if the theme doesn't exist or is still locked */
  setThemeByName(name: string): boolean;
  unlockTheme(name: string): void;
  isThemeUnlocked(name: string): boolean;
  openVim(path: string): void;
  startSnake(): void;
  setInteractive(handler: InteractiveHandler | null): void;
  toggleEffect(effect: EffectName, force?: boolean): void;
  resetEffects(): void;
  navigate(route: string): void;
  openUrl(url: string): void;
  /** setTimeout that is cancelled if the user hits Ctrl+C / unmounts */
  schedule(fn: () => void, ms: number): void;
  getHistory(): string[];
  bootTime: number;
}
