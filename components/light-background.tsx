"use client";

import { useEffect, useRef } from "react";

/**
 * Light mode — INTERACTIVE SEA WATER.
 *
 *  • Sky: light azure → cerulean (top half)
 *  • Horizon line with sun glare
 *  • Sea: bright turquoise → teal → deep cobalt (bottom half)
 *  • Canvas:
 *      – animated caustic light bands dancing on the water
 *      – cursor leaves a wake of expanding ripples (water surface)
 *      – click = big splash (double ripple)
 *      – sea-foam specks / sun glints twinkle on the surface
 *      – soft turquoise bubbles rise and sway, pushed by cursor "current"
 *  • Sun glare strip across the horizon
 */
export default function LightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Ripple = { x: number; y: number; r: number; born: number; strength: number };
    type Bubble = {
      x: number; y: number;
      r: number; baseR: number;
      phase: number; speed: number;
      drift: number; depth: number;
    };
    type Spark = { x: number; y: number; r: number; alpha: number; phase: number };
    type Wave = { y: number; amp: number; freq: number; phase: number; alpha: number };

    const state = {
      w: 0, h: 0,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      mx: -9999, my: -9999,
      tx: -9999, ty: -9999,
      time: 0, last: performance.now(),
      visible: true,
      ripples: [] as Ripple[],
      bubbles: [] as Bubble[],
      sparks: [] as Spark[],
      waves: [] as Wave[],
    };

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      state.w = w; state.h = h;
      canvas.width = Math.floor(w * state.dpr);
      canvas.height = Math.floor(h * state.dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      spawn();
    };

    const spawn = () => {
      const bubbleCount = Math.floor((state.w * state.h) / 22000);
      state.bubbles = Array.from({ length: Math.min(bubbleCount, 90) }, () => {
        const baseR = 1.2 + Math.random() * 4;
        return {
          x: Math.random() * state.w,
          y: Math.random() * state.h,
          r: baseR, baseR,
          phase: Math.random() * Math.PI * 2,
          speed: 0.25 + Math.random() * 0.65,
          drift: (Math.random() - 0.5) * 0.4,
          depth: Math.random(),
        };
      });
      const sparkCount = Math.floor((state.w * state.h) / 7000);
      state.sparks = Array.from({ length: Math.min(sparkCount, 280) }, () => ({
        x: Math.random() * state.w,
        y: Math.random() * state.h,
        r: 0.4 + Math.random() * 1.4,
        alpha: 0.25 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
      }));
      // Caustic light bands at varying depths
      state.waves = [];
      const horizon = state.h * 0.55;
      for (let i = 0; i < 7; i++) {
        const t = i / 6;
        state.waves.push({
          y: horizon + t * (state.h - horizon) * 0.95,
          amp: 6 + t * 14,
          freq: 0.005 + Math.random() * 0.004,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.12 + (1 - t) * 0.18,
        });
      }
    };

    resize();

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - state.mx;
      const dy = e.clientY - state.my;
      const speed = Math.hypot(dx, dy);
      state.mx = e.clientX; state.my = e.clientY;
      if (speed > 5 && state.ripples.length < 16 && !reduced) {
        state.ripples.push({
          x: e.clientX, y: e.clientY, r: 0,
          born: performance.now(),
          strength: Math.min(1, speed / 50),
        });
      }
    };
    const onClick = (e: MouseEvent) => {
      if (reduced) return;
      state.ripples.push({ x: e.clientX, y: e.clientY, r: 0, born: performance.now(), strength: 1.6 });
      state.ripples.push({ x: e.clientX, y: e.clientY, r: 0, born: performance.now() + 90, strength: 1.0 });
      state.ripples.push({ x: e.clientX, y: e.clientY, r: 0, born: performance.now() + 180, strength: 0.6 });
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) { state.mx = t.clientX; state.my = t.clientY; }
    };
    const onLeave = () => { state.mx = -9999; state.my = -9999; };
    const onVisibility = () => { state.visible = !document.hidden; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    let raf = 0;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!state.visible) return;

      const dt = Math.min(50, now - state.last) / 1000;
      state.last = now;
      state.time += reduced ? 0 : dt;

      if (state.mx > -9000) {
        state.tx = state.tx < -9000 ? state.mx : state.tx + (state.mx - state.tx) * 0.13;
        state.ty = state.ty < -9000 ? state.my : state.ty + (state.my - state.ty) * 0.13;
      } else { state.tx = -9999; state.ty = -9999; }

      ctx.clearRect(0, 0, state.w, state.h);

      // ─── Caustic light bands (sun rays through water) ───
      for (const wv of state.waves) {
        ctx.beginPath();
        ctx.moveTo(0, wv.y);
        const step = 16;
        for (let x = 0; x <= state.w + step; x += step) {
          const y = wv.y + Math.sin(x * wv.freq + state.time * 1.1 + wv.phase) * wv.amp
                       + Math.sin(x * wv.freq * 2.3 + state.time * 0.6) * (wv.amp * 0.4);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(state.w, wv.y);
        ctx.strokeStyle = `rgba(255, 245, 200, ${wv.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // ─── Sun glare on horizon (shimmering vertical streak) ───
      const sunX = state.w * 0.5;
      const sunY = state.h * 0.55;
      const glareWidth = 80 + Math.sin(state.time * 1.5) * 12;
      const glare = ctx.createLinearGradient(sunX - glareWidth, 0, sunX + glareWidth, 0);
      glare.addColorStop(0, "rgba(255,235,150,0)");
      glare.addColorStop(0.5, "rgba(255,235,150,0.35)");
      glare.addColorStop(1, "rgba(255,235,150,0)");
      ctx.fillStyle = glare;
      ctx.fillRect(sunX - glareWidth, sunY, glareWidth * 2, state.h - sunY);

      // ─── Cursor warm halo ───
      if (state.tx > -9000) {
        const halo = ctx.createRadialGradient(state.tx, state.ty, 0, state.tx, state.ty, 320);
        halo.addColorStop(0, "rgba(255, 240, 180, 0.18)");
        halo.addColorStop(0.4, "rgba(255, 220, 130, 0.07)");
        halo.addColorStop(1, "rgba(255, 240, 180, 0)");
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, state.w, state.h);
      }

      // ─── Ripples on the water surface ───
      const RIPPLE_LIFE = 2000;
      state.ripples = state.ripples.filter((rp) => now - rp.born < RIPPLE_LIFE);
      for (const rp of state.ripples) {
        const age = (now - rp.born) / RIPPLE_LIFE;
        if (age < 0) continue;
        rp.r = age * 320 * rp.strength + 8;
        const alpha = (1 - age) * 0.65 * rp.strength;

        // Outer foam ring (white)
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Refraction ring (cyan)
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.78, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(120, 230, 240, ${alpha * 0.55})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Inner gold glint
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 220, 140, ${alpha * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // ─── Sea sparkles ───
      for (const sp of state.sparks) {
        const tw = (Math.sin(state.time * 2.4 + sp.phase) + 1) * 0.5;
        const a = sp.alpha * (0.25 + tw * 0.75);
        // Mix white and gold for sun-glint feel
        const goldMix = (Math.sin(sp.phase) + 1) * 0.5;
        const r = 255;
        const g = Math.round(245 + goldMix * 8);
        const b = Math.round(220 + (1 - goldMix) * 30);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ─── Bubbles ───
      const cursorActive = state.tx > -9000;
      const CURRENT_RADIUS = 240;
      for (const b of state.bubbles) {
        const bob = reduced ? 0 : Math.sin(state.time * 1.3 + b.phase) * 1.6;
        const sway = reduced ? 0 : Math.cos(state.time * 0.9 + b.phase) * 0.7;
        let x = b.x + sway;
        let y = b.y + bob;
        let r = b.r;
        let alpha = 0.30 + b.depth * 0.45;

        if (cursorActive) {
          const dx = b.x - state.tx;
          const dy = b.y - state.ty;
          const d = Math.hypot(dx, dy);
          if (d < CURRENT_RADIUS) {
            const inf = 1 - d / CURRENT_RADIUS;
            const ang = Math.atan2(dy, dx);
            b.x += Math.cos(ang) * inf * 1.6;
            b.y += Math.sin(ang) * inf * 1.6;
            alpha = Math.min(1, alpha + inf * 0.5);
            r = b.baseR + inf * 2.2;
          }
        }

        b.y -= b.speed * (0.3 + b.depth * 0.5) * 0.55;
        b.x += b.drift;
        if (b.y < -10) { b.y = state.h + 10; b.x = Math.random() * state.w; }
        if (b.x < -20) b.x = state.w + 20;
        if (b.x > state.w + 20) b.x = -20;

        // Bubble — turquoise/aqua
        const hue = 175 + b.depth * 25; // 175 cyan → 200 light blue
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 80%, ${68 + b.depth * 12}%, ${alpha})`;
        ctx.fill();

        // Specular highlight
        ctx.beginPath();
        ctx.arc(x - r * 0.32, y - r * 0.32, r * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.85})`;
        ctx.fill();

        if (r > 2.6) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
          glow.addColorStop(0, `hsla(${hue}, 90%, 75%, ${alpha * 0.3})`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ─── Cursor pearl ───
      if (cursorActive) {
        const pearl = ctx.createRadialGradient(state.tx, state.ty, 0, state.tx, state.ty, 90);
        pearl.addColorStop(0, "rgba(255, 240, 180, 0.45)");
        pearl.addColorStop(0.5, "rgba(140, 220, 230, 0.15)");
        pearl.addColorStop(1, "rgba(255, 240, 180, 0)");
        ctx.fillStyle = pearl;
        ctx.beginPath();
        ctx.arc(state.tx, state.ty, 90, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* ── Sky → Sea gradient (azure sky meets turquoise then teal) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, " +
              "#dff3fb 0%, " +              // pale sky
              "#bce4f4 18%, " +              // azure
              "#9ad7ee 38%, " +              // cerulean
              "#7ecae6 50%, " +              // light cobalt (horizon)
              "#5ec5d7 56%, " +              // turquoise (just below horizon)
              "#3eb5c7 65%, " +              // bright sea
              "#2a9bb3 78%, " +              // deeper teal
              "#1d7c97 92%, " +              // deep teal
              "#155f7d 100%" +               // abyss
            ")",
        }}
      />

      {/* ── Distant clouds (subtle white wisps) ── */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "45vh",
          background:
            "radial-gradient(ellipse 35% 12% at 22% 18%, rgba(255,255,255,0.55) 0%, transparent 70%), " +
            "radial-gradient(ellipse 28% 9% at 78% 28%, rgba(255,255,255,0.45) 0%, transparent 70%), " +
            "radial-gradient(ellipse 25% 8% at 50% 8%, rgba(255,255,255,0.40) 0%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      {/* ── Sun in the sky (warm disc above horizon) ── */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "30%",
          width: "40vh",
          height: "40vh",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,250,210,0.95) 0%, rgba(255,225,140,0.7) 18%, rgba(255,200,90,0.35) 40%, rgba(255,220,140,0.10) 70%, transparent 90%)",
          filter: "blur(2px)",
          animation: "sun-pulse 9s ease-in-out infinite",
        }}
      />

      {/* ── Sun outer halo / lens flare ── */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "30%",
          width: "120vh",
          height: "120vh",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,235,170,0.20) 0%, rgba(255,210,120,0.08) 30%, transparent 65%)",
          filter: "blur(8px)",
        }}
      />

      {/* ── God rays from sun ── */}
      <div
        className="absolute left-1/2"
        style={{
          top: "30%",
          width: "240vw", height: "240vw",
          marginLeft: "-120vw", marginTop: "-120vw",
          background: `conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            rgba(255, 240, 170, 0.07) 14deg,
            transparent 28deg,
            rgba(255, 230, 140, 0.05) 50deg,
            transparent 72deg,
            rgba(255, 245, 180, 0.08) 96deg,
            transparent 120deg,
            rgba(255, 230, 140, 0.05) 150deg,
            transparent 175deg,
            rgba(255, 240, 160, 0.06) 210deg,
            transparent 240deg,
            rgba(255, 230, 140, 0.04) 275deg,
            transparent 300deg,
            rgba(255, 240, 170, 0.07) 330deg,
            transparent 360deg
          )`,
          animation: "ray-spin 90s linear infinite",
          opacity: 0.7,
          mixBlendMode: "screen",
        }}
      />

      {/* ── Horizon line — bright glint where sky meets sea ── */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "55%",
          height: "2px",
          background:
            "linear-gradient(to right, transparent, rgba(255,240,170,0.7) 30%, rgba(255,255,255,0.95) 50%, rgba(255,240,170,0.7) 70%, transparent)",
          filter: "blur(1px)",
        }}
      />

      {/* ── Sun reflection on water (vertical golden column below sun) ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: "55%",
          width: "26vh",
          height: "45vh",
          background:
            "linear-gradient(180deg, rgba(255,240,170,0.55) 0%, rgba(255,220,130,0.30) 30%, rgba(255,200,90,0.15) 60%, transparent 100%)",
          filter: "blur(8px)",
          mixBlendMode: "screen",
        }}
      />

      {/* ── Underwater bokeh — soft turquoise ── */}
      <div
        className="absolute rounded-full"
        style={{
          width: "520px", height: "520px",
          left: "-8%", bottom: "10%",
          background: "radial-gradient(circle, rgba(150,230,235,0.32) 0%, rgba(100,200,220,0.10) 55%, transparent 80%)",
          filter: "blur(70px)",
          animation: "bokeh-drift-1 28s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "440px", height: "440px",
          right: "-5%", bottom: "20%",
          background: "radial-gradient(circle, rgba(180,235,245,0.28) 0%, rgba(120,200,225,0.10) 55%, transparent 80%)",
          filter: "blur(75px)",
          animation: "bokeh-drift-2 35s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "500px", height: "500px",
          left: "20%", bottom: "-5%",
          background: "radial-gradient(circle, rgba(120,210,230,0.25) 0%, rgba(80,180,210,0.08) 55%, transparent 80%)",
          filter: "blur(85px)",
          animation: "bokeh-drift-3 32s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "380px", height: "380px",
          right: "15%", bottom: "0%",
          background: "radial-gradient(circle, rgba(255,235,170,0.20) 0%, rgba(255,210,120,0.06) 55%, transparent 80%)",
          filter: "blur(60px)",
          animation: "bokeh-drift-4 40s ease-in-out infinite",
        }}
      />

      {/* ── Interactive water canvas ── */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* ── Surface reflection grid ── */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 65%, black 35%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 65%, black 35%, transparent 100%)",
        }}
      />

      {/* ── Soft edge vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 80% at 50% 50%, transparent 45%, rgba(20,80,110,0.18) 100%)",
        }}
      />
    </div>
  );
}
