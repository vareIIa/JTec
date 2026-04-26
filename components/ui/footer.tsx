import Logo from "./logo";
import JtecLogoCircle from "./jtec-logo-circle";

export default function Footer() {
  return (
    <footer className="relative mt-16 pb-10">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

        {/* Huge gradient text watermark */}
        <div className="relative mb-10 overflow-hidden rounded-[2rem] glass-light p-10 md:p-16">
          {/* Logo watermark — fades into background */}
          <div
            className="pointer-events-none absolute inset-0 select-none flex items-center justify-center overflow-hidden"
            style={{
              maskImage:
                "radial-gradient(ellipse 72% 72% at 50% 50%, black 20%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 72% 72% at 50% 50%, black 20%, transparent 80%)",
            }}
          >
            <div className="opacity-[0.065]">
              <JtecLogoCircle size={400} uid="footer" />
            </div>
          </div>

          <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-[1fr_auto_auto]">

            {/* Brand */}
            <div>
              <div className="mb-4">
                <Logo />
              </div>
              <p className="mb-5 max-w-xs text-sm leading-relaxed text-gray-400">
                Tecnologia de ponta para resultados que importam. Desenvolvimento fullstack, IA e infraestrutura.
              </p>

              {/* Social */}
              <div className="flex gap-2">
                {[
                  {
                    href: "mailto:jtecBH@hotmail.com",
                    label: "E-mail",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.03] text-gray-400 backdrop-blur-xl transition-all hover:scale-110 hover:border-white/20 hover:text-white"
                    aria-label={social.label}
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-fuchsia-500/30 transition-transform duration-500 group-hover:translate-x-0" />
                    <span className="relative">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div>
              <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-gray-500">Navegação</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Início", href: "/" },
                  { label: "Serviços", href: "/#servicos" },
                  { label: "Sobre", href: "/#sobre" },
                  { label: "Stack", href: "/#tecnologias" },
                  { label: "Portfólio", href: "/portfolio" },
                  { label: "Loja", href: "/loja" },
                  { label: "Contato", href: "/#contato" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-gray-500">Contato</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:jtecBH@hotmail.com" className="text-gray-400 transition-colors hover:text-white">
                    jtecBH@hotmail.com
                  </a>
                </li>
                <li className="text-gray-500">Belo Horizonte, MG · Brasil</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} JTEC. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            <span>Feito com</span>
            <span className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text font-semibold text-transparent">
              precisão
            </span>
            <span>em Belo Horizonte · MG</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
