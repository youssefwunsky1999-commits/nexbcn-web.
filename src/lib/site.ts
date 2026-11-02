/**
 * Configuración central de la marca.
 *
 * IMPORTANTE: los datos de contacto NO están inventados: son los facilitados
 * por el negocio (DEFAULTS) y pueden sobrescribirse con variables de entorno
 * (ver .env.example).
 */

const env = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

/** Datos de contacto reales facilitados por NEXBCN (las variables de entorno, si existen, tienen prioridad). */
const DEFAULTS = {
  phone: "+34611072741",
  email: "multiserviciosbarcelona99@gmail.com",
};

const phone = env(process.env.NEXT_PUBLIC_PHONE) ?? DEFAULTS.phone;
const whatsapp = env(process.env.NEXT_PUBLIC_WHATSAPP) ?? phone;
const email = env(process.env.NEXT_PUBLIC_EMAIL) ?? DEFAULTS.email;

function formatPhone(p?: string) {
  if (!p) return "Teléfono pendiente";
  const digits = p.replace(/[^\d+]/g, "");
  const m = digits.match(/^(\+34)?(\d{3})(\d{3})(\d{3})$/);
  return m ? `${m[2]} ${m[3]} ${m[4]}` : digits;
}

export const site = {
  name: "NEXBCN",
  legalName: "NEXBCN", // TODO: razón social real
  tagline: "Fontanería, Climatización & Electricidad",
  url: (env(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://nexbcn.es").replace(/\/$/, ""),
  locale: "es_ES",

  phone,
  phoneDisplay: formatPhone(phone),
  phoneHref: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined,

  whatsapp,
  whatsappHref: (message?: string) =>
    whatsapp
      ? `https://wa.me/${whatsapp.replace(/\D/g, "")}${message ? `?text=${encodeURIComponent(message)}` : ""}`
      : undefined,

  email,
  emailDisplay: email ?? "Email pendiente",

  address: {
    street: env(process.env.NEXT_PUBLIC_STREET),
    postalCode: env(process.env.NEXT_PUBLIC_POSTAL_CODE),
    city: env(process.env.NEXT_PUBLIC_CITY) ?? "Granollers",
    region: "Barcelona",
    country: "ES",
  },

  /** Base de operaciones (centro de Granollers) para mapa y Schema.org */
  geo: { lat: 41.6079, lng: 2.2876 },

  /** Horario: pendiente de confirmar por el negocio. No se publica en Schema hasta tenerlo. */
  openingHours: undefined as string[] | undefined,
  urgencyHours: undefined as string | undefined,

  get missing() {
    const m: string[] = [];
    if (!phone) m.push("NEXT_PUBLIC_PHONE");
    if (!whatsapp) m.push("NEXT_PUBLIC_WHATSAPP");
    if (!email) m.push("NEXT_PUBLIC_EMAIL");
    return m;
  },
};

export const defaultWhatsAppMessage =
  "Hola NEXBCN, me gustaría pedir información sobre un servicio.";
