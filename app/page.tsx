"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BentoGrid, BentoItem } from "@/components/bento-grid";
import { ProfileSection } from "@/components/profile-section";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import { HobbiesSection } from "@/components/hobbies-section";
import { StackSection } from "@/components/stack-section";

export default function Home() {
  return (
    <main className="bg-background text-foreground p-4">
      <h1 className="sr-only">rui valente - software developer portfolio</h1>
      <BentoGrid className="">
        {/* Profile Section */}
        <BentoItem colSpan={3}>
          <Card className="p-6">
            <ProfileSection />
          </Card>
        </BentoItem>

        {/* Hobbies Section */}
        <BentoItem colSpan={1}>
          <Card className="h-full">
            <HobbiesSection />
          </Card>
        </BentoItem>

        {/* Tech Stack Section */}
        <BentoItem colSpan={2}>
          <StackSection />
        </BentoItem>

        {/* Experience Section */}
        <BentoItem colSpan={2}>
          <ExperienceSection />
        </BentoItem>
        {/* Education Section */}
        <BentoItem colSpan={1}>
          <EducationSection />
        </BentoItem>

        {/* Projects Section - Full Width */}
        <BentoItem colSpan={3}>
          <ProjectsSection />
        </BentoItem>
      </BentoGrid>
    </main>
  );
}
