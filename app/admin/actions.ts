"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { ButtonItem, ButtonVariant } from "@/data/types";
import { getAdminSession } from "@/lib/admin";
import { BUTTON_VARIANTS, isAllowedImageUrl, MAX_BUTTONS, type FormState } from "@/lib/admin-shared";
import { createSupabaseServerClient } from "@/lib/supabase-server";

/* ---------- Нэвтрэх / гарах ---------- */

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { status: "error", message: "Имэйл болон нууц үгээ оруулна уу." };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { status: "error", message: "Имэйл эсвэл нууц үг буруу байна." };

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ---------- Карт хадгалах ---------- */

class ValidationError extends Error {}

function text(formData: FormData, name: string, { required = false, max = 300, label = name } = {}) {
  const value = String(formData.get(name) ?? "").trim();
  if (required && !value) throw new ValidationError(`"${label}" талбарыг бөглөнө үү.`);
  if (value.length > max) throw new ValidationError(`"${label}" ${max} тэмдэгтээс урт байна.`);
  return value;
}

function link(value: string, label: string) {
  if (!value) return value;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") return value;
  } catch {}
  throw new ValidationError(`"${label}" нь https://… эсвэл /… хэлбэрийн холбоос байх ёстой.`);
}

function parseCard(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id <= 0) throw new ValidationError("Картын ID буруу байна.");

  const image = text(formData, "image", { required: true, max: 500, label: "Зургийн URL" });
  if (!isAllowedImageUrl(image)) {
    throw new ValidationError("Зургийг upload хийнэ үү, эсвэл Tesla CDN (digitalassets.tesla.com)-ийн URL оруулна уу.");
  }

  const positionRaw = text(formData, "position", { required: true, label: "Дараалал" });
  const position = Number(positionRaw);
  if (!Number.isInteger(position) || position < 0 || position > 999) {
    throw new ValidationError("Дараалал 0–999 хооронд бүхэл тоо байх ёстой.");
  }

  const footnoteRaw = text(formData, "sub_footnote", { label: "Зүүлтийн дугаар" });
  const footnote = footnoteRaw ? Number(footnoteRaw) : null;
  if (footnote !== null && (!Number.isInteger(footnote) || footnote < 1 || footnote > 99)) {
    throw new ValidationError("Зүүлтийн дугаар 1–99 хооронд бүхэл тоо байх ёстой.");
  }

  // Eyebrow-г trim хийхгүй: " " (зай) нь картын байрлалыг зохицуулахад ашиглагддаг
  const eyebrowRaw = String(formData.get("eyebrow") ?? "");
  if (eyebrowRaw.length > 120) throw new ValidationError(`"Eyebrow" 120 тэмдэгтээс урт байна.`);

  const subText = text(formData, "sub_text", { max: 200, label: "Доод мөр" });
  const subHref = link(text(formData, "sub_href", { max: 1000, label: "Доод мөрийн холбоос" }), "Доод мөрийн холбоос");

  const buttons: ButtonItem[] = [];
  for (let i = 0; i < MAX_BUTTONS; i++) {
    const n = i + 1;
    const label = text(formData, `button_${i}_label`, { max: 40, label: `Товч ${n}-ийн текст` });
    const href = text(formData, `button_${i}_href`, { max: 1000, label: `Товч ${n}-ийн холбоос` });
    const variant = String(formData.get(`button_${i}_variant`) ?? "") as ButtonVariant;
    if (!label && !href) continue;
    if (!label || !href) throw new ValidationError(`Товч ${n}: текст болон холбоос хоёуланг нь бөглөнө үү.`);
    if (!BUTTON_VARIANTS.includes(variant)) throw new ValidationError(`Товч ${n}: загвар буруу байна.`);
    buttons.push({ label, href: link(href, `Товч ${n}-ийн холбоос`), variant });
  }

  return {
    id,
    values: {
      position,
      image,
      alt: text(formData, "alt", { required: true, max: 200, label: "Зургийн тайлбар (alt)" }),
      eyebrow: eyebrowRaw === "" ? null : eyebrowRaw,
      title: text(formData, "title", { required: true, max: 120, label: "Гарчиг" }),
      sub_text: subText || null,
      sub_href: subText && subHref ? subHref : null,
      sub_footnote: subText ? footnote : null,
      buttons,
      is_published: formData.get("is_published") === "on",
    },
  };
}

export async function saveVehicleCard(_prev: FormState, formData: FormData): Promise<FormState> {
  // Action бүрийг тусад нь шалгана: хуудсанд нэвтэрсэн гэдэг нь action-д эрхтэй гэсэн үг биш
  const { supabase, isAdmin } = await getAdminSession();
  if (!isAdmin) return { status: "error", message: "Танд засах эрх алга." };

  let parsed: ReturnType<typeof parseCard>;
  try {
    parsed = parseCard(formData);
  } catch (e) {
    if (e instanceof ValidationError) return { status: "error", message: e.message };
    throw e;
  }

  const { data, error } = await supabase
    .from("product_cards")
    .update(parsed.values)
    .eq("id", parsed.id)
    .eq("category", "vehicle")
    .select("id");

  if (error) return { status: "error", message: `Хадгалахад алдаа гарлаа: ${error.message}` };
  // RLS эрх хүрэхгүй бол алдаагүйгээр 0 мөр шинэчлэгддэг
  if (!data?.length) return { status: "error", message: "Карт олдсонгүй эсвэл засах эрх алга." };

  // Нүүр хуудасны cache-ийг шууд шинэчилнэ
  updateTag("product-cards");

  return { status: "saved", at: new Date().toISOString() };
}
