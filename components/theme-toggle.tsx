"use client";

import { Sun, LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
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
import { getIcon } from '@/lib/hooks/useIconMap';

interface Theme {
  name: string;
  value: string;
  icon: string;
  description: string;
  preview?: {
    background: string;
    foreground: string;
    accent: string;
  };
  hidden?: boolean;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { data: themesData, isLoading } = useData<{ themes: Theme[] }>('/api/themes');

  const getCurrentThemeIcon = () => {
    if (!themesData?.themes) return Sun;
    const currentTheme = themesData.themes.find(t => t.value === theme) || themesData.themes[0];
    return getIcon(currentTheme.icon) as LucideIcon;
  };

  const CurrentIcon = getCurrentThemeIcon();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative h-8 w-8 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/60 hover:border-border/80 text-muted-foreground hover:text-foreground transition-all duration-150 flex items-center justify-center cursor-pointer active:scale-[0.96] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Toggle theme"
        >
          <CurrentIcon className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px] rounded-xl border border-border/80 bg-popover/90 backdrop-blur-md shadow-lg">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {!isLoading && themesData?.themes
            .filter(t => !t.hidden)
            .map(({ name, value, icon, description, preview }) => {
              const Icon = getIcon(icon) as LucideIcon;
              return (
                <DropdownMenuItem
                  key={value}
                  onClick={() => setTheme(value)}
                  className={cn(
                    "flex flex-col items-start gap-2 p-4",
                    theme === value && "bg-accent"
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{name}</span>
                    </div>
                    {theme === value && (
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                      </div>
                    )}
                  </div>
                  {preview ? (
                    <div className="flex w-full gap-1">
                      <div 
                        className="h-6 w-8 rounded-l-md" 
                        style={{ backgroundColor: preview.background }}
                      />
                      <div 
                        className="h-6 flex-1 rounded-md"
                        style={{ backgroundColor: preview.accent }}
                      />
                      <div 
                        className="h-6 w-8 rounded-r-md flex items-center justify-center text-[8px]"
                        style={{ 
                          backgroundColor: preview.background,
                          color: preview.foreground
                        }}
                      >
                        Aa
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">{description}</span>
                  )}
                </DropdownMenuItem>
              );
            })}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}