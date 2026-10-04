import projectsData from "./projects.json";
import experienceData from "./experience.json";
import educationData from "./education.json";
import certificatesData from "./certificates.json";
import profileData from "./profile.json";
import socialData from "./social.json";
import hobbiesData from "./hobbies.json";
import stackData from "./stack.json";
import themesData from "./themes.json";

/**
 * Payloads of the public JSON endpoints, keyed by URL.
 *
 * Handed to the client data layer (see lib/hooks/useData.ts) so that the very
 * first server-rendered HTML already contains the real content instead of
 * loading skeletons. Must stay in sync with the matching app/api routes.
 */
export const initialData: Record<string, unknown> = {
  "/api/projects": projectsData.projects,
  "/api/experience": experienceData.experiences,
  "/api/education": educationData.education,
  "/api/certificates": certificatesData.certificates,
  "/api/profile": profileData.profile,
  "/api/social": socialData.social,
  "/api/hobbies": hobbiesData.hobbies,
  "/api/stack": stackData.stack,
  "/api/themes": themesData,
};
