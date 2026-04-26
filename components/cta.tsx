export default function Cta() {
  return (
    <section id="contato" className="relative py-24 md:py-32">

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

        {/* Main glass panel */}
        <div
          className="relative overflow-hidden rounded-[2rem] glass-heavy p-8 md:p-16"
          data-aos="fade-up"
        >
          {/* Huge accent blobs inside */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 opacity-30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 opacity-25 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="relative grid gap-12 md:grid-cols-2 md:items-center md:gap-16">

            {/* LEFT — Content */}
            <div>
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-400 backdrop-blur-xl"
                data-aos="fade-up"
              >
                <span className="h-1 w-1 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
                Contato
              </div>

              <h2
                className="mb-6 font-nacelle text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <span className="text-white/90">Vamos construir </span>
                <span className="bg-gradient-to-br from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  algo incrível.
                </span>
              </h2>

              <p
                className="mb-8 text-lg leading-relaxed text-gray-400"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Tem um projeto em mente, uma ideia ambiciosa ou precisa de suporte técnico?
                A JTEC responde rápido e entrega com qualidade.
              </p>

              {/* Primary CTA */}
              <div className="flex flex-col gap-3 sm:flex-row" data-aos="fade-up" data-aos-delay={300}>
                <a
                  href="mailto:jtecBH@hotmail.com"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 px-7 py-3 font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_10px_40px_-10px_rgba(139,92,246,0.7)] transition-all hover:scale-[1.03]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="relative z-10">Enviar mensagem</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </a>

              </div>

              {/* Availability */}
              <div
                className="mt-10 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 px-4 py-3 backdrop-blur-xl"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm text-emerald-100">
                  <span className="font-semibold">Disponível agora</span>
                  <span className="text-emerald-200/60"> · Resposta em até 24h</span>
                </span>
              </div>
            </div>

            {/* RIGHT — Contact cards */}
            <div className="grid gap-4" data-aos="fade-left">
              {[
                {
                  icon: (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: "E-mail",
                  value: "jtecBH@hotmail.com",
                  href: "mailto:jtecBH@hotmail.com",
                  gradient: "from-indigo-500 to-violet-500",
                },
                {
                  icon: (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  label: "Localização",
                  value: "Belo Horizonte, MG · Brasil",
                  href: null,
                  gradient: "from-fuchsia-500 to-pink-500",
                },
              ].map((card, i) => {
                const Element = card.href ? "a" : "div";
                return (
                  <Element
                    key={i}
                    {...(card.href ? { href: card.href, target: card.href.startsWith("http") ? "_blank" : undefined, rel: card.href.startsWith("http") ? "noopener noreferrer" : undefined } : {})}
                    className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl glass p-4 transition-all ${card.href ? "cursor-pointer hover:scale-[1.02] hover:bg-white/[0.08]" : ""}`}
                  >
                    {/* Icon wrapper */}
                    <div className="relative flex-shrink-0">
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.gradient} opacity-60 blur-md transition-opacity group-hover:opacity-100`} />
                      <div className={`relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]`}>
                        {card.icon}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 text-[11px] uppercase tracking-wider text-gray-500">
                        {card.label}
                      </div>
                      <div className="truncate font-medium text-white transition-colors group-hover:text-white">
                        {card.value}
                      </div>
                    </div>

                    {card.href && (
                      <svg className="h-4 w-4 text-gray-500 transition-all group-hover:translate-x-1 group-hover:text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    )}
                  </Element>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
