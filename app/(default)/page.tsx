export const metadata = {
  title: "JTEC — Tecnologia & Inovação",
  description:
    "JTEC é uma empresa de tecnologia especializada em desenvolvimento fullstack, inteligência artificial e infraestrutura de servidores.",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Features />
      <Cta />
    </>
  );
}
