import { twMerge } from "tailwind-merge";

/** Tailwind ангиудыг нэгтгэнэ — зөрчилдөх үед сүүлийнх нь давамгайлна. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}
