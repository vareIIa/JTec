export const metadata = {
  title: "JTEC — Tecnologia & Inovação",
  description:
    "JTEC é uma empresa de tecnologia especializada em desenvolvimento fullstack, inteligência artificial e infraestrutura de servidores.",
};

import InteractiveBackground from "@/components/interactive-background";
import IntroReveal from "@/components/intro-reveal";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <InteractiveBackground />
      <IntroReveal />
      <Hero />
      <Workflows />
      <Features />
      <Cta />
    </>
  );
}
