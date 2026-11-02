import { site, defaultWhatsAppMessage } from "./site";

/**
 * Enlaces de contacto con degradación honesta: si el teléfono o WhatsApp
 * aún no están configurados, los botones llevan a /contacto en vez de a
 * un número falso.
 */
export const callHref = site.phoneHref ?? "/contacto";
export const whatsappHref = (msg: string = defaultWhatsAppMessage) => site.whatsappHref(msg) ?? "/contacto";
export const isExternal = (href: string) => href.startsWith("http") || href.startsWith("tel:");
