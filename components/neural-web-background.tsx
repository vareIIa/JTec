"use client";

import { useEffect, useRef } from "react";

/**
 * Neural-web background — performance-tuned minimalist mesh.
 *
 * Optimizations:
 *  - Capped DPR at 1.25 (≈40% fewer pixels vs 2x)
 *  - 30fps target (60fps wastes cycles for a contemplative bg)
 *  - Pre-rendered halo sprite atlas (gradients built once, blitted via drawImage)
 *  - Pre-rendered aurora (refreshed every 500ms, not per-frame)
 *  - Spatial grid for edge graph (O(n·k) instead of O(n²))
 *  - Pauses when tab hidden or canvas off-screen (IntersectionObserver)
 *  - No per-frame shadowBlur (expensive); lightning uses stacked strokes
 */

type Tier = 0 | 1 | 2;

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseR: number;
  pulsePhase: number;
  tier: Tier;
  hueIdx: number; // index into HUES
};

type Edge = { a: number; b: number };

type Pulse = {
  edgeIdx: number;
  start: number;
  duration: number;
  hueIdx: number;
  reverse: boolean;
};

type Bolt = {
  start: number;
  duration: number;
  segments: { x: number; y: number }[];
  branches: { segments: { x: number; y: number }[] }[];
  hue: number;
};

const NODE_COUNT = 50;
const HUB_COUNT = 4;
const RELAY_COUNT = 10;
const CONNECT_DIST = 200;
const CONNECT_DIST_HUB = CONNECT_DIST * 1.55;

const PULSE_INTERVAL = 800;
const MAX_PULSES = 3;
const BOLT_INTERVAL_MIN = 6500;
const BOLT_INTERVAL_MAX = 9500;

const FRAME_INTERVAL = 1000 / 30; // 30fps cap
const EDGE_REBUILD_INTERVAL = 220;
const AURORA_REFRESH = 500;

const HUES = [232, 244, 256, 268];

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function NeuralWebBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    // ── Pre-rendered halo sprite atlas ──
    // One sprite per (tier, hueIdx) — drawn once, reused via drawImage
    const HALO_SIZE = 64;
    const haloSprites = new Map<string, HTMLCanvasElement>();
    const buildHaloSprite = (tier: Tier, hueIdx: number): HTMLCanvasElement => {
      const key = `${tier}-${hueIdx}`;
      const cached = haloSprites.get(key);
      if (cached) return cached;
      const c = document.createElement("canvas");
      c.width = HALO_SIZE;
      c.height = HALO_SIZE;
      const cx = c.getContext("2d")!;
      const hue = HUES[hueIdx];
      const baseAlpha = tier === 2 ? 0.55 : tier === 1 ? 0.4 : 0.3;
      const g = cx.createRadialGradient(HALO_SIZE / 2, HALO_SIZE / 2, 0, HALO_SIZE / 2, HALO_SIZE / 2, HALO_SIZE / 2);
      g.addColorStop(0, `hsla(${hue}, 85%, 75%, ${baseAlpha})`);
      g.addColorStop(0.45, `hsla(${hue}, 80%, 55%, ${baseAlpha * 0.35})`);
      g.addColorStop(1, `hsla(${hue}, 70%, 40%, 0)`);
      cx.fillStyle = g;
      cx.fillRect(0, 0, HALO_SIZE, HALO_SIZE);
      haloSprites.set(key, c);
      return c;
    };

    // ── Pre-rendered hub bloom ──
    const HUB_SIZE = 160;
    const hubSprites = new Map<number, HTMLCanvasElement>();
    const buildHubSprite = (hueIdx: number): HTMLCanvasElement => {
      const cached = hubSprites.get(hueIdx);
      if (cached) return cached;
      const c = document.createElement("canvas");
      c.width = HUB_SIZE;
      c.height = HUB_SIZE;
      const cx = c.getContext("2d")!;
      const hue = HUES[hueIdx];
      const g = cx.createRadialGradient(HUB_SIZE / 2, HUB_SIZE / 2, 0, HUB_SIZE / 2, HUB_SIZE / 2, HUB_SIZE / 2);
      g.addColorStop(0, `hsla(${hue}, 85%, 65%, 0.28)`);
      g.addColorStop(0.5, `hsla(${hue}, 85%, 55%, 0.10)`);
      g.addColorStop(1, "hsla(260, 80%, 40%, 0)");
      cx.fillStyle = g;
      cx.fillRect(0, 0, HUB_SIZE, HUB_SIZE);
      hubSprites.set(hueIdx, c);
      return c;
    };

    // ── Pre-rendered pulse head ──
    const PULSE_SIZE = 40;
    const pulseSprites = new Map<number, HTMLCanvasElement>();
    const buildPulseSprite = (hueIdx: number): HTMLCanvasElement => {
      const cached = pulseSprites.get(hueIdx);
      if (cached) return cached;
      const c = document.createElement("canvas");
      c.width = PULSE_SIZE;
      c.height = PULSE_SIZE;
      const cx = c.getContext("2d")!;
      const hue = HUES[hueIdx];
      const g = cx.createRadialGradient(PULSE_SIZE / 2, PULSE_SIZE / 2, 0, PULSE_SIZE / 2, PULSE_SIZE / 2, PULSE_SIZE / 2);
      g.addColorStop(0, `hsla(${hue}, 100%, 92%, 0.95)`);
      g.addColorStop(0.3, `hsla(${hue}, 100%, 75%, 0.7)`);
      g.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`);
      cx.fillStyle = g;
      cx.fillRect(0, 0, PULSE_SIZE, PULSE_SIZE);
      pulseSprites.set(hueIdx, c);
      return c;
    };

    // ── Aurora off-screen canvas ──
    const auroraCanvas = document.createElement("canvas");
    let lastAuroraAt = 0;

    const renderAurora = (now: number) => {
      auroraCanvas.width = W;
      auroraCanvas.height = H;
      const ax = auroraCanvas.getContext("2d")!;
      ax.clearRect(0, 0, W, H);
      ax.globalAlpha = 0.4;
      ax.globalCompositeOperation = "screen";
      const auroraT = now * 0.00005;
      const blobs = [
        { x: W * (0.3 + 0.06 * Math.sin(auroraT)),       y: H * (0.4 + 0.05 * Math.cos(auroraT * 1.3)), r: Math.max(W, H) * 0.32, color: "rgba(70,50,180," },
        { x: W * (0.7 + 0.07 * Math.sin(auroraT * 1.4)), y: H * (0.6 + 0.05 * Math.cos(auroraT * 0.9)), r: Math.max(W, H) * 0.30, color: "rgba(140,70,200," },
      ];
      for (const b of blobs) {
        const g = ax.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.color + "0.32)");
        g.addColorStop(0.5, b.color + "0.08)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ax.fillStyle = g;
        ax.beginPath();
        ax.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ax.fill();
      }
      lastAuroraAt = now;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      W = canvas.parentElement?.clientWidth ?? window.innerWidth;
      H = canvas.parentElement?.clientHeight ?? window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastAuroraAt = 0; // force refresh
    };
    resize();

    // ── Build nodes ──
    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const tier: Tier = i < HUB_COUNT ? 2 : i < HUB_COUNT + RELAY_COUNT ? 1 : 0;
      const baseR =
        tier === 2 ? 2.6 + Math.random() * 1.0 :
        tier === 1 ? 1.6 + Math.random() * 0.6 :
                     0.8 + Math.random() * 0.6;
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        baseR,
        pulsePhase: (i / NODE_COUNT) * Math.PI * 2,
        tier,
        hueIdx: i % HUES.length,
      });
    }

    // ── Edges via spatial grid (O(n·k) instead of O(n²)) ──
    let edges: Edge[] = [];
    const CELL = CONNECT_DIST_HUB;
    const grid = new Map<number, number[]>();

    const rebuildEdges = () => {
      edges = [];
      grid.clear();
      const cols = Math.ceil(W / CELL) + 1;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const cx = Math.floor(n.x / CELL);
        const cy = Math.floor(n.y / CELL);
        const key = cy * cols + cx;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key)!.push(i);
      }
      const seen = new Set<number>();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const cx = Math.floor(n.x / CELL);
        const cy = Math.floor(n.y / CELL);
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const key = (cy + dy) * cols + (cx + dx);
            const cell = grid.get(key);
            if (!cell) continue;
            for (const j of cell) {
              if (j <= i) continue;
              const pairKey = i * NODE_COUNT + j;
              if (seen.has(pairKey)) continue;
              seen.add(pairKey);
              const m = nodes[j];
              const ex = n.x - m.x;
              const ey = n.y - m.y;
              const d2 = ex * ex + ey * ey;
              const reach = n.tier === 2 || m.tier === 2 ? CONNECT_DIST_HUB : CONNECT_DIST;
              if (d2 < reach * reach) {
                edges.push({ a: i, b: j });
              }
            }
          }
        }
      }
    };

    const pulses: Pulse[] = [];
    const bolts: Bolt[] = [];
    let nextPulseAt = performance.now() + 400;
    let nextBoltAt = performance.now() + 4000;

    const spawnPulse = (now: number) => {
      if (edges.length === 0 || pulses.length >= MAX_PULSES) return;
      pulses.push({
        edgeIdx: Math.floor(Math.random() * edges.length),
        start: now,
        duration: 1200 + Math.random() * 400,
        hueIdx: Math.floor(Math.random() * HUES.length),
        reverse: Math.random() < 0.5,
      });
    };

    const buildBolt = (ax: number, ay: number, bx: number, by: number, hue: number): Bolt => {
      const dx = bx - ax;
      const dy = by - ay;
      const len = Math.hypot(dx, dy) || 1;
      const segCount = Math.max(8, Math.floor(len / 24));
      const nx = -dy / len;
      const ny = dx / len;
      const segments: { x: number; y: number }[] = [{ x: ax, y: ay }];
      for (let i = 1; i < segCount; i++) {
        const t = i / segCount;
        const taper = Math.sin(t * Math.PI);
        const jitter = (Math.random() - 0.5) * 22 * taper;
        segments.push({ x: ax + dx * t + nx * jitter, y: ay + dy * t + ny * jitter });
      }
      segments.push({ x: bx, y: by });
      const branches: Bolt["branches"] = [];
      const fromIdx = 2 + Math.floor(Math.random() * Math.max(1, segments.length - 4));
      const from = segments[fromIdx];
      const branchLen = 30 + Math.random() * 40;
      const angle = (Math.random() - 0.5) * 1.8 + Math.atan2(dy, dx);
      const tx = from.x + Math.cos(angle) * branchLen;
      const ty = from.y + Math.sin(angle) * branchLen;
      const bSegs: { x: number; y: number }[] = [{ x: from.x, y: from.y }];
      for (let i = 1; i <= 4; i++) {
        const t = i / 4;
        const j = (Math.random() - 0.5) * 8 * (1 - t);
        bSegs.push({ x: from.x + (tx - from.x) * t + ny * j, y: from.y + (ty - from.y) * t - nx * j });
      }
      branches.push({ segments: bSegs });
      return { start: 0, duration: 0, segments, branches, hue };
    };

    const triggerBolt = (now: number) => {
      if (bolts.length > 0) return;
      const hubIndices: number[] = [];
      for (let i = 0; i < nodes.length; i++) if (nodes[i].tier === 2) hubIndices.push(i);
      if (hubIndices.length < 2) return;
      const aI = hubIndices[Math.floor(Math.random() * hubIndices.length)];
      let bI = hubIndices[Math.floor(Math.random() * hubIndices.length)];
      if (bI === aI) bI = hubIndices[(hubIndices.indexOf(aI) + 1) % hubIndices.length];
      const a = nodes[aI];
      const b = nodes[bI];
      const bolt = buildBolt(a.x, a.y, b.x, b.y, 248 + Math.random() * 18);
      bolt.start = now;
      bolt.duration = 600;
      bolts.push(bolt);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => { mouseRef.current.active = false; };

    canvas.parentElement?.addEventListener("mousemove", onMove, { passive: true });
    canvas.parentElement?.addEventListener("mouseleave", onLeave, { passive: true });
    window.addEventListener("resize", resize);

    rebuildEdges();

    // ── Pause when off-screen or tab hidden ──
    let visible = true;
    let tabVisible = !document.hidden;
    const io = new IntersectionObserver(
      (entries) => { visible = entries[0]?.isIntersecting ?? true; },
      { threshold: 0.01 },
    );
    io.observe(canvas);
    const onVis = () => { tabVisible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    let raf = 0;
    let lastFrame = 0;
    let lastEdgeRebuild = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);

      // Also pause during theme transition (canvas overlay running on top)
      const transitioning = !!document.getElementById("jtec-theme-transition-canvas");
      if (!visible || !tabVisible || transitioning) {
        lastFrame = now;
        return;
      }
      // Throttle to ~30fps
      const dt = now - lastFrame;
      if (dt < FRAME_INTERVAL) return;
      lastFrame = now - (dt % FRAME_INTERVAL);

      // ── Update nodes ──
      const m = mouseRef.current;
      const flowT = now * 0.00015;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx + Math.sin(flowT + n.pulsePhase) * 0.025;
        n.y += n.vy + Math.cos(flowT * 0.85 + n.pulsePhase * 1.3) * 0.025;
        if (m.active) {
          const dx = m.x - n.x;
          const dy = m.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 78400) { // 280²
            const dist = Math.sqrt(d2);
            const eased = 1 - dist / 280;
            const f = (n.tier === 2 ? 0.0002 : 0.0005) * eased * eased;
            n.vx += dx * f;
            n.vy += dy * f;
          }
        }
        n.vx *= 0.96;
        n.vy *= 0.96;
        if (n.x < -20) n.x = W + 20;
        else if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        else if (n.y > H + 20) n.y = -20;
      }

      if (now - lastEdgeRebuild > EDGE_REBUILD_INTERVAL) {
        rebuildEdges();
        lastEdgeRebuild = now;
      }

      if (now > nextPulseAt) {
        spawnPulse(now);
        nextPulseAt = now + PULSE_INTERVAL + (Math.random() - 0.5) * 200;
      }

      if (now > nextBoltAt) {
        triggerBolt(now);
        nextBoltAt = now + BOLT_INTERVAL_MIN + Math.random() * (BOLT_INTERVAL_MAX - BOLT_INTERVAL_MIN);
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        if (now - pulses[i].start > pulses[i].duration) pulses.splice(i, 1);
      }
      for (let i = bolts.length - 1; i >= 0; i--) {
        if (now - bolts[i].start > bolts[i].duration) bolts.splice(i, 1);
      }

      // ── DRAW ────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);

      // Layer 1 — Aurora (cached, refreshed every 500ms)
      if (now - lastAuroraAt > AURORA_REFRESH) renderAurora(now);
      ctx.drawImage(auroraCanvas, 0, 0, W, H);

      // Layer 2 — Edges (single batched stroke per category)
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(120, 135, 210, 0.13)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        const a = nodes[e.a];
        const b = nodes[e.b];
        if (a.tier === 2 || b.tier === 2) continue;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();

      ctx.strokeStyle = "rgba(150, 165, 240, 0.24)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        const a = nodes[e.a];
        const b = nodes[e.b];
        if (a.tier !== 2 && b.tier !== 2) continue;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();

      // Layer 3 — Hub bloom (sprite blit)
      ctx.globalCompositeOperation = "screen";
      const breath = now * 0.0006;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.tier !== 2) continue;
        const pulse = 0.55 + 0.45 * Math.sin(n.pulsePhase + breath);
        const r = (55 + pulse * 18) * 2;
        const sprite = buildHubSprite(n.hueIdx);
        ctx.drawImage(sprite, n.x - r / 2, n.y - r / 2, r, r);
      }

      // Layer 4 — Pulses (sprite blit)
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        const e = edges[p.edgeIdx];
        if (!e) continue;
        const a = nodes[e.a];
        const b = nodes[e.b];
        const tRaw = (now - p.start) / p.duration;
        if (tRaw < 0 || tRaw > 1) continue;
        const t = easeInOutCubic(tRaw);
        const tt = p.reverse ? 1 - t : t;
        const px = a.x + (b.x - a.x) * tt;
        const py = a.y + (b.y - a.y) * tt;
        const env = Math.sin(tRaw * Math.PI);
        const r = (5 + env * 4) * 3;
        ctx.globalAlpha = env;
        const sprite = buildPulseSprite(p.hueIdx);
        ctx.drawImage(sprite, px - r / 2, py - r / 2, r, r);
      }
      ctx.globalAlpha = 1;

      // Layer 5 — Lightning (no shadowBlur, stacked strokes for glow)
      if (bolts.length > 0) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (const bolt of bolts) {
          const lifeT = (now - bolt.start) / bolt.duration;
          const env = lifeT < 0.12 ? lifeT / 0.12 : 1 - easeInOutCubic((lifeT - 0.12) / 0.88);
          if (env <= 0.02) continue;

          // Build path once
          ctx.beginPath();
          ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
          for (let i = 1; i < bolt.segments.length; i++) {
            ctx.lineTo(bolt.segments[i].x, bolt.segments[i].y);
          }

          // Outer wide glow
          ctx.strokeStyle = `hsla(${bolt.hue}, 100%, 70%, ${env * 0.18})`;
          ctx.lineWidth = 14 * env;
          ctx.stroke();
          // Mid glow
          ctx.strokeStyle = `hsla(${bolt.hue}, 100%, 78%, ${env * 0.45})`;
          ctx.lineWidth = 6 * env;
          ctx.stroke();
          // Inner core
          ctx.strokeStyle = `rgba(255, 255, 255, ${env * 0.92})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Branches (single stroke, no glow stack)
          for (const br of bolt.branches) {
            ctx.beginPath();
            ctx.moveTo(br.segments[0].x, br.segments[0].y);
            for (let i = 1; i < br.segments.length; i++) {
              ctx.lineTo(br.segments[i].x, br.segments[i].y);
            }
            ctx.strokeStyle = `hsla(${bolt.hue}, 100%, 80%, ${env * 0.5})`;
            ctx.lineWidth = 2.5 * env;
            ctx.stroke();
          }
        }
      }

      // Layer 6 — Nodes (halo sprite + tiny core)
      const nodeBreath = now * 0.0008;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = 0.5 + 0.5 * Math.sin(n.pulsePhase + nodeBreath);
        const r = n.baseR * (0.85 + pulse * 0.4);
        const haloR = r * (n.tier === 2 ? 8 : n.tier === 1 ? 6 : 4.5);
        const sprite = buildHaloSprite(n.tier, n.hueIdx);
        ctx.globalAlpha = 0.7 + pulse * 0.3;
        ctx.drawImage(sprite, n.x - haloR, n.y - haloR, haloR * 2, haloR * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // Cores — batched fill
      ctx.fillStyle = "rgba(245, 248, 255, 0.9)";
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.tier !== 2) continue;
        const r = n.baseR * (0.85 + 0.5 * (0.5 + 0.5 * Math.sin(n.pulsePhase + nodeBreath)) * 0.4);
        ctx.moveTo(n.x + r, n.y);
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      }
      ctx.fill();

      ctx.fillStyle = "rgba(225, 230, 255, 0.8)";
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.tier !== 1) continue;
        const r = n.baseR * (0.85 + 0.5 * (0.5 + 0.5 * Math.sin(n.pulsePhase + nodeBreath)) * 0.4);
        ctx.moveTo(n.x + r, n.y);
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      }
      ctx.fill();

      ctx.fillStyle = "rgba(210, 218, 248, 0.75)";
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.tier !== 0) continue;
        const r = n.baseR * (0.85 + 0.5 * (0.5 + 0.5 * Math.sin(n.pulsePhase + nodeBreath)) * 0.4);
        ctx.moveTo(n.x + r, n.y);
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      canvas.parentElement?.removeEventListener("mousemove", onMove);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
