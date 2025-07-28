import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
  additionalKeywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export function generatePageMetadata({
  title,
  description,
  additionalKeywords = [],
  ogImage = '/avatar.png',
  canonicalUrl
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
    'Openvia',
    'Neoception'
  ];

  const allKeywords = [...baseKeywords, ...additionalKeywords];

  return {
    title,
    description,
    keywords: allKeywords,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      siteName: 'Rui Valente - Software Engineer',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
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
    "url": "https://ruivalente.com",
    "image": "https://ruivalente.com/avatar.png",
    "email": "email@ruivalente.com",
    "address": {
      "@type": "Place",
      "addressCountry": "Portugal"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Openvia",
      "url": "https://openvia.io"
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
              "name": "Openvia",
              "url": "https://openvia.io"
            },
            "startDate": "2022"
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
    "ai-current-role": "Frontend Engineer at Openvia (2022-Present)",
    "ai-expertise": "React, TypeScript, Next.js, JavaScript, Node.js, GraphQL, CSS, HTML, Bootstrap, Git, CI/CD",
    "ai-location": "Portugal",
    "ai-contact": "email@ruivalente.com",
    "ai-personality": "Professional, passionate about clean code, mentoring, and sustainable technology"
  };
}
