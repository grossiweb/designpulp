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

  const shareUrl = encodeURIComponent(`https://designpulp.net/post/${post.slug}`);
  const shareTitle = encodeURIComponent(post.title.rendered.replace(/<[^>]*>/g, ''));

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

        {/* Social Share */}
        <div className="social-share flex items-center text-xs text-gray-500">
          <span className="mr-2">Share on:</span>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a
            href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Pinterest"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
