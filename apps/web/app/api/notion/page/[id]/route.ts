import { NextResponse } from 'next/server';
import { notion, getPageBlocks } from '@/lib/notion';

export const runtime = 'nodejs';
export const revalidate = 3600; // cache for 1 hour

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pageId = id.replace(/-/g, '');

    const [page, blocks] = await Promise.all([
      notion.pages.retrieve({ page_id: pageId }),
      getPageBlocks(pageId),
    ]);

    return NextResponse.json({
      page: {
        id: (page as { id: string }).id,
        title: ((page as { properties: Record<string, { type: string; title?: { plain_text: string }[] }> }).properties?.Category?.title?.[0]?.plain_text) ?? ((page as { properties: Record<string, { type: string; title?: { plain_text: string }[] }> }).properties?.Name?.title?.[0]?.plain_text) ?? 'Untitled',
        created_time: (page as { created_time: string }).created_time,
        last_edited_time: (page as { last_edited_time: string }).last_edited_time,
      },
      blocks,
    });
  } catch (err) {
    const error = err as { code?: string; message?: string };
    return NextResponse.json({ error: error.message ?? 'Notion fetch failed' }, { status: 500 });
  }
}
