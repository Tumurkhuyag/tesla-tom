import { createClient } from "@supabase/supabase-js";

/**
 * Secret (service role) түлхүүртэй Supabase клиент — RLS-ийг алгасна.
 * Зөвхөн server талын route handler-т (захиалга бичих, webhook) ашиглана. Client component-оос хэзээ ч import хийхгүй.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL болон SUPABASE_SECRET_KEY орчны хувьсагч тохируулагдаагүй байна (.env.local).");
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
