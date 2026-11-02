import type { Faq as FaqItem } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";
import s from "./Faq.module.css";

/** Acordeón accesible con <details> nativo: funciona sin JavaScript. */
export function Faq({ items, title = "Preguntas frecuentes", eyebrow = "FAQ", id = "faq" }: { items: FaqItem[]; title?: string; eyebrow?: string; id?: string }) {
  return (
    <section className="section" aria-labelledby={`${id}-title`}>
      <div className={`container ${s.grid}`}>
        <header className={s.head} data-reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 id={`${id}-title`} className="h2">{title}</h2>
        </header>
        <div className={s.list}>
          {items.map((f, i) => (
            <details key={f.q} className={s.item} data-reveal style={{ ["--d" as string]: i * 60 }}>
              <summary className={s.q}>
                <span>{f.q}</span>
                <span className={s.toggle} aria-hidden="true"><Icon name="plus" size={18} /></span>
              </summary>
              <div className={s.a}><p>{f.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
