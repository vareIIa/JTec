const experience = [
  {
    period: "Dez 2025 — Presente",
    role: "Owner / CEO",
    company: "JTEC",
    location: "Belo Horizonte, MG",
    highlight: true,
    accent: "from-indigo-400 via-violet-400 to-fuchsia-400",
    bullets: [
      "Fundação e liderança estratégica da empresa de tecnologia JTEC.",
      "Desenvolvimento de soluções fullstack, IA e infraestrutura para clientes corporativos e educacionais.",
      "Gestão de projetos, arquitetura de sistemas e relacionamento com clientes.",
    ],
  },
  {
    period: "2024 — Presente",
    role: "Desenvolvedor Fullstack Pleno",
    company: "PTEC",
    location: "Belo Horizonte, MG",
    highlight: false,
    accent: "from-violet-400 to-fuchsia-400",
    bullets: [
      "Desenvolvimento fullstack com React, Next.js, TypeScript, Python (Django) e PHP, com foco em soluções educacionais e corporativas.",
      "Criação e deploy de soluções com IA (LLMs) usando Ollama e Llama.cpp, incluindo servidores dedicados para geração de materiais educativos.",
      "Configuração, manutenção e otimização de servidores com Nginx e infraestrutura HTTP/HTTPS escalável.",
      "Integração de APIs externas e otimização de performance em projetos corporativos.",
    ],
  },
  {
    period: "2023",
    role: "Desenvolvedor",
    company: "Projeto Desenvolve",
    location: "Belo Horizonte, MG",
    highlight: false,
    accent: "from-fuchsia-400 to-pink-400",
    bullets: [
      "Desenvolvimento de plataforma web para aplicação de provas online e sistema de monitoria para alunos.",
      "Prestação de suporte técnico e resolução de problemas em ambiente educacional.",
      "Colaboração direta com a equipe pedagógica para entrega de soluções funcionais e intuitivas.",
    ],
  },
];

const education = [
  {
    period: "2024 — 2025",
    course: "Engenharia de Software",
    institution: "Faculdade Newton Paiva",
    location: "Belo Horizonte, MG",
    icon: "🎓",
  },
  {
    period: "2022",
    course: "Engenharia de Software",
    institution: "PUC Minas",
    location: "Pontifícia Universidade Católica de Minas Gerais",
    icon: "🏛️",
  },
  {
    period: "2017 — 2019",
    course: "Ensino Médio Técnico",
    institution: "Colégio COTEMIG",
    location: "Belo Horizonte, MG",
    icon: "📚",
  },
];

export default function Testimonials() {
  return (
    <section id="experiencia" className="relative py-24 md:py-32">

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-400 backdrop-blur-xl"
            data-aos="fade-up"
          >
            <span className="h-1 w-1 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
            Trajetória
          </div>

          <h2
            className="mb-6 font-nacelle text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <span className="text-white/90">Três anos. </span>
            <span className="bg-gradient-to-br from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              Múltiplas vitórias.
            </span>
          </h2>

          <p
            className="mx-auto max-w-2xl text-lg text-gray-400"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            Uma trajetória construindo produtos reais, do ensino à empresa própria — sempre com qualidade, performance e inovação.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical glowing line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-px"
            aria-hidden="true"
          >
            <div className="h-full w-full bg-gradient-to-b from-indigo-400/60 via-violet-400/40 via-fuchsia-400/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-400/60 via-violet-400/40 via-fuchsia-400/30 to-transparent blur-sm" />
          </div>

          <div className="space-y-8 md:space-y-16">
            {experience.map((job, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className="relative"
                  data-aos={isLeft ? "fade-right" : "fade-left"}
                  data-aos-delay={i * 100}
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2 z-10">
                    <div className="relative flex h-4 w-4 items-center justify-center">
                      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-br ${job.accent} opacity-50`} />
                      <span className={`relative inline-flex h-4 w-4 rounded-full bg-gradient-to-br ${job.accent} ring-4 ring-[#030014] shadow-[0_0_12px_rgba(168,85,247,0.6)]`} />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`pl-10 md:w-1/2 md:pl-0 ${
                      isLeft ? "md:pr-12 md:text-right md:self-start" : "md:ml-auto md:pl-12"
                    }`}
                  >
                    <div className="group relative overflow-hidden rounded-3xl glass-heavy p-6 transition-all duration-500 hover:bg-white/[0.08] md:p-8">
                      {/* Accent corner */}
                      <div className={`pointer-events-none absolute ${isLeft ? "-left-10" : "-right-10"} -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${job.accent} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`} />

                      {/* Top highlight */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                      <div className="relative">
                        {/* Period + featured badge */}
                        <div className={`mb-3 flex items-center gap-2 ${isLeft ? "md:justify-end" : ""}`}>
                          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-gray-400">
                            {job.period}
                          </span>
                          {job.highlight && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-fuchsia-300">
                              <span className="h-1 w-1 rounded-full bg-fuchsia-400 animate-pulse" />
                              Atual
                            </span>
                          )}
                        </div>

                        {/* Role */}
                        <h3 className="mb-1 font-nacelle text-xl font-semibold text-white md:text-2xl">
                          {job.role}
                        </h3>

                        {/* Company */}
                        <div className={`mb-5 flex items-center gap-2 text-sm ${isLeft ? "md:justify-end" : ""}`}>
                          <span className={`bg-gradient-to-r ${job.accent} bg-clip-text font-semibold text-transparent`}>
                            {job.company}
                          </span>
                          <span className="text-gray-600">·</span>
                          <span className="text-gray-500">{job.location}</span>
                        </div>

                        {/* Bullets */}
                        <ul className={`space-y-2.5 ${isLeft ? "md:text-right" : ""}`}>
                          {job.bullets.map((b, bi) => (
                            <li
                              key={bi}
                              className={`flex items-start gap-2 text-sm leading-relaxed text-gray-300 ${
                                isLeft ? "md:flex-row-reverse md:text-right" : ""
                              }`}
                            >
                              <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gradient-to-br ${job.accent}`} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ FORMAÇÃO ═══ */}
        <div className="mt-24 md:mt-32">
          <div className="mb-12 text-center">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-400 backdrop-blur-xl"
              data-aos="fade-up"
            >
              <span className="h-1 w-1 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
              Formação
            </div>
            <h3
              className="font-nacelle text-3xl font-semibold text-white md:text-4xl"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <span className="text-white/90">Formação </span>
              <span className="bg-gradient-to-br from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                Acadêmica
              </span>
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {education.map((edu, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl glass p-6 transition-all duration-500 hover:bg-white/[0.06]"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-xl ring-1 ring-white/10">
                      {edu.icon}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-indigo-300">{edu.period}</div>
                  </div>
                  <div className="mb-1 font-nacelle text-base font-semibold text-white">{edu.course}</div>
                  <div className="text-sm font-medium text-gray-300">{edu.institution}</div>
                  <div className="mt-2 text-xs text-gray-500">{edu.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
