import { createBrowserClient } from "@supabase/ssr";

/** Browser талын Supabase клиент. Нэвтэрсэн admin-ы session cookie-г ашиглана (жишээ нь зураг upload). */
export function createSupabaseBrowserClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
}
