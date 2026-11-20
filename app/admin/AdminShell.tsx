import Link from "next/link";
import type { ReactNode } from "react";
import { signOut } from "./actions";
import { cn } from "@/lib/cn";
import { secondaryButtonClass } from "./ui";

export type AdminSection = "cards" | "orders";

const NAV: { section: AdminSection; href: string; label: string; icon: ReactNode }[] = [
  { section: "cards", href: "/admin", label: "Машины картууд", icon: <CarIcon /> },
  { section: "orders", href: "/admin/orders", label: "Захиалгууд", icon: <ListIcon /> },
];

/**
 * Admin хуудсуудын бүтэц:
 * 1) Толгой — «Admin» лого, үндсэн цэс (таб), бүртгэл. Бүх хуудсанд ижил тул хаана байгаагаа үргэлж харна.
 * 2) Хуудасны гарчиг — буцах холбоос + том гарчиг.
 */
export function AdminShell({
  email,
  title,
  section,
  back,
  actions,
  children,
}: {
  email: string;
  title: string;
  /** Цэсний аль таб идэвхтэй вэ */
  section?: AdminSection;
  /** Буцах холбоос (жишээ нь засах хуудаснаас жагсаалт руу) */
  back?: { href: string; label: string };
  /** Гарчгийн баруун талд харуулах товчнууд */
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4 md:gap-6 md:px-6">
          <Link href="/admin" className="shrink-0 text-sm font-semibold tracking-tight text-ink">
            Tesla <span className="font-normal text-ink-3">Admin</span>
          </Link>

          <nav aria-label="Admin цэс" className="-mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto px-1">
            {NAV.map((item) => {
              const active = item.section === section;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 shrink-0 items-center gap-2 rounded-btn px-3 text-sm font-medium transition-colors",
                    active ? "bg-ink text-white" : "text-ink-2 hover:bg-gray-bg hover:text-ink",
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden max-w-48 truncate text-sm text-ink-3 lg:inline">{email}</span>
            <a href="/" target="_blank" rel="noreferrer" className={cn(secondaryButtonClass, "hidden h-9 sm:inline-flex")}>
              Сайт ↗
            </a>
            <form action={signOut}>
              <button type="submit" className={cn(secondaryButtonClass, "h-9")}>
                Гарах
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0">
            {back && (
              <Link
                href={back.href}
                className="mb-1 inline-flex items-center gap-1 text-sm text-ink-3 transition-colors hover:text-ink"
              >
                ← {back.label}
              </Link>
            )}
            <h1 className="truncate font-display text-2xl font-medium tracking-[-.2px] text-ink">{title}</h1>
          </div>
          {actions}
        </div>
        {children}
      </div>
    </>
  );
}

function CarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 16H4a1 1 0 0 1-1-1v-3l2.2-4.4A2 2 0 0 1 7 6.5h10a2 2 0 0 1 1.8 1.1L21 12v3a1 1 0 0 1-1 1h-1" />
      <path d="M3 12h18M9 16h6" />
      <circle cx="7" cy="16.5" r="1.8" />
      <circle cx="17" cy="16.5" r="1.8" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M8 8.5h8M8 12h8M8 15.5h5" />
    </svg>
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
    <div className="mx-auto max-w-5xl space-y-3 px-4 pt-32 md:px-6" aria-busy="true" aria-label="Ачаалж байна">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className={`${height} animate-pulse rounded-card bg-white`} />
      ))}
    </div>
  );
}
