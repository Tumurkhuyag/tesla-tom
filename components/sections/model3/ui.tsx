import type { ReactNode } from "react";
import type { Feature } from "@/data/model3";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { cn } from "@/lib/cn";

type Tone = "dark" | "light";

/*
 * Зайн систем (бүх Model 3 хэсэгт ижил):
 *   section       — py-24 / md:py-40   (96 / 160px)
 *   гарчиг → агуулга — mt-14 / md:mt-20 (56 / 80px)
 *   агуулга → агуулга — mt-16 / md:mt-24
 */
export const sectionY = "py-24 md:py-40";
export const afterHeading = "mt-14 md:mt-20";

/** Агуулгыг 1200px-ээс хэтрүүлэхгүй, голлуулна */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px]", className)}>{children}</div>;
}

/** Хэсгийн гарчиг: жижиг шошго, гарчиг, тайлбар. Scroll-оор орж ирэхэд гарчиг үсэг үсгээр, бусад нь араас нь гарна */
export function SectionHeading({
  id,
  eyebrow,
  title,
  text,
  tone = "dark",
  align = "center",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  text?: string;
  tone?: Tone;
  align?: "center" | "left";
}) {
  const muted = tone === "light" ? "text-white/70" : "text-ink-3";
  return (
    <Reveal className={cn(align === "center" && "mx-auto max-w-[640px] text-center")}>
      {eyebrow && <p className={cn("rv-follow text-sm font-medium tracking-wide", muted)}>{eyebrow}</p>}
      <h2 id={id} className="mt-3 font-display text-[32px]/10 font-medium text-balance sm:text-[44px]/[52px]">
        <RevealText text={title} />
      </h2>
      {text && <p className={cn("rv-follow mt-5 text-[17px]/7 text-pretty", muted)}>{text}</p>}
    </Reveal>
  );
}

/** Онцлогуудын жагсаалт — баганын тоог `className`-аар өгнө */
export function FeatureList({
  features,
  tone = "dark",
  className,
}: {
  features: Feature[];
  tone?: Tone;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-x-10 gap-y-10 md:gap-y-12", className)}>
      {features.map((f) => (
        <li key={f.title} className={cn("border-t pt-6", tone === "light" ? "border-white/20" : "border-line")}>
          <h3 className="text-[17px]/6 font-medium">{f.title}</h3>
          <p className={cn("mt-2 text-[15px]/6", tone === "light" ? "text-white/70" : "text-ink-3")}>{f.text}</p>
        </li>
      ))}
    </ul>
  );
}
