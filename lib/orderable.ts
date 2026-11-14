/**
 * Byl-ээр захиалж болох бүтээгдэхүүнүүд. Түлхүүр нь Byl дээрх үнийн lookup key.
 * Картын товчны холбоос `/order/<lookup key>` хэлбэртэй байна (жш: /order/model_y_l_deposit).
 * Энд бүртгэлгүй key-ээр checkout үүсгэхгүй.
 */
export const ORDERABLE = {
  model_y_l_deposit: { title: "Model Y L Premium — урьдчилсан захиалга" },
} as const satisfies Record<string, { title: string }>;

export type OrderableKey = keyof typeof ORDERABLE;

export const isOrderableKey = (key: string): key is OrderableKey => Object.hasOwn(ORDERABLE, key);

/** Энэ замаар эхэлсэн товч POST form болж рендерлэгдэнэ (components/ui/Button.tsx) */
export const ORDER_PATH_PREFIX = "/order/";
