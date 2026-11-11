import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getAdminSession, getVehicleCardsForAdmin } from "@/lib/admin";
import { isAllowedImageUrl } from "@/lib/admin-shared";
import { AdminShell, AdminSkeleton, NoAccess } from "./AdminShell";

export const metadata: Metadata = {
  title: "Машины картууд | Admin",
};

export default function AdminPage() {
  return (
    <main className="min-h-dvh bg-gray-bg">
      <Suspense fallback={<AdminSkeleton />}>
        <CardList />
      </Suspense>
    </main>
  );
}

/** Session уншдаг тул request бүрт рендерлэгдэнэ (Suspense дотор) */
async function CardList() {
  const { supabase, user, isAdmin } = await getAdminSession();
  if (!isAdmin) return <NoAccess email={user.email} />;

  const cards = await getVehicleCardsForAdmin(supabase);

  return (
    <AdminShell email={user.email} title="Машины картууд">
      <p className="mb-4 text-sm text-ink-3">
        {cards.length} карт · нүүр хуудсанд харагдах дарааллаар. Засах картаа сонгоно уу.
      </p>

      <ul className="divide-y divide-line overflow-hidden rounded-card bg-white">
        {cards.map((card) => (
          <li key={card.id}>
            <Link
              href={`/admin/cards/${card.id}`}
              className="group flex items-center gap-4 px-4 py-3 transition-colors hover:bg-[#fafafa] focus-visible:bg-[#fafafa] md:px-5"
            >
              <span className="w-6 shrink-0 text-center text-sm text-ink-3 tabular-nums">{card.position}</span>

              <span className="h-16 w-13 shrink-0 overflow-hidden rounded-md bg-gray-bg">
                {isAllowedImageUrl(card.image) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={card.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate font-medium text-ink">{card.title}</span>
                  {!card.is_published && (
                    <span className="shrink-0 rounded-full bg-gray-bg px-2 py-0.5 text-xs text-ink-3">Нуусан</span>
                  )}
                </span>
                {card.eyebrow?.trim() && <span className="block truncate text-xs text-ink-3">{card.eyebrow}</span>}
                {card.sub_text && <span className="mt-0.5 block truncate text-sm text-ink-2">{card.sub_text}</span>}
              </span>

              <span className="hidden shrink-0 text-right text-xs text-ink-3 sm:block">
                Засварласан
                <br />
                <time dateTime={card.updated_at}>{formatDate(card.updated_at)}</time>
              </span>

              <span aria-hidden="true" className="shrink-0 text-lg text-ink-3 transition-transform group-hover:translate-x-0.5">
                ›
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </AdminShell>
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
