"use client";

import { useMemo, useState } from "react";
import { categories, projects, type ProjectCategory } from "./portfolio-data";
import ProjectMockup from "./project-mockup";

const statusColors: Record<string, string> = {
  live: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  ongoing: "text-blue-300 bg-blue-500/10 border-blue-500/20",
  archived: "text-gray-400 bg-gray-500/10 border-gray-500/20",
};
const statusLabel: Record<string, string> = {
  live: "No ar",
  ongoing: "Em desenvolvimento",
  archived: "Arquivado",
};

export default function PortfolioClient() {
  const [category, setCategory] = useState<ProjectCategory | "Todos">("Todos");
  const [expanded, setExpanded] = useState<string | null>("mycoach");

  const featured = projects.find((p) => p.featured)!;
  const rest = useMemo(() => {
    let list = projects.filter((p) => !p.featured);
    if (category !== "Todos") list = list.filter((p) => p.category === category);
    return list;
  }, [category]);

  return (
    <>
      {/* ── Featured: MyCoach ─────────────────────────────── */}
      <div
        className="relative mb-16 overflow-hidden rounded-[2rem] glass-heavy"
        data-aos="fade-up"
      >
        {/* Blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 opacity-15 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

        <div className="relative grid gap-0 lg:grid-cols-2">
          {/* Esquerda — conteúdo */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Projeto em destaque
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-400">
                  {featured.category}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-400">
                  {featured.year}
                </span>
              </div>

              <h2 className="mb-4 font-nacelle text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                {featured.name}
              </h2>

              <p className="mb-6 text-lg font-medium text-emerald-200/80 leading-relaxed">
                {featured.tagline}
              </p>

              <p className="mb-8 text-sm leading-relaxed text-gray-400">
                {featured.featuredDetail?.context}
              </p>

              {/* Localidades */}
              {featured.featuredDetail?.locations && (
                <div className="mb-8 flex flex-wrap gap-2">
                  {featured.featuredDetail.locations.map((loc) => (
                    <span
                      key={loc}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-300"
                    >
                      <svg className="h-3 w-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {loc}
                    </span>
                  ))}
                </div>
              )}

              {/* What it does */}
              <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 text-xs uppercase tracking-wider text-gray-500">O que o MyCoach faz</div>
                <div className="grid grid-cols-2 gap-2">
                  {["Gera planos de aula completos", "Cria provas e exercícios", "Produz PDFs prontos para impressão", "Corrige atividades automaticamente"].map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-sm text-gray-300">
                      <svg className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-nacelle text-3xl font-semibold bg-gradient-to-br from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  {featured.impact}
                </div>
                <div className="text-xs text-gray-500">{featured.impactLabel}</div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {featured.tech.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-gray-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Direita — Mockup */}
          <div className="relative hidden lg:flex items-center justify-center p-8">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20" />
            <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
              <ProjectMockup type="mycoach" gradient={featured.gradient} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters ───────────────────────────────────────── */}
      <div className="sticky top-20 z-30 mb-10 rounded-3xl glass-heavy p-3 md:p-4" data-aos="fade-up">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-1.5">
            {categories.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_6px_20px_-6px_rgba(139,92,246,0.6)]"
                      : "border border-white/10 bg-white/[0.02] text-gray-300 hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider">
            <span className="text-white/70">{rest.length.toString().padStart(2, "0")}</span>
            <span className="ml-2 text-white/30">projetos</span>
          </div>
        </div>
      </div>

      {/* ── Project Grid ──────────────────────────────────── */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, i) => {
          const isOpen = expanded === project.id;
          return (
            <div
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={i * 50}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer ${
                isOpen
                  ? "border-white/20 bg-white/[0.06]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]"
              }`}
              onClick={() => setExpanded(isOpen ? null : project.id)}
            >
              {/* Mockup preview */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                <div className="absolute inset-0 scale-100 transition-transform duration-500 group-hover:scale-105">
                  <ProjectMockup type={project.mockup ?? "landing"} gradient={project.gradient} />
                </div>

                {/* Badges over mockup */}
                <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-1.5">
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] backdrop-blur-xl ${statusColors[project.status]}`}>
                    <span className="h-1 w-1 rounded-full bg-current" />
                    {statusLabel[project.status]}
                  </span>
                </div>
                <div className="absolute right-3 top-3 z-20">
                  <span className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] text-gray-300 backdrop-blur-xl">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="font-nacelle text-sm font-semibold leading-snug text-white">
                    {project.name}
                  </h3>
                  <div className={`mt-0.5 flex-shrink-0 rounded-lg bg-gradient-to-br ${project.gradient} p-1.5 text-white`}>
                    {project.icon}
                  </div>
                </div>

                <p className="mb-3 text-xs font-medium text-gray-400 italic">
                  "{project.tagline}"
                </p>

                <p className="text-xs leading-relaxed text-gray-500 line-clamp-2">
                  {project.story}
                </p>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                    <p className="text-xs leading-relaxed text-gray-400">{project.story}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-gray-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Impact + category */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className={`font-nacelle text-xl font-semibold bg-gradient-to-br ${project.gradient} bg-clip-text text-transparent`}>
                      {project.impact}
                    </span>
                    <div className="text-[10px] text-gray-600">{project.impactLabel}</div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-gray-500">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom CTA ────────────────────────────────────── */}
      <div className="mt-20 text-center" data-aos="fade-up">
        <div className="relative inline-block rounded-[2rem] glass-heavy p-8 md:p-12 text-center max-w-2xl">
          <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-400 uppercase tracking-wider">
              <span className="h-1 w-1 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
              Próximo projeto
            </div>
            <h3 className="mb-4 font-nacelle text-2xl font-semibold text-white md:text-3xl">
              O seu pode ser o próximo
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Desde startups até grandes empresas — a JTEC transforma ideias em produtos digitais que funcionam, vendem e escalam.
            </p>
            <a
              href="/#contato"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_10px_40px_-10px_rgba(139,92,246,0.7)] transition-all hover:scale-[1.03]"
            >
              <span className="relative z-10">Fale Conosco</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-0.5">→</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
