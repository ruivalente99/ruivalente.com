"use client";

import { Moon, Sun, Laptop, Palette, Terminal, Bomb, LucideIcon } from "lucide-react";
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
import { GiDeathStar } from 'react-icons/gi';
import { getIcon } from '@/lib/hooks/useIconMap';
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

  // Get the current theme's icon
  const getCurrentThemeIcon = () => {
    if (!themesData?.themes) return Sun;
    const currentTheme = themesData.themes.find(t => t.value === theme) || themesData.themes[0];
    return getIcon(currentTheme.icon) as LucideIcon;
  };

  const CurrentIcon = getCurrentThemeIcon();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <CurrentIcon className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
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