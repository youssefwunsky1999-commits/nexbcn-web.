/**
 * Logotipo NEXBCN.
 * El símbolo es una "N" trazada como una sola línea continua — una tubería,
 * un cable, un conducto — que termina en un nodo turquesa: el punto donde
 * llega la energía. Es la base de toda la identidad visual.
 */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="nx-g" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0b2a6f" />
          <stop offset=".55" stopColor="#2f6bff" />
          <stop offset="1" stopColor="#4d8bff" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="url(#nx-g)" />
      <rect x="1.5" y="1.5" width="37" height="37" rx="10.5" stroke="rgba(255,255,255,.22)" />
      <path d="M12 29V11.5L28 28.5V12" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="11" r="3" fill="#2dd4bf" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <LogoMark />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 19,
          letterSpacing: "-0.03em",
          color: tone === "light" ? "#fff" : "var(--text)",
        }}
      >
        NEX<span style={{ color: tone === "light" ? "var(--teal)" : "var(--electric)" }}>BCN</span>
      </span>
    </span>
  );
}
