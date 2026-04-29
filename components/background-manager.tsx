"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const InteractiveBackground = dynamic(() => import("./interactive-background"), { ssr: false });
const LightBackground = dynamic(() => import("./light-background"), { ssr: false });

export default function BackgroundManager() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return resolvedTheme === "light" ? <LightBackground /> : <InteractiveBackground />;
}
