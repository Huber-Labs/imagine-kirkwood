import { CIVIC_POINTS_TOTAL } from "@/lib/portfolio/tags";
import type { CatalogInvestment, PortfolioState } from "@/lib/portfolio/types";

export function catalogKey(placeSlug: string, futureId: string): string {
  return `${placeSlug}:${futureId}`;
}

export function buildCatalogIndex(
  investments: CatalogInvestment[],
): Map<string, CatalogInvestment> {
  const index = new Map<string, CatalogInvestment>();
  for (const investment of investments) {
    index.set(catalogKey(investment.placeSlug, investment.slug), investment);
  }
  return index;
}

export function resolveInvestment(
  index: Map<string, CatalogInvestment>,
  placeSlug: string,
  futureId: string,
): CatalogInvestment | undefined {
  return index.get(catalogKey(placeSlug, futureId));
}

export function computePortfolioState(
  allocations: { investmentId: string; points: number }[],
  status: PortfolioState["status"],
  participationOpen: boolean,
): Pick<PortfolioState, "allocations" | "totalPoints" | "remainingPoints" | "status" | "participationOpen"> {
  const totalPoints = allocations.reduce((sum, row) => sum + row.points, 0);
  return {
    status,
    allocations,
    totalPoints,
    remainingPoints: Math.max(0, CIVIC_POINTS_TOTAL - totalPoints),
    participationOpen,
  };
}
