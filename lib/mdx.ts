import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import MarkdownIt from 'markdown-it';

const contentDirectory = path.join(process.cwd(), 'content');

// Initialize markdown-it with enhanced configuration
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-anchor'), {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#'
  })
  .use(require('markdown-it-table-of-contents'));

// Server-side function to get markdown content
export function getMarkdownContentSync(contentPath: string): string {
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

// Client-side compatible function (for API routes)
export async function getMarkdownContent(contentPath: string): Promise<string> {
  try {
    // This will be called from client-side, so we need to fetch from an API
    const response = await fetch(`/api/markdown?path=${encodeURIComponent(contentPath)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch markdown content');
    }
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error(`Error fetching markdown content: ${contentPath}`, error);
    return '<p>Content not found</p>';
  }
}

export async function getContentByType(type: string) {
  const files = fs.readdirSync(path.join(contentDirectory, type));
  
  const content = files.map((fileName) => {
    const filePath = path.join(contentDirectory, type, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...data,
      content,
      slug: fileName.replace(/\.(mdx?|md)$/, ''),
    };
  });

  return content;
}

export async function getContentBySlug(type: string, slug: string) {
  const filePath = path.join(contentDirectory, type, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const mdxSource = await serialize(content);

  return {
    ...data,
    content: mdxSource,
    slug,
  };
}