import Image from "next/image";
import { model3Safety as d } from "@/data/model3";
import { cn } from "@/lib/cn";
import { Container, FeatureList, SectionHeading, sectionY } from "./ui";

/** 4. Аюулгүй байдал — хоёр баганатай зураг + текст */
export function Model3Safety() {
  return (
    <section aria-labelledby="m3-safety-title" className={cn("px-(--gutter)", sectionY)}>
      <Container className="grid items-center gap-14 md:grid-cols-2 md:gap-20 lg:gap-28">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card sm:aspect-[4/3] md:aspect-[4/5]">
          <Image
            src={d.image.src}
            alt={d.image.alt}
            fill
            sizes="(min-width: 900px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading id="m3-safety-title" eyebrow={d.eyebrow} title={d.title} text={d.text} align="left" />
          <FeatureList features={d.features} className="mt-12 gap-y-8 md:mt-14 md:gap-y-8" />
        </div>
      </Container>
    </section>
  );
}
