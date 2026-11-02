import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ContactAside } from "@/components/sections/ContactAside";
import { CoverageMap } from "@/components/home/CoverageMap";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { callHref, whatsappHref } from "@/lib/contact";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contacto · Fontaneros y electricistas en Granollers",
  description: "Contacta con NEXBCN por teléfono, WhatsApp o formulario. Fontanería, climatización, calefacción y electricidad en Granollers, el Vallès y Barcelona.",
  path: "/contacto",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos."
        lead="Llámanos, escríbenos por WhatsApp o déjanos tu consulta. Te respondemos con un diagnóstico claro y los siguientes pasos."
        crumbs={[{ name: "Contacto", path: "/contacto" }]}
      >
        <a href={callHref} className="btn btn--primary btn--lg" data-magnetic><Icon name="phone" /> {site.phone ? site.phoneDisplay : "Llamar"}</a>
        <a href={whatsappHref()} target={site.whatsapp ? "_blank" : undefined} rel="noopener" className="btn btn--urgent btn--lg"><Icon name="whatsapp" /> WhatsApp</a>
      </PageHero>
      <section className="section soft" style={{ paddingTop: 48 }}>
        <div className="container quote-layout">
          <div>
            <h2 className="h3" style={{ marginBottom: 20 }}>Escríbenos</h2>
            <Suspense fallback={<div style={{ minHeight: 600 }} />}>
              <QuoteForm />
            </Suspense>
          </div>
          <ContactAside />
        </div>
      </section>
      <section className="section dark">
        <div className="grid-bg" />
        <div className="container">
          <header className="section-head" data-reveal>
            <span className="eyebrow">Dónde trabajamos</span>
            <h2 className="h2">Granollers, el Vallès y Barcelona.</h2>
            <Link href="/zona-de-cobertura" className="link-arrow">Ver zona de cobertura <Icon name="arrow" /></Link>
          </header>
          <CoverageMap compact />
        </div>
      </section>
      <JsonLd data={breadcrumbSchema([{ name: "Contacto", path: "/contacto" }])} />
    </>
  );
}
