"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { services } from "@/lib/services";
import { callHref } from "@/lib/contact";
import { site } from "@/lib/site";
import s from "./Header.module.css";

const serviceIcons: Record<string, IconName> = {
  fontaneria: "drop",
  climatizacion: "snow",
  electricidad: "bolt",
  calefaccion: "flame",
  "reformas-integrales": "hammer",
};

const nav = [
  { href: "/zona-de-cobertura", label: "Cobertura" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/preguntas-frecuentes", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMega(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const servicesActive = services.some((x) => isActive(`/${x.slug}`));

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ""} ${open ? s.open : ""}`}>
      <div className={`container ${s.bar}`}>
        <Link href="/" className={s.brand} aria-label="NEXBCN, ir al inicio">
          <Logo tone="light" />
        </Link>

        <nav className={s.nav} aria-label="Principal">
          <div className={s.megaWrap} onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button
              className={`${s.link} ${servicesActive ? s.active : ""}`}
              aria-expanded={mega}
              aria-controls="mega-menu"
              onClick={() => setMega((v) => !v)}
            >
              Servicios <Icon name="chevron" size={14} className={`${s.chev} ${mega ? s.chevOpen : ""}`} />
            </button>
            <div id="mega-menu" className={`${s.mega} ${mega ? s.megaOpen : ""}`}>
              <div className={s.megaInner}>
                <div className={s.megaGrid}>
                  {services.map((x) => (
                    <Link key={x.slug} href={`/${x.slug}`} className={s.megaItem} style={{ ["--a" as string]: x.accent }}>
                      <span className={s.megaIcon}><Icon name={serviceIcons[x.slug]} size={20} /></span>
                      <span>
                        <span className={s.megaTitle}>{x.name}</span>
                        <span className={s.megaText}>{x.short}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link href="/urgencias" className={s.megaUrgent}>
                  <span className="pulse-dot" />
                  <span>
                    <span className={s.megaTitle}>Urgencias</span>
                    <span className={s.megaText}>Fugas, averías eléctricas y calderas sin funcionar.</span>
                  </span>
                  <Icon name="arrow" size={18} />
                </Link>
              </div>
            </div>
          </div>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={`${s.link} ${isActive(n.href) ? s.active : ""}`}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className={s.actions}>
          <Link href="/urgencias" className={s.urgent}>
            <span className="pulse-dot" /> Urgencias
          </Link>
          <Link href="/presupuesto" className="btn btn--primary btn--sm" data-magnetic>
            Presupuesto
          </Link>
          <button
            className={s.burger}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${s.burgerLines} ${open ? s.burgerOpen : ""}`} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`${s.mobile} ${open ? s.mobileOpen : ""}`} inert={!open}>
        <div className="container">
          <p className={s.mobileLabel}>Servicios</p>
          <ul role="list" className={s.mobileList}>
            {services.map((x, i) => (
              <li key={x.slug} style={{ ["--i" as string]: i }}>
                <Link href={`/${x.slug}`} className={s.mobileLink}>
                  <span className="mono">{x.index}</span> {x.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className={s.mobileLabel}>NEXBCN</p>
          <ul role="list" className={s.mobileList}>
            {[{ href: "/urgencias", label: "Urgencias" }, ...nav].map((n, i) => (
              <li key={n.href} style={{ ["--i" as string]: i + services.length }}>
                <Link href={n.href} className={s.mobileLinkSm}>{n.label}</Link>
              </li>
            ))}
          </ul>
          <div className={s.mobileCtas}>
            <Link href="/presupuesto" className="btn btn--primary btn--lg btn--block">Solicitar presupuesto</Link>
            <a href={callHref} className="btn btn--urgent btn--lg btn--block">
              <Icon name="phone" /> {site.phone ? `Llamar · ${site.phoneDisplay}` : "Contactar"}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
