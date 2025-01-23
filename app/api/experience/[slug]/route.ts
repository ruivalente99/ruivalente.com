import { NextResponse } from 'next/server';
import experienceData from '@/lib/data/experience.json';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const experience = experienceData.experiences.find(e => e.id === params.slug);
    
    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 }
    );
  }
}