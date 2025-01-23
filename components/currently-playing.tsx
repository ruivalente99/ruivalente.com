"use client";

import { useState, useEffect } from "react";
import { Music } from "lucide-react";
import { motion } from "framer-motion";

interface SpotifyTrack {
  name: string;
  artist: string;
  url: string;
}

export function CurrentlyPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated API call - replace with actual Spotify API integration
    const fetchCurrentTrack = () => {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setTrack({
          name: "Coding Focus",
          artist: "Lo-Fi Beats",
          url: "https://open.spotify.com/track/123"
        });
        setIsLoading(false);
      }, 1000);
    };

    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
        <Music className="w-4 h-4" />
        <span>Loading...</span>
      </div>
    );
  }

  if (!track) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2"
    >
      <Music className="w-4 h-4" />
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-muted-foreground hover:text-primary"
      >
        {track.name} - {track.artist}
      </a>
    </motion.div>
  );
}