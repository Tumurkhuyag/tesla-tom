import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAdminSession, getVehicleCardForAdmin } from "@/lib/admin";
import { AdminShell, AdminSkeleton, NoAccess } from "../../AdminShell";
import { CardForm } from "../../CardForm";

export const metadata: Metadata = {
  title: "Карт засах | Admin",
};

export default function EditCardPage({ params }: PageProps<"/admin/cards/[id]">) {
  return (
    <main className="min-h-dvh bg-gray-bg">
      {/* params болон session нь request үеийн өгөгдөл тул Suspense дотор уншина */}
      <Suspense fallback={<AdminSkeleton rows={1} height="h-[640px]" />}>
        <EditCard params={params} />
      </Suspense>
    </main>
  );
}

async function EditCard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cardId = Number(id);
  if (!Number.isInteger(cardId) || cardId <= 0) notFound();

  const { supabase, user, isAdmin } = await getAdminSession();
  if (!isAdmin) return <NoAccess email={user.email} />;

  const card = await getVehicleCardForAdmin(supabase, cardId);
  if (!card) notFound();

  return (
    <AdminShell email={user.email} title={card.title} back={{ href: "/admin", label: "Машины картууд" }}>
      <CardForm card={card} />
    </AdminShell>
  );
}
