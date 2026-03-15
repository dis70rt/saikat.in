import { journey, JourneyKind } from "@/data/journey";

const kindConfig: Record<JourneyKind, { label: string; dot: string; badge: string }> = {
  education:   { label: "Education",   dot: "bg-blue-400",   badge: "text-blue-400 border-blue-400/25 bg-blue-400/5" },
  internship:  { label: "Internship",  dot: "bg-purple-400", badge: "text-purple-400 border-purple-400/25 bg-purple-400/5" },
  hackathon:   { label: "Hackathon",   dot: "bg-yellow-400", badge: "text-yellow-400 border-yellow-400/25 bg-yellow-400/5" },
  achievement: { label: "Achievement", dot: "bg-green-400",  badge: "text-green-400 border-green-400/25 bg-green-400/5" },
};

export function JourneyTab() {
  const sorted = [...journey];

  return (
    <div className="flex flex-col gap-0">
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-6">
        {(Object.entries(kindConfig) as [JourneyKind, typeof kindConfig[JourneyKind]][]).map(([kind, cfg]) => {
          const hasAny = journey.some((e) => e.kind === kind);
          if (!hasAny) return null;
          return (
            <span key={kind} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

        <div className="flex flex-col gap-0">
          {sorted.map((entry, idx) => {
            const cfg = kindConfig[entry.kind];
            const isLast = idx === sorted.length - 1;
            return (
              <div key={entry.id} className={`relative flex gap-4 ${isLast ? "pb-0" : "pb-6"}`}>
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 mt-1">
                  <span className={`block w-3.5 h-3.5 rounded-full border-2 border-background ${cfg.dot}`} />
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0 border border-border rounded-sm bg-card p-4 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xs font-semibold text-foreground">{entry.title}</h3>
                        {entry.highlight && (
                          <span className={`text-[10px] border rounded-sm px-1.5 py-0.5 font-medium ${cfg.badge}`}>
                            {entry.highlight}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {entry.org} &middot; {entry.period}
                      </p>
                    </div>
                    <span className={`text-[10px] border rounded-sm px-1.5 py-0.5 flex-shrink-0 ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">{entry.description}</p>

                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-muted-foreground bg-muted/50 border border-border rounded-sm px-1.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
