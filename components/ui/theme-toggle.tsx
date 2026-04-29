"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const TRANSITION_ID = "jtec-theme-transition-canvas";

/* ─── Helpers ───────────────────────────────────────────────────────────── */
const setupCanvas = (): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; W: number; H: number } | null => {
  if (document.getElementById(TRANSITION_ID)) return null;
  const canvas = document.createElement("canvas");
  canvas.id = TRANSITION_ID;
  canvas.style.cssText =
    "position:fixed;inset:0;width:100vw;height:100vh;z-index:9999;pointer-events:none;contain:strict;";
  document.body.appendChild(canvas);
  document.body.classList.add("theme-transitioning");

  // DPR=1 for transition canvas — it's a full-screen overlay, no one notices 1x vs 2x
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) {
    canvas.remove();
    return null;
  }
  return { canvas, ctx, W, H };
};

const teardown = (canvas: HTMLCanvasElement) => {
  canvas.remove();
  document.body.classList.remove("theme-transitioning");
};

/* ─── Water Flood (light-mode entry) ──────────────────────────────────────
   Performance-tuned: DPR=1, STEP=6, no shadowBlur, 2 layers, 3 caustics. */
function playWaterFlood(onCover: () => void) {
  const setup = setupCanvas();
  if (!setup) return;
  const { canvas, ctx, W, H } = setup;

  const DURATION = 1800;
  const FRAME_MS = 1000 / 45; // 45fps cap
  const STEP = 6; // was 2 → 60% fewer points
  const start = performance.now();
  let lastFrame = 0;
  let covered = false;

  type WaveLayer = {
    speed: number; offset: number; amp: number;
    freqA: number; freqB: number; timeRate: number; phase: number;
    colorA: string; colorB: string; foamColor: string;
    foamWidthOuter: number; foamWidthInner: number;
    bodyAlpha: number; foamAlpha: number; bubbles: number;
  };

  const LAYERS: WaveLayer[] = [
    {
      speed: 1.0, offset: -0.28, amp: 36,
      freqA: 2.6, freqB: 5.1, timeRate: 0.0017, phase: 0,
      colorA: "rgba(28,138,178,0.82)", colorB: "rgba(90,210,238,0.92)",
      foamColor: "rgba(255,255,255,0.92)",
      foamWidthOuter: 18, foamWidthInner: 5,
      bodyAlpha: 0.95, foamAlpha: 0.88, bubbles: 10,
    },
    {
      speed: 1.14, offset: -0.14, amp: 24,
      freqA: 3.3, freqB: 6.4, timeRate: 0.0024, phase: Math.PI * 0.55,
      colorA: "rgba(68,190,228,0.65)", colorB: "rgba(200,242,252,0.72)",
      foamColor: "rgba(255,255,255,0.98)",
      foamWidthOuter: 12, foamWidthInner: 3,
      bodyAlpha: 0.78, foamAlpha: 0.82, bubbles: 8,
    },
  ];

  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const sampleWave = (leadX: number, yT: number, l: WaveLayer, ts: number) =>
    leadX +
    Math.sin(yT * Math.PI * 2 * l.freqA + ts + l.phase) * l.amp +
    Math.sin(yT * Math.PI * 2 * l.freqB + ts * 0.7 + l.phase * 1.3) * (l.amp * 0.3);

  const drawLayer = (l: WaveLayer, leadX: number, envAlpha: number, now: number) => {
    const ts = now * l.timeRate;

    // Body
    ctx.save();
    ctx.globalAlpha = envAlpha * l.bodyAlpha;
    ctx.beginPath();
    ctx.moveTo(-W * 0.12, 0);
    ctx.lineTo(-W * 0.12, H);
    ctx.lineTo(sampleWave(leadX, 1, l, ts), H);
    for (let y = H; y >= 0; y -= STEP) {
      ctx.lineTo(sampleWave(leadX, y / H, l, ts), y);
    }
    ctx.closePath();
    const bg = ctx.createLinearGradient(leadX - W * 0.9, 0, leadX + l.amp, 0);
    bg.addColorStop(0, l.colorA);
    bg.addColorStop(1, l.colorB);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.restore();

    // Caustic streaks (only 3, no per-streak gradient — use solid fill)
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = envAlpha * 0.16;
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    for (let s = 0; s < 3; s++) {
      const seed = s * 1.618 + ts * 0.4;
      const sx = leadX - W * 0.12 * (s + 1.2) + Math.sin(seed) * 12;
      const sw = 5 + Math.abs(Math.sin(seed * 0.7)) * 8;
      ctx.beginPath();
      ctx.moveTo(sx, 0); ctx.lineTo(sx + sw, 0);
      ctx.lineTo(sx + sw * 0.4, H); ctx.lineTo(sx - sw * 0.4, H);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Foam — two strokes (wide dim + narrow bright), NO shadowBlur
    ctx.save();
    ctx.globalAlpha = envAlpha * l.foamAlpha;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Build foam path once, reuse for both strokes
    ctx.beginPath();
    ctx.moveTo(sampleWave(leadX, 0, l, ts), 0);
    for (let y = STEP; y <= H; y += STEP) {
      ctx.lineTo(sampleWave(leadX, y / H, l, ts), y);
    }
    ctx.strokeStyle = "rgba(195,240,255,0.35)";
    ctx.lineWidth = l.foamWidthOuter;
    ctx.stroke();
    ctx.strokeStyle = l.foamColor;
    ctx.lineWidth = l.foamWidthInner;
    ctx.stroke();
    ctx.restore();

    // Bubbles — batched single fill, no shadow
    ctx.save();
    ctx.globalAlpha = envAlpha * 0.7;
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    ctx.beginPath();
    for (let i = 0; i < l.bubbles; i++) {
      const t = (i + 0.5) / l.bubbles;
      const seed = i * 2.718 + l.phase;
      const bx = sampleWave(leadX, t, l, ts) + Math.sin(seed + ts * 0.6) * 28;
      const by = H * t + Math.cos(seed + ts * 0.5) * 12;
      const r = 1.2 + Math.abs(Math.sin(seed * 0.8 + ts * 0.3)) * 3.5;
      ctx.moveTo(bx + r, by);
      ctx.arc(bx, by, r, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.restore();
  };

  const frame = (now: number) => {
    // 45fps throttle
    if (now - lastFrame < FRAME_MS) { requestAnimationFrame(frame); return; }
    lastFrame = now;

    const elapsed = now - start;
    const raw = Math.min(elapsed / DURATION, 1);
    ctx.clearRect(0, 0, W, H);
    const prog = ease(raw);
    let envAlpha = 1;
    if (raw < 0.06) envAlpha = raw / 0.06;
    if (raw > 0.86) envAlpha = Math.max(0, 1 - (raw - 0.86) / 0.14);

    LAYERS.forEach((l) => {
      const span = 1.4 + Math.abs(l.offset);
      const leadX = W * l.offset + W * span * Math.min(1, prog * l.speed);
      drawLayer(l, leadX, envAlpha, now);
    });

    if (prog > 0.34 && !covered) { covered = true; onCover(); }
    if (raw < 1) requestAnimationFrame(frame);
    else teardown(canvas);
  };

  requestAnimationFrame(frame);
}

/* ─── Dark Eclipse (dark-mode entry) ──────────────────────────────────────
   Performance-tuned: 45fps, no corner wisps, 5 stars max, cached veil. */
function playDarkEclipse(onCover: () => void) {
  const setup = setupCanvas();
  if (!setup) return;
  const { canvas, ctx, W, H } = setup;

  const cx = W / 2;
  const cy = H / 2;
  const maxR = Math.hypot(cx, cy) * 1.18;

  const DURATION = 1600;
  const FRAME_MS = 1000 / 45;
  const start = performance.now();
  let lastFrame = 0;
  let covered = false;

  const CLOSE_END = 0.46;
  const HOLD_END = 0.56;

  const easeInOut = (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.4);

  // Pre-build static star positions (avoid recomputing per frame)
  const STARS = Array.from({ length: 5 }, (_, i) => {
    const seed = i * 2.718;
    return {
      x: cx + Math.cos(seed) * (Math.sin(seed * 1.3) * W * 0.16),
      y: cy + Math.sin(seed * 1.7) * (Math.cos(seed * 0.9) * H * 0.16),
    };
  });

  const frame = (now: number) => {
    if (now - lastFrame < FRAME_MS) { requestAnimationFrame(frame); return; }
    lastFrame = now;

    const raw = Math.min((now - start) / DURATION, 1);
    ctx.clearRect(0, 0, W, H);

    let radius: number;
    let coverAlpha: number;

    if (raw < CLOSE_END) {
      radius = maxR * (1 - easeInOut(raw / CLOSE_END));
      coverAlpha = 1;
    } else if (raw < HOLD_END) {
      radius = 0;
      coverAlpha = 1;
      if (!covered) { covered = true; onCover(); }
    } else {
      const t = (raw - HOLD_END) / (1 - HOLD_END);
      radius = maxR * easeOut(t);
      coverAlpha = Math.max(0, 1 - t * 1.05);
    }

    // Layer 1: dark veil (solid rect — no gradient, cheaper)
    ctx.save();
    ctx.globalAlpha = coverAlpha;
    ctx.fillStyle = "rgb(6,3,22)";
    ctx.fillRect(0, 0, W, H);

    // Iris cutout via destination-out
    if (radius > 1) {
      ctx.globalCompositeOperation = "destination-out";
      const hole = ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, radius * 1.05);
      hole.addColorStop(0, "rgba(0,0,0,1)");
      hole.addColorStop(0.82, "rgba(0,0,0,1)");
      hole.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = hole;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.08, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Layer 2: rim glow (single gradient, only during iris phase)
    if (radius > 8 && radius < maxR * 0.96) {
      const rimAlpha = coverAlpha * Math.sin((raw / HOLD_END) * Math.PI) * 0.65;
      if (rimAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = rimAlpha;
        const rim = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.35);
        rim.addColorStop(0, "rgba(70,22,165,0)");
        rim.addColorStop(0.4, "rgba(70,22,165,0.5)");
        rim.addColorStop(1, "rgba(15,5,55,0)");
        ctx.fillStyle = rim;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }
    }

    // Layer 3: star bloom (5 stars, only at peak — batched fill)
    if (raw > CLOSE_END * 0.8 && raw < HOLD_END + 0.12) {
      const bloomT = raw < HOLD_END
        ? (raw - CLOSE_END * 0.8) / (HOLD_END - CLOSE_END * 0.8)
        : 1 - (raw - HOLD_END) / 0.12;
      const bAlpha = Math.max(0, bloomT) * 0.55;
      if (bAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = bAlpha;
        ctx.globalCompositeOperation = "screen";
        // Batch all stars into one gradient fill each (5 max)
        for (const s of STARS) {
          const r = 8;
          const sg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
          sg.addColorStop(0, "rgba(200,180,255,0.95)");
          sg.addColorStop(1, "rgba(100,70,220,0)");
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    if (raw < 1) requestAnimationFrame(frame);
    else teardown(canvas);
  };

  requestAnimationFrame(frame);
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full border border-white/10 bg-white/[0.04]" />;
  }

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    if (document.getElementById(TRANSITION_ID)) return; // already running
    if (isDark) {
      playWaterFlood(() => setTheme("light"));
    } else {
      playDarkEclipse(() => setTheme("dark"));
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      className={`relative z-[80] flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 ${
        isDark
          ? "border-white/10 bg-white/[0.04] text-gray-400 hover:border-amber-400/40 hover:bg-amber-500/10 hover:text-amber-300"
          : "border-cyan-300/60 bg-white/40 text-cyan-700 backdrop-blur-xl hover:border-cyan-400 hover:bg-white/60 hover:text-cyan-900"
      }`}
    >
      {isDark ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
