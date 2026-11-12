import {
  DimensionsIcon,
  DoorIcon,
  DrivetrainIcon,
  SeatIcon,
  type VehicleSpecCardProps,
} from "@/components/sections/VehicleSpecCard";
import ec75Image from "@/public/cars/ec75.png";

/*
 * Prägnanz: картан дээр зөвхөн хамгийн чухал, богино мэдээллийг үлдээв.
 * Хассан нарийвчлал (Дэлгэрэнгүй хуудсанд байх ёстой):
 *   - Цэнэглэлтийн зай CLTC стандартаар
 *   - Хурдан цэнэглэлт 20–80%
 *   - Даац: тохируулгаас хамаарна
 *   - Хэмжээ: 5130 × 1860 × 2020 мм
 */
export const ec75Card: VehicleSpecCardProps = {
  image: ec75Image,
  alt: "Цайвар цэнхэр өнгийн EC75 цахилгаан микроавтобус",
  eyebrow: "Зорчигч тээвэр",
  title: "EC75",
  stats: [
    { value: "420", unit: "км", label: "Явах зай" },
    { value: "18", unit: "мин", label: "Хурдан цэнэглэлт" },
    { value: "130", unit: "кВт", label: "Моторын хүч" },
  ],
  specs: [
    { icon: DrivetrainIcon, label: "Хөтлөгч", value: "FWD" },
    { icon: SeatIcon, label: "Суудал", value: "2–14" },
    { icon: DoorIcon, label: "Хаалга", value: "5" },
    { icon: DimensionsIcon, label: "Хэмжээ", value: "5.1 × 1.9 × 2.0 м" },
  ],
  buttons: [
    { label: "Дэлгэрэнгүй", href: "#", variant: "secondary" },
    { label: "Урьдчилсан захиалга", href: "#", variant: "primary" },
  ],
};
