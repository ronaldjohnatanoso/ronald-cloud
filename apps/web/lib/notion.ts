// Notion API client and helpers
import { Client } from '@notionhq/client';
import {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
  PropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

// ─── Client ─────────────────────────────────────────────────────────────────

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// ─── Types ───────────────────────────────────────────────────────────────────

export interface NotionPageSummary {
  id: string;
  title: string;
  category?: string;
  slug?: string;
  tags?: string[];
  createdAt: string;
  lastEdited: string;
  url: string;
}

export interface NotionBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Extract plain text from a title property */
export function getTitle(page: PageObjectResponse): string {
  const props = page.properties;
  for (const [, prop] of Object.entries(props)) {
    if (prop.type === 'title') {
      return prop.title.map((t: RichTextItemResponse) => t.plain_text).join('') || 'Untitled';
    }
  }
  return 'Untitled';
}

/** Extract a plain text property value */
export function getRichText(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (!prop || prop.type !== 'rich_text') return '';
  return (prop.rich_text as RichTextItemResponse[])
    .map((t) => t.plain_text)
    .join('');
}

/** Extract a select property value */
export function getSelect(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (!prop || prop.type !== 'select') return '';
  return (prop as { select: { name: string } | null }).select?.name ?? '';
}

/** Extract a multi-select property values */
export function getMultiSelect(page: PageObjectResponse, key: string): string[] {
  const prop = page.properties[key];
  if (!prop || prop.type !== 'multi_select') return [];
  return (prop as { multi_select: { name: string }[] }).multi_select.map((s) => s.name);
}

/** Extract date from a page */
export function getDate(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (!prop || prop.type !== 'date') return '';
  return (prop as { date: { start: string } | null }).date?.start ?? '';
}

/** Build a URL slug from title */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ─── Page Content ─────────────────────────────────────────────────────────────

/** Get all blocks from a page (handles pagination) */
export async function getPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(...(response.results as BlockObjectResponse[]));
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
}

/** Convert a Notion block to our simplified block format */
export function simplifyBlock(block: BlockObjectResponse): NotionBlock {
  const type = block.type;
  const content = (block as Record<string, unknown>)[type] as Record<string, unknown>;
  return { id: block.id, type, content };
}

// ─── Database Queries ─────────────────────────────────────────────────────────

const PORTFOLIO_DB = process.env.NOTION_PORTFOLIO_DB;
const BLOG_DB = process.env.NOTION_BLOG_DB;

/** Query the Portfolio database by category */
export async function getPortfolioItems(
  category?: 'About' | 'Resume' | 'Project' | 'Certification' | 'Blog'
): Promise<NotionPageSummary[]> {
  if (!PORTFOLIO_DB) return [];

  const filter = category
    ? {
        property: 'Category',
        select: { equals: category },
      }
    : undefined;

  const response = await notion.databases.query({
    database_id: PORTFOLIO_DB,
    filter,
    sorts: [{ timestamp: 'created_time', direction: 'descending' }],
  });

  return (response.results as PageObjectResponse[]).map((page) => ({
    id: page.id,
    title: getTitle(page),
    category: getSelect(page, 'Category'),
    slug: slugify(getTitle(page)),
    tags: getMultiSelect(page, 'Tags'),
    createdAt: page.created_time,
    lastEdited: page.last_edited_time,
    url: page.url,
  }));
}

/** Query the Blog database */
export async function getBlogPosts(): Promise<NotionPageSummary[]> {
  if (!BLOG_DB) return [];

  const response = await notion.databases.query({
    database_id: BLOG_DB,
    sorts: [{ timestamp: 'created_time', direction: 'descending' }],
  });

  return (response.results as PageObjectResponse[]).map((page) => ({
    id: page.id,
    title: getTitle(page),
    category: 'Blog',
    slug: slugify(getRichText(page, 'Slug') || getTitle(page)),
    tags: getMultiSelect(page, 'Tags'),
    createdAt: page.created_time,
    lastEdited: page.last_edited_time,
    url: page.url,
  }));
}

/** Get a single page by ID */
export async function getPage(pageId: string): Promise<PageObjectResponse | null> {
  try {
    return (await notion.pages.retrieve({ page_id: pageId })) as PageObjectResponse;
  } catch {
    return null;
  }
}
