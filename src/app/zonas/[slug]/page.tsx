import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { areas, getArea, townsByArea } from "@/lib/zones";
import { services } from "@/lib/services";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import s from "./zona.module.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) return {};
  return pageMetadata({ title: a.seoTitle, description: a.seoDescription, path: `/zonas/${a.slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) notFound();
  const list = townsByArea(a.slug);
  const crumbs = [{ name: "Zona de cobertura", path: "/zona-de-cobertura" }, { name: a.name, path: `/zonas/${a.slug}` }];

  return (
    <>
      <PageHero eyebrow={`Zona · ${a.name}`} title={a.headline} lead={a.intro} crumbs={crumbs}>
        <Link href={`/presupuesto?localidad=${encodeURIComponent(list[0]?.name ?? a.name)}`} className="btn btn--primary btn--lg" data-magnetic>
          Pedir presupuesto <Icon name="arrow" className="arrow" />
        </Link>
        <Link href="/urgencias" className="btn btn--urgent btn--lg"><span className="pulse-dot" /> Urgencias</Link>
      </PageHero>

      <section className="section">
        <div className={`container ${s.split}`}>
          <div className={s.body} data-reveal>
            {a.body.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className={s.focus}>
            {a.focus.map((f, i) => (
              <div key={f.title} className="card" data-reveal style={{ padding: 24, ["--d" as string]: i * 80 }}>
                <h2 style={{ fontSize: "1.1rem" }}>{f.title}</h2>
                <p className="muted" style={{ marginTop: 6 }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft" aria-labelledby="zona-servicios">
        <div className="container">
          <header className="section-head" data-reveal>
            <span className="eyebrow">Servicios en {a.name}</span>
            <h2 id="zona-servicios" className="h2">Qué podemos hacer por ti</h2>
          </header>
          <div className={s.services}>
            {services.map((sv, i) => (
              <Link key={sv.slug} href={`/${sv.slug}`} className={`card card--lift ${s.service}`} data-spotlight data-reveal style={{ ["--d" as string]: i * 60 }}>
                <div className={s.serviceVisual}><ServiceVisual slug={sv.slug} accent={sv.accent} /></div>
                <div className={s.serviceCopy}>
                  <h3>{sv.name} en {a.name}</h3>
                  <p className="muted">{sv.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <h2 className="h3">Localidades de {a.name}</h2>
          <ul role="list" className={s.towns}>
            {list.map((t) => (
              <li key={t.name}>
                <Link href={`/presupuesto?localidad=${encodeURIComponent(t.name)}`} className="chip">{t.name}</Link>
              </li>
            ))}
          </ul>
          <p className="muted" style={{ marginTop: 16 }}>¿Tu municipio no aparece? <Link href="/contacto" className="link-arrow">Consúltanos</Link></p>
        </div>
      </section>

      <FinalCta title={`¿Necesitas un instalador en ${a.name}?`} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
