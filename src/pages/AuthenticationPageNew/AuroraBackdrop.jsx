import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Signature moment: a soft, pointer-reactive aurora field that uses CSS variables.
 * Respects reduced motion.
 */
export function AuroraBackdrop({ className, children }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (prefersReduced) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${Math.max(0, Math.min(100, x))}%`);
      el.style.setProperty("--my", `${Math.max(0, Math.min(100, y))}%`);
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className={cn("bg-hero", className)}>
      {children}
    </div>
  );
}
