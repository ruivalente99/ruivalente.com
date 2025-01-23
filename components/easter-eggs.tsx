"use client";

import { useEffect, useState } from 'react';
import { KONAMI_CODE } from '@/lib/easter-eggs';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from 'next-themes';

export function EasterEggs() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const { toast } = useToast();
  const { setTheme } = useTheme();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Only keep Konami code handler
      if (e.key === KONAMI_CODE[konamiIndex]) {
        if (konamiIndex === KONAMI_CODE.length - 1) {
          setTheme('terminal');
          toast({
            title: "⭐ Konami Code Activated!",
            description: "Terminal mode activated. Type 'help' in the command bar for available commands.",
            duration: 5000,
          });
          setKonamiIndex(0);
        } else {
          setKonamiIndex(prev => prev + 1);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [konamiIndex, setTheme, toast]);

  return null;
}