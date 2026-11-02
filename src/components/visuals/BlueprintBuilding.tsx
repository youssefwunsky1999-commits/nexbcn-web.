/**
 * Ilustración original NEXBCN: sección técnica de un edificio con sus
 * tres flujos — agua (azul hielo), electricidad (azul eléctrico) y aire
 * (turquesa). SVG puro: ligero, nítido en cualquier pantalla y animado
 * solo con CSS (stroke-dashoffset), sin JavaScript.
 */
const WATER = "#9ccbff";
const POWER = "#4d8bff";
const AIR = "#2dd4bf";
const LINE = "rgba(169,196,255,.38)";
const LINE_SOFT = "rgba(169,196,255,.16)";

const water = "M40 600 H170 V150 M170 500 H290 V470 M170 360 H260 V330 M170 220 H300 V190";
const power = "M600 600 H470 V160 M470 520 H330 M400 520 V500 M470 380 H350 M420 380 V365 M470 240 H330 M400 240 V225";
const air = "M430 120 V140 H230 V160 M330 140 V300 H230 M430 140 V290";
const heat = "M200 530 H240 M200 545 H240 M200 515 H240";

export function BlueprintBuilding({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 640" className={className} role="img" aria-label="Ilustración técnica de un edificio con sus instalaciones de agua, electricidad y climatización">
      <defs>
        <filter id="bp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="bp-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(77,139,255,.10)" />
          <stop offset="1" stopColor="rgba(77,139,255,0)" />
        </linearGradient>
      </defs>

      {/* Capa 1 — estructura */}
      <g data-layer="1" className="draw" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="120" y="120" width="400" height="440" rx="4" fill="url(#bp-glass)" stroke={LINE} strokeWidth="1.5" style={{ ["--len" as string]: 1700 }} />
        <path d="M120 400 H520 M120 260 H520" stroke={LINE} strokeWidth="1.2" style={{ ["--len" as string]: 420 }} />
        <path d="M20 560 H620" stroke={LINE} strokeWidth="1.5" style={{ ["--len" as string]: 600 }} />
        <path d="M20 580 H620 M20 600 H620" stroke={LINE_SOFT} strokeWidth="1" strokeDasharray="2 8" />
        {/* ventanas */}
        {[150, 290, 430].map((y) =>
          [380, 430].map((x) => (
            <rect key={`${x}-${y}`} x={x - 30} y={y} width="36" height="56" rx="2" stroke={LINE_SOFT} strokeWidth="1" style={{ ["--len" as string]: 190 }} />
          ))
        )}
        {/* cotas */}
        <path d="M120 96 V84 M520 96 V84 M120 90 H520" stroke={LINE_SOFT} strokeWidth="1" style={{ ["--len" as string]: 430 }} />
        <path d="M548 120 H560 M548 560 H560 M554 120 V560" stroke={LINE_SOFT} strokeWidth="1" style={{ ["--len" as string]: 470 }} />
        {/* unidad exterior en cubierta */}
        <rect x="380" y="78" width="100" height="42" rx="6" stroke={AIR} strokeOpacity=".7" strokeWidth="1.4" style={{ ["--len" as string]: 300 }} />
        <circle cx="408" cy="99" r="12" stroke={AIR} strokeOpacity=".7" strokeWidth="1.2" style={{ ["--len" as string]: 80 }} />
        {/* caldera */}
        <rect x="186" y="490" width="68" height="64" rx="5" stroke={WATER} strokeOpacity=".6" strokeWidth="1.3" style={{ ["--len" as string]: 270 }} />
        {/* cuadro eléctrico */}
        <rect x="486" y="500" width="22" height="40" rx="3" stroke={POWER} strokeOpacity=".8" strokeWidth="1.3" style={{ ["--len" as string]: 130 }} />
      </g>

      {/* Capa 2 — redes de instalaciones */}
      <g data-layer="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={water} stroke={WATER} strokeOpacity=".28" strokeWidth="5" />
        <path d={water} stroke={WATER} strokeWidth="2" className="flow" filter="url(#bp-glow)" />
        <path d={power} stroke={POWER} strokeOpacity=".3" strokeWidth="3" />
        <path d={power} stroke="#9fc0ff" strokeWidth="1.6" className="flow flow--fast" filter="url(#bp-glow)" />
        <path d={air} stroke={AIR} strokeOpacity=".22" strokeWidth="8" />
        <path d={air} stroke={AIR} strokeWidth="1.6" className="flow flow--slow" filter="url(#bp-glow)" />
        <path d={heat} stroke="#7dd3fc" strokeOpacity=".7" strokeWidth="1.2" className="flow flow--slow" />
        {/* difusores de aire */}
        {[[230, 160], [230, 300], [430, 290]].map(([x, y]) => (
          <g key={`d${x}${y}`} stroke={AIR} strokeOpacity=".8" strokeWidth="1.2">
            <path d={`M${x - 14} ${y + 6} H${x + 14}`} />
            <path d={`M${x - 10} ${y + 12} q10 6 20 0`} className="flow flow--slow" />
          </g>
        ))}
        {/* luminarias */}
        {[[330, 520], [350, 380], [330, 240]].map(([x, y]) => (
          <g key={`l${x}${y}`}>
            <circle cx={x} cy={y + 8} r="5" fill={POWER} filter="url(#bp-glow)" />
            <path d={`M${x - 26} ${y + 40} L${x} ${y + 12} L${x + 26} ${y + 40}`} stroke="rgba(77,139,255,.18)" />
          </g>
        ))}
        {/* grifos / puntos de consumo */}
        {[[290, 470], [260, 330], [300, 190]].map(([x, y]) => (
          <g key={`w${x}${y}`}>
            <circle cx={x} cy={y} r="4" fill={WATER} filter="url(#bp-glow)" />
          </g>
        ))}
      </g>

      {/* Capa 3 — nodos y anotaciones */}
      <g data-layer="3" fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing=".08em">
        {[[170, 600], [170, 500], [170, 360], [170, 220], [470, 520], [470, 380], [470, 240], [430, 140], [330, 140]].map(([x, y]) => (
          <circle key={`n${x}${y}`} cx={x} cy={y} r="3.2" fill="#050b18" stroke="#eaf1ff" strokeWidth="1.2" />
        ))}
        <circle cx="430" cy="120" r="4" fill={AIR} filter="url(#bp-glow)" className="node-pulse" />

        <g fill="#a9b8d6">
          <path d="M170 150 L120 108 H40" stroke={LINE} fill="none" />
          <text x="40" y="102">AGUA · AFS / ACS</text>
          <path d="M480 99 L520 60 H600" stroke={LINE} fill="none" />
          <text x="520" y="54">CLIMA · INVERTER</text>
          <path d="M508 520 L560 470 H620" stroke={LINE} fill="none" />
          <text x="560" y="464">230V · CUADRO</text>
          <path d="M186 522 L60 470 H20" stroke={LINE} fill="none" />
          <text x="20" y="464">CALEFACCIÓN</text>
          <text x="20" y="630" fill="#7486a8">41.6079° N · 2.2876° E — GRANOLLERS</text>
          <text x="520" y="630" fill="#2dd4bf">● EN LÍNEA</text>
        </g>
      </g>
    </svg>
  );
}
