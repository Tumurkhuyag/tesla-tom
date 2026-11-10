"use client";

import { useMemo, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

/* ---------------------------------------------------------
   CSS хувьсагчийг browser-оос шууд уншина.
   globals.css өөрчлөгдвөл энэ хуудас автоматаар шинэчлэгдэнэ.
   --------------------------------------------------------- */

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

/** :root дээрх CSS хувьсагчийн одоогийн утга (дэлгэцийн өргөнөөс хамаарч өөрчлөгдөж болно) */
export function useCssVar(name: string) {
  return useSyncExternalStore(
    subscribe,
    () => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || null,
    () => null,
  );
}

/** Ямар ч CSS өнгийг (hex, oklch...) canvas-аар дамжуулан RGB болгоно */
function toRgb(color: string): [number, number, number] | null {
  const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.fillStyle = "#000";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

const hex = (rgb: [number, number, number]) => "#" + rgb.map((c) => c.toString(16).padStart(2, "0")).join("");

/** WCAG харьцаа — цагаан дэвсгэртэй харьцуулна */
function contrastOnWhite([r, g, b]: [number, number, number]) {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return 1.05 / (L + 0.05);
}

type ColorSwatchProps = {
  /** CSS хувьсагч (жишээ нь --color-ink) */
  token?: string;
  /** Токен биш, кодонд шууд бичигдсэн өнгө */
  value?: string;
  label?: string;
  description: string;
};

export function ColorSwatch({ token, value, label, description }: ColorSwatchProps) {
  const live = useCssVar(token ?? "--__none");
  // Сервер дээр null — өнгийг зөвхөн browser дээр (canvas-аар) тооцоолно
  const onClient = useSyncExternalStore(subscribe, () => true, () => false);
  const color = !onClient ? null : token ? live : (value ?? null);

  const info = useMemo(() => {
    if (!color) return null;
    const rgb = toRgb(color);
    if (!rgb) return null;
    return { hex: hex(rgb), ratio: contrastOnWhite(rgb) };
  }, [color]);

  return (
    <div>
      <div
        className="h-16 rounded-btn shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]"
        style={{ background: token ? `var(${token})` : value }}
      />
      <p className="mt-2 font-mono text-[11px] font-semibold text-ink">{label ?? token}</p>
      <p className="font-mono text-xs text-ink-3">
        {info ? `${info.hex} · ${info.ratio.toFixed(1)}:1` : "…"}
      </p>
      <p className="mt-0.5 text-xs/5 text-ink-3">{description}</p>
    </div>
  );
}

/** CSS хувьсагчийн одоогийн утгыг текстээр харуулна */
export function CssVarValue({ name, className }: { name: string; className?: string }) {
  const v = useCssVar(name);
  return <span className={cn("font-mono", className)}>{v ?? "…"}</span>;
}
