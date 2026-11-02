import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/services";

export const metadata = { title: "Página no encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="dark" style={{ minHeight: "100svh", display: "grid", placeItems: "center", position: "relative", overflow: "hidden", padding: "120px 0 80px" }}>
      <div className="grid-bg" />
      <div className="container" style={{ position: "relative", textAlign: "center", display: "grid", justifyItems: "center", gap: 20 }}>
        <span className="eyebrow">Error 404</span>
        <h1 className="display gradient-text">Fuera de plano.</h1>
        <p className="lead" style={{ marginInline: "auto" }}>Esta página no existe o se ha movido. Vuelve al inicio o elige un servicio.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 8 }}>
          <Link href="/" className="btn btn--primary">Ir al inicio <Icon name="arrow" className="arrow" /></Link>
          {services.map((s) => <Link key={s.slug} href={`/${s.slug}`} className="chip">{s.name}</Link>)}
        </div>
      </div>
    </section>
  );
}
