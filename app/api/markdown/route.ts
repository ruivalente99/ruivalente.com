import { NextRequest, NextResponse } from 'next/server';
import { getMarkdownContentSync } from '@/lib/mdx';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentPath = searchParams.get('path');
    
    if (!contentPath) {
      return NextResponse.json(
        { error: 'Path parameter is required' },
        { status: 400 }
      );
    }

    // Security check - only allow content from the content directory
    if (!contentPath.startsWith('/content/') || contentPath.includes('..')) {
      return NextResponse.json(
        { error: 'Invalid path' },
        { status: 400 }
      );
    }

    const content = getMarkdownContentSync(contentPath);
    
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error serving markdown content:', error);
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
}
