import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ContactAside } from "@/components/sections/ContactAside";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solicitar presupuesto · Fontanería, climatización y electricidad",
  description: "Pide presupuesto a NEXBCN para fontanería, climatización, calefacción, electricidad o reformas en Granollers, el Vallès y Barcelona. Adjunta fotos y te respondemos.",
  path: "/presupuesto",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Presupuesto"
        title="Cuéntanos qué necesitas."
        lead="Cuanto más detalle, más preciso será el presupuesto. Puedes adjuntar fotos: nos ayudan a llegar con el material adecuado."
        crumbs={[{ name: "Presupuesto", path: "/presupuesto" }]}
      />
      <section className="section soft" style={{ paddingTop: 48 }}>
        <div className="container quote-layout">
          <Suspense fallback={<div style={{ minHeight: 600 }} />}>
            <QuoteForm />
          </Suspense>
          <ContactAside />
        </div>
      </section>
      <JsonLd data={breadcrumbSchema([{ name: "Presupuesto", path: "/presupuesto" }])} />
    </>
  );
}
