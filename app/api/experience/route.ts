import { NextResponse } from 'next/server';
import experienceData from '@/lib/data/experience.json';

export async function GET() {
  try {
    return NextResponse.json(experienceData.experiences);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}