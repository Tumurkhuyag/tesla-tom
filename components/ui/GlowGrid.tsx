"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Доторх `.glow-card` бүрт курсорын байрлалыг (картад харьцангуй) `--gx`, `--gy` хувьсагчаар өгнө.
 * Бүх карт нэг курсорыг "хардаг" тул хөрш картуудын хүрээ ч зэрэг гэрэлтэнэ.
 * Гэрлийн дүрслэл өөрөө globals.css-ийн `.glow-card`-д.
 */
export function GlowGrid({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid || !window.matchMedia("(hover: hover)").matches) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".glow-card"));
    let frame = 0;
    let x = 0;
    let y = 0;

    const update = () => {
      frame = 0;
      for (const card of cards) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--gx", `${x - r.left}px`);
        card.style.setProperty("--gy", `${y - r.top}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    grid.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      grid.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={`glow-grid ${className ?? ""}`}>
      {children}
    </div>
  );
}
