"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, GitCommit, Star, GitFork, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface GitHubWidgetProps {
  username?: string;
}

export function GitHubWidget({ username = "ruivalente99" }: GitHubWidgetProps) {
  const { theme } = useTheme();
  const isDarkSide = theme === "dark-side";

  // Activity density visualization (sample recent commit heat levels 0..4)
  const activityWeeks = [
    [1, 2, 0, 3, 2, 4, 1],
    [2, 3, 1, 4, 2, 3, 2],
    [0, 2, 3, 2, 1, 4, 3],
    [3, 4, 2, 3, 4, 2, 1],
    [1, 2, 4, 3, 2, 4, 3],
    [2, 3, 1, 4, 3, 2, 2],
    [3, 1, 2, 4, 2, 3, 4],
    [2, 4, 3, 2, 1, 3, 2],
    [1, 3, 4, 2, 3, 4, 1],
    [3, 2, 1, 4, 2, 3, 3],
  ];

  const getHeatColor = (level: number) => {
    if (isDarkSide) {
      switch (level) {
        case 4: return "bg-red-500";
        case 3: return "bg-red-600/80";
        case 2: return "bg-red-800/60";
        case 1: return "bg-red-950/70";
        default: return "bg-muted/20";
      }
    }
    switch (level) {
      case 4: return "bg-primary";
      case 3: return "bg-primary/75";
      case 2: return "bg-primary/50";
      case 1: return "bg-primary/25";
      default: return "bg-muted/30";
    }
  };

  return (
    <Card
      className="h-full p-4 flex flex-col justify-between overflow-hidden"
      role="region"
      aria-labelledby="github-widget-heading"
    >
      <header className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Github className="w-3.5 h-3.5 text-foreground/80" aria-hidden="true" />
          <h2 id="github-widget-heading" className="text-xs font-semibold lowercase tracking-wider text-muted-foreground">
            github activity
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground active:scale-[0.96] lowercase"
        >
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="visit github profile (opens in new tab)"
          >
            <span>view profile</span>
            <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
          </a>
        </Button>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 my-auto">
        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40 text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
            <GitCommit className="w-3 h-3" aria-hidden="true" />
            <span className="text-[10px] font-mono lowercase">commits</span>
          </div>
          <span className="text-sm font-bold font-mono text-foreground">1,480+</span>
        </div>

        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40 text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
            <Star className="w-3 h-3 text-amber-500" aria-hidden="true" />
            <span className="text-[10px] font-mono lowercase">stars</span>
          </div>
          <span className="text-sm font-bold font-mono text-foreground">86+</span>
        </div>

        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40 text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
            <GitFork className="w-3 h-3" aria-hidden="true" />
            <span className="text-[10px] font-mono lowercase">repos</span>
          </div>
          <span className="text-sm font-bold font-mono text-foreground">42</span>
        </div>
      </div>

      {/* Commit Activity Heat Strip */}
      <div className="pt-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1.5">
          <span>recent commit cadence</span>
          <span className="text-primary font-medium">typescript 74%</span>
        </div>
        <div className="flex gap-1 justify-between" aria-hidden="true">
          {activityWeeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.map((level, dIdx) => (
                <div
                  key={dIdx}
                  className={cn("w-2 h-2 rounded-[2px] transition-colors", getHeatColor(level))}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
