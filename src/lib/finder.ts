import type { ServiceSlug } from "./services";

export type Problem = {
  id: string;
  label: string;
  hint: string;
  service: ServiceSlug;
  icon: "drop" | "drain" | "flame" | "snow" | "bolt" | "light" | "boiler" | "hammer";
  /** Explicación que verá el usuario en el resultado */
  diagnosis: string;
  /** ¿Puede ser urgente por naturaleza? */
  canBeUrgent: boolean;
};

export const problems: Problem[] = [
  { id: "fuga", label: "Fuga de agua", hint: "Goteos, humedades, charcos", service: "fontaneria", icon: "drop", canBeUrgent: true,
    diagnosis: "Una fuga necesita localizarse cuanto antes para evitar daños. Si el agua sale de forma continua, cierra la llave de paso general mientras llegamos." },
  { id: "atasco", label: "Atasco o mal olor", hint: "Desagües lentos, inodoro", service: "fontaneria", icon: "drain", canBeUrgent: true,
    diagnosis: "Desatascamos y revisamos la causa (acumulación, pendiente o bajante) para que no se repita." },
  { id: "agua-caliente", label: "Sin agua caliente", hint: "Termo o caldera", service: "calefaccion", icon: "boiler", canBeUrgent: true,
    diagnosis: "Revisaremos el termo o la caldera para diagnosticar si es una avería reparable o conviene sustituir el equipo." },
  { id: "calefaccion", label: "Calefacción", hint: "Caldera, radiadores, presión", service: "calefaccion", icon: "flame", canBeUrgent: true,
    diagnosis: "Caldera bloqueada, pérdida de presión o radiadores fríos: diagnosticamos el circuito completo, no solo el síntoma." },
  { id: "aire", label: "Aire acondicionado", hint: "Instalar, no enfría, gotea", service: "climatizacion", icon: "snow", canBeUrgent: false,
    diagnosis: "Te asesoramos sobre la potencia y el sistema adecuados, o revisamos el equipo que no rinde como debería." },
  { id: "electrica", label: "Avería eléctrica", hint: "Salta el diferencial, sin luz", service: "electricidad", icon: "bolt", canBeUrgent: true,
    diagnosis: "No fuerces ni puentees protecciones. Localizamos el circuito afectado y reparamos con seguridad." },
  { id: "iluminacion", label: "Electricidad nueva", hint: "Iluminación, enchufes, cuadro", service: "electricidad", icon: "light", canBeUrgent: false,
    diagnosis: "Diseñamos la ampliación o renovación de la instalación con protecciones adecuadas y un cuadro ordenado." },
  { id: "reforma", label: "Reforma", hint: "Baño, cocina o vivienda", service: "reformas-integrales", icon: "hammer", canBeUrgent: false,
    diagnosis: "Planificamos la reforma con las instalaciones en el centro y un único interlocutor para todo el proyecto." },
];

export const installations = [
  { id: "vivienda", label: "Piso / vivienda" },
  { id: "casa", label: "Casa unifamiliar" },
  { id: "comunidad", label: "Comunidad de vecinos" },
  { id: "negocio", label: "Local / oficina" },
  { id: "nave", label: "Nave / industria" },
] as const;

export const urgencies = [
  { id: "ahora", label: "Es urgente", hint: "Necesito ayuda hoy" },
  { id: "pronto", label: "Pronto", hint: "En los próximos días" },
  { id: "planificando", label: "Planificando", hint: "Quiero presupuesto" },
] as const;

export type InstallationId = (typeof installations)[number]["id"];
export type UrgencyId = (typeof urgencies)[number]["id"];
