import { useState, useEffect } from "react";

export interface GithubProject {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

interface State {
  projects: GithubProject[];
  loading: boolean;
  error: string | null;
}

export function useGithubProjects(username: string, topic: string) {
  const [state, setState] = useState<State>({ projects: [], loading: true, error: null });

  useEffect(() => {
    if (!username || username === "saikat") {
      // Placeholder — real username not set yet, skip fetch
      setState({ projects: [], loading: false, error: null });
      return;
    }

    let cancelled = false;

    async function fetchRepos() {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { headers: { Accept: "application/vnd.github+json" } }
        );

        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }

        const data: GithubProject[] = await res.json();

        const filtered = data
          .filter((repo) => !repo.fork && repo.topics.includes(topic))
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

        if (!cancelled) {
          setState({ projects: filtered, loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({ projects: [], loading: false, error: (err as Error).message });
        }
      }
    }

    fetchRepos();
    return () => { cancelled = true; };
  }, [username, topic]);

  return state;
}
