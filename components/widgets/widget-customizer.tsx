"use client";

import React, { useState, useEffect } from "react";
import { SlidersHorizontal, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type WidgetId =
  | "profile"
  | "hobbies"
  | "stack"
  | "experience"
  | "education"
  | "projects"
  | "github"
  | "vercel";

export interface WidgetMeta {
  id: WidgetId;
  label: string;
  description: string;
  required?: boolean;
}

export const AVAILABLE_WIDGETS: WidgetMeta[] = [
  {
    id: "profile",
    label: "profile & bio",
    description: "personal introduction, career title, location, and resume download",
    required: true,
  },
  {
    id: "hobbies",
    label: "passions & music",
    description: "curated playlist, photography, hardware, and personal interests",
  },
  {
    id: "stack",
    label: "engineering stack",
    description: "core technologies, ai agents, frameworks, and skill view toggle",
  },
  {
    id: "experience",
    label: "work experience",
    description: "recent engineering roles at xelerate, openvia, and neoception",
  },
  {
    id: "education",
    label: "education & qualifications",
    description: "academic informatics degree and verified professional certificates",
  },
  {
    id: "projects",
    label: "featured projects",
    description: "flagship production web apps: bibliotheca, papyrus, sappientus",
  },
  {
    id: "github",
    label: "github activity",
    description: "live public repositories, commit cadence, stars, and language stats",
  },
  {
    id: "vercel",
    label: "vercel deployments",
    description: "production uptime, global edge network status, and core web vitals",
  },
];

export const DEFAULT_WIDGETS: WidgetId[] = [
  "profile",
  "hobbies",
  "stack",
  "experience",
  "education",
  "projects",
];

const STORAGE_KEY = "ruivalente_bento_widgets";

interface WidgetCustomizerProps {
  activeWidgets: WidgetId[];
  onWidgetsChange: (widgets: WidgetId[]) => void;
}

export function WidgetCustomizer({
  activeWidgets,
  onWidgetsChange,
}: WidgetCustomizerProps) {
  const [open, setOpen] = useState(false);

  const toggleWidget = (id: WidgetId) => {
    if (id === "profile") return; // Profile is core
    const isCurrentlyActive = activeWidgets.includes(id);
    const updated = isCurrentlyActive
      ? activeWidgets.filter((w) => w !== id)
      : [...activeWidgets, id];

    onWidgetsChange(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const handleReset = () => {
    onWidgetsChange(DEFAULT_WIDGETS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_WIDGETS));
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 rounded-lg border-border/60 bg-muted/30 hover:bg-muted/60 text-xs font-mono lowercase flex items-center gap-1.5 active:scale-95 shadow-2xs cursor-pointer"
          aria-label="customize dashboard widgets"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
          <span>customize widgets</span>
          <span className="ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-muted border border-border/60 text-foreground/80">
            {activeWidgets.length}/{AVAILABLE_WIDGETS.length}
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-2xl border-border/80 bg-popover/95 backdrop-blur-md shadow-2xl p-6 lowercase">
        <DialogHeader className="space-y-1.5 pb-2 border-b border-border/50 text-left">
          <DialogTitle className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary" aria-hidden="true" />
            <span>dashboard widgets</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            choose which modules to display on your bento dashboard grid.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-3 max-h-[55vh] overflow-y-auto custom-scroll pr-1">
          {AVAILABLE_WIDGETS.map((widget) => {
            const isActive = activeWidgets.includes(widget.id);

            return (
              <button
                key={widget.id}
                type="button"
                onClick={() => toggleWidget(widget.id)}
                disabled={widget.required}
                className={cn(
                  "w-full text-left p-3 rounded-xl border transition-all duration-150 flex items-start justify-between gap-3 cursor-pointer",
                  isActive
                    ? "bg-primary/5 border-primary/40 shadow-2xs"
                    : "bg-muted/20 border-border/50 hover:bg-muted/50 text-muted-foreground",
                  widget.required && "opacity-80 cursor-default"
                )}
                aria-pressed={isActive}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">
                      {widget.label}
                    </span>
                    {widget.required && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/80 text-foreground/80 border border-border/40">
                        core
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    {widget.description}
                  </p>
                </div>

                <div
                  className={cn(
                    "w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors mt-0.5",
                    isActive
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border/70 bg-background"
                  )}
                  aria-hidden="true"
                >
                  {isActive && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-3 border-t border-border/50 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs h-8 px-2 text-muted-foreground hover:text-foreground active:scale-95 lowercase flex items-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" aria-hidden="true" />
            <span>reset default</span>
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => setOpen(false)}
            className="text-xs h-8 px-4 rounded-lg lowercase active:scale-95 shadow-2xs"
          >
            done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
