"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import JtecLogoCircle from "@/components/ui/jtec-logo-circle";

/**
 * Scroll-driven intro overlay (Lando-Norris-inspired density).
 * - On load: dense dark overlay with centered "JTEC" and corner metadata.
 * - On scroll: wordmark zooms through, metadata stagger-fades, dot-grid
 *   background is revealed underneath.
 * - Uses a 100vh spacer so the user has scroll room before hero appears.
 */
export default function IntroReveal() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cornerTL = useRef<HTMLDivElement>(null);
  const cornerTR = useRef<HTMLDivElement>(null);
  const cornerBL = useRef<HTMLDivElement>(null);
  const cornerBR = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let raf = 0;
    const ease = (t: number) => t * t * (3 - 2 * t); // smoothstep

    const apply = () => {
      const vh = window.innerHeight || 1;
      const raw = Math.min(1, Math.max(0, window.scrollY / vh));
      const p = ease(raw);

      const overlay = overlayRef.current;
      const word = wordRef.current;
      const inner = innerRef.current;
      const bar = progressBarRef.current;
      const tl = cornerTL.current;
      const tr = cornerTR.current;
      const bl = cornerBL.current;
      const br = cornerBR.current;
      const sub = subRef.current;

      if (overlay) {
        overlay.style.opacity = String(Math.max(0, 1 - p * 1.15));
        overlay.style.pointerEvents = raw >= 0.98 ? "none" : "auto";
      }
      if (inner) {
        // whole inner block drifts up subtly
        inner.style.transform = `translate3d(0, ${-p * 40}px, 0)`;
      }
      if (word) {
        const scale = 1 + p * 5.5;
        const spacing = -0.045 + p * 0.45;
        word.style.transform = `scale(${scale})`;
        word.style.letterSpacing = `${spacing}em`;
        word.style.filter = `blur(${p * 10}px)`;
      }
      if (sub) {
        sub.style.opacity = String(Math.max(0, 1 - p * 2.2));
        sub.style.transform = `translate3d(0, ${p * 18}px, 0)`;
      }
      if (bar) {
        bar.style.transform = `scaleX(${raw})`;
      }
      const cornerFade = Math.max(0, 1 - p * 2.4);
      if (tl) {
        tl.style.opacity = String(cornerFade);
        tl.style.transform = `translate3d(${-p * 20}px, ${-p * 20}px, 0)`;
      }
      if (tr) {
        tr.style.opacity = String(cornerFade);
        tr.style.transform = `translate3d(${p * 20}px, ${-p * 20}px, 0)`;
      }
      if (bl) {
        bl.style.opacity = String(cornerFade);
        bl.style.transform = `translate3d(${-p * 20}px, ${p * 20}px, 0)`;
      }
      if (br) {
        br.style.opacity = String(cornerFade);
        br.style.transform = `translate3d(${p * 20}px, ${p * 20}px, 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
    };
  }, []);

  const time = clock.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const date = clock.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      {/* Scroll runway so the intro can animate */}
      <div aria-hidden="true" className="pointer-events-none h-screen w-full" />

      {/* Fixed overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[70] overflow-hidden bg-[#030014]"
        style={{ willChange: "opacity" }}
      >
        {/* Subtle aurora inside the intro only (disappears with overlay) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(ellipse 40% 30% at 85% 15%, rgba(236,72,153,0.10), transparent 60%), radial-gradient(ellipse 40% 30% at 15% 85%, rgba(16,185,129,0.08), transparent 60%)",
          }}
        />

        {/* Fine grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 70% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        {/* Grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* ── Corner metadata ─────────────────────────────── */}

        {/* Top-left: brand mark + record dot */}
        <div
          ref={cornerTL}
          className="absolute left-5 top-5 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white/55 md:left-8 md:top-8"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-white/90">JTEC°</span>
          <span className="text-white/25">/</span>
          <span>v1.0 · MMXXVI</span>
          <span className="text-white/25">/</span>
          <span className="hidden sm:inline">Dez 2023 → {clock.getFullYear()}</span>
        </div>

        {/* Top-right: coords + live clock */}
        <div
          ref={cornerTR}
          className="absolute right-5 top-5 flex flex-col items-end gap-1 text-right text-[10px] font-mono uppercase tracking-[0.25em] text-white/55 md:right-8 md:top-8"
        >
          <div>Belo Horizonte · MG · BR</div>
          <div className="text-white/35">19°55′S · 43°56′W</div>
          <div className="mt-1 text-white/80 tabular-nums">
            {date} <span className="text-white/30">·</span> {time}
          </div>
        </div>

        {/* Bottom-left: specialty tags */}
        <div
          ref={cornerBL}
          className="absolute bottom-6 left-5 flex flex-col gap-1 text-[10px] font-mono uppercase tracking-[0.25em] text-white/50 md:bottom-10 md:left-8"
        >
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-6 bg-white/30" />
            <span>Fullstack</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-10 bg-white/30" />
            <span>IA · LLMs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-14 bg-white/30" />
            <span>Infraestrutura</span>
          </div>
        </div>

        {/* Bottom-right: scroll hint */}
        <div
          ref={cornerBR}
          className="absolute bottom-6 right-5 flex flex-col items-end gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/60 md:bottom-10 md:right-8"
        >
          <div className="flex items-center gap-2">
            <span>Role para continuar</span>
            <span className="inline-block h-3.5 w-[10px] rounded-full border border-white/40">
              <span className="mx-auto mt-1 block h-1 w-px bg-white/80 animate-[scrollDot_1.6s_ease-in-out_infinite]" />
            </span>
          </div>
          <div className="text-white/35">scroll · drag · explore</div>
        </div>

        {/* ── Center stack ────────────────────────────────── */}
        <div
          ref={innerRef}
          className="relative flex h-full w-full flex-col items-center justify-center px-4"
        >
          {/* Logo mark */}
          <div className="mb-6 opacity-0 animate-[introFade_1.6s_ease-out_0.1s_forwards]">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/25 via-violet-500/20 to-fuchsia-500/25 blur-3xl" />
              <div className="absolute h-20 w-20 rounded-full bg-violet-600/20 blur-xl" />
              <JtecLogoCircle
                size={88}
                uid="intro"
                className="relative"
                style={{ filter: "drop-shadow(0 0 18px rgba(139,92,246,0.45)) drop-shadow(0 0 40px rgba(168,85,247,0.2))" }}
              />
            </div>
          </div>

          {/* small kicker above wordmark */}
          <div className="mb-6 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.35em] text-white/50 opacity-0 animate-[introFade_1.2s_ease-out_0.2s_forwards]">
            <span className="h-px w-8 bg-white/40" />
            <span>Tecnologia &amp; Inovação</span>
            <span className="h-px w-8 bg-white/40" />
          </div>

          {/* The wordmark */}
          <h1
            ref={wordRef}
            className="font-nacelle text-[clamp(5.5rem,22vw,20rem)] font-semibold leading-none tracking-tight text-white opacity-0 animate-[introWord_1.6s_cubic-bezier(0.2,0.8,0.2,1)_forwards]"
            style={{
              willChange: "transform, letter-spacing, filter",
              textShadow: "0 0 80px rgba(139,92,246,0.25)",
            }}
          >
            JTEC
          </h1>

          {/* Sub line */}
          <div
            ref={subRef}
            className="mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-[11px] font-mono uppercase tracking-[0.35em] text-white/60 opacity-0 animate-[introFade_1.2s_ease-out_0.9s_forwards]"
          >
            <span>Fullstack</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span>Inteligência Artificial</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span>Infra &amp; DevOps</span>
          </div>

          {/* Store CTA — glass morphism */}
          <div className="mt-10 opacity-0 animate-[introFade_1.2s_ease-out_1.1s_forwards]">
            <Link
              href="/loja"
              className="group relative inline-flex items-center gap-3 rounded-full border border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-6 py-3 text-sm font-medium text-white backdrop-blur-2xl transition-all hover:scale-[1.03] hover:border-white/20 hover:bg-gradient-to-b hover:from-white/[0.12] hover:to-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_32px_rgba(0,0,0,0.1)]"
            >
              {/* Glossy highlight on top */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                  <path d="M3 4h2l2.5 12h11L21 7H6" />
                </svg>
              </span>
              <span className="relative z-10">Acesse a loja</span>
              <span className="relative z-10 flex items-center gap-1 text-white/60">
                <span className="h-3 w-px bg-white/20" />
                <span className="text-[10px] font-mono uppercase tracking-[0.25em]">
                  9 produtos
                </span>
              </span>
              <svg className="relative z-10 h-3.5 w-3.5 text-white/80 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Live strip */}
          <div className="mt-8 flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.3em] text-white/45 opacity-0 animate-[introFade_1.2s_ease-out_1.3s_forwards]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              <span>online</span>
            </div>
            <div className="h-3 w-px bg-white/20" />
            <div>
              Uptime <span className="text-white/75">99.9%</span>
            </div>
            <div className="h-3 w-px bg-white/20" />
            <div>
              Deploy <span className="text-white/75">&lt; 30s</span>
            </div>
            <div className="h-3 w-px bg-white/20" />
            <div>
              IA <span className="text-white/75">+30 idiomas</span>
            </div>
          </div>
        </div>

        {/* Bottom progress bar (fills as user scrolls the intro) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-3 px-5 pb-3 md:px-8 md:pb-4">
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">
            00
          </span>
          <div className="relative h-[1px] flex-1 overflow-hidden bg-white/10">
            <div
              ref={progressBarRef}
              className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
              style={{ transform: "scaleX(0)", willChange: "transform" }}
            />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">
            01
          </span>
        </div>

        {/* Side ticks — Lando-style dense borders */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:block" />
      </div>
    </>
  );
}
