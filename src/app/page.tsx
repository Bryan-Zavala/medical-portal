import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { Footer } from "@/components/layout/Footer";
import { StreamingMetricsSection } from "@/components/home/StreamingMetricsSection";
import { Suspense } from "react";
import { StreamingMetricsSkeleton } from "@/components/home/StreamingMetricsSekeleton";
import { HowToSection } from "@/components/home/HowToSection";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<StreamingMetricsSkeleton />}>
        <StreamingMetricsSection />
      </Suspense>
      <AboutSection />
      <ServicesSection />
      <ArticlesSection />
      <HowToSection></HowToSection>
      <Footer></Footer>
    </>
  );
}
