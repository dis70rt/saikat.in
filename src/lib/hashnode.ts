import rawPosts from "../../blogs_data.json";

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
  return rawPosts.map((post: any) => ({
    id: post.link,
    slug: post.link.split('/').pop() || '',
    title: post.title,
    brief: post.snippet,
    publishedAt: post.pubDate,
    readTimeInMinutes: post.reading_time_minutes,
    coverImage: post.cover_image,
    url: post.link,
    tags: (post.tags || []).map((t: string) => ({ name: t }))
  }));
}
