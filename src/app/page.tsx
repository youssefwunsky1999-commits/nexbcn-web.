import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { SolutionFinder } from "@/components/home/SolutionFinder";
import { CoverageMap } from "@/components/home/CoverageMap";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Testimonials } from "@/components/sections/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { generalFaqs } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NEXBCN | Fontanería, Climatización & Electricidad en Granollers y Barcelona",
  description:
    "Fontaneros, electricistas y técnicos de climatización en Granollers, el Vallès y Barcelona. Reparaciones, instalaciones, calderas, aire acondicionado, reformas y urgencias.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesShowcase />
      <SolutionFinder />
      <WhyUs />
      <Process />
      <section className="section dark" aria-labelledby="zona-title">
        <div className="grid-bg" />
        <div className="container">
          <header className="section-head" data-reveal>
            <span className="eyebrow">Zona de cobertura</span>
            <h2 id="zona-title" className="h2">Desde Granollers, a todo el Vallès y Barcelona.</h2>
            <p className="lead">Organizamos las rutas por zonas para llegar antes y ofrecer plazos realistas en cada municipio.</p>
            <Link href="/zona-de-cobertura" className="link-arrow">Ver todas las localidades <Icon name="arrow" /></Link>
          </header>
          <CoverageMap />
        </div>
      </section>
      <Testimonials />
      <Faq items={generalFaqs} />
      <FinalCta />
      <JsonLd data={faqSchema(generalFaqs)} />
    </>
  );
}
