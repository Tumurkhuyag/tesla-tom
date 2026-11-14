/**
 * Byl-ээр захиалж болох бүтээгдэхүүнүүд. Түлхүүр нь Byl дээрх үнийн lookup key.
 * Картын товчны холбоос `/order/<lookup key>` (жш: /order/model_y_l_deposit) нь захиалга шалгах хуудас руу хөтөлнө.
 * Энд бүртгэлгүй key-ээр checkout үүсгэхгүй.
 *
 * `amount` нь зөвхөн харуулахад — бодит төлөх дүнг Byl дээрх үнэ тодорхойлно. Хоёуланг нь ижил байлгана.
 */
export const ORDERABLE = {
  model_y_l_deposit: {
    title: "Model Y L Premium",
    kind: "Урьдчилсан захиалга",
    amount: 3_000_000,
    image:
      "https://grvfenbvzuklxsugjyod.supabase.co/storage/v1/object/public/product-images/vehicle/1-1794314567692.png",
    alt: "Model Y L Premium",
  },
} as const satisfies Record<
  string,
  { title: string; kind: string; amount: number; image: string; alt: string }
>;

export type OrderableKey = keyof typeof ORDERABLE;

export const isOrderableKey = (key: string): key is OrderableKey => Object.hasOwn(ORDERABLE, key);

/** 3000000 → "3,000,000₮" */
export const formatMnt = (amount: number) => `${Math.round(amount).toLocaleString("en-US")}₮`;

/** Захиалгын богино дугаар (uuid-ийн эхний 8 тэмдэгт) — хэрэглэгч ажилтанд хэлэхэд */
export const orderNumber = (id: string) => id.slice(0, 8).toUpperCase();
