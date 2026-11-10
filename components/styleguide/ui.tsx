import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SgSectionInfo = { id: string; num: string; title: string };

/** Styleguide-ийн дугаартай том хэсэг (01 Зарчим, 02 Брэнд ...) */
export function SgSection({
  info,
  intro,
  children,
}: {
  info: SgSectionInfo;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={info.id} className="scroll-mt-[calc(var(--header-h)_+_24px)] border-t border-line pt-10 pb-16">
      <h2 className="flex items-baseline gap-3 font-display text-[32px]/10 font-medium tracking-[-.5px]">
        <span className="font-mono text-sm font-normal text-ink-3">{info.num}</span>
        {info.title}
      </h2>
      {intro && <p className="mt-3 max-w-[640px] text-[17px]/6 text-ink-3">{intro}</p>}
      <div className="mt-8 space-y-12">{children}</div>
    </section>
  );
}

export function SubHeading({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="font-display text-xl font-medium">{children}</h3>
      {note && <p className="mt-1 max-w-[640px] text-sm text-ink-3">{note}</p>}
    </div>
  );
}

/** Кодын жижиг хэсэг: `--color-ink`, `rounded-card` гэх мэт */
export function Code({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <code className={cn("rounded-[3px] bg-gray-bg px-1.5 py-0.5 font-mono text-[12px] text-ink", className)}>
      {children}
    </code>
  );
}

/** Саарал дэвсгэртэй хайрцаг — жишээнүүдийг багтаана */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-card border border-line/60 bg-gray-bg/60 p-6", className)}>{children}</div>;
}

/** Нэр + тайлбар бүхий хүснэгтийн мөр */
export function SpecRow({ name, value, children }: { name: ReactNode; value?: ReactNode; children?: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-b border-line py-4 sm:grid-cols-[220px_140px_1fr] sm:items-center sm:gap-6">
      <div>{name}</div>
      <div className="font-mono text-xs text-ink-3">{value}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
