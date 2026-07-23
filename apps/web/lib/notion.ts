import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_PORTFOLIO_DB_ID || '3a617eea-36e6-802b-8412-f289637b0b4f';

export interface PortfolioPage {
  id: string;
  name: string;
  slug: string;
  category: string;
  lastEdited: string;
}

export interface NotionBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Transform raw Notion block { type, paragraph: { rich_text } }
// into simplified { type, content: { rich_text } }
export function simplifyBlock(block: Record<string, unknown>): NotionBlock {
  const type = block.type as string;
  return {
    id: block.id as string,
    type,
    content: (block[type] as Record<string, unknown>) || {},
  };
}

export async function getPortfolioItems(category?: 'About' | 'Resume' | 'Project' | 'Certification' | 'Blog'): Promise<PortfolioPage[]> {
  const pages = await getPortfolioPages();
  if (!category) return pages;
  return pages.filter(p => p.category === category);
}

export async function getPortfolioPages(): Promise<PortfolioPage[]> {
  const { results } = await notion.search({
    filter: { value: 'page', property: 'object' },
    page_size: 100,
  });

  return results
    .filter((page: { parent?: { database_id?: string }; properties?: { Name?: { title?: { plain_text: string }[] }; Category?: { select?: { name?: string } } } }) => 
      page.parent?.database_id === DATABASE_ID &&
      page.properties?.Name?.title?.[0]?.plain_text
    )
    .map((page: { id: string; last_edited_time: string; properties?: { Name?: { title?: { plain_text: string }[] }; Category?: { select?: { name?: string } } } }) => ({
      id: page.id,
      name: page.properties?.Name?.title?.[0]?.plain_text || '',
      slug: slugify(page.properties?.Name?.title?.[0]?.plain_text || page.id),
      category: page.properties?.Category?.select?.name || 'General',
      lastEdited: page.last_edited_time,
    }));
}

export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  const { results } = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  return results.map(simplifyBlock) as NotionBlock[];
}

export async function getPageBySlug(slug: string): Promise<PortfolioPage | null> {
  const pages = await getPortfolioPages();
  return pages.find(p => p.slug === slug) || null;
}

export { notion };
