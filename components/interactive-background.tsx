"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive dot-grid background.
 * - Sparse grid of dots painted on a fullscreen canvas.
 * - Dots within a radius of the cursor brighten, grow, and are pulled toward it.
 * - Faint "magnetic" lines connect the cursor to nearby dots.
 * - Subtle ambient wave keeps the grid alive while idle.
 * - Respects prefers-reduced-motion.
 */
export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const state = {
      w: 0,
      h: 0,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      mx: -9999,
      my: -9999,
      tx: -9999, // interpolated (lagged) cursor
      ty: -9999,
      scroll: 0,
      time: 0,
      spacing: 44,
      radius: 240,
      visible: true,
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      state.w = w;
      state.h = h;
      canvas.width = Math.floor(w * state.dpr);
      canvas.height = Math.floor(h * state.dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    };
    resize();

    const onMove = (e: MouseEvent) => {
      state.mx = e.clientX;
      state.my = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        state.mx = e.touches[0].clientX;
        state.my = e.touches[0].clientY;
      }
    };
    const onLeave = () => {
      state.mx = -9999;
      state.my = -9999;
    };
    const onScroll = () => {
      state.scroll = window.scrollY;
    };
    const onVisibility = () => {
      state.visible = !document.hidden;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    let raf = 0;

    const draw = () => {
      if (!state.visible) {
        raf = requestAnimationFrame(draw);
        return;
      }

      state.time += reduced ? 0 : 0.006;

      // Lag cursor for smooth trail
      if (state.mx > -9000) {
        state.tx = state.tx < -9000 ? state.mx : state.tx + (state.mx - state.tx) * 0.12;
        state.ty = state.ty < -9000 ? state.my : state.ty + (state.my - state.ty) * 0.12;
      } else {
        state.tx = -9999;
        state.ty = -9999;
      }

      const { w, h, spacing, radius } = state;
      const r2 = radius * radius;

      ctx.clearRect(0, 0, w, h);

      // Ambient radial glow behind the cursor
      if (state.tx > -9000) {
        const g = ctx.createRadialGradient(state.tx, state.ty, 0, state.tx, state.ty, radius * 1.6);
        g.addColorStop(0, "rgba(139, 110, 255, 0.10)");
        g.addColorStop(0.55, "rgba(139, 110, 255, 0.03)");
        g.addColorStop(1, "rgba(139, 110, 255, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Layout
      const cols = Math.ceil(w / spacing) + 2;
      const rows = Math.ceil(h / spacing) + 2;
      const offsetY = -((state.scroll * 0.08) % spacing);

      // Two passes: dots, then connecting lines to cursor (on top)
      const activePoints: Array<{ x: number; y: number; inf: number }> = [];

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const gx = i * spacing;
          const gy = j * spacing + offsetY;

          // Gentle ambient wave
          const wave = reduced ? 0 : Math.sin(state.time * 1.2 + i * 0.35 + j * 0.28) * 1.4;
          let x = gx + wave;
          let y = gy + wave * 0.6;

          let size = 0.9;
          let alpha = 0.12;
          let inf = 0;

          if (state.tx > -9000) {
            const dx = gx - state.tx;
            const dy = gy - state.ty;
            const d2 = dx * dx + dy * dy;
            if (d2 < r2) {
              const dist = Math.sqrt(d2);
              inf = 1 - dist / radius; // 0..1
              // Pull toward cursor (attract)
              const angle = Math.atan2(dy, dx);
              const pull = inf * 18;
              x -= Math.cos(angle) * pull;
              y -= Math.sin(angle) * pull;
              size = 0.9 + inf * 2.6;
              alpha = 0.12 + inf * 0.85;
            }
          }

          // Color: cool white shifting to indigo/fuchsia near cursor
          const hueShift = inf;
          const r = Math.round(200 + hueShift * 20);
          const gC = Math.round(190 - hueShift * 10);
          const b = Math.round(255);

          ctx.beginPath();
          ctx.fillStyle = `rgba(${r},${gC},${b},${alpha})`;
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();

          if (inf > 0.05) activePoints.push({ x, y, inf });
        }
      }

      // Magnetic lines from cursor to active points
      if (state.tx > -9000 && activePoints.length > 0) {
        ctx.lineWidth = 1;
        for (const p of activePoints) {
          const a = p.inf * 0.35;
          if (a < 0.04) continue;
          const grad = ctx.createLinearGradient(state.tx, state.ty, p.x, p.y);
          grad.addColorStop(0, `rgba(165, 140, 255, ${a})`);
          grad.addColorStop(1, `rgba(165, 140, 255, 0)`);
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(state.tx, state.ty);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // Cursor halo
        const halo = ctx.createRadialGradient(state.tx, state.ty, 0, state.tx, state.ty, 70);
        halo.addColorStop(0, "rgba(200, 180, 255, 0.35)");
        halo.addColorStop(1, "rgba(200, 180, 255, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(state.tx, state.ty, 70, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Deep base */}
      <div className="absolute inset-0 bg-[#030014]" />

      {/* Very soft top glow for depth (static, not animated) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.12), transparent 60%)",
        }}
      />

      {/* Interactive dot grid */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Fine grid guides — very subtle */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 110%, rgba(0,0,0,0.6), transparent 60%)",
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
