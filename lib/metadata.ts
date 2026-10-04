import { Metadata } from 'next';
import { SITE_URL, SITE_NAME, absoluteUrl } from './site';

interface PageMetadata {
  title: string;
  description: string;
  /** Site-relative path of the page (for example "/projects/papyrus"). Drives canonical and og:url. */
  path?: string;
  additionalKeywords?: string[];
  ogImage?: string;
  /** Explicit canonical URL; wins over `path`. */
  canonicalUrl?: string;
  /** Keep a page out of the index. Never set this for pages that should rank. */
  noIndex?: boolean;
  /**
   * Use `title` exactly as given, skipping the root "%s - Rui Valente" template.
   * Needed below the section layouts: a layout that sets a plain string title
   * resets the template for the routes under it.
   */
  absoluteTitle?: boolean;
}

/** Trim to a search-snippet friendly length at a word boundary. */
export function truncateDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : cut.length).replace(/[\s,;:.-]+$/, '')}...`;
}

export const DEFAULT_OG_IMAGE = '/og-image.png';

export function generatePageMetadata({
  title,
  description,
  path,
  additionalKeywords = [],
  ogImage = DEFAULT_OG_IMAGE,
  canonicalUrl,
  noIndex = false,
  absoluteTitle = false,
}: PageMetadata): Metadata {
  const baseKeywords = [
    'Rui Valente',
    'Software Engineer',
    'Frontend Developer',
    'React Developer',
    'TypeScript',
    'Next.js',
    'Web Developer',
    'Portugal',
    'Xelerate',
    'Techem',
    'Openvia',
    'Neoception'
  ];

  const allKeywords = [...baseKeywords, ...additionalKeywords];
  const canonical = canonicalUrl ?? (path ? absoluteUrl(path) : undefined);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: allKeywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [
        {
          url: absoluteUrl(ogImage),
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
    alternates: {
      canonical,
    },
    robots: {
      index: !noIndex,
      follow: true,
    },
  };
}

// Structured Data for different page types
export function generateStructuredData(pageType: string, pageData?: any) {
  const basePersonData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rui Valente",
    "jobTitle": "Software Engineer",
    "url": SITE_URL,
    "image": absoluteUrl('/avatar-256.webp'),
    "email": "email@ruivalente.com",
    "address": {
      "@type": "Place",
      "addressCountry": "Portugal"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Xelerate | Techem",
      "url": "https://www.techem.com"
    },
    "knowsAbout": [
      "React", "TypeScript", "Next.js", "JavaScript", "Node.js", 
      "GraphQL", "CSS", "HTML", "Bootstrap", "Web Development",
      "Frontend Engineering", "Software Engineering"
    ],
    "sameAs": [
      "https://github.com/ruivalente99",
      "https://linkedin.com/in/ruivalente99"
    ]
  };

  switch (pageType) {
    case 'projects':
      return {
        ...basePersonData,
        "@type": ["Person", "CreativeWork"],
        "mainEntity": {
          "@type": "ItemList",
          "name": "Software Engineering Projects",
          "description": "Collection of projects by Rui Valente showcasing React, TypeScript, and modern web development",
          "itemListElement": pageData?.projects?.map((project: any, index: number) => ({
            "@type": "SoftwareApplication",
            "position": index + 1,
            "name": project.title,
            "description": project.description,
            "url": project.demo,
            "codeRepository": project.github,
            "programmingLanguage": ["JavaScript", "TypeScript", "React"],
            "author": {
              "@type": "Person",
              "name": "Rui Valente"
            }
          })) || []
        }
      };

    case 'experience':
      return {
        ...basePersonData,
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": "Frontend Engineer",
            "occupationLocation": {
              "@type": "Organization",
              "name": "Xelerate | Techem",
              "url": "https://www.techem.com"
            },
            "startDate": "2025"
          },
          {
            "@type": "Occupation",
            "name": "Frontend Engineer",
            "occupationLocation": {
              "@type": "Organization",
              "name": "Openvia",
              "url": "https://openvia.io"
            },
            "startDate": "2022",
            "endDate": "2025"
          },
          {
            "@type": "Occupation", 
            "name": "Software Engineer Trainee",
            "occupationLocation": {
              "@type": "Organization",
              "name": "Neoception",
              "url": "https://www.neoception.com/"
            },
            "startDate": "2021",
            "endDate": "2022"
          }
        ]
      };

    default:
      return basePersonData;
  }
}

// Helper function to create AI context prompts for metadata
export function createAIContextPrompts(pageType: string, specificContext: string) {
  return {
    "ai-page-type": pageType,
    "ai-specific-context": specificContext,
    "ai-developer": "Rui Valente - Software Engineer specializing in React, TypeScript, Next.js",
    "ai-current-role": "Frontend Engineer at Xelerate | Techem (2025-Present)",
    "ai-expertise": "React, TypeScript, Next.js, JavaScript, Node.js, GraphQL, CSS, HTML, Bootstrap, Git, CI/CD",
    "ai-location": "Portugal",
    "ai-contact": "email@ruivalente.com",
    "ai-personality": "Professional, passionate about clean code, mentoring, and sustainable technology"
  };
}
