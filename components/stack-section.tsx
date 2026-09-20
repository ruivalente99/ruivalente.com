"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from '@/lib/hooks/useData';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from "next/navigation";
import { ArrowRight, LucideIcon, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useI18n } from "@/lib/i18n/context";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiNodedotjs,
  SiGraphql,
  SiDocker,
  SiAmazon,
  SiJest,
  SiStackblitz as DefaultIcon,
  SiBootstrap,
  SiIonic,
  SiAngular,
  SiJavascript,
  SiServerless,
  SiJira,
  SiGitkraken,
  SiSonarqube,
  SiDbeaver,
  SiJenkins,
  SiDarkreader
} from "react-icons/si";
import { DiLinux } from "react-icons/di";
import { GiLightSabers, GiSpaceship, GiMeepleArmy, GiMightyForce } from "react-icons/gi";
import { FaFistRaised } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIconMap } from '@/lib/hooks/useIconMap';

interface TechItem {
  name: string;
  icon: string;
  description: string;
  reason: string;
}

interface TechCategory {
  category: string;
  hideInWidget?: boolean;
  items: TechItem[];
}

export function StackSection() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useI18n();
  const iconMap = useIconMap();
  const isDarkSide = theme === 'dark-side';
  const { data: stack, isLoading } = useData<TechCategory[]>('/api/stack');

  if (isLoading) {
    return <StackSkeleton />;
  }

  if (!stack) return null;

  return (
    <Card className="h-full p-4 flex flex-col justify-between" role="region" aria-labelledby="tech-stack-heading">
      <header className="flex items-center justify-between mb-3">
        <h2 id="tech-stack-heading" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t.bento.stack.title}
        </h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push('/stack')}
          className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground active:scale-[0.96]"
          aria-label={t.bento.stack.viewAll}
        >
          {t.bento.stack.viewAll} <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
        </Button>
      </header>
      
      <ul className="grid grid-cols-6 md:grid-cols-8 gap-2.5 my-auto list-none p-0 m-0" aria-label="Technology icons">
        <TooltipProvider>
          {stack
            .filter(category => !category.hideInWidget)
            .flatMap(category => 
              category.items.slice(0, 3)
            ).map((tech) => {
              const Icon = (iconMap[tech.icon.toLowerCase() as keyof typeof iconMap] || DefaultIcon) as LucideIcon;
              
              return (
                <li key={tech.name} className="flex justify-center list-none">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-[0.94] shadow-2xs border cursor-pointer mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          isDarkSide 
                            ? 'bg-red-950/20 hover:bg-red-950/40 border-red-900/40 text-red-400 hover:text-red-300' 
                            : 'bg-muted/30 hover:bg-muted/80 border-border/50 text-foreground/80 hover:text-foreground'
                        }`}
                        aria-label={`${tech.name}: ${tech.description}`}
                      >
                        <Icon 
                          className={`w-5 h-5 ${isDarkSide ? 'force-glow' : ''}`} 
                          aria-hidden="true"
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent 
                      className={isDarkSide ? 'border-red-900 bg-black/90' : ''}
                    >
                      <p className={`font-medium ${isDarkSide ? 'text-red-500' : ''}`}>
                        {tech.name}
                      </p>
                      <p className={`text-xs ${
                        isDarkSide ? 'text-red-400/70' : 'text-muted-foreground'
                      }`}>
                        {tech.description}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              );
            })}
          
          {/* AI Button - minimalistic with sparkle */}
          <li className="flex justify-center list-none">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-[0.94] shadow-2xs border cursor-pointer mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isDarkSide 
                      ? 'bg-purple-950/30 hover:bg-purple-950/50 border-purple-800/50 text-purple-400' 
                      : 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 text-purple-600 dark:text-purple-400'
                  }`}
                  onClick={() => router.push('/stack')}
                  aria-label="View AI Stack"
                >
                  <Sparkles 
                    className={`w-5 h-5 ${isDarkSide ? 'force-glow' : ''}`} 
                    aria-hidden="true"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent 
                className={isDarkSide ? 'border-red-900 bg-black/90' : ''}
              >
                <p className={`font-medium ${isDarkSide ? 'text-red-500' : ''}`}>
                  AI Stack
                </p>
                <p className={`text-xs ${
                  isDarkSide ? 'text-red-400/70' : 'text-muted-foreground'
                }`}>
                  Explore the full AI tooling and workflows
                </p>
              </TooltipContent>
            </Tooltip>
          </li>
        </TooltipProvider>
      </ul>
    </Card>
  );
}

function StackSkeleton() {
  return (
    <Card className="h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="grid grid-cols-6 md:grid-cols-8 gap-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <Skeleton key={i} className="w-6 h-6 mx-auto" />
        ))}
      </div>
    </Card>
  );
}