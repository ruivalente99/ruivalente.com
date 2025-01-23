import { NextResponse } from 'next/server';
import projectsData from '@/lib/data/projects.json';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const project = projectsData.projects.find(p => p.id === params.slug);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export function generateStaticParams() {
  return projectsData.projects.map((exp) => ({
    slug: exp.id,
  }));
}