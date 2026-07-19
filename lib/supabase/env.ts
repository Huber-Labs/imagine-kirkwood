function trimEnv(value: string | undefined) {
  return value?.trim() || undefined;
}

export type SupabasePublicConfig = {
  url: string;
  anonKey: string;
};

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const env = getSupabaseEnv();
  if (!env) {
    return null;
  }

  return { url: env.url, anonKey: env.anonKey };
}

export function getSupabaseEnv():
  | { url: string; anonKey: string; serviceRoleKey: string | undefined }
  | null {
  const url = trimEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anonKey = trimEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!url || !anonKey) {
    return null;
  }

  try {
    new URL(url);
  } catch {
    return null;
  }

  return {
    url,
    anonKey,
    serviceRoleKey: trimEnv(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };
}

export function requireSupabaseEnv() {
  const env = getSupabaseEnv();
  if (!env) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  return env;
}
