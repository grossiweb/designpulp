import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts, formatDate, getFeaturedImageUrl, stripHtml } from '@/lib/wordpress';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found - Design Pulp',
    };
  }

  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered).substring(0, 160);

  return {
    title: `${title} - Design Pulp`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      images: [getFeaturedImageUrl(post, 'large')],
    },
  };
}

export async function generateStaticParams() {
  const { posts } = await getPosts(1, 50);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const date = formatDate(post.date);
  const imageUrl = getFeaturedImageUrl(post, 'large');

  return (
    <article className="max-w-[900px] mx-auto px-4 py-12">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>

      {/* Featured Image */}
      <div className="relative w-full aspect-[16/9] mb-8">
        <Image
          src={imageUrl}
          alt={stripHtml(post.title.rendered)}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Post Header */}
      <header className="text-center mb-8">
        <div className="text-gray-500 text-sm mb-4">
          {date.full}
        </div>

        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <div className="separator max-w-[100px] mx-auto" />
      </header>

      {/* Post Content */}
      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      {/* Navigation */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="btn-primary inline-block"
        >
          View All Posts
        </Link>
      </div>
    </article>
  );
}
