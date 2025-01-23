"use client";

import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from 'next/dynamic';

// Lazy load the Toaster component
const Toaster = dynamic(
  () => import('@/components/ui/toaster').then(mod => mod.Toaster),
  {
    ssr: false,
    loading: () => null,
  }
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 30 * 60 * 1000,
        staleTime: 5 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}