"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const TRANSITION_ID = "jtec-theme-transition-canvas";

const setupCanvas = (): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; W: number; H: number } | null => {
  if (document.getElementById(TRANSITION_ID)) return null;
  const canvas = document.createElement("canvas");
  canvas.id = TRANSITION_ID;
  canvas.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;z-index:9999;pointer-events:none;contain:strict;";
  document.body.appendChild(canvas);
  document.body.classList.add("theme-transitioning");
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) { canvas.remove(); return null; }
  return { canvas, ctx, W, H };
};

const teardown = (canvas: HTMLCanvasElement) => {
  canvas.remove();
  document.body.classList.remove("theme-transitioning");
};

/* ── Water sound (pink noise + bandpass sweep) ─────────────────────────── */
function playWaterSound() {
  try {
    const ac = new AudioContext();
    const dur = 2.2;
    const sr = ac.sampleRate;
    const buf = ac.createBuffer(2, Math.ceil(sr * dur), sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0;
      for (let i = 0; i < d.length; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + w * 0.0555179;
        b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.96900 * b2 + w * 0.1538520;
        b3 = 0.86650 * b3 + w * 0.3104856;
        b4 = 0.55000 * b4 + w * 0.5329522;
        b5 = -0.7616 * b5 - w * 0.0168980;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + w * 0.5362) * 0.11;
      }
    }
    const src = ac.createBufferSource();
    src.buffer = buf;
    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(180, ac.currentTime);
    bp.frequency.linearRampToValueAtTime(1600, ac.currentTime + 0.65);
    bp.frequency.linearRampToValueAtTime(700, ac.currentTime + dur);
    bp.Q.value = 0.9;
    const ls = ac.createBiquadFilter();
    ls.type = "lowshelf";
    ls.frequency.value = 280;
    ls.gain.value = 5;
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0, ac.currentTime);
    gain.gain.linearRampToValueAtTime(0.55, ac.currentTime + 0.14);
    gain.gain.setValueAtTime(0.55, ac.currentTime + dur - 0.45);
    gain.gain.linearRampToValueAtTime(0, ac.currentTime + dur);
    src.connect(bp); bp.connect(ls); ls.connect(gain); gain.connect(ac.destination);
    src.start(); src.stop(ac.currentTime + dur);
    setTimeout(() => ac.close(), (dur + 0.5) * 1000);
  } catch (_) {}
}

/* ── Storm sound (brown noise rumble + wind + lightning crackle) ─────────  */
function playStormSound() {
  try {
    const ac = new AudioContext();
    const dur = 2.4;
    const sr = ac.sampleRate;

    // Brown noise (deep bass rumble for thunder)
    const tbuf = ac.createBuffer(2, Math.ceil(sr * dur), sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = tbuf.getChannelData(ch);
      let last = 0;
      for (let i = 0; i < d.length; i++) {
        const w = Math.random() * 2 - 1;
        last = (last + 0.02 * w) / 1.02;
        d[i] = last * 3.5;
      }
    }
    const tsrc = ac.createBufferSource();
    tsrc.buffer = tbuf;
    const tlp = ac.createBiquadFilter();
    tlp.type = "lowpass";
    tlp.frequency.value = 160;
    tlp.Q.value = 0.8;
    const tls = ac.createBiquadFilter();
    tls.type = "lowshelf";
    tls.frequency.value = 80;
    tls.gain.value = 9;
    const tg = ac.createGain();
    tg.gain.setValueAtTime(0, ac.currentTime);
    tg.gain.linearRampToValueAtTime(0.75, ac.currentTime + 0.25);
    tg.gain.setValueAtTime(0.75, ac.currentTime + 0.7);
    tg.gain.linearRampToValueAtTime(0.55, ac.currentTime + 1.1);
    tg.gain.linearRampToValueAtTime(0.68, ac.currentTime + 1.35);
    tg.gain.linearRampToValueAtTime(0, ac.currentTime + dur);
    tsrc.connect(tlp); tlp.connect(tls); tls.connect(tg); tg.connect(ac.destination);
    tsrc.start(); tsrc.stop(ac.currentTime + dur);

    // Wind — bandpass sweeping down
    const wbuf = ac.createBuffer(1, Math.ceil(sr * dur), sr);
    const wd = wbuf.getChannelData(0);
    for (let i = 0; i < wd.length; i++) wd[i] = Math.random() * 2 - 1;
    const wsrc = ac.createBufferSource();
    wsrc.buffer = wbuf;
    const wbp = ac.createBiquadFilter();
    wbp.type = "bandpass";
    wbp.frequency.setValueAtTime(900, ac.currentTime);
    wbp.frequency.linearRampToValueAtTime(280, ac.currentTime + dur);
    wbp.Q.value = 0.6;
    const wg = ac.createGain();
    wg.gain.setValueAtTime(0, ac.currentTime);
    wg.gain.linearRampToValueAtTime(0.22, ac.currentTime + 0.4);
    wg.gain.linearRampToValueAtTime(0, ac.currentTime + dur);
    wsrc.connect(wbp); wbp.connect(wg); wg.connect(ac.destination);
    wsrc.start(); wsrc.stop(ac.currentTime + dur);

    // Lightning crackle — two short high-freq bursts
    for (let b = 0; b < 2; b++) {
      const t0 = ac.currentTime + 0.38 + b * 0.22;
      const lbuf = ac.createBuffer(1, Math.ceil(sr * 0.09), sr);
      const ld = lbuf.getChannelData(0);
      for (let i = 0; i < ld.length; i++) ld[i] = Math.random() * 2 - 1;
      const lsrc = ac.createBufferSource();
      lsrc.buffer = lbuf;
      const lhp = ac.createBiquadFilter();
      lhp.type = "highpass";
      lhp.frequency.value = 3000;
      const lg = ac.createGain();
      lg.gain.setValueAtTime(0.38 - b * 0.08, t0);
      lg.gain.exponentialRampToValueAtTime(0.001, t0 + 0.09);
      lsrc.connect(lhp); lhp.connect(lg); lg.connect(ac.destination);
      lsrc.start(t0); lsrc.stop(t0 + 0.1);
    }

    setTimeout(() => ac.close(), (dur + 0.5) * 1000);
  } catch (_) {}
}

/* ── Water Flood (light-mode entry) ────────────────────────────────────── */
function playWaterFlood(onCover: () => void) {
  const setup = setupCanvas();
  if (!setup) return;
  const { canvas, ctx, W, H } = setup;
  playWaterSound();

  const DURATION = 2000;
  const STEP = 4;
  const start = performance.now();
  let covered = false;

  type WaveLayer = {
    speed: number; offset: number; amp: number;
    freqA: number; freqB: number; freqC: number;
    timeRate: number; phase: number;
    colorA: string; colorB: string;
    foamAlpha: number; bubbles: number;
  };
  const LAYERS: WaveLayer[] = [
    { speed: 0.88, offset: -0.38, amp: 44, freqA: 1.8, freqB: 3.9, freqC: 7.1, timeRate: 0.0012, phase: Math.PI * 1.1, colorA: "rgba(10,80,115,0.85)", colorB: "rgba(26,128,166,0.82)", foamAlpha: 0.48, bubbles: 8 },
    { speed: 1.0,  offset: -0.24, amp: 34, freqA: 2.5, freqB: 5.2, freqC: 9.3, timeRate: 0.0017, phase: 0,            colorA: "rgba(20,138,178,0.90)", colorB: "rgba(60,192,228,0.94)", foamAlpha: 0.82, bubbles: 12 },
    { speed: 1.16, offset: -0.12, amp: 24, freqA: 3.3, freqB: 6.6, freqC: 11.2, timeRate: 0.0023, phase: Math.PI*0.6, colorA: "rgba(65,198,232,0.74)", colorB: "rgba(170,238,252,0.80)", foamAlpha: 0.97, bubbles: 16 },
  ];

  const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const sampleWave = (leadX: number, yT: number, l: WaveLayer, ts: number) =>
    leadX
    + Math.sin(yT * Math.PI * 2 * l.freqA + ts + l.phase) * l.amp
    + Math.sin(yT * Math.PI * 2 * l.freqB + ts * 0.72 + l.phase * 1.3) * (l.amp * 0.28)
    + Math.sin(yT * Math.PI * 2 * l.freqC + ts * 0.41 + l.phase * 0.7) * (l.amp * 0.11);

  const drawLayer = (l: WaveLayer, leadX: number, envAlpha: number, now: number) => {
    const ts = now * l.timeRate;
    ctx.save();
    ctx.globalAlpha = envAlpha;
    ctx.beginPath();
    ctx.moveTo(-W * 0.1, 0); ctx.lineTo(-W * 0.1, H);
    ctx.lineTo(sampleWave(leadX, 1, l, ts), H);
    for (let y = H; y >= 0; y -= STEP) ctx.lineTo(sampleWave(leadX, y / H, l, ts), y);
    ctx.closePath();
    const bg = ctx.createLinearGradient(leadX - W * 0.88, 0, leadX + l.amp, 0);
    bg.addColorStop(0, l.colorA); bg.addColorStop(0.72, l.colorB); bg.addColorStop(1, l.colorB);
    ctx.fillStyle = bg; ctx.fill(); ctx.restore();

    ctx.save(); ctx.globalCompositeOperation = "screen"; ctx.globalAlpha = envAlpha * 0.15;
    ctx.fillStyle = "rgba(180,242,255,0.85)";
    for (let s = 0; s < 3; s++) {
      const seed = s * 1.618 + ts * 0.35;
      const sx = leadX - W * 0.11 * (s + 1.3) + Math.sin(seed) * 11;
      const sw2 = 4 + Math.abs(Math.sin(seed * 0.7)) * 8;
      ctx.beginPath(); ctx.moveTo(sx,0); ctx.lineTo(sx+sw2,0); ctx.lineTo(sx+sw2*0.3,H); ctx.lineTo(sx-sw2*0.3,H); ctx.closePath(); ctx.fill();
    }
    ctx.restore();

    ctx.save(); ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath(); ctx.moveTo(sampleWave(leadX, 0, l, ts), 0);
    for (let y = STEP; y <= H; y += STEP) ctx.lineTo(sampleWave(leadX, y / H, l, ts), y);
    ctx.globalAlpha = envAlpha * l.foamAlpha * 0.11; ctx.strokeStyle = "rgba(200,246,255,1)"; ctx.lineWidth = 24; ctx.stroke();
    ctx.globalAlpha = envAlpha * l.foamAlpha * 0.26; ctx.strokeStyle = "rgba(228,252,255,1)"; ctx.lineWidth = 9;  ctx.stroke();
    ctx.globalAlpha = envAlpha * l.foamAlpha * 0.92; ctx.strokeStyle = "rgba(255,255,255,1)"; ctx.lineWidth = 2.2; ctx.stroke();
    ctx.restore();

    ctx.save(); ctx.globalAlpha = envAlpha * 0.68; ctx.fillStyle = "rgba(255,255,255,0.82)"; ctx.beginPath();
    for (let i = 0; i < l.bubbles; i++) {
      const t = (i + 0.5) / l.bubbles; const seed = i * 2.718 + l.phase;
      const bx = sampleWave(leadX, t, l, ts) + Math.sin(seed + ts * 0.55) * 26;
      const by = H * t + Math.cos(seed + ts * 0.47) * 12;
      const r = 1.0 + Math.abs(Math.sin(seed * 0.82 + ts * 0.26)) * 3.4;
      ctx.moveTo(bx + r, by); ctx.arc(bx, by, r, 0, Math.PI * 2);
    }
    ctx.fill(); ctx.restore();
  };

  const frame = (now: number) => {
    const raw = Math.min((now - start) / DURATION, 1);
    ctx.clearRect(0, 0, W, H);
    const prog = ease(raw);
    let envAlpha = 1;
    if (raw < 0.05) envAlpha = raw / 0.05;
    if (raw > 0.88) envAlpha = Math.max(0, 1 - (raw - 0.88) / 0.12);
    for (const l of LAYERS) {
      const span = 1.35 + Math.abs(l.offset);
      drawLayer(l, W * l.offset + W * span * Math.min(1, prog * l.speed), envAlpha, now);
    }
    if (prog > 0.32 && !covered) { covered = true; onCover(); }
    if (raw < 1) requestAnimationFrame(frame);
    else teardown(canvas);
  };
  requestAnimationFrame(frame);
}

/* ── Storm / Dark Entry — Simpsons-style clouds + JTEC logo ─────────────
   Clouds roll in from both sides, lightning flashes, JTEC glows through,
   screen goes dark, dark mode is revealed as clouds part.               */
function playDarkEclipse(onCover: () => void) {
  const setup = setupCanvas();
  if (!setup) return;
  const { canvas, ctx, W, H } = setup;
  playStormSound();

  const cx = W / 2;
  const cy = H / 2;
  const DURATION = 2200;
  const COVER_AT = 0.54; // when to flip theme
  const start = performance.now();
  let covered = false;

  /* Pre-render cloud sprites once — no gradient construction per frame */
  type CloudSprite = { img: HTMLCanvasElement; w: number; h: number };
  type Cloud = { sprite: CloudSprite; startX: number; startY: number; restX: number; restY: number; speed: number; alphaMax: number };

  const buildCloudSprite = (sw: number): CloudSprite => {
    const sh = Math.ceil(sw * (0.55 + Math.random() * 0.25));
    const pad = sw * 0.5;
    const cw = Math.ceil(sw + pad * 2);
    const ch = Math.ceil(sh + pad * 2);
    const c = document.createElement("canvas");
    c.width = cw; c.height = ch;
    const cc = c.getContext("2d")!;
    const blobCount = 5 + Math.floor(Math.random() * 4);
    for (let b = 0; b < blobCount; b++) {
      const bx = pad + Math.random() * sw;
      const by = pad * 0.8 + Math.random() * sh;
      const br = sw * (0.38 + Math.random() * 0.44);
      const hue = 228 + Math.random() * 24;
      const g = cc.createRadialGradient(bx, by, 0, bx, by, br);
      g.addColorStop(0,   `hsla(${hue},55%,7%,0.92)`);
      g.addColorStop(0.35,`hsla(${hue},50%,5%,0.72)`);
      g.addColorStop(0.7, `hsla(${hue},45%,4%,0.38)`);
      g.addColorStop(1,   `hsla(${hue},40%,3%,0)`);
      cc.fillStyle = g;
      cc.beginPath(); cc.arc(bx, by, br, 0, Math.PI * 2); cc.fill();
    }
    return { img: c, w: cw, h: ch };
  };

  // 20 clouds: 10 from left, 10 from right — rest positions spread over screen
  const clouds: Cloud[] = [];
  for (let i = 0; i < 20; i++) {
    const fromLeft = i < 10;
    const col = i % 5;
    const row = Math.floor((i % 10) / 5);
    const sz = 200 + Math.random() * 220;
    const sprite = buildCloudSprite(sz);
    // Rest position: cover screen in a loose grid
    const restX = W * (0.05 + col * 0.22) + (Math.random() - 0.5) * W * 0.08;
    const restY = H * (0.1  + row * 0.42) + (Math.random() - 0.5) * H * 0.18;
    clouds.push({
      sprite,
      startX: fromLeft ? -sprite.w * 0.5 - 60 : W + sprite.w * 0.5 + 60,
      startY: restY + (Math.random() - 0.5) * H * 0.1,
      restX, restY,
      speed:    0.65 + Math.random() * 0.7,
      alphaMax: 0.72 + Math.random() * 0.28,
    });
  }

  // Lightning: two flashes, animated over ~80ms each
  let flash = 0;
  const flashTimes = [0.32, 0.46];
  const flashFired = new Set<number>();

  const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const easeOut   = (t: number) => 1 - Math.pow(1 - t, 2.5);

  const frame = (now: number) => {
    const raw = Math.min((now - start) / DURATION, 1);
    ctx.clearRect(0, 0, W, H);

    // ── Cloud progress ──
    const cloudIn   = raw < COVER_AT  ? easeInOut(raw / COVER_AT) : 1;
    const cloudOut  = raw > COVER_AT + 0.08 ? easeOut((raw - COVER_AT - 0.08) / (1 - COVER_AT - 0.08)) : 0;
    const cloudAlphaEnv = cloudOut > 0 ? Math.max(0, 1 - cloudOut * 1.15) : 1;

    for (const c of clouds) {
      const t = Math.min(cloudIn * c.speed, 1);
      const e = easeInOut(t);
      const px = c.startX + (c.restX - c.startX) * e;
      const py = c.startY + (c.restY - c.startY) * e;
      const a   = Math.min(cloudIn * c.speed * 1.6, 1) * cloudAlphaEnv * c.alphaMax;
      if (a < 0.01) continue;
      ctx.globalAlpha = a;
      ctx.drawImage(c.sprite.img, px - c.sprite.w / 2, py - c.sprite.h / 2);
    }
    ctx.globalAlpha = 1;

    // ── Full dark fill when clouds dense enough ──
    const darkness = Math.max(0, Math.min(1, (cloudIn - 0.72) / 0.28));
    const darkFade = darkness * cloudAlphaEnv;
    if (darkFade > 0) {
      ctx.globalAlpha = darkFade;
      ctx.fillStyle = "rgb(3,1,14)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }

    // ── Theme switch ──
    if (cloudIn > 0.88 && !covered) { covered = true; onCover(); }

    // ── Lightning flashes ──
    for (const ft of flashTimes) {
      if (raw >= ft && !flashFired.has(ft)) {
        flashFired.add(ft);
        flash = 1;
      }
    }
    if (flash > 0.01) {
      ctx.globalAlpha = flash * 0.5;
      ctx.fillStyle = "rgba(210,220,255,1)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
      flash *= 0.68; // fast natural decay
    }

    // ── JTEC logo materialises through storm clouds ──
    // Appears as clouds build, peaks at coverage, then fades to dark
    const logoRaw = raw > 0.14 && raw < COVER_AT + 0.16
      ? raw < 0.26 ? (raw - 0.14) / 0.12
      : raw > COVER_AT ? Math.max(0, 1 - (raw - COVER_AT) / 0.16)
      : 1
      : 0;

    if (logoRaw > 0.01) {
      ctx.save();

      // Halo glow behind logo (screen blend over clouds)
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = logoRaw * 0.65;
      const haloR = Math.min(W, H) * 0.22;
      const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR);
      hg.addColorStop(0,   "rgba(110,90,220,0.55)");
      hg.addColorStop(0.5, "rgba(70,50,180,0.22)");
      hg.addColorStop(1,   "rgba(30,15,90,0)");
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.arc(cx, cy, haloR, 0, Math.PI * 2); ctx.fill();

      // JTEC text — three passes for glow-without-blur
      ctx.globalCompositeOperation = "source-over";
      const fontSize = Math.min(W * 0.135, 130);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textGrad = ctx.createLinearGradient(cx - fontSize * 1.6, cy, cx + fontSize * 1.6, cy);
      textGrad.addColorStop(0,    "rgba(129,140,248,1)");
      textGrad.addColorStop(0.45, "rgba(167,139,250,1)");
      textGrad.addColorStop(1,    "rgba(232,121,249,1)");

      // Outer glow pass
      ctx.globalAlpha = logoRaw * 0.18;
      ctx.font = `900 ${fontSize * 1.06}px system-ui,-apple-system,sans-serif`;
      ctx.fillStyle = "rgba(180,160,255,1)";
      ctx.fillText("JTEC", cx, cy);

      // Mid glow
      ctx.globalAlpha = logoRaw * 0.38;
      ctx.font = `900 ${fontSize * 1.02}px system-ui,-apple-system,sans-serif`;
      ctx.fillStyle = "rgba(200,185,255,1)";
      ctx.fillText("JTEC", cx, cy);

      // Sharp core
      ctx.globalAlpha = logoRaw * 0.92;
      ctx.font = `900 ${fontSize}px system-ui,-apple-system,sans-serif`;
      ctx.fillStyle = textGrad;
      ctx.fillText("JTEC", cx, cy);

      // Tagline under logo
      ctx.globalAlpha = logoRaw * 0.55;
      ctx.font = `400 ${Math.max(fontSize * 0.18, 14)}px system-ui,-apple-system,sans-serif`;
      ctx.fillStyle = "rgba(180,170,230,1)";
      ctx.fillText("Tecnologia & Inovação", cx, cy + fontSize * 0.72);

      ctx.restore();
    }

    if (raw < 1) requestAnimationFrame(frame);
    else teardown(canvas);
  };

  requestAnimationFrame(frame);
}

/* ── Component ──────────────────────────────────────────────────────────── */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full border border-white/10 bg-white/[0.04]" />;
  }

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    if (document.getElementById(TRANSITION_ID)) return;
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
