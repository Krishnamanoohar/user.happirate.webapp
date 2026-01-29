import { useEffect, useRef } from "react";

type Props = {
  className?: string;
};

/**
 * Signature moment: a subtle pointer-following light field.
 * Uses CSS variables so styling remains token-based.
 */
export function InteractiveBackdrop({ className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const handler = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };

    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // Defaults centered
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        ["--mx" as any]: "55%",
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        ["--my" as any]: "25%",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(600px 350px at var(--mx) var(--my), hsl(var(--primary) / 0.22), transparent 60%), radial-gradient(800px 420px at calc(var(--mx) + 18%) calc(var(--my) + 22%), hsl(var(--brand-2) / 0.16), transparent 62%)",
        }}
      />
    </div>
  );
}
