import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NotionRenderer from '@/lib/notion-renderer';
import type { NotionBlock } from '@/lib/notion';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://213.35.103.15:3066';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug || 'Blog Post' };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // In a real implementation, we'd look up the post by slug
  // For now, show a placeholder
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-muted-foreground">
        Blog post "{slug}" — create a Blog database in Notion and link it via NOTION_BLOG_DB.
      </p>
    </div>
  );
}
