"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { ButtonItem } from "@/data/types";
import { cn } from "@/lib/cn";
import { Button, ButtonRow } from "./Button";

/** Курсор товчны ирмэгээс хэдэн px-д ойртоход татаж эхлэх */
const RADIUS = 32;
/** Товчны хамгийн их шилжилт (px) — бага байлгаж, "мэдрэгдэх" төдий */
const MAX_X = 6;
const MAX_Y = 4;
/** Текстийн нэмэлт шилжилт — гүнзгий мэдрэмж */
const LABEL_MAX = 2;
/** Лерп коэффициент: бага байх тусам зөөлөн, удаан */
const EASE = 0.14;
/** Demo loading-ийн үргэлжлэх хугацаа (ms) — жинхэнэ үйлдэл холбогдох хүртэл */
const LOADING_MS = 2000;
/** Loading үеийн текст — утсан дээр багтахаар богино */
const LOADING_TEXT = "Ачаалж байна";

/** Текст ↔ spinner солигдох хөдөлгөөн: хурдан эхэлж зөөлөн тогтоно */
const SWAP = "transition-[opacity,translate,scale,filter] duration-300 ease-out-soft";

type Item = {
  el: HTMLElement;
  label: HTMLElement | null;
  target: { x: number; y: number };
  current: { x: number; y: number };
};

const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

/**
 * `Buttons`-тэй ижил, гэхдээ курсорт бага зэрэг татагддаг (magnetic) товчнууд.
 * Зөвхөн хулгана/trackpad-тай төхөөрөмж дээр, reduced-motion унтраалттай үед ажиллана.
 */
export function MagneticButtons({
  items,
  wide,
  className,
}: {
  items: ButtonItem[];
  wide?: boolean;
  className?: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  /** Primary товч: шилжихийн оронд 2 сек loading үзүүлээд хэвэндээ орно */
  const onPrimaryClick = (e: MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    if (loading) return;
    setLoading(label);
    timer.current = window.setTimeout(() => setLoading(null), LOADING_MS);
  };

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;

    const magnets: Item[] = Array.from(row.querySelectorAll<HTMLElement>("a")).map((el) => ({
      el,
      label: el.querySelector<HTMLElement>("[data-magnetic-label]"),
      target: { x: 0, y: 0 },
      current: { x: 0, y: 0 },
    }));

    let frame = 0;

    const tick = () => {
      let moving = false;
      for (const m of magnets) {
        m.current.x += (m.target.x - m.current.x) * EASE;
        m.current.y += (m.target.y - m.current.y) * EASE;
        if (Math.abs(m.target.x - m.current.x) < 0.01 && Math.abs(m.target.y - m.current.y) < 0.01) {
          m.current = { ...m.target };
        } else {
          moving = true;
        }
        m.el.style.transform = `translate3d(${m.current.x}px, ${m.current.y}px, 0)`;
        if (m.label) {
          const lx = (m.current.x / MAX_X) * LABEL_MAX;
          const ly = (m.current.y / MAX_Y) * LABEL_MAX;
          m.label.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
        }
      }
      frame = moving ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      // Курсорт хамгийн ойр (RADIUS дотор) нэг л товчийг татна — хөрш товчнууд зэрэг хөдлөхгүй
      let nearest: { m: Item; dx: number; dy: number; hw: number; hh: number } | null = null;
      let best = RADIUS;

      for (const m of magnets) {
        m.target = { x: 0, y: 0 };
        // Одоогийн шилжилтийг хасаж, товчны жинхэнэ байрлалаар тооцно
        const r = m.el.getBoundingClientRect();
        const hw = r.width / 2;
        const hh = r.height / 2;
        const dx = e.clientX - (r.left + hw - m.current.x);
        const dy = e.clientY - (r.top + hh - m.current.y);
        // Товчны ирмэг хүртэлх зай (дотор нь байвал 0)
        const dist = Math.hypot(Math.max(0, Math.abs(dx) - hw), Math.max(0, Math.abs(dy) - hh));
        if (dist <= best) {
          best = dist;
          nearest = { m, dx, dy, hw, hh };
        }
      }

      if (nearest) {
        const { m, dx, dy, hw, hh } = nearest;
        m.target = { x: clamp((dx / hw) * MAX_X, MAX_X), y: clamp((dy / hh) * MAX_Y, MAX_Y) };
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      for (const m of magnets) m.target = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      for (const m of magnets) {
        m.el.style.transform = "";
        if (m.label) m.label.style.transform = "";
      }
    };
  }, []);

  return (
    <ButtonRow ref={rowRef} className={className}>
      {items.map((b) => {
        const isPrimary = b.variant === "primary";
        const busy = loading === b.label;
        return (
          <Button
            key={b.label}
            href={b.href}
            variant={b.variant}
            wide={wide}
            onClick={isPrimary ? (e) => onPrimaryClick(e, b.label) : undefined}
            aria-busy={busy || undefined}
            aria-disabled={busy || undefined}
            className={cn(
              "will-change-transform",
              isPrimary &&
                "relative overflow-hidden transition-[background-color,color,box-shadow,scale] duration-300 active:scale-[0.97]",
              // Идэвхгүй мэт: өнгөө алдалгүй гүн улаан болж "дотогш дарагдана", hover/дарах үйлдэл унтарна
              busy && "pointer-events-none bg-red-900 text-white/65 shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)]",
            )}
          >
            {/* Ажиллаж байгааг илтгэх зөөлөн гэрлийн туяа */}
            {isPrimary && (
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 transition-opacity duration-300",
                  busy ? "opacity-100" : "opacity-0",
                )}
              >
                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/12 to-transparent" />
              </span>
            )}

            {/* Хоёр төлөв нэг grid нүдэнд давхцана — өргөн нь урьдаас тогтсон тул товч хэмжээгээ өөрчлөхгүй */}
            <span data-magnetic-label className="inline-grid place-items-center">
              <span className={cn("[grid-area:1/1]", SWAP, busy && "-translate-y-2.5 opacity-0 blur-[2px]")}>
                {b.label}
              </span>

              {isPrimary && (
                <span
                  aria-hidden
                  className={cn(
                    "flex items-center gap-2 [grid-area:1/1]",
                    SWAP,
                    busy ? "delay-75" : "translate-y-2.5 opacity-0 blur-[2px]",
                  )}
                >
                  <span className="size-3.5 shrink-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent_15%,currentColor)] [animation-duration:700ms] [mask:radial-gradient(farthest-side,transparent_calc(100%-1.5px),#000_calc(100%-1.5px))]" />
                  {LOADING_TEXT}
                </span>
              )}
            </span>
          </Button>
        );
      })}

      {/* Дэлгэц уншигчид мэдэгдэнэ */}
      <span role="status" className="sr-only">
        {loading ? `${LOADING_TEXT}…` : ""}
      </span>
    </ButtonRow>
  );
}
