export type JourneyKind = "education" | "internship" | "hackathon" | "achievement" | "leadership";

export interface JourneyEntry {
  id: string;
  kind: JourneyKind;
  title: string;
  org: string;
  period: string;
  description: string;
  bullets?: string[];
  tags?: string[];
  highlight?: string;
  logo?: string;
  logoPadding?: boolean;
}

export const journey: JourneyEntry[] = [
  {
    id: "copious-intern",
    kind: "internship",
    title: "Software Engineering Intern",
    org: "COPIOUS · Tripple Double",
    period: "Jun 2026 - Aug 2026",
    description: "",
    bullets: [
      "Built a Flutter split-screen web portal with auto-save and rule-based validation for FIBA scoresheet digitization.",
      "Engineered a VLM OCR pipeline via OpenRouter, optimizing accuracy vs. cost.",
      "Reduced hallucination and token costs via dynamic prompts, JSON key aliasing, and output-embedded reasoning.",
      "Cut operator cost by 91.92% ($0.52 → $0.042) and entry time by 73.33% (30m → 8m)."
    ],
    tags: ["Flutter", "VLM", "OpenRouter"],
    highlight: "91.9% Cost Reduction",
    logo: "/images/logos/copious.webp",
  },
  {
    id: "bny-hackathon",
    kind: "hackathon",
    title: "1st Place - BNY Hackathon",
    org: "Transaction Processing & Settlement",
    period: "April 2026",
    description: "Won first place for building a high-performance transaction processing and settlement system.",
    tags: ["Systems"],
    highlight: "1st Place",
    logo: "https://logo.clearbit.com/bny.com",
  },
  {
    id: "nutanix-hackathon",
    kind: "hackathon",
    title: "2nd Place - Nutanix Hackathon",
    org: "Real-time Workflow Engine",
    period: "April 2025",
    description: "WizFlow: Drag-and-drop workflow engine. Won for system reliability and real-time execution logs.",
    tags: ["Python", "FastAPI", "Redis"],
    highlight: "2nd Place",
    logo: "https://logo.clearbit.com/nutanix.com",
  },
  {
    id: "vrajh-intern",
    kind: "internship",
    title: "Flutter Developer Intern",
    org: "Vrajpath iTech LLP",
    period: "Dec 2024 - Jan 2025",
    description: "",
    bullets: [
      "Reduced API requests by ~30% via Riverpod state caching, validated in Dart DevTools.",
      "Integrated Razorpay for secure payments and Google Maps for real-time geolocation.",
    ],
    tags: ["Flutter", "API", "Android"],
    highlight: "30% API Reduction",
    logo: "/images/logos/vrajpath.webp",
    logoPadding: true,
  },
  {
    id: "leetcode",
    kind: "achievement",
    title: "LeetCode Top 9.22% Globally",
    org: "LeetCode",
    period: "Present",
    description: "Ranked in the top 9.22% globally with a 1,778 peak rating and 256+ problems solved.",
    tags: ["Algorithms", "Problem Solving"],
    highlight: "1,778 Peak Rating"
  },
  {
    id: "codeforces",
    kind: "achievement",
    title: "Codeforces Pupil",
    org: "Codeforces",
    period: "Present",
    description: "Achieved Pupil rank (1,217 Max Rating), solving 150+ algorithmic challenges.",
    tags: ["Competitive Programming"],
    highlight: "Pupil Rank"
  },
  {
    id: "e6data-hackathon",
    kind: "hackathon",
    title: "Special Mention - e6Data Hackathon",
    org: "e6Data",
    period: "October 2025",
    description: "Recognized for QQL - an approximate query processing shell with statistical sampling.",
    tags: ["Python", "PostgreSQL"],
    highlight: "Special Mention",
  },
  {
    id: "event-exec",
    kind: "leadership",
    title: "Event Executive",
    org: "Club of Programmers, IIT (BHU)",
    period: "2024 - Present",
    description: "Mentored over 200 students in web and mobile development workshops.",
    tags: ["Mentorship"],
  },
  {
    id: "creative-exec",
    kind: "leadership",
    title: "Creative Executive",
    org: "Kashiyatra, IIT (BHU)",
    period: "2024",
    description: "Improved creative presence across 9 events for Kashiyatra to increase audience engagement.",
    tags: ["Design"],
  },
  {
    id: "iit-bhu",
    kind: "education",
    title: "Indian Institute of Technology (BHU), Varanasi",
    org: "B.Tech in Mining Engineering",
    period: "July 2023 - May 2027",
    description: "CGPA: 8.39/10.0",
    tags: [],
    logo: "/images/logos/iit_bhu_logo.webp",
  },
  {
    id: "jee-2023",
    kind: "achievement",
    title: "JEE Advanced 2023 (AIR 13,757)",
    org: "JEE Adv",
    period: "2023",
    description: "Top 9% of qualified candidates.",
    tags: ["JEE"],
    highlight: "AIR 13,757"
  },
  {
    id: "jee-mains-2023",
    kind: "achievement",
    title: "JEE Mains 2023 (AIR 8,166)",
    org: "JEE Mains",
    period: "2023",
    description: "Top 1% of 1.1 Million candidates.",
    tags: ["JEE"],
    highlight: "AIR 8,166",
  },
];
