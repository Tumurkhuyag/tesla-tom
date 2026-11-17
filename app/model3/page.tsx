import type { Metadata } from "next";
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
    </>
  );
}
