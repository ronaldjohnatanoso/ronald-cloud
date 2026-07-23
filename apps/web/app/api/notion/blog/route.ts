import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/notion';

export const runtime = 'nodejs';
export const revalidate = 3600;

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json({ posts });
  } catch (err) {
    const error = err as { message?: string };
    return NextResponse.json({ error: error.message ?? 'Failed to fetch blog posts' }, { status: 500 });
  }
}
