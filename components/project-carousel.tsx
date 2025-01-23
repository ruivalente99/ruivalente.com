"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Globe, Github, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demo: string;
  github: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 2;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const router = useRouter();

  const next = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  return (
    <div className="relative w-full">
      <div className="overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background/50 backdrop-blur-xs rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 h-[280px] flex flex-col group"
              >
                <div className="h-24 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold mb-2">{project.title}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      details <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
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
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={prev}
          className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-xs"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={next}
          className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-xs"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
              index === currentPage ? "bg-primary" : "bg-primary/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}