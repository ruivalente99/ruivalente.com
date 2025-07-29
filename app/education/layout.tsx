import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'education',
  description: 'Rui Valente\'s educational background and professional certifications. Computer Science degree and continuous learning in React, TypeScript, and modern web development technologies.',
  keywords: [
    'Rui Valente Education',
    'Computer Science Degree',
    'Frontend Masters Certificates',
    'React Certification',
    'TypeScript Training',
    'Professional Development',
    'Software Engineering Education',
    'Programming Certifications'
  ],
  openGraph: {
    title: 'education.rui',
    description: 'Explore Rui Valente\'s educational journey and professional certifications in software engineering.',
    url: 'https://ruivalente.com/education',
  },
};

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
