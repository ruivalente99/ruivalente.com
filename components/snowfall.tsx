"use client";

import { useEffect, useState, useMemo } from "react";
import { useTheme } from "next-themes";

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

export function Snowfall() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Generate snowflakes with useMemo for consistent rendering
  const snowflakes = useMemo<Snowflake[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 20,
      animationDelay: Math.random() * -30,
      size: 4 + Math.random() * 8,
      opacity: 0.4 + Math.random() * 0.6,
    }));
  }, []);

  // Only show snowfall when winter theme is active
  if (!mounted || theme !== "winter" || reducedMotion) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden"
      aria-hidden="true"
    >
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake absolute text-blue-200"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
          }}
        >
          ❄
        </div>
      ))}
      <style jsx>{`
        .snowflake {
          top: -20px;
          animation: snowfall linear infinite;
          will-change: transform;
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-20px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
