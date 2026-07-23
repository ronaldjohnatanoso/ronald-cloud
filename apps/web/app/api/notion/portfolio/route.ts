import { NextResponse } from 'next/server';
import { getPortfolioItems } from '@/lib/notion';

export const runtime = 'nodejs';
export const revalidate = 3600;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') as 'About' | 'Resume' | 'Project' | 'Certification' | 'Blog' | undefined;

    const items = await getPortfolioItems(category);
    return NextResponse.json({ items });
  } catch (err) {
    const error = err as { message?: string };
    return NextResponse.json({ error: error.message ?? 'Failed to fetch portfolio' }, { status: 500 });
  }
}
