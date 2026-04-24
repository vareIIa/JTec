export const metadata = {
  title: "Loja JTEC — Templates, IA, Consultoria e mais",
  description:
    "Produtos e serviços digitais da JTEC: templates Next.js, servidores de IA dedicados, consultoria fullstack, cursos e mais.",
};

import Link from "next/link";
import StoreClient from "@/components/store/store-client";

export default function LojaPage() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Breadcrumb / back */}
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
          <span className="text-gray-300">Loja</span>
        </div>

        {/* Hero of the store */}
        <div className="relative mb-14 overflow-hidden rounded-[2rem] glass-heavy p-8 md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 opacity-30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 opacity-20 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-300 backdrop-blur-xl"
                data-aos="fade-up"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Loja JTEC · Produtos digitais
              </div>

              <h1
                className="mb-5 font-nacelle text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <span className="text-white/90">Ferramentas que </span>
                <span className="bg-gradient-to-br from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  elevam
                </span>
                <span className="text-white/90"> o seu produto.</span>
              </h1>

              <p
                className="max-w-xl text-lg leading-relaxed text-gray-400"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Templates prontos, infraestrutura de IA, consultoria especializada e cursos — com entrega digital imediata e garantia de 7 dias.
              </p>

              {/* Trust strip */}
              <div
                className="mt-8 flex flex-wrap items-center gap-5 text-xs text-gray-400"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Entrega digital instantânea
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Garantia de 7 dias
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Suporte em +30 idiomas via IA
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Pagamento seguro
                </div>
              </div>
            </div>

            {/* Stats card */}
            <div
              className="relative grid grid-cols-2 gap-3"
              data-aos="fade-left"
              data-aos-delay={200}
            >
              {[
                { k: "8.9k+", v: "Clientes atendidos" },
                { k: "4.9", v: "Média de avaliação" },
                { k: "7d", v: "Garantia total" },
                { k: "24/7", v: "Entrega automática" },
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

        {/* Store client (filter + grid) */}
        <StoreClient />

        {/* Backend note */}
        <div
          className="mt-16 flex items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-4 text-xs text-gray-500 backdrop-blur-xl"
          data-aos="fade-up"
        >
          <svg className="h-4 w-4 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          Catálogo em modo demonstração. O backend com cadastro de produtos e checkout completo entra em breve.
        </div>
      </div>
    </section>
  );
}
