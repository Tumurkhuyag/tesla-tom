import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL болон NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY орчны хувьсагч тохируулагдаагүй байна (.env.local).",
  );
}

/**
 * Нийтийн (publishable) түлхүүртэй Supabase клиент.
 * Нэвтрэлт шаардахгүй, RLS-ээр нээлттэй өгөгдлийг уншихад зориулсан.
 */
export const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});
