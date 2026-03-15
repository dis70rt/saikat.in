import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import type { HashnodePostSummary } from "@/lib/hashnode";

interface AboutTabProps {
  posts: HashnodePostSummary[];
  postsLoading: boolean;
  onNavigate?: (tab: string) => void;
}

export function AboutTab({ posts, postsLoading, onNavigate }: AboutTabProps) {
  const latestProjects = projects.slice(0, 2);
  const latestPosts = posts.slice(0, 2);

  const hasExperience = experience.length > 0;
  const hasPosts = !postsLoading && latestPosts.length > 0;
  const hasProjects = latestProjects.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="text-xs text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
          <span>►</span> About me
        </h2>
        <div className="border border-border rounded-sm bg-card p-4">
          {/* <p className="text-xs text-muted-foreground leading-relaxed">{profile.bio}</p> */}
          <p className="text-xs text-muted-foreground leading-relaxed mt-2">
            I build backend systems that stay fast under pressure. Most of my time goes into Go, real-time architectures, and databases. The rest goes into chess ♟️, sketching ✏️, strong coffee ☕, and traveling ✈️ to find great food 🍜.
          </p>
        </div>
      </section>

      {hasPosts && (
        <section>
          <h2 className="text-xs text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
            <span>≡</span> Latest Posts
          </h2>
          <div className="flex flex-col gap-2">
            {latestPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onNavigate?.("blog.md")}
                className="border border-border rounded-sm bg-card p-3 flex items-start justify-between gap-3 cursor-pointer hover:border-primary/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{post.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{post.brief}</p>
                </div>
                <span className="text-[10px] text-muted-foreground flex-shrink-0">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {hasProjects && (
        <section>
          <h2 className="text-xs text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
            <span>□</span> Latest Projects
          </h2>
          <div className="flex flex-col gap-2">
            {latestProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onNavigate?.("projects.md")}
                className="border border-border rounded-sm bg-card p-3 flex items-start justify-between gap-3 cursor-pointer hover:border-primary/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{project.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{project.description}</p>
                </div>
                <span className="text-[10px] text-muted-foreground flex-shrink-0">
                  {new Date(project.date).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {hasExperience && (
        <section>
          <h2 className="text-xs text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
            <span>◈</span> Work Experience
          </h2>
          <div className="flex flex-col gap-2">
            {experience.map((job, i) => (
              <div key={i} className="border border-border rounded-sm bg-card p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-xs font-semibold ${job.current ? "text-primary" : "text-foreground"}`}>
                    {job.company}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{job.period}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{job.role}</p>
                {job.description && (
                  <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{job.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
