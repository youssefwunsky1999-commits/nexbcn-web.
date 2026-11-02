import { PageHero } from "@/components/sections/PageHero";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { generalFaqs } from "@/lib/faqs";
import { services } from "@/lib/services";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Preguntas frecuentes · Fontanería, climatización y electricidad",
  description: "Resolvemos las dudas más habituales sobre presupuestos, urgencias, fontanería, aire acondicionado, calderas, electricidad y reformas.",
  path: "/preguntas-frecuentes",
});

export default function Page() {
  const crumbs = [{ name: "Preguntas frecuentes", path: "/preguntas-frecuentes" }];
  return (
    <>
      <PageHero eyebrow="FAQ" title="Preguntas frecuentes." lead="Las dudas que más nos plantean, respondidas con claridad. Si la tuya no está, pregúntanos." crumbs={crumbs} />
      <Faq items={generalFaqs} title="General" id="faq-general" eyebrow="NEXBCN" />
      {services.map((s) => (
        <Faq key={s.slug} items={s.faqs} title={s.name} id={`faq-${s.slug}`} eyebrow={s.index} />
      ))}
      <FinalCta />
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(generalFaqs) /* las FAQ de cada servicio se marcan solo en su página */]} />
    </>
  );
}
