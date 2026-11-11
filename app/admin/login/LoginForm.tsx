"use client";

import { useActionState } from "react";
import type { FormState } from "@/lib/admin-shared";
import { signIn } from "../actions";
import { inputClass, labelClass, primaryButtonClass } from "../ui";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(signIn, { status: "idle" });

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className={labelClass}>
          Имэйл
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Нууц үг
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className={`${primaryButtonClass} w-full`}>
        {pending ? "Нэвтэрч байна…" : "Нэвтрэх"}
      </button>
    </form>
  );
}
