import { Icon } from "@/components/ui/Icon";
import { callHref, whatsappHref } from "@/lib/contact";
import { site } from "@/lib/site";
import s from "./ContactAside.module.css";

export function ContactAside() {
  return (
    <aside className={s.aside} aria-label="Otras formas de contacto">
      <div className={s.card}>
        <p className="eyebrow">¿Prefieres hablar?</p>
        <a href={callHref} className={s.row}>
          <span className={s.icon}><Icon name="phone" /></span>
          <span><span className={s.k}>Teléfono</span><span className={s.v}>{site.phoneDisplay}</span></span>
        </a>
        <a href={whatsappHref()} target={site.whatsapp ? "_blank" : undefined} rel="noopener" className={s.row}>
          <span className={`${s.icon} ${s.wa}`}><Icon name="whatsapp" /></span>
          <span><span className={s.k}>WhatsApp</span><span className={s.v}>Escríbenos y envía fotos</span></span>
        </a>
        <a href={site.email ? `mailto:${site.email}` : "#"} className={s.row} aria-disabled={!site.email || undefined}>
          <span className={s.icon}><Icon name="mail" /></span>
          <span><span className={s.k}>Email</span><span className={s.v}>{site.emailDisplay}</span></span>
        </a>
        <div className={s.row}>
          <span className={s.icon}><Icon name="pin" /></span>
          <span><span className={s.k}>Base</span><span className={s.v}>{site.address.street ? `${site.address.street}, ` : ""}{site.address.city}</span></span>
        </div>
      </div>
      <div className={s.tips}>
        <p className={s.tipsTitle}>Para un presupuesto más preciso</p>
        <ul role="list">
          <li><Icon name="camera" size={16} /> Adjunta fotos del problema o del equipo</li>
          <li><Icon name="doc" size={16} /> Indica marca y modelo si lo sabes</li>
          <li><Icon name="building" size={16} /> Cuéntanos planta y acceso</li>
        </ul>
      </div>
    </aside>
  );
}
