"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Motor de animación ligero (sin dependencias):
 *  - [data-reveal]     → aparece al entrar en viewport (IntersectionObserver)
 *  - [data-spotlight]  → luz que sigue al cursor (vars CSS --mx/--my)
 *  - [data-magnetic]   → botones con atracción magnética sutil
 * Respeta prefers-reduced-motion y solo aplica efectos de cursor con puntero fino.
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    let raf = 0;
    let last: PointerEvent | null = null;
    let magnet: HTMLElement | null = null;

    const frame = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;

      const spot = target?.closest?.<HTMLElement>("[data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const btn = target?.closest?.<HTMLElement>(".btn--primary");
      if (btn) {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty("--hx", `${e.clientX - r.left}px`);
        btn.style.setProperty("--hy", `${e.clientY - r.top}px`);
      }

      if (!reduce) {
        const m = target?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
        if (magnet && magnet !== m) {
          magnet.style.setProperty("--bx", "0px");
          magnet.style.setProperty("--by", "0px");
        }
        magnet = m;
        if (m) {
          const r = m.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
          m.style.setProperty("--bx", `${dx.toFixed(1)}px`);
          m.style.setProperty("--by", `${dy.toFixed(1)}px`);
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
