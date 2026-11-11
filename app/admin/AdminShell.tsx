import Link from "next/link";
import type { ReactNode } from "react";
import { signOut } from "./actions";
import { secondaryButtonClass } from "./ui";

/** Admin хуудсуудын толгой хэсэг ба агуулгын хүрээ */
export function AdminShell({
  email,
  title,
  back,
  children,
}: {
  email: string;
  title: string;
  /** Буцах холбоос (жишээ нь засах хуудаснаас жагсаалт руу) */
  back?: { href: string; label: string };
  children: ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 md:px-6">
          <div className="min-w-0">
            {back ? (
              <Link href={back.href} className="text-xs text-ink-3 hover:text-ink">
                ← {back.label}
              </Link>
            ) : (
              <p className="text-xs text-ink-3">Admin</p>
            )}
            <h1 className="truncate text-base font-medium">{title}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden text-sm text-ink-3 md:inline">{email}</span>
            <a href="/" target="_blank" rel="noreferrer" className={secondaryButtonClass}>
              Сайт ↗
            </a>
            <form action={signOut}>
              <button type="submit" className={secondaryButtonClass}>
                Гарах
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">{children}</div>
    </>
  );
}

export function NoAccess({ email }: { email: string }) {
  return (
    <AdminShell email={email} title="Эрх алга">
      <div className="rounded-card bg-white p-8">
        <p className="text-sm text-ink-3">Энэ бүртгэл admin эрхгүй байна.</p>
      </div>
    </AdminShell>
  );
}

export function AdminSkeleton({ rows = 6, height = "h-24" }: { rows?: number; height?: string }) {
  return (
    <div className="mx-auto max-w-5xl space-y-3 px-4 pt-24 md:px-6" aria-busy="true" aria-label="Ачаалж байна">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className={`${height} animate-pulse rounded-card bg-white`} />
      ))}
    </div>
  );
}
