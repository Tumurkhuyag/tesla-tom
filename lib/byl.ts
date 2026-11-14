import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Byl API (https://byl.mn/docs/api) — зөвхөн server талд ашиглана.
 * BYL_TOKEN нь төслийн API токен; NEXT_PUBLIC_ угтваргүй тул client bundle-д орохгүй.
 */

const BYL_API = "https://byl.mn/api/v1";

function env(name: "BYL_PROJECT_ID" | "BYL_TOKEN" | "BYL_WEBHOOK_SECRET") {
  const value = process.env[name];
  if (!value) throw new Error(`${name} орчны хувьсагч тохируулагдаагүй байна (.env.local).`);
  return value;
}

export class BylError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: unknown,
  ) {
    super(message);
  }
}

async function bylFetch<T>(path: string, init: { method: "GET" | "POST"; body?: unknown }): Promise<T> {
  const res = await fetch(`${BYL_API}/projects/${env("BYL_PROJECT_ID")}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${env("BYL_TOKEN")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const message = (json as { message?: string } | null)?.message ?? res.statusText;
    throw new BylError(`Byl ${init.method} ${path} → ${res.status}: ${message}`, res.status, json);
  }
  return (json as { data: T }).data;
}

/* ---------- Checkout ---------- */

type CustomField = {
  key: string;
  label: string;
  type: "text" | "numeric" | "dropdown";
  optional?: boolean;
};

export type CreateCheckoutInput = {
  items: { price: string; quantity: number }[];
  client_reference_id: string;
  success_url: string;
  cancel_url: string;
  email_collection?: boolean;
  phone_number_collection?: boolean;
  delivery_address_collection?: boolean;
  custom_fields?: CustomField[];
};

export function createCheckout(input: CreateCheckoutInput) {
  return bylFetch<{ id: number; url: string }>("/checkouts", { method: "POST", body: input });
}

/* ---------- Webhook ---------- */

/** `Byl-Signature` header-ийг түүхий body-ийн HMAC-SHA256 (hex)-тэй тогтмол хугацаанд харьцуулна */
export function verifyBylSignature(rawBody: string, signature: string | null) {
  if (!signature) return false;
  const expected = Buffer.from(createHmac("sha256", env("BYL_WEBHOOK_SECRET")).update(rawBody).digest("hex"));
  const received = Buffer.from(signature.trim());
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export type BylWebhookEvent = {
  id: number;
  project_id: number;
  type: string;
  object: string;
  data: { object: Record<string, unknown> };
  created_at: string;
};

/** `checkout.completed` event-ийн бидэнд хэрэгтэй талбарууд */
export type BylCompletedCheckout = {
  id: number;
  status: string;
  client_reference_id: string | null;
  amount_total: string | number;
  customer_email: string | null;
  phone_number: string | null;
  delivery_address: unknown;
  custom_fields?: { key: string; value: string | null }[];
};
