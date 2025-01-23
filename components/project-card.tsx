"use client";

import { motion } from "framer-motion";
import { Github, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-background/50 backdrop-blur-xs rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 h-[280px] flex flex-col"
    >
      <div className="h-24 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold mb-2">{project.title}</h3>
        <p className="text-xs text-muted-foreground flex-1">
          {project.description}
        </p>
        <div className="flex gap-2 mt-4">
          <Button variant="ghost" size="sm" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <Globe className="w-3 h-3 mr-1" /> demo
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-3 h-3 mr-1" /> github
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto"
            onClick={() => router.push(`/projects/${project.id}`)}
          >
            details <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}