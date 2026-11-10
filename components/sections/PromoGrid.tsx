import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { promos } from "@/data/home";
import type { PromoItem } from "@/data/types";

export function PromoGrid() {
  return (
    <section aria-label="Promotions" className="mt-12 grid gap-(--gap) px-(--gutter) md:grid-cols-2">
      {promos.map((p) => (
        <PromoCard key={p.title} promo={p} />
      ))}
    </section>
  );
}

const imageClass = {
  // Баруун талд хөвөх жижиг зураг
  float:
    "mx-auto mb-4 h-[120px] w-full max-w-[320px] flex-none self-center object-cover sm:mx-0 sm:mr-4 sm:mb-0 sm:h-auto sm:w-[38%] sm:max-w-[260px] sm:object-fill",
  // Баруун захыг бүтэн дүүргэх зураг
  side: "h-[200px] w-full flex-none object-cover sm:h-auto sm:w-[30%] sm:max-w-[270px]",
};

const imageSize = {
  float: { width: 790, height: 990 },
  side: { width: 1831, height: 2240 },
};

export function PromoCard({ promo }: { promo: PromoItem }) {
  return (
    <article className="relative flex min-h-[220px] flex-col overflow-hidden rounded-card bg-gray-bg sm:flex-row">
      <div className="relative z-1 p-6 sm:flex-1 sm:px-12 sm:py-9">
        <h2 className="font-display text-[32px]/10 font-medium">{promo.title}</h2>
        <h3 className="mt-1 max-w-[520px] text-xl text-ink-3">{promo.description}</h3>
        <Button href={promo.cta.href} variant="light" className="mt-5 min-w-[180px] flex-none sm:min-w-[180px]">
          {promo.cta.label}
        </Button>
      </div>
      <Image
        src={promo.image}
        alt={promo.alt}
        {...imageSize[promo.imageStyle]}
        sizes="(min-width: 600px) 270px, 100vw"
        className={imageClass[promo.imageStyle]}
      />
    </article>
  );
}
