"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { BentoGrid, BentoItem } from "@/components/bento-grid";
import { ProfileSection } from "@/components/profile-section";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import { HobbiesSection } from "@/components/hobbies-section";
import { StackSection } from "@/components/stack-section";
import { GitHubWidget } from "@/components/widgets/github-widget";
import { WidgetCustomizer, DEFAULT_WIDGETS, WidgetId } from "@/components/widgets/widget-customizer";

export default function Home() {
  const [activeWidgets, setActiveWidgets] = useState<WidgetId[]>(DEFAULT_WIDGETS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ruivalente_bento_widgets");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out any stale widget IDs like vercel
          const validWidgets = parsed.filter((w) => DEFAULT_WIDGETS.includes(w) || w === "github") as WidgetId[];
          setActiveWidgets(validWidgets.length > 0 ? validWidgets : DEFAULT_WIDGETS);
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const hasWidget = (id: WidgetId) => activeWidgets.includes(id);
  const hasProfile = hasWidget("profile");
  const hasHobbies = hasWidget("hobbies");
  const hasStack = hasWidget("stack");
  const hasExperience = hasWidget("experience");
  const hasEducation = hasWidget("education");
  const hasGithub = hasWidget("github");
  const hasProjects = hasWidget("projects");

  // Dynamic column spans for Row 3 ensuring exact 4-column row fills
  const getRow3Spans = () => {
    if (hasEducation && hasGithub && hasProjects) {
      return { edu: 1, git: 1, proj: 2 };
    }
    if (hasEducation && hasProjects) {
      return { edu: 1, git: 1, proj: 3 };
    }
    if (hasGithub && hasProjects) {
      return { edu: 1, git: 1, proj: 3 };
    }
    if (hasEducation && hasGithub) {
      return { edu: 2, git: 2, proj: 4 };
    }
    return { edu: 4, git: 4, proj: 4 };
  };

  const row3 = getRow3Spans();
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
          <p>Master&apos;s Degree in Informatics Engineering at University of Trás-os-Montes and Alto Douro (2021 — 2026, not concluded)</p>
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

      <div className="bg-background text-foreground p-4 lowercase">
        <h1 className="sr-only">rui valente - software engineer portfolio</h1>
        
        {/* Dashboard Toolbar with Widget Customizer */}
        <div className="max-w-7xl mx-auto flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-mono text-muted-foreground lowercase">
              modular portfolio dashboard
            </span>
          </div>
          <WidgetCustomizer activeWidgets={activeWidgets} onWidgetsChange={setActiveWidgets} />
        </div>

        {/* Main Portfolio Content */}
        <BentoGrid className="">
          {/* Profile Section */}
          {hasProfile && (
            <BentoItem colSpan={hasHobbies ? 3 : 4}>
              <Card className="p-6 h-full flex flex-col justify-center">
                <ProfileSection />
              </Card>
            </BentoItem>
          )}

          {/* Hobbies Section */}
          {hasHobbies && (
            <BentoItem colSpan={hasProfile ? 1 : 4}>
              <HobbiesSection />
            </BentoItem>
          )}

          {/* Tech Stack Section */}
          {hasStack && (
            <BentoItem colSpan={hasExperience ? 2 : 4}>
              <StackSection />
            </BentoItem>
          )}

          {/* Experience Section */}
          {hasExperience && (
            <BentoItem colSpan={hasStack ? 2 : 4}>
              <ExperienceSection />
            </BentoItem>
          )}
          
          {/* Education Section */}
          {hasEducation && (
            <BentoItem colSpan={row3.edu}>
              <EducationSection />
            </BentoItem>
          )}

          {/* GitHub Activity Section */}
          {hasGithub && (
            <BentoItem colSpan={row3.git}>
              <GitHubWidget />
            </BentoItem>
          )}

          {/* Projects Section */}
          {hasProjects && (
            <BentoItem colSpan={row3.proj}>
              <ProjectsSection />
            </BentoItem>
          )}
        </BentoGrid>
      </div>
    </>
  );
}
