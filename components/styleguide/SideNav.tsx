"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { SgSectionInfo } from "./ui";

/** Зүүн талын тогтмол цэс — гүйлгэх үед идэвхтэй хэсгийг тодруулна */
export function SideNav({ sections }: { sections: SgSectionInfo[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Styleguide" className="sticky top-[calc(var(--header-h)_+_40px)]">
      <p className="mb-3 text-xs/5 font-medium tracking-[.08em] text-ink-3 uppercase">Агуулга</p>
      <ul className="space-y-0.5">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "location" : undefined}
              className={cn(
                "flex gap-3 rounded-btn px-3 py-1.5 text-sm transition-colors duration-300 hover:bg-black/5",
                active === s.id ? "bg-black/5 font-medium text-ink" : "text-ink-3",
              )}
            >
              <span className="font-mono text-xs leading-5 text-ink-3">{s.num}</span>
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
