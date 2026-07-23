import Link from 'next/link';
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://213.35.103.15:3066';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and updates',
};

async function getBlogPosts() {
  try {
    const res = await fetch(`${SITE_URL}/api/notion/blog`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts || [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-muted-foreground">
          Create a Blog database in Notion and add pages to it. Set NOTION_BLOG_DB in your .env.local to connect it.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map((post: { id: string; title: string; slug?: string; createdAt: string; tags?: string[] }) => (
          <article key={post.id} className="border-b pb-6">
            <Link href={`/blog/${post.slug || post.id}`} className="block group">
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {post.tags?.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 text-xs border rounded-full">{tag}</span>
                  ))}
                </div>
              )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
