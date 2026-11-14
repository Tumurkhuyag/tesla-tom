import { NextResponse } from "next/server";
import { verifyBylSignature, type BylCompletedCheckout, type BylWebhookEvent } from "@/lib/byl";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Byl webhook (https://byl.mn/docs/webhook).
 * 5 секундэд 2xx буцаахгүй бол Byl дахин илгээдэг тул боловсруулалт нь idempotent.
 */
export async function POST(request: Request) {
  // Гарын үсгийг түүхий body дээр шалгана — JSON.parse → stringify хийвэл таарахгүй
  const rawBody = await request.text();
  if (!verifyBylSignature(rawBody, request.headers.get("byl-signature"))) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  let event: BylWebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (event.type !== "checkout.completed") {
    return NextResponse.json({ received: true });
  }

  const checkout = event.data.object as unknown as BylCompletedCheckout;
  const orderId = checkout.client_reference_id;
  if (!orderId || !UUID_RE.test(orderId)) {
    // Манай сайтаас үүсээгүй checkout (жш: Byl-ийн төлбөрийн линк) — алгасна
    return NextResponse.json({ received: true });
  }

  const field = (k: string) => checkout.custom_fields?.find((f) => f.key === k)?.value ?? null;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("orders")
    .update({
      status: "paid",
      byl_checkout_id: checkout.id,
      byl_event_id: event.id,
      amount_total: Number(checkout.amount_total),
      customer_email: checkout.customer_email,
      phone_number: checkout.phone_number,
      delivery_address: checkout.delivery_address ?? null,
      last_name: field("last_name"),
      first_name: field("first_name"),
      raw: event,
      paid_at: event.created_at,
    })
    .eq("id", orderId)
    .neq("status", "paid"); // дахин илгээлт ирвэл өөрчлөхгүй

  if (error) {
    console.error("Byl webhook: orders update алдаа:", error.message);
    // 5xx буцаавал Byl дахин оролдоно
    return NextResponse.json({ message: "DB error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
