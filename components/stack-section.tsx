"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from '@/lib/hooks/useData';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from "next/navigation";
import { ArrowRight, LucideIcon, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
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
  const iconMap = useIconMap();
  const isDarkSide = theme === 'dark-side';
  const { data: stack, isLoading } = useData<TechCategory[]>('/api/stack');

  if (isLoading) {
    return <StackSkeleton />;
  }

  if (!stack) return null;

  return (
    <Card className="h-full p-4" role="region" aria-labelledby="tech-stack-heading">
      <header className="flex items-center justify-between mb-4">
        <h2 id="tech-stack-heading" className="text-sm font-bold">tech stack</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push('/stack')}
          className="text-xs"
          aria-label="View all technologies and tools"
        >
          view all <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
        </Button>
      </header>
      
      <div className="grid grid-cols-6 md:grid-cols-8 gap-4" role="list" aria-label="Technology icons">
        <TooltipProvider>
          {stack
            .filter(category => !category.hideInWidget)
            .flatMap(category => 
              category.items.slice(0, 3)
            ).map((tech) => {
              const Icon = (iconMap[tech.icon.toLowerCase() as keyof typeof iconMap] || DefaultIcon) as LucideIcon;
              
              return (
                <Tooltip key={tech.name}>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                        isDarkSide 
                          ? 'hover:bg-red-950/50 text-white hover:text-red-500' 
                          : 'hover:bg-accent'
                      }`}
                      role="listitem"
                      aria-label={`${tech.name}: ${tech.description}`}
                    >
                      <Icon 
                        className={`w-6 h-6 ${isDarkSide ? 'force-glow' : ''}`} 
                        aria-hidden="true"
                      />
                    </motion.div>
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
              );
            })}
          
          {/* AI Button - minimalistic with sparkle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                className={`flex items-center justify-center p-2 rounded-lg cursor-pointer transition-colors ${
                  isDarkSide 
                    ? 'hover:bg-red-950/50 text-white hover:text-red-500' 
                    : 'hover:bg-accent'
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => router.push('/stack')}
                role="button"
                aria-label="View AI Stack"
              >
                <Sparkles 
                  className={`w-6 h-6 ${isDarkSide ? 'force-glow text-purple-400' : 'text-purple-600'}`} 
                  aria-hidden="true"
                />
              </motion.div>
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
                AI tools for development
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
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