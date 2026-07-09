import type { JourneyKind } from "./journey";

/**
 * Single source of truth for journey-kind colors.
 * Used by index.astro, journey.astro, TimelineEntry.astro, and Sidebar.astro.
 */
export const kindColors: Record<JourneyKind, { hex: string; tw: string }> = {
  education:   { hex: "#7aa2f7", tw: "var(--tn-blue)" },
  internship:  { hex: "#bb9af7", tw: "var(--tn-purple)" },
  hackathon:   { hex: "#e0af68", tw: "var(--tn-yellow)" },
  achievement: { hex: "#9ece6a", tw: "var(--tn-green)" },
  leadership:  { hex: "#7dcfff", tw: "var(--tn-cyan)" },
};

/** Computed style strings for badges */
export function badgeStyle(kind: JourneyKind) {
  const c = kindColors[kind];
  return `color:${c.hex};border-color:${c.hex}40;background:${c.hex}12`;
}
