import './globals.css';
import type { Metadata } from 'next';
import { Space_Mono, VT323 } from 'next/font/google';
import dynamic from 'next/dynamic';
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchCommand } from "@/components/search-command";
import { Providers } from './providers';

// Dynamically import components with loading fallbacks
const EasterEggs = dynamic(
  () => import('@/components/easter-eggs').then(mod => ({ default: mod.EasterEggs })),
  { ssr: false }
);

const DarkSideLoading = dynamic(
  () => import('@/components/dark-side-loading').then(mod => ({ default: mod.DarkSideLoading })),
  { ssr: false }
);

// Optimize font loading
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
  preload: true,
});

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: '.rui',
  description: 'rui valente',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${spaceMono.variable} ${vt323.variable} font-sans overflow-y-auto`}>
        <Providers>
          <div className="min-h-[100dvh] flex flex-col">
            <header className="fixed top-0 right-0 left-0 z-50 p-4 flex justify-end gap-2 bg-background/80 backdrop-blur">
              <SearchCommand />
              <ThemeToggle />
            </header>
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
          <EasterEggs />
          <DarkSideLoading />
        </Providers>
      </body>
    </html>
  );
}