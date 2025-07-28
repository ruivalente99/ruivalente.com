import {
  projects,
  experiences,
  education,
  certificates,
  hobbies,
} from "./data";
import { Project, Experience, Education, Certification, Hobby } from "./types";

export async function getProjects(): Promise<Project[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return projects;
}
export async function getProjectById(id: string): Promise<Project | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return projects.find((p) => p.id === id) || null;
}
export async function getExperiences(): Promise<Experience[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return experiences;
}
export async function getExperienceById(
  id: string,
): Promise<Experience | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return experiences.find((e) => e.id === id) || null;
}
export async function getEducation(): Promise<Education[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return education;
}
export async function getCertifications(): Promise<Certification[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return certificates;
}
export async function getHobbies(): Promise<Hobby[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return Object.values(hobbies);
}
