import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'certificates',
  description: 'Rui Valente\'s professional certificates and achievements. Certifications from Frontend Masters, Udemy, and other recognized platforms in React, TypeScript, project management, and secure coding.',
  keywords: [
    'Rui Valente Certificates',
    'Frontend Masters Certification',
    'React Certificate',
    'TypeScript Certification',
    'Project Management Certificate',
    'Secure Coding Training',
    'Professional Development',
    'Software Engineering Achievements'
  ],
  openGraph: {
    title: 'certificates.rui',
    description: 'View Rui Valente\'s professional certificates and continuous learning achievements.',
    url: 'https://ruivalente.com/certificates',
  },
};

export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
