"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Github, Globe, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();
  const { data: projects, isLoading } = useData<any[]>('/api/projects');

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (!projects) return null;

  return (
    <div className="min-h-[100dvh] bg-background text-foreground p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-2xl font-bold">All Projects</h1>
        </div>

        <div className="flex flex-nowrap gap-6 overflow-x-auto custom-scroll scroll-hover pb-6">
          {projects?.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="flex-none w-[300px]"
            >
              <Card className="overflow-hidden h-full">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild
                    >
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="w-3 h-3 mr-1" /> Demo
                      </a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-3 h-3 mr-1" /> Source
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/projects/${project.id}`)}
                      className="ml-auto"
                    >
                      Details <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <Skeleton className="h-10 w-24 mb-4" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="flex gap-6 overflow-x-auto pb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-none w-[300px]">
            <Card className="overflow-hidden">
              <Skeleton className="aspect-video" />
              <div className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20 ml-auto" />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}