"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface GitHubCommitData {
  date: string;
  count: number;
  level: number;
}

interface GitHubCommitGraphProps {
  username: string;
  className?: string;
  opacity?: number;
}

export function GitHubCommitGraph({ username, className = "", opacity = 0.15 }: GitHubCommitGraphProps) {
  const [commitData, setCommitData] = useState<GitHubCommitData[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDarkSide = theme === 'dark-side';

  useEffect(() => {
    const fetchCommitData = async () => {
      try {
        // GitHub's contribution API endpoint
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        const data = await response.json();
        
        if (data.contributions) {
          const contributions: GitHubCommitData[] = data.contributions.map((contrib: any) => ({
            date: contrib.date,
            count: contrib.count,
            level: contrib.level
          }));
          setCommitData(contributions);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub commit data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommitData();
  }, [username]);

  if (loading || commitData.length === 0) {
    return null;
  }

  // Generate a simplified grid representation
  const weeks = Math.ceil(commitData.length / 7);
  const gridItems = [];

  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < 7; day++) {
      const index = week * 7 + day;
      const commit = commitData[index];
      
      if (commit) {
        gridItems.push({
          ...commit,
          week,
          day
        });
      }
    }
  }

  const getSquareColor = (level: number) => {
    if (isDarkSide) {
      // Dark side theme - red variations for dark-side
      switch (level) {
        case 0: return 'transparent';
        case 1: return `hsl(0 100% 50% / ${opacity * 0.7})`; // red with configurable opacity
        case 2: return `hsl(0 100% 50% / ${opacity * 1.0})`;
        case 3: return `hsl(0 100% 50% / ${opacity * 1.3})`;
        case 4: return `hsl(0 100% 50% / ${opacity * 1.6})`;
        default: return 'transparent';
      }
    } else {
      // Regular theme - use foreground/text color with configurable opacity
      switch (level) {
        case 0: return 'transparent';
        case 1: return `hsl(var(--foreground) / ${opacity * 0.5})`;
        case 2: return `hsl(var(--foreground) / ${opacity * 0.8})`;
        case 3: return `hsl(var(--foreground) / ${opacity * 1.1})`;
        case 4: return `hsl(var(--foreground) / ${opacity * 1.3})`;
        default: return 'transparent';
      }
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Fade overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to right, 
            hsl(var(--card) / 0.7) 0%, 
            hsl(var(--card) / 0.3) 50%, 
            hsl(var(--card) / 0.7) 100%)`
        }}
      />
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to bottom, 
            hsl(var(--card) / 0.6) 0%, 
            transparent 50%, 
            hsl(var(--card) / 0.6) 100%)`
        }}
      />
      
      {/* Commit graph grid */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <div 
          className="grid gap-0.5 md:gap-1"
          style={{
            gridTemplateColumns: `repeat(${Math.min(weeks, 53)}, 1fr)`,
            gridTemplateRows: 'repeat(7, 1fr)',
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: '120px'
          }}
        >
          {gridItems.slice(0, 53 * 7).map((item, index) => (
            <div
              key={`${item.week}-${item.day}`}
              className="w-1 h-1 md:w-2 md:h-2 rounded-sm transition-all duration-300"
              style={{
                backgroundColor: getSquareColor(item.level),
                gridColumn: item.week + 1,
                gridRow: item.day + 1,
              }}
              title={`${item.count} contributions on ${item.date}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
