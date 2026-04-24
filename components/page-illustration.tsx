export default function PageIllustration() {
  return (
    <>
      {/* Fixed aurora background — stays behind everything */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Deep space base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_40%,rgba(168,85,247,0.14),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_70%,rgba(236,72,153,0.10),transparent_70%)]" />

        {/* Aurora blobs that drift */}
        <div
          className="aurora-blob bg-indigo-600"
          style={{
            top: "-10%",
            left: "10%",
            width: "40rem",
            height: "40rem",
            animation: "aurora 20s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-blob bg-fuchsia-600"
          style={{
            top: "30%",
            right: "-10%",
            width: "36rem",
            height: "36rem",
            animation: "aurora 25s ease-in-out infinite reverse",
            animationDelay: "-5s",
          }}
        />
        <div
          className="aurora-blob bg-violet-600"
          style={{
            bottom: "-20%",
            left: "30%",
            width: "44rem",
            height: "44rem",
            animation: "aurora 30s ease-in-out infinite",
            animationDelay: "-10s",
          }}
        />
        <div
          className="aurora-blob bg-cyan-500"
          style={{
            top: "50%",
            left: "-10%",
            width: "30rem",
            height: "30rem",
            opacity: 0.3,
            animation: "aurora 28s ease-in-out infinite reverse",
            animationDelay: "-15s",
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
          }}
        />

        {/* Noise grain */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* Vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_100%,rgba(0,0,0,0.6),transparent_70%)]" />
      </div>
    </>
  );
}
