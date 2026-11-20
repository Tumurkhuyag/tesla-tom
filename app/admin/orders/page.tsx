import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { getAdminSession, getOrdersForAdmin, type AdminOrder } from "@/lib/admin";
import { cn } from "@/lib/cn";
import { formatMnt, orderNumber, TEST_DRIVE_KEY } from "@/lib/orderable";
import { AdminShell, AdminSkeleton, NoAccess } from "../AdminShell";

export const metadata: Metadata = {
  title: "Захиалгууд | Admin",
};

/* ---------- Шүүлтүүр (URL query-д хадгална → холбоосоор хуваалцаж болно) ---------- */

const KINDS = { test_drive: "Туршилтын жолоодлого", preorder: "Урьдчилсан захиалга", all: "Бүгд" } as const;
const STATUSES = { paid: "Төлсөн", pending: "Хүлээгдэж буй", expired: "Хугацаа дууссан", all: "Бүх төлөв" } as const;
const BOOKINGS = { all: "Бүгд", unbooked: "Цаг сонгоогүй", upcoming: "Ирэх туршилт", past: "Өнгөрсөн" } as const;

type Kind = keyof typeof KINDS;
type Status = keyof typeof STATUSES;
type Booking = keyof typeof BOOKINGS;
type Filters = { kind: Kind; status: Status; booking: Booking };

const pick = <T extends string>(value: unknown, options: Record<T, string>, fallback: T): T =>
  typeof value === "string" && Object.hasOwn(options, value) ? (value as T) : fallback;

/** Request үеийн цаг — getAdminSession() нь connection()-ийг дуудсан тул динамик рендерт л ажиллана */
const requestTime = () => Date.now();

const isTestDrive = (o: AdminOrder) => o.price_lookup_key === TEST_DRIVE_KEY;

function matches(o: AdminOrder, f: Filters, now: number) {
  if (f.kind === "test_drive" && !isTestDrive(o)) return false;
  if (f.kind === "preorder" && isTestDrive(o)) return false;
  if (f.status !== "all" && o.status !== f.status) return false;
  if (f.kind === "test_drive" && f.booking !== "all") {
    const at = o.booked_at ? new Date(o.booked_at).getTime() : null;
    if (f.booking === "unbooked" && (o.status !== "paid" || o.cal_booking_uid)) return false;
    if (f.booking === "upcoming" && !(o.cal_booking_uid && at != null && at >= now)) return false;
    if (f.booking === "past" && !(o.cal_booking_uid && at != null && at < now)) return false;
  }
  return true;
}

function href(f: Filters, patch: Partial<Filters>) {
  const next = { ...f, ...patch };
  const q = new URLSearchParams({ kind: next.kind, status: next.status });
  if (next.kind === "test_drive" && next.booking !== "all") q.set("booking", next.booking);
  return `/admin/orders?${q}`;
}

/* ---------- Хуудас ---------- */

export default function AdminOrdersPage({ searchParams }: PageProps<"/admin/orders">) {
  return (
    <main className="min-h-dvh bg-gray-bg">
      <Suspense fallback={<AdminSkeleton rows={8} height="h-16" />}>
        <Orders searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Orders({ searchParams }: { searchParams: PageProps<"/admin/orders">["searchParams"] }) {
  const sp = await searchParams;
  const { supabase, user, isAdmin } = await getAdminSession();
  if (!isAdmin) return <NoAccess email={user.email} />;

  const filters: Filters = {
    kind: pick(sp.kind, KINDS, "test_drive"),
    status: pick(sp.status, STATUSES, "paid"),
    booking: pick(sp.booking, BOOKINGS, "all"),
  };

  const orders = await getOrdersForAdmin(supabase);
  const now = requestTime();
  const rows = orders.filter((o) => matches(o, filters, now));

  // Ирэх туршилтуудыг ойрын цагаар нь эрэмбэлнэ — ажилтны өдөр тутмын жагсаалт
  if (filters.booking === "upcoming") {
    rows.sort((a, b) => new Date(a.booked_at!).getTime() - new Date(b.booked_at!).getTime());
  }

  const testDrives = orders.filter((o) => isTestDrive(o) && o.status === "paid");
  const stats = {
    upcoming: testDrives.filter((o) => o.cal_booking_uid && o.booked_at && new Date(o.booked_at).getTime() >= now).length,
    unbooked: testDrives.filter((o) => !o.cal_booking_uid).length,
    preorders: orders.filter((o) => !isTestDrive(o) && o.status === "paid").length,
    revenue: orders.filter((o) => o.status === "paid").reduce((sum, o) => sum + Number(o.amount_total ?? 0), 0),
  };

  return (
    <AdminShell email={user.email} title="Захиалгууд" section="orders">
      {/* Тойм */}
      <dl className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Ирэх туршилт" value={stats.upcoming} href={href(filters, { kind: "test_drive", status: "paid", booking: "upcoming" })} />
        <Stat
          label="Төлсөн, цаг сонгоогүй"
          value={stats.unbooked}
          tone={stats.unbooked > 0 ? "warn" : undefined}
          href={href(filters, { kind: "test_drive", status: "paid", booking: "unbooked" })}
        />
        <Stat label="Урьдчилсан захиалга" value={stats.preorders} href={href(filters, { kind: "preorder", status: "paid", booking: "all" })} />
        <Stat label="Нийт орлого" value={formatMnt(stats.revenue)} />
      </dl>

      {/* Шүүлтүүр */}
      <div className="mb-4 space-y-2">
        <FilterRow label="Төрөл" options={KINDS} current={filters.kind} to={(kind) => href(filters, { kind, booking: "all" })} />
        <FilterRow label="Төлөв" options={STATUSES} current={filters.status} to={(status) => href(filters, { status })} />
        {filters.kind === "test_drive" && (
          <FilterRow label="Цаг" options={BOOKINGS} current={filters.booking} to={(booking) => href(filters, { booking })} />
        )}
      </div>

      <p className="mb-3 text-sm text-ink-3">
        {rows.length} захиалга{orders.length >= 1000 && " · сүүлийн 1000 захиалгаас"}
      </p>

      {rows.length === 0 ? (
        <div className="rounded-card bg-white p-8 text-center text-sm text-ink-3">Энэ шүүлтүүрт захиалга алга.</div>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-card bg-white">
          {rows.map((o) => (
            <OrderRow key={o.id} order={o} now={now} />
          ))}
        </ul>
      )}
    </AdminShell>
  );
}

/* ---------- Хэсгүүд ---------- */

function Stat({ label, value, href, tone }: { label: string; value: number | string; href?: string; tone?: "warn" }) {
  const body = (
    <>
      <dt className="text-xs text-ink-3">{label}</dt>
      <dd className={cn("mt-1 text-xl font-medium tabular-nums", tone === "warn" ? "text-[#b25e09]" : "text-ink")}>
        {value}
      </dd>
    </>
  );
  const cls = "block rounded-card bg-white px-4 py-3";
  return href ? (
    <Link href={href} className={cn(cls, "transition-colors hover:bg-[#fafafa]")}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function FilterRow<T extends string>({
  label,
  options,
  current,
  to,
}: {
  label: string;
  options: Record<T, string>;
  current: T;
  to: (value: T) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="w-12 shrink-0 text-xs text-ink-3">{label}</span>
      {(Object.keys(options) as T[]).map((value) => (
        <Link
          key={value}
          href={to(value)}
          aria-current={value === current ? "true" : undefined}
          className={cn(
            "rounded-full px-3 py-1 text-sm transition-colors",
            value === current ? "bg-ink text-white" : "bg-white text-ink-2 hover:bg-[#e8e8e8]",
          )}
        >
          {options[value]}
        </Link>
      ))}
    </div>
  );
}

function OrderRow({ order: o, now }: { order: AdminOrder; now: number }) {
  const name = [o.last_name, o.first_name].filter(Boolean).join(" ") || "Нэргүй";
  const testDrive = isTestDrive(o);
  const bookedAt = o.booked_at ? new Date(o.booked_at).getTime() : null;

  return (
    <li>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-3 transition-colors hover:bg-[#fafafa] md:px-5 [&::-webkit-details-marker]:hidden">
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-ink">{name}</span>
              <StatusBadge order={o} now={now} />
            </span>
            <span className="mt-0.5 block truncate text-sm text-ink-2">
              {testDrive ? (o.vehicle ?? o.product_title) : o.product_title}
              {o.phone_number && <span className="text-ink-3"> · {o.phone_number}</span>}
            </span>
          </span>

          <span className="hidden shrink-0 text-right text-xs text-ink-3 sm:block">
            {testDrive && bookedAt != null ? (
              <>
                Туршилт
                <br />
                <time dateTime={o.booked_at!} className="text-sm font-medium text-ink">
                  {formatDate(o.booked_at!)}
                </time>
              </>
            ) : (
              <>
                Үүссэн
                <br />
                <time dateTime={o.created_at}>{formatDate(o.created_at)}</time>
              </>
            )}
          </span>

          <span aria-hidden="true" className="shrink-0 text-lg text-ink-3 transition-transform group-open:rotate-90">
            ›
          </span>
        </summary>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-2 border-t border-line/70 bg-[#fafafa] px-4 py-4 text-sm sm:grid-cols-2 md:px-5">
          <Detail label="Захиалгын дугаар">
            <span className="font-mono">{orderNumber(o.id)}</span>
          </Detail>
          <Detail label="Бүтээгдэхүүн">{o.product_title}</Detail>
          {o.vehicle && <Detail label="Машин">{o.vehicle}</Detail>}
          <Detail label="Захиалагч">{name}</Detail>
          <Detail label="Утас">{o.phone_number ? <a href={`tel:${o.phone_number}`} className="underline">{o.phone_number}</a> : "—"}</Detail>
          <Detail label="Имэйл">
            {o.customer_email ? <a href={`mailto:${o.customer_email}`} className="underline">{o.customer_email}</a> : "—"}
          </Detail>
          <Detail label="Дүн">{o.amount_total != null ? formatMnt(Number(o.amount_total)) : "—"}</Detail>
          <Detail label="Үүссэн">{formatDate(o.created_at)}</Detail>
          <Detail label="Төлсөн">{o.paid_at ? formatDate(o.paid_at) : "—"}</Detail>
          {testDrive && (
            <Detail label="Туршилтын цаг">
              {o.cal_booking_uid ? (
                <a
                  href={`https://app.cal.com/booking/${o.cal_booking_uid}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {o.booked_at ? formatDate(o.booked_at) : "Cal захиалга"} ↗
                </a>
              ) : (
                "Сонгоогүй"
              )}
            </Detail>
          )}
          {o.delivery_address != null && <Detail label="Хүргэлтийн хаяг">{formatAddress(o.delivery_address)}</Detail>}
          {o.byl_checkout_id != null && <Detail label="Byl checkout">#{o.byl_checkout_id}</Detail>}
        </dl>
      </details>
    </li>
  );
}

function StatusBadge({ order: o, now }: { order: AdminOrder; now: number }) {
  const [label, cls] = (() => {
    if (o.status === "pending") return ["Хүлээгдэж буй", "bg-[#eef2fd] text-blue"];
    if (o.status === "expired") return ["Хугацаа дууссан", "bg-gray-bg text-ink-3"];
    if (!isTestDrive(o)) return ["Төлсөн", "bg-[#e7f6ec] text-[#1c7c3c]"];
    if (!o.cal_booking_uid) return ["Цаг сонгоогүй", "bg-[#fdf1e3] text-[#b25e09]"];
    const past = o.booked_at != null && new Date(o.booked_at).getTime() < now;
    return past ? ["Туршилт өнгөрсөн", "bg-gray-bg text-ink-2"] : ["Цаг захиалсан", "bg-[#e7f6ec] text-[#1c7c3c]"];
  })();
  return <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs font-medium", cls)}>{label}</span>;
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 sm:block">
      <dt className="text-xs text-ink-3">{label}</dt>
      <dd className="text-right text-ink sm:text-left">{children}</dd>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("mn-MN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Ulaanbaatar",
  });
}

/** Byl-ийн хаягийн обьектыг уншигдахуйц мөр болгоно (бүтэц нь тодорхойгүй тул утгуудыг нийлүүлнэ) */
function formatAddress(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const parts = Object.values(value).filter((v) => typeof v === "string" && v.trim());
    if (parts.length) return parts.join(", ");
  }
  return "—";
}
