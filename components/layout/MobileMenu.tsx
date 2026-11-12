"use client";

import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { mobileLinks } from "@/data/nav";
import { cn } from "@/lib/cn";

/** 1200px-ээс бага дэлгэцэнд гарах баруун талын гулсдаг цэс */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Esc товчоор хаах
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="h-8 cursor-pointer justify-self-end rounded-btn bg-black/5 px-4 text-sm/8 font-medium lg:hidden"
      >
        Цэс
      </button>

      {/* Арын бараан давхарга — дарвал хаагдана */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-55 bg-black/30 transition-opacity duration-400 ease-tesla",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <nav
        id="mobile-menu"
        aria-label="Гар утасны цэс"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-60 w-[min(100%,400px)] overflow-y-auto bg-white px-6 pt-18 pb-8 transition-transform duration-400 ease-tesla",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Цэс хаах"
          className="absolute top-3 right-4 grid size-8 cursor-pointer place-items-center rounded-btn hover:bg-black/5"
        >
          <CloseIcon />
        </button>
        {mobileLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="block rounded-btn px-4 py-3 text-[17px]/6 font-medium hover:bg-black/5"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </>
  );
}
