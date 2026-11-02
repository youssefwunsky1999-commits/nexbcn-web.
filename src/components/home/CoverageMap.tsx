"use client";

import Link from "next/link";
import { useState } from "react";
import { areas, towns, type AreaSlug } from "@/lib/zones";
import { site } from "@/lib/site";
import s from "./CoverageMap.module.css";

/* Proyección equirectangular corregida por latitud del área (≈41.5°N) */
const BOUNDS = { w: 1.95, e: 2.56, n: 41.72, s: 41.36 };
const W = 600;
const H = Math.round((W * (BOUNDS.n - BOUNDS.s)) / ((BOUNDS.e - BOUNDS.w) * Math.cos((41.54 * Math.PI) / 180)));
const px = (lng: number) => ((lng - BOUNDS.w) / (BOUNDS.e - BOUNDS.w)) * W;
const py = (lat: number) => ((BOUNDS.n - lat) / (BOUNDS.n - BOUNDS.s)) * H;
const PX_PER_KM = W / ((BOUNDS.e - BOUNDS.w) * 111.32 * Math.cos((41.54 * Math.PI) / 180));

/* Línea de costa aproximada (Barcelona → Maresme) */
const coast: [number, number][] = [
  [2.105, 41.36], [2.155, 41.375], [2.19, 41.385], [2.215, 41.405], [2.235, 41.43], [2.255, 41.445],
  [2.29, 41.465], [2.33, 41.483], [2.38, 41.507], [2.445, 41.537], [2.5, 41.565], [2.56, 41.592],
];
const coastPath = coast.map(([lng, lat], i) => `${i ? "L" : "M"}${px(lng).toFixed(1)} ${py(lat).toFixed(1)}`).join(" ");
const seaPath = `${coastPath} L${W} ${H} L${px(2.105).toFixed(1)} ${H} Z`;

const leftLabel = new Set(["Sant Celoni", "Mollet del Vallès", "Caldes de Montbui"]);
const labelled = new Set(["Granollers", "Barcelona", "Sabadell", "Terrassa", "Mollet del Vallès", "Cardedeu", "La Garriga", "Sant Cugat del Vallès", "Badalona", "Sant Celoni", "Caldes de Montbui"]);

export function CoverageMap({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<AreaSlug | "all">("all");
  const [hover, setHover] = useState<string>();
  const base = { x: px(site.geo.lng), y: py(site.geo.lat) };

  return (
    <div className={`${s.wrap} ${compact ? s.compact : ""}`}>
      <div className={s.mapCard} data-reveal="scale">
        <div className={s.filters} role="group" aria-label="Filtrar zona">
          <button type="button" aria-pressed={active === "all"} className={active === "all" ? s.on : ""} onClick={() => setActive("all")}>Todas</button>
          {areas.map((a) => (
            <button key={a.slug} type="button" aria-pressed={active === a.slug} className={active === a.slug ? s.on : ""} onClick={() => setActive(a.slug)}>
              {a.name}
            </button>
          ))}
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className={s.map} role="img" aria-label="Mapa esquemático de la zona de cobertura de NEXBCN: Granollers, Vallès Oriental, Vallès Occidental y Barcelona">
          <defs>
            <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" fill="none" stroke="rgba(169,196,255,.07)" />
            </pattern>
            <radialGradient id="map-base" cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#2f6bff" stopOpacity=".35" />
              <stop offset="1" stopColor="#2f6bff" stopOpacity="0" />
            </radialGradient>
            <pattern id="sea" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M0 0V8" stroke="rgba(45,212,191,.12)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#map-grid)" />
          <path d={seaPath} fill="url(#sea)" />
          <path d={coastPath} fill="none" stroke="rgba(45,212,191,.5)" strokeWidth="1.4" />
          <text x={px(2.37)} y={py(41.42)} className={s.sea}>MAR MEDITERRÁNEO</text>

          <circle cx={base.x} cy={base.y} r={PX_PER_KM * 30} fill="url(#map-base)" />
          {[10, 20, 30].map((km) => (
            <g key={km}>
              <circle cx={base.x} cy={base.y} r={PX_PER_KM * km} fill="none" stroke="rgba(77,139,255,.22)" strokeDasharray="3 6" />
              <text x={base.x + 4} y={base.y - PX_PER_KM * km - 5} className={s.ring}>{km} KM</text>
            </g>
          ))}

          {towns.map((t) => {
            const x = px(t.lng), y = py(t.lat);
            const on = active === "all" || active === t.area;
            const isBase = t.name === "Granollers";
            const showLabel = (labelled.has(t.name) || hover === t.name) && on;
            return (
              <g
                key={t.name}
                className={`${s.town} ${on ? "" : s.off} ${hover === t.name ? s.hot : ""}`}
                onMouseEnter={() => setHover(t.name)}
                onMouseLeave={() => setHover(undefined)}
              >
                {isBase && <circle cx={x} cy={y} r="16" className={s.pulse} />}
                <circle cx={x} cy={y} r={isBase ? 7 : 4} className={isBase ? s.baseDot : s.dot} />
                {showLabel && (
                  <text
                    x={leftLabel.has(t.name) ? x - 8 : x + (isBase ? 12 : 8)}
                    y={y + 4}
                    textAnchor={leftLabel.has(t.name) ? "end" : "start"}
                    className={isBase ? s.baseLabel : s.label}
                  >
                    {t.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <p className={s.note}>Mapa esquemático · posiciones aproximadas · base en {site.address.city}</p>
      </div>

      {!compact && (
        <div className={s.lists}>
          {areas.map((a) => (
            <div key={a.slug} className={`${s.area} ${active === a.slug ? s.areaOn : ""}`}>
              <Link href={`/zonas/${a.slug}`} className={s.areaTitle}>{a.name} <span aria-hidden="true">→</span></Link>
              <ul role="list">
                {towns.filter((t) => t.area === a.slug).map((t) => (
                  <li key={t.name} onMouseEnter={() => { setHover(t.name); setActive("all"); }} onMouseLeave={() => setHover(undefined)}>
                    {t.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
