import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Process } from "@/components/sections/Process";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { getService, type ServiceSlug } from "@/lib/services";
import { areas } from "@/lib/zones";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { whatsappHref } from "@/lib/contact";
import { site } from "@/lib/site";
import s from "./ServicePage.module.css";

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const sv = getService(slug);
  const related = sv.related.map(getService);
  const crumbs = [{ name: sv.name, path: `/${sv.slug}` }];

  return (
    <div style={{ ["--a" as string]: sv.accent, ["--as" as string]: sv.accentSoft }}>
      <PageHero
        eyebrow={`${sv.index} — ${sv.eyebrow}`}
        title={sv.headline}
        lead={sv.lead}
        crumbs={crumbs}
        accent={sv.accent}
        visual={
          sv.image ? (
            <Image src={sv.image} alt={`${sv.name} — NEXBCN`} fill priority sizes="(min-width: 1024px) 45vw, 100vw" style={{ objectFit: "cover" }} />
          ) : (
            <ServiceVisual slug={sv.slug} accent={sv.accent} />
          )
        }
      >
        <Link href={`/presupuesto?servicio=${sv.slug}`} className="btn btn--primary btn--lg" data-magnetic>
          Presupuesto de {sv.name.toLowerCase()} <Icon name="arrow" className="arrow" />
        </Link>
        <a href={whatsappHref(`Hola NEXBCN, necesito información sobre ${sv.name.toLowerCase()}.`)} target={site.whatsapp ? "_blank" : undefined} rel="noopener" className="btn btn--urgent btn--lg">
          <Icon name="whatsapp" /> WhatsApp
        </a>
      </PageHero>

      {/* Qué hacemos */}
      <section className="section" aria-labelledby="scope-title">
        <div className="container">
          <header className="section-head" data-reveal>
            <span className="eyebrow">Qué hacemos</span>
            <h2 id="scope-title" className="h2">Servicios de {sv.name.toLowerCase()}</h2>
          </header>
          <ul role="list" className={s.scope}>
            {sv.scope.map((it, i) => (
              <li key={it.title} className={`card card--lift ${s.scopeItem}`} data-spotlight data-reveal style={{ ["--d" as string]: (i % 3) * 80 }}>
                <span className={s.scopeN}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={s.scopeTitle}>{it.title}</h3>
                <p className={s.scopeText}>{it.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Problemas + beneficios */}
      <section className="section dark" aria-labelledby="problems-title">
        <div className="grid-bg" />
        <div className={`container ${s.split}`}>
          <div data-reveal>
            <span className="eyebrow">Problemas que solucionamos</span>
            <h2 id="problems-title" className="h2" style={{ marginTop: 20 }}>¿Te suena alguno?</h2>
            <ul role="list" className={s.problems}>
              {sv.problems.map((p) => (
                <li key={p}><span className={s.tick}><Icon name="check" size={14} strokeWidth={2.2} /></span>{p}</li>
              ))}
            </ul>
            <Link href={`/presupuesto?servicio=${sv.slug}`} className="btn btn--primary" style={{ marginTop: 36 }} data-magnetic>
              Solucionarlo ahora <Icon name="arrow" className="arrow" />
            </Link>
          </div>
          <div className={s.benefits}>
            {sv.benefits.map((b, i) => (
              <div key={b.title} className={`card ${s.benefit}`} data-spotlight data-reveal style={{ ["--d" as string]: i * 100 }}>
                <span className={s.benefitN}>0{i + 1}</span>
                <div>
                  <h3 className={s.benefitTitle}>{b.title}</h3>
                  <p className="muted">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />

      {/* Zonas (enlazado interno local) */}
      <section className="section section--tight" aria-labelledby="areas-title">
        <div className="container">
          <div className={s.areas} data-reveal>
            <div>
              <span className="eyebrow">Zona de servicio</span>
              <h2 id="areas-title" className="h3" style={{ marginTop: 14 }}>{sv.name} en Granollers, el Vallès y Barcelona</h2>
            </div>
            <ul role="list" className={s.areaLinks}>
              {areas.map((a) => (
                <li key={a.slug}><Link href={`/zonas/${a.slug}`} className="chip">{sv.name} · {a.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Faq items={sv.faqs} title={`Preguntas sobre ${sv.name.toLowerCase()}`} id={`faq-${sv.slug}`} />

      {/* Servicios relacionados */}
      <section className="section section--tight soft" aria-labelledby="related-title">
        <div className="container">
          <h2 id="related-title" className="h3" style={{ marginBottom: 28 }}>También te puede interesar</h2>
          <div className={s.related}>
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}`} className={`card card--lift ${s.relatedItem}`} data-spotlight style={{ ["--a" as string]: r.accent }}>
                <span className="mono" style={{ color: "var(--electric)", fontSize: 12 }}>{r.index}</span>
                <span className={s.relatedName}>{r.name}</span>
                <span className="muted">{r.short}</span>
                <Icon name="arrowUpRight" className={s.relatedIcon} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title={`¿Necesitas un servicio de ${sv.name.toLowerCase()}?`} service={sv.slug} />

      <JsonLd data={[serviceSchema(sv), faqSchema(sv.faqs), breadcrumbSchema(crumbs)]} />
    </div>
  );
}
