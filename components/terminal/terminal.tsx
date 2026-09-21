"use client";

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { profile } from "@/lib/data";
import {
  VDir,
  VFile,
  HOME,
  getNode,
  resolvePath,
  displayPath,
  completePath,
  file as makeFile,
} from "@/lib/terminal/filesystem";
import { TERM_THEMES, DEFAULT_THEME, getTheme } from "@/lib/terminal/themes";
import { BANNER } from "@/lib/terminal/ascii";
import { COMMANDS, GAMES, execute } from "./run-command";
import { VimEditor } from "./vim";
import { SnakeGame } from "./snake";
import { MatrixRain } from "./matrix-rain";
import type { EffectName, InteractiveHandler, TermAPI } from "./types";

const THEME_KEY = "term-theme";
const UNLOCKED_KEY = "term-unlocked-themes";
const HISTORY_KEY = "term-history";

interface Line {
  id: number;
  node: ReactNode;
}

type View =
  | { kind: "shell" }
  | { kind: "vim"; path: string; name: string; content: string; readOnly: boolean }
  | { kind: "snake" };

export function Terminal({ initialFs }: { initialFs: VDir }) {
  const router = useRouter();
  const fsRef = useRef<VDir>(initialFs);

  const [lines, setLines] = useState<Line[]>([]);
  const lineId = useRef(0);

  const [input, setInput] = useState("");
  const [cwd, _setCwd] = useState(HOME);
  const cwdRef = useRef(HOME);
  const [user, _setUser] = useState("guest");
  const userRef = useRef("guest");

  const [themeName, _setThemeName] = useState(DEFAULT_THEME);
  const themeRef = useRef(DEFAULT_THEME);
  const unlockedRef = useRef<string[]>([]);
  const [, setUnlockedVersion] = useState(0);

  const [view, setView] = useState<View>({ kind: "shell" });
  const [effects, setEffects] = useState<Record<EffectName, boolean>>({
    matrix: false,
    crt: false,
    flip: false,
    glitch: false,
  });

  const historyRef = useRef<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const interactiveRef = useRef<InteractiveHandler | null>(null);
  const [interactivePrompt, setInteractivePrompt] = useState<string | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const bootTime = useRef(Date.now());

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ---------- printing ----------
  const print = useCallback((node: ReactNode) => {
    setLines((prev) => [...prev, { id: lineId.current++, node }]);
  }, []);

  const println = useCallback(
    (text = "", cls?: string) => {
      print(
        <div className={`whitespace-pre-wrap break-words ${cls ?? ""}`}>
          {text === "" ? " " : text}
        </div>
      );
    },
    [print]
  );

  const printLines = useCallback(
    (texts: string[], cls?: string) => texts.forEach((l) => println(l, cls)),
    [println]
  );

  const clear = useCallback(() => setLines([]), []);

  // ---------- state setters keeping refs in sync ----------
  const setCwd = useCallback((p: string) => {
    cwdRef.current = p;
    _setCwd(p);
  }, []);

  const setUser = useCallback((u: string) => {
    userRef.current = u;
    _setUser(u);
  }, []);

  const setThemeName = useCallback((n: string) => {
    themeRef.current = n;
    _setThemeName(n);
    try {
      localStorage.setItem(THEME_KEY, n);
    } catch {}
  }, []);

  // ---------- boot ----------
  const booted = useRef(false);
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    try {
      const saved = localStorage.getItem(THEME_KEY);
      const unlocked = JSON.parse(localStorage.getItem(UNLOCKED_KEY) || "[]");
      if (Array.isArray(unlocked)) unlockedRef.current = unlocked;
      if (saved && TERM_THEMES.some((t) => t.name === saved && (!t.hidden || unlocked.includes(saved)))) {
        setThemeName(saved);
      }
      const hist = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      if (Array.isArray(hist)) historyRef.current = hist.slice(-100);
    } catch {}

    print(<pre className="t-acc text-[10px] sm:text-xs leading-tight whitespace-pre overflow-x-auto">{BANNER}</pre>);
    println("");
    print(
      <div>
        <span className="t-ok">ruiOS 2.1.0 LTS</span>
        <span className="t-dim"> — the terminal view of </span>
        <span className="t-cyan">ruivalente.com</span>
      </div>
    );
    println(`${profile.name} · ${profile.role} · ${profile.bio}`, "t-dim");
    println("");
    print(
      <div className="t-dim">
        type <span className="t-warn">help</span> for commands · <span className="t-warn">ls</span> to look
        around · <span className="t-warn">cat README.md</span> for the tour ·{" "}
        <span className="t-warn">gui</span> for the classic site
      </div>
    );
    println("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, view]);

  // refocus when returning to shell
  useEffect(() => {
    if (view.kind === "shell") inputRef.current?.focus();
  }, [view]);

  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), []);

  // ---------- TermAPI ----------
  const api = useMemo<TermAPI>(() => {
    const schedule = (fn: () => void, ms: number) => {
      timeoutsRef.current.push(setTimeout(fn, ms));
    };
    return {
      get fsRoot() {
        return fsRef.current;
      },
      getCwd: () => cwdRef.current,
      setCwd,
      print,
      println,
      printLines,
      clear,
      getUser: () => userRef.current,
      setUser,
      getThemeName: () => themeRef.current,
      setThemeByName: (name: string) => {
        const th = TERM_THEMES.find((t) => t.name === name);
        if (!th) return false;
        if (th.hidden && !unlockedRef.current.includes(name)) return false;
        setThemeName(name);
        return true;
      },
      unlockTheme: (name: string) => {
        if (!unlockedRef.current.includes(name)) {
          unlockedRef.current = [...unlockedRef.current, name];
          setUnlockedVersion((v) => v + 1);
          try {
            localStorage.setItem(UNLOCKED_KEY, JSON.stringify(unlockedRef.current));
          } catch {}
        }
      },
      isThemeUnlocked: (name: string) => unlockedRef.current.includes(name),
      openVim: (absPath: string) => {
        const node = getNode(fsRef.current, absPath);
        const name = absPath.split("/").filter(Boolean).pop() || "untitled";
        setView({
          kind: "vim",
          path: absPath,
          name,
          content: node && node.type === "file" ? node.content : "",
          readOnly: !!(node && node.type === "file" && node.readOnly),
        });
      },
      startSnake: () => setView({ kind: "snake" }),
      setInteractive: (h: InteractiveHandler | null) => {
        interactiveRef.current = h;
        setInteractivePrompt(h ? h.prompt : null);
      },
      toggleEffect: (effect: EffectName, force?: boolean) =>
        setEffects((prev) => ({ ...prev, [effect]: force ?? !prev[effect] })),
      resetEffects: () =>
        setEffects({ matrix: false, crt: false, flip: false, glitch: false }),
      navigate: (route: string) => router.push(route),
      openUrl: (url: string) => window.open(url, "_blank", "noopener,noreferrer"),
      schedule,
      getHistory: () => historyRef.current,
      bootTime: bootTime.current,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- prompt ----------
  const promptNode = (u: string, path: string) => (
    <>
      <span className="t-ok">{u}@rui</span>
      <span className="t-dim">:</span>
      <span className="t-cyan">{displayPath(path)}</span>
      <span className="t-acc">{u === "root" ? "# " : "$ "}</span>
    </>
  );

  const echoInput = useCallback(
    (value: string) => {
      const u = userRef.current;
      const p = cwdRef.current;
      const ip = interactiveRef.current?.prompt ?? null;
      print(
        <div className="whitespace-pre-wrap break-words">
          {ip ? <span className="t-mag">{ip}</span> : promptNode(u, p)}
          {value}
        </div>
      );
    },
    [print]
  );

  // ---------- submit ----------
  const submit = useCallback(
    (value: string) => {
      echoInput(value);
      setInput("");
      setHistoryIndex(-1);
      const handler = interactiveRef.current;
      if (handler) {
        handler.onLine(value);
        return;
      }
      if (value.trim()) {
        historyRef.current = [...historyRef.current, value].slice(-100);
        try {
          localStorage.setItem(HISTORY_KEY, JSON.stringify(historyRef.current));
        } catch {}
        execute(value, api);
      }
    },
    [api, echoInput]
  );

  // ---------- tab completion ----------
  const handleTab = useCallback(() => {
    const val = input;
    if (interactiveRef.current) return;
    const endsWithSpace = /\s$/.test(val);
    const tokens = val.trim() === "" ? [] : val.trim().split(/\s+/);
    if (tokens.length === 0) return;

    const apply = (cands: string[], partial: string, addSpace: boolean, display?: string[]) => {
      if (cands.length === 0) return;
      const replaceLast = (replacement: string) => {
        if (endsWithSpace) return val + replacement;
        const idx = val.lastIndexOf(partial);
        return val.slice(0, idx) + replacement;
      };
      if (cands.length === 1) {
        const c = cands[0];
        setInput(replaceLast(c) + (addSpace && !c.endsWith("/") ? " " : ""));
        return;
      }
      const lcp = cands.reduce((a, b) => {
        let i = 0;
        while (i < a.length && i < b.length && a[i] === b[i]) i++;
        return a.slice(0, i);
      });
      if (lcp.length > partial.length) {
        setInput(replaceLast(lcp));
      } else {
        echoInput(val);
        print(
          <div className="flex flex-wrap gap-x-5 t-dim">
            {(display ?? cands).map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        );
      }
    };

    const completingFirst = tokens.length === 1 && !endsWithSpace;
    if (completingFirst) {
      const prefix = tokens[0].toLowerCase();
      const cands = COMMANDS.filter((c) => !c.hidden && c.name.startsWith(prefix)).map((c) => c.name);
      apply(cands, tokens[0], true);
      return;
    }

    const spec = COMMANDS.find((c) => c.name === tokens[0].toLowerCase());
    if (!spec?.complete) return;
    const partial = endsWithSpace ? "" : tokens[tokens.length - 1];

    if (spec.complete === "theme") {
      const cands = TERM_THEMES.filter((t) => !t.hidden || unlockedRef.current.includes(t.name))
        .map((t) => t.name)
        .filter((n) => n.startsWith(partial.toLowerCase()));
      apply(cands, partial, true);
    } else if (spec.complete === "game") {
      apply(GAMES.filter((g) => g.startsWith(partial.toLowerCase())), partial, true);
    } else if (spec.complete === "command") {
      const cands = COMMANDS.filter((c) => !c.hidden && c.name.startsWith(partial.toLowerCase())).map(
        (c) => c.name
      );
      apply(cands, partial, true);
    } else {
      const cands = completePath(fsRef.current, cwdRef.current, partial, spec.complete === "dir");
      const display = cands.map((c) => c.split("/").filter(Boolean).pop() + (c.endsWith("/") ? "/" : ""));
      apply(cands, partial, true, display);
    }
  }, [input, echoInput, print]);

  // ---------- key handling ----------
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(input);
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTab();
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      const handler = interactiveRef.current;
      echoInput(input + "^C");
      setInput("");
      setHistoryIndex(-1);
      if (handler) {
        interactiveRef.current = null;
        setInteractivePrompt(null);
        handler.onCtrlC?.();
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      clear();
    } else if (e.key === "u" && e.ctrlKey) {
      e.preventDefault();
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (interactiveRef.current) return;
      const h = historyRef.current;
      if (!h.length) return;
      const ni = historyIndex < h.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(ni);
      setInput(h[h.length - 1 - ni] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (interactiveRef.current) return;
      const h = historyRef.current;
      const ni = historyIndex > -1 ? historyIndex - 1 : -1;
      setHistoryIndex(ni);
      setInput(ni === -1 ? "" : h[h.length - 1 - ni] ?? "");
    }
  };

  // ---------- vim save ----------
  const handleVimSave = useCallback((path: string, content: string): string | null => {
    const node = getNode(fsRef.current, path);
    if (node) {
      if (node.type === "dir") return "E17: is a directory";
      if (node.readOnly) return "E45: 'readonly' option is set";
      (node as VFile).content = content;
      return null;
    }
    const segs = path.split("/").filter(Boolean);
    const name = segs.pop()!;
    const parent = getNode(fsRef.current, "/" + segs.join("/"));
    if (!parent || parent.type !== "dir") return "E212: Can't open file for writing";
    parent.children[name] = makeFile(name, content);
    return null;
  }, []);

  const theme = getTheme(themeName);
  const cssVars = {
    "--t-bg": theme.colors.bg,
    "--t-fg": theme.colors.fg,
    "--t-dim": theme.colors.dim,
    "--t-accent": theme.colors.accent,
    "--t-green": theme.colors.green,
    "--t-red": theme.colors.red,
    "--t-yellow": theme.colors.yellow,
    "--t-cyan": theme.colors.cyan,
    "--t-magenta": theme.colors.magenta,
    "--t-selection": theme.colors.selection,
  } as React.CSSProperties;

  const rootClasses = [
    "term-root fixed inset-0 z-[100] flex flex-col text-sm",
    effects.crt ? "term-crt" : "",
    effects.flip ? "term-flip" : "",
    effects.glitch ? "term-glitch" : "",
  ].join(" ");

  return (
    <div className={rootClasses} style={cssVars}>
      {/* title bar */}
      <div
        className="shrink-0 flex items-center gap-2 px-3 py-2 border-b select-none"
        style={{ borderColor: "var(--t-selection)" }}
      >
        <span className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </span>
        <span className="t-dim text-xs flex-1 text-center truncate">
          {user}@ruivalente.com — {displayPath(cwd)} — rsh
        </span>
        <button
          onClick={() => router.push("/")}
          className="t-dim text-xs hover:underline"
          title="back to the classic website"
        >
          [gui]
        </button>
      </div>

      {/* main area */}
      <div className="relative flex-1 min-h-0">
        {effects.matrix && <MatrixRain color={theme.colors.green} />}

        {view.kind === "shell" && (
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto term-scrollbar px-3 py-2 cursor-text"
            onClick={() => {
              if (!window.getSelection()?.toString()) inputRef.current?.focus();
            }}
          >
            {lines.map((l) => (
              <div key={l.id}>{l.node}</div>
            ))}
            <div className="flex items-baseline whitespace-pre-wrap">
              <span className="shrink-0">
                {interactivePrompt ? (
                  <span className="t-mag">{interactivePrompt}</span>
                ) : (
                  promptNode(user, cwd)
                )}
              </span>
              <input
                ref={inputRef}
                className="term-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoFocus
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                aria-label="terminal input"
              />
            </div>
          </div>
        )}

        {view.kind === "vim" && (
          <VimEditor
            filename={view.name}
            content={view.content}
            readOnly={view.readOnly}
            onSave={(content) => handleVimSave(view.path, content)}
            onExit={() => {
              setView({ kind: "shell" });
              println("");
            }}
          />
        )}

        {view.kind === "snake" && (
          <SnakeGame
            onExit={(score, hi) => {
              setView({ kind: "shell" });
              println(`snake: final score ${score} · best ${hi}`, "t-warn");
            }}
          />
        )}
      </div>

      {/* hint bar */}
      <div
        className="shrink-0 px-3 py-1 border-t text-[10px] t-dim flex justify-between gap-2 select-none"
        style={{ borderColor: "var(--t-selection)" }}
      >
        <span className="truncate">
          help · tab completes · ↑↓ history · games: {GAMES.join(" ")} · theme {theme.name}
        </span>
        <span className="hidden sm:inline shrink-0">ruivalente.com/terminal</span>
      </div>
    </div>
  );
}
