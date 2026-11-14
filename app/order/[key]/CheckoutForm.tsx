"use client";

import { useActionState } from "react";
import { AlertIcon, ArrowUpRightIcon, LockIcon, SpinnerIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { startCheckout, type CheckoutState } from "../actions";

/**
 * Гол үйлдэл: Byl-ээр төлөх.
 * - Signifier: товч дээр дүн + «гадагш» сум, доор нь цоож — өөр (аюулгүй) хуудас руу шилжинэ гэдгийг илэрхийлнэ.
 * - Constraint: дарсны дараа идэвхгүй болж, давхар checkout үүсэхээс сэргийлнэ.
 * - Feedback: «шилжүүлж байна» төлөв, алдааг тэр дор нь харуулна.
 */
export function CheckoutForm({ productKey, amountLabel }: { productKey: string; amountLabel: string }) {
  const [state, formAction, pending] = useActionState<CheckoutState, FormData>(
    startCheckout.bind(null, productKey),
    { status: "idle" },
  );

  return (
    <form action={formAction} className="space-y-3">
      {state.status === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-btn bg-red-50 px-3 py-2.5 text-sm text-red-800">
          <AlertIcon className="mt-px size-4 shrink-0" />
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        aria-describedby="checkout-hint"
        className={cn(
          "inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-btn px-6 text-[15px] font-medium text-white transition-colors duration-330",
          "bg-blue hover:bg-blue-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue",
          "disabled:cursor-wait disabled:opacity-80",
        )}
      >
        {pending ? (
          <>
            <SpinnerIcon className="size-4 animate-spin" />
            Byl руу шилжүүлж байна…
          </>
        ) : (
          <>
            {amountLabel} төлөх
            <ArrowUpRightIcon className="size-4" />
          </>
        )}
      </button>

      <p id="checkout-hint" className="flex items-center justify-center gap-1.5 text-xs/5 text-ink-3">
        <LockIcon className="size-3.5" />
        Byl-ийн аюулгүй төлбөрийн хуудас (byl.mn) нээгдэнэ
      </p>

      <p aria-live="polite" className="sr-only">
        {pending ? "Төлбөрийн хуудас руу шилжүүлж байна" : ""}
      </p>
    </form>
  );
}
