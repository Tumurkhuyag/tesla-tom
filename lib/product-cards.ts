import { cacheLife, cacheTag } from "next/cache";
import type { ButtonItem, ProductCardItem } from "@/data/types";
import { supabase } from "@/lib/supabase";

export type ProductCardCategory = "vehicle" | "energy";

/** Supabase `public.product_cards` хүснэгтийн мөр */
type ProductCardRow = {
  image: string;
  alt: string;
  eyebrow: string | null;
  title: string;
  sub_text: string | null;
  sub_href: string | null;
  sub_footnote: number | null;
  buttons: ButtonItem[];
};

function toItem(row: ProductCardRow): ProductCardItem {
  return {
    image: row.image,
    alt: row.alt,
    eyebrow: row.eyebrow ?? undefined,
    title: row.title,
    sub: row.sub_text
      ? {
          text: row.sub_text,
          href: row.sub_href ?? undefined,
          footnote: row.sub_footnote ?? undefined,
        }
      : undefined,
    buttons: row.buttons,
  };
}

/** Тухайн ангиллын нийтлэгдсэн картуудыг `position`-оор эрэмбэлж татна */
export async function getProductCards(category: ProductCardCategory): Promise<ProductCardItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("product-cards", `product-cards:${category}`);

  const { data, error } = await supabase
    .from("product_cards")
    .select("image, alt, eyebrow, title, sub_text, sub_href, sub_footnote, buttons")
    .eq("category", category)
    .eq("is_published", true)
    .order("position", { ascending: true })
    .returns<ProductCardRow[]>();

  if (error) {
    throw new Error(`product_cards (${category}) татахад алдаа гарлаа: ${error.message}`);
  }

  return data.map(toItem);
}
