import { NextResponse } from 'next/server';
import profileData from '@/lib/data/dark-side/profile.json';

export async function GET() {
  try {
    return NextResponse.json(profileData.profile);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}