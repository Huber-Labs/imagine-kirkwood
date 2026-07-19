"use server";

import { revalidatePath } from "next/cache";
import { getOptionalUser } from "@/lib/auth/session";
import { computePortfolioState } from "@/lib/portfolio/catalog";
import type {
  CatalogInvestment,
  InvestmentTotal,
  PortfolioState,
} from "@/lib/portfolio/types";
import { CIVIC_POINTS_TOTAL } from "@/lib/portfolio/tags";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

type ActionResult = { ok: true } | { ok: false; error: string };

export async function fetchInvestmentCatalog(): Promise<CatalogInvestment[]> {
  if (!getSupabaseEnv()) {
    return [];
  }

  const supabase = await createClient();
  const [{ data: investments, error: investmentsError }, { data: places, error: placesError }] =
    await Promise.all([
      supabase
        .from("investments")
        .select("id, slug, title, point_limit, place_id")
        .eq("is_active", true),
      supabase.from("places").select("id, slug, name").eq("is_active", true),
    ]);

  if (investmentsError || placesError || !investments || !places) {
    return [];
  }

  const placesById = new Map(places.map((place) => [place.id, place]));

  return investments.flatMap((investment) => {
    const place = placesById.get(investment.place_id);
    if (!place) return [];
    return [
      {
        id: investment.id,
        placeSlug: place.slug,
        placeName: place.name,
        slug: investment.slug,
        title: investment.title,
        pointLimit: investment.point_limit,
      },
    ];
  });
}

export async function fetchPortfolioState(): Promise<PortfolioState | null> {
  if (!getSupabaseEnv()) {
    return null;
  }

  const user = await getOptionalUser();
  if (!user) {
    return null;
  }

  const supabase = await createClient();

  const [{ data: participation }, { data: portfolio }, { data: allocations }] =
    await Promise.all([
      supabase
        .from("participation_settings")
        .select("is_open")
        .eq("id", 1)
        .maybeSingle(),
      supabase
        .from("portfolios")
        .select("status")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("portfolio_investments")
        .select("investment_id, points")
        .eq("user_id", user.id),
    ]);

  const participationOpen = participation?.is_open ?? true;
  const status = portfolio?.status ?? "building";
  const rows =
    allocations?.map((row) => ({
      investmentId: row.investment_id,
      points: row.points,
    })) ?? [];

  return computePortfolioState(rows, status, participationOpen);
}

export async function setInvestmentPoints(
  investmentId: string,
  points: number,
): Promise<ActionResult> {
  if (!getSupabaseEnv()) {
    return { ok: false, error: "Participation is not configured yet." };
  }

  const user = await getOptionalUser();
  if (!user) {
    return { ok: false, error: "Sign in to allocate Civic Points." };
  }

  if (points < 0 || points > 3) {
    return { ok: false, error: "Each idea accepts 0 to 3 points." };
  }

  const supabase = await createClient();

  if (points === 0) {
    const { error } = await supabase
      .from("portfolio_investments")
      .delete()
      .eq("user_id", user.id)
      .eq("investment_id", investmentId);

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePath("/explore");
    revalidatePath("/admin");
    return { ok: true };
  }

  const { error } = await supabase.from("portfolio_investments").upsert(
    {
      user_id: user.id,
      investment_id: investmentId,
      points,
    },
    { onConflict: "user_id,investment_id" },
  );

  if (error) {
    if (error.message.includes("10 points")) {
      return {
        ok: false,
        error: `You only have ${CIVIC_POINTS_TOTAL} Civic Points to allocate.`,
      };
    }
    return { ok: false, error: error.message };
  }

  revalidatePath("/explore");
  revalidatePath("/admin");
  return { ok: true };
}

export async function savePortfolio(): Promise<ActionResult> {
  if (!getSupabaseEnv()) {
    return { ok: false, error: "Participation is not configured yet." };
  }

  const user = await getOptionalUser();
  if (!user) {
    return { ok: false, error: "Sign in to save your priorities." };
  }

  const supabase = await createClient();

  const { data: allocations, error: allocationError } = await supabase
    .from("portfolio_investments")
    .select("points")
    .eq("user_id", user.id);

  if (allocationError) {
    return { ok: false, error: allocationError.message };
  }

  if (!allocations?.length) {
    return { ok: false, error: "Allocate at least one point before saving." };
  }

  const { error } = await supabase
    .from("portfolios")
    .upsert(
      {
        user_id: user.id,
        status: "saved",
        saved_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/explore");
  revalidatePath("/admin");
  return { ok: true };
}

export async function fetchAdminInvestmentTotals(): Promise<InvestmentTotal[]> {
  if (!getSupabaseEnv()) {
    return [];
  }

  const supabase = await createServiceRoleClient();
  const { data, error } = await supabase
    .from("admin_investment_totals")
    .select("*")
    .order("total_points", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((row) => ({
    investmentId: row.investment_id,
    slug: row.slug,
    title: row.title,
    investmentTier: row.investment_tier,
    placeSlug: row.place_slug,
    placeName: row.place_name,
    totalPoints: row.total_points,
    uniqueInvestors: row.unique_investors,
  }));
}

export async function exportAdminTotalsCsv(): Promise<string> {
  const totals = await fetchAdminInvestmentTotals();
  const header = [
    "place",
    "concept_slug",
    "concept_title",
    "tier",
    "total_points",
    "unique_investors",
  ].join(",");

  const rows = totals.map((row) =>
    [
      csvEscape(row.placeName),
      csvEscape(row.slug),
      csvEscape(row.title),
      csvEscape(row.investmentTier),
      row.totalPoints,
      row.uniqueInvestors,
    ].join(","),
  );

  return [header, ...rows].join("\n");
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
