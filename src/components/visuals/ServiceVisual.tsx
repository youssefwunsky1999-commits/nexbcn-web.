import { useId } from "react";
import type { ServiceSlug } from "@/lib/services";

/**
 * Ilustraciones técnicas originales por servicio (sustituibles por
 * fotografía real añadiendo `image` en lib/services.ts).
 * Todas comparten lenguaje: retícula, trazo fino, flujo animado y nodos.
 */
export function ServiceVisual({ slug, accent, className }: { slug: ServiceSlug; accent: string; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const L = "rgba(169,196,255,.22)";
  const common = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  const scenes: Record<ServiceSlug, React.ReactNode> = {
    fontaneria: (
      <g {...common}>
        <path d="M30 230 H120 V120 H220 V200 H330 V80 H380" stroke={accent} strokeOpacity=".22" strokeWidth="14" />
        <path d="M30 230 H120 V120 H220 V200 H330 V80 H380" stroke={accent} strokeWidth="2.4" className="flow" />
        {[[120, 230], [120, 120], [220, 120], [220, 200], [330, 200], [330, 80]].map(([x, y]) => (
          <g key={`${x}${y}`}>
            <rect x={x - 11} y={y - 11} width="22" height="22" rx="5" fill="#0a1428" stroke={L} strokeWidth="1.2" />
            <circle cx={x} cy={y} r="3" fill={accent} />
          </g>
        ))}
        <path d="M262 182 v-18 h16 v-10" stroke={L} strokeWidth="1.4" />
        <path d="M270 236 c0 -14 10 -22 10 -30 c0 8 10 16 10 30 a10 10 0 0 1 -20 0z" fill={accent} fillOpacity=".9" className="drip" />
        <text x="30" y="270" fill="#7486a8" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5">DN20 · 3.2 BAR · AFS/ACS</text>
      </g>
    ),
    climatizacion: (
      <g {...common}>
        <rect x="70" y="60" width="260" height="64" rx="14" fill="#0a1428" stroke={L} strokeWidth="1.4" />
        <path d="M90 104 H310" stroke={L} strokeWidth="1.2" />
        <circle cx="300" cy="80" r="3" fill={accent} className="node-blink" />
        <text x="96" y="86" fill="#a9b8d6" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1.5">22.0°C · AUTO</text>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${100 + i * 10} ${145 + i * 26} C 160 ${125 + i * 26}, 240 ${175 + i * 26}, ${300 - i * 10} ${145 + i * 26}`}
            stroke={accent}
            strokeOpacity={0.9 - i * 0.18}
            strokeWidth="2"
            className="flow flow--slow"
          />
        ))}
        <text x="70" y="270" fill="#7486a8" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5">SPLIT · INVERTER · BOMBA DE CALOR</text>
      </g>
    ),
    electricidad: (
      <g {...common}>
        <rect x="40" y="50" width="120" height="190" rx="10" fill="#0a1428" stroke={L} strokeWidth="1.4" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={56 + i * 19} y="78" width="13" height="40" rx="3" stroke={L} strokeWidth="1.1" />
            <rect x={58 + i * 19} y={i === 2 ? 98 : 82} width="9" height="14" rx="2" fill={i === 2 ? "#3a4a6a" : accent} />
          </g>
        ))}
        <path d="M60 150 H140 M60 170 H120 M60 190 H130" stroke={L} strokeWidth="1" />
        <path d="M160 100 H240 V70 H360 M160 160 H280 V130 H360 M160 210 H230 V240 H360" stroke={accent} strokeOpacity=".25" strokeWidth="5" />
        <path d="M160 100 H240 V70 H360 M160 160 H280 V130 H360 M160 210 H230 V240 H360" stroke="#bcd3ff" strokeWidth="1.6" className="flow flow--fast" />
        {[[360, 70], [360, 130], [360, 240]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="6" fill={accent} className="node-blink" />
        ))}
        <text x="40" y="270" fill="#7486a8" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5">230V · 40A · ID 30mA</text>
      </g>
    ),
    calefaccion: (
      <g {...common}>
        <rect x="50" y="60" width="90" height="140" rx="12" fill="#0a1428" stroke={L} strokeWidth="1.4" />
        <circle cx="95" cy="110" r="20" stroke={accent} strokeWidth="1.6" />
        <path d="M95 98 c-6 8 -6 14 0 22 c6 -8 6 -14 0 -22z" fill={accent} className="node-blink" />
        <path d="M70 170 H120" stroke={L} />
        <path d="M140 150 H190 V120 H360 M140 180 H200 V230 H360" stroke={accent} strokeOpacity=".25" strokeWidth="8" />
        <path d="M140 150 H190 V120 H360 M140 180 H200 V230 H360" stroke={accent} strokeWidth="2" className="flow flow--slow" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={232 + i * 20} y="140" width="14" height="70" rx="6" fill="#0a1428" stroke={L} strokeWidth="1.3" />
        ))}
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${250 + i * 40} 128 q8 -12 0 -24 q-8 -12 0 -24`} stroke={accent} strokeOpacity=".7" strokeWidth="1.5" className="flow flow--slow" />
        ))}
        <text x="50" y="270" fill="#7486a8" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5">CONDENSACIÓN · 1.5 BAR · 60°C</text>
      </g>
    ),
    "reformas-integrales": (
      <g {...common}>
        <path d="M60 220 L200 260 L340 220 L200 180 Z" fill="#0a1428" stroke={L} strokeWidth="1.4" />
        <path d="M60 220 V100 L200 60 V180 M340 220 V100 L200 60" stroke={L} strokeWidth="1.4" />
        <path d="M200 180 V60" stroke={L} strokeDasharray="3 6" />
        <path d="M90 210 V130 M90 160 L170 137" stroke={accent} strokeWidth="2" className="flow" />
        <path d="M310 210 V130 M310 150 L230 127" stroke="#bcd3ff" strokeWidth="1.6" className="flow flow--fast" />
        <path d="M120 230 L200 252 L280 230" stroke={accent} strokeOpacity=".7" strokeWidth="1.6" className="flow flow--slow" />
        {[[90, 130], [170, 137], [310, 130], [230, 127]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="4" fill={accent} />
        ))}
        <text x="60" y="290" fill="#7486a8" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5">PLANTA · INSTALACIONES · ACABADOS</text>
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id={`g-${uid}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(169,196,255,.06)" />
        </pattern>
        <radialGradient id={`r-${uid}`} cx=".7" cy=".3" r=".8">
          <stop offset="0" stopColor={accent} stopOpacity=".22" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#g-${uid})`} />
      <rect width="400" height="300" fill={`url(#r-${uid})`} />
      {scenes[slug]}
    </svg>
  );
}
