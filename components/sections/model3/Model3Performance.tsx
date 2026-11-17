import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { model3Performance as d } from "@/data/model3";
import { cn } from "@/lib/cn";
import { StatList } from "./StatList";
import { afterHeading, Container, FeatureList, SectionHeading, sectionY } from "./ui";

/** 3. Хүчин чадал — бараан дэвсгэртэй Performance хэсэг */
export function Model3Performance() {
  return (
    <section aria-labelledby="m3-perf-title" className="bg-ink text-white">
      <div className="relative aspect-[4/3] sm:aspect-[21/9]">
        <Image src={d.image.src} alt={d.image.alt} fill sizes="100vw" className="object-cover" />
      </div>

      <div className={cn("px-(--gutter)", sectionY)}>
        <Container>
          <SectionHeading id="m3-perf-title" eyebrow={d.eyebrow} title={d.title} text={d.text} tone="light" />
          <StatList stats={d.stats} tone="light" className={cn("mx-auto max-w-[640px] text-center", afterHeading)} />
          <FeatureList features={d.features} tone="light" className="mt-16 md:mt-24 md:grid-cols-3" />
          <div className="mt-16 flex justify-center md:mt-20">
            <Button href={d.button.href} variant={d.button.variant} wide>
              {d.button.label}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
