"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const COLS = 28;
const ROWS = 16;
const HISCORE_KEY = "term-snake-hiscore";

type Pos = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

interface SnakeProps {
  onExit: (score: number, hiscore: number) => void;
}

export function SnakeGame({ onExit }: SnakeProps) {
  const [, forceRender] = useState(0);
  const snake = useRef<Pos[]>([
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 },
  ]);
  const dir = useRef<Dir>("right");
  const nextDir = useRef<Dir>("right");
  const food = useRef<Pos>({ x: 18, y: 8 });
  const score = useRef(0);
  const dead = useRef(false);
  const paused = useRef(false);
  const hiscore = useRef(0);

  useEffect(() => {
    hiscore.current = Number(localStorage.getItem(HISCORE_KEY) || 0);
  }, []);

  const placeFood = useCallback(() => {
    let p: Pos;
    do {
      p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snake.current.some((s) => s.x === p.x && s.y === p.y));
    food.current = p;
  }, []);

  const exit = useCallback(() => {
    if (score.current > hiscore.current) {
      hiscore.current = score.current;
      localStorage.setItem(HISCORE_KEY, String(hiscore.current));
    }
    onExit(score.current, hiscore.current);
  }, [onExit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const map: Record<string, Dir> = {
        arrowup: "up", w: "up",
        arrowdown: "down", s: "down",
        arrowleft: "left", a: "left",
        arrowright: "right", d: "right",
      };
      if (map[k]) {
        e.preventDefault();
        const nd = map[k];
        const opposite: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };
        if (nd !== opposite[dir.current]) nextDir.current = nd;
      } else if (k === "p") {
        paused.current = !paused.current;
        forceRender((n) => n + 1);
      } else if (k === "q" || k === "escape") {
        e.preventDefault();
        exit();
      } else if (k === "enter" && dead.current) {
        snake.current = [
          { x: 8, y: 8 },
          { x: 7, y: 8 },
          { x: 6, y: 8 },
        ];
        dir.current = "right";
        nextDir.current = "right";
        score.current = 0;
        dead.current = false;
        placeFood();
        forceRender((n) => n + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exit, placeFood]);

  useEffect(() => {
    const tick = () => {
      if (dead.current || paused.current) return;
      dir.current = nextDir.current;
      const head = snake.current[0];
      const delta: Record<Dir, Pos> = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
      };
      const nh = { x: head.x + delta[dir.current].x, y: head.y + delta[dir.current].y };
      if (
        nh.x < 0 || nh.x >= COLS || nh.y < 0 || nh.y >= ROWS ||
        snake.current.some((s) => s.x === nh.x && s.y === nh.y)
      ) {
        dead.current = true;
        if (score.current > hiscore.current) {
          hiscore.current = score.current;
          localStorage.setItem(HISCORE_KEY, String(hiscore.current));
        }
        forceRender((n) => n + 1);
        return;
      }
      snake.current = [nh, ...snake.current];
      if (nh.x === food.current.x && nh.y === food.current.y) {
        score.current += 10;
        placeFood();
      } else {
        snake.current.pop();
      }
      forceRender((n) => n + 1);
    };
    const id = setInterval(tick, Math.max(60, 130 - Math.floor(score.current / 50) * 10));
    return () => clearInterval(id);
  });

  const rows: React.ReactNode[] = [];
  for (let y = 0; y < ROWS; y++) {
    const cells: React.ReactNode[] = [];
    for (let x = 0; x < COLS; x++) {
      const isHead = snake.current[0].x === x && snake.current[0].y === y;
      const isBody = !isHead && snake.current.some((s) => s.x === x && s.y === y);
      const isFood = food.current.x === x && food.current.y === y;
      if (isHead) cells.push(<span key={x} className="t-acc">█</span>);
      else if (isBody) cells.push(<span key={x} className="t-ok">▓</span>);
      else if (isFood) cells.push(<span key={x} className="t-err">●</span>);
      else cells.push(<span key={x} className="t-dim" style={{ opacity: 0.25 }}>·</span>);
    }
    rows.push(<div key={y}>{cells}</div>);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full select-none">
      <div className="t-dim mb-2 text-xs">
        score <span className="t-warn">{score.current}</span>
        {"  ·  "}hi <span className="t-warn">{Math.max(hiscore.current, score.current)}</span>
        {"  ·  "}wasd/arrows move · p pause · q quit
      </div>
      <pre className="leading-[1.05] text-base border px-2 py-1" style={{ borderColor: "var(--t-dim)" }}>
        {rows}
      </pre>
      {dead.current && (
        <div className="mt-3 text-center">
          <div className="t-err font-bold">GAME OVER</div>
          <div className="t-dim text-xs mt-1">enter to restart · q to quit</div>
        </div>
      )}
      {paused.current && !dead.current && <div className="t-warn mt-3">PAUSED</div>}
    </div>
  );
}
