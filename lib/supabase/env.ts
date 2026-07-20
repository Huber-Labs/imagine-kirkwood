function trimEnv(value: string | undefined) {
  let trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    trimmed = trimmed.slice(1, -1).trim();
  }

  return trimmed || undefined;
}

function normalizeSupabaseUrl(raw: string): string | null {
  let url = raw.trim();

  // Common copy/paste typo in Vercel env vars.
  if (url.startsWith("ttps://")) {
    url = `h${url}`;
  }

  if (!/^[a-z][a-z0-9+.-]*:/i.test(url)) {
    url = `https://${url}`;
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

function readAnonKey() {
  return (
    trimEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ??
    trimEnv(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  );
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
  const anonKey = readAnonKey();

  if (!url || !anonKey) {
    return null;
  }

  return {
    url,
    anonKey,
    serviceRoleKey: trimEnv(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };
}

export function getSupabaseEnvDiagnostics() {
  const rawUrl = trimEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const rawAnon =
    trimEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ??
    trimEnv(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const url = normalizeSupabaseUrl(rawUrl ?? "");

  return {
    configured: getSupabaseEnv() !== null,
    hasUrl: Boolean(rawUrl),
    hasAnonKey: Boolean(rawAnon),
    urlValid: Boolean(url),
    hasServiceRoleKey: Boolean(trimEnv(process.env.SUPABASE_SERVICE_ROLE_KEY)),
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
