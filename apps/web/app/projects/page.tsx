import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://213.35.103.15:3066';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio projects',
};

async function getProjects() {
  try {
    const res = await fetch(`${SITE_URL}/api/notion/portfolio?category=Project`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

async function getProjectContent(pageId: string) {
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

export default async function ProjectsPage() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <p className="text-muted-foreground">
          Add pages with Category "Project" to your Notion Portfolio database to display them here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(async (p: { id: string; title: string; tags?: string[]; lastEdited: string }) => {
          const data = await getProjectContent(p.id);
          const firstPara = data?.blocks?.find(
            (b: { type: string; content: { rich_text?: { plain_text: string }[] } }) =>
              b.type === 'paragraph'
          );

          return (
            <article key={p.id} className="border rounded-xl p-6 hover:border-gray-400 transition">
              <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
              {firstPara && (
                <p className="text-muted-foreground text-sm mb-3">
                  {(firstPara.content as { rich_text: { plain_text: string }[] }).rich_text
                    ?.map((t: { plain_text: string }) => t.plain_text)
                    .join('')
                    .substring(0, 150)}
                  ...
                </p>
              )}
              {p.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 text-xs border rounded-full">{tag}</span>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
