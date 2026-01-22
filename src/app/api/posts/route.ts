import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/lib/wordpress';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || '9', 10);

  try {
    const { posts, totalPages } = await getPosts(page, perPage);
    return NextResponse.json({ posts, totalPages });
  } catch (error) {
    console.error('Error in posts API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
