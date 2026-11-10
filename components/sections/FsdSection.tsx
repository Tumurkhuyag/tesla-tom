import Image from "next/image";
import { PlayIcon } from "@/components/icons";
import { Button, ButtonRow } from "@/components/ui/Button";

const stats = [
  { value: "7x", label: "Fewer Collisions" },
  { value: "17,057,191,373", label: "Miles Driven" },
];

/** Full Self-Driving танилцуулга карт */
export function FsdSection() {
  return (
    <section aria-labelledby="fsd-title" className="mt-12 px-(--gutter)">
      <div className="grid overflow-hidden rounded-card bg-gray-bg md:grid-cols-[2fr_3fr]">
        <div className="flex flex-col px-6 py-8 md:p-12">
          <h2 id="fsd-title" className="font-display text-[32px]/10 font-medium sm:text-[40px]/12">
            Full{" "}
            <span className="bg-linear-90 from-[#232c4d] to-blue to-70% bg-clip-text text-transparent">Self-Driving</span>
            <br />
            (Supervised)
          </h2>
          <p className="mt-2 text-xl text-ink-3">
            Makes every drive easier. Subscribe for $99/mo.<sup className="text-[10px]">1</sup>
          </p>

          <div className="mt-6 mb-8 flex flex-wrap gap-6 sm:flex-nowrap sm:gap-10 md:mt-10 md:mb-12">
            {stats.map((s) => (
              <div key={s.label}>
                <strong className="block font-display text-[36px]/11 font-medium tracking-[-.5px] sm:text-5xl/[52px]">
                  {s.value}
                </strong>
                <span className="text-[17px]/6 whitespace-nowrap text-ink-3">{s.label}</span>
              </div>
            ))}
          </div>

          <ButtonRow>
            <Button href="https://www.tesla.com/drive" variant="dark" wide>
              Schedule Demo
            </Button>
            <Button href="https://www.tesla.com/fsd" variant="light" wide>
              Learn More
            </Button>
          </ButtonRow>
        </div>

        <div className="relative aspect-video bg-black">
          <Image
            src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-FSD-Card-Desktop-Tablet-Poster.jpg"
            alt="A driver reacting to Full Self-Driving (Supervised) in a Cybertruck"
            fill
            sizes="(min-width: 900px) 60vw, 100vw"
            className="object-cover"
          />
          <a
            href="https://www.tesla.com/fsd"
            className="absolute bottom-4 left-4 flex items-center gap-2.5 text-sm leading-none font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,.5)]"
          >
            <span className="grid size-8 place-items-center rounded-full bg-black/40 backdrop-blur-[6px]">
              <PlayIcon />
            </span>
            Watch the video
          </a>
        </div>
      </div>
    </section>
  );
}
