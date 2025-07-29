import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    
    // Try different possible filenames
    const possiblePaths = [
      path.join(process.cwd(), 'content', 'projects', `${slug}.md`),
      path.join(process.cwd(), 'content', 'projects', `${slug === 'lazy-life' ? 'lazylife' : slug}.md`)
    ];

    let content = '';
    let filePath = '';

    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        content = fs.readFileSync(possiblePath, 'utf8');
        filePath = possiblePath;
        break;
      }
    }

    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({
      content,
      filePath: filePath.replace(process.cwd(), ''),
      lastModified: fs.statSync(filePath).mtime.toISOString()
    });

  } catch (error) {
    console.error('Error reading project content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
