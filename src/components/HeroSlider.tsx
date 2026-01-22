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
    <div className="relative w-full overflow-hidden bg-gray-100">
      <div className="max-w-[1100px] mx-auto">
        <div className="relative h-[450px] md:h-[550px] lg:h-[642px]">
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
                {/* Image Container */}
                <div className="relative w-full h-[250px] md:h-[350px] lg:h-[440px]">
                  <Image
                    src={imageUrl}
                    alt={post.title.rendered}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>

                {/* Content */}
                <div className="bg-white p-6 md:p-8 text-center">
                  <div className="text-gray-500 text-sm mb-3">
                    {date.full}
                  </div>

                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light mb-4">
                    <Link
                      href={`/post/${post.slug}`}
                      className="hover:text-gray-600 transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                  </h3>

                  <p className="text-gray-600 text-sm md:text-base mb-6 max-w-2xl mx-auto">
                    {truncateText(post.excerpt.rendered, 120)}
                  </p>

                  <Link
                    href={`/post/${post.slug}`}
                    className="btn-primary inline-block"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="slider-nav prev"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="slider-nav next"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 pb-4">
        {posts.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-gray-800 w-6' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
