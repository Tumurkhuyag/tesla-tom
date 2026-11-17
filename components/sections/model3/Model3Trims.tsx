import Image from "next/image";
import { Buttons } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { model3Trims as d } from "@/data/model3";
import { cn } from "@/lib/cn";
import { TrimSwitcher } from "./TrimSwitcher";
import { afterHeading, Container, SectionHeading, sectionY } from "./ui";

/** 5. Хувилбарууд — нэг нэгээр харуулах + morphing tab цэс + захиалах товч */
export function Model3Trims() {
  return (
    <section aria-labelledby="m3-trims-title" className={cn("bg-gray-bg px-(--gutter)", sectionY)}>
      <Container>
        <SectionHeading id="m3-trims-title" title={d.title} />

        <TiltCard className={cn("mx-auto max-w-[960px]", afterHeading)} cardClassName="aspect-[16/7]">
          <Image src={d.image.src} alt={d.image.alt} fill sizes="(min-width: 1000px) 960px, 100vw" className="object-cover" />
        </TiltCard>

        <div className="mt-14 md:mt-20">
          <TrimSwitcher trims={d.trims} />
        </div>

        <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[15px] text-ink-2">
          {d.common.map((c) => (
            <li key={c} className="before:mr-2 before:text-ink-3 before:content-['✓']">
              {c}
            </li>
          ))}
        </ul>

        <Buttons items={d.buttons} wide className="mt-14 justify-center md:mt-16" />

        <p className="mx-auto mt-14 max-w-[640px] text-center text-xs/5 text-ink-3 md:mt-16">{d.footnote}</p>
      </Container>
    </section>
  );
}
