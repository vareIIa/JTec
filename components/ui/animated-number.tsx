"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  className?: string;
  duration?: number;
};

function extractParts(raw: string): { prefix: string; num: number; suffix: string } | null {
  const m = raw.match(/^([^0-9−-]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/);
  if (!m) return null;
  const num = parseFloat(m[2].replace(",", ".").replace(".", "")) || parseFloat(m[2].replace(",", "."));
  return { prefix: m[1], num, suffix: m[3] };
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function AnimatedNumber({ value, className, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const triggered = useRef(false);

  useEffect(() => {
    const parts = extractParts(value);
    if (!parts) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;

        const start = performance.now();
        const { prefix, num, suffix } = parts;

        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOut(progress);
          const current = Math.round(easedProgress * num);

          const formatted = num >= 1000
            ? current.toLocaleString("pt-BR")
            : String(current);

          setDisplay(`${prefix}${formatted}${suffix}`);

          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
