import Link from "next/link";
import JtecLogoCircle from "./jtec-logo-circle";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center gap-2.5"
      aria-label="JTEC"
    >
      {/* Circular logo mark */}
      <span className="relative flex items-center justify-center">
        <span className="absolute rounded-full bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-fuchsia-500/30 blur-[8px] transition-all duration-500 group-hover:blur-[12px] group-hover:opacity-100 opacity-70" style={{ width: 36, height: 36 }} />
        <JtecLogoCircle size={30} uid="header" className="relative" />
      </span>

      {/* Wordmark */}
      <span className="font-nacelle text-lg font-semibold tracking-tight">
        <span className="text-white">J</span>
        <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
          TEC
        </span>
      </span>
    </Link>
  );
}
