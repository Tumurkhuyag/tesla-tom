import Image from "next/image";
import type { ComponentType } from "react";
import { DestinationChargerIcon, FindMeIcon, FullscreenIcon, SuperchargerIcon } from "@/components/icons";
import { Button, ButtonRow } from "@/components/ui/Button";

const stats: { value: string; label: string; Icon: ComponentType<{ className?: string }> }[] = [
  { value: "39,597", label: "Superchargers", Icon: SuperchargerIcon },
  { value: "401", label: "Destination Chargers", Icon: DestinationChargerIcon },
];

export function ChargingSection() {
  return (
    <section aria-labelledby="charge-title" className="mt-12 px-(--gutter)">
      <ChargingMap />

      <div className="flex flex-col items-start justify-between gap-8 px-2 pt-8 md:flex-row md:px-12 md:pt-10">
        <div>
          <h2 id="charge-title" className="font-display text-[36px]/11 font-medium sm:text-5xl/14">
            Find Your Charge
          </h2>
          <h4 className="mt-1 text-xl text-ink-3">
            View the network of Tesla Superchargers and Destination Chargers available near you.
          </h4>
          <ButtonRow className="mt-8">
            <Button href="https://www.tesla.com/findus" variant="dark" className="px-[27px] sm:min-w-0">
              View Network
            </Button>
            <Button href="https://www.tesla.com/charging" variant="ghost" className="px-[27px]">
              Learn More
            </Button>
          </ButtonRow>
        </div>

        <div className="flex gap-6 sm:gap-10">
          {stats.map(({ value, label, Icon }) => (
            <div key={label}>
              <div className="flex items-center gap-0.5 font-display text-[36px]/14 font-medium tracking-[-.5px] sm:text-5xl/14">
                {value}
                <Icon className="size-12" />
              </div>
              <h4 className="text-xl whitespace-nowrap text-ink-3">{label}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Supercharger-уудын зурагчилсан газрын зураг (public/charging-map.svg) */
function ChargingMap() {
  return (
    <div className="relative h-[400px] overflow-hidden rounded-card bg-[#d4d6d9] sm:h-[550px]">
      <Image
        src="/charging-map.svg"
        alt="Map of Tesla Superchargers across North America"
        fill
        unoptimized
        className="object-cover"
      />
      <a
        href="https://www.tesla.com/findus"
        className="absolute bottom-2.5 left-2.5 flex h-10 items-center gap-2 rounded-[2px] bg-white px-2.5 text-sm leading-none font-medium text-ink-2 shadow-[0_1px_4px_rgba(0,0,0,.3)]"
      >
        <FindMeIcon className="size-6" />
        Find Me
      </a>
      <a
        href="https://www.tesla.com/findus"
        aria-label="Open full map"
        className="absolute right-2.5 bottom-2.5 grid size-10 place-items-center rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,.3)]"
      >
        <FullscreenIcon />
      </a>
      <span className="absolute right-[60px] bottom-0.5 bg-white/70 px-1 text-[10px] text-[#555]">Illustrative map</span>
    </div>
  );
}
