import { Clock, Tag, ArrowLeft, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import {
  type HashnodePostSummary,
  type HashnodePostDetail,
  fetchHashnodePostBySlug,
} from "@/lib/hashnode";

const DETAIL_PREVIEW_CHAR_LIMIT = 2600;

function PostDetail({ post, onBack }: { post: HashnodePostDetail; onBack: () => void }) {
  const hasHtml = post.html.trim().length > 0;
  const previewFallback = useMemo(() => {
    if (post.markdown.length <= DETAIL_PREVIEW_CHAR_LIMIT) {
      return post.markdown;
    }

    const clipped = post.markdown.slice(0, DETAIL_PREVIEW_CHAR_LIMIT);
    const lastBreak = clipped.lastIndexOf("\n\n");
    const safe = lastBreak > 200 ? clipped.slice(0, lastBreak) : clipped;
    return `${safe}\n\n...`;
  }, [post.markdown]);

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-5 transition-colors"
      >
        <ArrowLeft size={12} />
        Back to posts
      </button>

      <div className="mb-5">
        <h2 className="text-base font-semibold text-foreground mb-2">{post.title}</h2>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {post.readTimeInMinutes} min read
          </span>
        </div>
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {post.tags.map((tag) => (
            <span key={tag.name} className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded-sm">
              <Tag size={8} />
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        {hasHtml ? (
          <div
            className="blog-content text-sm max-h-[30rem] overflow-hidden"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        ) : (
          <pre className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed max-h-[30rem] overflow-hidden">
            {previewFallback}
          </pre>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#171717] to-transparent" />
      </div>

      <div className="mt-5 border-t border-border pt-3">
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          Read full post on Hashnode
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

interface BlogTabProps {
  posts: HashnodePostSummary[];
  postsLoading: boolean;
}

export function BlogTab({ posts, postsLoading }: BlogTabProps) {
  const [selectedSummary, setSelectedSummary] = useState<HashnodePostSummary | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<HashnodePostDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [detailCache, setDetailCache] = useState<Record<string, HashnodePostDetail>>({});

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    [posts],
  );

  const openPost = async (post: HashnodePostSummary) => {
    setSelectedSummary(post);
    setDetailError(null);

    const cached = detailCache[post.slug];
    if (cached) {
      setSelectedDetail(cached);
      return;
    }

    setSelectedDetail(null);
    setDetailLoading(true);
    try {
      const detail = await fetchHashnodePostBySlug(post.slug);
      setDetailCache((prev) => ({ ...prev, [post.slug]: detail }));
      setSelectedDetail(detail);
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : "Failed to load this post");
    } finally {
      setDetailLoading(false);
    }
  };

  const closePost = () => {
    setSelectedSummary(null);
    setSelectedDetail(null);
    setDetailError(null);
  };

  if (selectedSummary) {
    return (
      <div>
        {detailLoading && (
          <div className="text-xs text-muted-foreground">Loading post from Hashnode...</div>
        )}

        {detailError && (
          <div className="border border-border rounded-sm bg-card p-4 text-xs text-red-400">
            {detailError}
            <button
              onClick={closePost}
              className="ml-2 text-primary hover:underline"
            >
              Go back
            </button>
          </div>
        )}

        {!detailLoading && !detailError && selectedDetail && (
          <PostDetail post={selectedDetail} onBack={closePost} />
        )}
      </div>
    );
  }

  if (postsLoading) {
    return <div className="text-xs text-muted-foreground">Loading blogs from Hashnode...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {sorted.map((post) => (
        <button
          key={post.id}
          onClick={() => openPost(post)}
          className="w-full text-left border border-border rounded-sm bg-card p-4 hover:border-primary/40 transition-colors group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                {post.brief}
              </p>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                <span className="flex items-center gap-1">
                  <Clock size={9} />
                  {post.readTimeInMinutes} min
                </span>
                <div className="flex gap-1 flex-wrap">
                  {post.tags.map((tag) => (
                    <span key={tag.name} className="bg-muted/60 px-1.5 py-0.5 rounded-sm">{tag.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </button>
      ))}

      {sorted.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-xs">
          No posts found on Hashnode.
        </div>
      )}
    </div>
  );
}
