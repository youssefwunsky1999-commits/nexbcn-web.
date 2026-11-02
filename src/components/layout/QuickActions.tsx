import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { callHref, whatsappHref } from "@/lib/contact";
import { site } from "@/lib/site";
import s from "./QuickActions.module.css";

/**
 * - Escritorio: botón flotante de WhatsApp.
 * - Móvil: barra inferior fija (Llamar · WhatsApp · Presupuesto), siempre a mano del pulgar.
 */
export function QuickActions() {
  const wa = whatsappHref();
  const waExt = Boolean(site.whatsapp);
  return (
    <>
      <a
        href={wa}
        className={s.fab}
        target={waExt ? "_blank" : undefined}
        rel="noopener"
        aria-label="Escríbenos por WhatsApp"
      >
        <Icon name="whatsapp" size={26} strokeWidth={1.7} />
        <span className={s.fabLabel}>¿Hablamos?</span>
      </a>

      <nav className={s.bar} aria-label="Acciones rápidas">
        <a href={callHref} className={s.item}>
          <Icon name="phone" size={20} />
          <span>Llamar</span>
        </a>
        <a href={wa} className={`${s.item} ${s.wa}`} target={waExt ? "_blank" : undefined} rel="noopener">
          <Icon name="whatsapp" size={20} />
          <span>WhatsApp</span>
        </a>
        <Link href="/presupuesto" className={`${s.item} ${s.primary}`}>
          <Icon name="doc" size={20} />
          <span>Presupuesto</span>
        </Link>
      </nav>
    </>
  );
}
