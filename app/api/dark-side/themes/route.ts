import { NextResponse } from 'next/server';
import themesData from '@/lib/data/themes.json';

export async function GET() {
  try {
    return NextResponse.json(themesData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
      { status: 500 }
    );
  }
}