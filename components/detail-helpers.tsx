import { Github, Globe, Building, GraduationCap, Award, Code2 } from "lucide-react";
import type { ActionButton, MetadataItem } from "@/components/detail-layout";

// Server-safe factories for DetailLayout props. They live outside the
// "use client" detail-layout module so server components can call them.

// Common action generators
export const createExperienceActions = (companyUrl: string): ActionButton[] => [
  {
    label: "visit company",
    href: companyUrl,
    icon: <Building className="w-3.5 h-3.5" aria-hidden="true" />,
    variant: "outline"
  }
];

export const createProjectActions = (demo: string, github: string): ActionButton[] => {
  const actions: ActionButton[] = [];
  if (demo) {
    actions.push({
      label: "live demo",
      href: demo,
      icon: <Globe className="w-3.5 h-3.5" aria-hidden="true" />,
      variant: "default"
    });
  }
  if (github) {
    actions.push({
      label: "source code",
      href: github,
      icon: <Github className="w-3.5 h-3.5" aria-hidden="true" />,
      variant: "outline"
    });
  }
  return actions;
};

export const createEducationActions = (url: string): ActionButton[] => [
  {
    label: "visit institution",
    href: url,
    icon: <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />,
    variant: "outline"
  }
];

// Common metadata generators
export const createExperienceMetadata = (company: string): MetadataItem[] => [
  {
    icon: <Building className="w-3.5 h-3.5" aria-hidden="true" />,
    label: "company",
    value: company.toLowerCase()
  }
];

export const createProjectMetadata = (technologies?: string[]): MetadataItem[] => {
  const metadata: MetadataItem[] = [];
  if (technologies && technologies.length > 0) {
    metadata.push({
      icon: <Code2 className="w-3.5 h-3.5" aria-hidden="true" />,
      label: "technologies",
      value: `${technologies.length} technologies`
    });
  }
  return metadata;
};

export const createEducationMetadata = (school: string, degree: string): MetadataItem[] => [
  {
    icon: <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />,
    label: "institution",
    value: school.toLowerCase()
  },
  {
    icon: <Award className="w-3.5 h-3.5" aria-hidden="true" />,
    label: "degree type",
    value: degree.toLowerCase().includes("master") ? "master's degree" : "bachelor's degree"
  }
];

