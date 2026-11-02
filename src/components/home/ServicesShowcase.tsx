import Link from "next/link";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { Icon } from "@/components/ui/Icon";
import { getService, homeServiceGroups } from "@/lib/services";
import s from "./ServicesShowcase.module.css";

export function ServicesShowcase() {
  return (
    <section className={`section soft ${s.section}`} aria-labelledby="servicios-title" id="servicios">
      <div className="container">
        <header className="section-head" data-reveal>
          <span className="eyebrow">Servicios</span>
          <h2 id="servicios-title" className="h2">
            Cuatro especialidades. <span className="gradient-text--light">Un solo equipo.</span>
          </h2>
          <p className="lead">
            Las instalaciones de un edificio funcionan como un sistema. Por eso las tratamos así: agua, aire, energía y calor, coordinados por las mismas personas.
          </p>
        </header>

        <ol role="list" className={s.stack}>
          {homeServiceGroups.map((group, i) => {
            const main = getService(group.slugs[0]);
            const extra = group.slugs.slice(1).map(getService);
            return (
              <li
                key={group.label}
                className={s.item}
                style={{ ["--i" as string]: i, ["--a" as string]: main.accent, ["--as" as string]: main.accentSoft }}
              >
                <article className={`card ${s.card}`} data-spotlight>
                  <div className={s.copy}>
                    <div className={s.meta}>
                      <span className="mono">{String(i + 1).padStart(2, "0")} / 04</span>
                      <span className={s.metaLine} />
                      <span className="mono">{main.eyebrow}</span>
                    </div>
                    <h3 className={s.title}>{group.label}</h3>
                    <p className={s.text}>{main.lead}</p>

                    <ul role="list" className={s.problems} aria-label="Problemas que solucionamos">
                      {[...main.problems.slice(0, 4), ...extra.flatMap((e) => e.problems.slice(0, 2))].map((p) => (
                        <li key={p}><Icon name="check" size={16} /> {p}</li>
                      ))}
                    </ul>

                    <div className={s.actions}>
                      {[main, ...extra].map((sv) => (
                        <Link key={sv.slug} href={`/${sv.slug}`} className="link-arrow">
                          {extra.length ? sv.name : `Ver ${sv.name.toLowerCase()}`} <Icon name="arrow" />
                        </Link>
                      ))}
                      <Link href={`/presupuesto?servicio=${main.slug}`} className="btn btn--ghost btn--sm">
                        Pedir presupuesto
                      </Link>
                    </div>
                  </div>

                  <div className={s.visual}>
                    {main.image ? null : <ServiceVisual slug={main.slug} accent={main.accent} className={s.svg} />}
                    <span className={s.badge}>{main.index}{extra.length ? ` + ${extra[0].index}` : ""}</span>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
