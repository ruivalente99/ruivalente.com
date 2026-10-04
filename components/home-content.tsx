"use client";

import { Card } from "@/components/ui/card";
import { BentoGrid, BentoItem } from "@/components/bento-grid";
import { ProfileSection } from "@/components/profile-section";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import { HobbiesSection } from "@/components/hobbies-section";
import { StackSection } from "@/components/stack-section";
import { GitHubWidget } from "@/components/widgets/github-widget";

export function HomeContent() {
  return (
    <div className="bg-background text-foreground p-4 lowercase">
      {/* Main Portfolio Content (the single h1 lives in ProfileSection) */}
      <BentoGrid className="">
        {/* Profile Section */}
        <BentoItem colSpan={3}>
          <Card className="p-6 h-full flex flex-col justify-center">
            <ProfileSection />
          </Card>
        </BentoItem>

        {/* Hobbies Section */}
        <BentoItem colSpan={1}>
          <HobbiesSection />
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

        {/* GitHub Activity Section */}
        <BentoItem colSpan={1}>
          <GitHubWidget />
        </BentoItem>

        {/* Projects Section */}
        <BentoItem colSpan={2}>
          <ProjectsSection />
        </BentoItem>
      </BentoGrid>
    </div>
  );
}
