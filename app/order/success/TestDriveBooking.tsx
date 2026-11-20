"use client";

import { useRef, useState } from "react";
import { CAL_BASE_CONFIG, CAL_LINK, CAL_NAMESPACE } from "@/components/layout/CalEmbed";
import { cn } from "@/lib/cn";
import { StatusPoller } from "./StatusPoller";

type CalApi = (action: "on", args: { action: string; callback: () => void }) => void;
declare global {
  interface Window {
    Cal?: { ns?: Record<string, CalApi> };
  }
}

/**
 * «Цагаа сонгох» → Cal.com pop-up.
 * Сонгосон машин, хэрэглэгчийн мэдээлэл, захиалгын дугаар Cal-ын booking question-д автоматаар бөглөгдөнө.
 * Захиалга амжилттай болмогц Cal webhook ирэх хүртэл хуудсыг шинэчилнэ (Feedback).
 */
export function TestDriveBooking({
  orderId,
  vehicle,
  name,
  email,
  phone,
}: {
  orderId: string;
  vehicle: string;
  name: string | null;
  email: string | null;
  phone: string | null;
}) {
  const [booked, setBooked] = useState(false);

  const config = JSON.stringify({
    ...CAL_BASE_CONFIG,
    car: vehicle,
    order: orderId,
    "metadata[order]": orderId,
    ...(name && { name }),
    ...(email && { email }),
    ...(phone && { attendeePhoneNumber: phone }),
  });

  // Cal скрипт afterInteractive-аар ачаалагддаг тул сонсогчийг товч дарах үед (скрипт бэлэн болсон хойно) нэг удаа бүртгэнэ
  const listening = useRef(false);
  const listen = () => {
    const api = window.Cal?.ns?.[CAL_NAMESPACE];
    if (listening.current || !api) return;
    api("on", { action: "bookingSuccessfulV2", callback: () => setBooked(true) });
    listening.current = true;
  };

  if (booked) return <StatusPoller label="Цаг захиалгыг баталгаажуулж байна…" />;

  return (
    <button
      type="button"
      data-cal-link={CAL_LINK}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-config={config}
      onClick={listen}
      className={cn(
        "inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-btn px-6 text-[15px] font-medium text-white transition-colors duration-330",
        "bg-blue hover:bg-blue-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue",
      )}
    >
      Туршилтын цагаа сонгох
    </button>
  );
}
