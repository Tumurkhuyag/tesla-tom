import Image from "next/image";
import { Buttons } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { heroSlides } from "@/data/home";
import type { HeroSlideItem } from "@/data/types";

export function HeroCarousel() {
  return (
    <Carousel
      variant="hero"
      label="Featured"
      slideLabels={heroSlides.map((s) => s.title ?? s.logo?.alt ?? s.alt)}
    >
      {heroSlides.map((slide, i) => (
        <HeroSlide key={slide.image} slide={slide} first={i === 0} />
      ))}
    </Carousel>
  );
}

function HeroSlide({ slide, first }: { slide: HeroSlideItem; first: boolean }) {
  return (
    <article className="relative flex h-full flex-col items-center px-4 pt-12 text-center md:px-0 md:pt-16">
      <Image src={slide.image} alt={slide.alt} fill sizes="100vw" preload={first} className="object-cover" />

      {slide.logo ? (
        <h1 className="relative">
          <Image
            src={slide.logo.src}
            alt={slide.logo.alt}
            width={1396}
            height={90}
            preload={first}
            className="mb-6 h-auto w-[min(640px,80vw)]"
          />
        </h1>
      ) : (
        <h2 className="relative font-display text-[32px]/10 font-medium text-white [text-shadow:0_1px_8px_rgba(0,0,0,.45)] md:text-[40px]/12">
          {slide.title}
        </h2>
      )}

      {slide.sub && (
        <a
          href={slide.sub.href}
          className="relative mt-1 text-[17px]/6 text-white underline decoration-1 underline-offset-4 [text-shadow:0_1px_6px_rgba(0,0,0,.5)]"
        >
          {slide.sub.label}
        </a>
      )}

      <Buttons items={slide.buttons} wide className="relative mt-6 justify-center px-2 sm:px-0" />
    </article>
  );
}
