import { profile } from "@/data/profile";
import { Github, Twitter, Linkedin, Mail, MapPin, User, Download } from "lucide-react";
import { useState, useEffect } from "react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  mail: Mail,
};

const categoryColor: Record<string, string> = {
  language:  "text-blue-400 border-blue-400/20 bg-blue-400/5",
  framework: "text-purple-400 border-purple-400/20 bg-purple-400/5",
  infra:     "text-yellow-400 border-yellow-400/20 bg-yellow-400/5",
  database:  "text-green-400 border-green-400/20 bg-green-400/5",
};

function TerminalPrompt() {
  const lines = [
    { prefix: true,  text: "go run ./cmd/connect",      delay: 0,    muted: false },
    { prefix: false, text: "» compiling...",             delay: 700,  muted: true  },
    { prefix: false, text: "» build: success",           delay: 1400, muted: true  },
    { prefix: false, text: "» listening for contact...", delay: 2100, muted: false },
  ];

  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisible((v) => [...v, i]);
      }, line.delay);
    });
  }, []);

  return (
    <div className="bg-[hsl(0,0%,5%)] border border-border rounded-sm p-3 text-xs font-mono">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`transition-opacity duration-300 ${visible.includes(i) ? "opacity-100" : "opacity-0"} ${line.muted ? "text-muted-foreground" : "text-foreground"}`}
        >
          {line.prefix && <span className="text-primary">$ </span>}
          {line.text}
          {i === lines.length - 1 && visible.includes(i) && (
            <span className="cursor-blink text-primary ml-0.5">_</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4 lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto mt-0 lg:mt-0">
      {/* Profile card */}
      <div className="border border-border rounded-sm bg-card p-4 sm:p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm border border-border bg-muted flex items-center justify-center flex-shrink-0">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover rounded-sm" />
            ) : (
              <User size={24} className="text-muted-foreground" />
            )}
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">{profile.name}</h1>
            <p className="text-xs text-primary mt-0.5">{profile.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
          <MapPin size={11} />
          <span>{profile.location}</span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mt-2">{profile.bio}</p>
      </div>

      {/* Tech stack */}
      {profile.techStack.length > 0 && (
        <div className="border border-border rounded-sm bg-card p-3 sm:p-4 flex flex-col gap-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.techStack.map((tech) => (
              <span
                key={tech.name}
                className={`text-[11px] border rounded-sm px-2 py-0.5 ${categoryColor[tech.category] ?? "text-muted-foreground border-border bg-muted/30"}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1 mt-0.5">
            {(["language", "framework", "infra", "database"] as const).map((cat) => {
              const hasAny = profile.techStack.some((t) => t.category === cat);
              if (!hasAny) return null;
              return (
                <span key={cat} className={`flex items-center gap-1 text-[9px] ${categoryColor[cat]}`}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block border" style={{ borderColor: "currentColor", background: "currentColor", opacity: 0.5 }} />
                  {cat}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Interests */}
      {profile.interests.length > 0 && (
        <div className="border border-border rounded-sm bg-card p-4 flex flex-col gap-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Interests</p>
          <div className="flex flex-col gap-1.5">
            {profile.interests.map((interest) => (
              <div key={interest} className="flex items-center gap-2 text-xs text-foreground">
                <span className="text-primary text-[10px]">▸</span>
                {interest}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Terminal */}
      <TerminalPrompt />

      {/* Socials */}
      <div className="border border-border rounded-sm bg-card p-4 flex flex-col gap-3">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Socials</p>
        <div className="flex gap-2 flex-wrap">
          {profile.socials.map((s) => {
            const Icon = iconMap[s.icon] || Mail;
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="w-9 h-9 border border-border rounded-sm bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>

        {/* Resume download */}
        {profile.resumeUrl ? (
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center justify-center gap-2 text-xs border border-primary/40 text-primary rounded-sm py-1.5 px-3 hover:bg-primary/10 transition-colors"
          >
            <Download size={12} />
            Download Resume
          </a>
        ) : (
          <div
            title="Set resumeUrl in src/data/profile.ts to enable"
            className="flex items-center justify-center gap-2 text-xs border border-border text-muted-foreground/40 rounded-sm py-1.5 px-3 cursor-not-allowed select-none"
          >
            <Download size={12} />
            Download Resume
          </div>
        )}
      </div>
    </aside>
  );
}
