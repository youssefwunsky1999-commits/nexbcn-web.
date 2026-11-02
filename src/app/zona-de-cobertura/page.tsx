import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CoverageMap } from "@/components/home/CoverageMap";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { areas } from "@/lib/zones";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Zona de cobertura · Granollers, Vallès Oriental, Vallès Occidental y Barcelona",
  description: "Localidades donde NEXBCN ofrece fontanería, climatización, calefacción y electricidad: Granollers, Vallès Oriental, Vallès Occidental, Barcelona y alrededores.",
  path: "/zona-de-cobertura",
});

export default function Page() {
  const crumbs = [{ name: "Zona de cobertura", path: "/zona-de-cobertura" }];
  return (
    <>
      <PageHero
        eyebrow="Cobertura"
        title="Dónde trabajamos."
        lead="Nuestra base está en Granollers. Desde aquí cubrimos el Vallès Oriental, el Vallès Occidental y Barcelona y su área metropolitana. ¿No ves tu municipio? Pregúntanos."
        crumbs={crumbs}
      />
      <section className="section dark" style={{ paddingTop: 0 }}>
        <div className="container"><CoverageMap /></div>
      </section>
      <section className="section">
        <div className="container">
          <header className="section-head" data-reveal>
            <span className="eyebrow">Áreas</span>
            <h2 className="h2">Información por zona</h2>
          </header>
          <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {areas.map((a, i) => (
              <Link key={a.slug} href={`/zonas/${a.slug}`} className="card card--lift" data-spotlight data-reveal style={{ padding: 28, display: "grid", gap: 10, ["--d" as string]: i * 80 }}>
                <span className="mono" style={{ fontSize: 12, color: "var(--electric)" }}>0{i + 1}</span>
                <span className="h3">{a.name}</span>
                <span className="muted">{a.intro}</span>
                <span className="link-arrow" style={{ marginTop: 8 }}>Ver zona <Icon name="arrow" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
