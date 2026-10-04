import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { author, aboutLinks } from "@/lib/about";
import { generatePageMetadata } from "@/lib/metadata";
import { profilePageJsonLd } from "@/lib/structured-data";

const description =
  "About Rui Valente, a frontend software engineer from Portugal using React, TypeScript and Next.js at Xelerate | Techem. Experience, education, projects.";

export const metadata: Metadata = generatePageMetadata({
  title: "About",
  description,
  path: "/about",
  additionalKeywords: ["About Rui Valente"],
});

export default function AboutPage() {
  const { experiences, education, projects } = aboutLinks;

  return (
    <>
      <JsonLd data={profilePageJsonLd("/about", "About Rui Valente", description)} />
      <div className="bg-background text-foreground lowercase">
        <div className="container max-w-3xl mx-auto py-10 md:py-14 px-4 sm:px-6 space-y-10 reveal-up">
          <PageBreadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]}
          />

          <header className="flex flex-col sm:flex-row sm:items-center gap-5">
            <Image
              src="/avatar-256.webp"
              alt={`portrait of ${author.name}`}
              width={112}
              height={112}
              priority
              className="h-28 w-28 rounded-full object-cover ring-1 ring-border/80"
            />
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15]">
                about {author.name}
              </h1>
              <p className="text-base text-muted-foreground">
                {author.jobTitle.toLowerCase()} - {author.country.toLowerCase()}
              </p>
            </div>
          </header>

          <section aria-label="biography" className="space-y-4 text-base leading-relaxed">
            {author.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section aria-labelledby="about-experience" className="space-y-3">
            <h2 id="about-experience" className="text-xl font-semibold tracking-tight">
              experience
            </h2>
            <ul className="space-y-2">
              {experiences.map((exp) => (
                <li key={exp.id}>
                  <Link href={`/experience/${exp.id}`} className="font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
                    {exp.role} at {exp.company}
                  </Link>
                  <span className="text-muted-foreground"> - {exp.year}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="about-education" className="space-y-3">
            <h2 id="about-education" className="text-xl font-semibold tracking-tight">
              education
            </h2>
            <ul className="space-y-2">
              {education.map((edu) => (
                <li key={edu.id}>
                  <Link href={`/education/${edu.id}`} className="font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
                    {edu.degree}
                  </Link>
                  <span className="text-muted-foreground">
                    {" "}
                    - {edu.school}, {edu.year}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="about-projects" className="space-y-3">
            <h2 id="about-projects" className="text-xl font-semibold tracking-tight">
              selected projects
            </h2>
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link href={`/projects/${project.id}`} className="font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">
                all projects
              </Link>
              {" - "}
              <Link href="/stack" className="text-sm text-muted-foreground hover:text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">
                tech stack
              </Link>
              {" - "}
              <Link
                href="/certificates"
                className="text-sm text-muted-foreground hover:text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
              >
                certificates
              </Link>
            </p>
          </section>

          <Card className="p-6 space-y-3" role="region" aria-labelledby="about-contact">
            <h2 id="about-contact" className="text-xl font-semibold tracking-tight">
              get in touch
            </h2>
            <ul className="space-y-1.5 text-sm">
              <li>
                email:{" "}
                <a href={`mailto:${author.email}`} className="font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
                  {author.email}
                </a>
              </li>
              <li>
                github:{" "}
                <a href={author.github} rel="me noopener noreferrer" className="font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
                  github.com/ruivalente99
                </a>
              </li>
              <li>
                linkedin:{" "}
                <a href={author.linkedin} rel="me noopener noreferrer" className="font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
                  linkedin.com/in/ruivalente99
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
