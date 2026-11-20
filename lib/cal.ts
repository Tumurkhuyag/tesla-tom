import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Cal.com webhook (https://cal.com/docs/developing/guides/automation/webhooks) — зөвхөн server талд.
 * CAL_WEBHOOK_SECRET нь Cal.com → Settings → Developer → Webhooks дээр тохируулсан secret.
 */

function secret() {
  const value = process.env.CAL_WEBHOOK_SECRET;
  if (!value) throw new Error("CAL_WEBHOOK_SECRET орчны хувьсагч тохируулагдаагүй байна (.env.local).");
  return value;
}

/** `X-Cal-Signature-256` header-ийг түүхий body-ийн HMAC-SHA256 (hex)-тэй тогтмол хугацаанд харьцуулна */
export function verifyCalSignature(rawBody: string, signature: string | null) {
  if (!signature) return false;
  const expected = Buffer.from(createHmac("sha256", secret()).update(rawBody).digest("hex"));
  const received = Buffer.from(signature.trim());
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export type CalWebhookEvent = {
  triggerEvent: string;
  createdAt: string;
  payload: {
    uid?: string;
    startTime?: string;
    /** Booking question-ийн хариултууд. Шинэ хувилбарт `{ label, value }`, хуучинд шууд утга */
    responses?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  };
};

/** Booking question-ийн хариултыг (`responses.order` эсвэл `metadata.order`) текст болгож авна */
export function calField(payload: CalWebhookEvent["payload"], key: string): string | null {
  const raw = payload.responses?.[key];
  const value = raw && typeof raw === "object" && "value" in raw ? (raw as { value: unknown }).value : raw;
  if (typeof value === "string" && value) return value;
  const meta = payload.metadata?.[key];
  return typeof meta === "string" && meta ? meta : null;
}
