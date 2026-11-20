import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AlertIcon, CheckIcon } from "@/components/icons";
import { CalEmbed } from "@/components/layout/CalEmbed";
import { formatMnt, isOrderableKey, ORDERABLE, orderNumber, TEST_DRIVE_KEY } from "@/lib/orderable";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { OrderCard, OrderLayout, OrderSteps, ReceiptRow, TEST_DRIVE_STEPS } from "../OrderMessage";
import { StatusPoller } from "./StatusPoller";
import { TestDriveBooking } from "./TestDriveBooking";

export const metadata: Metadata = {
  title: "Захиалгын төлөв",
  robots: { index: false },
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type OrderRow = {
  id: string;
  status: "pending" | "paid" | "expired";
  price_lookup_key: string;
  product_title: string;
  amount_total: number | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  customer_email: string | null;
  paid_at: string | null;
  vehicle: string | null;
  cal_booking_uid: string | null;
  booked_at: string | null;
};

const linkButton =
  "inline-flex h-11 w-full items-center justify-center rounded-btn px-6 text-sm font-medium transition-colors duration-330";

export default function OrderSuccessPage({ searchParams }: PageProps<"/order/success">) {
  return (
    <OrderLayout>
      {/* searchParams болон DB нь request үеийн өгөгдөл тул Suspense дотор уншина */}
      <Suspense fallback={<OrderCard className="h-[480px] animate-pulse" />}>
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
        .select(
          "id, status, price_lookup_key, product_title, amount_total, first_name, last_name, phone_number, customer_email, paid_at, vehicle, cal_booking_uid, booked_at",
        )
        .eq("id", orderId)
        .maybeSingle<OrderRow>()
    : { data: null };

  if (!data) {
    return (
      <OrderCard className="p-6 text-center md:p-8">
        <h1 className="font-display text-2xl font-medium text-ink">Захиалга олдсонгүй</h1>
        <p className="mt-2 text-sm text-ink-3">Холбоос буруу эсвэл бүрэн хуулагдаагүй байна.</p>
        <Link href="/" className={`${linkButton} mt-6 bg-ink text-white hover:bg-ink-2`}>
          Нүүр хуудас
        </Link>
      </OrderCard>
    );
  }

  const product = isOrderableKey(data.price_lookup_key) ? ORDERABLE[data.price_lookup_key] : null;
  const isTestDrive = data.price_lookup_key === TEST_DRIVE_KEY;
  const steps = isTestDrive ? TEST_DRIVE_STEPS : undefined;
  const retryHref = isTestDrive
    ? `/test-drive${data.vehicle ? `?car=${encodeURIComponent(data.vehicle)}` : ""}`
    : `/order/${data.price_lookup_key}`;

  /* ---------- Хугацаа дууссан / амжилтгүй ---------- */
  if (data.status === "expired") {
    return (
      <>
        <OrderSteps current={2} steps={steps} />
        <OrderCard className="p-6 md:p-8">
          <StatusBadge tone="error">Төлбөр хийгдээгүй</StatusBadge>
          <h1 className="mt-3 font-display text-2xl font-medium text-ink">Энэ захиалгын хугацаа дууссан</h1>
          <p className="mt-2 text-sm/6 text-ink-3">Танаас мөнгө хасагдаагүй. Шинэ захиалга үүсгэж дахин оролдоно уу.</p>
          <Link href={retryHref} className={`${linkButton} mt-6 bg-blue text-white hover:bg-blue-hover`}>
            Дахин захиалах
          </Link>
        </OrderCard>
      </>
    );
  }

  /* ---------- Webhook хүлээж байна ---------- */
  if (data.status === "pending") {
    return (
      <>
        <OrderSteps current={isTestDrive ? 2 : 3} steps={steps} />
        <OrderCard className="p-6 md:p-8">
          <StatusBadge tone="pending">Баталгаажуулж байна</StatusBadge>
          <h1 className="mt-3 font-display text-2xl font-medium text-ink">Төлбөрийг шалгаж байна</h1>
          <p className="mt-2 text-sm/6 text-ink-3">
            {data.product_title}. Энэ хуудсыг хаалгүй түр хүлээнэ үү — баталгаажмагц автоматаар шинэчлэгдэнэ.
          </p>
          <div className="mt-5">
            <StatusPoller />
          </div>
          <p className="mt-6 border-t border-line/70 pt-4 text-xs/5 text-ink-3">
            Төлбөр хийгээгүй бол{" "}
            <Link href={retryHref} className="text-ink underline underline-offset-2">
              захиалга руу буцах
            </Link>
            .
          </p>
        </OrderCard>
      </>
    );
  }

  /* ---------- Төлөгдсөн ---------- */
  const fullName = [data.last_name, data.first_name].filter(Boolean).join(" ");
  const paidAt = data.paid_at ? formatDateTime(data.paid_at) : null;
  const booked = isTestDrive && data.cal_booking_uid != null;

  return (
    <>
      <OrderSteps current={3} complete={!isTestDrive || booked} steps={steps} />
      <OrderCard>
        <div className="flex flex-col items-center px-6 pt-8 pb-6 text-center md:px-8">
          <span className="flex size-12 items-center justify-center rounded-full bg-[#e7f6ec] text-[#1c7c3c]">
            <CheckIcon className="size-6" />
          </span>
          <h1 className="mt-4 font-display text-[26px]/8 font-medium tracking-[-.3px] text-ink">
            {isTestDrive ? (booked ? "Туршилтын цаг захиалагдлаа" : "Төлбөр баталгаажлаа") : "Урьдчилсан захиалга баталгаажлаа"}
          </h1>
          <p className="mt-2 text-sm/6 text-ink-3">
            {data.first_name ? `${data.first_name}, баярлалаа! ` : "Баярлалаа! "}
            {data.customer_email ? `Баримтыг ${data.customer_email} хаяг руу илгээлээ.` : "Таны төлбөр амжилттай орлоо."}
          </p>
        </div>

        {/* Metaphor: төлбөрийн баримт */}
        <dl className="mx-6 divide-y divide-dashed divide-line border-y border-dashed border-line md:mx-8">
          <ReceiptRow label="Захиалгын дугаар">
            <span className="font-mono tracking-wide">{orderNumber(data.id)}</span>
          </ReceiptRow>
          <ReceiptRow label="Бүтээгдэхүүн">{product?.title ?? data.product_title}</ReceiptRow>
          {data.vehicle && <ReceiptRow label="Машин">{data.vehicle}</ReceiptRow>}
          {booked && data.booked_at && (
            <ReceiptRow label="Туршилтын цаг" strong>
              {formatDateTime(data.booked_at)}
            </ReceiptRow>
          )}
          {fullName && <ReceiptRow label="Захиалагч">{fullName}</ReceiptRow>}
          {data.phone_number && <ReceiptRow label="Утас">{data.phone_number}</ReceiptRow>}
          {paidAt && <ReceiptRow label="Төлсөн огноо">{paidAt}</ReceiptRow>}
          {data.amount_total != null && (
            <ReceiptRow label="Төлсөн дүн" strong>
              {formatMnt(Number(data.amount_total))}
            </ReceiptRow>
          )}
        </dl>

        {isTestDrive ? (
          <div className="px-6 pt-5 pb-6 md:px-8 md:pb-8">
            {booked ? (
              <>
                <h2 className="text-sm font-medium text-ink">Цаашид юу болох вэ</h2>
                <ol className="mt-2 space-y-1 text-[13px]/5 text-ink-2">
                  <li>1. Цагийн баталгаажуулалт таны имэйл рүү Cal.com-оос очно.</li>
                  <li>2. Жолооны үнэмлэхээ авчирч, товлосон цагтаа ирээрэй.</li>
                  <li>3. Цаг өөрчлөх, цуцлах бол имэйл дэх холбоосыг ашиглана уу.</li>
                </ol>
                <Link href="/" className={`${linkButton} mt-6 bg-ink text-white hover:bg-ink-2`}>
                  Нүүр хуудас руу буцах
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-sm font-medium text-ink">Сүүлийн алхам: цагаа сонгоно уу</h2>
                <p className="mt-1 text-[13px]/5 text-ink-2">
                  {data.vehicle ?? "Сонгосон машин"}-ийн туршилтын жолоодлогын өдөр, цагаа календараас сонгоно уу.
                </p>
                <div className="mt-5">
                  <TestDriveBooking
                    orderId={data.id}
                    vehicle={data.vehicle ?? data.product_title}
                    name={fullName || null}
                    email={data.customer_email}
                    phone={data.phone_number}
                  />
                </div>
                <CalEmbed />
              </>
            )}
          </div>
        ) : (
          <div className="px-6 pt-5 pb-6 md:px-8 md:pb-8">
            <h2 className="text-sm font-medium text-ink">Цаашид юу болох вэ</h2>
            <ol className="mt-2 space-y-1 text-[13px]/5 text-ink-2">
              <li>1. Манай борлуулалтын ажилтан {data.phone_number ?? "тань"} руу холбогдож захиалгыг баталгаажуулна.</li>
              <li>2. Машины тохиргоо, хүргэлтийн хугацааг хамтдаа тохирно.</li>
              <li>3. Ажилтантай ярихдаа захиалгын дугаараа хэлээрэй.</li>
            </ol>
            <Link href="/" className={`${linkButton} mt-6 bg-ink text-white hover:bg-ink-2`}>
              Нүүр хуудас руу буцах
            </Link>
          </div>
        )}
      </OrderCard>
    </>
  );
}

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("mn-MN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Ulaanbaatar",
  }).format(new Date(iso));
}

function StatusBadge({ tone, children }: { tone: "pending" | "error"; children: string }) {
  return (
    <span
      className={
        tone === "error"
          ? "inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-800"
          : "inline-flex items-center gap-1.5 rounded-full bg-[#eef2fd] px-2.5 py-1 text-xs font-medium text-blue"
      }
    >
      {tone === "error" && <AlertIcon className="size-3.5" />}
      {children}
    </span>
  );
}
