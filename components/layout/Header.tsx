import { AccountIcon, GlobeIcon, SupportIcon, TeslaLogo } from "@/components/icons";
import { navLinks } from "@/data/nav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 grid h-(--header-h) grid-cols-[1fr_auto] items-center bg-white px-(--gutter) lg:grid-cols-[1fr_auto_1fr]">
      <a href="#" aria-label="Нүүр хуудас" className="inline-flex h-full w-[120px] items-center text-ink">
        <TeslaLogo className="h-3 w-[120px]" />
      </a>

      <nav aria-label="Үндсэн цэс" className="hidden h-full items-center lg:flex">
        {navLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="block rounded-btn px-4 py-1 text-sm/6 font-medium text-ink transition-colors duration-330 hover:bg-black/5"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <HeaderIcons />
      <MobileMenu />
    </header>
  );
}

const icons = [
  { label: "Тусламж", href: "https://www.tesla.com/support", Icon: SupportIcon },
  { label: "Бүс нутаг ба хэл", href: "#", Icon: GlobeIcon },
  { label: "Миний бүртгэл", href: "https://www.tesla.com/teslaaccount", Icon: AccountIcon },
];

function HeaderIcons() {
  return (
    <div className="hidden justify-end gap-1 lg:flex">
      {icons.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="grid size-8 place-items-center rounded-btn text-ink transition-colors duration-330 hover:bg-black/5"
        >
          <Icon className="size-6" />
        </a>
      ))}
    </div>
  );
}
