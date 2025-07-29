import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'skills',
  description: 'Rui Valente\'s comprehensive technology stack and technical skills. Mastery in React, TypeScript, Next.js, Node.js, GraphQL, and modern web development tools and frameworks.',
  keywords: [
    'Rui Valente Skills',
    'React Expert',
    'TypeScript Master',
    'Next.js Specialist',
    'Frontend Technologies',
    'Node.js Backend',
    'GraphQL API',
    'Web Development Stack',
    'Programming Languages',
    'Software Engineering Tools'
  ],
  openGraph: {
    title: 'skills.rui',
    description: 'Discover Rui Valente\'s comprehensive technology stack and expertise in modern web development.',
    url: 'https://ruivalente.com/stack',
  },
};

export default function StackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
