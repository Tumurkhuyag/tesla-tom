import Image, { type StaticImageData } from "next/image";
import type { ComponentType } from "react";

type IconProps = { className?: string };

export type VehicleStat = { value: string; unit: string; label: string };
export type VehicleSpec = { icon: ComponentType<IconProps>; label: string; value: string };

export type VehicleSpecCardProps = {
  image: StaticImageData | string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  stats: VehicleStat[];
  specs: VehicleSpec[];
  /** primary = гол үйлдэл (дүүрэн), secondary = хоёрдогч (хүрээтэй) */
  buttons: { label: string; href: string; variant: "primary" | "secondary" }[];
};

const buttonVariants = {
  primary: "bg-[#0f5a3c] text-white shadow-[0_4px_10px_rgba(15,90,60,.18)] hover:bg-[#0b4830]",
  secondary: "bg-white text-[#0f5a3c] ring-1 ring-inset ring-[#0f5a3c] hover:bg-[#eef6f1]",
};

/**
 * Загварын дэлгэрэнгүй карт (зураг, гол үзүүлэлт, техник үзүүлэлт, 2 товч).
 * Хэмжээ нь 440px өргөнтэй эх дизайны пропорцоор (2x screenshot-ыг 2-т хуваасан).
 */
export function VehicleSpecCard({ image, alt, eyebrow, title, subtitle, stats, specs, buttons }: VehicleSpecCardProps) {
  return (
    // Хөдөлгөөн: hover үед карт өргөгдөж, зураг бага зэрэг томорно (reduced-motion үед унтарна)
    <article className="group w-full max-w-[440px] overflow-hidden rounded-[12px] border border-[#e3e6ea] bg-white shadow-[0_1px_3px_rgba(16,24,40,.06),0_8px_24px_rgba(16,24,40,.06)] transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_2px_6px_rgba(16,24,40,.08),0_16px_40px_rgba(16,24,40,.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[5/3] overflow-hidden bg-[#d9dcdf]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 472px) 100vw, 440px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          priority
        />
      </div>

      <div className="px-6 pt-6 pb-6 text-[#1b2333]">
        <p className="text-[13px]/5 font-semibold tracking-[.1em] text-[#1e7a4b] uppercase">{eyebrow}</p>
        {/* Хэмжээ + тодрол: 32 → 22 → 15 → 12px шатлалын оргил */}
        <h2 className="mt-1 text-[32px]/9 font-bold tracking-[-.5px]">{title}</h2>
        {subtitle && <p className="mt-1 text-base/6 text-[#4a5160]">{subtitle}</p>}

        {/* Common Region: гол 3 үзүүлэлтийг нэг дэвсгэр дотор бүлэглэнэ */}
        {/* Тэгш 3 багана, голлуулсан, нэг мөр тайлбар, нимгэн хуваагчтай — жигд эгнээ үүсгэнэ */}
        <dl className="mt-8 grid grid-cols-3 divide-x divide-[#dfe2e6] rounded-[10px] bg-[#f4f6f8] py-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center px-2 text-center">
              <dt className="order-2 mt-1 text-xs/4 text-balance text-[#5f6672]">{s.label}</dt>
              <dd className="order-1 flex items-baseline gap-1">
                <span className="text-[22px]/7 font-semibold">{s.value}</span>
                <span className="text-sm text-[#8a909a]">{s.unit}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Uniform Connectedness: мөр бүр label-ийг утгатай нь холбож, хэвтээ зураас мөрүүдийг салгана */}
        <dl className="mt-5 divide-y divide-[#e6e8eb]">
          {specs.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5 py-3">
              <Icon className="size-5 shrink-0 text-[#1b2333]" />
              <dt className="text-[13px]/5 text-[#5f6672]">{label}</dt>
              <dd className="ml-auto text-right text-[15px]/5 font-medium tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {buttons.map((b) => (
            <a
              key={b.label}
              href={b.href}
              className={`flex h-10 items-center justify-center rounded-[12px] px-3 text-[15px] font-semibold whitespace-nowrap transition-colors ${buttonVariants[b.variant]}`}
            >
              {b.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ---------- Техник үзүүлэлтийн дүрсүүд ----------
   Similarity: бүгд ижил 24px, 1.5px зузаантай шугаман хэв маягтай (дүүргэлтгүй) */

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Дээрээс харсан 2 тэнхлэг, урд дугуйнууд хөтлөгч */
export function DrivetrainIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <rect x="3" y="3.5" width="3" height="6" rx="1" />
      <rect x="18" y="3.5" width="3" height="6" rx="1" />
      <rect x="3" y="14.5" width="3" height="6" rx="1" />
      <rect x="18" y="14.5" width="3" height="6" rx="1" />
      <path d="M6 6.5h12M6 17.5h12M12 6.5v11" />
    </svg>
  );
}

export function SeatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <path d="M6.5 3.5h2a1 1 0 0 1 1 1V13H16a2 2 0 0 1 2 2v1.5H8.5a2 2 0 0 1-2-2z" />
      <path d="M9 16.5v4M16 16.5v4" />
    </svg>
  );
}

export function CargoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
    </svg>
  );
}

/** Дээрээс харсан машин, хажуугийн хаалганууд нээлттэй */
export function DoorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <rect x="7.5" y="2.5" width="9" height="19" rx="3" />
      <path d="M9.5 7.5q2.5-1 5 0M9.5 17q2.5 1 5 0" />
      <path d="M7.5 9.5L4 8M16.5 9.5L20 8" />
    </svg>
  );
}

/** Хайрцаг + доод талын хэмжээсийн шугам */
export function DimensionsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <path d="M12 2.5l7 4v8L12 18.5l-7-4v-8z" />
      <path d="M5 6.5l7 4 7-4M12 10.5v8" />
      <path d="M3 18l9 4.5 9-4.5" strokeDasharray="1.5 2" />
    </svg>
  );
}
