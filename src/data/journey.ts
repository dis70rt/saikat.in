export type JourneyKind = "education" | "internship" | "hackathon" | "achievement";

export interface JourneyEntry {
  id: string;
  kind: JourneyKind;
  title: string;
  org: string;
  period: string;
  description: string;
  tags?: string[];
  highlight?: string;
}

export const journey: JourneyEntry[] = [
  {
    id: "nutanix-hackathon",
    kind: "hackathon",
    title: "2nd Place - Nutanix Hackathon (Real-time Workflow Engine)",
    org: "Nutanix Hackathon",
    period: "April 2025",
    description: "WizFlow: Drag-and-drop workflow engine. Won for system reliability and real-time execution logs.",
    tags: ["Python", "FastAPI", "Redis"],
    highlight: "2nd Place",
  },
  {
    id: "vrajh-intern",
    kind: "internship",
    title: "Flutter Developer Intern",
    org: "Vrajh iTech LLP",
    period: "Dec 2024 - Feb 2025",
    description: "Refactored state management, reduced API calls by 30%. Integrated Google Maps SDK and Razorpay. Fixed Play Store privacy and permission issues.",
    tags: ["Flutter", "API", "Android"],
    highlight: "30% API calls reduction",
  },
  {
    id: "iit-bhu",
    kind: "education",
    title: "B.Tech in Mining Engineering (CGPA: 8.39/10)",
    org: "Indian Institute of Technology (BHU), Varanasi",
    period: "July 2023 - May 2027",
    description: "",
    tags: [],
  },
  {
    id: "jee-2023",
    kind: "achievement",
    title: "JEE Advanced 2023 (AIR 13,757)",
    org: "IIT JEE",
    period: "2023",
    description: "Top 9% of qualified candidates.",
    tags: ["JEE"],
    highlight: "AIR 13,757"
  },
    {
    id: "dps-dhanbad",
    kind: "education",
    title: "CBSE Class XII: 87.20%",
    org: "DPS Dhanbad",
    period: "2022",
    description: "Science stream. Foundation for engineering studies.",
    tags: ["CBSE"],
  },
  {
    id: "jee-mains-2023",
    kind: "achievement",
    title: "JEE Mains 2023 (AIR 8,166)",
    org: "NTA",
    period: "2023",
    description: "Top 1% of 1.1 Million candidates.",
    tags: ["JEE"],
    highlight: "AIR 8,166",
  },
];
