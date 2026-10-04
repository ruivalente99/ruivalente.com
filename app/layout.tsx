import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Space_Mono, VT323 } from 'next/font/google';
import dynamic from 'next/dynamic';
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchCommand } from "@/components/search-command";
import { LanguageToggle } from "@/components/language-toggle";
import { AnimationToggle } from "@/components/animation-toggle";
import { ContactForm } from "@/components/contact-form";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from './providers';
import { SITE_URL, SITE_NAME, absoluteUrl } from '@/lib/site';
import { author } from '@/lib/about';
import { initialData } from '@/lib/data/initial-data';
import { DEFAULT_OG_IMAGE } from '@/lib/metadata';

// Dynamically import components with loading fallbacks
const EasterEggs = dynamic(
  () => import('@/components/easter-eggs').then(mod => ({ default: mod.EasterEggs })),
);

const DarkSideLoading = dynamic(
  () => import('@/components/dark-side-loading').then(mod => ({ default: mod.DarkSideLoading })),
);

// Optimize font loading
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
  preload: true,
});

// Declared for the terminal theme only; never preload it for regular page loads.
const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
  preload: false,
});

const siteDescription =
  'Rui Valente is a frontend software engineer from Portugal building fast, accessible web apps with React, TypeScript and Next.js. Projects, experience and stack.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rui Valente - Frontend Software Engineer',
    template: '%s - Rui Valente',
  },
  description: siteDescription,
  applicationName: SITE_NAME,
  authors: [{ name: author.name, url: absoluteUrl('/about') }],
  creator: author.name,
  publisher: author.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Rui Valente - Frontend Software Engineer',
    description: siteDescription,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: 'Rui Valente',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rui Valente - Frontend Software Engineer',
    description: siteDescription,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    creator: '@ruivalente99',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the token from Search Console
  // (HTML tag method). Omitted entirely when unset so no bogus tag is emitted.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${spaceMono.variable} ${vt323.variable} font-sans overflow-y-auto`}>
        <Providers initialData={initialData}>
          <div className="min-h-[100dvh] flex flex-col relative lowercase">
            {/* Subtle atmospheric backdrop lighting */}
            <div
              className="pointer-events-none fixed inset-0 z-0 opacity-50 dark:opacity-30 transition-opacity"
              style={{
                background: 'radial-gradient(ellipse 80% 50% at 50% -10%, hsl(var(--primary) / 0.15), transparent 70%)'
              }}
              aria-hidden="true"
            />
            <header className="fixed top-0 right-0 left-0 z-50 px-4 py-3 sm:px-6 flex justify-end items-center gap-2 bg-background/75 backdrop-blur-md border-b border-border/40">
              <SearchCommand />
              <LanguageToggle />
              <AnimationToggle />
              <ContactForm />
              <ThemeToggle />
            </header>
            <main className="flex-1 pt-16 relative z-10">
              {children}
            </main>
            <Footer />
          </div>
          <EasterEggs />
          <DarkSideLoading />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
