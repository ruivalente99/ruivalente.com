import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'projects',
  description: 'Rui Valente\'s software engineering projects and portfolio. Featuring Lazy Life sustainability platform, EV charging solutions, and cutting-edge React/TypeScript applications.',
  keywords: [
    'Rui Valente Projects',
    'Lazy Life Project',
    'AI Sustainability Platform',
    'EV Charging Platform',
    'React Projects',
    'TypeScript Applications',
    'Next.js Portfolio',
    'Web Development Projects',
    'Software Engineering Portfolio'
  ],
  openGraph: {
    title: 'projects.rui',
    description: 'Discover Rui Valente\'s innovative software projects including AI-powered platforms and modern web applications.',
    url: 'https://ruivalente.com/projects',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
