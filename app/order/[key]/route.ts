import { NextResponse, type NextRequest } from "next/server";
import { createCheckout } from "@/lib/byl";
import { isOrderableKey, ORDERABLE } from "@/lib/orderable";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

/**
 * «Захиалах» товч (POST form) → захиалгын мөр үүсгээд Byl checkout руу 303 redirect.
 * GET-ээр checkout үүсгэхгүй (bot, prefetch, шинэ таб) — нүүр хуудас руу буцаана.
 */
export async function POST(request: NextRequest, ctx: RouteContext<"/order/[key]">) {
  const { key } = await ctx.params;
  if (!isOrderableKey(key)) return new NextResponse("Not found", { status: 404 });

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;
  const supabase = createSupabaseAdminClient();

  const { data: order, error } = await supabase
    .from("orders")
    .insert({ price_lookup_key: key, product_title: ORDERABLE[key].title })
    .select("id")
    .single<{ id: string }>();

  if (error) {
    console.error("orders insert алдаа:", error.message);
    return NextResponse.redirect(new URL("/order/error", origin), 303);
  }

  try {
    const checkout = await createCheckout({
      items: [{ price: key, quantity: 1 }],
      client_reference_id: order.id,
      success_url: `${origin}/order/success?order=${order.id}`,
      cancel_url: `${origin}/`,
      email_collection: true,
      phone_number_collection: true,
      delivery_address_collection: true,
      custom_fields: [
        { key: "last_name", label: "Овог", type: "text" },
        { key: "first_name", label: "Нэр", type: "text" },
      ],
    });

    await supabase.from("orders").update({ byl_checkout_id: checkout.id }).eq("id", order.id);

    return NextResponse.redirect(checkout.url, 303);
  } catch (err) {
    console.error("Byl checkout үүсгэхэд алдаа:", err);
    await supabase.from("orders").update({ status: "expired" }).eq("id", order.id);
    return NextResponse.redirect(new URL("/order/error", origin), 303);
  }
}

export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url), 303);
}
