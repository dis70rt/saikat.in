import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const portfolioData = pgTable("portfolio_data", {
  id: serial("id").primaryKey(),
  data: json("data").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPortfolioDataSchema = createInsertSchema(portfolioData).pick({
  data: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type PortfolioData = typeof portfolioData.$inferSelect;
export type InsertPortfolioData = z.infer<typeof insertPortfolioDataSchema>;


export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  tagline: string;
  domain: string;
  stats: {
    awards: string;
    projects: string;
    companies: string;
  };
}

export interface GridItem {
  id: number;
  title: string;
  description: string;
  type: string;
  img?: string;
  techStack?: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  shortDesc: string;
  img?: string;
  technologies: string[];
  link?: string;
  href?: string;
  github: string;
  status: string;
  category: string;
  projectType: 'major' | 'minor';
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  type: string;
}

export interface Skills {
  frontend: string[];
  backend: string[];
  tools: string[];
  other: string[];
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface PortfolioContent {
  personal: PersonalInfo;
  gridItems: GridItem[];
  projects: Project[];
  timeline: TimelineItem[];
  skills: Skills;
  contact: Contact;
}
