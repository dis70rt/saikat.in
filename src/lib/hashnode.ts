import rawPosts from "@/data/blogs_data.json";

/** Shape of a single entry in blogs_data.json */
interface RawBlogPost {
  title: string;
  link: string;
  snippet: string;
  pubDate: string;
  reading_time_minutes: number;
  cover_image?: string;
  tags?: string[];
}

export interface HashnodeTag {
  name: string;
}

export interface HashnodePostSummary {
  id: string;
  slug: string;
  title: string;
  brief: string;
  publishedAt: string;
  readTimeInMinutes: number;
  coverImage?: string;
  url: string;
  tags: HashnodeTag[];
}

export function fetchHashnodePosts(): HashnodePostSummary[] {
  return (rawPosts as RawBlogPost[]).map((post) => ({
    id: post.link,
    slug: post.link.split('/').pop() || '',
    title: post.title,
    brief: post.snippet,
    publishedAt: post.pubDate,
    readTimeInMinutes: post.reading_time_minutes,
    coverImage: post.cover_image,
    url: post.link,
    tags: (post.tags || []).map((t) => ({ name: t }))
  }));
}
