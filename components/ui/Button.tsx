import type { ReactNode } from "react";
import type { ButtonItem, ButtonVariant } from "@/data/types";
import { cn } from "@/lib/cn";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-red-700 text-white hover:bg-red-800",
  light: "bg-white text-ink-2 hover:bg-[#eee]",
  dark: "bg-ink text-white hover:bg-ink-2",
  ghost: "bg-gray-bg text-ink-2 hover:bg-[#e8e8e8] sm:min-w-0",
};

type ButtonProps = {
  href: string;
  variant: ButtonVariant;
  /** Өргөн товч (200px) */
  wide?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({
  href,
  variant,
  wide,
  className,
  children,
}: ButtonProps) {
  const classes = cn(
    // Утсан дээр мөрөө тэнцүү хуваана, 600px-ээс дээш тогтмол өргөнтэй
    "inline-flex h-10 min-w-0 flex-[1_1_140px] cursor-pointer items-center justify-center whitespace-nowrap rounded-btn px-6 text-sm leading-none font-medium transition-[background-color,color,box-shadow] duration-330",
    "sm:min-w-40 sm:flex-initial",
    wide && "sm:min-w-50",
    variants[variant],
    className,
  );

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

export function ButtonRow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex w-full flex-wrap gap-2 sm:w-auto", className)}>
      {children}
    </div>
  );
}

/** Өгөгдлөөс товчны мөр зурна */
export function Buttons({
  items,
  wide,
  className,
}: {
  items: ButtonItem[];
  wide?: boolean;
  className?: string;
}) {
  return (
    <ButtonRow className={className}>
      {items.map((b) => (
        <Button key={b.label} href={b.href} variant={b.variant} wide={wide}>
          {b.label}
        </Button>
      ))}
    </ButtonRow>
  );
}
