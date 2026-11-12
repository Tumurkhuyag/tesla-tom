import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { VehicleSpecCard } from "@/components/sections/VehicleSpecCard";
import { ec75Card } from "@/data/ec75";

export const metadata: Metadata = {
  title: "EC75 | Зорчигч тээврийн машин",
  description: "EC75 цахилгаан зорчигч тээврийн машины үндсэн үзүүлэлтүүд.",
};

export default function Ec75Page() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex justify-center bg-[#eef1f4] px-(--gutter) py-12">
        <VehicleSpecCard {...ec75Card} />
      </main>
      <Footer />
    </>
  );
}
