import { createBrowserClient } from "@supabase/ssr";
import {
  getSupabaseEnv,
  type SupabasePublicConfig,
} from "@/lib/supabase/env";

export function createBrowserSupabaseClient(config: SupabasePublicConfig) {
  return createBrowserClient(config.url, config.anonKey);
}

/** Prefer server-passed config in client components. */
export function createClient(config?: SupabasePublicConfig | null) {
  const resolved = config ?? getSupabaseEnv();
  if (!resolved) {
    throw new Error("Supabase is not configured.");
  }

  return createBrowserSupabaseClient(resolved);
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseEnv() !== null;
}
