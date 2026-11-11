import type { Metadata } from "next";
import type { ComponentType, ReactNode } from "react";
import * as Icons from "@/components/icons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MegaCard } from "@/components/layout/MegaMenu";
import { ProductCard } from "@/components/sections/CardCarousel";
import { PromoCard } from "@/components/sections/PromoGrid";
import { SideNav } from "@/components/styleguide/SideNav";
import { ColorSwatch, CssVarValue } from "@/components/styleguide/Token";
import { Code, Panel, SgSection, SpecRow, SubHeading, type SgSectionInfo } from "@/components/styleguide/ui";
import { Button, ButtonRow } from "@/components/ui/Button";
import { promos } from "@/data/home";
import { navMenus } from "@/data/nav";
import { getProductCards } from "@/lib/product-cards";

export const metadata: Metadata = {
  title: "Styleguide | Tesla (clone)",
  description: "Tesla clone сайтын дизайн систем: өнгө, үсэг, зай, хэлбэр, компонент.",
};

const S = {
  principles: { id: "principles", num: "01", title: "Зарчим" },
  brand: { id: "brand", num: "02", title: "Брэнд" },
  colors: { id: "colors", num: "03", title: "Өнгө" },
  type: { id: "typography", num: "04", title: "Үсэг" },
  space: { id: "spacing", num: "05", title: "Зай" },
  shape: { id: "shape", num: "06", title: "Хэлбэр" },
  lines: { id: "lines", num: "07", title: "Шугам" },
  shadow: { id: "shadow", num: "08", title: "Сүүдэр, бүрхүүл" },
  icons: { id: "icons", num: "09", title: "Дүрс" },
  components: { id: "components", num: "10", title: "Компонент" },
  sections: { id: "sections", num: "11", title: "Хэсгүүд" },
} satisfies Record<string, SgSectionInfo>;

const SAMPLE_IMG = "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Card-Model-Y-L-Desktop-US.jpg";

export default function StyleguidePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="px-(--gutter) pt-12">
        {/* ---------- Танилцуулга ---------- */}
        <header className="max-w-[760px] pb-12">
          <p className="text-xs/5 font-medium tracking-[.08em] text-ink-3 uppercase">Styleguide</p>
          <h1 className="mt-2 font-display text-[40px]/12 font-medium tracking-[-.5px] md:text-[56px]/16">
            Tesla clone дизайн систем
          </h1>
          <p className="mt-4 text-xl text-ink-3">
            Сайтын бодит токен, компонентуудын сан. Өнгө болон зайн утгуудыг <Code>app/globals.css</Code>-ээс
            browser дотроо шууд уншдаг тул тэнд өөрчлөлт хийхэд энэ хуудас автоматаар шинэчлэгдэнэ.
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
          <aside className="hidden lg:block">
            <SideNav sections={Object.values(S)} />
          </aside>

          <div className="min-w-0">
            <Principles />
            <Brand />
            <Colors />
            <Typography />
            <Spacing />
            <Shape />
            <Lines />
            <Shadows />
            <IconsSection />
            <ComponentsSection />
            <SectionsList />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* =========================================================
   01 Зарчим
   ========================================================= */
function Principles() {
  const items = [
    {
      title: "Цагаан дэвсгэр, бараан бэх",
      text: "Хуудас цагаан, бичвэр бараан саарал (ink). Өнгийг зөвхөн гол үйлдэлд (улаан товч) хэрэглэнэ.",
    },
    {
      title: "Зураг гол дүр",
      text: "Машины том зургууд хуудсыг дүүргэнэ. Бичвэр зурагнаас gradient бүрхүүл эсвэл сүүдрээр ялгарна.",
    },
    {
      title: "Нэг үсгийн гэр бүл",
      text: "Гарчиг (Display), бичвэр (Text) хоёулаа Inter. Ялгааг хэмжээ, жингээр (400 / 500) гаргана.",
    },
    {
      title: "Тайван хөдөлгөөн",
      text: "Нэг easing (ease-tesla), 0.25–0.8 секунд. Reduced motion үед бүх хөдөлгөөн зогсоно.",
    },
  ];
  return (
    <SgSection info={S.principles}>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((p) => (
          <Panel key={p.title}>
            <h3 className="font-display text-xl font-medium">{p.title}</h3>
            <p className="mt-2 text-[15px]/6 text-ink-3">{p.text}</p>
          </Panel>
        ))}
      </div>
    </SgSection>
  );
}

/* =========================================================
   02 Брэнд
   ========================================================= */
function Brand() {
  const tiles = [
    { label: "Цагаан дээр", note: "text-ink · Header", className: "bg-white text-ink border border-line" },
    { label: "Саарал дээр", note: "text-ink · жишээ", className: "bg-gray-bg text-ink" },
    { label: "Бараан дээр", note: "text-white · жишээ", className: "bg-ink text-white" },
    { label: "Улаан дээр", note: "text-white · жишээ", className: "bg-red-700 text-white" },
  ];
  return (
    <SgSection
      info={S.brand}
      intro={
        <>
          <Code>TeslaLogo</Code> (<Code>components/icons.tsx</Code>) нь <Code>fill=&quot;currentColor&quot;</Code>{" "}
          тул өнгөө эцэг элементээс авна. Сайт дээр зөвхөн Header-т (цагаан дээр, 120 × 12px) хэрэглэгддэг —
          бусад нь өөр дэвсгэр дээр хэрэглэх бол ингэж харагдана гэсэн жишээ.
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label}>
            <div className={`grid h-36 place-items-center rounded-card ${t.className}`}>
              <Icons.TeslaLogo className="h-4 w-40" />
            </div>
            <p className="mt-2 text-sm font-medium">{t.label}</p>
            <p className="font-mono text-xs text-ink-3">{t.note}</p>
          </div>
        ))}
      </div>
    </SgSection>
  );
}

/* =========================================================
   03 Өнгө
   ========================================================= */
function Colors() {
  const base = [
    { token: "--color-white", description: "Хуудасны дэвсгэр, light товч" },
    { token: "--color-gray-bg", description: "Карт гадаргуу (FSD, Promo), ghost товч" },
    { token: "--color-line", description: "Hairline, AssistBar хүрээ" },
    { token: "--color-ink-3", description: "Туслах бичвэр, lead, footer" },
    { token: "--color-ink-2", description: "Light товчны бичвэр, dark hover" },
    { token: "--color-ink", description: "Үндсэн бичвэр, гарчиг, dark товч" },
  ];
  const action = [
    { token: "--color-red-700", description: "Primary товч (Order Now)" },
    { token: "--color-red-800", description: "Primary товчны hover" },
    { token: "--color-blue", description: "Focus ring, “Self-Driving” gradient" },
    { token: "--color-blue-hover", description: "Одоо ашиглагдаагүй (хуучин primary hover)" },
  ];
  const literal = [
    { value: "#e82127", label: "#e82127", description: "Газрын зураг дээрх Supercharger цэг" },
    { value: "#ff3a3a", label: "#ff3a3a", description: "Supercharger дүрс" },
    { value: "#929292", label: "#929292", description: "Destination Charger дүрс" },
    { value: "#d4d6d9", label: "#d4d6d9", description: "Газрын зургийн дэвсгэр" },
    { value: "#232c4d", label: "#232c4d", description: "“Self-Driving” gradient-ийн эхлэл" },
    { value: "#eeeeee", label: "#eeeeee", description: "Light товчны hover, mega menu шугам" },
  ];

  const usage: [string, string, string][] = [
    ["Гарчиг, үндсэн бичвэр", "text-ink", "--color-ink"],
    ["Тайлбар, lead", "text-ink-3", "--color-ink-3"],
    ["Карт гадаргуу", "bg-gray-bg", "--color-gray-bg"],
    ["Гол үйлдэл", "bg-red-700", "--color-red-700"],
    ["Хоёрдогч үйлдэл (цайвар)", "bg-white text-ink-2", "--color-ink-2"],
    ["Хоёрдогч үйлдэл (бараан)", "bg-ink text-white", "--color-ink"],
    ["Focus", ":focus-visible (globals.css)", "--color-blue"],
  ];

  return (
    <SgSection
      info={S.colors}
      intro={
        <>
          Swatch бүрийн утгыг browser одоогийн CSS-ээс уншина. Харьцаа нь цагаан дэвсгэртэй харьцуулсан
          уншигдах байдал (WCAG: жижиг бичвэрт 4.5:1-ээс дээш).
        </>
      }
    >
      <div>
        <SubHeading note={<>Tesla-гийн бараан саарал “бэх” болон цайвар гадаргуу.</>}>
          Үндсэн токен · <Code>@theme</Code>
        </SubHeading>
        <Panel className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 xl:grid-cols-6">
          {base.map((c) => (
            <ColorSwatch key={c.token} {...c} />
          ))}
        </Panel>
      </div>

      <div>
        <SubHeading note="Хуудсан дээрх цорын ганц хурц өнгөнүүд — зөвхөн үйлдэл, focus-д.">Үйлдлийн өнгө</SubHeading>
        <Panel className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
          {action.map((c) => (
            <ColorSwatch key={c.token} {...c} />
          ))}
        </Panel>
      </div>

      <div>
        <SubHeading note="Токен биш, component дотор шууд бичигдсэн өнгөнүүд. Олон газар хэрэглэгдэх бол токен болгох нь зүйтэй.">
          Тусгай өнгө
        </SubHeading>
        <Panel className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 xl:grid-cols-6">
          {literal.map((c) => (
            <ColorSwatch key={c.label} {...c} />
          ))}
        </Panel>
      </div>

      <div>
        <SubHeading>Хэрэглээ</SubHeading>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-3 pr-4 font-medium">Үүрэг</th>
                <th className="py-3 pr-4 font-medium">Tailwind класс</th>
                <th className="py-3 font-medium">Токен</th>
              </tr>
            </thead>
            <tbody>
              {usage.map(([role, cls, token]) => (
                <tr key={role} className="border-b border-line">
                  <td className="py-3 pr-4">{role}</td>
                  <td className="py-3 pr-4">
                    <Code>{cls}</Code>
                  </td>
                  <td className="py-3">
                    <span className="flex items-center gap-2.5">
                      <span
                        className="size-5 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,.12)]"
                        style={{ background: `var(${token})` }}
                      />
                      <span className="font-mono text-xs text-ink-3">{token}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SgSection>
  );
}

/* =========================================================
   04 Үсэг
   ========================================================= */
function Typography() {
  const families = [
    {
      name: "Display",
      stack: "Universal Sans Display → Inter",
      use: "Гарчиг h1–h2, том тоо, картын нэр",
      className: "font-display font-medium",
    },
    {
      name: "Text",
      stack: "Universal Sans Text → Inter",
      use: "Бичвэр, товч, цэс, тайлбар",
      className: "font-sans",
    },
    {
      name: "Mono",
      stack: "ui-monospace",
      use: "Зөвхөн энэ styleguide дээрх токены нэр",
      className: "font-mono",
    },
  ];

  const sizes = [
    { px: 8, cls: "text-[8px]", use: "Footnote доторх дугаар" },
    { px: 10, cls: "text-[10px]", use: "Картын footnote тоо, газрын зургийн тэмдэглэгээ" },
    { px: 12, cls: "text-xs", use: "Footer, footnote, mega menu гарчиг" },
    { px: 14, cls: "text-sm", use: "Body, товч, цэс" },
    { px: 17, cls: "text-[17px]", use: "Eyebrow, hero sub, mobile цэс" },
    { px: 20, cls: "text-xl", use: "Lead, картын sub" },
    { px: 32, cls: "text-[32px]", use: "Promo гарчиг, утсан дээрх hero" },
    { px: 36, cls: "text-[36px]", use: "Утсан дээрх Find Your Charge, том тоо" },
    { px: 40, cls: "text-[40px]", use: "Hero, FSD гарчиг" },
    { px: 48, cls: "text-5xl", use: "Find Your Charge, том тоо" },
    { px: 56, cls: "text-[56px]", use: "Машины картын нэр" },
  ];

  const styles: { sample: ReactNode; meta: string; where: string }[] = [
    {
      sample: <p className="font-display text-[40px]/12 font-medium tracking-[-.5px] md:text-[56px]/16">Model Y L Premium</p>,
      meta: "Display 500 · 56px/64px · -0.5px",
      where: "ProductCard h2",
    },
    {
      sample: <p className="font-display text-[36px]/11 font-medium sm:text-5xl/14">Find Your Charge</p>,
      meta: "Display 500 · 48px/56px",
      where: "ChargingSection h2",
    },
    {
      sample: <p className="font-display text-[32px]/10 font-medium md:text-[40px]/12">Model 3</p>,
      meta: "Display 500 · 40px/48px",
      where: "HeroSlide h2, FSD h2",
    },
    {
      sample: <p className="font-display text-[32px]/10 font-medium">Current Offers</p>,
      meta: "Display 500 · 32px/40px",
      where: "PromoCard h2",
    },
    {
      sample: <p className="text-xl text-ink-3">Explore limited-time offers on Tesla vehicles.</p>,
      meta: "Text 400 · 20px/28px · ink-3",
      where: "Lead / тайлбар",
    },
    {
      sample: <p className="text-[17px]/6 font-medium">Long Wheelbase Midsize SUV</p>,
      meta: "Text 500 · 17px/24px",
      where: "Eyebrow",
    },
    {
      sample: <p className="text-sm/6 font-medium">Vehicles</p>,
      meta: "Text 500 · 14px/24px",
      where: "Цэсний холбоос, товч",
    },
    {
      sample: <p className="text-sm">Makes every drive easier. Subscribe for $99/mo.</p>,
      meta: "Text 400 · 14px/1.43",
      where: "Body",
    },
    {
      sample: <p className="text-xs/5 text-ink-3">Price listed does not include Destination and Order Fees.</p>,
      meta: "Text 400 · 12px/20px · ink-3",
      where: "Footnote, footer",
    },
  ];

  return (
    <SgSection
      info={S.type}
      intro="Tesla-гийн Universal Sans фонт нээлттэй биш тул бүх газарт Inter (400, 500, 600) ачаалагдана."
    >
      <div>
        <SubHeading>Үсгийн гэр бүл</SubHeading>
        <div className="grid gap-4 md:grid-cols-3">
          {families.map((f) => (
            <Panel key={f.name}>
              <p className={`text-[40px]/12 ${f.className}`}>Aa Өө 0123</p>
              <p className="mt-4 text-sm font-medium">{f.name}</p>
              <p className="font-mono text-xs text-ink-3">{f.stack}</p>
              <p className="mt-1 text-sm text-ink-3">{f.use}</p>
            </Panel>
          ))}
        </div>
      </div>

      <div>
        <SubHeading note="Сайт дээр бодитоор хэрэглэгддэг хэмжээнүүд.">Хэмжээний шатлал</SubHeading>
        <div>
          {sizes.map((s) => (
            <SpecRow
              key={s.px}
              name={<Code>{s.cls}</Code>}
              value={
                <>
                  {s.px}px<span className="block font-sans text-ink-3">{s.use}</span>
                </>
              }
            >
              <p className="truncate leading-tight" style={{ fontSize: s.px }}>
                Электрон машин, цэвэр эрчим хүч
              </p>
            </SpecRow>
          ))}
        </div>
      </div>

      <div>
        <SubHeading note="Component бүрт хэрэглэгдэж буй бэлэн хослолууд.">Бичвэрийн хэв маяг</SubHeading>
        <div>
          {styles.map((s) => (
            <div key={s.where} className="border-b border-line py-5">
              {s.sample}
              <p className="mt-2 font-mono text-xs text-ink-3">
                {s.where} — {s.meta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SgSection>
  );
}

/* =========================================================
   05 Зай
   ========================================================= */
function Spacing() {
  const scale = [
    { cls: "1", px: 4 },
    { cls: "2", px: 8 },
    { cls: "3", px: 12 },
    { cls: "4", px: 16 },
    { cls: "6", px: 24 },
    { cls: "8", px: 32 },
    { cls: "10", px: 40 },
    { cls: "12", px: 48 },
    { cls: "16", px: 64 },
  ];
  const layout = [
    { name: "--gutter", desc: "Хуудасны хажуугийн зай (≥900px: 48px, бусад: 16px)" },
    { name: "--gap", desc: "Карт хоорондын зай (≥900px: 24px, бусад: 12px)" },
    { name: "--header-h", desc: "Header-ийн өндөр" },
  ];
  const breakpoints = [
    { name: "sm", px: 600, desc: "Товчнууд тогтмол өргөнтэй болно, promo хэвтээ" },
    { name: "md", px: 900, desc: "Gutter 48px, carousel сум/цэг гарна, FSD 2 багана" },
    { name: "lg", px: 1200, desc: "Desktop цэс, mega menu, header icon" },
  ];

  return (
    <SgSection
      info={S.space}
      intro={
        <>
          Tailwind-ийн 4px алхам (<Code>p-4</Code> = 16px). Байршлын хувьсагчдын утгыг browser-ийн одоогийн
          өргөнөөс уншдаг — цонхоо нарийсгаад үзээрэй.
        </>
      }
    >
      <div>
        <SubHeading>Шатлал</SubHeading>
        <div>
          {scale.map((s) => (
            <div key={s.cls} className="flex items-center gap-4 border-b border-line py-2.5">
              <Code className="w-16 text-center">{s.cls}</Code>
              <span className="w-12 font-mono text-xs text-ink-3">{s.px}px</span>
              <span className="h-3 rounded-[2px] bg-red-700/80" style={{ width: s.px * 2 }} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <SubHeading>Байршил</SubHeading>
        {layout.map((l) => (
          <SpecRow key={l.name} name={<Code>{l.name}</Code>} value={<CssVarValue name={l.name} className="text-ink" />}>
            <p className="text-sm text-ink-3">{l.desc}</p>
          </SpecRow>
        ))}
        <SpecRow name={<Code>--card-w</Code>} value="min(1024px, …)">
          <p className="text-sm text-ink-3">Carousel картын өргөн: 100vw − 2 × gutter − 72px (утсан дээр − 24px)</p>
        </SpecRow>
      </div>

      <div>
        <SubHeading note={<>Mobile-first: класс нь өгөгдсөн өргөнөөс <b>дээш</b> хэрэгжинэ (жишээ нь <Code>md:p-10</Code>).</>}>
          Breakpoint
        </SubHeading>
        {breakpoints.map((b) => (
          <SpecRow key={b.name} name={<Code>{b.name}:</Code>} value={`≥ ${b.px}px`}>
            <p className="text-sm text-ink-3">{b.desc}</p>
          </SpecRow>
        ))}
      </div>
    </SgSection>
  );
}

/* =========================================================
   06 Хэлбэр
   ========================================================= */
function Shape() {
  const radii = [
    { cls: "rounded-btn", value: "4px", use: "Товч, цэсний холбоос, icon товч", className: "rounded-btn" },
    { cls: "rounded-card", value: "12px", use: "Карт, газрын зураг, promo", className: "rounded-card" },
    { cls: "rounded-[2px]", value: "2px", use: "Газрын зургийн Find Me", className: "rounded-[2px]" },
    { cls: "rounded-full", value: "50%", use: "Carousel цэг, Play, fullscreen", className: "rounded-full" },
    { cls: "rounded-none", value: "0", use: "Бүтэн өргөнтэй hero", className: "rounded-none" },
  ];
  return (
    <SgSection info={S.shape}>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {radii.map((r) => (
          <div key={r.cls}>
            <div className={`aspect-square bg-gray-bg shadow-[inset_0_0_0_1px_var(--color-line)] ${r.className}`} />
            <p className="mt-2">
              <Code>{r.cls}</Code>
            </p>
            <p className="mt-1 font-mono text-xs text-ink-3">{r.value}</p>
            <p className="text-xs/5 text-ink-3">{r.use}</p>
          </div>
        ))}
      </div>
    </SgSection>
  );
}

/* =========================================================
   07 Шугам
   ========================================================= */
function Lines() {
  return (
    <SgSection info={S.lines}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel>
          <div className="h-px bg-line" />
          <p className="mt-4 text-sm font-medium">Hairline</p>
          <p className="text-sm text-ink-3">
            1px <Code>border-line</Code> · AssistBar товч
          </p>
        </Panel>
        <Panel>
          <div className="h-10 border-l border-[#eee] pl-4 text-sm/10">Current Offers</div>
          <p className="mt-4 text-sm font-medium">Mega menu хуваагч</p>
          <p className="text-sm text-ink-3">
            1px <Code>border-[#eee]</Code> · картууд ба жагсаалтын хооронд
          </p>
        </Panel>
        <Panel>
          <span className="inline-flex h-10 items-center rounded-btn bg-white px-6 text-sm font-medium outline-2 outline-offset-2 outline-blue">
            Learn More
          </span>
          <p className="mt-4 text-sm font-medium">Focus ring</p>
          <p className="text-sm text-ink-3">
            2px <Code>--color-blue</Code>, offset 2px · <Code>:focus-visible</Code> (Tab товчоор)
          </p>
        </Panel>
        <Panel>
          <div className="flex gap-6 text-sm">
            <span className="text-ink-3 underline decoration-[rgba(92,94,98,.5)] underline-offset-3">Learn</span>
            <span className="text-[17px] underline decoration-1 underline-offset-4">2.49% APR Available</span>
          </div>
          <p className="mt-4 text-sm font-medium">Доогуур зураас</p>
          <p className="text-sm text-ink-3">
            Mega card: offset 3px, 50% тунгалаг · Hero/карт: 1px, offset 4px
          </p>
        </Panel>
      </div>
    </SgSection>
  );
}

/* =========================================================
   08 Сүүдэр, бүрхүүл
   ========================================================= */
function Shadows() {
  return (
    <SgSection info={S.shadow}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ShadowTile
          title="Картын gradient"
          spec="black 0% → 45% · доод 60%"
          note="Машины картын бичвэрийг уншигдахуйц болгоно"
        >
          <div className="relative h-40 overflow-hidden rounded-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SAMPLE_IMG} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-x-0 top-[40%] bottom-0 bg-linear-to-b from-black/0 to-black/45" />
            <p className="absolute bottom-3 left-4 font-display text-2xl font-medium text-white">Model Y L</p>
          </div>
        </ShadowTile>

        <ShadowTile title="Бичвэрийн сүүдэр" spec="0 1px 8px black 45%" note="Hero зураг дээрх цагаан гарчиг">
          <div className="relative h-40 overflow-hidden rounded-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SAMPLE_IMG} alt="" className="absolute inset-0 size-full object-cover" />
            <p className="absolute inset-x-0 top-6 text-center font-display text-[32px] font-medium text-white [text-shadow:0_1px_8px_rgba(0,0,0,.45)]">
              Model Y
            </p>
          </div>
        </ShadowTile>

        <ShadowTile title="Шилэн сум" spec="gray-bg 65% · blur 8px" note="Carousel-ийн сум">
          <div className="relative grid h-40 place-items-center overflow-hidden rounded-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SAMPLE_IMG} alt="" className="absolute inset-0 size-full object-cover" />
            <span className="relative grid size-10 place-items-center rounded-btn bg-[rgba(244,244,244,.65)] text-ink backdrop-blur-[8px]">
              <Icons.ChevronRight className="size-6" />
            </span>
          </div>
        </ShadowTile>

        <ShadowTile title="Mega menu" spec="0 24px 24px -24px black 12%" note="Нээгдэх цэсний доод сүүдэр">
          <div className="h-40 rounded-card bg-white/0 p-4">
            <div className="h-24 rounded-[2px] bg-white shadow-[0_24px_24px_-24px_rgba(0,0,0,.12)]" />
          </div>
        </ShadowTile>

        <ShadowTile title="Газрын зургийн товч" spec="0 1px 4px black 30%" note="Find Me, fullscreen">
          <div className="grid h-40 place-items-center rounded-card bg-[#d4d6d9]">
            <span className="flex h-10 items-center gap-2 rounded-[2px] bg-white px-2.5 text-sm font-medium text-ink-2 shadow-[0_1px_4px_rgba(0,0,0,.3)]">
              <Icons.FindMeIcon className="size-6" />
              Find Me
            </span>
          </div>
        </ShadowTile>

        <ShadowTile title="Бүрхүүлүүд" spec="white 15% + blur 16px · black 30%" note="Mega menu-ийн бүдгэрэл · утасны цэсний scrim">
          <div className="relative grid h-40 grid-cols-2 overflow-hidden rounded-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SAMPLE_IMG} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="relative bg-white/15 backdrop-blur-[16px]" />
            <div className="relative bg-black/30" />
          </div>
        </ShadowTile>
      </div>
    </SgSection>
  );
}

function ShadowTile({ title, spec, note, children }: { title: string; spec: string; note: string; children: ReactNode }) {
  return (
    <div>
      {children}
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className="font-mono text-xs text-ink-3">{spec}</p>
      <p className="text-xs/5 text-ink-3">{note}</p>
    </div>
  );
}

/* =========================================================
   09 Дүрс
   ========================================================= */
function IconsSection() {
  const list: { name: string; Icon: ComponentType<{ className?: string }>; dark?: boolean; size?: string }[] = [
    { name: "TeslaLogo", Icon: Icons.TeslaLogo, size: "h-3 w-[120px]" },
    { name: "SupportIcon", Icon: Icons.SupportIcon },
    { name: "GlobeIcon", Icon: Icons.GlobeIcon },
    { name: "AccountIcon", Icon: Icons.AccountIcon },
    { name: "CloseIcon", Icon: Icons.CloseIcon },
    { name: "ChevronLeft", Icon: Icons.ChevronLeft },
    { name: "ChevronRight", Icon: Icons.ChevronRight },
    { name: "PlayIcon", Icon: Icons.PlayIcon, dark: true },
    { name: "FindMeIcon", Icon: Icons.FindMeIcon },
    { name: "FullscreenIcon", Icon: Icons.FullscreenIcon },
    { name: "SuperchargerIcon", Icon: Icons.SuperchargerIcon, size: "size-10" },
    { name: "DestinationChargerIcon", Icon: Icons.DestinationChargerIcon, size: "size-10" },
    { name: "ChatIcon", Icon: Icons.ChatIcon },
    { name: "SendIcon", Icon: Icons.SendIcon, dark: true },
    { name: "SteeringWheelIcon", Icon: Icons.SteeringWheelIcon },
  ];
  return (
    <SgSection
      info={S.icons}
      intro={
        <>
          Inline SVG, ихэнх нь <Code>currentColor</Code>. Файл: <Code>components/icons.tsx</Code>. Хэрэглээ:{" "}
          <Code>{"<SupportIcon className=\"size-6\" />"}</Code>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {list.map(({ name, Icon, dark, size }) => (
          <div key={name} className="rounded-card border border-line/60 p-4">
            <div className={`grid h-16 place-items-center rounded-btn ${dark ? "bg-ink" : "bg-gray-bg"}`}>
              <Icon className={size ?? "size-6"} />
            </div>
            <p className="mt-2 truncate font-mono text-[11px] text-ink">{name}</p>
          </div>
        ))}
      </div>
    </SgSection>
  );
}

/* =========================================================
   10 Компонент
   ========================================================= */
async function ComponentsSection() {
  const [vehicleCards, energyCards] = await Promise.all([getProductCards("vehicle"), getProductCards("energy")]);

  const variants = [
    { variant: "primary", note: "Гол үйлдэл: Order Now, Reserve" },
    { variant: "light", note: "Зураг/бараан дээрх хоёрдогч" },
    { variant: "dark", note: "Цайвар дэвсгэр дээрх гол үйлдэл" },
    { variant: "ghost", note: "Цайвар дэвсгэр дээрх хоёрдогч" },
  ] as const;

  return (
    <SgSection info={S.components} intro="Доорх бүх жишээ бол сайтад хэрэглэгддэг бодит component.">
      {/* Товч */}
      <div>
        <SubHeading note={<><Code>components/ui/Button.tsx</Code> · <Code>{"<Button variant=\"primary\" wide>"}</Code></>}>
          Button
        </SubHeading>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel>
            <p className="mb-4 text-xs font-medium tracking-[.08em] text-ink-3 uppercase">Цайвар дэвсгэр</p>
            <ButtonRow>
              <Button href="#components" variant="primary">Order Now</Button>
              <Button href="#components" variant="dark">Schedule Demo</Button>
              <Button href="#components" variant="ghost">Learn More</Button>
            </ButtonRow>
          </Panel>
          <div className="relative overflow-hidden rounded-card p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SAMPLE_IMG} alt="" className="absolute inset-0 size-full object-cover" />
            <p className="relative mb-4 text-xs font-medium tracking-[.08em] text-white uppercase">Зураг дээр</p>
            <ButtonRow className="relative">
              <Button href="#components" variant="primary" wide>Order Now</Button>
              <Button href="#components" variant="light" wide>Learn More</Button>
            </ButtonRow>
          </div>
        </div>
        <div className="mt-4">
          {variants.map((v) => (
            <SpecRow key={v.variant} name={<Code>variant=&quot;{v.variant}&quot;</Code>}>
              <p className="text-sm text-ink-3">{v.note}</p>
            </SpecRow>
          ))}
          <SpecRow name={<Code>wide</Code>} value="min-w 200px">
            <p className="text-sm text-ink-3">Hero болон FSD-ийн өргөн товч. Утсан дээр бүх товч мөрөө тэнцүү хуваана.</p>
          </SpecRow>
        </div>
      </div>

      {/* Carousel удирдлага */}
      <div>
        <SubHeading note={<><Code>components/ui/Carousel.tsx</Code> · <Code>variant=&quot;hero&quot; | &quot;cards&quot;</Code></>}>
          Carousel удирдлага
        </SubHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative flex h-32 items-center justify-between overflow-hidden rounded-card px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SAMPLE_IMG} alt="" className="absolute inset-0 size-full object-cover" />
            {[Icons.ChevronLeft, Icons.ChevronRight].map((I, i) => (
              <span key={i} className="relative grid size-10 place-items-center rounded-btn bg-[rgba(244,244,244,.65)] text-ink backdrop-blur-[8px]">
                <I className="size-6" />
              </span>
            ))}
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-3">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`size-2 rounded-full ${i === 0 ? "bg-white" : "bg-white/40"}`} />
              ))}
            </div>
          </div>
          <Panel className="grid h-32 place-items-center">
            <div className="flex gap-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={`size-2 rounded-full ${i === 1 ? "bg-ink" : "bg-ink/35"}`} />
              ))}
            </div>
          </Panel>
        </div>
        <p className="mt-3 text-sm text-ink-3">
          Hero: сум ба цагаан цэг, төгсгөлөөс эхэнд эргэнэ. Cards: бараан цэг, 900px-ээс доош хуруугаар гүйлгэнэ.
        </p>
      </div>

      {/* ProductCard */}
      <div>
        <SubHeading note={<><Code>ProductCard</Code> · Supabase <Code>product_cards</Code> хүснэгт (<Code>lib/product-cards.ts</Code>)</>}>
          Бүтээгдэхүүний карт
        </SubHeading>
        <div className="grid gap-4 xl:grid-cols-2">
          <ProductCard item={vehicleCards[0]} />
          <ProductCard item={energyCards[0]} />
        </div>
        <p className="mt-3 text-sm text-ink-3">
          Eyebrow-тэй бол агуулга дээр/доор хуваагдана, eyebrow-гүй бол бүгд доод талдаа.
        </p>
      </div>

      {/* PromoCard */}
      <div>
        <SubHeading note={<><Code>PromoCard</Code> · <Code>imageStyle=&quot;float&quot; | &quot;side&quot;</Code></>}>Promo карт</SubHeading>
        <div className="grid gap-(--gap) md:grid-cols-2">
          {promos.map((p) => (
            <PromoCard key={p.title} promo={p} />
          ))}
        </div>
      </div>

      {/* MegaCard */}
      <div>
        <SubHeading note={<><Code>MegaCard</Code> · <Code>data/nav.ts</Code></>}>Mega menu карт</SubHeading>
        <Panel className="flex flex-wrap justify-center gap-6 bg-white">
          {navMenus[0].kind === "cards" &&
            navMenus[0].cards.slice(0, 3).map((c) => <MegaCard key={c.title} card={c} />)}
        </Panel>
      </div>

      {/* Stat */}
      <div>
        <SubHeading>Статистик</SubHeading>
        <Panel className="flex flex-wrap gap-10">
          <div>
            <strong className="block font-display text-5xl/[52px] font-medium tracking-[-.5px]">7x</strong>
            <span className="text-[17px]/6 text-ink-3">Fewer Collisions</span>
          </div>
          <div>
            <div className="flex items-center gap-0.5 font-display text-5xl/14 font-medium tracking-[-.5px]">
              39,597
              <Icons.SuperchargerIcon className="size-12" />
            </div>
            <span className="text-xl text-ink-3">Superchargers</span>
          </div>
        </Panel>
      </div>

      {/* Layout components */}
      <div>
        <SubHeading>Байнгын хэсгүүд</SubHeading>
        <SpecRow name={<Code>Header</Code>} value="layout/Header.tsx">
          <p className="text-sm text-ink-3">
            Sticky, цагаан. ≥1200px: 7 цэс + mega menu (hover/focus), icon. Түүнээс доош “Menu” товч → баруун талаас гулсах цэс.
          </p>
        </SpecRow>
        <SpecRow name={<Code>MegaMenu</Code>} value="layout/MegaMenu.tsx">
          <p className="text-sm text-ink-3">Гурван төрөл: cards + жагсаалт, 3 багана, shop. Нээгдэхэд хуудас бүдгэрнэ.</p>
        </SpecRow>
        <SpecRow name={<Code>MobileMenu</Code>} value="layout/MobileMenu.tsx">
          <p className="text-sm text-ink-3">400px өргөн panel, 30% бараан scrim. Esc болон scrim дээр дарахад хаагдана.</p>
        </SpecRow>
        <SpecRow name={<Code>Footer</Code>} value="layout/Footer.tsx">
          <p className="text-sm text-ink-3">Голлосон 12px холбоосууд.</p>
        </SpecRow>
        <SpecRow name={<Code>AssistBar</Code>} value="layout/AssistBar.tsx">
          <p className="text-sm text-ink-3">Доод талд тогтмол, 92% цагаан + blur. Нүүр хуудсанд л харагдана.</p>
        </SpecRow>
      </div>
    </SgSection>
  );
}

/* =========================================================
   11 Хэсгүүд
   ========================================================= */
function SectionsList() {
  const rows = [
    { name: "HeroCarousel", file: "sections/HeroCarousel.tsx", desc: "Бүтэн өргөнтэй 3 слайд: Roadster (лого), Model Y, Model 3." },
    { name: "FsdSection", file: "sections/FsdSection.tsx", desc: "Саарал карт: gradient гарчиг, 2 статистик, видео poster." },
    { name: "CardCarousel", file: "sections/CardCarousel.tsx", desc: "Vehicles (6) болон Energy (3) картууд." },
    { name: "PromoGrid", file: "sections/PromoGrid.tsx", desc: "2 багана promo карт." },
    { name: "ChargingSection", file: "sections/ChargingSection.tsx", desc: "SVG газрын зураг + Find Your Charge, 2 статистик." },
    { name: "Footnotes", file: "sections/Footnotes.tsx", desc: "Дугаарласан тайлбарууд (data/home.ts)." },
  ];
  return (
    <SgSection
      info={S.sections}
      intro={
        <>
          Нүүр хуудас (<Code>app/page.tsx</Code>) эдгээр хэсгийг дарааллаар нь угсарна. Бүх текст, зураг{" "}
          <Code>data/</Code> хавтаснаас ирнэ.
        </>
      }
    >
      <div>
        {rows.map((r, i) => (
          <SpecRow
            key={r.name}
            name={
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <Code>{r.name}</Code>
              </span>
            }
            value={r.file}
          >
            <p className="text-sm text-ink-3">{r.desc}</p>
          </SpecRow>
        ))}
      </div>
      <div>
        <Button href="/" variant="dark">
          Нүүр хуудсыг харах
        </Button>
      </div>
    </SgSection>
  );
}
