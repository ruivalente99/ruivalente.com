import { NextResponse } from 'next/server';
import socialData from '@/lib/data/dark-side/social.json';

export async function GET() {
  try {
    return NextResponse.json(socialData.social);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch social links' },
      { status: 500 }
    );
  }
}