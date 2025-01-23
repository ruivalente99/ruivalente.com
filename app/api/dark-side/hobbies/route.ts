import { NextResponse } from 'next/server';
import hobbiesData from '@/lib/data/dark-side/hobbies.json';

export async function GET() {
  try {
    return NextResponse.json(hobbiesData.hobbies);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch hobbies' },
      { status: 500 }
    );
  }
}