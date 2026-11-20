import { NextResponse } from "next/server";
import { calField, verifyCalSignature, type CalWebhookEvent } from "@/lib/cal";
import { TEST_DRIVE_KEY } from "@/lib/orderable";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Cal.com webhook: туршилтын жолоодлогын цаг захиалгыг төлбөртэй захиалгатай (orders) холбоно.
 * - BOOKING_CREATED / BOOKING_RESCHEDULED → `cal_booking_uid`, `booked_at` (туршилтын цаг)
 * - BOOKING_CANCELLED → цэвэрлэж, дахин цаг сонгох боломж олгоно
 * Дахин илгээлтэд idempotent.
 */
export async function POST(request: Request) {
  // Гарын үсгийг түүхий body дээр шалгана
  const rawBody = await request.text();
  if (!verifyCalSignature(rawBody, request.headers.get("x-cal-signature-256"))) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  let event: CalWebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  // Cal.com webhook тохируулахад илгээдэг ping
  if (!event.payload) return NextResponse.json({ received: true });

  const { uid, startTime } = event.payload;
  const orderId = calField(event.payload, "order");
  const supabase = createSupabaseAdminClient();

  if (event.triggerEvent === "BOOKING_CREATED" || event.triggerEvent === "BOOKING_RESCHEDULED") {
    // uid нь PostgREST `.or()` шүүлтүүрт орох тул зөвхөн аюулгүй тэмдэгт зөвшөөрнө
    if (!uid || !/^[\w-]+$/.test(uid) || !orderId || !UUID_RE.test(orderId)) {
      console.warn(`Cal webhook: захиалгын дугааргүй booking (${uid ?? "uid байхгүй"}) — алгаслаа`);
      return NextResponse.json({ received: true });
    }

    // Зөвхөн төлөгдсөн, өөр booking-д ашиглагдаагүй (эсвэл яг энэ booking-ийн хуучин uid-тэй) захиалга
    const { data, error } = await supabase
      .from("orders")
      .update({ cal_booking_uid: uid, booked_at: startTime ?? new Date().toISOString() })
      .eq("id", orderId)
      .eq("price_lookup_key", TEST_DRIVE_KEY)
      .eq("status", "paid")
      .or(`cal_booking_uid.is.null,cal_booking_uid.eq.${uid}${rescheduleUidFilter(event)}`)
      .select("id");

    if (error) {
      console.error("Cal webhook: orders update алдаа:", error.message);
      return NextResponse.json({ message: "DB error" }, { status: 500 });
    }
    if (!data.length) {
      // Төлөөгүй эсвэл аль хэдийн ашигласан төлбөрөөр захиалсан — ажилтан Cal дээрээс шалгана
      console.warn(`Cal webhook: booking ${uid} — order ${orderId} төлөгдөөгүй эсвэл өөр booking-д ашиглагдсан`);
    }
    return NextResponse.json({ received: true });
  }

  if (event.triggerEvent === "BOOKING_CANCELLED" && uid) {
    const { error } = await supabase
      .from("orders")
      .update({ cal_booking_uid: null, booked_at: null })
      .eq("cal_booking_uid", uid);
    if (error) {
      console.error("Cal webhook: orders cancel алдаа:", error.message);
      return NextResponse.json({ message: "DB error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

/** Цаг өөрчлөхөд Cal шинэ uid үүсгэдэг тул хуучин uid-тэй мөрийг мөн зөвшөөрнө */
function rescheduleUidFilter(event: CalWebhookEvent) {
  const fromUid = (event.payload as { rescheduleUid?: unknown }).rescheduleUid;
  return typeof fromUid === "string" && /^[\w-]+$/.test(fromUid) ? `,cal_booking_uid.eq.${fromUid}` : "";
}
