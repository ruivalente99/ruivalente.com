import { NextResponse } from 'next/server';
import stackData from '@/lib/data/stack.json';

export async function GET() {
  try {
    return NextResponse.json(stackData.stack);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tech stack' },
      { status: 500 }
    );
  }
}