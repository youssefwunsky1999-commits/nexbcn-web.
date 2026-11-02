import { testimonials } from "@/lib/testimonials";
import s from "./Testimonials.module.css";

/** Solo se renderiza si hay testimonios reales en lib/testimonials.ts. */
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="section soft" aria-labelledby="testimonials-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <span className="eyebrow">Clientes</span>
          <h2 id="testimonials-title" className="h2">Lo que dicen de nosotros</h2>
        </header>
        <ul role="list" className={s.grid}>
          {testimonials.map((t, i) => (
            <li key={t.name + i} className={`card ${s.item}`} data-reveal style={{ ["--d" as string]: i * 80 }}>
              <blockquote className={s.text}>“{t.text}”</blockquote>
              <p className={s.who}><strong>{t.name}</strong> · {t.town} · {t.service}{t.source ? ` · ${t.source}` : ""}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
