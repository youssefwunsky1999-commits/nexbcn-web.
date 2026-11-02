import s from "./Marquee.module.css";

const words = [
  "Fontanería", "Climatización", "Electricidad", "Calefacción", "Reformas integrales",
  "Urgencias", "Granollers", "Vallès Oriental", "Vallès Occidental", "Barcelona",
];

/** Franja en movimiento continuo. Decorativa: el contenido real está en la navegación. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul role="list" className={s.row} aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <li key={w}>{w}<span className={s.sep} aria-hidden="true" /></li>
      ))}
    </ul>
  );
  return (
    <div className={`dark ${s.wrap}`}>
      <div className={s.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
