import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="relative mt-16 pb-10">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

        {/* Huge gradient text watermark */}
        <div className="relative mb-10 overflow-hidden rounded-[2rem] glass-light p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0 select-none">
            <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="block font-nacelle text-[20vw] font-semibold leading-none tracking-tight opacity-[0.08] md:text-[14rem]">
                <span className="bg-gradient-to-br from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  JTEC
                </span>
              </span>
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
                    href: "https://linkedin.com/in/joaovitorvarella",
                    label: "LinkedIn",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    ),
                  },
                  {
                    href: "mailto:jvvarella@hotmail.com",
                    label: "E-mail",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    ),
                  },
                  {
                    href: "https://wa.me/5531985975200",
                    label: "WhatsApp",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488"/>
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
                  { label: "Início", href: "#" },
                  { label: "Serviços", href: "#servicos" },
                  { label: "Sobre", href: "#sobre" },
                  { label: "Stack", href: "#tecnologias" },
                  { label: "Experiência", href: "#experiencia" },
                  { label: "Contato", href: "#contato" },
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
                  <a href="mailto:jvvarella@hotmail.com" className="text-gray-400 transition-colors hover:text-white">
                    jvvarella@hotmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+5531985975200" className="text-gray-400 transition-colors hover:text-white">
                    (31) 98597-5200
                  </a>
                </li>
                <li className="text-gray-500">Belo Horizonte, MG · Brasil</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} JTEC · João Vitor C. Varella. Todos os direitos reservados.</p>
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
