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
          <p>Rui Valente is a Frontend Software Engineer specializing in React, TypeScript, and modern web application development with 4+ years of professional experience. Currently working as a Frontend Engineer at Xelerate | Techem since December 2025. Previously worked as a Frontend Engineer at Openvia from June 2022 to November 2025, and as a Junior Software Engineer at Neoception GmbH from August 2021 to May 2022.</p>
          
          <h3>Core Expertise</h3>
          <ul>
            <li>Frontend Development: React, TypeScript, Next.js, JavaScript, Material UI, Bootstrap, Tailwind CSS</li>
            <li>Styling & Design: CSS3/SCSS, HTML5, Responsive Design, Component-Driven Development</li>
            <li>Backend & APIs: Node.js, GraphQL, RESTful APIs, tRPC</li>
            <li>Development Tools: Git, CI/CD, Docker, Jenkins, Sonarqube, Jest, Agile/Scrum</li>
            <li>Cloud & Infrastructure: AWS, Performance Optimization, Code-Splitting</li>
          </ul>
          
          <h3>Notable Projects</h3>
          <p>Lazy Life: AI-powered sustainability platform promoting eco-friendly lifestyle choices with gamification elements. Built with React, Next.js, and TypeScript featuring machine learning recommendations and real-time data processing.</p>
          <p>EV Charging Management Platform: Comprehensive electric vehicle charging solution with booking systems, route optimization, and payment integration supporting Apple Pay, MBWay, and contactless payments.</p>
          
          <h3>Professional Experience Highlights</h3>
          <p>At Xelerate | Techem (Dec 2025 — Present): Architecting modern responsive frontend applications and energy management portals using React, TypeScript, Next.js, and Tailwind CSS; collaborating across distributed engineering teams.</p>
          <p>At Openvia (Jun 2022 — Nov 2025): Led development of customer-facing web application increasing user engagement with React, TypeScript, Bootstrap; improved application performance with component architecture and code-splitting; developed custom GraphQL queries and RESTful APIs; modernized legacy applications with Ionic and Angular; implemented Jest testing suite and Jenkins/Docker CI/CD pipelines.</p>
          <p>At Neoception GmbH (Aug 2021 — May 2022): Developed responsive web applications using React and JavaScript; implemented reusable component library with Material UI; collaborated in agile team with daily stand-ups and bi-weekly sprints; contributed to code reviews and unit testing.</p>
          
          <h3>Education & Certifications</h3>
          <p>Master&apos;s Degree in Informatics Engineering at University of Trás-os-Montes and Alto Douro (2021 — 2026, In Progress)</p>
          <p>Bachelor&apos;s Degree in Informatics Engineering at University of Trás-os-Montes and Alto Douro (2018 — 2021)</p>
          <p>Certifications: Fullstack TypeScript (GraphQL and Node.js), Complete Intro to React v9, Project Management: Beginner to PM, JavaScript (Intermediate), JavaScript (Basic), React (Basic), Secure Coding.</p>
        </section>
      </div>
      
      {/* AI Chatbot Context Prompts */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Rui Valente",
          "jobTitle": "Frontend Software Engineer",
          "worksFor": {
            "@type": "Organization",
            "name": "Xelerate | Techem"
          },
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "University of Trás-os-Montes and Alto Douro"
          },
          "email": "email@ruivalente.com",
          "url": "https://ruivalente.com",
          "knowsAbout": [
            "React",
            "TypeScript",
            "Next.js",
            "JavaScript",
            "GraphQL",
            "RESTful APIs",
            "Tailwind CSS",
            "Material UI",
            "Bootstrap",
            "Node.js",
            "Docker",
            "Jenkins",
            "AWS",
            "Jest",
            "Web Development",
            "Frontend Architecture",
            "Performance Optimization",
            "API Integration",
            "CI/CD Pipelines",
            "Agile Development",
            "Code Review Processes"
          ],
          "makesOffer": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Software Development Services",
              "description": "Frontend development, React applications, TypeScript projects, web application architecture, performance optimization, and team mentoring"
            }
          }
        }) }}
      />

      <div className="bg-background text-foreground p-4">
        <h1 className="sr-only">Rui Valente - Software Engineer Portfolio</h1>
        
        {/* Main Portfolio Content */}
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

          {/* Projects Section - Full Width */}
          <BentoItem colSpan={3}>
            <ProjectsSection />
          </BentoItem>
        </BentoGrid>
      </div>
    </>
  );
}
