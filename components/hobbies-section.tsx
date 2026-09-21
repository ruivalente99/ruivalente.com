"use client";

import { motion } from "framer-motion";
import { ExternalLink, Music, Tv } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n/context";

interface Hobbies {
  playlist: {
    title: string;
    url: string;
    description: string;
  };
  watching: {
    title: string;
    url: string;
    description: string;
  };
}

export function HobbiesSection() {
  const { t } = useI18n();
  const { data: hobbies, isLoading } = useData<Hobbies>('/api/hobbies');

  if (isLoading) {
    return <HobbiesSkeleton />;
  }

  if (!hobbies) return null;

  return (
    <Card className="h-full p-4 flex flex-col justify-between" role="region" aria-labelledby="hobbies-heading">
      <header className="mb-3">
        <h2 id="hobbies-heading" className="text-xs font-semibold lowercase tracking-wider text-muted-foreground">
          {t.bento.hobbies.title.toLowerCase()}
        </h2>
      </header>
      <div className="space-y-2.5 my-auto">
        <article>
          <a
            href={hobbies.playlist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl p-3 bg-muted/25 hover:bg-muted/60 border border-border/40 transition-all duration-150 group active:scale-[0.98] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Listen to ${hobbies.playlist.title} (opens in new tab)`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-foreground/80" aria-hidden="true" />
                <h3 className="text-xs font-semibold tracking-tight">{hobbies.playlist.title}</h3>
              </div>
              {/* Mini animated equalizer bars */}
              <span className="flex items-end gap-[2px] h-3 w-3" aria-hidden="true">
                <span className="w-[2px] bg-primary rounded-full animate-[pulse_1s_ease-in-out_infinite] h-full" />
                <span className="w-[2px] bg-primary rounded-full animate-[pulse_1.4s_ease-in-out_infinite] h-2/3" />
                <span className="w-[2px] bg-primary rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4/5" />
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              <span className="text-[11px] truncate">{hobbies.playlist.description}</span>
              <ExternalLink className="w-3 h-3 shrink-0 ml-1 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true" />
            </div>
          </a>
        </article>
        
        <article>
          <a
            href={hobbies.watching.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl p-3 bg-muted/25 hover:bg-muted/60 border border-border/40 transition-all duration-150 group active:scale-[0.98] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Watch ${hobbies.watching.title} (opens in new tab)`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Tv className="w-3.5 h-3.5 text-foreground/80" aria-hidden="true" />
                <h3 className="text-xs font-semibold tracking-tight">{hobbies.watching.title}</h3>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-primary/70 animate-pulse" />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              <span className="text-[11px] truncate">{hobbies.watching.description}</span>
              <ExternalLink className="w-3 h-3 shrink-0 ml-1 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true" />
            </div>
          </a>
        </article>
      </div>
    </Card>
  );
}

function HobbiesSkeleton() {
  return (
    <Card className="h-full p-4">
      <Skeleton className="h-4 w-24 mb-4" />
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i}>
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-48" />
          </div>
        ))}
      </div>
    </Card>
  );
}