"use client";

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/context";
import { InitialDataProvider } from "@/lib/hooks/initial-data";
import { AnimationProvider } from "@/lib/animation/context";
import dynamic from 'next/dynamic';

import { TerminalWindowProvider } from "@/components/terminal/terminal-window-context";

const TerminalWindow = dynamic(
  () => import('@/components/terminal/terminal-window').then(mod => mod.TerminalWindow),
  {
    ssr: false,
    loading: () => null,
  }
);

// Lazy load the Toaster component
const Toaster = dynamic(
  () => import('@/components/ui/toaster').then(mod => mod.Toaster),
  {
    ssr: false,
    loading: () => null,
  }
);

export function Providers({
  children,
  initialData = {},
}: {
  children: React.ReactNode;
  initialData?: Record<string, unknown>;
}) {
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

  return (
    <QueryClientProvider client={queryClient}>
      <InitialDataProvider value={initialData}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <AnimationProvider>
              <TerminalWindowProvider>
                {children}
                <TerminalWindow />
                <Toaster />
                <Analytics />
                <SpeedInsights />
              </TerminalWindowProvider>
            </AnimationProvider>
          </I18nProvider>
        </ThemeProvider>
      </InitialDataProvider>
    </QueryClientProvider>
  );
}
