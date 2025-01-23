"use client";

import { motion } from "framer-motion";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiNodedotjs,
  SiGraphql,
  SiDocker,
  SiJest,
  SiStackblitz as DefaultIcon,
  SiAmazon,
  SiAngular,
  SiBootstrap,
  SiDbeaver,
  SiGitkraken,
  SiIonic,
  SiJavascript,
  SiJenkins,
  SiJira,
  SiServerless,
  SiSonarqube
} from "react-icons/si";
import { DiLinux } from 'react-icons/di';
import { VscVscode } from 'react-icons/vsc';
import { useIconMap } from '@/lib/hooks/useIconMap';

interface TechItem {
  name: string;
  icon: string;
  description: string;
  reason: string;
}

interface TechCategory {
  category: string;
  items: TechItem[];
}

export default function StackPage() {
  const router = useRouter();
  const iconMap = useIconMap();

  const { data: stack, isLoading } = useData<TechCategory[]>('/api/stack');

  if (isLoading) {
    return <StackSkeleton />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-2xl font-bold">Tech Stack</h1>
        </div>
x
        <div className="space-y-8">
          {stack?.map((category) => (
            <section key={category.category}>
              <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((tech) => {
                  const Icon = (iconMap[tech.icon.toLowerCase() as keyof typeof iconMap] || DefaultIcon) as LucideIcon;
                  
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="w-6 h-6 text-foreground" />
                          <h3 className="text-lg font-semibold">{tech.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {tech.description}
                        </p>
                        <div className="text-sm">
                          <strong className="text-foreground">Why I use it: </strong>
                          <span className="text-muted-foreground">{tech.reason}</span>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

function StackSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <Skeleton className="h-10 w-24 mb-4" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="space-y-8">
        {[1, 2, 3].map((section) => (
          <div key={section}>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Skeleton className="w-6 h-6" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-3/4" />
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}