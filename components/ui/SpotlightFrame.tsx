"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Гэрэлтсэн хүрээний радиус (px) — том, зөөлөн байх тусам тансаг */
const RADIUS = 420;
/** Гэрэлгүй хэсгийн харанхуйлалт (0–1) */
const DIM = 0.42;
/** Курсорыг дагах лерп — бага байх тусам гэрэл "хоцорч" зөөлөн гулсана */
const EASE = 0.12;

/**
 * Зураг дээр курсорыг дагасан зөөлөн spotlight.
 * Курсорын эргэн тойрон байгалийн өнгөөрөө, бусад хэсэг нь бага зэрэг харанхуйлна.
 * Hover байхгүй (мэдрэгчтэй) төхөөрөмж дээр Tailwind-ийн `hover:` ажиллахгүй тул зураг хэвээрээ.
 */
export function SpotlightFrame({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduced ? 1 : EASE;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let frame = 0;

    const apply = () => {
      el.style.setProperty("--sx", `${cur.x}px`);
      el.style.setProperty("--sy", `${cur.y}px`);
    };

    const tick = () => {
      cur.x += (target.x - cur.x) * ease;
      cur.y += (target.y - cur.y) * ease;
      apply();
      frame =
        Math.abs(target.x - cur.x) > 0.1 || Math.abs(target.y - cur.y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };

    const local = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onEnter = (e: PointerEvent) => {
      // Орж ирсэн цэгээс шууд эхэлнэ — төвөөс "шүүрдэж" ирэхгүй
      Object.assign(target, local(e));
      Object.assign(cur, target);
      apply();
    };

    const onMove = (e: PointerEvent) => {
      Object.assign(target, local(e));
      if (!frame) frame = requestAnimationFrame(tick);
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={cn("group relative", className)}>
      {children}

      {/* Харанхуйлалт: курсорын орчим ил, гадагшаа аажмаар бараан */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle ${RADIUS}px at var(--sx) var(--sy), transparent 0%, transparent 25%, rgba(10,12,16,${DIM}) 100%)`,
        }}
      />
      {/* Дулаан, сул гэрэл — гүн нэмнэ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-700 ease-out group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle ${RADIUS * 0.6}px at var(--sx) var(--sy), rgba(255,248,235,.35), transparent 70%)`,
        }}
      />
    </div>
  );
}
