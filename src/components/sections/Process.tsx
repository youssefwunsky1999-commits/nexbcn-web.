import s from "./Process.module.css";

const steps = [
  { t: "Nos cuentas qué pasa", d: "Por teléfono, WhatsApp o formulario. Con fotos, mejor." },
  { t: "Diagnóstico", d: "Analizamos el problema y te explicamos las opciones con claridad." },
  { t: "Presupuesto cerrado", d: "Por escrito y detallado. Decides con toda la información." },
  { t: "Ejecución y cierre", d: "Trabajo limpio, revisión final y explicación de lo realizado." },
];

export function Process({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`section ${dark ? "dark" : "soft"}`} aria-labelledby="process-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <span className="eyebrow">Método</span>
          <h2 id="process-title" className="h2">Cuatro pasos. Cero sorpresas.</h2>
        </header>
        <ol role="list" className={s.steps}>
          {steps.map((st, i) => (
            <li key={st.t} className={s.step} data-reveal style={{ ["--d" as string]: i * 120 }}>
              <span className={s.n}>0{i + 1}</span>
              <span className={s.line} aria-hidden="true"><span /></span>
              <h3 className={s.t}>{st.t}</h3>
              <p className={s.d}>{st.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
