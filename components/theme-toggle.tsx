"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Laptop, Check, LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useData } from "@/lib/hooks/useData";
import { getIcon } from "@/lib/hooks/useIconMap";
import { useI18n } from "@/lib/i18n/context";

interface ThemePreview {
  background: string;
  foreground: string;
  accent: string;
}

interface ThemeItem {
  name: string;
  value: string;
  icon: string;
  description: string;
  preview?: ThemePreview;
  hidden?: boolean;
}

const BASE_MODES = [
  { id: "light", icon: Sun },
  { id: "dark", icon: Moon },
  { id: "system", icon: Laptop },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { data: themesData, isLoading } = useData<{ themes: ThemeItem[] }>("/api/themes");
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = themesData?.themes || [];
  const currentTheme = themes.find((item) => item.value === theme) || themes[0];
  const CurrentIcon = (getIcon(currentTheme?.icon || "sun") as LucideIcon) || Sun;

  // Custom palettes/themes (exclude base modes and hidden)
  const customPalettes = themes.filter(
    (item) => !item.hidden && item.value !== "light" && item.value !== "dark" && item.value !== "system"
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative h-8 w-8 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/60 hover:border-border/80 text-muted-foreground hover:text-foreground transition-all duration-150 flex items-center justify-center cursor-pointer active:scale-[0.96] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={t.theme.appearance}
          title={t.theme.appearance}
        >
          {mounted ? (
            <CurrentIcon className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Sun className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          <span className="sr-only">{t.theme.appearance}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[260px] rounded-2xl border border-border/80 bg-popover/95 backdrop-blur-md shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
      >
        <div className="px-2 py-1.5 flex items-center justify-between">
          <span className="text-[11px] font-mono font-semibold lowercase tracking-wider text-muted-foreground">
            {t.theme.mode.toLowerCase()}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground lowercase">
            {mounted ? theme?.toLowerCase() : "system"}
          </span>
        </div>

        {/* Segmented core mode controls */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-muted/40 rounded-xl border border-border/40 my-1">
          {BASE_MODES.map((mode) => {
            const Icon = mode.icon;
            const isSelected = mounted && theme === mode.id;
            const labelKey = mode.id as "light" | "dark" | "system";
            const label = t.theme[labelKey];

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setTheme(mode.id)}
                className={cn(
                  "flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer select-none",
                  isSelected
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                )}
                aria-pressed={isSelected}
              >
                <Icon className="h-3.5 w-3.5 mb-1" aria-hidden="true" />
                <span className="lowercase">{label.toLowerCase()}</span>
              </button>
            );
          })}
        </div>

        <DropdownMenuSeparator className="my-2" />

        {/* Custom Palettes / Themes Section */}
        <div className="px-2 py-1 flex items-center justify-between">
          <span className="text-[11px] font-mono font-semibold lowercase tracking-wider text-muted-foreground">
            {t.theme.palettes.toLowerCase()}
          </span>
        </div>

        <ScrollArea className="h-[210px] pr-1 mt-1">
          <div className="space-y-1">
            {!isLoading &&
              customPalettes.map((item) => {
                const Icon = (getIcon(item.icon) as LucideIcon) || Sun;
                const isSelected = mounted && theme === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setTheme(item.value)}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors text-left cursor-pointer",
                      isSelected
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-muted/60"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {item.preview ? (
                        <div
                          className="h-4 w-4 rounded-full border border-border/60 shrink-0 shadow-2xs flex items-center justify-center overflow-hidden"
                          style={{ backgroundColor: item.preview.background }}
                          aria-hidden="true"
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.preview.accent }}
                          />
                        </div>
                      ) : (
                        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      )}
                      <span className="truncate lowercase">{item.name.toLowerCase()}</span>
                    </div>

                    {isSelected && (
                      <Check className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}