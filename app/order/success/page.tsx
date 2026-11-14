import type { Metadata } from "next";
import { Suspense } from "react";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { OrderLayout, OrderMessage } from "../OrderMessage";

export const metadata: Metadata = {
  title: "Урьдчилсан захиалга",
  robots: { index: false },
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function OrderSuccessPage({ searchParams }: PageProps<"/order/success">) {
  return (
    <OrderLayout>
      {/* searchParams болон DB нь request үеийн өгөгдөл тул Suspense дотор уншина */}
      <Suspense fallback={<p className="text-ink-3">Ачаалж байна…</p>}>
        <OrderStatus searchParams={searchParams} />
      </Suspense>
    </OrderLayout>
  );
}

async function OrderStatus({ searchParams }: { searchParams: PageProps<"/order/success">["searchParams"] }) {
  const { order } = await searchParams;
  const orderId = typeof order === "string" && UUID_RE.test(order) ? order : null;

  const { data } = orderId
    ? await createSupabaseAdminClient()
        .from("orders")
        .select("status, product_title, first_name, amount_total")
        .eq("id", orderId)
        .maybeSingle<{ status: string; product_title: string; first_name: string | null; amount_total: number | null }>()
    : { data: null };

  if (!data) {
    return <OrderMessage title="Захиалга олдсонгүй">Холбоос буруу эсвэл хугацаа нь дууссан байна.</OrderMessage>;
  }

  // success_url руу буцах үед webhook хараахан ирээгүй байж болно
  if (data.status !== "paid") {
    return (
      <OrderMessage title="Төлбөрийг баталгаажуулж байна">
        {data.product_title}. Төлбөр баталгаажмагц таны имэйл рүү баримт очно. Хэдэн секундын дараа хуудсаа шинэчилнэ үү.
      </OrderMessage>
    );
  }

  return (
    <OrderMessage title="Урьдчилсан захиалга хүлээн авлаа">
      {data.first_name ? `${data.first_name}, баярлалаа! ` : "Баярлалаа! "}
      {data.product_title}{data.amount_total ? ` (${new Intl.NumberFormat("mn-MN").format(data.amount_total)}₮)` : ""} амжилттай төлөгдлөө. Манай ажилтан тантай удахгүй холбогдоно.
    </OrderMessage>
  );
}
