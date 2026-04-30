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
    const dur = 4.4;
    const sr = ac.sampleRate;

    // Brown noise (deep bass rumble for thunder) — longer arc, two swells
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
    const t0 = ac.currentTime;
    tg.gain.setValueAtTime(0, t0);
    tg.gain.linearRampToValueAtTime(0.62, t0 + 0.55);
    tg.gain.linearRampToValueAtTime(0.78, t0 + 1.4);
    tg.gain.linearRampToValueAtTime(0.5,  t0 + 2.3);
    tg.gain.linearRampToValueAtTime(0.66, t0 + 3.0);
    tg.gain.linearRampToValueAtTime(0,    t0 + dur);
    tsrc.connect(tlp); tlp.connect(tls); tls.connect(tg); tg.connect(ac.destination);
    tsrc.start(); tsrc.stop(t0 + dur);

    // Wind — bandpass sweeping down, longer envelope
    const wbuf = ac.createBuffer(1, Math.ceil(sr * dur), sr);
    const wd = wbuf.getChannelData(0);
    for (let i = 0; i < wd.length; i++) wd[i] = Math.random() * 2 - 1;
    const wsrc = ac.createBufferSource();
    wsrc.buffer = wbuf;
    const wbp = ac.createBiquadFilter();
    wbp.type = "bandpass";
    wbp.frequency.setValueAtTime(950, t0);
    wbp.frequency.linearRampToValueAtTime(420, t0 + dur * 0.55);
    wbp.frequency.linearRampToValueAtTime(220, t0 + dur);
    wbp.Q.value = 0.6;
    const wg = ac.createGain();
    wg.gain.setValueAtTime(0, t0);
    wg.gain.linearRampToValueAtTime(0.24, t0 + 0.7);
    wg.gain.linearRampToValueAtTime(0.18, t0 + dur * 0.7);
    wg.gain.linearRampToValueAtTime(0, t0 + dur);
    wsrc.connect(wbp); wbp.connect(wg); wg.connect(ac.destination);
    wsrc.start(); wsrc.stop(t0 + dur);

    // Lightning crackle — three bursts spread across the storm
    const burstTimes = [0.55, 1.25, 1.95];
    for (let b = 0; b < burstTimes.length; b++) {
      const tb = t0 + burstTimes[b];
      const lbuf = ac.createBuffer(1, Math.ceil(sr * 0.09), sr);
      const ld = lbuf.getChannelData(0);
      for (let i = 0; i < ld.length; i++) ld[i] = Math.random() * 2 - 1;
      const lsrc = ac.createBufferSource();
      lsrc.buffer = lbuf;
      const lhp = ac.createBiquadFilter();
      lhp.type = "highpass";
      lhp.frequency.value = 3000;
      const lg = ac.createGain();
      lg.gain.setValueAtTime(0.36 - b * 0.06, tb);
      lg.gain.exponentialRampToValueAtTime(0.001, tb + 0.09);
      lsrc.connect(lhp); lhp.connect(lg); lg.connect(ac.destination);
      lsrc.start(tb); lsrc.stop(tb + 0.1);
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

/* ── Storm / Dark Entry — Realistic volumetric clouds + JTEC logo ─────────
   Clouds drift in fluidly with multi-layer turbulence, deform organically,
   JTEC glows through and lingers, dark mode is revealed as storm settles. */
function playDarkEclipse(onCover: () => void) {
  const setup = setupCanvas();
  if (!setup) return;
  const { canvas, ctx, W, H } = setup;
  playStormSound();

  const cx = W / 2;
  const cy = H / 2;
  const DURATION = 4200;          // longer overall
  const COVER_AT = 0.48;          // theme flips a bit earlier so logo can breathe
  const LOGO_IN_START = 0.18;
  const LOGO_FULL_AT  = 0.34;
  const LOGO_HOLD_END = 0.62;     // long hold for readability
  const LOGO_OUT_END  = 0.78;
  const start = performance.now();
  let covered = false;

  /* ── Realistic volumetric cloud sprite ──────────────────────────────────
     Layered radial gradients with organic offset blobs + soft inner highlights
     for that "3D wisp" depth. Hue drifts from deep indigo to violet. */
  type CloudSprite = { img: HTMLCanvasElement; w: number; h: number };
  type Cloud = {
    sprite: CloudSprite;
    startX: number; startY: number;
    restX:  number; restY:  number;
    driftX: number; driftY: number;       // continuous post-arrival drift
    speed: number;                         // arrival speed multiplier
    alphaMax: number;
    rot: number; rotSpeed: number;         // gentle rotation for liveness
    scaleBase: number; scalePulse: number; // breathing scale
    phase: number;
    depth: number;                         // 0 = far, 1 = near (parallax + size)
  };

  const buildCloudSprite = (sw: number, depth: number): CloudSprite => {
    const sh = Math.ceil(sw * (0.5 + Math.random() * 0.3));
    const pad = sw * 0.6;
    const cw = Math.ceil(sw + pad * 2);
    const ch = Math.ceil(sh + pad * 2);
    const c = document.createElement("canvas");
    c.width = cw; c.height = ch;
    const cc = c.getContext("2d")!;

    const cxL = cw / 2;
    const cyL = ch / 2;

    // Base hue varies between indigo/violet/blue-purple
    const baseHue = 232 + Math.random() * 28;
    const sat = 38 + Math.random() * 18;

    // Far clouds darker/cooler, near clouds richer
    const lightShift = depth * 4;

    /* Pass 1 — large soft body (low-frequency volume) */
    const bigBlobs = 4 + Math.floor(Math.random() * 3);
    for (let b = 0; b < bigBlobs; b++) {
      const ang = (b / bigBlobs) * Math.PI * 2 + Math.random() * 0.6;
      const dist = sw * (0.05 + Math.random() * 0.22);
      const bx = cxL + Math.cos(ang) * dist;
      const by = cyL + Math.sin(ang) * dist * 0.55;
      const br = sw * (0.42 + Math.random() * 0.32);
      const hue = baseHue + (Math.random() - 0.5) * 12;
      const g = cc.createRadialGradient(bx, by - br * 0.12, 0, bx, by, br);
      g.addColorStop(0,    `hsla(${hue}, ${sat}%, ${10 + lightShift}%, 0.92)`);
      g.addColorStop(0.32, `hsla(${hue}, ${sat - 4}%, ${7 + lightShift}%, 0.78)`);
      g.addColorStop(0.62, `hsla(${hue - 4}, ${sat - 8}%, ${5 + lightShift}%, 0.42)`);
      g.addColorStop(0.85, `hsla(${hue - 8}, ${sat - 12}%, ${4}%, 0.14)`);
      g.addColorStop(1,    `hsla(${hue - 8}, ${sat - 12}%, ${3}%, 0)`);
      cc.fillStyle = g;
      cc.beginPath(); cc.arc(bx, by, br, 0, Math.PI * 2); cc.fill();
    }

    /* Pass 2 — mid-frequency wisps (organic protrusions) */
    const midBlobs = 7 + Math.floor(Math.random() * 5);
    for (let b = 0; b < midBlobs; b++) {
      const ang = Math.random() * Math.PI * 2;
      const dist = sw * (0.18 + Math.random() * 0.32);
      const bx = cxL + Math.cos(ang) * dist;
      const by = cyL + Math.sin(ang) * dist * 0.6;
      const br = sw * (0.16 + Math.random() * 0.22);
      const hue = baseHue + (Math.random() - 0.5) * 16;
      const g = cc.createRadialGradient(bx, by - br * 0.18, 0, bx, by, br);
      g.addColorStop(0,    `hsla(${hue}, ${sat + 4}%, ${12 + lightShift}%, 0.62)`);
      g.addColorStop(0.5,  `hsla(${hue}, ${sat}%, ${7 + lightShift}%, 0.32)`);
      g.addColorStop(1,    `hsla(${hue - 6}, ${sat - 10}%, ${4}%, 0)`);
      cc.fillStyle = g;
      cc.beginPath(); cc.arc(bx, by, br, 0, Math.PI * 2); cc.fill();
    }

    /* Pass 3 — top highlight rim (lightning-lit underbelly) */
    cc.globalCompositeOperation = "screen";
    const rimHue = 258 + Math.random() * 18;
    const rimCount = 3 + Math.floor(Math.random() * 2);
    for (let r = 0; r < rimCount; r++) {
      const rx = cxL + (Math.random() - 0.5) * sw * 0.5;
      const ry = cyL - sh * (0.05 + Math.random() * 0.15);
      const rr = sw * (0.18 + Math.random() * 0.16);
      const g = cc.createRadialGradient(rx, ry, 0, rx, ry, rr);
      g.addColorStop(0,   `hsla(${rimHue}, 70%, 55%, 0.18)`);
      g.addColorStop(0.4, `hsla(${rimHue}, 60%, 40%, 0.08)`);
      g.addColorStop(1,   "rgba(0,0,0,0)");
      cc.fillStyle = g;
      cc.beginPath(); cc.arc(rx, ry, rr, 0, Math.PI * 2); cc.fill();
    }
    cc.globalCompositeOperation = "source-over";

    /* Pass 4 — tiny sparkle wisps for organic micro-detail */
    cc.globalCompositeOperation = "lighter";
    const wispCount = 6 + Math.floor(Math.random() * 4);
    for (let w = 0; w < wispCount; w++) {
      const wx = cxL + (Math.random() - 0.5) * sw * 0.7;
      const wy = cyL + (Math.random() - 0.5) * sh * 0.7;
      const wr = sw * (0.04 + Math.random() * 0.08);
      const g = cc.createRadialGradient(wx, wy, 0, wx, wy, wr);
      g.addColorStop(0, `hsla(${baseHue + 10}, 50%, 25%, 0.10)`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      cc.fillStyle = g;
      cc.beginPath(); cc.arc(wx, wy, wr, 0, Math.PI * 2); cc.fill();
    }
    cc.globalCompositeOperation = "source-over";

    return { img: c, w: cw, h: ch };
  };

  // 28 clouds — staggered depth (parallax) + 3 directional sources for organic flow
  const clouds: Cloud[] = [];
  const CLOUD_COUNT = 28;
  for (let i = 0; i < CLOUD_COUNT; i++) {
    const depth = Math.random();                 // 0 far, 1 near
    const fromLeft = i % 2 === 0;
    const sz = (160 + Math.random() * 240) * (0.7 + depth * 0.6);
    const sprite = buildCloudSprite(sz, depth);

    // Spread rest positions in a loose grid with strong randomness
    const col = i % 6;
    const row = Math.floor(i / 6);
    const restX = W * (-0.05 + col * 0.205) + (Math.random() - 0.5) * W * 0.12;
    const restY = H * (-0.08 + row * 0.24) + (Math.random() - 0.5) * H * 0.18;

    // Diagonal entry — adds fluidity vs. pure horizontal
    const yJitter = (Math.random() - 0.5) * H * 0.35;
    const startX = fromLeft ? -sprite.w * 0.6 - 80 : W + sprite.w * 0.6 + 80;
    const startY = restY + yJitter;

    clouds.push({
      sprite,
      startX, startY, restX, restY,
      driftX: (fromLeft ? 1 : -1) * (8 + Math.random() * 14) * (0.6 + depth * 0.6),
      driftY: (Math.random() - 0.5) * 10,
      speed: 0.45 + Math.random() * 0.55 + depth * 0.25,
      alphaMax: (0.55 + Math.random() * 0.4) * (0.6 + depth * 0.5),
      rot: (Math.random() - 0.5) * 0.25,
      rotSpeed: (Math.random() - 0.5) * 0.0004,
      scaleBase: 0.92 + Math.random() * 0.16,
      scalePulse: 0.04 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
      depth,
    });
  }
  // Sort: far clouds first (drawn behind), near clouds last (front)
  clouds.sort((a, b) => a.depth - b.depth);

  // Lightning flashes — three across the storm
  let flash = 0;
  const flashTimes = [0.22, 0.36, 0.5];
  const flashFired = new Set<number>();

  const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const easeOut   = (t: number) => 1 - Math.pow(1 - t, 2.5);
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const smoothstep = (a: number, b: number, t: number) => {
    const x = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return x * x * (3 - 2 * x);
  };

  const frame = (now: number) => {
    const elapsed = now - start;
    const raw = Math.min(elapsed / DURATION, 1);
    ctx.clearRect(0, 0, W, H);

    // ── Cloud arrival + drift ──
    // Arrival: clouds fly to rest position (raw 0 → COVER_AT)
    // Drift: after arrival, continuous gentle motion (raw COVER_AT → end)
    // Departure: late phase, clouds fade out
    const cloudIn = easeInOutCubic(Math.min(raw / COVER_AT, 1));
    const cloudOut = raw > LOGO_OUT_END
      ? easeOut((raw - LOGO_OUT_END) / (1 - LOGO_OUT_END))
      : 0;
    const cloudAlphaEnv = Math.max(0, 1 - cloudOut);

    // Sky color wash that intensifies as storm builds
    const skyWash = smoothstep(0.05, COVER_AT * 0.9, raw) * cloudAlphaEnv;
    if (skyWash > 0) {
      const sg = ctx.createLinearGradient(0, 0, 0, H);
      sg.addColorStop(0,    `rgba(8, 6, 24, ${skyWash * 0.55})`);
      sg.addColorStop(0.55, `rgba(14, 10, 38, ${skyWash * 0.7})`);
      sg.addColorStop(1,    `rgba(4, 3, 18, ${skyWash * 0.85})`);
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, W, H);
    }

    // Continuous drift time after arrival — keeps clouds living
    const driftT = Math.max(0, elapsed - DURATION * COVER_AT) / 1000;

    for (const c of clouds) {
      // Arrival progress (per-cloud staggered)
      const t = Math.min(cloudIn * c.speed, 1);
      const e = easeInOutCubic(t);

      // Base position from arrival
      let px = c.startX + (c.restX - c.startX) * e;
      let py = c.startY + (c.restY - c.startY) * e;

      // Continuous drift after arrival (turbulent, multi-frequency)
      px += c.driftX * driftT * 0.18
          + Math.sin(driftT * 0.7 + c.phase)        * 14 * (0.5 + c.depth)
          + Math.sin(driftT * 1.6 + c.phase * 1.7)  * 5;
      py += c.driftY * driftT * 0.18
          + Math.cos(driftT * 0.55 + c.phase * 1.3) * 9 * (0.5 + c.depth)
          + Math.sin(driftT * 1.9 + c.phase * 0.6)  * 4;

      // Breathing scale + slow rotation
      const scale = c.scaleBase + Math.sin(driftT * 0.45 + c.phase) * c.scalePulse;
      const rot = c.rot + c.rotSpeed * elapsed;

      // Alpha blending — depth attenuation + envelope
      const arrivalAlpha = Math.min(cloudIn * c.speed * 1.4, 1);
      const a = arrivalAlpha * cloudAlphaEnv * c.alphaMax * (0.55 + c.depth * 0.5);
      if (a < 0.01) continue;

      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(px, py);
      ctx.rotate(rot);
      ctx.scale(scale, scale);
      ctx.drawImage(c.sprite.img, -c.sprite.w / 2, -c.sprite.h / 2);
      ctx.restore();
    }

    // ── Theme switch ──
    if (raw >= COVER_AT && !covered) { covered = true; onCover(); }

    // ── Deep dark fill once clouds settle ──
    const darkness = smoothstep(COVER_AT * 0.85, COVER_AT * 1.05, raw);
    const darkFade = darkness * cloudAlphaEnv;
    if (darkFade > 0) {
      ctx.globalAlpha = darkFade * 0.85;
      ctx.fillStyle = "rgb(3,1,14)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }

    // ── Lightning flashes (subtler so they don't overpower the logo) ──
    for (const ft of flashTimes) {
      if (raw >= ft && !flashFired.has(ft)) {
        flashFired.add(ft);
        flash = 1;
      }
    }
    if (flash > 0.01) {
      ctx.globalAlpha = flash * 0.38;
      ctx.fillStyle = "rgba(190,200,255,1)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
      flash *= 0.74;
    }

    // ── JTEC logo: graceful fade-in, long hold, graceful fade-out ──
    let logoAlpha = 0;
    if (raw >= LOGO_IN_START && raw <= LOGO_OUT_END) {
      if (raw < LOGO_FULL_AT) {
        logoAlpha = easeInOutCubic((raw - LOGO_IN_START) / (LOGO_FULL_AT - LOGO_IN_START));
      } else if (raw < LOGO_HOLD_END) {
        logoAlpha = 1;
      } else {
        logoAlpha = 1 - easeInOutCubic((raw - LOGO_HOLD_END) / (LOGO_OUT_END - LOGO_HOLD_END));
      }
    }

    if (logoAlpha > 0.01) {
      ctx.save();

      // Subtle vertical breathing on logo — feels alive, not static
      const breathe = Math.sin(elapsed * 0.0018) * 2;

      // Halo glow (screen blend)
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = logoAlpha * 0.7;
      const haloR = Math.min(W, H) * 0.26;
      const hg = ctx.createRadialGradient(cx, cy + breathe, 0, cx, cy + breathe, haloR);
      hg.addColorStop(0,    "rgba(140,110,240,0.6)");
      hg.addColorStop(0.45, "rgba(90,60,200,0.28)");
      hg.addColorStop(1,    "rgba(30,15,90,0)");
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.arc(cx, cy + breathe, haloR, 0, Math.PI * 2); ctx.fill();

      // JTEC text — three passes for glow-without-blur
      ctx.globalCompositeOperation = "source-over";
      const fontSize = Math.min(W * 0.14, 140);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textGrad = ctx.createLinearGradient(cx - fontSize * 1.6, cy, cx + fontSize * 1.6, cy);
      textGrad.addColorStop(0,    "rgba(129,140,248,1)");
      textGrad.addColorStop(0.45, "rgba(167,139,250,1)");
      textGrad.addColorStop(1,    "rgba(232,121,249,1)");

      // Outer glow
      ctx.globalAlpha = logoAlpha * 0.22;
      ctx.font = `900 ${fontSize * 1.08}px system-ui,-apple-system,sans-serif`;
      ctx.fillStyle = "rgba(180,160,255,1)";
      ctx.fillText("JTEC", cx, cy + breathe);

      // Mid glow
      ctx.globalAlpha = logoAlpha * 0.42;
      ctx.font = `900 ${fontSize * 1.03}px system-ui,-apple-system,sans-serif`;
      ctx.fillStyle = "rgba(200,185,255,1)";
      ctx.fillText("JTEC", cx, cy + breathe);

      // Sharp core
      ctx.globalAlpha = logoAlpha * 0.96;
      ctx.font = `900 ${fontSize}px system-ui,-apple-system,sans-serif`;
      ctx.fillStyle = textGrad;
      ctx.fillText("JTEC", cx, cy + breathe);

      // Tagline
      ctx.globalAlpha = logoAlpha * 0.62;
      ctx.font = `400 ${Math.max(fontSize * 0.18, 14)}px system-ui,-apple-system,sans-serif`;
      ctx.fillStyle = "rgba(190,180,240,1)";
      ctx.fillText("Tecnologia & Inovação", cx, cy + fontSize * 0.74 + breathe);

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
