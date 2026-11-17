import type { Stat } from "@/data/model3";
import { cn } from "@/lib/cn";

/**
 * Том тоо + жижиг нэгж + тайлбар бүхий үзүүлэлтийн мөр.
 * col-reverse + justify-end: тайлбар 2 мөр болсон ч тоонууд дээд талдаа тэгш байна.
 */
export function StatList({
  stats,
  tone = "dark",
  className,
}: {
  stats: Stat[];
  /** dark = цагаан дэвсгэр дээр бараан текст, light = бараан дэвсгэр дээр цагаан */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <dl className={cn("grid grid-cols-3 gap-4 sm:gap-10", className)}>
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse justify-end">
          <dt className={cn("mt-1 text-[13px]/5 sm:text-sm", tone === "light" ? "text-white/80" : "text-ink-3")}>
            {s.label}
          </dt>
          <dd className="font-display text-[28px]/9 font-medium tracking-[-.5px] sm:text-[40px]/12">
            {s.value}
            {s.unit && <span className="ml-1 text-base font-medium sm:text-xl">{s.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
