import TiltCard from "@/components/tilt-card";

const techStack = [
  {
    category: "Front-end",
    color: "from-blue-400 to-indigo-400",
    ring: "ring-indigo-400/30",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS / SCSS"],
  },
  {
    category: "Back-end",
    color: "from-indigo-400 to-violet-400",
    ring: "ring-violet-400/30",
    items: ["Python", "Django", "PHP", "APIs REST", "HTTP / HTTPS"],
  },
  {
    category: "IA & LLMs",
    color: "from-violet-400 to-fuchsia-400",
    ring: "ring-fuchsia-400/30",
    items: ["Ollama", "Llama.cpp", "Deploy de modelos", "Servidores de IA"],
  },
  {
    category: "DevOps & Infra",
    color: "from-fuchsia-400 to-pink-400",
    ring: "ring-pink-400/30",
    items: ["Nginx", "Configuração de servidores", "Manutenção de ambientes"],
  },
  {
    category: "Outros",
    color: "from-amber-400 to-orange-400",
    ring: "ring-amber-400/30",
    items: ["C#", "C", "Git", "Hardware", "Windows", "Pacote Office"],
  },
];

const capabilities = [
  { k: "Fullstack", v: "React · Next.js · TypeScript · Django · PHP" },
  { k: "IA / LLMs", v: "Ollama · Llama.cpp · Deploy de modelos" },
  { k: "DevOps", v: "Nginx · Servidores · HTTP/HTTPS" },
  { k: "Hardware", v: "Montagem · Formatação · Suporte técnico" },
];

export default function Features() {
  return (
    <>
      {/* ═══ SOBRE ═══ */}
      <section id="sobre" className="relative py-24 md:py-32">

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">

            {/* LEFT — Text + bio */}
            <div className="order-2 md:order-1" data-aos="fade-right">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-400 backdrop-blur-xl">
                <span className="h-1 w-1 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
                Quem somos
              </div>

              <h2 className="mb-6 font-nacelle text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
                <span className="text-white/90">A JTEC é </span>
                <span className="bg-gradient-to-br from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  tecnologia viva.
                </span>
              </h2>

              <div className="space-y-5 text-lg leading-relaxed text-gray-400">
                <p>
                  Empresa de tecnologia nascida em Belo Horizonte/MG, liderada por{" "}
                  <span className="font-semibold text-white">João Vitor C. Varella</span>,
                  Desenvolvedor Fullstack Pleno com mais de 3 anos criando produtos reais.
                </p>
                <p>
                  Nossa expertise vai do front-end moderno ao servidor de IA dedicado — passando por deploy de LLMs,
                  infraestrutura escalável com Nginx, e manutenção técnica completa de hardware e software em ambientes Windows.
                </p>
                <p className="text-gray-500">
                  Um time pequeno, focado, que entrega com a precisão e o cuidado que os melhores produtos do mundo exigem.
                </p>
              </div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  { label: "Inglês · Avançado", icon: "🇬🇧" },
                  { label: "Espanhol · Intermediário", icon: "🇪🇸" },
                  { label: "Belo Horizonte, MG", icon: "📍" },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className="glass-light inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-gray-300"
                  >
                    <span>{tag.icon}</span>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — Feature card mosaic */}
            <div className="relative order-1 md:order-2" data-aos="fade-left">

              {/* Big founder card */}
              <TiltCard max={5} scale={1.01}>
                <div className="relative overflow-hidden rounded-3xl glass-heavy p-8">
                  {/* Decorative gradient */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 opacity-30 blur-3xl" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  <div className="relative">
                    {/* Avatar with initials */}
                    <div className="mb-6 flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 blur-md" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 font-nacelle text-xl font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]">
                          JV
                        </div>
                      </div>
                      <div>
                        <div className="font-nacelle text-lg font-semibold text-white">João Vitor C. Varella</div>
                        <div className="text-sm text-gray-400">Owner / CEO · Dev Fullstack Pleno</div>
                      </div>
                    </div>

                    {/* Tech capabilities mini cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {capabilities.map((c, i) => (
                        <div
                          key={i}
                          className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all hover:border-white/15 hover:bg-white/[0.06]"
                        >
                          <div className="mb-1 font-nacelle text-base font-semibold text-white">{c.k}</div>
                          <div className="text-[11px] leading-relaxed text-gray-500">{c.v}</div>
                          <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                        </div>
                      ))}
                    </div>

                    {/* Progress bar fake skill viz */}
                    <div className="mt-6 space-y-3">
                      {[
                        { label: "Fullstack Web", value: 95 },
                        { label: "IA & LLMs", value: 88 },
                        { label: "DevOps & Infra", value: 82 },
                      ].map((skill) => (
                        <div key={skill.label}>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-gray-400">{skill.label}</span>
                            <span className="font-mono text-gray-500">{skill.value}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
                              style={{
                                width: `${skill.value}%`,
                                boxShadow: "0 0 10px rgba(168,85,247,0.6)",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Floating satellite card */}
              <div
                className="absolute -right-4 -bottom-6 hidden md:block"
                style={{ animation: "float 10s ease-in-out infinite" }}
              >
                <div className="glass-heavy rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-xs font-medium text-white">Aceitando novos projetos</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ TECNOLOGIAS ═══ */}
      <section id="tecnologias" className="relative py-24 md:py-32">

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-400 backdrop-blur-xl"
              data-aos="fade-up"
            >
              <span className="h-1 w-1 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
              Stack Tecnológico
            </div>

            <h2
              className="mb-6 font-nacelle text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <span className="text-white/90">Ferramentas </span>
              <span className="bg-gradient-to-br from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                que dominamos.
              </span>
            </h2>

            <p
              className="mx-auto max-w-2xl text-lg text-gray-400"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              Um arsenal completo para construir, escalar e manter qualquer solução digital — do front-end ao servidor de IA dedicado.
            </p>
          </div>

          {/* Tech stack grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {techStack.map((group, gi) => (
              <div
                key={group.category}
                data-aos="fade-up"
                data-aos-delay={gi * 80}
                className="group relative h-full"
              >
                <div className="relative h-full overflow-hidden rounded-3xl glass p-6 transition-all duration-500 hover:bg-white/[0.06]">
                  {/* Top glow */}
                  <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${group.color} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40`} />

                  {/* Category label */}
                  <div className="mb-4 flex items-center gap-2">
                    <div className={`h-8 w-1 rounded-full bg-gradient-to-b ${group.color}`} />
                    <h3 className={`font-nacelle text-sm font-semibold uppercase tracking-wider bg-gradient-to-r ${group.color} bg-clip-text text-transparent`}>
                      {group.category}
                    </h3>
                  </div>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tech) => (
                      <span
                        key={tech}
                        className={`tech-pill inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-200 backdrop-blur-xl`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom metric band */}
          <div
            className="mt-16 overflow-hidden rounded-3xl glass-heavy"
            data-aos="fade-up"
          >
            <div className="grid grid-cols-1 divide-white/5 md:grid-cols-4 md:divide-x">
              {[
                { k: "100%", v: "Código próprio, sem boilerplate" },
                { k: "30+", v: "Projetos entregues" },
                { k: "24/7", v: "Infraestrutura monitorada" },
                { k: "IA", v: "Integração nativa em produtos" },
              ].map((m, i) => (
                <div key={i} className="p-6 text-center">
                  <div className="mb-1 font-nacelle text-3xl font-semibold bg-gradient-to-br from-white via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
                    {m.k}
                  </div>
                  <div className="text-xs leading-relaxed text-gray-500">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
