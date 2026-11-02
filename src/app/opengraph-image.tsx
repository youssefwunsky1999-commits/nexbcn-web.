import { ImageResponse } from "next/og";

export const alt = "NEXBCN — El futuro de las instalaciones. Hoy.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 72, color: "#fff", fontFamily: "sans-serif",
          backgroundColor: "#050b18",
          backgroundImage: "radial-gradient(circle at 85% 20%, #0b2a6f 0%, #050b18 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(45deg,#0b2a6f,#2f6bff,#4d8bff)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <svg width="40" height="40" viewBox="8 8 24 24"><path d="M12 29V11.5L28 28.5V12" stroke="#fff" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="28" cy="11" r="3" fill="#2dd4bf" /></svg>
          </div>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>NEX<span style={{ color: "#2dd4bf" }}>BCN</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>EL FUTURO DE LAS</div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>INSTALACIONES.</div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4, color: "#4d8bff" }}>HOY.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a9b8d6" }}>
          <span>Fontanería · Climatización · Electricidad</span>
          <span style={{ color: "#2dd4bf" }}>nexbcn.es</span>
        </div>
      </div>
    ),
    size
  );
}
