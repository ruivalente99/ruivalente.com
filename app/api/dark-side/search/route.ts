import { NextResponse } from 'next/server';
import projectsData from '@/lib/data/dark-side/projects.json';
import experienceData from '@/lib/data/dark-side/experience.json';
import educationData from '@/lib/data/dark-side/education.json';
import stackData from '@/lib/data/dark-side/stack.json';

export async function GET() {
  try {
    return NextResponse.json({
      projects: projectsData.projects.map(({ id, title, description }) => ({
        id,
        title,
        description,
      })),
      experiences: experienceData.experiences.map(({ id, role, company }) => ({
        id,
        role,
        company,
      })),
      education: educationData.education.map(({ id, degree, school }) => ({
        id,
        degree,
        school,
      })),
      categories: stackData.stack.map(category => ({
        name: category.category,
        items: category.items.map(item => ({
          name: item.name,
          description: item.description,
        })),
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch search data' },
      { status: 500 }
    );
  }
}