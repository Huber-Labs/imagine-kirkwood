import type { TimelinePhase } from "@/lib/types";

/** Catalog investment tags — mirrored in Postgres `investment_tag` enum. */
export const INVESTMENT_TAGS = [
  "walkability",
  "trees",
  "small_business",
  "families",
  "arts",
  "history",
  "cycling",
  "green_space",
  "safety",
] as const;

export type InvestmentTag = (typeof INVESTMENT_TAGS)[number];

export type InvestmentTier = TimelinePhase;

export const CIVIC_POINTS_TOTAL = 10;

export const MAX_POINTS_PER_INVESTMENT = 3;

/** Phrase fragments for tag-driven portfolio summaries (Milestone 3). */
export const TAG_PHRASES: Partial<Record<InvestmentTag, string>> = {
  trees: "greener",
  green_space: "greener",
  walkability: "more walkable",
  small_business: "supporting local businesses",
  families: "welcoming for families",
  arts: "rich in arts and culture",
  history: "respectful of history",
  cycling: "easier to bike around",
  safety: "safer",
};

/** Priority when tag scores tie. */
export const TAG_SUMMARY_ORDER: InvestmentTag[] = [
  "walkability",
  "trees",
  "green_space",
  "small_business",
  "families",
  "arts",
  "safety",
  "cycling",
  "history",
];

export function investmentTierLabel(tier: InvestmentTier): string {
  switch (tier) {
    case "today":
      return "Protect What Works";
    case "try-soon":
      return "Try Soon";
    case "grow":
      return "Grow";
    case "long-term":
      return "Long Term";
  }
}
