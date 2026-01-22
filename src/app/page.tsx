import HeroSlider from '@/components/HeroSlider';
import BlogGrid from '@/components/BlogGrid';
import { getPosts } from '@/lib/wordpress';

export default async function Home() {
  const { posts, totalPages } = await getPosts(1, 9);

  // Get the first 5 posts for the slider
  const sliderPosts = posts.slice(0, 5);

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider posts={sliderPosts} />

      {/* Blog Grid */}
      <div className="max-w-[1100px] mx-auto px-4">
        <BlogGrid initialPosts={posts} totalPages={totalPages} />
      </div>
    </>
  );
}
