import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Нэвтэрсэн хэрэглэгчийн session-тэй (cookie) Supabase клиент.
 * Server Component болон Server Action дотор ашиглана. RLS нь хэрэглэгчийн эрхээр шалгагдана.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) cookieStore.set(name, value, options);
        } catch {
          // Server Component дотроос cookie бичиж болохгүй. Session-ийг proxy.ts шинэчилнэ.
        }
      },
    },
  });
}
