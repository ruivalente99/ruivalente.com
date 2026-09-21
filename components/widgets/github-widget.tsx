"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, GitCommit, GitFork, ArrowRight, BookOpen, ExternalLink, Users } from "lucide-react";
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
    [2, 3, 2, 4, 3, 1, 2],
    [3, 4, 1, 3, 4, 2, 3],
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
      className="h-full p-4 flex flex-col justify-between overflow-hidden lowercase"
      role="region"
      aria-labelledby="github-widget-heading"
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-2">
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
        <div className="p-2 rounded-xl bg-muted/25 border border-border/40 text-center shadow-2xs">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
            <GitCommit className="w-3 h-3" aria-hidden="true" />
            <span className="text-[10px] font-mono lowercase">contribs</span>
          </div>
          <span className="text-xs font-bold font-mono text-foreground">3,000+</span>
        </div>

        <div className="p-2 rounded-xl bg-muted/25 border border-border/40 text-center shadow-2xs">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
            <GitFork className="w-3 h-3" aria-hidden="true" />
            <span className="text-[10px] font-mono lowercase">repos</span>
          </div>
          <span className="text-xs font-bold font-mono text-foreground">14</span>
        </div>

        <div className="p-2 rounded-xl bg-muted/25 border border-border/40 text-center shadow-2xs">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
            <Users className="w-3 h-3" aria-hidden="true" />
            <span className="text-[10px] font-mono lowercase">followers</span>
          </div>
          <span className="text-xs font-bold font-mono text-foreground">10</span>
        </div>
      </div>

      {/* Featured Pinned Repository */}
      <div className="my-auto">
        <a
          href="https://github.com/ruivalente99/bibliotheca"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-2.5 rounded-xl bg-muted/25 hover:bg-muted/60 border border-border/40 transition-all duration-150 group shadow-2xs active:scale-[0.98]"
          aria-label="view bibliotheca repository on github (opens in new tab)"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <BookOpen className="w-3 h-3 text-primary shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold font-mono text-foreground truncate group-hover:text-primary transition-colors">
                bibliotheca
              </span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-muted/70 text-foreground/80 border border-border/40 shrink-0">
              public
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground line-clamp-1 mb-1.5">
            offline-first react 19 document editor &amp; component library
          </p>
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" aria-hidden="true" />
                <span>typescript</span>
              </span>
              <span className="text-muted-foreground/50">•</span>
              <span>react 19</span>
            </div>
            <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
          </div>
        </a>
      </div>

      {/* Commit Activity Heat Strip */}
      <div className="pt-2 border-t border-border/40">
        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1.5">
          <span>recent commit cadence</span>
          <span className="text-foreground/85 font-medium">typescript 74%</span>
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
