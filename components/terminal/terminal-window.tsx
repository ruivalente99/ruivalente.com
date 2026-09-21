"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Terminal as TerminalIcon,
  Plus,
  X,
  Minus,
  Maximize2,
  Minimize2,
  Palette,
  ExternalLink,
} from "lucide-react";
import { useTerminalWindow } from "./terminal-window-context";
import { TerminalTabSession } from "./terminal-tab-session";
import { buildFileSystem } from "@/lib/terminal/build-fs";
import { TERM_THEMES, DEFAULT_THEME, getTheme } from "@/lib/terminal/themes";
import { cn } from "@/lib/utils";
import "@/styles/terminal.css";

interface TabItem {
  id: string;
  title: string;
}

interface WindowRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export function TerminalWindow() {
  const {
    isOpen,
    isMinimized,
    isMaximized,
    closeTerminal,
    minimizeTerminal,
    restoreTerminal,
    maximizeTerminal,
    consumePendingCommand,
  } = useTerminalWindow();

  // Shared Virtual Filesystem across all tabs
  const fsRef = useRef(buildFileSystem({}));

  // Tabs state
  const [tabs, setTabs] = useState<TabItem[]>([
    { id: "tab-1", title: "1. rsh: ~" },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>("tab-1");
  const [themeName, setThemeName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("term-theme");
        if (saved && TERM_THEMES.some((t) => t.name === saved)) return saved;
      } catch {}
    }
    return DEFAULT_THEME;
  });

  // Floating Window Geometry (centered initially)
  const [floatingRect, setFloatingRect] = useState<WindowRect>({
    x: 80,
    y: 70,
    width: 760,
    height: 480,
  });
  const [mounted, setMounted] = useState(false);

  // Initialize centered dimensions once mounted on client
  useEffect(() => {
    setMounted(true);
    const w = Math.min(780, window.innerWidth - 32);
    const h = Math.min(500, window.innerHeight - 90);
    const x = Math.max(16, (window.innerWidth - w) / 2);
    const y = Math.max(48, (window.innerHeight - h) / 2);
    setFloatingRect({ x, y, width: w, height: h });
  }, []);

  // Handle pending command on open
  useEffect(() => {
    if (isOpen) {
      const cmd = consumePendingCommand();
      if (cmd) {
        // Optional: Could send command to active tab
      }
    }
  }, [isOpen, consumePendingCommand]);

  // ---------- Dragging via Title Bar ----------
  const dragRef = useRef<{
    startX: number;
    startY: number;
    initX: number;
    initY: number;
    isDragging: boolean;
  }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
    isDragging: false,
  });

  const handleTitlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMaximized) return;
    // Do not initiate drag if clicking buttons, tabs, or interactive items
    const target = e.target as HTMLElement;
    if (target.closest("button, [role='tab'], input, a")) return;

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: floatingRect.x,
      initY: floatingRect.y,
      isDragging: true,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleTitlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging || isMaximized) return;

    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;

    const maxX = Math.max(0, window.innerWidth - floatingRect.width);
    const maxY = Math.max(0, window.innerHeight - 44);

    const newX = Math.max(0, Math.min(maxX, dragRef.current.initX + deltaX));
    const newY = Math.max(0, Math.min(maxY, dragRef.current.initY + deltaY));

    setFloatingRect((prev) => ({
      ...prev,
      x: newX,
      y: newY,
    }));
  };

  const handleTitlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.isDragging) {
      dragRef.current.isDragging = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // ---------- 8-Point Resizing ----------
  const resizeRef = useRef<{
    direction: ResizeDirection;
    startX: number;
    startY: number;
    initRect: WindowRect;
    isResizing: boolean;
  }>({
    direction: "se",
    startX: 0,
    startY: 0,
    initRect: floatingRect,
    isResizing: false,
  });

  const handleResizePointerDown = (
    dir: ResizeDirection,
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (isMaximized) return;
    e.stopPropagation();

    resizeRef.current = {
      direction: dir,
      startX: e.clientX,
      startY: e.clientY,
      initRect: { ...floatingRect },
      isResizing: true,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleResizePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!resizeRef.current.isResizing || isMaximized) return;

    const { direction, startX, startY, initRect } = resizeRef.current;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    const minW = Math.min(420, window.innerWidth - 20);
    const minH = Math.min(280, window.innerHeight - 20);
    const maxW = window.innerWidth;
    const maxH = window.innerHeight;

    let newX = initRect.x;
    let newY = initRect.y;
    let newW = initRect.width;
    let newH = initRect.height;

    // Horizontal adjustments
    if (direction.includes("e")) {
      newW = Math.max(minW, Math.min(maxW - newX, initRect.width + deltaX));
    }
    if (direction.includes("w")) {
      const candidateW = initRect.width - deltaX;
      if (candidateW >= minW && initRect.x + deltaX >= 0) {
        newW = candidateW;
        newX = initRect.x + deltaX;
      }
    }

    // Vertical adjustments
    if (direction.includes("s")) {
      newH = Math.max(minH, Math.min(maxH - newY, initRect.height + deltaY));
    }
    if (direction.includes("n")) {
      const candidateH = initRect.height - deltaY;
      if (candidateH >= minH && initRect.y + deltaY >= 0) {
        newH = candidateH;
        newY = initRect.y + deltaY;
      }
    }

    setFloatingRect({
      x: newX,
      y: newY,
      width: newW,
      height: newH,
    });
  };

  const handleResizePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (resizeRef.current.isResizing) {
      resizeRef.current.isResizing = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // ---------- Tab Management ----------
  const handleAddTab = useCallback(() => {
    const newId = `tab-${Date.now()}`;
    const newTabNumber = tabs.length + 1;
    const newTab: TabItem = {
      id: newId,
      title: `${newTabNumber}. rsh: ~`,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
  }, [tabs.length]);

  const handleCloseTab = useCallback(
    (idToClose: string) => {
      if (tabs.length <= 1) {
        closeTerminal();
        return;
      }
      setTabs((prev) => {
        const next = prev.filter((t) => t.id !== idToClose);
        if (activeTabId === idToClose) {
          const closedIndex = prev.findIndex((t) => t.id === idToClose);
          const newActiveIndex = Math.max(0, closedIndex - 1);
          setActiveTabId(next[newActiveIndex]?.id || next[0].id);
        }
        return next;
      });
    },
    [tabs.length, activeTabId, closeTerminal]
  );

  const handleTitleChange = useCallback((id: string, newTitle: string) => {
    setTabs((prev) =>
      prev.map((t, idx) =>
        t.id === id ? { ...t, title: `${idx + 1}. ${newTitle.toLowerCase()}` } : t
      )
    );
  }, []);

  const cycleTheme = () => {
    const currentIndex = TERM_THEMES.findIndex((t) => t.name === themeName);
    const nextTheme = TERM_THEMES[(currentIndex + 1) % TERM_THEMES.length];
    setThemeName(nextTheme.name);
    try {
      localStorage.setItem("term-theme", nextTheme.name);
    } catch {}
  };

  // Keyboard shortcuts inside window
  useEffect(() => {
    if (!isOpen || isMinimized) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // New Tab: Ctrl+Shift+T or Alt+T
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "t") || (e.altKey && e.key.toLowerCase() === "t")) {
        e.preventDefault();
        handleAddTab();
      }
      // Close Tab: Ctrl+Shift+W or Alt+W
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "w") || (e.altKey && e.key.toLowerCase() === "w")) {
        e.preventDefault();
        handleCloseTab(activeTabId);
      }
      // Switch Tab: Alt+1 .. Alt+9
      if (e.altKey && /^[1-9]$/.test(e.key)) {
        e.preventDefault();
        const tabIndex = parseInt(e.key, 10) - 1;
        if (tabs[tabIndex]) {
          setActiveTabId(tabs[tabIndex].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isMinimized, handleAddTab, handleCloseTab, activeTabId, tabs]);

  if (!mounted) return null;

  // ---------- Minimized Floating Pill Badge ----------
  if (isOpen && isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-[9999] select-none">
        <button
          type="button"
          onClick={restoreTerminal}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-border/80 bg-background/95 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-primary/60 transition-all duration-200 cursor-pointer active:scale-95 text-xs font-mono lowercase"
          aria-label={`restore terminal window (${tabs.length} tabs running)`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <TerminalIcon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          <span className="font-semibold text-foreground">terminal</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">
            {tabs.length} {tabs.length === 1 ? "tab" : "tabs"}
          </span>
        </button>
      </div>
    );
  }

  if (!isOpen) return null;

  const currentTheme = getTheme(themeName);
  const cssVars = {
    "--t-bg": currentTheme.colors.bg,
    "--t-fg": currentTheme.colors.fg,
    "--t-dim": currentTheme.colors.dim,
    "--t-accent": currentTheme.colors.accent,
    "--t-green": currentTheme.colors.green,
    "--t-red": currentTheme.colors.red,
    "--t-yellow": currentTheme.colors.yellow,
    "--t-cyan": currentTheme.colors.cyan,
    "--t-magenta": currentTheme.colors.magenta,
    "--t-selection": currentTheme.colors.selection,
  } as React.CSSProperties;

  // Window geometry styling
  const windowStyle: React.CSSProperties = isMaximized
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        ...cssVars,
      }
    : {
        position: "fixed",
        left: `${floatingRect.x}px`,
        top: `${floatingRect.y}px`,
        width: `${floatingRect.width}px`,
        height: `${floatingRect.height}px`,
        zIndex: 9999,
        ...cssVars,
      };

  return (
    <div
      role="dialog"
      aria-label="terminal window"
      aria-modal="false"
      tabIndex={-1}
      style={windowStyle}
      className={cn(
        "flex flex-col bg-[var(--t-bg)] text-[var(--t-fg)] border font-mono shadow-2xl transition-shadow select-none overflow-hidden lowercase",
        isMaximized
          ? "rounded-none border-none"
          : "rounded-xl border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
      )}
    >
      {/* 8-Point Resizer Handles (only in floating mode) */}
      {!isMaximized && (
        <>
          <div
            className="absolute top-0 inset-x-2 h-1.5 cursor-n-resize z-30"
            onPointerDown={(e) => handleResizePointerDown("n", e)}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
          />
          <div
            className="absolute bottom-0 inset-x-2 h-1.5 cursor-s-resize z-30"
            onPointerDown={(e) => handleResizePointerDown("s", e)}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
          />
          <div
            className="absolute left-0 inset-y-2 w-1.5 cursor-w-resize z-30"
            onPointerDown={(e) => handleResizePointerDown("w", e)}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
          />
          <div
            className="absolute right-0 inset-y-2 w-1.5 cursor-e-resize z-30"
            onPointerDown={(e) => handleResizePointerDown("e", e)}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
          />
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-30"
            onPointerDown={(e) => handleResizePointerDown("nw", e)}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-30"
            onPointerDown={(e) => handleResizePointerDown("ne", e)}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-30"
            onPointerDown={(e) => handleResizePointerDown("sw", e)}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-30"
            onPointerDown={(e) => handleResizePointerDown("se", e)}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
          />
        </>
      )}

      {/* Title Bar & Tab Strip (Draggable Header) */}
      <div
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handleTitlePointerMove}
        onPointerUp={handleTitlePointerUp}
        className={cn(
          "shrink-0 h-10 px-3 flex items-center justify-between border-b gap-2 select-none z-20",
          !isMaximized && "cursor-grab active:cursor-grabbing"
        )}
        style={{
          borderColor: "var(--t-selection)",
          backgroundColor: "rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Left: macOS Traffic Lights */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={closeTerminal}
            className="w-3 h-3 rounded-full flex items-center justify-center transition-opacity hover:opacity-80 active:scale-90"
            style={{ background: "#ff5f57" }}
            title="close window"
            aria-label="close terminal window"
          >
            <X className="w-2 h-2 text-black/60 opacity-0 hover:opacity-100 transition-opacity" />
          </button>
          <button
            type="button"
            onClick={minimizeTerminal}
            className="w-3 h-3 rounded-full flex items-center justify-center transition-opacity hover:opacity-80 active:scale-90"
            style={{ background: "#febc2e" }}
            title="minimize window"
            aria-label="minimize terminal window"
          >
            <Minus className="w-2 h-2 text-black/60 opacity-0 hover:opacity-100 transition-opacity" />
          </button>
          <button
            type="button"
            onClick={maximizeTerminal}
            className="w-3 h-3 rounded-full flex items-center justify-center transition-opacity hover:opacity-80 active:scale-90"
            style={{ background: "#28c840" }}
            title={isMaximized ? "restore size" : "maximize window"}
            aria-label={isMaximized ? "restore size" : "maximize window"}
          >
            {isMaximized ? (
              <Minimize2 className="w-2 h-2 text-black/60 opacity-0 hover:opacity-100 transition-opacity" />
            ) : (
              <Maximize2 className="w-2 h-2 text-black/60 opacity-0 hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>

        {/* Center: Tabs Strip */}
        <div
          role="tablist"
          aria-label="terminal tabs"
          className="flex-1 flex items-center gap-1 overflow-x-auto custom-scroll mx-2"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
                onClick={() => setActiveTabId(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveTabId(tab.id);
                  }
                }}
                className={cn(
                  "group flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer shrink-0 max-w-[170px] truncate",
                  isActive
                    ? "bg-[var(--t-selection)] text-[var(--t-fg)] font-semibold shadow-2xs"
                    : "text-[var(--t-dim)] hover:text-[var(--t-fg)] hover:bg-white/5"
                )}
              >
                <TerminalIcon className="w-3 h-3 shrink-0 opacity-70" aria-hidden="true" />
                <span className="truncate">{tab.title}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseTab(tab.id);
                  }}
                  className="w-3.5 h-3.5 rounded flex items-center justify-center text-[var(--t-dim)] hover:text-[var(--t-err)] hover:bg-black/20 shrink-0 ml-1 transition-colors"
                  aria-label={`close tab ${tab.title}`}
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            );
          })}

          {/* Add New Tab Button */}
          <button
            type="button"
            onClick={handleAddTab}
            className="p-1 rounded-md text-[var(--t-dim)] hover:text-[var(--t-fg)] hover:bg-white/5 transition-colors cursor-pointer shrink-0"
            title="new tab (ctrl+shift+t)"
            aria-label="add new tab"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Theme Quick Switch & Fullscreen Action */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={cycleTheme}
            className="p-1 rounded-md text-[var(--t-dim)] hover:text-[var(--t-fg)] hover:bg-white/5 transition-colors cursor-pointer text-[10px] flex items-center gap-1"
            title={`cycle theme (current: ${themeName})`}
            aria-label={`cycle terminal theme, currently ${themeName}`}
          >
            <Palette className="w-3 h-3" />
            <span className="hidden sm:inline font-mono">{themeName}</span>
          </button>
          <button
            type="button"
            onClick={maximizeTerminal}
            className="p-1 rounded-md text-[var(--t-dim)] hover:text-[var(--t-fg)] hover:bg-white/5 transition-colors cursor-pointer"
            title={isMaximized ? "restore size" : "full screen"}
            aria-label={isMaximized ? "restore size" : "full screen"}
          >
            {isMaximized ? (
              <Minimize2 className="w-3 h-3" />
            ) : (
              <Maximize2 className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {/* Main Terminal Tab Viewport (Preserves state of background tabs) */}
      <div className="relative flex-1 min-h-0 bg-[var(--t-bg)]">
        {tabs.map((tab) => (
          <TerminalTabSession
            key={tab.id}
            tabId={tab.id}
            fsRef={fsRef}
            isActive={tab.id === activeTabId}
            themeName={themeName}
            onTitleChange={handleTitleChange}
            onThemeChange={(th) => setThemeName(th)}
            onNewTab={handleAddTab}
            onCloseTab={() => handleCloseTab(tab.id)}
            onMinimize={minimizeTerminal}
            onMaximize={maximizeTerminal}
            onCloseWindow={closeTerminal}
          />
        ))}
      </div>
    </div>
  );
}
