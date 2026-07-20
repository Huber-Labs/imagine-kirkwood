function trimEnv(value: string | undefined) {
  return value?.trim() || undefined;
}

function normalizeSupabaseUrl(raw: string): string | null {
  let url = raw.trim();

  // Common copy/paste typo in Vercel env vars.
  if (url.startsWith("ttps://")) {
    url = `h${url}`;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") {
      return null;
    }
    if (!parsed.hostname.endsWith(".supabase.co")) {
      return null;
    }
    return parsed.origin;
  } catch {
    return null;
  }
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
  const url = normalizeSupabaseUrl(trimEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) ?? "");
  const anonKey = trimEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!url || !anonKey) {
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
