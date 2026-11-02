import { PageHero } from "@/components/sections/PageHero";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlueprintBuilding } from "@/components/visuals/BlueprintBuilding";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import s from "./nosotros.module.css";

export const metadata = pageMetadata({
  title: "Sobre nosotros · Instaladores en Granollers",
  description: "NEXBCN es un equipo de instaladores de fontanería, climatización, calefacción y electricidad con base en Granollers. Conoce cómo trabajamos.",
  path: "/sobre-nosotros",
});

const principles = [
  { t: "Las instalaciones son un sistema", d: "Agua, energía, aire y calor están conectados. Pensarlos juntos evita problemas y obras repetidas." },
  { t: "Claridad antes que tecnicismos", d: "Explicamos qué pasa, qué opciones hay y qué implica cada una. Tú decides con información." },
  { t: "Hacerlo bien a la primera", d: "Diagnóstico riguroso, materiales adecuados y revisión final de cada trabajo." },
  { t: "Respeto por tu espacio", d: "Protegemos, ordenamos y limpiamos. Trabajamos en tu casa o tu negocio como si fuera el nuestro." },
];

export default function Page() {
  const crumbs = [{ name: "Sobre nosotros", path: "/sobre-nosotros" }];
  return (
    <>
      <PageHero
        eyebrow="Sobre NEXBCN"
        title={<>Instalaciones con <span className="gradient-text">criterio de ingeniería.</span></>}
        lead="Somos un equipo de instaladores con base en Granollers. Unimos fontanería, climatización, calefacción y electricidad bajo una misma forma de trabajar: precisa, transparente y pensada para durar."
        crumbs={crumbs}
        visual={<BlueprintBuilding />}
      />
      <section className="section" aria-labelledby="principios-title">
        <div className="container">
          <header className="section-head" data-reveal>
            <span className="eyebrow">Principios</span>
            <h2 id="principios-title" className="h2">Lo que nos define</h2>
          </header>
          <ol role="list" className={s.list}>
            {principles.map((p, i) => (
              <li key={p.t} className={s.item} data-reveal style={{ ["--d" as string]: i * 80 }}>
                <span className={s.n}>0{i + 1}</span>
                <h3 className={s.t}>{p.t}</h3>
                <p className={s.d}>{p.d}</p>
              </li>
            ))}
          </ol>
          {/* TODO: añadir equipo real (fotos, nombres, trayectoria, certificaciones) cuando se disponga de esa información. */}
        </div>
      </section>
      <WhyUs />
      <Process dark />
      <FinalCta />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
