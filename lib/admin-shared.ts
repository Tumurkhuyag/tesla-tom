import type { ButtonVariant } from "@/data/types";

/** Admin форм болон server action хоёуланд хэрэглэгдэх тогтмолууд */

export const IMAGE_BUCKET = "product-images";

/** Upload хийсэн зургийн нийтийн URL-ийн эхлэл (Supabase Storage) */
export const STORAGE_IMAGE_PREFIX = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${IMAGE_BUCKET}/`;

// next.config.ts-ийн images.remotePatterns-тэй таарах ёстой, эс бөгөөс нүүр хуудасны зураг эвдэрнэ
export const ALLOWED_IMAGE_PREFIXES = [
  "https://digitalassets.tesla.com/tesla-contents/image/upload/",
  STORAGE_IMAGE_PREFIX,
];

export const isAllowedImageUrl = (url: string) => ALLOWED_IMAGE_PREFIXES.some((prefix) => url.startsWith(prefix));

/** Upload-ын хязгаар (Supabase bucket-ийн тохиргоотой таарна) */
export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export const BUTTON_VARIANTS: ButtonVariant[] = ["primary", "light", "dark", "ghost"];
export const MAX_BUTTONS = 3;

export type FormState = { status: "idle" } | { status: "error"; message: string } | { status: "saved"; at: string };
