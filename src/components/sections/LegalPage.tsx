import { PageHero } from "@/components/sections/PageHero";

export function LegalPage({ title, updated, children, path }: { title: string; updated: string; children: React.ReactNode; path: string }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} crumbs={[{ name: title, path }]} />
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="prose">
            <p className="muted">Última actualización: {updated}</p>
            <p style={{ padding: "14px 18px", borderRadius: 14, background: "#fffbea", border: "1px solid #f3dd8a", color: "#5c4400", fontSize: 14.5 }}>
              <strong>Pendiente de revisión legal.</strong> Los campos <span className="placeholder">[ASÍ]</span> deben completarse con los datos reales del titular, y el texto final debe revisarlo un profesional antes de publicar.
            </p>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
