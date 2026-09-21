import { NextResponse } from 'next/server';
import educationData from '@/lib/data/education.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const education = educationData.education.find(e => e.id === slug);
    
    if (!education) {
      return NextResponse.json(
        { error: 'Education not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}

export async function generateStaticParams() {
  return educationData.education.map((education) => ({
    slug: education.id,
  }));
}
