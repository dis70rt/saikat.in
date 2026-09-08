// ─────────────────────────────────────────────────────────────
//  Projects data file  -  edit this file to manage your projects
//
//  Each project can have up to 4 links (buttons).
//  A link is a pair of { label, url }.
//  If a url is empty ("") or the link is omitted, no button shows.
//
//  Common label examples:
//    "Frontend"     - link to the frontend / live demo
//    "Backend"      - link to the backend / API repo
//    "Open Source"  - link to the GitHub repo
//    "Open Project" - link to the live project / website
//    "Paper"        - link to a research paper / write-up
//    "Video"        - link to a demo video
// ─────────────────────────────────────────────────────────────

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  image?: string;
  bullets?: string[];
  tags: string[];
  date: string;
  featured?: boolean;
  // Up to 4 buttons - any with an empty url will be hidden automatically
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: "flowback",
    title: "Flowback - AI Revenue Recovery Platform",
    description: "Autonomous, event-driven pipeline that intercepts failed SaaS payments and deploys AI agents to recover revenue.",
    image: "/images/projects/flowback.png",
    bullets: [
      "Queued payment webhooks via Go + Redis Asynq, scaling background workers with idempotent, effectively-once processing.",
      "Orchestrated a multi-agent Google ADK graph with copywriter and Gemini TTS agents to drive multi-channel outreach (Email, WhatsApp, SMS, Voice).",
      "Wrote a deterministic Go policy engine enforcing hard constraints (discount & contact-hour limits) to guarantee zero hallucination in financial flows.",
      "Streamed agent state to a Human-in-the-Loop (HITL) React dashboard via Redis Pub/Sub and SSE, eliminating polling overhead."
    ],
    tags: ["Go", "React", "Redis", "Google ADK", "SSE", "Docker"],
    date: "2026-09-01",
    featured: true,
    links: [
      { label: "Open Source", url: "https://github.com/dis70rt/Flowback" },
      { label: "Video", url: "https://www.youtube.com/watch?v=gg_5s9nRk5A" },
    ],
  },
  {
    id: "tradeorders",
    title: "TradeOrders - Order Matching Engine",
    description: "Event-driven trade clearing engine using Kafka microservices.",
    image: "/images/projects/trade_orders.webp",
    bullets: [
      "Decoupled API from DB via Kafka, eliminating all I/O bottlenecks; scaled throughput to 18.8k req/s (0 errors).",
      "Partitioned Kafka topics by instrument for lock-free, sequential matching, enabling concurrent process per symbol.",
      "Grafana k6 load tested at 7,624 VUs: hit 18.2k req/s sustained throughput with a 231ms p95 latency."
    ],
    tags: ["Go", "Kafka", "PostgreSQL", "Redis", "Docker"],
    date: "2025-10-01",
    featured: true,
    links: [
      { label: "Open Source", url: "https://github.com/dis70rt/TradeOrders" },
    ],
  },
  {
    id: "exammcp",
    title: "ClosedBook - Zero-Hallucination MCP RAG Engine",
    description: "High-precision local RAG engine over Model Context Protocol (MCP) enforcing strict ground-truth document retrieval.",
    image: "/images/projects/exammcp.png",
    bullets: [
      "Engineered hybrid search combining dense semantic embeddings (BAAI/bge-small-en-v1.5) with sparse BM25Okapi lexical retrieval to maximize precision on technical text.",
      "Enforced strict closed-book constraints, overriding model pre-trained assumptions with authoritative local document citations.",
      "Implemented 100% local, private vector search using FAISS CPU with sub-millisecond query latencies.",
      "Packaged as a standard Model Context Protocol (MCP) server for plug-and-play integration with Claude, Antigravity, and AI IDEs."
    ],
    tags: ["Python", "MCP", "RAG", "FAISS", "BM25"],
    date: "2026-09-07",
    featured: true,
    links: [
      { label: "Open Source", url: "https://github.com/dis70rt/closed-book-mcp" },
    ],
  },
  {
    id: "bluppi",
    title: "Bluppi - Shared Music Playback",
    description: "Distributed music streaming backend with real-time synchronization.",
    image: "/images/projects/bluppi.webp",
    bullets: [
      "Designed PTP-style clock synchronization with quorum-based buffering for consistent playback across devices.",
      "Tracks online presence via a gRPC gateway: 51k concurrent connections with 0 errors and p99 15ms latency.",
      "Live ephemeral chat via Redis Pub/Sub, social features via Memgraph, and a 500GB music catalog via Solr."
    ],
    tags: ["Go", "gRPC", "PostgreSQL", "Redis", "Solr", "Flutter"],
    date: "2025-05-01",
    featured: true,
    links: [
      { label: "Open Project", url: "https://bluppi.saikat.in" },
      { label: "Backend", url: "https://github.com/dis70rt/bluppi-backend" },
      { label: "Frontend", url: "https://github.com/dis70rt/bluppi-frontend" },
    ],
  },
  {
    id: "keryx",
    title: "Keryx - Local Multi-Agent Outreach Engine",
    description: "Autonomous LinkedIn research and personalized cold-messaging pipeline powered by local LLMs and LangGraph.",
    bullets: [
      "Built an end-to-end multi-agent pipeline using LangGraph and Ollama to scrape profiles via stealth Playwright, extract unstructured career history, and match shared backgrounds.",
      "Designed a closed-loop Copywriter-Reviewer reflection pattern that critiques drafts against anti-slop guidelines and rewrites with targeted feedback.",
      "Maintained episodic memory and candidate history across outreach campaigns using ChromaDB vector search and SQLite.",
      "Automated bi-directional lead ingestion and status tracking via Google Sheets API."
    ],
    tags: ["Python", "LangGraph", "Playwright", "ChromaDB", "Ollama"],
    date: "2026-04-20",
    links: [
      { label: "Open Source", url: "https://github.com/dis70rt/keryx" },
    ],
  },
  {
    id: "tsuki",
    title: "Tsuki - Pastel LinkedIn Banner Studio",
    description: "Interactive in-browser design tool for creating neobrutalist, pastel LinkedIn banners with real-time canvas rendering.",
    image: "/images/projects/tsuki.webp",
    bullets: [
      "Built an interactive HTML5 Canvas design tool in React (Vite) allowing real-time text editing, color palettes, and procedural background pattern generation.",
      "Engineered instant high-resolution export in PNG and optimized WebP formats calibrated to LinkedIn header dimensions (1584x396).",
      "Created a lightweight, zero-JS starry sky animation using pure CSS keyframes."
    ],
    tags: ["React", "TypeScript", "HTML5 Canvas", "Tailwind CSS"],
    date: "2026-06-08",
    links: [
      { label: "Open Project", url: "https://tsuki.saikat.in" },
      { label: "Open Source", url: "https://github.com/dis70rt/Tsuki" },
    ],
  },
  {
    id: "qql",
    title: "QQL - Approximate Query Processing Shell",
    description: "Interactive SQL shell focusing on data sampling.",
    image: "/images/projects/qql.webp",
    bullets: [
      "Designed a dynamic pilot query engine to estimate statistical sample sizes, supporting COUNT, SUM, AVG functions.",
      "Benchmarked against exact PostgreSQL queries: achieved a 10x speedup at 5% error and 6x at 1% error bound.",
      "Awarded Special Mention at the e6Data Hackathon 2024 for innovative approaches to database acceleration."
    ],
    tags: ["Python", "PostgreSQL"],
    date: "2025-08-14",
    links: [
      { label: "Open Source", url: "https://github.com/dis70rt/qql" },
    ],
  },
  {
    id: "subpaper",
    title: "SubPaper - Reddit Wallpapers App",
    description: "Flutter wallpaper app on the Play Store.",
    image: "/images/projects/subpaper.webp",
    bullets: [
      "Published Reddit wallpaper app to Play Store. 300+ downloads, 4.5/5 rating.",
      "Implemented on-device caching for fast content delivery and integrated AdMob for monetization."
    ],
    tags: ["Flutter", "Go"],
    date: "2024-04-01",
    links: [
      { label: "Open Project", url: "https://subpaper.saikat.in" },
      { label: "Play Store", url: "https://play.google.com/store/apps/details?id=in.saikat.subpaper" },
    ],
  },
  {
    id: "wizflow",
    title: "WizFlow - Workflow Engine",
    description: "Asynchronous workflow engine with a drag-and-drop UI.",
    bullets: [
      "Built an asynchronous workflow engine using React, FastAPI, and Redis task queuing.",
      "Won 2nd Place at Nutanix Hackathon 2025 for system reliability and real-time execution logs."
    ],
    tags: ["Python", "FastAPI", "Redis"],
    date: "2025-04-01",
    links: [
      { label: "Open Source", url: "https://github.com/dis70rt/WizFlow" },
    ],
  },
];
