import Image from "next/image";
import { Buttons } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import type { ProductCardItem } from "@/data/types";
import { cn } from "@/lib/cn";

/** Машин болон эрчим хүчний картуудын гүйдэг жагсаалт */
export function CardCarousel({ label, items }: { label: string; items: ProductCardItem[] }) {
  return (
    <Carousel variant="cards" label={label} slideLabels={items.map((i) => i.title)}>
      {items.map((item) => (
        <ProductCard key={item.title} item={item} />
      ))}
    </Carousel>
  );
}

export function ProductCard({ item }: { item: ProductCardItem }) {
  const { sub } = item;
  const subClass = "mt-0.5 inline-block text-[17px]/7 md:text-xl/7";

  return (
    <article
      className={cn(
        "relative flex h-[520px] flex-col overflow-hidden rounded-card p-6 text-white md:h-[580px] md:p-10",
        // eyebrow-гүй (эрчим хүчний) картуудын агуулга доод талдаа
        item.eyebrow ? "justify-between" : "justify-end",
      )}
    >
      <Image src={item.image} alt={item.alt} fill sizes="(min-width: 900px) 1024px, 100vw" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-x-0 top-[40%] bottom-0 bg-linear-to-b from-black/0 to-black/45" />

      {item.eyebrow && (
        <p className="relative text-[17px]/6 font-medium [text-shadow:0_1px_3px_rgba(0,0,0,.25)]">{item.eyebrow}</p>
      )}

      <div className="relative">
        <h2 className="font-display text-[40px]/12 font-medium tracking-[-.5px] md:text-[56px]/16">{item.title}</h2>

        {sub &&
          (sub.href ? (
            <a href={sub.href} className={cn(subClass, "underline decoration-1 underline-offset-4")}>
              {sub.text}
            </a>
          ) : (
            <p className={subClass}>
              {sub.text}
              {sub.footnote && <sup className="text-[10px]">{sub.footnote}</sup>}
            </p>
          ))}

        <Buttons items={item.buttons} className="mt-6" />
      </div>
    </article>
  );
}
