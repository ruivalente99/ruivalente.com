"use client";

import { Blocks } from "lucide-react";
import { useAnimation } from "@/lib/animation/context";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function AnimationToggle() {
  const { animationsEnabled, toggleAnimations } = useAnimation();
  const { t } = useI18n();

  const label = animationsEnabled
    ? t.header.animationsEnabled
    : t.header.animationsDisabled;

  return (
    <button
      type="button"
      onClick={toggleAnimations}
      className={cn(
        "relative h-8 w-8 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/60 hover:border-border/80",
        "text-muted-foreground hover:text-foreground transition-all duration-150 flex items-center justify-center cursor-pointer",
        "active:scale-[0.96] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        animationsEnabled && "text-primary"
      )}
      aria-label={label}
      title={label}
    >
      <Blocks className="h-3.5 w-3.5" aria-hidden="true" />
      {!animationsEnabled && (
        <span 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <span className="w-4 h-[1.5px] bg-muted-foreground/80 -rotate-45 rounded-full" />
        </span>
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}
