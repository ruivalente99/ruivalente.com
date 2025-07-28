"use client";

import { motion } from "framer-motion";
import { ExternalLink, Music, Tv } from "lucide-react";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { data: hobbies, isLoading } = useData<Hobbies>('/api/hobbies');

  if (isLoading) {
    return <HobbiesSkeleton />;
  }

  if (!hobbies) return null;

  return (
    <section className="p-4" aria-labelledby="hobbies-heading">
      <header>
        <h2 id="hobbies-heading" className="text-sm font-bold mb-4">hobbies</h2>
      </header>
      <div className="space-y-4">
        <article>
          <motion.div whileHover={{ scale: 1.02 }}>
            <header className="flex items-center gap-2 mb-2">
              <Music className="w-4 h-4" aria-hidden="true" />
              <h3 className="text-sm font-bold">{hobbies.playlist.title}</h3>
            </header>
            <a
              href={hobbies.playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-muted-foreground hover:text-primary group transition-colors"
              aria-label={`Listen to ${hobbies.playlist.title} on music platform`}
            >
              <div className="flex items-center gap-1">
                <span>{hobbies.playlist.description}</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </div>
            </a>
          </motion.div>
        </article>
        
        <article>
          <motion.div whileHover={{ scale: 1.02 }}>
            <header className="flex items-center gap-2 mb-2">
              <Tv className="w-4 h-4" aria-hidden="true" />
              <h3 className="text-sm font-bold">{hobbies.watching.title}</h3>
            </header>
            <a
              href={hobbies.watching.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-muted-foreground hover:text-primary group transition-colors"
              aria-label={`Watch ${hobbies.watching.title} on streaming platform`}
            >
              <div className="flex items-center gap-1">
                <span>{hobbies.watching.description}</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </div>
            </a>
          </motion.div>
        </article>
      </div>
    </section>
  );
}

function HobbiesSkeleton() {
  return (
    <div className="p-4">
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
    </div>
  );
}