import { Counter } from "@/components/ui/Counter";
import { Icon, type IconName } from "@/components/ui/Icon";
import { services } from "@/lib/services";
import { areas, towns } from "@/lib/zones";
import s from "./WhyUs.module.css";

const values: { icon: IconName; title: string; text: string }[] = [
  { icon: "doc", title: "Transparencia", text: "Presupuesto detallado por escrito antes de empezar. Sin partidas ocultas." },
  { icon: "clock", title: "Rapidez", text: "Respuesta ágil y planificación realista. Te decimos cuándo, y lo cumplimos." },
  { icon: "sparkle", title: "Tecnología", text: "Equipos eficientes, diagnóstico preciso y soluciones preparadas para el futuro." },
  { icon: "shield", title: "Calidad", text: "Trabajo limpio, materiales adecuados y acabados cuidados." },
];

/** Cifras derivadas de datos reales del proyecto (no inventadas). */
const stats = [
  { value: services.length, label: "servicios técnicos integrados" },
  { value: towns.length, suffix: "+", label: "localidades en nuestra zona" },
  { value: areas.length, label: "áreas de cobertura" },
  { value: 1, label: "único interlocutor para todo" },
];

export function WhyUs() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <span className="eyebrow">Por qué NEXBCN</span>
          <h2 id="why-title" className="h2">
            La forma en que trabajamos <span className="gradient-text--light">es la diferencia.</span>
          </h2>
        </header>

        <div className={s.bento}>
          <div className={`card ${s.hero}`} data-spotlight data-reveal>
            <div className={s.heroGlow} aria-hidden="true" />
            <p className="eyebrow">Nuestro compromiso</p>
            <p className={s.heroText}>
              Sabes qué vamos a hacer, cuánto va a costar y cuándo estará terminado <em>antes</em> de que empecemos.
            </p>
          </div>

          {stats.map((st, i) => (
            <div key={st.label} className={`card ${s.stat}`} data-spotlight data-reveal style={{ ["--d" as string]: i * 80 }}>
              <span className={s.num}><Counter to={st.value} suffix={st.suffix} /></span>
              <span className={s.statLabel}>{st.label}</span>
            </div>
          ))}

          {values.map((v, i) => (
            <div key={v.title} className={`card card--lift ${s.value}`} data-spotlight data-reveal style={{ ["--d" as string]: i * 80 }}>
              <span className={s.icon}><Icon name={v.icon} size={22} /></span>
              <h3 className={s.valueTitle}>{v.title}</h3>
              <p className={s.valueText}>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
