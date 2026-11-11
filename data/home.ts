import type { HeroSlideItem, LinkItem, PromoItem } from "./types";

const CDN = "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto";
const T = "https://www.tesla.com";

export const heroSlides: HeroSlideItem[] = [
  {
    image: `${CDN}/Homepage-Promo-Roadster-desktop.jpg`,
    alt: "Roadster",
    logo: { src: `${CDN}/Roadster-Logo-Final-Tablet.png`, alt: "Roadster" },
    buttons: [
      { label: "Захиалга өгөх", href: `${T}/roadster/reserve`, variant: "primary" },
      { label: "Learn More", href: `${T}/roadster`, variant: "light" },
    ],
  },
  {
    image: `${CDN}/Homepage-Promo-Model-Y-L-Family-Desktop-NA.jpg`,
    alt: "Model Y family driving along a city lakefront",
    title: "Model Y",
    sub: {
      label: "2.49% APR Available",
      href: `${T}/modely/design?cfg=%24MTY94&modal=finance&financeModalTab=finance_options&id=finplat.AUTO_LOAN%3ALOAN%3ACT_PRIVATE#overview`,
    },
    buttons: [
      { label: "Order Now", href: `${T}/modely/design?cfg=%24MTY61`, variant: "primary" },
      { label: "Learn More", href: `${T}/modely`, variant: "light" },
    ],
  },
  {
    image: `${CDN}/Homepage-Promo-Model-3-Desktop-US.jpg`,
    alt: "Model 3 driving through the desert",
    title: "Model 3",
    sub: {
      label: "1.99% APR Available",
      href: `${T}/model3/design?cfg=%24MT379&id=finplat.AUTO_LOAN%3ALOAN%3ACT_PRIVATE#overview`,
    },
    buttons: [
      { label: "Order Now", href: `${T}/model3/design?cfg=%24MT369`, variant: "primary" },
      { label: "Learn More", href: `${T}/model3`, variant: "light" },
    ],
  },
];

export const promos: PromoItem[] = [
  {
    title: "Current Offers",
    description: "Explore limited-time offers on Tesla vehicles.",
    cta: { label: "Learn More", href: `${T}/current-offers` },
    image: `${CDN}/Homepage-Grid-Current-Offers-All-Devices.png`,
    alt: "Cybertruck, Model Y and Model 3",
    imageStyle: "float",
  },
  {
    title: "2026 Annual Shareholder Meeting",
    description: "The future of Tesla is in your hands. Learn why your vote matters.",
    cta: { label: "Learn More", href: "https://www.votetesla.com/" },
    image: `${CDN}/Homepage-Grid-IR-2026.jpg`,
    alt: "Roadster rear view with thrusters",
    imageStyle: "side",
  },
];

export const footnotes: string[] = [
  "Price reflects monthly subscription, subject to terms and conditions. Price and feature availability subject to change.",
  "Price listed does not include Destination and Order Fees, taxes and other fees. Subject to change. The Model Y L Premium starting price including the Destination and Order fees but excluding taxes and other fees is $63,630.",
];

export const footerLinks: LinkItem[] = [
  { label: "Tesla © 2026", href: `${T}/about` },
  { label: "Privacy & Legal", href: `${T}/legal` },
  { label: "Vehicle Recalls", href: "https://service.tesla.com/en-US/vin-recall-search" },
  { label: "Contact", href: `${T}/contact` },
  { label: "News", href: `${T}/blog` },
  { label: "Get Updates", href: `${T}/updates` },
  { label: "Locations", href: `${T}/findus/list` },
  { label: "Learn", href: `${T}/learn` },
];
