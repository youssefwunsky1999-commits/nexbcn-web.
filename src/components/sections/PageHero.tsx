import Link from "next/link";
import s from "./PageHero.module.css";

type Crumb = { name: string; path: string };

export function PageHero({
  eyebrow, title, lead, crumbs = [], children, visual, accent,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  visual?: React.ReactNode;
  accent?: string;
}) {
  return (
    <section className={`dark ${s.hero}`} style={accent ? { ["--a" as string]: accent } : undefined}>
      <div className="grid-bg" />
      <div className={s.glow} aria-hidden="true" />
      <div className={`container ${s.inner} ${visual ? s.withVisual : ""}`}>
        <div className={s.copy}>
          {crumbs.length > 0 && (
            <nav aria-label="Migas de pan" className={s.crumbs}>
              <ol role="list">
                <li><Link href="/">Inicio</Link></li>
                {crumbs.map((c, i) => (
                  <li key={c.path}>
                    {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && <p className={`eyebrow ${s.seq}`}>{eyebrow}</p>}
          <h1 className={`h1 ${s.title} ${s.seq}`} style={{ ["--s" as string]: 1 }}>{title}</h1>
          {lead && <p className={`lead ${s.seq}`} style={{ ["--s" as string]: 2 }}>{lead}</p>}
          {children && <div className={`${s.actions} ${s.seq}`} style={{ ["--s" as string]: 3 }}>{children}</div>}
        </div>
        {visual && <div className={`${s.visual} ${s.seq}`} style={{ ["--s" as string]: 2 }}>{visual}</div>}
      </div>
    </section>
  );
}
