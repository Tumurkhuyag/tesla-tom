export type LinkItem = { label: string; href: string };

export type ButtonVariant = "primary" | "light" | "dark" | "ghost";
export type ButtonItem = LinkItem & { variant: ButtonVariant };

export type HeroSlideItem = {
  image: string;
  alt: string;
  /** Гарчиг текст эсвэл лого зураг */
  title?: string;
  logo?: { src: string; alt: string };
  sub?: LinkItem;
  buttons: ButtonItem[];
};

export type ProductCardItem = {
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  sub?: { text: string; href?: string; footnote?: number };
  buttons: ButtonItem[];
};

export type PromoItem = {
  title: string;
  description: string;
  cta: LinkItem;
  image: string;
  alt: string;
  imageStyle: "float" | "side";
};
