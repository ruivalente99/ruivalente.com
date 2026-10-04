import experienceData from "./data/experience.json";
import educationData from "./data/education.json";
import projectsData from "./data/projects.json";

/**
 * Facts about the site author. Everything here is shown on the page, used in
 * structured data and in meta descriptions, so it has to stay accurate.
 */
export const author = {
  name: "Rui Valente",
  jobTitle: "Frontend Software Engineer",
  country: "Portugal",
  countryCode: "PT",
  email: "email@ruivalente.com",
  github: "https://github.com/ruivalente99",
  linkedin: "https://linkedin.com/in/ruivalente99",
  twitter: "https://twitter.com/ruivalente99",
  university: { name: "University of Trás-os-Montes and Alto Douro", url: "https://www.utad.pt" },
  /** One or two sentences: author box, structured data, ProfilePage description. */
  summary:
    "Frontend software engineer from Portugal building fast, accessible web applications with React, TypeScript and Next.js. Currently at Xelerate | Techem.",
  /** Long form paragraphs for the about page. */
  bio: [
    "I am Rui Valente, a frontend software engineer from Portugal. I design and build web applications with React, TypeScript and Next.js, with a focus on component architecture, performance and accessibility.",
    "Since 2021 I have worked on production web applications at Neoception GmbH, at Openvia and, since December 2025, at Xelerate | Techem, where I build enterprise portals and energy management interfaces for smart sub-metering.",
    "I studied Informatics Engineering at the University of Trás-os-Montes and Alto Douro (UTAD): a bachelor's degree completed in 2021 and a master's degree in progress. Outside of work I build personal projects such as the Bibliotheca component library and the PAPYRUS resume platform, each documented as a case study on this site.",
  ],
  knowsAbout: [
    "React",
    "TypeScript",
    "Next.js",
    "JavaScript",
    "Node.js",
    "GraphQL",
    "Tailwind CSS",
    "REST APIs",
    "CI/CD",
    "Docker",
    "Jest",
  ],
} as const;

export const currentEmployer = {
  name: experienceData.experiences[0].company,
  url: experienceData.experiences[0].companyUrl,
};

export const aboutLinks = {
  experiences: experienceData.experiences,
  education: educationData.education,
  projects: projectsData.projects,
};
