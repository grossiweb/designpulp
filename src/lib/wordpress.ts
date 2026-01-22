const WP_API_URL = 'https://designpulp.net/wp-json/wp/v2';

export interface Post {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: {
        sizes?: {
          medium?: { source_url: string };
          large?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
  };
}

export interface Page {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
}

export interface MenuItem {
  id: number;
  title: string;
  url: string;
  slug: string;
}

export async function getPosts(page: number = 1, perPage: number = 9): Promise<{ posts: Post[]; totalPages: number }> {
  try {
    const res = await fetch(
      `${WP_API_URL}/posts?page=${page}&per_page=${perPage}&_embed`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await res.json();
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);

    return { posts, totalPages };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPages: 0 };
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${WP_API_URL}/posts?slug=${slug}&_embed`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }

    const posts = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getPages(): Promise<Page[]> {
  try {
    const res = await fetch(
      `${WP_API_URL}/pages`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch pages');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export async function getPage(slug: string): Promise<Page | null> {
  try {
    const res = await fetch(
      `${WP_API_URL}/pages?slug=${slug}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch page');
    }

    const pages = await res.json();
    return pages[0] || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export function formatDate(dateString: string): { day: string; month: string; full: string } {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const full = `${fullMonths[date.getMonth()]} ${day}, ${date.getFullYear()}`;

  return { day, month, full };
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

export function truncateText(text: string, maxLength: number): string {
  const stripped = stripHtml(text);
  if (stripped.length <= maxLength) return stripped;
  return stripped.substring(0, maxLength).trim() + '...';
}

export function getFeaturedImageUrl(post: Post, size: 'medium' | 'large' | 'full' = 'large'): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return '/placeholder.jpg';

  const sizeUrl = media.media_details?.sizes?.[size]?.source_url;
  return sizeUrl || media.source_url;
}

// Gravity Forms submission
export async function submitGravityForm(formId: number, formData: Record<string, string>): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`https://designpulp.net/wp-json/gf/v2/forms/${formId}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to submit form');
    }

    return { success: true, message: 'Form submitted successfully!' };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Failed to submit form' };
  }
}
