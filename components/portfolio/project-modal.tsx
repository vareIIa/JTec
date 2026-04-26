"use client";

import { useEffect, useRef } from "react";
import { Project } from "./portfolio-data";
import ProjectMockup from "./project-mockup";

const statusLabel: Record<string, string> = {
  live: "No ar",
  ongoing: "Em desenvolvimento",
  archived: "Arquivado",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i <= rating ? "text-amber-400" : "text-white/15"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-2xl"
        style={{ animation: "backdropIn 0.25s ease forwards" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full sm:max-w-4xl flex flex-col overflow-hidden rounded-t-[2rem] sm:rounded-[2rem] border border-white/10"
        style={{
          maxHeight: "92dvh",
          animation: "modalIn 0.38s cubic-bezier(0.34,1.4,0.64,1) forwards",
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 50%, rgba(99,102,241,0.06) 100%)",
          backdropFilter: "blur(40px) saturate(200%)",
          boxShadow:
            "inset 0 1px 1px 0 rgba(255,255,255,0.15), 0 40px 80px -20px rgba(0,0,0,0.8)",
        }}
      >
        {/* Sticky header bar */}
        <div className="flex-shrink-0 flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-br ${project.gradient}`}
            />
            <span className="truncate font-nacelle text-sm font-semibold text-white/80">
              {project.name}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-500 transition-all hover:border-white/20 hover:text-white"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">

          {/* Hero gradient banner */}
          <div className={`relative overflow-hidden bg-gradient-to-br ${project.gradient} px-8 py-9 md:px-10`}>
            {/* Noise overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              }}
            />
            {/* Glare top edge */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40" />
            <div className="relative">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/20 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur-xl">
                  <span className="relative flex h-1.5 w-1.5">
                    {project.status === "live" && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                    )}
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/80" />
                  </span>
                  {statusLabel[project.status]}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-xl">
                  {project.category}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-xl">
                  {project.year}
                </span>
              </div>
              <h2 className="mb-2 font-nacelle text-2xl font-semibold leading-tight text-white drop-shadow-lg md:text-3xl">
                {project.name}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-white/70">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-3 divide-x divide-white/[0.07] border-b border-white/[0.07]">
            <div className="flex flex-col items-center justify-center px-4 py-5 text-center">
              <span
                className={`font-nacelle text-xl font-semibold bg-gradient-to-br ${project.gradient} bg-clip-text text-transparent md:text-2xl`}
              >
                {project.impact}
              </span>
              <span className="mt-0.5 text-[10px] leading-tight text-gray-500">{project.impactLabel}</span>
            </div>
            <div className="flex flex-col items-center justify-center px-4 py-5 text-center">
              <span className="font-nacelle text-xl font-semibold text-white/70 md:text-2xl">
                {project.year}
              </span>
              <span className="mt-0.5 text-[10px] text-gray-500">Ano de entrega</span>
            </div>
            <div className="flex flex-col items-center justify-center px-4 py-5 text-center">
              <span className="font-nacelle text-xl font-semibold text-white/70 md:text-2xl">
                {project.tech.length}
              </span>
              <span className="mt-0.5 text-[10px] text-gray-500">Tecnologias</span>
            </div>
          </div>

          {/* Mockup preview */}
          <div className="border-b border-white/[0.07] p-5 md:p-6">
            <div
              className="overflow-hidden rounded-xl border border-white/10"
              style={{ aspectRatio: "16/9" }}
            >
              <ProjectMockup
                type={project.mockup ?? "landing"}
                gradient={project.gradient}
              />
            </div>
          </div>

          {/* Content sections */}
          <div className="divide-y divide-white/[0.07]">

            {/* O Desafio */}
            <section className="px-6 py-6 md:px-8">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-gray-600">O Desafio</p>
              <p className="text-sm leading-relaxed text-gray-300">{project.story}</p>
            </section>

            {/* Featured detail */}
            {project.featuredDetail && (
              <>
                <section className="px-6 py-6 md:px-8">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-gray-600">A Solução</p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {project.featuredDetail.solution}
                  </p>
                </section>
                <section className="px-6 py-6 md:px-8">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-gray-600">O Resultado</p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {project.featuredDetail.result}
                  </p>
                  {project.featuredDetail.locations && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.featuredDetail.locations.map((loc) => (
                        <span
                          key={loc}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-400"
                        >
                          <svg className="h-3 w-3 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {loc}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}

            {/* Stack */}
            <section className="px-6 py-6 md:px-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-gray-600">Stack utilizada</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="tech-pill rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-300 transition-all hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            {project.testimonials && project.testimonials.length > 0 && (
              <section className="px-6 py-6 md:px-8">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                    O que os clientes dizem
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/[0.06] px-2.5 py-1 text-[10px] text-amber-400">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Verificado
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.testimonials.map((t, idx) => (
                    <div
                      key={idx}
                      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl"
                    >
                      {/* Top glare */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      {/* Author row */}
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.avatarGradient} text-xs font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)]`}
                          >
                            {t.initials}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white/90">{t.author}</div>
                            <div className="text-[11px] leading-tight text-gray-500">{t.role}</div>
                          </div>
                        </div>
                        <Stars rating={t.rating} />
                      </div>

                      {/* Quote */}
                      <p className="mb-4 text-sm leading-relaxed text-gray-400">
                        &ldquo;{t.text}&rdquo;
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                        <span className="text-[10px] text-gray-600">{t.company}</span>
                        <span className="text-[10px] text-gray-600">{t.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Sticky footer CTA */}
        <div className="flex-shrink-0 flex items-center justify-between gap-4 border-t border-white/[0.07] bg-black/30 px-5 py-4 backdrop-blur-xl">
          <p className="text-xs text-gray-500 hidden sm:block">
            Interessado em um projeto parecido?
          </p>
          <a
            href="/#contato"
            onClick={onClose}
            className="group relative ml-auto inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_6px_24px_-6px_rgba(139,92,246,0.7)] transition-all hover:scale-[1.03]"
          >
            <span className="relative z-10">Fale Conosco</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-0.5">→</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
        </div>
      </div>
    </div>
  );
}
