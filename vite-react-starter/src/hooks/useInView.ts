import { useEffect, useRef, useState } from "react";

/** True once the element has entered the viewport (fires once by default). */
export function useInView<T extends Element>(options: IntersectionObserverInit & { once?: boolean } = {}) {
  const { once = true, ...io } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); if (once) obs.disconnect(); }
      else if (!once) setInView(false);
    }, { threshold: 0.15, ...io });
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]); // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, inView] as const;
}
