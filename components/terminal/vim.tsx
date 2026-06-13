"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type Mode = "normal" | "insert" | "command";

interface VimProps {
  filename: string;
  content: string;
  readOnly?: boolean;
  /** returns an error message, or null on success */
  onSave: (content: string) => string | null;
  onExit: () => void;
}

interface Snapshot {
  lines: string[];
  row: number;
  col: number;
}

export function VimEditor({ filename, content, readOnly, onSave, onExit }: VimProps) {
  const [lines, setLines] = useState<string[]>(() => {
    const l = content.split("\n");
    return l.length ? l : [""];
  });
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [mode, setMode] = useState<Mode>("normal");
  const [cmdline, setCmdline] = useState("");
  const [message, setMessage] = useState(
    `"${filename}" ${content.split("\n").length}L — :q quit · :wq save · i insert · /search`
  );
  const [modified, setModified] = useState(false);
  const [showNumbers, setShowNumbers] = useState(true);

  const pending = useRef<string>("");
  const undoStack = useRef<Snapshot[]>([]);
  const yankBuf = useRef<string[] | null>(null);
  const searchTerm = useRef("");
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  useEffect(() => {
    cursorRef.current?.scrollIntoView({ block: "nearest" });
  }, [row, col, mode, lines]);

  const clampCol = useCallback(
    (r: number, c: number, insert: boolean) => {
      const len = (lines[r] ?? "").length;
      const max = insert ? len : Math.max(0, len - 1);
      return Math.max(0, Math.min(c, max));
    },
    [lines]
  );

  const snapshot = useCallback(() => {
    undoStack.current.push({ lines: [...lines], row, col });
    if (undoStack.current.length > 200) undoStack.current.shift();
  }, [lines, row, col]);

  const mutate = useCallback(
    (newLines: string[], r?: number, c?: number) => {
      setLines(newLines.length ? newLines : [""]);
      setModified(true);
      if (r !== undefined) setRow(Math.max(0, Math.min(r, newLines.length - 1)));
      if (c !== undefined) setCol(Math.max(0, c));
    },
    []
  );

  const moveTo = useCallback(
    (r: number, c: number, insert = false) => {
      const nr = Math.max(0, Math.min(r, lines.length - 1));
      setRow(nr);
      setCol(clampCol(nr, c, insert));
    },
    [lines, clampCol]
  );

  const wordJump = useCallback(
    (forward: boolean, end: boolean) => {
      const text = lines[row] ?? "";
      const isWord = (ch: string | undefined) => !!ch && /\w/.test(ch);
      if (forward) {
        let idx = -1;
        for (let i = col + 1; i < text.length; i++) {
          if (end) {
            if (isWord(text[i]) && !isWord(text[i + 1])) { idx = i; break; }
          } else if (isWord(text[i]) && !isWord(text[i - 1])) { idx = i; break; }
        }
        if (idx >= 0) moveTo(row, idx);
        else if (row < lines.length - 1) moveTo(row + 1, 0);
      } else {
        const before = text.slice(0, col);
        const m = before.match(/\w+\W*$/);
        if (m && m.index !== undefined) moveTo(row, m.index);
        else if (row > 0) moveTo(row - 1, Math.max(0, (lines[row - 1] ?? "").length - 1));
      }
    },
    [lines, row, col, moveTo]
  );

  const doSearch = useCallback(
    (term: string, fromRow: number, fromCol: number, backward = false) => {
      if (!term) return false;
      const total = lines.length;
      for (let i = 0; i <= total; i++) {
        const r = backward
          ? (fromRow - i + total * 2) % total
          : (fromRow + i) % total;
        const line = lines[r] ?? "";
        let idx: number;
        if (i === 0) {
          idx = backward
            ? line.lastIndexOf(term, fromCol - 1)
            : line.indexOf(term, fromCol + 1);
        } else {
          idx = backward ? line.lastIndexOf(term) : line.indexOf(term);
        }
        if (idx >= 0) {
          moveTo(r, idx);
          setMessage(`/${term}`);
          return true;
        }
      }
      setMessage(`E486: Pattern not found: ${term}`);
      return false;
    },
    [lines, moveTo]
  );

  const runExCommand = useCallback(
    (cmd: string) => {
      const c = cmd.trim();
      if (c === "q" || c === "q!" || c === "qa" || c === "qa!") {
        if (c === "q" && modified) {
          setMessage("E37: No write since last change (add ! to override)");
          return;
        }
        onExit();
      } else if (c === "w" || c === "wq" || c === "x" || c === "wq!") {
        if (readOnly) {
          setMessage(`E45: 'readonly' option is set for "${filename}"`);
          return;
        }
        const err = onSave(lines.join("\n"));
        if (err) {
          setMessage(err);
          return;
        }
        setModified(false);
        setMessage(`"${filename}" ${lines.length}L written (in-memory — refresh resets it)`);
        if (c !== "w") onExit();
      } else if (c === "set nu" || c === "set number") {
        setShowNumbers(true);
      } else if (c === "set nonu" || c === "set nonumber") {
        setShowNumbers(false);
      } else if (/^\d+$/.test(c)) {
        moveTo(parseInt(c, 10) - 1, 0);
      } else if (c === "help" || c === "h") {
        setMessage("movement: hjkl w b 0 $ gg G · edit: i a o x dd yy p u · :w :q :wq · /search n N");
      } else if (c === "smile") {
        setMessage("=^.^=  have a nice day!");
      } else if (c === "") {
        // no-op
      } else {
        setMessage(`E492: Not an editor command: ${c}`);
      }
    },
    [modified, lines, filename, readOnly, onSave, onExit, moveTo]
  );

  const handleNormalKey = useCallback(
    (e: React.KeyboardEvent) => {
      const k = e.key;

      // pending two-key combos: dd, yy, gg
      if (pending.current) {
        const p = pending.current;
        pending.current = "";
        if (p === "d" && k === "d") {
          snapshot();
          yankBuf.current = [lines[row]];
          const nl = lines.filter((_, i) => i !== row);
          mutate(nl, Math.min(row, Math.max(0, nl.length - 1)), 0);
          setMessage("1 line deleted");
          return;
        }
        if (p === "y" && k === "y") {
          yankBuf.current = [lines[row]];
          setMessage("1 line yanked");
          return;
        }
        if (p === "g" && k === "g") {
          moveTo(0, 0);
          return;
        }
        // fall through: treat current key normally
      }

      if (k === "d" || k === "y" || k === "g") {
        pending.current = k;
        return;
      }

      switch (k) {
        case "h": case "ArrowLeft": moveTo(row, col - 1); break;
        case "l": case "ArrowRight": moveTo(row, col + 1); break;
        case "j": case "ArrowDown": moveTo(row + 1, col); break;
        case "k": case "ArrowUp": moveTo(row - 1, col); break;
        case "0": case "Home": moveTo(row, 0); break;
        case "$": case "End": moveTo(row, Math.max(0, (lines[row] ?? "").length - 1)); break;
        case "^": moveTo(row, Math.max(0, (lines[row] ?? "").search(/\S/))); break;
        case "w": wordJump(true, false); break;
        case "e": wordJump(true, true); break;
        case "b": wordJump(false, false); break;
        case "G": moveTo(lines.length - 1, 0); break;
        case "i": snapshot(); setMode("insert"); setMessage("-- INSERT --"); break;
        case "I": snapshot(); moveTo(row, Math.max(0, (lines[row] ?? "").search(/\S/)), true); setMode("insert"); setMessage("-- INSERT --"); break;
        case "a": snapshot(); setCol(clampCol(row, col + 1, true)); setMode("insert"); setMessage("-- INSERT --"); break;
        case "A": snapshot(); setCol((lines[row] ?? "").length); setMode("insert"); setMessage("-- INSERT --"); break;
        case "o": {
          snapshot();
          const nl = [...lines];
          nl.splice(row + 1, 0, "");
          mutate(nl, row + 1, 0);
          setMode("insert");
          setMessage("-- INSERT --");
          break;
        }
        case "O": {
          snapshot();
          const nl = [...lines];
          nl.splice(row, 0, "");
          mutate(nl, row, 0);
          setMode("insert");
          setMessage("-- INSERT --");
          break;
        }
        case "x": {
          const line = lines[row] ?? "";
          if (!line) break;
          snapshot();
          const nl = [...lines];
          nl[row] = line.slice(0, col) + line.slice(col + 1);
          mutate(nl, row, clampCol(row, col, false));
          break;
        }
        case "D": {
          snapshot();
          const nl = [...lines];
          nl[row] = (lines[row] ?? "").slice(0, col);
          mutate(nl, row, Math.max(0, col - 1));
          break;
        }
        case "p": case "P": {
          if (!yankBuf.current) break;
          snapshot();
          const nl = [...lines];
          const at = k === "p" ? row + 1 : row;
          nl.splice(at, 0, ...yankBuf.current);
          mutate(nl, at, 0);
          break;
        }
        case "u": {
          const snap = undoStack.current.pop();
          if (snap) {
            setLines(snap.lines);
            setRow(snap.row);
            setCol(snap.col);
            setMessage("undo");
          } else {
            setMessage("Already at oldest change");
          }
          break;
        }
        case "n": doSearch(searchTerm.current, row, col); break;
        case "N": doSearch(searchTerm.current, row, col, true); break;
        case ":": setMode("command"); setCmdline(":"); break;
        case "/": setMode("command"); setCmdline("/"); break;
        case "Escape": pending.current = ""; setMessage(""); break;
        default:
          if (k === "d" && e.ctrlKey) moveTo(row + 10, col);
          break;
      }
      if (e.ctrlKey && k === "d") moveTo(row + 10, col);
      if (e.ctrlKey && k === "u") moveTo(row - 10, col);
    },
    [lines, row, col, moveTo, clampCol, mutate, snapshot, wordJump, doSearch]
  );

  const handleInsertKey = useCallback(
    (e: React.KeyboardEvent) => {
      const k = e.key;
      if (k === "Escape") {
        setMode("normal");
        setCol((c) => clampCol(row, c - 1, false));
        setMessage("");
        return;
      }
      const line = lines[row] ?? "";
      if (k === "Enter") {
        const nl = [...lines];
        nl.splice(row, 1, line.slice(0, col), line.slice(col));
        mutate(nl, row + 1, 0);
      } else if (k === "Backspace") {
        if (col > 0) {
          const nl = [...lines];
          nl[row] = line.slice(0, col - 1) + line.slice(col);
          mutate(nl, row, col - 1);
        } else if (row > 0) {
          const prev = lines[row - 1] ?? "";
          const nl = [...lines];
          nl.splice(row - 1, 2, prev + line);
          mutate(nl, row - 1, prev.length);
        }
      } else if (k === "Tab") {
        const nl = [...lines];
        nl[row] = line.slice(0, col) + "  " + line.slice(col);
        mutate(nl, row, col + 2);
      } else if (k === "ArrowLeft") setCol((c) => Math.max(0, c - 1));
      else if (k === "ArrowRight") setCol((c) => Math.min(line.length, c + 1));
      else if (k === "ArrowUp") moveTo(row - 1, col, true);
      else if (k === "ArrowDown") moveTo(row + 1, col, true);
      else if (k.length === 1 && !e.ctrlKey && !e.metaKey) {
        const nl = [...lines];
        nl[row] = line.slice(0, col) + k + line.slice(col);
        mutate(nl, row, col + 1);
      }
    },
    [lines, row, col, clampCol, mutate, moveTo]
  );

  const handleCommandKey = useCallback(
    (e: React.KeyboardEvent) => {
      const k = e.key;
      if (k === "Escape") {
        setMode("normal");
        setCmdline("");
      } else if (k === "Enter") {
        const c = cmdline;
        setMode("normal");
        setCmdline("");
        if (c.startsWith(":")) runExCommand(c.slice(1));
        else if (c.startsWith("/")) {
          searchTerm.current = c.slice(1);
          doSearch(searchTerm.current, row, col);
        }
      } else if (k === "Backspace") {
        setCmdline((c) => {
          if (c.length <= 1) {
            setMode("normal");
            return "";
          }
          return c.slice(0, -1);
        });
      } else if (k.length === 1 && !e.ctrlKey && !e.metaKey) {
        setCmdline((c) => c + k);
      }
    },
    [cmdline, runExCommand, doSearch, row, col]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (mode === "normal") handleNormalKey(e);
    else if (mode === "insert") handleInsertKey(e);
    else handleCommandKey(e);
  };

  const gutterWidth = String(lines.length).length;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onBlur={() => containerRef.current?.focus()}
      className="flex flex-col h-full outline-none text-sm"
    >
      <div className="flex-1 overflow-y-auto term-scrollbar leading-snug">
        {lines.map((line, r) => (
          <div key={r} className="whitespace-pre-wrap break-all flex">
            {showNumbers && (
              <span className="t-dim select-none shrink-0 pr-3 text-right" style={{ width: `${gutterWidth + 2}ch` }}>
                {r + 1}
              </span>
            )}
            <span className="whitespace-pre-wrap break-all">
              {r === row ? renderCursorLine(line, col, mode, cursorRef) : line || " "}
            </span>
          </div>
        ))}
        {Array.from({ length: Math.max(0, 3) }).map((_, i) => (
          <div key={`tilde-${i}`} className="t-dim select-none">~</div>
        ))}
      </div>
      <div
        className="shrink-0 flex justify-between px-2 py-0.5 text-xs"
        style={{ background: "var(--t-selection)" }}
      >
        <span>
          <span className={mode === "insert" ? "t-warn" : "t-acc"}>
            {mode === "insert" ? "-- INSERT --" : mode === "command" ? "" : "NORMAL"}
          </span>{" "}
          <span className="t-dim">
            {filename}
            {modified ? " [+]" : ""}
            {readOnly ? " [RO]" : ""}
          </span>
        </span>
        <span className="t-dim">
          {row + 1},{col + 1} · {Math.round(((row + 1) / lines.length) * 100)}%
        </span>
      </div>
      <div className="shrink-0 px-2 h-5 text-xs">
        {mode === "command" ? (
          <span>
            {cmdline}
            <span className="term-block-cursor" />
          </span>
        ) : (
          <span className="t-dim">{message}</span>
        )}
      </div>
    </div>
  );
}

function renderCursorLine(
  line: string,
  col: number,
  mode: Mode,
  cursorRef: React.RefObject<HTMLSpanElement>
) {
  const c = Math.min(col, Math.max(0, line.length));
  const before = line.slice(0, c);
  const at = line[c] ?? " ";
  const after = line.slice(c + 1);
  return (
    <>
      {before}
      <span ref={cursorRef} className={mode === "insert" ? "vim-cursor-insert" : "vim-cursor"}>
        {at}
      </span>
      {after}
    </>
  );
}
