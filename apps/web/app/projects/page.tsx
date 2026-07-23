import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://213.35.103.15:3066';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio projects',
};

interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  lastEdited: string;
}

async function getProjects(): Promise<ProjectItem[]> {
  console.log('[ProjectsPage] fetching from API...');
  try {
    const res = await fetch(`${SITE_URL}/api/notion/portfolio?category=Project`, {
      next: { revalidate: 3600 },
    });
    console.log('[ProjectsPage] API response status:', res.status);
    if (!res.ok) {
      console.error('[ProjectsPage] API not ok');
      return [];
    }
    const data = await res.json();
    console.log('[ProjectsPage] API data:', JSON.stringify(data));
    return data.items || [];
  } catch (e) {
    console.error('[ProjectsPage] fetch error:', e);
    return [];
  }
}

async function getPageContent(pageId: string) {
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
  console.log('[ProjectsPage] projects:', projects.length, projects.map(p => p.name));

  if (projects.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <p className="text-muted-foreground">
          Add pages with Category &quot;Project&quot; to your Notion Portfolio database to display them here.
        </p>
      </div>
    );
  }

  const projectData = await Promise.all(
    projects.map(async (p) => {
      const data = await getPageContent(p.id);
      const firstPara = data?.blocks?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (b: any) => b.type === 'paragraph'
      );
      const description = firstPara?.content?.rich_text
        ?.map((t: { plain_text: string }) => t.plain_text)
        .join('')
        ?.substring(0, 150) || '';
      return { ...p, description };
    })
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectData.map((p) => (
          <article key={p.id} className="border rounded-xl p-6 hover:border-gray-400 transition">
            <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
            {p.description && (
              <p className="text-muted-foreground text-sm mb-3">{p.description}...</p>
            )}
            <p className="text-xs text-gray-400">Last updated: {new Date(p.lastEdited).toLocaleDateString()}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
