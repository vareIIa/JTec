import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JTEC — Tecnologia & Inovação";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#030014",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* ── Background gradient orbs ── */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "50%",
            width: 900,
            height: 600,
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.22) 0%, rgba(168,85,247,0.14) 35%, transparent 68%)",
            transform: "translateX(-50%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: 0,
            width: 400,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: 0,
            width: 350,
            height: 350,
            background:
              "radial-gradient(ellipse, rgba(217,70,239,0.1) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* ── Fine grid overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            display: "flex",
          }}
        />

        {/* ── Main content ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Circular logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 110,
              height: 110,
              borderRadius: "50%",
              border: "3.5px solid rgba(167,139,250,0.75)",
              background: "rgba(99,102,241,0.08)",
              position: "relative",
              marginBottom: 28,
              boxShadow:
                "0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(139,92,246,0.12), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {/* Inner ring */}
            <div
              style={{
                position: "absolute",
                width: 82,
                height: 82,
                borderRadius: "50%",
                border: "1.5px solid rgba(167,139,250,0.35)",
                display: "flex",
              }}
            />
            {/* Cross line H */}
            <div
              style={{
                position: "absolute",
                width: 64,
                height: 1,
                background: "rgba(167,139,250,0.25)",
                display: "flex",
              }}
            />
            {/* Cross line V */}
            <div
              style={{
                position: "absolute",
                width: 1,
                height: 64,
                background: "rgba(167,139,250,0.25)",
                display: "flex",
              }}
            />
            {/* Letters 2x2 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
                position: "relative",
              }}
            >
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "#818cf8", fontSize: 22, fontWeight: 800, lineHeight: 1 }}>J</span>
                <span style={{ color: "#a78bfa", fontSize: 22, fontWeight: 800, lineHeight: 1 }}>T</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "#c084fc", fontSize: 22, fontWeight: 800, lineHeight: 1 }}>E</span>
                <span style={{ color: "#e879f9", fontSize: 22, fontWeight: 800, lineHeight: 1 }}>C</span>
              </div>
            </div>
          </div>

          {/* Kicker label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.28em",
              color: "rgba(167,139,250,0.7)",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <div style={{ width: 32, height: 1, background: "rgba(167,139,250,0.4)", display: "flex" }} />
            Tecnologia & Inovação
            <div style={{ width: 32, height: 1, background: "rgba(167,139,250,0.4)", display: "flex" }} />
          </div>

          {/* JTEC wordmark */}
          <div
            style={{
              fontSize: 108,
              fontWeight: 800,
              color: "white",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              marginBottom: 24,
            }}
          >
            JTEC
          </div>

          {/* Sub tags */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 28,
            }}
          >
            {["Fullstack", "Inteligência Artificial", "Infra & Servidores"].map((tag, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: i === 0 ? "#818cf8" : i === 1 ? "#a78bfa" : "#e879f9",
                  }}
                >
                  {tag}
                </span>
                {i < 2 && (
                  <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 22 }}>·</span>
                )}
              </div>
            ))}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 20,
              color: "rgba(156,163,175,1)",
              maxWidth: 780,
              textAlign: "center",
              lineHeight: 1.6,
              marginBottom: 36,
            }}
          >
            Soluções modernas, rápidas e escaláveis — de Belo Horizonte para o mundo inteiro.
          </div>

          {/* CTA pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 36px",
              borderRadius: 50,
              border: "1.5px solid rgba(139,92,246,0.55)",
              background: "rgba(99,102,241,0.12)",
              fontSize: 18,
              fontWeight: 600,
              color: "rgba(199,210,254,1)",
              letterSpacing: "0.02em",
            }}
          >
            Descubra nossas soluções &nbsp;→
          </div>
        </div>

        {/* ── Bottom URL strip ── */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 40, height: 1, background: "rgba(99,102,241,0.4)", display: "flex" }} />
          <span
            style={{
              fontSize: 15,
              color: "rgba(99,102,241,0.65)",
              letterSpacing: "0.18em",
              fontWeight: 500,
            }}
          >
            jotatec.netlify.app
          </span>
          <div style={{ width: 40, height: 1, background: "rgba(99,102,241,0.4)", display: "flex" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
