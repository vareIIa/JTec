"use client";

import { useEffect, useState } from "react";
import Logo from "./logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 transition-all duration-500 md:pt-5">
      <div
        className={`relative w-full max-w-5xl overflow-hidden rounded-2xl transition-all duration-500 ${
          scrolled ? "glass-nav" : "glass"
        }`}
      >
        {/* Top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "#servicos", label: "Serviços" },
              { href: "#sobre", label: "Sobre" },
              { href: "#tecnologias", label: "Stack" },
              { href: "#experiencia", label: "Experiência" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-gray-400 transition-all hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center">
            <a
              href="#contato"
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-1.5 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_6px_20px_-6px_rgba(139,92,246,0.6)] transition-all hover:scale-[1.03] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_10px_28px_-6px_rgba(139,92,246,0.8)]"
            >
              <span className="relative z-10">Fale Conosco</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-0.5">→</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
