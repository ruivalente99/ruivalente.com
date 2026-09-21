"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Layers, Sparkles, LucideIcon, LayoutGrid, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { SiStackblitz as DefaultIcon } from "react-icons/si";
import { useIconMap } from "@/lib/hooks/useIconMap";
import { cn } from "@/lib/utils";

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

export default function StackPage() {
  const router = useRouter();
  const iconMap = useIconMap();
  const [viewMode, setViewMode] = useState<'cards' | 'tags'>('cards');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ruivalente_stack_page_mode');
      if (saved === 'cards' || saved === 'tags') {
        setViewMode(saved);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleModeChange = (mode: 'cards' | 'tags') => {
    setViewMode(mode);
    try {
      localStorage.setItem('ruivalente_stack_page_mode', mode);
    } catch {
      // Ignore localStorage errors
    }
  };

  const { data: stack, isLoading } = useData<TechCategory[]>("/api/stack");

  if (isLoading) {
    return <StackSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground lowercase">
      {/* Harmonized Hero Section */}
      <header className="relative border-b border-border/60 bg-gradient-to-b from-muted/30 via-background to-background overflow-hidden">
        {/* Subtle theme-aware accent ambient lighting */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
          aria-hidden="true"
        />

        <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* Standardized Back Navigation */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="group mb-6 -ml-2 text-muted-foreground hover:text-foreground active:scale-[0.96] transition-all lowercase"
              aria-label="back to previous view"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform duration-150 group-hover:-translate-x-0.5" aria-hidden="true" />
              <span>back</span>
            </Button>

            <div className="space-y-5">
              {/* Type Micro-Badge & Mode Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-muted/60 border border-border/50 text-muted-foreground">
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>engineering stack</span>
                </div>

                <div
                  className="inline-flex items-center rounded-lg border border-border/60 bg-muted/30 p-0.5 text-muted-foreground"
                  role="radiogroup"
                  aria-label="stack display mode"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={viewMode === 'cards'}
                    onClick={() => handleModeChange('cards')}
                    className={cn(
                      "h-7 px-2.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 active:scale-95",
                      viewMode === 'cards'
                        ? "bg-background text-foreground shadow-2xs font-semibold"
                        : "hover:text-foreground"
                    )}
                    aria-label="cards view"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>cards</span>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={viewMode === 'tags'}
                    onClick={() => handleModeChange('tags')}
                    className={cn(
                      "h-7 px-2.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 active:scale-95",
                      viewMode === 'tags'
                        ? "bg-background text-foreground shadow-2xs font-semibold"
                        : "hover:text-foreground"
                    )}
                    aria-label="tags view"
                  >
                    <Type className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>tags</span>
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                  technical arsenal &amp; tooling
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  curated frameworks, programming languages, system utilities, and autonomous ai agents driving my daily engineering practice.
                </p>
              </div>

              {/* Category Quick Navigation Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {stack?.map((cat) => (
                  <a
                    key={cat.category}
                    href={`#${cat.category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-muted/50 text-foreground/90 border border-border/50 hover:bg-muted/80 hover:border-border transition-colors duration-150"
                  >
                    {cat.category.toLowerCase()}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
        <div className="space-y-12">
          {stack?.map((category) => {
            const isAi = category.category.toLowerCase().includes("ai");
            const sectionId = category.category.toLowerCase().replace(/\s+/g, "-");

            return (
              <section key={category.category} id={sectionId} className="space-y-5 scroll-mt-20">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                    {isAi && <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />}
                    <span>{category.category.toLowerCase()}</span>
                  </h2>
                  <span className="text-xs font-mono text-muted-foreground">
                    {category.items.length} {category.items.length === 1 ? "tool" : "tools"}
                  </span>
                </div>

                {viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((tech) => {
                      const Icon = (iconMap[tech.icon.toLowerCase() as keyof typeof iconMap] || DefaultIcon) as LucideIcon;

                      return (
                        <article
                          key={tech.name}
                          className={cn(
                            "group relative p-5 rounded-xl transition-all duration-200 flex flex-col justify-between",
                            isAi
                              ? "border-2 border-primary/40 bg-gradient-to-br from-primary/5 via-card to-card shadow-2xs hover:border-primary/60"
                              : "border border-border/70 hover:border-border bg-card/60 hover:bg-card/90 shadow-2xs"
                          )}
                        >
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-colors",
                                  isAi
                                    ? "bg-primary/10 border-primary/30 text-primary"
                                    : "bg-muted/60 border-border/50 text-foreground group-hover:bg-muted"
                                )}
                              >
                                <Icon className="w-5 h-5" aria-hidden="true" />
                              </div>
                              <div>
                                <h3 className="text-base font-semibold tracking-tight text-foreground">
                                  {tech.name.toLowerCase()}
                                </h3>
                                {isAi && (
                                  <span className="inline-block text-[10px] font-mono lowercase tracking-wider text-primary font-semibold">
                                    autonomous agent
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                              {tech.description.toLowerCase()}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-border/40 mt-auto">
                            <p className="text-xs text-muted-foreground leading-normal">
                              <span className="font-semibold text-foreground">why i use it: </span>
                              {tech.reason.toLowerCase()}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2.5 p-4 rounded-xl border border-border/60 bg-card/40">
                    {category.items.map((tech) => {
                      const Icon = (iconMap[tech.icon.toLowerCase() as keyof typeof iconMap] || DefaultIcon) as LucideIcon;

                      return (
                        <div
                          key={tech.name}
                          className={cn(
                            "inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-150 text-xs font-mono",
                            isAi
                              ? "bg-primary/10 border-primary/40 text-primary shadow-2xs"
                              : "bg-muted/40 hover:bg-muted/70 border-border/60 text-foreground"
                          )}
                        >
                          <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span className="font-medium text-foreground">{tech.name.toLowerCase()}</span>
                          <span className="text-muted-foreground border-l border-border/50 pl-2">
                            {tech.description.toLowerCase()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function StackSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground lowercase">
      <div className="border-b border-border/60 bg-muted/20">
        <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
          <div className="space-y-6">
            <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
            <div className="h-5 w-32 bg-muted rounded-full animate-pulse" />
            <div className="space-y-3">
              <div className="h-10 w-3/4 bg-muted rounded-md animate-pulse" />
              <div className="h-5 w-1/2 bg-muted rounded-md animate-pulse" />
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-20 bg-muted rounded-md animate-pulse" />
              <div className="h-6 w-24 bg-muted rounded-md animate-pulse" />
              <div className="h-6 w-20 bg-muted rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
        <div className="space-y-10">
          {[1, 2, 3].map((section) => (
            <div key={section} className="space-y-4">
              <div className="h-6 w-36 bg-muted rounded animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-5 rounded-xl border border-border/70 bg-card/60 space-y-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-lg" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="pt-3 border-t border-border/40">
                      <Skeleton className="h-3 w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}