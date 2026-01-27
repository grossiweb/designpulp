'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post, formatDate, truncateText, getFeaturedImageUrl } from '@/lib/wordpress';

interface HeroSliderProps {
  posts: Post[];
}

export default function HeroSlider({ posts }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating || posts.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % posts.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, posts.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating || posts.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, posts.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (posts.length === 0) {
    return (
      <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No posts available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="relative h-[500px] md:h-[550px] lg:h-[600px]">
        {posts.slice(0, 5).map((post, index) => {
          const date = formatDate(post.date);
          const imageUrl = getFeaturedImageUrl(post, 'large');

          return (
            <div
              key={post.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Full Width Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={imageUrl}
                  alt={post.title.rendered.replace(/<[^>]*>/g, '')}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>

              {/* White Content Box Overlay */}
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="bg-white p-8 md:p-10 lg:p-12 text-center max-w-[500px] w-full shadow-lg">
                  <div className="text-gray-500 text-xs uppercase tracking-[2px] mb-4">
                    {date.full}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-4">
                    <Link
                      href={`/post/${post.slug}`}
                      className="hover:text-gray-600 transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                  </h3>

                  <p className="text-sm md:text-base mb-6 leading-relaxed">
                    {truncateText(post.excerpt.rendered, 100)}
                  </p>

                  <Link
                    href={`/post/${post.slug}`}
                    className="btn-primary inline-block"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        </div>
      </div>
    </div>
  );
}
