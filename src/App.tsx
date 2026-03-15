import { useState, useCallback, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { AboutTab } from "@/pages/AboutTab";
import { ProjectsTab } from "@/pages/ProjectsTab";
import { BlogTab } from "@/pages/BlogTab";
import { JourneyTab } from "@/pages/JourneyTab";
import { Loader } from "@/components/Loader";
import { profile } from "@/data/profile";
import { fetchHashnodePosts, type HashnodePostSummary } from "@/lib/hashnode";

type Tab = "about.ts" | "projects.md" | "journey.md" | "blog.md";

const tabs: { id: Tab; label: string }[] = [
  { id: "about.ts",    label: "about.ts" },
  { id: "projects.md", label: "projects.md" },
  { id: "journey.md",  label: "journey.md" },
  { id: "blog.md",     label: "blog.md" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("about.ts");
  const [loaderDone, setLoaderDone] = useState(false);
  const [posts, setPosts] = useState<HashnodePostSummary[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    fetchHashnodePosts()
      .then(setPosts)
      .catch(() => {})
      .finally(() => setPostsLoading(false));
  }, []);

  const handleLoaderDone = useCallback(() => setLoaderDone(true), []);

  return (
    <>
      {!loaderDone && (
        <Loader name={profile.name} onDone={handleLoaderDone} />
      )}

      <div
        className={`min-h-screen bg-background text-foreground transition-opacity duration-500 ${
          loaderDone ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <main className="flex flex-col items-stretch min-h-screen p-2 sm:p-4 md:p-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-start">
              <Sidebar />

              <div className="flex-1 min-w-0 border border-border rounded-sm bg-card overflow-hidden mt-4 lg:mt-0">
                <div className="flex items-center gap-0 border-b border-border overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-xs border-r border-border whitespace-nowrap transition-colors flex-shrink-0 ${
                        activeTab === tab.id
                          ? "bg-background text-foreground border-b-2 border-b-primary -mb-px"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      }`}
                    >
                      <FileIcon name={tab.id} active={activeTab === tab.id} />
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-5">
                  {activeTab === "about.ts"    && <AboutTab posts={posts} postsLoading={postsLoading} onNavigate={(tab) => setActiveTab(tab as Tab)} />}
                  {activeTab === "projects.md" && <ProjectsTab />}
                  {activeTab === "journey.md"  && <JourneyTab />}
                  {activeTab === "blog.md"     && <BlogTab posts={posts} postsLoading={postsLoading} />}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function FileIcon({ name, active }: { name: string; active: boolean }) {
  if (name.endsWith(".ts")) {
    return <span className={`text-[9px] font-bold ${active ? "text-blue-400" : "text-muted-foreground"}`}>TS</span>;
  }
  if (name.endsWith(".md")) {
    return <span className={`text-[9px] font-bold ${active ? "text-green-400" : "text-muted-foreground"}`}>MD</span>;
  }
  return <span className="text-[9px] text-muted-foreground">◻</span>;
}
