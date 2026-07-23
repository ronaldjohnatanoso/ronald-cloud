import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://213.35.103.15:3066';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Professional certifications',
};

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

export default async function CertificationsPage() {
  const certs = await getCertifications();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Certifications</h1>
      {certs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((c: { id: string; title: string; tags?: string[]; lastEdited: string }) => (
            <div key={c.id} className="border rounded-xl p-6 hover:border-gray-400 transition">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-semibold text-lg">{c.title}</h3>
              {c.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {c.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 text-xs border rounded-full">{tag}</span>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-3">
                Updated {new Date(c.lastEdited).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          Add pages with Category "Certification" to your Notion Portfolio database to display them here.
        </p>
      )}
    </div>
  );
}
