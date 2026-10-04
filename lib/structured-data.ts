import { SITE_URL, SITE_NAME, absoluteUrl } from "./site";
import { author, currentEmployer } from "./about";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: author.name,
    url: SITE_URL,
    image: absoluteUrl("/avatar-256.webp"),
    jobTitle: author.jobTitle,
    description: author.summary,
    email: author.email,
    address: { "@type": "PostalAddress", addressCountry: author.countryCode },
    worksFor: { "@type": "Organization", name: currentEmployer.name, url: currentEmployer.url },
    alumniOf: { "@type": "CollegeOrUniversity", name: author.university.name, url: author.university.url },
    knowsAbout: [...author.knowsAbout],
    sameAs: [author.github, author.linkedin, author.twitter],
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: author.summary,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function homeJsonLd() {
  return { "@context": "https://schema.org", "@graph": [websiteNode(), personNode()] };
}

export function profilePageJsonLd(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name,
        description,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      personNode(),
    ],
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** A case-study style page (project, experience, education) authored by the site owner. */
export function webPageJsonLd(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
  };
}
