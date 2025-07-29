import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'experience',
  description: 'Rui Valente\'s professional software engineering experience. Currently Frontend Engineer at Openvia, previously Software Engineer at Neoception. Expertise in React, TypeScript, Next.js, and modern web development.',
  keywords: [
    'Rui Valente Experience',
    'Frontend Engineer Openvia',
    'Software Engineer Neoception',
    'React Developer Experience',
    'TypeScript Professional',
    'Next.js Expert',
    'Web Development Career',
    'Software Engineering Jobs',
    'Portugal Developer'
  ],
  openGraph: {
    title: 'experience.rui',
    description: 'Explore Rui Valente\'s professional software engineering journey, from trainee to expert frontend engineer.',
    url: 'https://ruivalente.com/experience',
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
