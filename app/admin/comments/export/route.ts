import { getOptionalProfile } from "@/lib/auth/session";
import { exportAdminCommentsCsv } from "@/lib/comments/actions";
import { getSupabaseEnv } from "@/lib/supabase/env";

export async function GET() {
  if (!getSupabaseEnv()) {
    return new Response("Supabase is not configured.", { status: 503 });
  }

  const profile = await getOptionalProfile();
  if (!profile?.is_admin) {
    return new Response("Unauthorized", { status: 401 });
  }

  const csv = await exportAdminCommentsCsv();

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="imagine-kirkwood-concept-comments.csv"',
    },
  });
}
