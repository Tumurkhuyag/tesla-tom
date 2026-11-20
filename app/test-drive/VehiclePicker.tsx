"use client";

import Image from "next/image";
import { useActionState, useState, type ReactNode } from "react";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import type { TestDriveVehicle } from "@/lib/product-cards";
import { startTestDriveCheckout, type CheckoutState } from "../order/actions";
import { PayButton } from "../order/[key]/CheckoutForm";

/**
 * Машин сонгох radio-card жагсаалт + төлбөрийн товч.
 * - Constraint: машин сонгоогүй үед төлөх товч идэвхгүй.
 * - Feedback: сонгосон картыг хүрээ + чагтаар тодруулна.
 */
export function VehiclePicker({
  vehicles,
  initial,
  amountLabel,
  children,
}: {
  vehicles: TestDriveVehicle[];
  initial: string | null;
  amountLabel: string;
  children?: ReactNode;
}) {
  const [selected, setSelected] = useState(initial ?? (vehicles.length === 1 ? vehicles[0].title : null));
  const [state, formAction, pending] = useActionState<CheckoutState, FormData>(startTestDriveCheckout, {
    status: "idle",
  });

  return (
    <form action={formAction} className="mt-6 space-y-5">
      <fieldset>
        <legend className="text-sm font-medium text-ink">Машинаа сонгоно уу</legend>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {vehicles.map((v) => {
            const checked = selected === v.title;
            return (
              <label
                key={v.title}
                className={cn(
                  "relative flex cursor-pointer flex-col overflow-hidden rounded-btn border bg-white transition-colors duration-330",
                  "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-blue",
                  checked ? "border-ink ring-1 ring-ink" : "border-line hover:border-ink-3",
                )}
              >
                <input
                  type="radio"
                  name="vehicle"
                  value={v.title}
                  checked={checked}
                  onChange={() => setSelected(v.title)}
                  required
                  className="sr-only"
                />
                <span className="relative aspect-[16/9] bg-[#eef1f4]">
                  <Image src={v.image} alt={v.alt} fill sizes="(min-width: 640px) 260px, 100vw" className="object-cover" />
                </span>
                <span className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm font-medium text-ink">
                  {v.title}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-5 place-items-center rounded-full border",
                      checked ? "border-ink bg-ink text-white" : "border-line",
                    )}
                  >
                    {checked && <CheckIcon className="size-3" />}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {children}

      <div className="space-y-3">
        <PayButton state={state} pending={pending} amountLabel={amountLabel} disabled={!selected} />
      </div>
    </form>
  );
}
