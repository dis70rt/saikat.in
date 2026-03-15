// ─────────────────────────────────────────────────────────────
//  Projects data file  —  edit this file to manage your projects
//
//  Each project can have up to 4 links (buttons).
//  A link is a pair of { label, url }.
//  If a url is empty ("") or the link is omitted, no button shows.
//
//  Common label examples:
//    "Frontend"     — link to the frontend / live demo
//    "Backend"      — link to the backend / API repo
//    "Open Source"  — link to the GitHub repo
//    "Open Project" — link to the live project / website
//    "Paper"        — link to a research paper / write-up
//    "Video"        — link to a demo video
// ─────────────────────────────────────────────────────────────

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  bullets?: string[];
  tags: string[];
  date: string;
  featured?: boolean;
  // Up to 4 buttons — any with an empty url will be hidden automatically
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: "tradeorders",
    title: "TradeOrders – Order Matching Engine",
    description: "Event-driven order matching backend using Kafka.",
    bullets: [
      "Event-driven order matching backend using Kafka to decouple order ingestion from persistence.",
      "Scaled throughput from 1k to 18k requests/sec with p95 latency < 220ms, validated using k6 load tests.",
      "Sequential order processing per instrument via Kafka partitioning, avoiding locks in the matching logic."
    ],
    tags: ["Go", "Kafka", "Docker"],
    date: "2025-10-01",
    featured: true,
    links: [
      { label: "Open Source", url: "https://github.com/dis70rt/TradeOrders" },
    ],
  },
  {
    id: "bluppi",
    title: "Bluppi – Synchronized Music Streaming",
    description: "Cross-platform real-time music streaming app.",
    bullets: [
      "Cross-platform real-time Flutter app achieving < 200 ms audio synchronization drift across multiple devices.",
      "Implemented WebSocket for persistent control connections and MQTT for lightweight pub/sub messaging.",
      "Optimized backend latency using Redis caching for session states and active track management."
    ],
    tags: ["Flutter", "Python", "PostgreSQL", "Redis"],
    date: "2025-05-01",
    featured: true,
    links: [
      { label: "Backend", url: "https://github.com/dis70rt/Bluppi-backend" },
      { label: "Frontend", url: "https://github.com/dis70rt/Bluppi" },
    ],
  },
  {
    id: "qql",
    title: "QQL – Approximate Query Processing Shell",
    description: "Interactive SQL shell focusing on data sampling.",
    bullets: [
      "Developed an interactive SQL shell focusing on data sampling techniques for faster query estimation.",
      "Achieved 10x speedup on large datasets by implementing statistical sampling with controlled error bounds."
    ],
    tags: ["Python", "PostgreSQL"],
    date: "2025-09-14",
    links: [
      { label: "Open Source", url: "https://github.com/dis70rt/qql" },
    ],
  },
  {
    id: "wizflow",
    title: "WizFlow - Workflow Engine",
    description: "Asynchronous workflow engine with a drag-and-drop UI.",
    bullets: [
      "Asynchronous workflow engine with a drag-and-drop React interface for complex node-based execution.",
      "Won 2nd Place at Nutanix Hackathon 2025 for system reliability and real-time execution logs."
    ],
    tags: ["Python", "FastAPI", "Redis"],
    date: "2025-04-01",
  },
  {
    id: "subpaper",
    title: "SubPaper - Reddit Wallpapers App",
    description: "Flutter app on the Play Store for Reddit wallpapers.",
    bullets: [
      "Published a Flutter app on the Play Store with 300+ downloads and a 4.5 user rating.",
      "Integrated Reddit APIs for content delivery and AdMob for in-app monetization."
    ],
    tags: ["Flutter"],
    date: "2024-04-01",
    links: [
      { label: "Play Store", url: "https://app.saikat.in/subpaper" },
    ],
  },
];
