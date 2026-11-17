"use client";

import { useEffect, useRef, type ReactNode, type Ref } from "react";

/**
 * Гарчиг дэлгэцийн "унших бүс"-д (дээрээс 60%) хүрэхэд `data-reveal`-ийг "pending" → "in" болгож,
 * доторх `RevealText`, `.rv-follow`-ийг нэг удаа хөдөлгөнө.
 * Доод ирмэгт орж ирэнгүүт эхлүүлбэл хүн харахаас өмнө дуусчихдаг тул ингэж хойшлуулсан.
 *
 * - Аль хэдийн дээгүүр өнгөрсөн (anchor-оор үсэрсэн, дундаас нь reload хийсэн) гарчиг → "skip": шууд харагдана.
 * - `immediate`: hero шиг дэлгэцийн эхэнд байгаа бол фонт ачаалагдсаны дараа шууд тоглоно.
 * Нуух төлөв нь CSS-д `@media (scripting: enabled)` дотор тул JS-гүй орчинд текст шууд харагдана.
 */
export function Reveal({
  as: Tag = "header",
  immediate,
  className,
  children,
}: {
  as?: "header" | "div";
  immediate?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = (state: "in" | "skip") => (el.dataset.reveal = state);

    if (immediate) {
      // Фонт солигдох үед үсэг үсрэхээс сэргийлж, фонт бэлэн болсны дараа эхэлнэ
      let alive = true;
      document.fonts.ready.then(() => alive && requestAnimationFrame(() => set("in")));
      return () => {
        alive = false;
      };
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) set("in");
        else if (entry.boundingClientRect.bottom < 0) set("skip");
        else return;
        io.disconnect();
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return (
    <Tag ref={ref as Ref<HTMLDivElement>} data-reveal="pending" className={className}>
      {children}
    </Tag>
  );
}
