"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { BlueprintBuilding } from "@/components/visuals/BlueprintBuilding";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/services";
import s from "./Hero.module.css";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const st = stage.current;
    if (!el || !st) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0, scroll = 0;

    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      st.style.setProperty("--rx", `${(-cy * 6).toFixed(2)}deg`);
      st.style.setProperty("--ry", `${(cx * 8).toFixed(2)}deg`);
      st.style.setProperty("--px", cx.toFixed(3));
      st.style.setProperty("--py", cy.toFixed(3));
      st.style.setProperty("--sy", `${scroll.toFixed(1)}px`);
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--gx", `${e.clientX - r.left}px`);
      el.style.setProperty("--gy", `${e.clientY - r.top}px`);
      kick();
    };
    const onScroll = () => {
      scroll = Math.min(window.scrollY, 900) * 0.12;
      st.style.setProperty("--sy", `${scroll.toFixed(1)}px`);
    };

    if (fine) el.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={root} className={`dark ${s.hero}`} aria-labelledby="hero-title">
      <div className="grid-bg" />
      <div className={s.aurora} aria-hidden="true" />
      <div className={s.cursorGlow} aria-hidden="true" />

      <div className={`container ${s.inner}`}>
        <div className={s.copy}>
          <p className={`${s.badge} ${s.seq}`} style={{ ["--s" as string]: 0 }}>
            <span className="pulse-dot" />
            Granollers · Vallès · Barcelona
          </p>

          <h1 id="hero-title" className={s.title}>
            <span className={s.line}><span style={{ ["--s" as string]: 1 }}>El futuro de las</span></span>
            <span className={s.line}><span style={{ ["--s" as string]: 2 }}>instalaciones.</span></span>
            <span className={s.line}><span style={{ ["--s" as string]: 3 }} className="gradient-text">Hoy.</span></span>
          </h1>

          <p className={`${s.sub} ${s.seq}`} style={{ ["--s" as string]: 4 }}>
            Fontanería, climatización y electricidad. Soluciones profesionales para hogares y empresas en Barcelona y el Vallès.
          </p>

          <div className={`${s.ctas} ${s.seq}`} style={{ ["--s" as string]: 5 }}>
            <Link href="/presupuesto" className="btn btn--primary btn--lg" data-magnetic>
              Solicitar presupuesto <Icon name="arrow" className="arrow" />
            </Link>
            <Link href="/urgencias" className="btn btn--urgent btn--lg" data-magnetic>
              <span className="pulse-dot" /> Servicio de urgencia
            </Link>
          </div>
        </div>

        <div ref={stage} className={s.stage}>
          <div className={s.stageHalo} />
          <div className={s.stageInner}>
            <BlueprintBuilding className={s.building} />
          </div>
        </div>
      </div>

      <div className={`container ${s.rail}`}>
        <ul role="list" className={s.railList}>
          {services.slice(0, 4).map((x, i) => (
            <li key={x.slug} className={s.seq} style={{ ["--s" as string]: 6 + i * 0.5 }}>
              <Link href={`/${x.slug}`} className={s.railItem}>
                <span className="mono">{x.index}</span>
                <span className={s.railName}>{x.name}</span>
                <Icon name="arrowUpRight" size={16} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
