import { redirect } from "next/navigation";
import { connection } from "next/server";
import type { ButtonItem } from "@/data/types";
import { createSupabaseServerClient } from "@/lib/supabase-server";

/** Admin хуудсанд засах машины карт (product_cards мөр) */
export type AdminCard = {
  id: number;
  position: number;
  image: string;
  alt: string;
  eyebrow: string | null;
  title: string;
  sub_text: string | null;
  sub_href: string | null;
  sub_footnote: number | null;
  buttons: ButtonItem[];
  is_published: boolean;
  updated_at: string;
};

/**
 * Нэвтэрсэн хэрэглэгчийг шалгана. Нэвтрээгүй бол /admin/login руу илгээнэ.
 * `isAdmin` нь `admin_users` хүснэгтэд бүртгэлтэй эсэхийг заана.
 */
export async function getAdminSession() {
  // Session шалгалт токены хугацааг одоогийн цагтай (Date.now) харьцуулдаг тул зөвхөн request үед ажиллана.
  // Үүнгүй бол cookie-той prefetch/prerender шалгалт "unstable Date.now()" алдаа өгнө.
  await connection();
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: adminRow } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();

  return { supabase, user: { id: user.id, email: user.email ?? "" }, isAdmin: Boolean(adminRow) };
}

/** Нэг машины картыг ID-аар татна. Олдохгүй бол null. */
export async function getVehicleCardForAdmin(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  id: number,
): Promise<AdminCard | null> {
  const { data, error } = await supabase
    .from("product_cards")
    .select("id, position, image, alt, eyebrow, title, sub_text, sub_href, sub_footnote, buttons, is_published, updated_at")
    .eq("category", "vehicle")
    .eq("id", id)
    .returns<AdminCard[]>()
    .maybeSingle();

  if (error) throw new Error(`Картыг татахад алдаа гарлаа: ${error.message}`);
  return data;
}

/** Бүх машины картыг (нийтлэгдээгүйг ч) татна. Admin-ы session-тэй клиент шаардана. */
export async function getVehicleCardsForAdmin(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
): Promise<AdminCard[]> {
  const { data, error } = await supabase
    .from("product_cards")
    .select("id, position, image, alt, eyebrow, title, sub_text, sub_href, sub_footnote, buttons, is_published, updated_at")
    .eq("category", "vehicle")
    .order("position", { ascending: true })
    .returns<AdminCard[]>();

  if (error) throw new Error(`Машины картуудыг татахад алдаа гарлаа: ${error.message}`);
  return data;
}
