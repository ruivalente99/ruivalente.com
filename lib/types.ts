import { DivideIcon as LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demo: string;
  github: string;
  content?: string;
  contentPath?: string;
}

export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  companyUrl: string;
  achievements?: string[];
  content?: string;
  contentPath?: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
  url: string;
  content?: string;
  contentPath?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url: string;
  content?: string;
  contentPath?: string;
}

export interface Hobby {
  title: string;
  url: string;
  description: string;
}

export interface SocialLink {
  icon: typeof LucideIcon;
  url: string;
}
