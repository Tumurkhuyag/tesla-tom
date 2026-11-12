import type { LinkItem } from "./types";

const T = "https://www.tesla.com";

/** Header дээр ил харагдах үндсэн холбоосууд */
export const navLinks: LinkItem[] = [
  { label: "Model 3", href: `${T}/model3` },
  { label: "Model Y", href: `${T}/modely` },
  { label: "Cybertruck", href: `${T}/cybertruck` },
  { label: "Model S", href: `${T}/models` },
  { label: "Model X", href: `${T}/modelx` },
  { label: "Robotaxi", href: `${T}/robotaxi` },
];

/** Mobile цэсний холбоосууд */
export const mobileLinks: LinkItem[] = [
  ...navLinks,
  { label: "Тусламж", href: `${T}/support` },
  { label: "Миний бүртгэл", href: `${T}/teslaaccount` },
  { label: "Монгол · Монгол хэл", href: "#" },
];
