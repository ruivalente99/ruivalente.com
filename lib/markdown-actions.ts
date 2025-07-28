'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

// Initialize markdown-it with basic configuration (remove problematic plugins for now)
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
});

export async function getMarkdownContentAction(contentPath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), contentPath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Parse frontmatter if present
    const { content } = matter(fileContents);
    
    // Render markdown to HTML with enhanced features
    const html = md.render(content);
    
    return html;
  } catch (error) {
    console.error(`Error reading markdown file: ${contentPath}`, error);
    return '<p>Content not found</p>';
  }
}
