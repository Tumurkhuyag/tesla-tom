"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SpinnerIcon } from "@/components/icons";

const INTERVAL_MS = 3000;
const MAX_TRIES = 20; // ~1 минут

/**
 * Webhook ирэхийг хүлээх зуур хуудсыг өөрөө шинэчилнэ (Feedback).
 * Хэрэглэгч «Refresh дар» гэсэн заавар дагах шаардлагагүй.
 */
export function StatusPoller() {
  const router = useRouter();
  const [tries, setTries] = useState(0);
  const gaveUp = tries >= MAX_TRIES;

  useEffect(() => {
    if (gaveUp) return;
    const t = setTimeout(() => {
      router.refresh();
      setTries((n) => n + 1);
    }, INTERVAL_MS);
    return () => clearTimeout(t);
  }, [tries, gaveUp, router]);

  return (
    <p role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-ink-3">
      {gaveUp ? (
        <>Баталгаажуулалт удаж байна. Таны төлбөр орсон бол имэйлээр баримт очно — хуудсыг дараа нь дахин нээж болно.</>
      ) : (
        <>
          <SpinnerIcon className="size-4 animate-spin" />
          Byl-ээс баталгаажуулалт хүлээж байна…
        </>
      )}
    </p>
  );
}
