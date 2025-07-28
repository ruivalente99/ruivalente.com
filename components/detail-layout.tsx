"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Github, Globe, Calendar, Building, GraduationCap, Award, Code2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface ActionButton {
  label: string;
  href: string;
  icon: ReactNode;
  variant?: "default" | "outline" | "secondary";
}

interface MetadataItem {
  icon: ReactNode;
  label: string;
  value: string;
}

interface DetailLayoutProps {
  title: string;
  subtitle?: string;
  year?: string;
  tags?: string[];
  actions?: ActionButton[];
  metadata?: MetadataItem[];
  content?: string; // HTML content from markdown
  children?: ReactNode; // Fallback for direct content
  isLoading?: boolean;
  type?: "experience" | "project" | "education";
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
  type = "experience"
}: DetailLayoutProps) {
  const router = useRouter();

  if (isLoading) {
    return <DetailSkeleton />;
  }

  const getTypeIcon = () => {
    switch (type) {
      case "project":
        return <Code2 className="w-5 h-5" />;
      case "education":
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <Building className="w-5 h-5" />;
    }
  };

  const getGradientClass = () => {
    switch (type) {
      case "project":
        return "bg-gradient-to-br from-blue-500/10 via-background to-purple-500/10";
      case "education":
        return "bg-gradient-to-br from-green-500/10 via-background to-emerald-500/10";
      default:
        return "bg-gradient-to-br from-orange-500/10 via-background to-red-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className={`border-b ${getGradientClass()}`}>
        <div className="container mx-auto py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-8 -ml-4 hover:bg-background/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="space-y-6">
              {/* Type indicator */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                {getTypeIcon()}
                <span className="text-sm font-medium uppercase tracking-wider">
                  {type}
                </span>
              </motion.div>

              {/* Main content */}
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4 flex-1"
                >
                  <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
                    {title}
                  </h1>
                  
                  {subtitle && (
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                      {subtitle}
                    </p>
                  )}

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    {year && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{year}</span>
                      </div>
                    )}
                    {metadata.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-muted-foreground">
                        {item.icon}
                        <span className="text-sm font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Actions */}
                {actions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-3"
                  >
                    {actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant || "outline"}
                        size="lg"
                        asChild
                        className="shadow-sm hover:shadow-md transition-shadow"
                      >
                        <a
                          href={action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          {action.icon}
                          {action.label}
                        </a>
                      </Button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Skills & Technologies */}
              {tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6"
                >
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                    Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => {
                      const getTagColor = () => {
                        switch (type) {
                          case "project":
                            return "border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 hover:border-primary/30";
                          case "education":
                            return "border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 hover:border-primary/30";
                          default:
                            return "border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 hover:border-primary/30";
                        }
                      };

                      const getDotColor = () => {
                        return "bg-primary";
                      };

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.05 }}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-105 ${getTagColor()}`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`} />
                          <span className="text-xs font-medium">
                            {tag}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-card via-card to-muted/5">
            <div className="p-8 xl:p-16">
              <div className="prose prose-lg prose-slate dark:prose-invert max-w-none 
                prose-headings:scroll-mt-20 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl 
                prose-p:leading-7 prose-li:leading-6 prose-li:marker:text-primary
                prose-strong:text-foreground prose-code:text-primary
                prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                prose-h3:text-primary prose-a:text-primary hover:prose-a:text-primary/80
                prose-pre:bg-muted prose-pre:border">
                {content ? (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  children
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="h-10 w-20 bg-muted rounded animate-pulse" />
            
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-muted rounded animate-pulse" />
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              </div>
              
              <div className="space-y-4">
                <div className="h-12 w-4/5 bg-muted rounded animate-pulse" />
                <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
              </div>
              
              <div className="flex gap-2">
                <div className="h-10 w-32 bg-muted rounded animate-pulse" />
                <div className="h-10 w-28 bg-muted rounded animate-pulse" />
              </div>
              
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                <div className="h-6 w-24 bg-muted rounded animate-pulse" />
                <div className="h-6 w-18 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 xl:p-16">
            <div className="space-y-6">
              <div className="h-8 w-2/3 bg-muted rounded animate-pulse" />
              <div className="space-y-4">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-muted rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-6 w-1/2 bg-muted rounded animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Common action generators for different types
export const createExperienceActions = (companyUrl: string): ActionButton[] => [
  {
    label: "Visit Company",
    href: companyUrl,
    icon: <Building className="w-4 h-4" />,
    variant: "outline"
  }
];

export const createProjectActions = (demo: string, github: string): ActionButton[] => [
  {
    label: "Live Demo",
    href: demo,
    icon: <Globe className="w-4 h-4" />,
    variant: "default"
  },
  {
    label: "Source Code",
    href: github,
    icon: <Github className="w-4 h-4" />,
    variant: "outline"
  }
];

export const createEducationActions = (url: string): ActionButton[] => [
  {
    label: "Visit Institution",
    href: url,
    icon: <GraduationCap className="w-4 h-4" />,
    variant: "outline"
  }
];

// Metadata generators
export const createExperienceMetadata = (company: string): MetadataItem[] => [
  {
    icon: <Building className="w-4 h-4" />,
    label: "Company",
    value: company
  }
];

export const createProjectMetadata = (technologies?: string[]): MetadataItem[] => {
  const metadata: MetadataItem[] = [];
  
  if (technologies && technologies.length > 0) {
    metadata.push({
      icon: <Code2 className="w-4 h-4" />,
      label: "Technologies",
      value: `${technologies.length} technologies used`
    });
  }
  
  return metadata;
};

export const createEducationMetadata = (school: string, degree: string): MetadataItem[] => [
  {
    icon: <GraduationCap className="w-4 h-4" />,
    label: "Institution",
    value: school
  },
  {
    icon: <Award className="w-4 h-4" />,
    label: "Degree Type",
    value: degree.includes("Master") ? "Master's Program" : "Bachelor's Program"
  }
];

