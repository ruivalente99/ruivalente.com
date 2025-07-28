"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Experience {
  id: string;
  role: string;
  company: string;
  year: string;
  companyUrl: string;
  skills: string[];
  contentPath: string;
}

export default function ExperiencePage() {
  const router = useRouter();
  const { data: experiences, isLoading } = useData<Experience[]>('/api/experience');

  if (isLoading) {
    return <ExperienceSkeleton />;
  }

  return (
    <>
      {/* Hidden AI Context for Experience */}
      <div className="sr-only" aria-hidden="true">
        <h1>Rui Valente Professional Experience</h1>
        <section>
          <h2>Career Summary</h2>
          <p>Software engineer with progressive experience in frontend development, currently serving as Frontend Engineer at Openvia since 2022, with previous trainee experience at Neoception from 2021-2022.</p>
          
          <h3>Current Role: Frontend Engineer at Openvia (2022 - Present)</h3>
          <ul>
            <li>Leading modern web application development with React and TypeScript</li>
            <li>Implementing scalable architecture and optimal user experience</li>
            <li>Working with cutting-edge technologies: React, TypeScript, Bootstrap, GraphQL, REST APIs</li>
            <li>Achieving significant performance improvements through code optimization</li>
            <li>Maintaining comprehensive code coverage with testing practices</li>
            <li>Implementing zero-downtime deployments using advanced CI/CD strategies</li>
            <li>Mentoring junior developers and establishing code review standards</li>
            <li>Contributing to agile process improvements increasing team velocity</li>
          </ul>
          
          <h3>Previous Role: Software Engineer Trainee at Neoception (2021 - 2022)</h3>
          <ul>
            <li>Completed comprehensive program combining hands-on development with professional skills training</li>
            <li>Built strong foundation in software engineering and workplace competencies</li>
            <li>Learned programming fundamentals, object-oriented programming, and design patterns</li>
            <li>Developed web applications with HTML5, CSS3, JavaScript, and React basics</li>
            <li>Gained experience with database concepts, SQL fundamentals, and data modeling</li>
            <li>Mastered version control with Git workflows and collaborative development</li>
            <li>Successfully delivered first production deployment to client</li>
            <li>Maintained excellent project completion rates with tasks completed on schedule</li>
            <li>Achieved business-level English communication proficiency</li>
          </ul>
          
          <h3>Professional Development</h3>
          <p>Transformed from programming novice to confident frontend engineer with both technical skills and professional competencies including time management, goal orientation, adaptability, and effective collaboration in cross-functional environments.</p>
        </section>
      </div>

      <main className="min-h-screen bg-background text-foreground p-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <h1 className="text-2xl font-bold">Professional Experience</h1>
            <p className="text-muted-foreground mt-2">
              Progressive software engineering career with expertise in React, TypeScript, and modern web development
            </p>
          </div>

        <div className="space-y-6">
          {experiences?.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link href={`/experience/${exp.id}`}>
                <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold mb-2">{exp.role}</h2>
                      <div className="flex items-center gap-4">
                        <p className="text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Skills & Technologies:</h3>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills?.slice(0, 6).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {exp.skills?.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{exp.skills.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}

function ExperienceSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <Skeleton className="h-10 w-24 mb-4" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <div className="flex items-center justify-between mb-4">
              <div>
                <Skeleton className="h-4 w-48 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <div className="space-y-1">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}