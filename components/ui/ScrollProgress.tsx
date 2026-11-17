/**
 * Header-ийн доод ирмэгт хуудас хэр зэрэг гүйлгэгдсэнийг харуулах 2px шугам.
 * JS-гүй: CSS scroll-driven animation (`animation-timeline: scroll()`) — гүйлгэлттэй frame бүрт яг таарна.
 * Дэмждэггүй хөтөч дээр (одоогоор Firefox) огт харагдахгүй — хуудас өөрчлөгдөхгүй.
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden
      className="scroll-progress pointer-events-none fixed inset-x-0 top-[calc(var(--header-h)-2px)] z-51 h-0.5 bg-ink/80"
    />
  );
}
