export const metadata = {
  title: "Portfólio JTEC — Projetos que transformam",
  description:
    "Centenas de projetos digitais entregues: IA, e-commerce, SaaS, landing pages e sistemas sob medida. Conheça o que a JTEC já produziu.",
};

import Link from "next/link";
import PortfolioClient from "@/components/portfolio/portfolio-client";

export default function PortfolioPage() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-white"
          >
            <svg className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            JTEC
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-gray-300">Portfólio</span>
        </div>

        {/* Hero */}
        <div className="relative mb-14 overflow-hidden rounded-[2rem] glass-heavy p-8 md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-500 opacity-25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 opacity-20 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-300 backdrop-blur-xl"
                data-aos="fade-up"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
                </span>
                Portfólio JTEC · Projetos reais
              </div>

              <h1
                className="mb-5 font-nacelle text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <span className="text-white/90">Cada projeto, </span>
                <span className="bg-gradient-to-br from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  uma história
                </span>
                <span className="text-white/90"> de impacto.</span>
              </h1>

              <p
                className="max-w-xl text-lg leading-relaxed text-gray-400"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Centenas de projetos entregues — de chatbots com IA a plataformas SaaS completas.
                Cada linha de código construída com propósito e obsessão por qualidade.
              </p>

              <div
                className="mt-8 flex flex-wrap items-center gap-5 text-xs text-gray-400"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                {[
                  { icon: "✓", text: "Entrega no prazo" },
                  { icon: "✓", text: "Código limpo e escalável" },
                  { icon: "✓", text: "Suporte pós-entrega" },
                  { icon: "✓", text: "Do MVP ao produto completo" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              className="relative grid grid-cols-2 gap-3"
              data-aos="fade-left"
              data-aos-delay={200}
            >
              {[
                { k: "200+", v: "Projetos entregues" },
                { k: "98%", v: "Clientes satisfeitos" },
                { k: "5k+", v: "Usuários impactados" },
                { k: "7", v: "Países atendidos" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
                >
                  <div className="font-nacelle text-2xl font-semibold bg-gradient-to-br from-white via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
                    {s.k}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-gray-400">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio client (filters + projects) */}
        <PortfolioClient />
      </div>
    </section>
  );
}
