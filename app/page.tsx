import { AssistBar } from "@/components/layout/AssistBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CardCarousel } from "@/components/sections/CardCarousel";
import { ChargingSection } from "@/components/sections/ChargingSection";
import { Footnotes } from "@/components/sections/Footnotes";
import { FsdSection } from "@/components/sections/FsdSection";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { PromoGrid } from "@/components/sections/PromoGrid";
import { energyCards, vehicleCards } from "@/data/home";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroCarousel />
        <FsdSection />
        <CardCarousel label="Vehicles" items={vehicleCards} />
        <PromoGrid />
        <ChargingSection />
        <CardCarousel label="Energy" items={energyCards} />
        <Footnotes />
      </main>
      <Footer />
      <AssistBar />
    </>
  );
}
