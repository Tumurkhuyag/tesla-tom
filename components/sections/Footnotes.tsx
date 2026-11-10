import { footnotes } from "@/data/home";

export function Footnotes() {
  return (
    <div className="mx-auto mt-16 max-w-[1520px] space-y-4 px-(--gutter) text-xs/5 text-ink-3">
      {footnotes.map((text, i) => (
        <p key={i}>
          <sup className="text-[8px]">{i + 1}</sup> {text}
        </p>
      ))}
    </div>
  );
}
