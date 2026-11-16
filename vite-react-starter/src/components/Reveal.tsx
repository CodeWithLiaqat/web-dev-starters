import type { ReactNode } from "react";
import { useInView } from "../hooks";
import { cn } from "../lib/format";

/** Fade/slide children in when scrolled into view. Respects prefers-reduced-motion via CSS. */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("reveal", inView && "is-in")} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
