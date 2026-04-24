"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
              { href: "/#servicos", label: "Serviços" },
              { href: "/#sobre", label: "Sobre" },
              { href: "/#tecnologias", label: "Stack" },
              { href: "/loja", label: "Loja", highlight: true },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-all ${
                  item.highlight
                    ? "text-white/90 hover:bg-white/5"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.highlight && (
                  <span className="absolute left-1 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-400 animate-pulse" />
                )}
                <span className={item.highlight ? "pl-2" : ""}>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <Link
              href="/loja"
              className="group hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-gray-200 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.06]"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M3 4h2l2.5 12h11L21 7H6" />
              </svg>
              Loja
            </Link>
            <a
              href="/#contato"
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
