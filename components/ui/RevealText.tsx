import type { CSSProperties } from "react";

/** Үсэг хоорондын хамгийн их саатал (ms) ба бүх үсгийн нийт саатлын дээд хязгаар */
const CHAR_STEP = 30;
const CHAR_TOTAL = 500;
/** Үг хоорондын саатал (ms) ба нийт дээд хязгаар */
const WORD_STEP = 75;
const WORD_TOTAL = 300;

/**
 * Гарчгийг үг, үсэг болгон span-д хувааж, `[data-reveal]` эцгийн төлөвөөр гарч ирэх анимейшнд бэлдэнэ
 * (хөдөлгөөн нь globals.css-ийн `.rv-*` дүрмүүдэд).
 * Урт гарчигт алхмыг багасгаж нийт хугацааг тогтмол байлгана — богино, урт гарчиг ижил хэмнэлтэй.
 * Дэлгэц уншигч бүтэн текстийг уншина, хуваасан хэсгүүд нь `aria-hidden`.
 */
export function RevealText({ text }: { text: string }) {
  const words = text.split(" ");
  const chars = text.replace(/\s/g, "").length;
  const vars = {
    "--cs": `${Math.min(CHAR_STEP, CHAR_TOTAL / chars).toFixed(1)}ms`,
    "--ws": `${Math.min(WORD_STEP, WORD_TOTAL / words.length).toFixed(1)}ms`,
  } as CSSProperties;

  let c = 0;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden style={vars}>
        {words.map((word, w) => (
          <span key={w}>
            {w > 0 && " "}
            <span className="rv-word" style={{ "--w": w } as CSSProperties}>
              {Array.from(word).map((ch, i) => (
                <span key={i} className="rv-char" style={{ "--c": c++ } as CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}
