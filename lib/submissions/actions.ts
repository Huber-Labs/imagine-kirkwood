"use server";

import { revalidatePath } from "next/cache";
import { getOptionalProfile } from "@/lib/auth/session";
import { notifyAdminOfSubmission } from "@/lib/submissions/email";
import {
  IDEA_DESCRIPTION_MAX_LENGTH,
  IDEA_EMAIL_MAX_LENGTH,
  IDEA_NAME_MAX_LENGTH,
  IDEA_PHOTO_ACCEPTED_TYPES,
  IDEA_PHOTO_MAX_BYTES,
  IDEA_TITLE_MAX_LENGTH,
  type AdminIdeaSubmission,
  type IdeaSubmissionStatus,
} from "@/lib/submissions/types";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

const BUCKET = "idea-submissions";

type ActionResult = { ok: true } | { ok: false; error: string };

function normalizeText(
  value: FormDataEntryValue | null,
  max: number,
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length < 1 || trimmed.length > max) return null;
  return trimmed;
}

function normalizeOptional(
  value: FormDataEntryValue | null,
  max: number,
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function safeExtension(fileName: string, contentType: string): string {
  const fromName = fileName.includes(".")
    ? fileName.split(".").pop()!.toLowerCase().replace(/[^a-z0-9]/g, "")
    : "";
  if (fromName) return fromName;
  const fromType = contentType.split("/").pop()?.toLowerCase() ?? "";
  return fromType.replace(/[^a-z0-9]/g, "") || "bin";
}

export async function submitIdea(formData: FormData): Promise<ActionResult> {
  if (!getSupabaseEnv()) {
    return { ok: false, error: "Submissions are not configured yet." };
  }

  const title = normalizeText(formData.get("title"), IDEA_TITLE_MAX_LENGTH);
  if (!title) {
    return {
      ok: false,
      error: `Add a title (1–${IDEA_TITLE_MAX_LENGTH} characters).`,
    };
  }

  const description = normalizeText(
    formData.get("description"),
    IDEA_DESCRIPTION_MAX_LENGTH,
  );
  if (!description) {
    return {
      ok: false,
      error: `Add a description (1–${IDEA_DESCRIPTION_MAX_LENGTH} characters).`,
    };
  }

  const submitterName = normalizeOptional(
    formData.get("submitterName"),
    IDEA_NAME_MAX_LENGTH,
  );
  const submitterEmail = normalizeOptional(
    formData.get("submitterEmail"),
    IDEA_EMAIL_MAX_LENGTH,
  );

  const supabase = await createServiceRoleClient();
  if (!supabase) {
    return {
      ok: false,
      error: "Submissions are temporarily unavailable. Please try again later.",
    };
  }

  let photoPath: string | null = null;
  const photo = formData.get("photo");
  if (photo instanceof File && photo.size > 0) {
    if (!IDEA_PHOTO_ACCEPTED_TYPES.includes(photo.type)) {
      return { ok: false, error: "Photo must be a JPG, PNG, WEBP, GIF, or HEIC." };
    }
    if (photo.size > IDEA_PHOTO_MAX_BYTES) {
      return { ok: false, error: "Photo must be 8 MB or smaller." };
    }

    const extension = safeExtension(photo.name, photo.type);
    const objectPath = `${crypto.randomUUID()}.${extension}`;
    const bytes = new Uint8Array(await photo.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(objectPath, bytes, {
        contentType: photo.type,
        upsert: false,
      });

    if (uploadError) {
      return {
        ok: false,
        error: "We couldn't upload that photo. Try a different image.",
      };
    }
    photoPath = objectPath;
  }

  const { error: insertError } = await supabase
    .from("idea_submissions")
    .insert({
      title,
      description,
      submitter_name: submitterName,
      submitter_email: submitterEmail,
      photo_path: photoPath,
    });

  if (insertError) {
    return { ok: false, error: "Something went wrong saving your idea." };
  }

  await notifyAdminOfSubmission({
    title,
    description,
    submitterName,
    submitterEmail,
    hasPhoto: Boolean(photoPath),
  });

  revalidatePath("/admin");
  return { ok: true };
}

export async function fetchAdminSubmissions(): Promise<AdminIdeaSubmission[]> {
  if (!getSupabaseEnv()) {
    return [];
  }

  const supabase = await createServiceRoleClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("idea_submissions")
    .select(
      "id, title, description, submitter_name, submitter_email, photo_path, status, created_at, updated_at",
    )
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  const photoPaths = data
    .map((row) => row.photo_path)
    .filter((path): path is string => Boolean(path));

  const signedUrls = new Map<string, string>();
  if (photoPaths.length > 0) {
    const { data: signed } = await supabase.storage
      .from(BUCKET)
      .createSignedUrls(photoPaths, 60 * 60);
    for (const entry of signed ?? []) {
      if (entry.path && entry.signedUrl) {
        signedUrls.set(entry.path, entry.signedUrl);
      }
    }
  }

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    submitterName: row.submitter_name,
    submitterEmail: row.submitter_email,
    photoUrl: row.photo_path ? signedUrls.get(row.photo_path) ?? null : null,
    status: row.status as IdeaSubmissionStatus,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function updateSubmissionStatus(
  id: string,
  status: IdeaSubmissionStatus,
): Promise<ActionResult> {
  if (!getSupabaseEnv()) {
    return { ok: false, error: "Submissions are not configured yet." };
  }

  const profile = await getOptionalProfile();
  if (!profile?.is_admin) {
    return { ok: false, error: "Not authorized." };
  }

  const supabase = await createServiceRoleClient();
  if (!supabase) {
    return { ok: false, error: "Service role is not configured." };
  }

  const { error } = await supabase
    .from("idea_submissions")
    .update({ status })
    .eq("id", id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin");
  return { ok: true };
}
