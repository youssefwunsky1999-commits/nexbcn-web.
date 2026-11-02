import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { callHref, whatsappHref } from "@/lib/contact";
import { site } from "@/lib/site";
import s from "./FinalCta.module.css";

export function FinalCta({
  title = "¿Hablamos de tu instalación?",
  text = "Cuéntanos qué necesitas. Te respondemos con un diagnóstico claro y los siguientes pasos.",
  service,
}: { title?: string; text?: string; service?: string }) {
  return (
    <section className={`dark ${s.cta}`} aria-labelledby="cta-title">
      <div className="grid-bg" />
      <div className={s.orb} aria-hidden="true" />
      <div className={`container ${s.inner}`} data-reveal>
        <span className="eyebrow">Presupuesto sin compromiso</span>
        <h2 id="cta-title" className={s.title}>{title}</h2>
        <p className="lead" style={{ marginInline: "auto" }}>{text}</p>
        <div className={s.actions}>
          <Link href={service ? `/presupuesto?servicio=${service}` : "/presupuesto"} className="btn btn--primary btn--lg" data-magnetic>
            Solicitar presupuesto <Icon name="arrow" className="arrow" />
          </Link>
          <a href={whatsappHref()} target={site.whatsapp ? "_blank" : undefined} rel="noopener" className="btn btn--urgent btn--lg" data-magnetic>
            <Icon name="whatsapp" /> WhatsApp
          </a>
          <a href={callHref} className="btn btn--urgent btn--lg" data-magnetic>
            <Icon name="phone" /> {site.phone ? site.phoneDisplay : "Llamar"}
          </a>
        </div>
      </div>
    </section>
  );
}
