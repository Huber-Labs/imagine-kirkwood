import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

export async function GET(request: NextRequest) {
  const env = getSupabaseEnv();
  const { searchParams, origin } = new URL(request.url);
  const next = sanitizeNextPath(searchParams.get("next"));
  const redirectTo = `${origin}${next}`;

  if (!env) {
    return NextResponse.redirect(`${origin}/explore?auth=error`);
  }

  const authError =
    searchParams.get("error_description") ?? searchParams.get("error");
  if (authError) {
    return NextResponse.redirect(
      `${origin}/explore?auth=error&reason=${encodeURIComponent(authError)}`,
    );
  }

  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const otpType = searchParams.get("type");

  if (!code && !(tokenHash && otpType)) {
    return NextResponse.redirect(`${origin}/explore?auth=error`);
  }

  const response = NextResponse.redirect(redirectTo);

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return response;
    }
    return NextResponse.redirect(
      `${origin}/explore?auth=error&reason=${encodeURIComponent(error.message)}`,
    );
  }

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash!,
    type: otpType as
      | "email"
      | "magiclink"
      | "signup"
      | "recovery"
      | "invite"
      | "email_change",
  });

  if (!error) {
    return response;
  }

  return NextResponse.redirect(
    `${origin}/explore?auth=error&reason=${encodeURIComponent(error.message)}`,
  );
}

function sanitizeNextPath(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/explore";
  }
  return next;
}
