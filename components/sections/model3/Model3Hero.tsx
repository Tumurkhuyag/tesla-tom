import Image from "next/image";
import { MagneticButtons } from "@/components/ui/MagneticButtons";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { model3Hero as d } from "@/data/model3";
import { StatList } from "./StatList";

/** 1. Hero — бүтэн дэлгэцийн зураг, гарчиг, гол 3 үзүүлэлт */
export function Model3Hero() {
  return (
    <section
      aria-labelledby="m3-hero-title"
      className="relative flex h-[calc(100svh-var(--header-h))] min-h-[560px] flex-col items-center justify-between px-(--gutter) pt-16 pb-12 text-center text-white md:pt-24 md:pb-20"
    >
      <Image src={d.image.src} alt={d.image.alt} fill sizes="100vw" preload className="object-cover" />
      {/* Текст уншигдахуйц байлгах дээд, доод сүүдэр */}
      <div aria-hidden className="absolute inset-0 bg-linear-to-b from-black/35 via-transparent via-40% to-black/55" />

      {/* Дэлгэцийн эхэнд тул scroll хүлээхгүй — фонт бэлэн болмогц тоглоно */}
      <Reveal as="div" immediate className="relative">
        <h1 id="m3-hero-title" className="font-display text-[40px]/12 font-medium md:text-[56px]/16">
          <RevealText text={d.title} />
        </h1>
        <p className="rv-follow mt-3 text-[17px]/6">{d.tagline}</p>
      </Reveal>

      <div className="relative flex w-full max-w-[720px] flex-col items-center gap-10 md:gap-12">
        <StatList stats={d.stats} tone="light" className="w-full" />
        <MagneticButtons items={d.buttons} wide className="justify-center" />
      </div>
    </section>
  );
}
