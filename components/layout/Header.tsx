import { AccountIcon, GlobeIcon, SupportIcon, TeslaLogo } from "@/components/icons";
import { navMenus } from "@/data/nav";
import type { NavMenu } from "@/data/types";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 grid h-(--header-h) grid-cols-[1fr_auto] items-center bg-white px-(--gutter) lg:grid-cols-[1fr_auto_1fr]">
        <a href="#" aria-label="Navigate to Home" className="inline-flex h-full w-[120px] items-center text-ink">
          <TeslaLogo className="h-3 w-[120px]" />
        </a>

        <nav aria-label="Main" className="hidden h-full lg:flex">
          {navMenus.map((menu) => (
            <NavItem key={menu.label} menu={menu} />
          ))}
        </nav>

        <HeaderIcons />
        <MobileMenu />
      </header>

      {/* Mega menu нээлттэй үед харагдах бүдэг давхарга (globals.css-ийн :has дүрмээр) */}
      <div
        aria-hidden="true"
        className="menu-backdrop pointer-events-none fixed inset-0 z-40 bg-white/15 opacity-0 backdrop-blur-[16px] transition-opacity duration-250 ease-tesla"
      />
    </>
  );
}

function NavItem({ menu }: { menu: NavMenu }) {
  const linkClass =
    "block cursor-pointer rounded-btn px-4 py-1 text-sm/6 font-medium text-ink transition-colors duration-330 group-hover:bg-black/5 group-focus-within:bg-black/5";

  return (
    <div className="nav-item group flex h-full items-center">
      {menu.kind === "shop" ? (
        <a href={menu.href} className={linkClass}>
          {menu.label}
        </a>
      ) : (
        <button type="button" aria-haspopup="true" className={linkClass}>
          {menu.label}
        </button>
      )}
      <MegaMenu menu={menu} />
    </div>
  );
}

const icons = [
  { label: "Support", href: "https://www.tesla.com/support", Icon: SupportIcon },
  { label: "Region and language", href: "#", Icon: GlobeIcon },
  { label: "Account", href: "https://www.tesla.com/teslaaccount", Icon: AccountIcon },
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
