"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createCheckout } from "@/lib/byl";
import { isOrderableKey, ORDERABLE, TEST_DRIVE_KEY, type OrderableKey } from "@/lib/orderable";
import { getTestDriveVehicles } from "@/lib/product-cards";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export type CheckoutState = { status: "idle" } | { status: "error"; message: string };

const GENERIC_ERROR = "Төлбөрийн хуудсыг нээж чадсангүй. Түр хүлээгээд дахин оролдоно уу.";

async function siteOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const h = await headers();
  return `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
}

/**
 * Захиалгын мөр үүсгэж, Byl checkout үүсгээд тийш шилжүүлнэ.
 * Алдаа гарвал хуудсаа орхилгүй тэр дор нь мессеж харуулна.
 */
async function createOrderCheckout({
  key,
  productTitle,
  vehicle = null,
  cancelPath,
}: {
  key: OrderableKey;
  productTitle: string;
  vehicle?: string | null;
  cancelPath: string;
}): Promise<CheckoutState> {
  const product = ORDERABLE[key];

  let checkoutUrl: string;
  try {
    const origin = await siteOrigin();
    const supabase = createSupabaseAdminClient();

    const { data: order, error } = await supabase
      .from("orders")
      .insert({ price_lookup_key: key, product_title: productTitle, vehicle })
      .select("id")
      .single<{ id: string }>();
    if (error) throw new Error(`orders insert: ${error.message}`);

    try {
      const checkout = await createCheckout({
        items: [
          product.inlinePrice
            ? { price_data: { unit_amount: product.amount, product_data: { name: productTitle } }, quantity: 1 }
            : { price: key, quantity: 1 },
        ],
        client_reference_id: order.id,
        success_url: `${origin}/order/success?order=${order.id}`,
        // Цуцалбал өмнөх хуудас руу буцаж, юу болсныг харуулна
        cancel_url: `${origin}${cancelPath}`,
        email_collection: true,
        phone_number_collection: true,
        delivery_address_collection: product.collectDelivery,
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

/** «Byl-ээр төлөх» товч (/order/[key]) */
export async function startCheckout(key: string): Promise<CheckoutState> {
  if (!isOrderableKey(key) || key === TEST_DRIVE_KEY) {
    return { status: "error", message: "Ийм бүтээгдэхүүн олдсонгүй." };
  }
  return createOrderCheckout({
    key,
    productTitle: `${ORDERABLE[key].title} — ${ORDERABLE[key].kind}`,
    cancelPath: `/order/${key}?canceled=1`,
  });
}

/** Туршилтын жолоодлого: сонгосон машинаар 20,000₮-ийн checkout (/test-drive) */
export async function startTestDriveCheckout(_prev: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const vehicle = String(formData.get("vehicle") ?? "");
  // Client-ээс ирсэн утгад итгэхгүй — санал болгож буй машинуудтай тулгана
  const vehicles = await getTestDriveVehicles();
  if (!vehicles.some((v) => v.title === vehicle)) {
    return { status: "error", message: "Туршиж үзэх машинаа сонгоно уу." };
  }
  return createOrderCheckout({
    key: TEST_DRIVE_KEY,
    productTitle: `${ORDERABLE[TEST_DRIVE_KEY].title} — ${vehicle}`,
    vehicle,
    cancelPath: `/test-drive?car=${encodeURIComponent(vehicle)}&canceled=1`,
  });
}
