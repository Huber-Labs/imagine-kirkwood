"use server";

import { revalidatePath } from "next/cache";
import { getOptionalProfile, getOptionalUser } from "@/lib/auth/session";
import {
  CONCEPT_COMMENT_MAX_LENGTH,
  type AdminConceptComment,
  type ConceptComment,
} from "@/lib/comments/types";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

type ActionResult = { ok: true } | { ok: false; error: string };

function normalizeCommentBody(body: string): string | null {
  const trimmed = body.trim();
  if (trimmed.length < 1 || trimmed.length > CONCEPT_COMMENT_MAX_LENGTH) {
    return null;
  }
  return trimmed;
}

function resolveAuthorDisplayName(
  profile: { display_name: string | null; email: string | null } | null,
  userEmail: string | undefined,
): string {
  if (profile?.display_name?.trim()) {
    return profile.display_name.trim();
  }
  if (profile?.email) {
    return profile.email.split("@")[0] ?? "Neighbor";
  }
  if (userEmail) {
    return userEmail.split("@")[0] ?? "Neighbor";
  }
  return "Neighbor";
}

export async function fetchConceptComments(
  investmentId: string,
): Promise<ConceptComment[]> {
  if (!getSupabaseEnv() || !investmentId) {
    return [];
  }

  const user = await getOptionalUser();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("concept_comments")
    .select("id, user_id, author_display_name, body, created_at, updated_at")
    .eq("investment_id", investmentId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    authorDisplayName: row.author_display_name,
    body: row.body,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    isOwn: user?.id === row.user_id,
  }));
}

export async function upsertConceptComment(
  investmentId: string,
  body: string,
): Promise<ActionResult> {
  if (!getSupabaseEnv()) {
    return { ok: false, error: "Participation is not configured yet." };
  }

  const user = await getOptionalUser();
  if (!user) {
    return { ok: false, error: "Sign in to leave a note." };
  }

  const normalizedBody = normalizeCommentBody(body);
  if (!normalizedBody) {
    return {
      ok: false,
      error: `Notes must be 1–${CONCEPT_COMMENT_MAX_LENGTH} characters.`,
    };
  }

  const profile = await getOptionalProfile();
  const authorDisplayName = resolveAuthorDisplayName(profile, user.email);

  const supabase = await createClient();
  const { error } = await supabase.from("concept_comments").upsert(
    {
      user_id: user.id,
      investment_id: investmentId,
      author_display_name: authorDisplayName,
      body: normalizedBody,
    },
    { onConflict: "user_id,investment_id" },
  );

  if (error) {
    if (error.message.includes("Participation is currently closed")) {
      return { ok: false, error: "Participation is currently closed." };
    }
    return { ok: false, error: error.message };
  }

  revalidatePath("/explore");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteConceptComment(
  investmentId: string,
): Promise<ActionResult> {
  if (!getSupabaseEnv()) {
    return { ok: false, error: "Participation is not configured yet." };
  }

  const user = await getOptionalUser();
  if (!user) {
    return { ok: false, error: "Sign in to remove your note." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("concept_comments")
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

export async function fetchAdminConceptComments(): Promise<AdminConceptComment[]> {
  if (!getSupabaseEnv()) {
    return [];
  }

  const supabase = await createServiceRoleClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("concept_comments")
    .select(
      `
      id,
      author_display_name,
      body,
      created_at,
      updated_at,
      investments (
        slug,
        title,
        places (
          name
        )
      )
    `,
    )
    .order("updated_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.flatMap((row) => {
    const investmentRaw = row.investments;
    const investment = Array.isArray(investmentRaw)
      ? investmentRaw[0]
      : investmentRaw;

    if (!investment) return [];

    const placeRaw = investment.places;
    const place = Array.isArray(placeRaw) ? placeRaw[0] : placeRaw;

    return [
      {
        id: row.id,
        placeName: place?.name ?? "Unknown place",
        conceptSlug: investment.slug,
        conceptTitle: investment.title,
        authorDisplayName: row.author_display_name,
        body: row.body,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      },
    ];
  });
}

export async function exportAdminCommentsCsv(): Promise<string> {
  const comments = await fetchAdminConceptComments();
  const header = [
    "place",
    "concept_slug",
    "concept_title",
    "author",
    "body",
    "created_at",
    "updated_at",
  ].join(",");

  const rows = comments.map((row) =>
    [
      csvEscape(row.placeName),
      csvEscape(row.conceptSlug),
      csvEscape(row.conceptTitle),
      csvEscape(row.authorDisplayName),
      csvEscape(row.body),
      csvEscape(row.createdAt),
      csvEscape(row.updatedAt),
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
