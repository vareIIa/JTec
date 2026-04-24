"use client";

import { useRef, useState, useCallback } from "react";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glare?: boolean;
};

export default function TiltCard({
  children,
  className = "",
  max = 10,
  scale = 1.02,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      const rotateY = (px - 0.5) * 2 * max;
      const rotateX = -(py - 0.5) * 2 * max;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      });

      if (glare) {
        setGlareStyle({
          opacity: 0.35,
          background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 50%)`,
        });
      }
    },
    [max, scale, glare]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    });
    setGlareStyle({ opacity: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card relative ${className}`}
      style={style}
    >
      {children}
      {glare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={glareStyle}
        />
      )}
    </div>
  );
}
