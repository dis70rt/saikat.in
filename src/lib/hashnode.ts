import blogPosts from "../data/blog-posts.json";

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
  url: string;
  tags: HashnodeTag[];
}

export function fetchHashnodePosts(): HashnodePostSummary[] {
  // Completely removed network fetch and XML parsing.
  // We now simply serve the static JSON file.
  // You can manually edit `src/data/blog-posts.json` to add new posts!
  return blogPosts as HashnodePostSummary[];
}
