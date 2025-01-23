import { NextResponse } from 'next/server';
import educationData from '@/lib/data/education.json';

export async function GET() {
  try {
    return NextResponse.json(educationData.education);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}