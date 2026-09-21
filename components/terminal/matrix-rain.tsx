"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/{}[]$#*+=";

export function MatrixRain({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = 0;
    const fontSize = 14;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drops = Array(Math.ceil(canvas.width / fontSize)).fill(1);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);
      if (ts - last < 50) return;
      last = ts;
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-30 opacity-40"
      aria-hidden
    />
  );
}
