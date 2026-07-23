import { NextResponse } from 'next/server';
import { getPortfolioItems } from '@/lib/notion';

export const runtime = 'nodejs';
export const revalidate = 3600;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') as 'About' | 'Resume' | 'Project' | 'Certification' | 'Blog' | undefined;

    console.log('[portfolio API] category:', category);
    const items = await getPortfolioItems(category);
    console.log('[portfolio API] items found:', items.length, items.map(i => i.name));

    return NextResponse.json({ items });
  } catch (err) {
    const error = err as { message?: string; code?: string };
    console.error('[portfolio API] error:', error.code, error.message);
    return NextResponse.json({ error: error.message ?? 'Failed to fetch portfolio' }, { status: 500 });
  }
}
