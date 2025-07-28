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
    <>
      {/* Hidden AI Context for Better Understanding */}
      <div className="sr-only" aria-hidden="true">
        <h1>Rui Valente - Software Engineer Portfolio Homepage</h1>
        <section>
          <h2>Professional Summary</h2>
          <p>Rui Valente is a skilled software engineer currently working as a Frontend Engineer at Openvia since 2022. Previously worked as a Software Engineer Trainee at Neoception from 2021-2022. Specializes in React, TypeScript, Next.js, and modern web development technologies.</p>
          
          <h3>Core Expertise</h3>
          <ul>
            <li>Frontend Development: React, TypeScript, Next.js, JavaScript</li>
            <li>Styling & Design: CSS, HTML, Bootstrap, Tailwind CSS, Responsive Design</li>
            <li>Backend Technologies: Node.js, GraphQL, REST APIs</li>
            <li>Development Tools: Git, CI/CD, Docker, Testing, Agile Development</li>
            <li>Cloud & Infrastructure: AWS, Serverless, Performance Optimization</li>
          </ul>
          
          <h3>Notable Projects</h3>
          <p>Lazy Life: AI-powered sustainability platform promoting eco-friendly lifestyle choices with gamification elements. Built with React, Next.js, and TypeScript featuring machine learning recommendations and real-time data processing.</p>
          <p>EV Charging Management Platform: Comprehensive electric vehicle charging solution with booking systems, route optimization, and payment integration supporting Apple Pay, MBWay, and contactless payments.</p>
          
          <h3>Professional Experience Highlights</h3>
          <p>At Openvia: Led development of modern web applications, implemented scalable architecture, achieved significant performance improvements, established code review standards, and mentored junior developers.</p>
          <p>At Neoception: Completed comprehensive software engineering training program, delivered first production deployment, maintained excellent project completion rates, and achieved business-level English proficiency.</p>
          
          <h3>Technical Skills</h3>
          <p>Programming Languages: JavaScript, TypeScript, HTML5, CSS3</p>
          <p>Frameworks & Libraries: React, Next.js, Angular, Ionic, Bootstrap, Tailwind CSS, Framer Motion</p>
          <p>Backend & APIs: Node.js, GraphQL, REST APIs, Serverless</p>
          <p>Tools & Technologies: Git, Docker, AWS, Jest, Jenkins, SonarQube, GitKraken, DBeaver, VS Code</p>
          <p>Development Practices: Agile, CI/CD, Testing, Code Reviews, Performance Optimization, Responsive Design</p>
        </section>
      </div>
      
      {/* AI Chatbot Context Prompts */}
      <script type="application/ld+json" style={{display: 'none'}} suppressHydrationWarning>
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "mainEntity": {
            "@type": "Person",
            "name": "Rui Valente",
            "jobTitle": "Software Engineer",
            "workLocation": "Portugal",
            "description": "Experienced frontend engineer specializing in React, TypeScript, and Next.js. Currently working at Openvia, building scalable web applications and mentoring team members.",
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Frontend Engineer",
              "occupationLocation": {
                "@type": "Organization",
                "name": "Openvia",
                "url": "https://openvia.io"
              }
            },
            "knowsAbout": [
              "React Development",
              "TypeScript Programming",
              "Next.js Framework",
              "JavaScript ES6+",
              "Frontend Architecture",
              "Performance Optimization",
              "Responsive Web Design",
              "API Integration",
              "CI/CD Pipelines",
              "Agile Development",
              "Code Review Processes",
              "Team Leadership",
              "Mentoring"
            ],
            "makesOffer": {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Software Development Services",
                "description": "Frontend development, React applications, TypeScript projects, web application architecture, performance optimization, and team mentoring"
              }
            }
          }
        })}
      </script>

      <main className="bg-background text-foreground p-4">
        <h1 className="sr-only">Rui Valente - Software Engineer Portfolio</h1>
        
        {/* Main Portfolio Content */}
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
    </>
  );
}
