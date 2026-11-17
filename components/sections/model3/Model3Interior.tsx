import Image from "next/image";
import { GlowGrid } from "@/components/ui/GlowGrid";
import { SpotlightFrame } from "@/components/ui/SpotlightFrame";
import { model3Interior as d } from "@/data/model3";
import { cn } from "@/lib/cn";
import { afterHeading, Container, SectionHeading, sectionY } from "./ui";

/*
 * Bento байрлал (lg, 3 багана):
 *   [ зураг  зураг ][ 1 ]
 *   [ зураг  зураг ][ 2 ]
 *   [   3   ][    4     ]
 */
const featureSpan = ["", "", "", "lg:col-span-2"];

/** 2. Салон — бараан дэвсгэр дээр гэрэлтэх хүрээтэй bento картууд */
export function Model3Interior() {
  return (
    <section
      aria-labelledby="m3-interior-title"
      className={cn(
        "bg-[#0a0b0e] px-(--gutter) text-white",
        "bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgb(62_106_225/0.14),transparent)]",
        sectionY,
      )}
    >
      <Container>
        <SectionHeading id="m3-interior-title" eyebrow={d.eyebrow} title={d.title} text={d.text} tone="light" />

        <GlowGrid className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(240px,auto)]", afterHeading)}>
          <div className="glow-card aspect-[4/3] md:col-span-2 md:aspect-[2/1] lg:row-span-2 lg:aspect-auto">
            <SpotlightFrame className="absolute inset-1.5 overflow-hidden rounded-[15px]">
              <Image
                src={d.image.src}
                alt={d.image.alt}
                fill
                sizes="(min-width: 1200px) 800px, 100vw"
                className="object-cover"
              />
            </SpotlightFrame>
          </div>

          {d.features.map((f, i) => (
            <article key={f.title} className={cn("glow-card flex flex-col justify-end p-8 md:p-10", featureSpan[i])}>
              <h3 className="font-display text-2xl/8 font-medium">{f.title}</h3>
              <p className="mt-3 max-w-[40ch] text-[15px]/6 text-white/60">{f.text}</p>
            </article>
          ))}
        </GlowGrid>
      </Container>
    </section>
  );
}
