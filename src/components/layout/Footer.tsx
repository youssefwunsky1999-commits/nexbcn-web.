import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/services";
import { areas } from "@/lib/zones";
import { site } from "@/lib/site";
import { callHref, whatsappHref } from "@/lib/contact";
import s from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={`dark ${s.footer}`}>
      <div className="grid-bg" />
      <div className={`container ${s.inner}`}>
        <div className={s.top}>
          <div className={s.brandCol}>
            <Logo tone="light" />
            <p className={s.claim}>
              Fontanería, climatización, calefacción y electricidad para hogares y empresas en Granollers, el Vallès y Barcelona.
            </p>
            <div className={s.contact}>
              <a href={callHref} className={s.contactItem}>
                <Icon name="phone" size={18} /> {site.phoneDisplay}
              </a>
              <a href={whatsappHref()} className={s.contactItem} target={site.whatsapp ? "_blank" : undefined} rel="noopener">
                <Icon name="whatsapp" size={18} /> WhatsApp
              </a>
              <a href={site.email ? `mailto:${site.email}` : "/contacto"} className={s.contactItem}>
                <Icon name="mail" size={18} /> {site.emailDisplay}
              </a>
              <span className={s.contactItem}>
                <Icon name="pin" size={18} />
                {site.address.street ? `${site.address.street}, ${site.address.postalCode} ` : ""}
                {site.address.city}
              </span>
            </div>
          </div>

          <nav className={s.cols} aria-label="Pie de página">
            <div>
              <p className={s.colTitle}>Servicios</p>
              <ul role="list">
                {services.map((x) => (
                  <li key={x.slug}><Link href={`/${x.slug}`}>{x.name}</Link></li>
                ))}
                <li><Link href="/urgencias">Urgencias</Link></li>
              </ul>
            </div>
            <div>
              <p className={s.colTitle}>Zonas</p>
              <ul role="list">
                {areas.map((a) => (
                  <li key={a.slug}><Link href={`/zonas/${a.slug}`}>{a.name}</Link></li>
                ))}
                <li><Link href="/zona-de-cobertura">Mapa de cobertura</Link></li>
              </ul>
            </div>
            <div>
              <p className={s.colTitle}>Empresa</p>
              <ul role="list">
                <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>
                <li><Link href="/presupuesto">Pedir presupuesto</Link></li>
                <li><Link href="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
                <li><Link href="/contacto">Contacto</Link></li>
              </ul>
            </div>
          </nav>
        </div>

        <p className={s.wordmark} aria-hidden="true">NEXBCN</p>

        <div className={s.bottom}>
          <p>© {year} {site.legalName}. Todos los derechos reservados.</p>
          <ul role="list" className={s.legal}>
            <li><Link href="/aviso-legal">Aviso legal</Link></li>
            <li><Link href="/politica-de-privacidad">Privacidad</Link></li>
            <li><Link href="/politica-de-cookies">Cookies</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
