import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getContentByType(type: string) {
  const files = fs.readdirSync(path.join(contentDirectory, type));
  
  const content = files.map((fileName) => {
    const filePath = path.join(contentDirectory, type, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...data,
      content,
      slug: fileName.replace('.mdx', ''),
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