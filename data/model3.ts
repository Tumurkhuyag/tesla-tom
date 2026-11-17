import type { ButtonItem } from "./types";

const CDN = "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto";
const T = "https://www.tesla.com";

/*
 * Model 3 танилцуулга хуудасны өгөгдөл (tesla.com/model3-аас, 2026 оны 11-р сар).
 * EPA-ийн миль → км, 0–60 mph → 0–96 км/ц гэж хөрвүүлсэн.
 */

export type Stat = { value: string; unit?: string; label: string };
export type Feature = { title: string; text: string };
export type ImageItem = { src: string; alt: string };

const orderButtons: ButtonItem[] = [
  { label: "Захиалах", href: `${T}/model3/design`, variant: "primary" },
  { label: "Туршилтын жолоодлого", href: `${T}/drive`, variant: "light" },
];

/* 1. Hero */
export const model3Hero = {
  image: {
    src: `${CDN}/Model-3-Premium-Hero-Desktop-LHD-US.jpg`,
    alt: "Мөнгөлөг Model 3 нарс модтой уулын замаар явж буй нь",
  },
  title: "Model 3",
  tagline: "Нэг цэнэглэлтээр 584 км хүртэл",
  buttons: orderButtons,
  stats: [
    { value: "584", unit: "км", label: "Явах зай (EPA)" },
    { value: "2.9", unit: "с", label: "0–96 км/ц" },
    { value: "314", unit: "км", label: "15 минутад цэнэглэх" },
  ] satisfies Stat[],
};

/* 2. Салон */
export const model3Interior = {
  eyebrow: "Салон",
  title: "Минималист салон",
  text: "Цэвэр, нямбай салонд хэрэгтэй бүх зүйл гарын дор. Орчны гэрэлтүүлгээ өөрийн хүссэнээр тохируулаарай.",
  image: {
    src: `${CDN}/Model-3-Take-Control-Desktop-LHD-US.jpg`,
    alt: "Жолооч Model 3-ын 16 инчийн төв дэлгэцээр суудлаа тохируулж буй нь",
  },
  features: [
    { title: "16\" төв дэлгэц", text: "Навигаци, уур амьсгал, хөгжим — бүгд нэг дэлгэцэнд." },
    { title: "8\" арын дэлгэц", text: "Арын зорчигчид агаар сэлгэлт, зугаа цэнгэлээ өөрсдөө удирдана." },
    { title: "15 чанга яригч", text: "Хоёр сабвуфер, хоёр өсгөгчтэй Tesla-гийн дууны систем." },
    { title: "Агааржуулалттай суудал", text: "Урд суудлаа утаснаасаа урьдчилан халааж, сэрүүцүүлнэ." },
  ] satisfies Feature[],
};

/* 3. Хүчин чадал */
export const model3Performance = {
  eyebrow: "Model 3 Performance",
  title: "Дараагийн түвшний хүчин чадал",
  text: "Model 3-т суулгасан хамгийн хүчирхэг хөдөлгүүр 500 гаруй морины хүч гаргаж, 2.9 секундэд 96 км/ц хүрнэ.",
  image: {
    src: `${CDN}/Model-3-Performance-Hero-Desktop-LHD-US.jpg`,
    alt: "Улаан Model 3 Performance элсэн цөлийн замаар давхиж буй нь",
  },
  stats: [
    { value: "2.9", unit: "с", label: "0–96 км/ц" },
    { value: "500+", unit: "мх", label: "Морины хүч" },
    { value: "AWD", label: "Хос мотор" },
  ] satisfies Stat[],
  features: [
    { title: "Дасан зохицох түдгэлзүүр", text: "Ямар ч хурдтай эргэлтэд замдаа наалдсан мэт тогтвортой." },
    { title: "Track Mode", text: "Тогтворжилт, рекуперацийн тоормос, жолоодлогын тэнцвэрийг өөрөө тохируулна." },
    { title: "Performance тоормос", text: "Том диск, калипер нь бүх хурдад тогтвортой зогсолт өгнө." },
  ] satisfies Feature[],
  button: { label: "Performance захиалах", href: `${T}/model3/design`, variant: "light" } satisfies ButtonItem,
};

/* 4. Аюулгүй байдал */
export const model3Safety = {
  eyebrow: "Аюулгүй байдал",
  title: "Таны аюулгүй байдалд зориулсан",
  text: "Цохилт шингээх бүс, бат бөх зорчигчийн салон, олон аюулгүйн дэр нь зорчигчдыг хамгаална. Идэвхтэй системүүд ослоос урьдчилан сэргийлэхэд тусална.",
  image: {
    src: `${CDN}/Model-3-Standard-Safety-Desktop.jpg`,
    alt: "Ээж нь хүүхдээ Model 3-ын арын суудалд хүүхдийн суудалд бэхэлж буй нь",
  },
  features: [
    { title: "Автомат яаралтай тоормос", text: "Саад ойртоход машин өөрөө тоормослоно." },
    { title: "Эгнээ хадгалах туслах", text: "Эгнээнээсээ гарахаас сэргийлж залруулна." },
    { title: "Урд камерууд", text: "Илүү сайн харагдац, хялбар зогсоол." },
  ] satisfies Feature[],
};

/* 5. Хувилбарууд */
export type Trim = {
  /** Tab цэсэнд харагдах богино нэр */
  tab: string;
  name: string;
  drive: string;
  stats: Stat[];
};

export const model3Trims = {
  title: "Хувилбараа сонгоно уу",
  image: {
    src: `${CDN}/Model-3-Standard-End-Desktop.jpg`,
    alt: "Цагаан Model 3 ойн дундах замаар явж буй нь",
  },
  trims: [
    {
      tab: "Model 3",
      name: "Model 3",
      drive: "Арын хөтлөгч",
      stats: [
        { value: "517", unit: "км", label: "Явах зай" },
        { value: "5.8", unit: "с", label: "0–96 км/ц" },
        { value: "274", unit: "км", label: "15 мин цэнэглэлт" },
      ],
    },
    {
      tab: "Premium RWD",
      name: "Model 3 Premium",
      drive: "Арын хөтлөгч",
      stats: [
        { value: "584", unit: "км", label: "Явах зай" },
        { value: "4.9", unit: "с", label: "0–96 км/ц" },
        { value: "314", unit: "км", label: "15 мин цэнэглэлт" },
      ],
    },
    {
      tab: "Premium AWD",
      name: "Model 3 Premium",
      drive: "Бүх дугуйн хөтлөгч",
      stats: [
        { value: "557", unit: "км", label: "Явах зай" },
        { value: "3.8", unit: "с", label: "0–96 км/ц" },
        { value: "298", unit: "км", label: "15 мин цэнэглэлт" },
      ],
    },
  ] satisfies Trim[],
  common: ["5 суудал", "16\" төв дэлгэц", "Батерейн баталгаа 8 жил"],
  buttons: orderButtons,
  footnote:
    "Явах зай нь EPA-ийн тооцоог км-т хөрвүүлсэн. 15 минутын цэнэглэлтийг Supercharger дээр тогтмол хурдны өгөгдлөөр тооцсон. Бодит үзүүлэлт нөхцөлөөс хамаарна.",
};
