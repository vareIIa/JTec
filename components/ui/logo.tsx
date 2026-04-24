import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center gap-2"
      aria-label="JTEC"
    >
      {/* Geometric mark */}
      <span className="relative flex h-7 w-7 items-center justify-center">
        <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 opacity-80 blur-[6px] transition-all duration-500 group-hover:opacity-100 group-hover:blur-[10px]" />
        <span className="relative flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 4v11a4 4 0 0 1-4 4H8" />
            <path d="M8 15h.01" />
          </svg>
        </span>
      </span>
      <span className="font-nacelle text-lg font-semibold tracking-tight">
        <span className="text-white">J</span>
        <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
          TEC
        </span>
      </span>
    </Link>
  );
}
