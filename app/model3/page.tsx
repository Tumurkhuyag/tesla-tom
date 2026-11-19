import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Model3Hero } from "@/components/sections/model3/Model3Hero";
import { Model3Interior } from "@/components/sections/model3/Model3Interior";
import { Model3Performance } from "@/components/sections/model3/Model3Performance";
import { Model3Safety } from "@/components/sections/model3/Model3Safety";
import { Model3Trims } from "@/components/sections/model3/Model3Trims";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "Model 3 | Tesla Монгол",
  description: "Model 3 — нэг цэнэглэлтээр 584 км хүртэл явах, 2.9 секундэд 96 км/ц хүрэх цахилгаан седан.",
};

export default function Model3Page() {
  return (
    <>
      <Header />
      <ScrollProgress />
      <main id="main-content">
        <Model3Hero />
        <Model3Interior />
        <Model3Performance />
        <Model3Safety />
        <Model3Trims />
      </main>
      <Footer />

      {/* ТҮР: Figma-ийн "Instagram post - 1" постер — шалгасны дараа устгана */}
      <div className="px-(--gutter) pb-16">
        <Image
          src="/temp/model3-poster.png"
          alt="Model 3 Performance постер: 2.9с 0–96 км/ц, 500+ морины хүч, хос мотор"
          width={1080}
          height={1350}
          sizes="(min-width: 600px) 540px, 100vw"
          className="mx-auto w-full max-w-[540px] rounded-card"
        />
      </div>
    </>
  );
}
