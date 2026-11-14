"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createCheckout } from "@/lib/byl";
import { isOrderableKey, ORDERABLE } from "@/lib/orderable";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export type CheckoutState = { status: "idle" } | { status: "error"; message: string };

const GENERIC_ERROR = "Төлбөрийн хуудсыг нээж чадсангүй. Түр хүлээгээд дахин оролдоно уу.";

async function siteOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const h = await headers();
  return `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
}

/**
 * «Byl-ээр төлөх» товч → захиалгын мөр үүсгэж, Byl checkout үүсгээд тийш шилжүүлнэ.
 * Алдаа гарвал хуудсаа орхилгүй тэр дор нь мессеж харуулна.
 */
export async function startCheckout(key: string): Promise<CheckoutState> {
  if (!isOrderableKey(key)) return { status: "error", message: "Ийм бүтээгдэхүүн олдсонгүй." };

  let checkoutUrl: string;
  try {
    const origin = await siteOrigin();
    const supabase = createSupabaseAdminClient();

    const { data: order, error } = await supabase
      .from("orders")
      .insert({ price_lookup_key: key, product_title: `${ORDERABLE[key].title} — ${ORDERABLE[key].kind}` })
      .select("id")
      .single<{ id: string }>();
    if (error) throw new Error(`orders insert: ${error.message}`);

    try {
      const checkout = await createCheckout({
        items: [{ price: key, quantity: 1 }],
        client_reference_id: order.id,
        success_url: `${origin}/order/success?order=${order.id}`,
        // Цуцалбал захиалга шалгах хуудас руу буцаж, юу болсныг харуулна
        cancel_url: `${origin}/order/${key}?canceled=1`,
        email_collection: true,
        phone_number_collection: true,
        delivery_address_collection: true,
        custom_fields: [
          { key: "last_name", label: "Овог", type: "text" },
          { key: "first_name", label: "Нэр", type: "text" },
        ],
      });
      await supabase.from("orders").update({ byl_checkout_id: checkout.id }).eq("id", order.id);
      checkoutUrl = checkout.url;
    } catch (err) {
      await supabase.from("orders").update({ status: "expired" }).eq("id", order.id);
      throw err;
    }
  } catch (err) {
    console.error("Checkout эхлүүлэхэд алдаа:", err);
    return { status: "error", message: GENERIC_ERROR };
  }

  // redirect() нь try дотор байвал барьж авагдана — тиймээс гадна нь
  redirect(checkoutUrl);
}
