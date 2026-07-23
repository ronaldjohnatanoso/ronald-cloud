import NotionRenderer from '@/lib/notion-renderer';
import type { NotionBlock } from '@/lib/notion';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://213.35.103.15:3066';
const ABOUT_PAGE_ID = '3a617eea-36e6-80fc-94a8-d5bfe6e99a89';

export const revalidate = 3600;

async function getAboutPage() {
  try {
    const res = await fetch(`${SITE_URL}/api/notion/page/${ABOUT_PAGE_ID}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const data = await getAboutPage();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">{data?.page?.title || 'About Me'}</h1>
      {data?.blocks?.length > 0 ? (
        <NotionRenderer blocks={data.blocks as NotionBlock[]} />
      ) : (
        <p className="text-muted-foreground">
          Add content to your Notion "About Me" page to see it here.
          Go to your Notion Portfolio database, find your About Me entry,
          and add rich content using the Notion editor.
        </p>
      )}
    </div>
  );
}
