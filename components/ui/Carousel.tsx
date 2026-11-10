"use client";

import { Children, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { cn } from "@/lib/cn";

type CarouselProps = {
  /**
   * hero  — бүтэн өргөнтэй, төгсгөлөөсөө эхэнд эргэж ордог
   * cards — картууд, утсан дээр хуруугаар гүйлгэнэ (scroll-snap)
   */
  variant: "hero" | "cards";
  label: string;
  /** Цэг бүрийн дэлгэц уншигчид зориулсан нэр */
  slideLabels: string[];
  className?: string;
  children: ReactNode;
};

export function Carousel({ variant, label, slideLabels, className, children }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const slides = Children.toArray(children);
  const count = slides.length;
  const isHero = variant === "hero";

  const goTo = (i: number) =>
    setIndex(isHero ? (i + count) % count : Math.max(0, Math.min(count - 1, i)));

  const hasPrev = isHero || index > 0;
  const hasNext = isHero || index < count - 1;

  return (
    <section
      aria-label={label}
      aria-roledescription="carousel"
      className={cn(
        "relative",
        isHero
          ? "h-[min(660px,calc(100vh_-_var(--header-h)))] min-h-[480px] overflow-hidden bg-black"
          : [
              "mt-12",
              // Утас: хуруугаар гүйлгэх
              "snap-x snap-mandatory scroll-px-(--gutter) overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "[--card-w:calc(100vw_-_var(--gutter)*2_-_24px)]",
              // Desktop: сум/цэгээр шилжүүлэх
              "md:snap-none md:overflow-hidden md:[--card-w:min(1024px,calc(100vw_-_var(--gutter)*2_-_72px))]",
            ].join(" "),
        className,
      )}
    >
      <div
        style={{ "--i": index, ...(isHero && { transform: `translateX(-${index * 100}%)` }) } as CSSProperties}
        className={cn(
          "flex transition-[transform,translate] duration-800 ease-tesla",
          isHero
            ? "h-full"
            : "w-max gap-(--gap) px-(--gutter) md:w-auto md:translate-x-[calc(var(--i)*-1*(var(--card-w)_+_var(--gap)))]",
        )}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}: ${slideLabels[i] ?? ""}`}
            inert={isHero && i !== index}
            className={isHero ? "relative h-full flex-[0_0_100%]" : "flex-[0_0_var(--card-w)] snap-start"}
          >
            {slide}
          </div>
        ))}
      </div>

      {hasPrev && (
        <CarouselArrow
          direction="prev"
          onClick={() => goTo(index - 1)}
          className={isHero ? "left-(--gutter)" : "left-[calc(var(--gutter)_+_16px)]"}
          hero={isHero}
        />
      )}
      {hasNext && (
        <CarouselArrow direction="next" onClick={() => goTo(index + 1)} className="right-(--gutter)" hero={isHero} />
      )}

      <CarouselDots count={count} active={index} labels={slideLabels} onSelect={goTo} hero={isHero} />
    </section>
  );
}

function CarouselArrow({
  direction,
  onClick,
  className,
  hero,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
  hero: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={cn(
        "absolute z-3 -mt-5 hidden size-10 cursor-pointer place-items-center rounded-btn bg-[rgba(244,244,244,.65)] text-ink backdrop-blur-[8px] transition-colors duration-300 hover:bg-[rgba(244,244,244,.9)] md:grid",
        hero ? "top-1/2" : "top-[290px]",
        className,
      )}
    >
      <Icon className="size-6" />
    </button>
  );
}

function CarouselDots({
  count,
  active,
  labels,
  onSelect,
  hero,
}: {
  count: number;
  active: number;
  labels: string[];
  onSelect: (i: number) => void;
  hero: boolean;
}) {
  return (
    <div
      className={cn(
        "flex justify-center gap-3",
        hero ? "absolute inset-x-0 bottom-[18px] z-3" : "mt-5 hidden md:flex",
      )}
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Go to ${labels[i] ?? `slide ${i + 1}`}`}
          aria-current={i === active}
          className={cn(
            "size-2 cursor-pointer rounded-full transition-[background-color,scale] duration-300 hover:scale-125",
            hero
              ? i === active ? "bg-white" : "bg-white/40"
              : i === active ? "bg-ink" : "bg-ink/35",
          )}
        />
      ))}
    </div>
  );
}
