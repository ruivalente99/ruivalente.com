"use client";

import { motion } from "framer-motion";
import { ExternalLink, Music, Tv } from "lucide-react";
import { useTheme } from "next-themes";
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

// Winter theme specific hobbies
const winterHobbies: Hobbies = {
  playlist: {
    title: "christmas playlist",
    url: "https://open.spotify.com/playlist/37i9dQZF1DX0Yxoavh5qJV",
    description: "Christmas Hits 🎄"
  },
  watching: {
    title: "currently watching",
    url: "https://www.imdb.com/title/tt0104431/",
    description: "Home Alone 2: Lost in New York"
  }
};

export function HobbiesSection() {
  const { data: hobbies, isLoading } = useData<Hobbies>('/api/hobbies');
  const { theme } = useTheme();

  if (isLoading) {
    return <HobbiesSkeleton />;
  }

  if (!hobbies) return null;

  // Use winter-themed hobbies when winter theme is active
  const activeHobbies = theme === "winter" ? winterHobbies : hobbies;

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
              <h3 className="text-sm font-bold">{activeHobbies.playlist.title}</h3>
            </header>
            <a
              href={activeHobbies.playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-muted-foreground hover:text-primary group transition-colors"
              aria-label={`Listen to ${activeHobbies.playlist.title} on music platform`}
            >
              <div className="flex items-center gap-1">
                <span>{activeHobbies.playlist.description}</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </div>
            </a>
          </motion.div>
        </article>
        
        <article>
          <motion.div whileHover={{ scale: 1.02 }}>
            <header className="flex items-center gap-2 mb-2">
              <Tv className="w-4 h-4" aria-hidden="true" />
              <h3 className="text-sm font-bold">{activeHobbies.watching.title}</h3>
            </header>
            <a
              href={activeHobbies.watching.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-muted-foreground hover:text-primary group transition-colors"
              aria-label={`Watch ${activeHobbies.watching.title} on streaming platform`}
            >
              <div className="flex items-center gap-1">
                <span>{activeHobbies.watching.description}</span>
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