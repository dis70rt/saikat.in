export const HASHNODE_ENDPOINT = "https://gql.hashnode.com/";
export const HASHNODE_HOSTNAME = "blog.saikat.in";
export const POSTS_LIMIT = 10;

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

export interface HashnodePostDetail extends HashnodePostSummary {
  markdown: string;
  html: string;
}

export async function hashnodeRequest<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(HASHNODE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Hashnode request failed with status ${res.status}: ${body}`);
  }

  const payload = await res.json();

  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || "Failed to fetch from Hashnode");
  }

  return payload.data as T;
}

export async function fetchHashnodePosts(): Promise<HashnodePostSummary[]> {
  const query = `
    query PublicationPosts($host: String!, $first: Int!) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              id
              slug
              title
              brief
              publishedAt
              readTimeInMinutes
              url
              tags { name }
            }
          }
        }
      }
    }
  `;

  const data = await hashnodeRequest<{
    publication: {
      posts: { edges: { node: HashnodePostSummary }[] };
    } | null;
  }>(query, { host: HASHNODE_HOSTNAME, first: POSTS_LIMIT });

  return data.publication?.posts.edges.map((e) => e.node) ?? [];
}

export async function fetchHashnodePostBySlug(
  slug: string,
): Promise<HashnodePostDetail> {
  const query = `
    query PostFromPublication($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id slug title brief publishedAt readTimeInMinutes url
          tags { name }
          content { html markdown }
        }
      }
    }
  `;

  const data = await hashnodeRequest<{
    publication: {
      post: {
        id: string;
        slug: string;
        title: string;
        brief: string;
        publishedAt: string;
        readTimeInMinutes: number;
        url: string;
        tags: HashnodeTag[];
        content: { html: string; markdown: string } | null;
      } | null;
    } | null;
  }>(query, { host: HASHNODE_HOSTNAME, slug });

  const node = data.publication?.post;
  if (!node) throw new Error("Post not found on Hashnode");

  return {
    id: node.id,
    slug: node.slug,
    title: node.title,
    brief: node.brief,
    publishedAt: node.publishedAt,
    readTimeInMinutes: node.readTimeInMinutes,
    url: node.url,
    tags: node.tags,
    markdown: node.content?.markdown ?? "",
    html: node.content?.html ?? "",
  };
}
