"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Github, Globe, Calendar, Building, GraduationCap, Award, Code2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ReactNode } from "react";

export interface ActionButton {
  label: string;
  href: string;
  icon: ReactNode;
  variant?: "default" | "outline" | "secondary";
}

export interface MetadataItem {
  icon: ReactNode;
  label: string;
  value: string;
}

export interface DetailLayoutProps {
  title: string;
  subtitle?: string;
  year?: string;
  tags?: string[];
  actions?: ActionButton[];
  metadata?: MetadataItem[];
  content?: string;
  children?: ReactNode;
  isLoading?: boolean;
  type?: "experience" | "project" | "education";
  image?: string;
}

export function DetailLayout({
  title,
  subtitle,
  year,
  tags = [],
  actions = [],
  metadata = [],
  content,
  children,
  isLoading = false,
  type = "experience",
  image
}: DetailLayoutProps) {
  const router = useRouter();

  if (isLoading) {
    return <DetailSkeleton />;
  }

  const getTypeIcon = () => {
    switch (type) {
      case "project":
        return <Code2 className="w-3.5 h-3.5" aria-hidden="true" />;
      case "education":
        return <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />;
      default:
        return <Building className="w-3.5 h-3.5" aria-hidden="true" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <header className="relative border-b border-border/60 bg-gradient-to-b from-muted/30 via-background to-background overflow-hidden lowercase">
        {/* Subtle theme-aware accent ambient lighting */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
          aria-hidden="true"
        />

        <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* Standardized Back Navigation */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="group mb-6 -ml-2 text-muted-foreground hover:text-foreground active:scale-[0.96] transition-all lowercase"
              aria-label="back to previous view"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform duration-150 group-hover:-translate-x-0.5" aria-hidden="true" />
              <span>back</span>
            </Button>

            <div className="space-y-5">
              {/* Type Micro-Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-muted/60 border border-border/50 text-muted-foreground">
                {getTypeIcon()}
                <span className="lowercase">{type}</span>
              </div>

              {/* Title & Actions Row */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                    {title}
                  </h1>

                  {subtitle && (
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                      {subtitle}
                    </p>
                  )}

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-3.5 pt-1 text-xs sm:text-sm text-muted-foreground">
                    {year && (
                      <div className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-4 h-4 opacity-70" aria-hidden="true" />
                        <span>{year}</span>
                      </div>
                    )}
                    {metadata.map((item, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <span className="opacity-40" aria-hidden="true">•</span>
                        <span className="opacity-70 flex items-center" aria-hidden="true">{item.icon}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {actions.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-1 shrink-0">
                    {actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant || "outline"}
                        size="sm"
                        asChild
                        className="h-9 px-3.5 rounded-lg border-border/70 hover:border-border text-xs sm:text-sm font-medium shadow-2xs active:scale-[0.96] transition-all"
                      >
                        <a
                          href={action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          {action.icon}
                          <span>{action.label}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills & Technologies Tags */}
              {tags.length > 0 && (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-muted/50 text-foreground/90 border border-border/50 hover:bg-muted/80 hover:border-border transition-colors duration-150"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Optional Project Hero Image Banner */}
          {image && (
            <div className="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-border/70 shadow-xs bg-muted/20">
              <Image
                src={image}
                alt={`${title} preview graphic`}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-2xl pointer-events-none" />
            </div>
          )}

          {/* Prose Content Surface Card */}
          <Card className="overflow-hidden rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xs shadow-xs">
            <div className="p-6 sm:p-10 lg:p-12">
              <article className="prose-detail">
                {content ? (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  children
                )}
              </article>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/60 bg-muted/20">
        <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
          <div className="space-y-6">
            <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
            <div className="h-5 w-28 bg-muted rounded-full animate-pulse" />
            <div className="space-y-3">
              <div className="h-10 w-3/4 bg-muted rounded-md animate-pulse" />
              <div className="h-5 w-1/2 bg-muted rounded-md animate-pulse" />
              <div className="h-4 w-1/3 bg-muted rounded-md animate-pulse" />
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-20 bg-muted rounded-md animate-pulse" />
              <div className="h-6 w-24 bg-muted rounded-md animate-pulse" />
              <div className="h-6 w-18 bg-muted rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto py-10 md:py-14 px-4 sm:px-6">
        <Card className="rounded-2xl border border-border/80 p-6 sm:p-10 lg:p-12">
          <div className="space-y-6">
            <div className="h-7 w-1/3 bg-muted rounded-md animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-muted rounded-md animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded-md animate-pulse" />
              <div className="h-4 w-4/6 bg-muted rounded-md animate-pulse" />
            </div>
            <div className="h-6 w-1/4 bg-muted rounded-md animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-muted rounded-md animate-pulse" />
              <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

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

