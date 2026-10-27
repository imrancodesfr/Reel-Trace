"use client";

import Header from "@/components/layout/Header";
import Hero from "@/components/hero/Hero";
import Ticker from "@/components/layout/Ticker";
import FinderSection from "@/components/finder/FinderSection";
import HowItWorks from "@/components/hero/HowItWorks";
import KeepPileSection from "@/components/keep-pile/KeepPileSection";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/feedback/Toast";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Ticker />
        <FinderSection />
        <HowItWorks />
        <KeepPileSection />
      </main>
      <Footer />
      <Toast />
    </>
  );
}
