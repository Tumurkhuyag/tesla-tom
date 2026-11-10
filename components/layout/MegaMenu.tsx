import Image from "next/image";
import type { LinkItem, MegaCardItem, NavMenu } from "@/data/types";

/** Цэсний товч дээр хулгана аваачих/focus хийх үед нээгдэх том цэс */
export function MegaMenu({ menu }: { menu: NavMenu }) {
  return (
    <div
      className={[
        "mega invisible absolute inset-x-0 top-full flex -translate-y-2 justify-center gap-12 bg-white px-(--gutter) pt-8 pb-12 opacity-0",
        "shadow-[0_24px_24px_-24px_rgba(0,0,0,.12)] transition-[opacity,translate,visibility] duration-250 ease-tesla",
        "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
        "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
      ].join(" ")}
    >
      {menu.kind === "cards" && (
        <>
          <CardGrid cards={menu.cards} columns={Math.min(menu.cards.length, 3)} />
          <LinkList links={menu.list} className="min-w-[220px] border-l border-[#eee] pl-10" />
        </>
      )}

      {menu.kind === "columns" && (
        <div className="grid grid-cols-[repeat(3,220px)] gap-12">
          {menu.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-2 text-xs/5 font-medium text-ink-3">{col.heading}</h4>
              <LinkList links={col.links} />
            </div>
          ))}
        </div>
      )}

      {menu.kind === "shop" && <CardGrid cards={menu.cards} columns={4} wholeCardLink />}
    </div>
  );
}

function CardGrid({ cards, columns, wholeCardLink }: { cards: MegaCardItem[]; columns: number; wholeCardLink?: boolean }) {
  return (
    <div className="grid gap-x-6 gap-y-8" style={{ gridTemplateColumns: `repeat(${columns}, 220px)` }}>
      {cards.map((card) => (
        <MegaCard key={card.title} card={card} wholeCardLink={wholeCardLink} />
      ))}
    </div>
  );
}

export function MegaCard({ card, wholeCardLink }: { card: MegaCardItem; wholeCardLink?: boolean }) {
  const image = (
    <Image
      src={card.image}
      alt={wholeCardLink ? "" : (card.alt ?? card.title)}
      width={220}
      height={128}
      className="mx-auto mb-2 h-32 w-[220px] object-contain"
    />
  );
  const title = <h3 className="font-display text-[17px]/6 font-medium text-ink">{card.title}</h3>;

  // Shop цэсэнд карт бүхэлдээ нэг холбоос
  if (wholeCardLink) {
    return (
      <a href={card.href} className="text-center">
        {image}
        {title}
      </a>
    );
  }

  return (
    <div className="text-center">
      <a href={card.href}>{image}</a>
      {title}
      {card.links && (
        <div className="mt-0.5 flex justify-center gap-4">
          {card.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-ink-3 underline decoration-[rgba(92,94,98,.5)] underline-offset-3 hover:text-ink hover:decoration-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function LinkList({ links, className }: { links: LinkItem[]; className?: string }) {
  return (
    <ul className={className}>
      {links.map((l) => (
        <li key={l.label}>
          <a href={l.href} className="block py-1 text-sm/6 font-medium text-ink hover:underline hover:underline-offset-3">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
