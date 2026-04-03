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
    description: "Event-driven trade clearing engine using Kafka microservices.",
    bullets: [
      "Built a trade clearing engine using four microservices and Kafka topics for order ingestion.",
      "Scaled throughput to 18.8k requests/sec with p95 latency of 219ms, validated using k6 load tests.",
      "Used Kafka key partitioning for lock-free sequential order matching per order book."
    ],
    tags: ["Go", "Kafka", "PostgreSQL", "Redis", "Docker"],
    date: "2025-10-01",
    featured: true,
    links: [
      { label: "Open Source", url: "https://github.com/dis70rt/TradeOrders" },
    ],
  },
  {
    id: "bluppi",
    title: "Bluppi – Shared Music Playback",
    description: "Distributed music streaming backend with real-time synchronization.",
    bullets: [
      "Built a distributed music streaming backend in Go with PTP style clock synchronization.",
      "Developed a real-time presence gateway with gRPC handling 51k concurrent connections.",
      "Developed an ephemeral chat system utilizing Redis Pub/Sub for real-time messaging."
    ],
    tags: ["Go", "gRPC", "PostgreSQL", "Redis", "Solr", "Flutter"],
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
    date: "2025-08-14",
    links: [
      { label: "Open Source", url: "https://github.com/dis70rt/qql" },
    ],
  },
  {
    id: "wizflow",
    title: "WizFlow – Workflow Engine",
    description: "Asynchronous workflow engine with a drag-and-drop UI.",
    bullets: [
      "Built an asynchronous workflow engine using React, FastAPI, and Redis task queuing.",
      "Won 2nd Place at Nutanix Hackathon 2025 for system reliability and real-time execution logs."
    ],
    tags: ["Python", "FastAPI", "Redis"],
    date: "2025-04-01",
  },
  {
    id: "subpaper",
    title: "SubPaper – Reddit Wallpapers App",
    description: "Flutter wallpaper app on the Play Store.",
    bullets: [
      "Published a Flutter wallpaper app on the Play Store with over 300 downloads and a 4.5 rating.",
      "Integrated Reddit APIs for dynamic content delivery and AdMob for monetization."
    ],
    tags: ["Flutter", "Go"],
    date: "2024-04-01",
    links: [
      { label: "Play Store", url: "https://app.saikat.in/subpaper" },
    ],
  },
];
