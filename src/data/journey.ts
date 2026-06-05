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
    title: "Software Development Engineer Intern",
    org: "COPIOUS",
    period: "Jun 2026 - Present",
    description: "Working as an SDE Intern, contributing to software development initiatives.",
    tags: ["SDE"],
    logo: "/images/logos/copious.png",
  },
  {
    id: "bny-hackathon",
    kind: "hackathon",
    title: "1st Place - BNY Hackathon (Transaction Processing & Settlement)",
    org: "BNY Hackathon",
    period: "April 2026",
    description: "Won first place for building a high-performance transaction processing and settlement system.",
    tags: ["Systems"],
    highlight: "1st Place",
    logo: "https://logo.clearbit.com/bny.com",
  },
  {
    id: "nutanix-hackathon",
    kind: "hackathon",
    title: "2nd Place - Nutanix Hackathon (Real-time Workflow Engine)",
    org: "Nutanix Hackathon",
    period: "April 2025",
    description: "WizFlow: Drag-and-drop workflow engine. Won for system reliability and real-time execution logs.",
    tags: ["Python", "FastAPI", "Redis"],
    highlight: "2nd Place",
    logo: "https://logo.clearbit.com/nutanix.com",
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
    id: "vrajh-intern",
    kind: "internship",
    title: "Flutter Developer Intern",
    org: "Vrajpath iTech LLP",
    period: "Dec 2024 - Feb 2025",
    description: "Refactored state management and integrated payment and mapping SDKs.",
    bullets: [
      "Refactored state management, reduced API calls by 30%.",
      "Integrated Razorpay and resolved Play Store privacy and permission issues.",
    ],
    tags: ["Flutter", "API", "Android"],
    highlight: "30% API calls reduction",
    logo: "/images/logos/vrajpath.png",
    logoPadding: true,
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
    id: "e6data-hackathon",
    kind: "hackathon",
    title: "Special Mention - e6Data Hackathon",
    org: "e6Data Hackathon",
    period: "2024",
    description: "Recognized for QQL - an approximate query processing shell with statistical sampling.",
    tags: ["Python", "PostgreSQL"],
    highlight: "Special Mention",
  },
  {
    id: "iit-bhu",
    kind: "education",
    title: "Indian Institute of Technology (BHU), Varanasi",
    org: "B.Tech in Mining Engineering",
    period: "July 2023 - May 2027",
    description: "",
    tags: [],
    logo: "/images/logos/iit_bhu_logo.png",
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
