import { useState } from "react";
import { projects, Project, ProjectLink as TProjectLink } from "@/data/projects";
import { ExternalLink, Tag } from "lucide-react";

// Visual style per button label — feel free to extend this map
const LINK_STYLE: Record<string, string> = {
  "Frontend":
    "border-blue-500/40 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400",
  "Backend":
    "border-green-500/40 text-green-400 hover:bg-green-500/10 hover:border-green-400",
  "Open Source":
    "border-purple-500/40 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400",
  "Open Project":
    "border-primary/40 text-primary hover:bg-primary/10 hover:border-primary",
  "Paper":
    "border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-400",
  "Video":
    "border-orange-500/40 text-orange-400 hover:bg-orange-500/10 hover:border-orange-400",
};

const DEFAULT_LINK_STYLE =
  "border-border text-muted-foreground hover:text-foreground hover:border-primary/50";

function LinkButton({ link }: { link: TProjectLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`flex items-center gap-1.5 text-[11px] border rounded-sm px-2.5 py-1.5 transition-colors whitespace-nowrap ${
        LINK_STYLE[link.label] ?? DEFAULT_LINK_STYLE
      }`}
    >
      <ExternalLink size={10} className="flex-shrink-0" />
      {link.label}
    </a>
  );
}

function ProjectCard({ 
  project, 
  expanded, 
  onToggle 
}: { 
  project: Project; 
  expanded: boolean; 
  onToggle: () => void; 
}) {
  const activeLinks = (project.links ?? [])
    .filter((l) => l.url.trim() !== "")
    .slice(0, 4);

  return (
    <div 
      className="border border-border rounded-sm bg-card p-5 flex flex-col gap-4 hover:border-primary/40 transition-colors cursor-pointer"
      onClick={onToggle}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground leading-snug">
          {project.title}
        </h3>
        {project.featured && (
          <span className="text-[10px] text-primary border border-primary/30 rounded-sm px-1.5 py-0.5 flex-shrink-0">
            featured
          </span>
        )}
      </div>

      {/* Description & Bullets */}
      <div className="flex-1 flex flex-col gap-2">
        {project.description && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        )}

        {project.bullets && project.bullets.length > 0 && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="list-disc list-inside text-xs text-muted-foreground leading-relaxed max-w-full space-y-1.5 ml-3">
              {project.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded-sm"
            >
              <Tag size={8} />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Link buttons */}
      {activeLinks.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
          {activeLinks.map((link) => (
            <LinkButton key={link.label} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectsTab() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const sorted = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <p className="text-xs text-muted-foreground">
          No projects yet. Add them to{" "}
          <code className="text-primary">src/data/projects.ts</code>
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-start">
      {sorted.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          expanded={expandedProjectId === project.id}
          onToggle={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
        />
      ))}
    </div>
  );
}
