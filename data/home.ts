import type { HeroSlideItem, LinkItem, ProductCardItem, PromoItem } from "./types";

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

export const vehicleCards: ProductCardItem[] = [
  {
    image: `${CDN}/Homepage-Card-Model-Y-L-Desktop-US.jpg`,
    alt: "Model Y L",
    eyebrow: "Long Wheelbase Midsize SUV",
    title: "Model Y L Premium",
    sub: { text: "Starting at $61,990", footnote: 2 },
    buttons: [
      { label: "Order Now", href: `${T}/modely/design?cfg=%24MTY83%2C%24PN03`, variant: "primary" },
      { label: "Learn More", href: `${T}/modely#L`, variant: "light" },
    ],
  },
  {
    image: `${CDN}/Homepage-Card-Model-3-Desktop-US_PR_MX.jpg`,
    alt: "White Model 3",
    eyebrow: "Sport Sedan",
    title: "Model 3",
    sub: {
      text: "Lease From $439/mo",
      href: `${T}/model3/design?cfg=%24MT367&id=finplat.AUTO_LEASE%3AOPERATIONAL_LEASE%3ACT_PRIVATE#overview`,
    },
    buttons: [
      { label: "Order Now", href: `${T}/model3/design?cfg=%24MT367`, variant: "primary" },
      { label: "Learn More", href: `${T}/model3`, variant: "light" },
    ],
  },
  {
    image: `${CDN}/Homepage-Vehicle-Card-Model-Y-Desktop-US-Snow.jpg`,
    alt: "Model Y in the snow",
    eyebrow: "Midsize SUV",
    title: "Model Y",
    sub: {
      text: "Lease From $499/mo",
      href: `${T}/modely/design?cfg=%24MTY61&id=finplat.AUTO_LEASE%3AOPERATIONAL_LEASE%3ACT_PRIVATE#overview`,
    },
    buttons: [
      { label: "Order Now", href: `${T}/modely/design`, variant: "primary" },
      { label: "Learn More", href: `${T}/modely#performance`, variant: "light" },
    ],
  },
  {
    image: `${CDN}/Homepage-Card-Cybertruck-Desktop-US_PR_MX.jpg`,
    alt: "Cybertruck",
    eyebrow: "Utility Truck",
    title: "Cybertruck",
    sub: {
      text: "Lease From $1,129/mo",
      href: `${T}/cybertruck/design?cfg=%24MTC07&id=finplat.AUTO_LEASE%3AOPERATIONAL_LEASE%3ACT_PRIVATE#overview`,
    },
    buttons: [
      { label: "Order Now", href: `${T}/cybertruck/design?cfg=%24MTC07`, variant: "primary" },
      { label: "Learn More", href: `${T}/cybertruck`, variant: "light" },
    ],
  },
  {
    image: `${CDN}/Homepage-Vehicle-Card-Roadster-Desktop.jpg`,
    alt: "Roadster",
    eyebrow: "Sports Car",
    title: "Roadster",
    buttons: [
      { label: "Reserve Now", href: `${T}/roadster/reserve`, variant: "primary" },
      { label: "Learn More", href: `${T}/roadster`, variant: "light" },
    ],
  },
  {
    image: `${CDN}/Homepage-Card-Vehicle-CPO-Desktop.jpg`,
    alt: "A row of Certified Pre-Owned Tesla vehicles",
    eyebrow: " ",
    title: "Certified Pre-Owned",
    sub: { text: "Fully inspected, refurbished and road ready with an extended one-year warranty." },
    buttons: [
      { label: "View Inventory", href: `${T}/inventory/used`, variant: "primary" },
      { label: "Learn More", href: `${T}/certified-pre-owned`, variant: "light" },
    ],
  },
];

export const energyCards: ProductCardItem[] = [
  {
    image: `${CDN}/Homepage-Card-Solar-Panels-Desktop-v2.jpg`,
    alt: "Solar Panels installed on a roof",
    title: "Solar Panels",
    sub: { text: "Power Your Home and Reduce Your Electricity Bill" },
    buttons: [
      { label: "Order Now", href: `${T}/energy/design?poi=solarpanels`, variant: "primary" },
      { label: "Learn More", href: `${T}/solarpanels`, variant: "light" },
    ],
  },
  {
    image: `${CDN}/Homepage-Card-Powerwall-Desktop.png`,
    alt: "Powerwall",
    title: "Powerwall",
    sub: { text: "Keep Your Lights On During Outages" },
    buttons: [
      { label: "Order Now", href: `${T}/powerwall/design`, variant: "primary" },
      { label: "Learn More", href: `${T}/powerwall`, variant: "light" },
    ],
  },
  {
    image: `${CDN}/Homepage-Card-Megapack-Desktop-v2.jpg`,
    alt: "Megapack installation in the desert",
    title: "Megapack",
    sub: { text: "Massive Batteries for Massive Energy Support" },
    buttons: [{ label: "Learn More", href: `${T}/megapack`, variant: "light" }],
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
