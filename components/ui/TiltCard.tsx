"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Том зураг дээр 3D tilt: өнцөг бага байх тусам тансаг (жижиг картанд 10–15°, өргөн баннерт 3–5°).
 */
/** Хамгийн их хазайлт (градус) */
const MAX_DEG = 4;
/** Hover үед бага зэрэг өргөгдөх */
const LIFT = 0.015;
/** Доторх зургийн эсрэг чиглэлийн шилжилт (px) — гүний мэдрэмж */
const PARALLAX = 14;
/** Лерп — бага байх тусам зөөлөн, "хүнд" мэдрэмжтэй */
const EASE = 0.09;

/**
 * Курсорыг дагаж 3D-ээр хазайдаг карт. Курсор доорх хэсэг "дарагдаж" холддог,
 * дотор нь зураг эсрэг тийш бага зэрэг гулсаж (parallax), гялбаа курсорыг дагана.
 * Хулгана/trackpad-гүй эсвэл reduced-motion асаалттай үед хөдөлгөөнгүй, энгийн зураг.
 */
export function TiltCard({
  className,
  cardClassName,
  children,
}: {
  className?: string;
  /** Картын хэмжээ (aspect гэх мэт) */
  cardClassName?: string;
  /** Зураг — карт дүүргэх (`fill`) байдлаар */
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;

    // x, y: -1…1 (картын төвөөс), h: hover-ийн хэмжээ 0…1
    const target = { x: 0, y: 0, h: 0 };
    const cur = { x: 0, y: 0, h: 0 };
    let frame = 0;

    const tick = () => {
      let moving = false;
      for (const k of ["x", "y", "h"] as const) {
        cur[k] += (target[k] - cur[k]) * EASE;
        if (Math.abs(target[k] - cur[k]) < 0.001) cur[k] = target[k];
        else moving = true;
      }
      el.style.setProperty("--tx", cur.x.toFixed(4));
      el.style.setProperty("--ty", cur.y.toFixed(4));
      el.style.setProperty("--th", cur.h.toFixed(4));
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // Хазайгаагүй гадна элементээс хэмжинэ — тойм тогтвортой
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      target.h = 1;
      run();
    };
    const onLeave = () => {
      target.x = target.y = target.h = 0;
      run();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  const vars = { "--tx": 0, "--ty": 0, "--th": 0 } as CSSProperties;

  return (
    <div ref={ref} style={vars} className={cn("[perspective:1400px]", className)}>
      <div
        className={cn("relative overflow-hidden rounded-card will-change-transform", cardClassName)}
        style={{
          transform: `rotateX(calc(var(--ty) * ${-MAX_DEG}deg)) rotateY(calc(var(--tx) * ${MAX_DEG}deg)) scale(calc(1 + var(--th) * ${LIFT}))`,
          boxShadow: `calc(var(--tx) * -14px) calc(18px + var(--ty) * -10px) 48px -12px rgb(0 0 0 / calc(var(--th) * 0.28))`,
        }}
      >
        {/* Parallax давхарга: hover үед бага зэрэг томорч, курсорын эсрэг гулсана */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate3d(calc(var(--tx) * var(--th) * ${-PARALLAX}px), calc(var(--ty) * var(--th) * ${-PARALLAX}px), 0) scale(calc(1 + var(--th) * 0.06))`,
          }}
        >
          {children}
        </div>

        {/* Гялбаа: курсорын байрлалд зөөлөн цагаан гэрэл */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            opacity: "var(--th)",
            background:
              "radial-gradient(circle at calc(50% + var(--tx) * 50%) calc(50% + var(--ty) * 50%), rgb(255 255 255 / 0.55), transparent 55%)",
          }}
        />
      </div>
    </div>
  );
}
