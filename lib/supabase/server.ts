import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { requireSupabaseEnv } from "@/lib/supabase/env";

export async function createClient() {
  const env = requireSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll can fail in Server Components — safe to ignore when read-only.
        }
      },
    },
  });
}

export async function createServiceRoleClient() {
  const env = requireSupabaseEnv();
  if (!env.serviceRoleKey) {
    return null;
  }

  const { createClient: createSupabaseClient } = await import(
    "@supabase/supabase-js"
  );

  return createSupabaseClient(env.url, env.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
