import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://213.35.103.15:3066';

async function getAboutMe() {
  try {
    const res = await fetch(`${SITE_URL}/api/notion/page/3a617eea-36e6-80fc-94a8-d5bfe6e99a89`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      title: data.page?.title || 'About Me',
      content: data.blocks || [],
    };
  } catch {
    return null;
  }
}

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

async function getCertifications() {
  try {
    const res = await fetch(`${SITE_URL}/api/notion/portfolio?category=Certification`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [aboutData, projects, certs] = await Promise.all([
    getAboutMe(),
    getProjects(),
    getCertifications(),
  ]);

  const skills = ['Azure', 'GCP', 'TypeScript', 'React', 'Next.js', 'Python', 'Terraform', 'Kubernetes', 'AI'];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-3">
          {aboutData?.title || 'Ronald Atanoso'}
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Cloud Engineer · AI Builder · Problem Solver
        </p>
        {aboutData && (
          <p className="text-gray-500 leading-relaxed max-w-2xl mb-8">
            {aboutData.content[0]?.type === 'paragraph'
              ? (aboutData.content[0].content as { rich_text: { plain_text: string }[] }).rich_text
                  .map((t) => t.plain_text)
                  .join('')
              : 'Building enterprise-grade multi-cloud solutions on Azure and GCP.'}
          </p>
        )}
        <div className="flex gap-4">
          <Link href="/projects" className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
            View Projects
          </Link>
          <Link href="/resume" className="px-6 py-3 border rounded-lg font-medium hover:bg-gray-50 transition">
            Resume
          </Link>
        </div>
      </section>

      {/* Projects Preview */}
      {projects.length > 0 && (
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.slice(0, 4).map((p: { id: string; title: string; category?: string; tags?: string[] }) => (
              <div key={p.id} className="border rounded-lg p-4 hover:border-gray-400 transition">
                <h3 className="font-semibold">{p.title}</h3>
                {p.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {p.tags.map((tag: string) => (
                      <span key={tag} className="px-2 py-1 text-xs border rounded-full">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {projects.length > 4 && (
            <Link href="/projects" className="inline-block mt-4 text-sm text-blue-600 hover:underline">
              View all {projects.length} projects →
            </Link>
          )}
        </section>
      )}

      {/* Certifications Preview */}
      {certs.length > 0 && (
        <section className="px-6 py-16 max-w-5xl mx-auto border-t">
          <h2 className="text-2xl font-bold mb-6">Certifications</h2>
          <div className="flex flex-wrap gap-3">
            {certs.map((c: { id: string; title: string }) => (
              <span key={c.id} className="px-4 py-2 border rounded-lg font-medium">
                {c.title}
              </span>
            ))}
          </div>
          <Link href="/certifications" className="inline-block mt-4 text-sm text-blue-600 hover:underline">
            View all certifications →
          </Link>
        </section>
      )}

      {/* Skills */}
      <section className="px-6 py-12 border-t">
        <div className="flex flex-wrap gap-2 justify-center">
          {skills.map((skill) => (
            <span key={skill} className="px-3 py-1 border rounded-full text-sm text-muted-foreground">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
