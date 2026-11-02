import { site } from "@/lib/site";

/** Aviso solo en desarrollo: lista la configuración pendiente. Nunca aparece en producción. */
export function ConfigNotice() {
  if (process.env.NODE_ENV === "production" || site.missing.length === 0) return null;
  return (
    <div
      role="note"
      style={{
        position: "fixed", left: 12, top: 80, zIndex: 200, maxWidth: 320, padding: "10px 14px",
        borderRadius: 12, background: "rgba(250,204,21,.95)", color: "#3d2e00", fontSize: 12.5,
        lineHeight: 1.45, boxShadow: "0 10px 30px -10px rgba(0,0,0,.4)", fontFamily: "var(--font-mono)",
      }}
    >
      <strong>DEV · Falta configurar:</strong> {site.missing.join(", ")}. Ver <code>.env.example</code>.
    </div>
  );
}
