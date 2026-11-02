/** Reglas compartidas cliente/servidor del formulario de presupuesto. */
export const QUOTE_LIMITS = {
  maxPhotos: 5,
  /** Tras la compresión en el navegador cada foto suele ocupar 200–600 KB */
  maxPhotoBytes: 3 * 1024 * 1024,
  maxTotalBytes: 4 * 1024 * 1024, // por debajo del límite típico de 4,5 MB de funciones serverless
  minMessage: 15,
  maxMessage: 3000,
  acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
} as const;

export const urgencyOptions = [
  { id: "urgente", label: "Urgente (hoy)" },
  { id: "pronto", label: "Esta semana" },
  { id: "flexible", label: "Sin prisa" },
] as const;

export const contactPrefs = [
  { id: "telefono", label: "Llamada" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "email", label: "Email" },
] as const;
