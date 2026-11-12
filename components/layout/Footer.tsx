import { footerLinks } from "@/data/home";

export function Footer() {
  return (
    <footer className="px-(--gutter) pt-16 pb-10">
      <h2 className="sr-only">Хөлийн цэс</h2>
      <ul className="flex flex-wrap justify-center gap-x-3.5 gap-y-1">
        {footerLinks.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="text-xs/5 font-medium text-ink-3 hover:text-ink">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
