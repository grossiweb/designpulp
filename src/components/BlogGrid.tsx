'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post, formatDate, truncateText, getFeaturedImageUrl } from '@/lib/wordpress';

interface BlogGridProps {
  initialPosts: Post[];
  totalPages: number;
}

export default function BlogGrid({ initialPosts, totalPages }: BlogGridProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(currentPage < totalPages);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const res = await fetch(`/api/posts?page=${nextPage}&per_page=9`);
      const data = await res.json();

      if (data.posts && data.posts.length > 0) {
        setPosts((prev) => [...prev, ...data.posts]);
        setCurrentPage(nextPage);
        setHasMore(nextPage < data.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12">
      {/* Section Title */}
      <div className="text-center mb-12">
        <div className="separator max-w-[200px] mx-auto mb-8" />
        <h5 className="text-sm uppercase tracking-[3px] text-gray-700 font-medium">
          Latest Blog Posts
        </h5>
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {posts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? 'Loading...' : 'Show more'}
          </button>
        </div>
      )}
    </div>
  );
}

interface BlogCardProps {
  post: Post;
  index: number;
}

function BlogCard({ post, index }: BlogCardProps) {
  const date = formatDate(post.date);
  const imageUrl = getFeaturedImageUrl(post, 'medium');
  const excerpt = truncateText(post.excerpt.rendered, 150);

  return (
    <article
      className="bg-white overflow-hidden animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image with Date Badge */}
      <div className="relative">
        <Link href={`/post/${post.slug}`} className="block aspect-square relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title.rendered.replace(/<[^>]*>/g, '')}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Date Badge */}
        <div className="date-badge">
          <span className="day">{date.day}</span>
          <span className="month">{date.month}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h5 className="text-base font-medium mb-3 leading-tight">
          <Link
            href={`/post/${post.slug}`}
            className="hover:text-gray-600 transition-colors"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </h5>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {excerpt}
        </p>
      </div>
    </article>
  );
}
