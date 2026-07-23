import type { Metadata } from 'next';
import NotionRenderer from '@/lib/notion-renderer';
import type { NotionBlock } from '@/lib/notion';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://213.35.103.15:3066';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Professional resume and work history',
};

async function getResumeItems() {
  try {
    const res = await fetch(`${SITE_URL}/api/notion/portfolio?category=Resume`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

async function getResumeContent(pageId: string) {
  try {
    const res = await fetch(`${SITE_URL}/api/notion/page/${pageId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function ResumePage() {
  const items = await getResumeItems();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Resume</h1>
        <p className="text-muted-foreground">
          Add a page with Category "Resume" to your Notion Portfolio database to display your resume here.
        </p>
      </div>
    );
  }

  // Show first resume item as primary
  const primary = items[0];
  const data = await getResumeContent(primary.id);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Resume</h1>
      {data?.blocks?.length > 0 ? (
        <NotionRenderer blocks={data.blocks as NotionBlock[]} />
      ) : (
        <p className="text-muted-foreground">Open &quot;{primary.title}&quot; in Notion to add resume content.</p>
      )}
    </div>
  );
}
