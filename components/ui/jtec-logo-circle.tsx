/**
 * Circular JTEC logo mark — J T E C arranged in 4 quadrants
 * inside concentric rings with cross dividers.
 * Uses SVG gradients; uid prop prevents ID collisions when
 * rendered in multiple places on the same page.
 */
export default function JtecLogoCircle({
  size = 48,
  uid = "default",
  className,
  style,
}: {
  size?: number;
  uid?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const gid = `jlg-${uid}`;
  const gid2 = `jlg2-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="JTEC"
      role="img"
    >
      <defs>
        {/* Primary diagonal gradient (top-left → bottom-right) */}
        <linearGradient
          id={gid}
          x1="0" y1="0" x2="100" y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#818cf8" />
          <stop offset="46%"  stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
        {/* Secondary gradient for inner elements (softer) */}
        <linearGradient
          id={gid2}
          x1="0" y1="0" x2="100" y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#818cf8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e879f9" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* ── Outer ring (thick) ── */}
      <circle
        cx="50" cy="50" r="46"
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth="3.5"
      />

      {/* ── Middle ring ── */}
      <circle
        cx="50" cy="50" r="36"
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />

      {/* ── Cross dividers (inside the middle ring) ── */}
      <line
        x1="14" y1="50" x2="86" y2="50"
        stroke={`url(#${gid2})`}
        strokeWidth="1"
      />
      <line
        x1="50" y1="14" x2="50" y2="86"
        stroke={`url(#${gid2})`}
        strokeWidth="1"
      />

      {/* ── Small tick dots where cross meets middle ring ── */}
      <circle cx="50" cy="14" r="2"   fill={`url(#${gid})`} fillOpacity="0.7" />
      <circle cx="50" cy="86" r="2"   fill={`url(#${gid})`} fillOpacity="0.7" />
      <circle cx="14" cy="50" r="2"   fill={`url(#${gid})`} fillOpacity="0.7" />
      <circle cx="86" cy="50" r="2"   fill={`url(#${gid})`} fillOpacity="0.7" />

      {/* ── Letters in each quadrant ── */}
      {/* J — top-left */}
      <text
        x="31" y="31"
        fontFamily="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
        fontSize="23"
        fontWeight="800"
        fill={`url(#${gid})`}
        textAnchor="middle"
        dominantBaseline="central"
      >
        J
      </text>
      {/* T — top-right */}
      <text
        x="69" y="31"
        fontFamily="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
        fontSize="23"
        fontWeight="800"
        fill={`url(#${gid})`}
        textAnchor="middle"
        dominantBaseline="central"
      >
        T
      </text>
      {/* E — bottom-left */}
      <text
        x="31" y="69"
        fontFamily="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
        fontSize="23"
        fontWeight="800"
        fill={`url(#${gid})`}
        textAnchor="middle"
        dominantBaseline="central"
      >
        E
      </text>
      {/* C — bottom-right */}
      <text
        x="69" y="69"
        fontFamily="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
        fontSize="23"
        fontWeight="800"
        fill={`url(#${gid})`}
        textAnchor="middle"
        dominantBaseline="central"
      >
        C
      </text>
    </svg>
  );
}
