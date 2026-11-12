import { AssistBar } from "@/components/layout/AssistBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CardCarousel } from "@/components/sections/CardCarousel";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { getProductCards } from "@/lib/product-cards";

export default async function Home() {
  const vehicleCards = await getProductCards("vehicle");

  return (
    <>
      <Header />
      <main id="main-content">
        <HeroCarousel />
        <CardCarousel label="Загварууд" items={vehicleCards} />
      </main>
      <Footer />
      <AssistBar />
    </>
  );
}
