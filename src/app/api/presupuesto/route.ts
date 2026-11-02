import { NextResponse } from "next/server";
import { services } from "@/lib/services";
import { QUOTE_LIMITS, urgencyOptions, contactPrefs } from "@/lib/quote";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── Rate limit en memoria (por instancia). Para producción multi-instancia,
      sustituir por Upstash/Redis o el rate limit de la plataforma. ── */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_HITS;
}

const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const str = (fd: FormData, k: string, max = 500) => String(fd.get(k) ?? "").trim().slice(0, max);

/** Comprueba la firma real del archivo (no basta con el MIME declarado). */
function sniffImage(buf: Uint8Array): string | null {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "image/png";
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf[8] === 0x57 && buf[9] === 0x45) return "image/webp";
  const ftyp = String.fromCharCode(...buf.slice(4, 12));
  if (ftyp.startsWith("ftyp") && /heic|heix|mif1|msf1|hevc/.test(ftyp)) return "image/heic";
  return null;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > QUOTE_LIMITS.maxTotalBytes + 256 * 1024) return NextResponse.json({ error: "too_large" }, { status: 413 });

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Anti-spam: honeypot y tiempo mínimo de cumplimentación
  const started = Number(fd.get("t") ?? 0);
  if (str(fd, "website") || !started || Date.now() - started < 3000) {
    return NextResponse.json({ ok: true }); // respuesta neutra para bots
  }

  const data = {
    servicio: str(fd, "servicio", 40),
    localidad: str(fd, "localidad", 80),
    urgencia: str(fd, "urgencia", 20),
    mensaje: str(fd, "mensaje", QUOTE_LIMITS.maxMessage),
    nombre: str(fd, "nombre", 120),
    telefono: str(fd, "telefono", 20).replace(/[\s.-]/g, ""),
    email: str(fd, "email", 160),
    contacto: str(fd, "contacto", 20),
    privacidad: str(fd, "privacidad", 2),
  };

  const fields: Record<string, string> = {};
  if (![...services.map((s) => s.slug), "urgencia"].includes(data.servicio as never)) fields.servicio = "Elige un servicio.";
  if (!data.localidad) fields.localidad = "Indica tu localidad.";
  if (data.mensaje.length < QUOTE_LIMITS.minMessage) fields.mensaje = "Cuéntanos un poco más.";
  if (!data.nombre) fields.nombre = "Indica tu nombre.";
  if (!/^\+?\d{9,15}$/.test(data.telefono)) fields.telefono = "Teléfono no válido.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) fields.email = "Email no válido.";
  if (data.privacidad !== "1") fields.privacidad = "Consentimiento obligatorio.";
  if (data.urgencia && !urgencyOptions.some((u) => u.id === data.urgencia)) fields.urgencia = "Valor no válido.";
  if (data.contacto && !contactPrefs.some((c) => c.id === data.contacto)) fields.contacto = "Valor no válido.";

  const files = fd.getAll("fotos").filter((f): f is File => f instanceof File && f.size > 0);
  const attachments: { filename: string; content: string }[] = [];
  if (files.length > QUOTE_LIMITS.maxPhotos) fields.fotos = `Máximo ${QUOTE_LIMITS.maxPhotos} fotos.`;
  let total = 0;
  for (const [i, f] of files.slice(0, QUOTE_LIMITS.maxPhotos).entries()) {
    total += f.size;
    if (f.size > QUOTE_LIMITS.maxPhotoBytes || total > QUOTE_LIMITS.maxTotalBytes) { fields.fotos = "Fotos demasiado grandes."; break; }
    const buf = new Uint8Array(await f.arrayBuffer());
    const type = sniffImage(buf);
    if (!type) { fields.fotos = "Solo se admiten imágenes (JPG, PNG, WEBP, HEIC)."; break; }
    const ext = type.split("/")[1].replace("jpeg", "jpg");
    attachments.push({ filename: `foto-${i + 1}.${ext}`, content: Buffer.from(buf).toString("base64") });
  }

  if (Object.keys(fields).length) return NextResponse.json({ error: "validation", fields }, { status: 422 });

  const { RESEND_API_KEY, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !QUOTE_TO_EMAIL || !QUOTE_FROM_EMAIL) {
    // No simulamos el envío: el cliente muestra alternativas reales (WhatsApp / teléfono).
    console.warn("[presupuesto] Envío no configurado: faltan RESEND_API_KEY / QUOTE_TO_EMAIL / QUOTE_FROM_EMAIL");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const serviceName = services.find((s) => s.slug === data.servicio)?.name ?? "Urgencia";
  const urgencyLabel = urgencyOptions.find((u) => u.id === data.urgencia)?.label ?? "-";
  const contactLabel = contactPrefs.find((c) => c.id === data.contacto)?.label ?? "-";
  const rows: [string, string][] = [
    ["Servicio", serviceName], ["Localidad", data.localidad], ["Urgencia", urgencyLabel],
    ["Nombre", data.nombre], ["Teléfono", data.telefono], ["Email", data.email || "-"],
    ["Prefiere", contactLabel], ["Fotos", String(attachments.length)],
  ];
  const html = `<div style="font-family:system-ui,sans-serif;max-width:640px">
<h2 style="margin:0 0 16px">Nueva solicitud de presupuesto${data.urgencia === "urgente" ? " — URGENTE" : ""}</h2>
<table style="border-collapse:collapse;width:100%">${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#667;white-space:nowrap">${k}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`).join("")}</table>
<h3 style="margin:24px 0 8px">Descripción</h3><p style="white-space:pre-wrap;line-height:1.5">${esc(data.mensaje)}</p></div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: QUOTE_FROM_EMAIL,
      to: QUOTE_TO_EMAIL.split(",").map((e) => e.trim()),
      reply_to: data.email || undefined,
      subject: `${data.urgencia === "urgente" ? "[URGENTE] " : ""}Presupuesto ${serviceName} · ${data.localidad}`,
      html,
      attachments,
    }),
  });

  if (!res.ok) {
    console.error("[presupuesto] Error de Resend", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
