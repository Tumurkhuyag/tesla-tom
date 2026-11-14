import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/** Захиалгын хуудсуудын нийтлэг бүтэц: саарал дэвсгэр дээр цагаан «баримт» карт */
export function OrderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex justify-center bg-gray-bg px-(--gutter) pt-8 pb-16 md:pt-12">
        <div className="w-full max-w-[560px]">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function OrderCard({ children, className }: { children?: ReactNode; className?: string }) {
  return <section className={cn("overflow-hidden rounded-card bg-white", className)}>{children}</section>;
}

const STEPS = ["Захиалга шалгах", "Byl-ээр төлөх", "Баталгаажсан"] as const;

/**
 * Захиалгын явцыг 3 алхмаар харуулна (Metaphor: аяллын зам / дэлгүүрийн касс).
 * `current` — одоо байгаа алхам (1-ээс). `complete` бол бүх алхам дууссан.
 */
export function OrderSteps({ current, complete = false }: { current: 1 | 2 | 3; complete?: boolean }) {
  return (
    <nav aria-label="Захиалгын явц" className="mb-4">
      <ol className="grid grid-cols-3 gap-2">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = complete || n < current;
          const active = !complete && n === current;
          return (
            <li key={label} aria-current={active ? "step" : undefined} className="flex flex-col gap-2">
              <span
                aria-hidden="true"
                className={cn("h-1 rounded-full", done ? "bg-ink" : active ? "bg-blue" : "bg-line")}
              />
              <span
                className={cn(
                  "flex items-center gap-1.5 text-xs/4 sm:text-[13px]/5",
                  done || active ? "font-medium text-ink" : "text-ink-3",
                )}
              >
                {done ? (
                  <CheckIcon className="size-3.5 shrink-0" />
                ) : (
                  <span className="tabular-nums" aria-hidden="true">
                    {n}.
                  </span>
                )}
                {label}
                {done && <span className="sr-only"> (дууссан)</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Нэр — утга хос мөр (баримтын мөр) */
export function ReceiptRow({ label, children, strong }: { label: string; children: ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="text-sm text-ink-3">{label}</dt>
      <dd className={cn("text-right text-sm text-ink", strong && "text-base font-medium")}>{children}</dd>
    </div>
  );
}
