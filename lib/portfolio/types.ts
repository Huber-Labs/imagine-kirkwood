import type { InvestmentTag } from "@/lib/portfolio/tags";

export type PortfolioStatus = "building" | "saved";

export interface CatalogInvestment {
  id: string;
  placeSlug: string;
  placeName: string;
  slug: string;
  title: string;
  pointLimit: number;
}

export interface PortfolioAllocation {
  investmentId: string;
  points: number;
}

export interface PortfolioState {
  status: PortfolioStatus;
  allocations: PortfolioAllocation[];
  totalPoints: number;
  remainingPoints: number;
  participationOpen: boolean;
}

export interface InvestmentTotal {
  investmentId: string;
  slug: string;
  title: string;
  investmentTier: string;
  placeSlug: string;
  placeName: string;
  totalPoints: number;
  uniqueInvestors: number;
}

export type { InvestmentTag };
