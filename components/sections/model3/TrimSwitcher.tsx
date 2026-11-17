"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Trim } from "@/data/model3";
import { StatList } from "./StatList";

/*
 * Morphing pill: зүүн, баруун ирмэгийг тусад нь анимейшн хийнэ.
 * Явах чиглэлийн ирмэг хурдан (LEAD), ард талын ирмэг удаан + саатал (TRAIL) →
 * pill эхлээд сунаж, дараа нь шинэ байрандаа агшина.
 */
const CURVE = "cubic-bezier(0.32, 0.72, 0, 1)";
const LEAD = `280ms ${CURVE}`;
const TRAIL = `440ms ${CURVE} 50ms`;

/** Хувилбаруудыг нэг нэгээр харуулах хэсэг + доод талын morphing tab цэс */
export function TrimSwitcher({ trims }: { trims: Trim[] }) {
  const [active, setActive] = useState(0);
  const prev = useRef(0);
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  /** Pill-ийг идэвхтэй tab-ийн байрлалд тавина */
  const place = (index: number, animate: boolean) => {
    const bar = barRef.current;
    const pill = pillRef.current;
    const tab = tabRefs.current[index];
    if (!bar || !pill || !tab) return;

    const left = tab.offsetLeft;
    const right = bar.clientWidth - (tab.offsetLeft + tab.offsetWidth);
    const toRight = index > prev.current;

    pill.style.transition = animate
      ? toRight
        ? `right ${LEAD}, left ${TRAIL}`
        : `left ${LEAD}, right ${TRAIL}`
      : "none";
    pill.style.left = `${left}px`;
    pill.style.right = `${right}px`;
  };

  // Сонголт өөрчлөгдөхөд — paint-аас өмнө байрлуулж, анивчихаас сэргийлнэ
  useLayoutEffect(() => {
    place(active, prev.current !== active);
    prev.current = active;
  }, [active]);

  // Фонт ачаалагдах, цонхны хэмжээ өөрчлөгдөхөд анимейшнгүй дахин байрлуулна
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const ro = new ResizeObserver(() => place(prev.current, false));
    ro.observe(bar);
    return () => ro.disconnect();
  }, []);

  const select = (i: number) => {
    const next = (i + trims.length) % trims.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: trims.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key]);
    }
  };

  const trim = trims[active];

  return (
    <div>
      {/* Сонгогдсон хувилбар */}
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="mx-auto flex min-h-[300px] max-w-[880px] flex-col items-center justify-center rounded-card bg-white px-6 py-12 text-center md:min-h-[340px] md:px-14 md:py-16"
      >
        {/* key солигдоход дотоод агуулга шинээр mount болж анимейшн дахин тоглоно */}
        <div key={active} className="w-full">
          <p className="animate-fade-up text-sm font-medium text-ink-3">{trim.drive}</p>
          <h3 className="animate-fade-up mt-2 font-display text-[28px]/9 font-medium [animation-delay:40ms] sm:text-[36px]/11">
            {trim.name}
          </h3>
          <StatList
            stats={trim.stats}
            className="mx-auto mt-10 max-w-[620px] text-center md:mt-12 [&>div]:animate-fade-up [&>div:nth-child(2)]:[animation-delay:80ms] [&>div:nth-child(3)]:[animation-delay:140ms] [&>div:first-child]:[animation-delay:20ms]"
          />
        </div>
      </div>

      {/* Morphing tab цэс */}
      <div className="mt-10 flex justify-center md:mt-12">
        <div
          ref={barRef}
          role="tablist"
          aria-label="Model 3 хувилбарууд"
          onKeyDown={onKeyDown}
          className="relative flex max-w-full rounded-full bg-black/[.06] p-1 backdrop-blur-md"
        >
          <span
            ref={pillRef}
            aria-hidden
            className="absolute inset-y-1 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,.08),0_4px_12px_rgba(0,0,0,.06)]"
          />
          {trims.map((t, i) => (
            <button
              key={t.tab}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              className="relative z-1 h-10 cursor-pointer rounded-full px-4 text-sm font-medium whitespace-nowrap text-ink-3 transition-colors duration-300 hover:text-ink aria-selected:text-ink sm:px-6"
            >
              {t.tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
