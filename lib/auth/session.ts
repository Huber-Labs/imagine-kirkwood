import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

export async function getOptionalUser() {
  if (!getSupabaseEnv()) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getOptionalProfile() {
  const user = await getOptionalUser();
  if (!user) {
    return null;
  }

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, display_name, is_admin")
    .eq("id", user.id)
    .maybeSingle();

  return profile;
}
