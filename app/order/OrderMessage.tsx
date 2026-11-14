import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button, ButtonRow } from "@/components/ui/Button";

/** Захиалгын амжилт/алдааны хуудасны нийтлэг бүтэц */
export function OrderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex min-h-[60dvh] items-center justify-center px-(--gutter) py-16">
        <div className="w-full max-w-[520px] text-center">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function OrderMessage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <h1 className="font-display text-[32px]/10 font-medium tracking-[-.5px] text-ink md:text-[40px]/12">{title}</h1>
      <div className="mt-4 text-[17px]/7 text-ink-3">{children}</div>
      <ButtonRow className="mt-8 justify-center">
        <Button href="/" variant="dark">
          Нүүр хуудас
        </Button>
      </ButtonRow>
    </>
  );
}
