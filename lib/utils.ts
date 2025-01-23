import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Github, Globe, Briefcase, DivideIcon as LucideIcon } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
}

export function getSocialIcon(name: string): LucideIcon {
  switch (name) {
    case 'Github':
      return Github;
    case 'Globe':
      return Globe;
    case 'Briefcase':
      return Briefcase;
    default:
      return Globe;
  }
}