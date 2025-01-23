import { NextResponse } from 'next/server';
import projectsData from '@/lib/data/dark-side/projects.json';

export async function GET() {
  try {
    return NextResponse.json(projectsData.projects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}