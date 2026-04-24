import TiltCard from "@/components/tilt-card";

type Service = {
  tag: string;
  title: string;
  description: string;
  items: string[];
  gradient: string;
  glow: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    tag: "Fullstack",
    title: "Desenvolvimento Web",
    description:
      "Aplicações web completas com React, Next.js e TypeScript no front. Python (Django) e PHP no back. Foco total em performance, SEO e escala.",
    items: ["React & Next.js 15", "TypeScript / JavaScript", "Python · Django · PHP", "APIs REST & GraphQL"],
    gradient: "from-indigo-500/80 via-blue-500/60 to-cyan-500/80",
    glow: "shadow-[0_0_80px_-10px_rgba(99,102,241,0.5)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    tag: "IA & LLMs",
    title: "Inteligência Artificial",
    description:
      "Deploy e integração de LLMs com Ollama e Llama.cpp. Servidores dedicados de IA para geração de conteúdo educativo, automação e soluções corporativas.",
    items: ["Ollama · Llama.cpp", "Deploy de modelos LLM", "Servidores de IA dedicados", "RAG & automação inteligente"],
    gradient: "from-violet-500/80 via-fuchsia-500/60 to-pink-500/80",
    glow: "shadow-[0_0_80px_-10px_rgba(168,85,247,0.5)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
  },
  {
    tag: "Infraestrutura",
    title: "DevOps & Servidores",
    description:
      "Configuração, manutenção e otimização de servidores com Nginx. Conexões HTTP/HTTPS, SSL e infraestrutura back-end robusta para produção.",
    items: ["Nginx · HTTP/HTTPS", "Configuração de servidores", "Manutenção completa de ambientes", "Hardware & suporte técnico"],
    gradient: "from-emerald-500/80 via-teal-500/60 to-cyan-500/80",
    glow: "shadow-[0_0_80px_-10px_rgba(16,185,129,0.5)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="5" rx="1" />
        <rect x="2" y="10" width="20" height="5" rx="1" />
        <rect x="2" y="17" width="20" height="5" rx="1" />
        <circle cx="6" cy="5.5" r="0.5" fill="currentColor" />
        <circle cx="6" cy="12.5" r="0.5" fill="currentColor" />
        <circle cx="6" cy="19.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Workflows() {
  return (
    <section id="servicos" className="relative py-24 md:py-32">

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-400 backdrop-blur-xl"
            data-aos="fade-up"
          >
            <span className="h-1 w-1 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
            O que fazemos
          </div>

          <h2
            className="mb-6 font-nacelle text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <span className="text-white/90">Soluções </span>
            <span className="bg-gradient-to-br from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              que escalam.
            </span>
            <br />
            <span className="text-white/60">Design que encanta.</span>
          </h2>

          <p
            className="mx-auto max-w-2xl text-lg text-gray-400"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            Da concepção ao deploy, entregamos arquitetura robusta, UX refinado e integração inteligente com IA — tudo com a qualidade que produtos sérios merecem.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              className="h-full"
            >
              <TiltCard max={8} scale={1.02}>
                <div className={`group relative h-full overflow-hidden rounded-3xl glass-heavy transition-all duration-500 hover:${s.glow}`}>
                  {/* Gradient corner accent */}
                  <div
                    className={`pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${s.gradient} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40`}
                  />

                  {/* Top highlight */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                  <div className="relative flex h-full flex-col p-8">
                    {/* Icon */}
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-xl">
                      <div className={`flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]`}>
                        {s.icon}
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="mb-3 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-gray-400">
                      {s.tag}
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-nacelle text-2xl font-semibold text-white">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 text-sm leading-relaxed text-gray-400">
                      {s.description}
                    </p>

                    {/* Bullet list */}
                    <ul className="mt-auto space-y-2.5">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                          <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gradient-to-br ${s.gradient}`} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Bottom action */}
                    <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-5 text-xs text-gray-500 transition-colors group-hover:text-indigo-300">
                      <span>Saiba mais</span>
                      <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Bottom feature strip */}
        <div
          className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          {[
            { icon: "⚡", label: "Deploy rápido" },
            { icon: "🛡️", label: "Segurança em primeiro" },
            { icon: "📈", label: "Performance otimizada" },
            { icon: "🤖", label: "IA integrada nativamente" },
          ].map((f, i) => (
            <div
              key={i}
              className="glass flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all hover:bg-white/[0.06]"
            >
              <span className="text-xl">{f.icon}</span>
              <span className="text-gray-300">{f.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
