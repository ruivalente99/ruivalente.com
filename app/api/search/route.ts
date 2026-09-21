import { NextResponse } from 'next/server';
import projectsData from '@/lib/data/projects.json';
import experienceData from '@/lib/data/experience.json';
import educationData from '@/lib/data/education.json';
import stackData from '@/lib/data/stack.json';
import certificatesData from '@/lib/data/certificates.json';

export async function GET() {
  try {
    return NextResponse.json({
      projects: projectsData.projects.map(({ id, title, description, skills }) => ({
        id,
        title,
        description,
        skills,
      })),
      experiences: experienceData.experiences.map(({ id, role, company, skills }) => ({
        id,
        role,
        company,
        skills,
      })),
      education: educationData.education.map(({ id, degree, school }) => ({
        id,
        degree,
        school,
      })),
      certificates: certificatesData.certificates.map(({ name, issuer, year, url }) => ({
        name,
        issuer,
        year,
        url,
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