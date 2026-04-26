import Link from "next/link";
import TiltCard from "@/components/tilt-card";

const techLogos = [
  "React", "Next.js", "TypeScript", "Python", "Django", "PHP",
  "Ollama", "Llama.cpp", "Nginx", "Node", "Git", "REST",
];

export default function HeroHome() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">

      {/* Radial glow behind hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
      >
        <div className="h-[36rem] w-[80rem] rounded-[50%] bg-gradient-to-b from-indigo-600/25 via-violet-600/15 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-20 md:pb-28">

          {/* Live badge */}
          <div className="flex justify-center mb-8" data-aos="fade-down">
            <div className="group relative inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-gray-300 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.06]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-gray-300">Belo Horizonte, MG</span>
              <span className="text-white/20">·</span>
              <span className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text font-medium text-transparent">
                Desde Dez 2023
              </span>
            </div>
          </div>

          {/* Huge headline */}
          <div className="text-center">
            <h1
              className="mb-6 font-nacelle text-[2.75rem] font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]"
              data-aos="fade-up"
            >
              <span className="block text-gradient animate-[gradient_8s_linear_infinite] bg-[length:200%_auto]" style={{
                backgroundImage: "linear-gradient(110deg, #fff 0%, #e0e7ff 20%, #c7d2fe 40%, #a78bfa 60%, #f0abfc 80%, #fff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Tecnologia
              </span>
              <span className="block text-white/80">
                que se <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-br from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">sente</span>
                  <span className="absolute -inset-x-2 -inset-y-0 -z-0 block rounded-lg bg-gradient-to-br from-indigo-500/30 via-violet-500/30 to-fuchsia-500/30 blur-xl"></span>
                </span>.
              </span>
            </h1>

            <p
              className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl"
              data-aos="fade-up"
              data-aos-delay={150}
            >
              A <span className="font-semibold text-white">JTEC</span> entrega soluções completas em desenvolvimento fullstack,
              inteligência artificial e infraestrutura — com design fresco, performance extrema
              e a precisão que produtos sérios exigem.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <a
                href="#contato"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 px-7 py-3 font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_10px_40px_-10px_rgba(139,92,246,0.7)] transition-all hover:scale-[1.03] sm:w-auto"
              >
                <span className="relative z-10">Iniciar projeto</span>
                <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </a>
              <Link
                href="/loja"
                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-7 py-3 font-medium text-white backdrop-blur-2xl transition-all hover:scale-[1.02] hover:border-white/20 hover:bg-gradient-to-b hover:from-white/[0.12] hover:to-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_32px_rgba(0,0,0,0.1)] sm:w-auto"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="20" r="1.5" />
                    <circle cx="18" cy="20" r="1.5" />
                    <path d="M3 4h2l2.5 12h11L21 7H6" />
                  </svg>
                </span>
                <span className="relative z-10">Acesse a loja</span>
                <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/portfolio"
                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-7 py-3 font-medium text-white backdrop-blur-2xl transition-all hover:scale-[1.02] hover:border-white/20 hover:bg-gradient-to-b hover:from-white/[0.12] hover:to-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_32px_rgba(0,0,0,0.1)] sm:w-auto"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                </span>
                <span className="relative z-10">Ver portfólio</span>
                <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#servicos"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 font-medium text-gray-200 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.06] sm:w-auto"
              >
                <span>Ver serviços</span>
                <svg className="h-4 w-4 opacity-60 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Code editor showcase */}
          <div
            className="relative mt-20 md:mt-28"
            data-aos="fade-up"
            data-aos-delay={400}
          >
            {/* Floating labels around the card */}
            <div
              className="absolute -left-4 top-8 z-10 hidden md:block"
              style={{ animation: "float 10s ease-in-out infinite" }}
            >
              <div className="glass-heavy rounded-2xl px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 ring-1 ring-indigo-400/30">
                    <svg className="h-4 w-4 fill-indigo-300" viewBox="0 0 24 24"><path d="M13 2L3 14h5l-1 8 11-14h-6z"/></svg>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-500">Deploy</div>
                    <div className="font-semibold text-white">&lt; 30s</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -right-4 top-20 z-10 hidden md:block"
              style={{ animation: "float 12s ease-in-out infinite", animationDelay: "-3s" }}
            >
              <div className="glass-heavy rounded-2xl px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 ring-1 ring-fuchsia-400/30">
                    <svg className="h-4 w-4 fill-fuchsia-300" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/><circle cx="12" cy="12" r="3"/></svg>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-500">LLM</div>
                    <div className="font-semibold text-white">Ollama + Llama.cpp</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -right-2 bottom-10 z-10 hidden lg:block"
              style={{ animation: "float 14s ease-in-out infinite", animationDelay: "-6s" }}
            >
              <div className="glass-heavy rounded-2xl px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 ring-1 ring-emerald-400/30">
                    <svg className="h-4 w-4 fill-emerald-300" viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-500">Uptime</div>
                    <div className="font-semibold text-white">99.9%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main code card with tilt */}
            <TiltCard max={6} scale={1.01}>
              <div className="relative overflow-hidden rounded-3xl">
                {/* Outer gradient border ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/50 via-violet-500/30 to-fuchsia-500/50 p-px">
                  <div className="h-full w-full rounded-3xl bg-[#030014]" />
                </div>

                <div className="relative glass-heavy rounded-3xl overflow-hidden">
                  {/* Window chrome */}
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-500/70" />
                      <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                      <span className="h-3 w-3 rounded-full bg-green-500/70" />
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1 text-xs text-gray-400">
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 1l3 6 6 .9-4.5 4.3 1 6.3L12 15.3 6.5 18.5l1-6.3L3 7.9 9 7z"/></svg>
                      <span>jtec / server.ts</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      </span>
                      online
                    </div>
                  </div>

                  {/* Code */}
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr]">
                    {/* Sidebar */}
                    <div className="hidden md:block border-r border-white/5 bg-white/[0.02] px-3 py-4 text-xs">
                      {[
                        { icon: "📁", name: "app", active: false },
                        { icon: "📁", name: "components", active: false, indent: 0 },
                        { icon: "📄", name: "server.ts", active: true, indent: 1 },
                        { icon: "📄", name: "llm.ts", active: false, indent: 1 },
                        { icon: "📄", name: "api.ts", active: false, indent: 1 },
                        { icon: "📁", name: "public", active: false },
                        { icon: "📄", name: "next.config", active: false },
                        { icon: "📄", name: "package.json", active: false },
                      ].map((f, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-2 rounded px-2 py-1 ${
                            f.active ? "bg-indigo-500/15 text-indigo-200" : "text-gray-500"
                          }`}
                          style={{ paddingLeft: `${(f.indent || 0) * 12 + 8}px` }}
                        >
                          <span>{f.icon}</span>
                          <span>{f.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* Code body */}
                    <div className="font-mono text-[13px] leading-relaxed p-5 md:p-6 overflow-x-auto">
                      <pre className="text-gray-300">
{
<>
<span className="text-gray-600">{`// JTEC · Server with integrated LLM`}</span>{`\n`}
<span className="text-pink-400">import</span>{` { `}<span className="text-sky-300">Ollama</span>{` } `}<span className="text-pink-400">from</span>{` `}<span className="text-emerald-300">'ollama'</span>{`;`}{`\n`}
<span className="text-pink-400">import</span>{` { `}<span className="text-sky-300">NextRequest</span>{` } `}<span className="text-pink-400">from</span>{` `}<span className="text-emerald-300">'next/server'</span>{`;`}{`\n`}
{`\n`}
<span className="text-pink-400">const</span>{` `}<span className="text-sky-300">llm</span>{` = `}<span className="text-pink-400">new</span>{` `}<span className="text-yellow-300">Ollama</span>{`({`}{`\n`}
{`  host: `}<span className="text-emerald-300">'https://ai.jtec.com.br'</span>{`,`}{`\n`}
{`});`}{`\n`}
{`\n`}
<span className="text-pink-400">export async function</span>{` `}<span className="text-yellow-300">POST</span>{`(req: `}<span className="text-sky-300">NextRequest</span>{`) {`}{`\n`}
{`  `}<span className="text-pink-400">const</span>{` { prompt } = `}<span className="text-pink-400">await</span>{` req.`}<span className="text-yellow-300">json</span>{`();`}{`\n`}
{`\n`}
{`  `}<span className="text-pink-400">const</span>{` response = `}<span className="text-pink-400">await</span>{` llm.`}<span className="text-yellow-300">chat</span>{`({`}{`\n`}
{`    model: `}<span className="text-emerald-300">'llama3.2'</span>{`,`}{`\n`}
{`    messages: [{ role: `}<span className="text-emerald-300">'user'</span>{`, content: prompt }],`}{`\n`}
{`    stream: `}<span className="text-orange-300">true</span>{`,`}{`\n`}
{`  });`}{`\n`}
{`\n`}
{`  `}<span className="text-pink-400">return new</span>{` `}<span className="text-yellow-300">Response</span>{`(response.`}<span className="text-yellow-300">body</span>{`);`}{`\n`}
{`}`}
</>
}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Stats strip */}
          <div
            className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
            data-aos="fade-up"
            data-aos-delay={500}
          >
            {[
              { value: "3+", label: "Anos construindo produtos reais" },
              { value: "15+", label: "Tecnologias dominadas em produção" },
              { value: "LLMs", label: "Infra própria com Ollama e Llama.cpp" },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 text-center transition-all hover:scale-[1.02] hover:bg-white/[0.05]"
              >
                <div className="mb-2 font-nacelle text-4xl font-semibold">
                  <span className="bg-gradient-to-br from-white via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scrolling tech marquee */}
          <div
            className="mt-20 -mx-4 sm:-mx-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            data-aos="fade-up"
            data-aos-delay={600}
          >
            <div className="text-center mb-6 text-xs uppercase tracking-[0.2em] text-gray-500">
              Stack que dominamos
            </div>
            <div className="flex animate-[scroll-x_30s_linear_infinite] gap-4 w-max">
              {[...techLogos, ...techLogos].map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-gray-300 backdrop-blur-xl whitespace-nowrap"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-400" />
                  {tech}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
