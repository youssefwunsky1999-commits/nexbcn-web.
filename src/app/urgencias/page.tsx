import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon, type IconName } from "@/components/ui/Icon";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { callHref, whatsappHref } from "@/lib/contact";
import { site } from "@/lib/site";
import s from "./urgencias.module.css";

export const metadata = pageMetadata({
  title: "Fontanero y electricista urgente en Granollers · Urgencias",
  description: "Urgencias de fontanería, electricidad y calefacción en Granollers, el Vallès y Barcelona. Fugas de agua, averías eléctricas y calderas sin funcionar. Llama o escribe por WhatsApp.",
  path: "/urgencias",
  keywords: ["fontanero urgente Granollers", "electricista urgente Granollers", "urgencias fontanería Vallès"],
});

const cases: { icon: IconName; title: string; steps: string[] }[] = [
  { icon: "drop", title: "Fuga de agua", steps: ["Cierra la llave de paso general.", "Si el agua llega a enchufes o aparatos, corta la luz desde el cuadro.", "Retira objetos y haz fotos de la zona."] },
  { icon: "bolt", title: "Avería eléctrica", steps: ["No toques cables ni mecanismos dañados.", "Baja el interruptor general si hay olor a quemado o chispas.", "No puentees ni fuerces protecciones."] },
  { icon: "flame", title: "Caldera o gas", steps: ["Si huele a gas: no enciendas luces ni aparatos, ventila y sal de la vivienda.", "Cierra la llave del gas y llama al teléfono de urgencias de tu distribuidora o al 112.", "Para una caldera que no arranca, anota el código de error."] },
  { icon: "drain", title: "Atasco grave", steps: ["Deja de usar grifos y desagües conectados.", "No mezcles productos químicos.", "Si el agua retorna por varios puntos, avisa a la comunidad."] },
];

const faqs = [
  { q: "¿Cómo pido un servicio urgente?", a: "Lo más rápido es llamar o escribir por WhatsApp indicando: qué ocurre, dirección o localidad y, si puedes, una foto. Te confirmamos disponibilidad real en ese momento." },
  { q: "¿Cuánto cuesta una urgencia?", a: "Las condiciones de la salida de urgencia te las indicamos antes de desplazarnos, para que decidas con información." },
  { q: "¿Qué hago si huele a gas?", a: "No manipules interruptores ni aparatos, ventila, sal de la vivienda y llama al servicio de urgencias de tu distribuidora de gas o al 112. Es una emergencia que debe atender la distribuidora." },
];

export default function Page() {
  const crumbs = [{ name: "Urgencias", path: "/urgencias" }];
  return (
    <>
      <PageHero
        eyebrow="Servicio de urgencia"
        title={<>¿Una urgencia? <span className="gradient-text">Actúa ahora.</span></>}
        lead="Fugas de agua, averías eléctricas, calderas que no funcionan o atascos graves. Llámanos o escríbenos por WhatsApp con tu localidad y una foto: te decimos al momento cuándo podemos estar ahí."
        crumbs={crumbs}
        accent="#2dd4bf"
      >
        <a href={callHref} className="btn btn--primary btn--lg" data-magnetic><Icon name="phone" /> {site.phone ? `Llamar · ${site.phoneDisplay}` : "Llamar ahora"}</a>
        <a href={whatsappHref("URGENTE — Hola NEXBCN, tengo una urgencia en: ")} target={site.whatsapp ? "_blank" : undefined} rel="noopener" className="btn btn--urgent btn--lg"><Icon name="whatsapp" /> WhatsApp urgente</a>
      </PageHero>

      <section className="section" aria-labelledby="mientras-title">
        <div className="container">
          <header className="section-head" data-reveal>
            <span className="eyebrow">Mientras llegamos</span>
            <h2 id="mientras-title" className="h2">Qué hacer en los primeros minutos</h2>
            <p className="lead">Estos pasos ayudan a limitar daños y a que el diagnóstico sea más rápido.</p>
          </header>
          <div className={s.grid}>
            {cases.map((c, i) => (
              <article key={c.title} className={`card ${s.case}`} data-spotlight data-reveal style={{ ["--d" as string]: i * 80 }}>
                <span className={s.icon}><Icon name={c.icon} size={24} /></span>
                <h3 className={s.title}>{c.title}</h3>
                <ol className={s.steps}>
                  {c.steps.map((st) => <li key={st}>{st}</li>)}
                </ol>
              </article>
            ))}
          </div>
          <p className={s.gas} data-reveal>
            <Icon name="alert" size={20} /> <span><strong>Olor a gas:</strong> es una emergencia. Sal de la vivienda y llama al <a href="tel:112">112</a> o al servicio de urgencias de tu distribuidora.</span>
          </p>
        </div>
      </section>

      <section className="section section--tight soft">
        <div className={`container ${s.info}`}>
          <div data-reveal>
            <span className="eyebrow">Información útil</span>
            <h2 className="h3" style={{ marginTop: 14 }}>Al contactar, indícanos:</h2>
          </div>
          <ul role="list" className={s.checklist} data-reveal>
            {["Qué ocurre y desde cuándo", "Localidad y dirección", "Foto o vídeo del problema", "Si hay riesgo eléctrico o de inundación"].map((t) => (
              <li key={t}><Icon name="check" size={18} /> {t}</li>
            ))}
          </ul>
          <Link href="/presupuesto?servicio=urgencia" className="btn btn--primary" data-magnetic>Formulario de urgencia <Icon name="arrow" className="arrow" /></Link>
        </div>
      </section>

      <Faq items={faqs} title="Urgencias: dudas habituales" id="faq-urgencias" />
      <FinalCta title="Te ayudamos ahora." text="Llámanos o escríbenos por WhatsApp. Te diremos al momento la disponibilidad real." />
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
    </>
  );
}
