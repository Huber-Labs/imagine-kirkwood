import { getSupabaseEnvDiagnostics } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

/** Public health check — reports which Supabase env vars the server sees (no secrets). */
export async function GET() {
  return Response.json(getSupabaseEnvDiagnostics());
}
