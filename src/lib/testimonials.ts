/**
 * Testimonios REALES de clientes.
 *
 * Esta lista está vacía a propósito: no publicamos opiniones inventadas.
 * Cuando tengáis reseñas reales (por ejemplo de Google Business Profile),
 * añadidlas aquí con el consentimiento del cliente. La sección de la web
 * solo se muestra cuando hay al menos una.
 */
export type Testimonial = {
  name: string; // p. ej. "Marta G."
  town: string;
  service: string;
  text: string;
  source?: "Google" | "Directo";
  date?: string; // ISO
};

export const testimonials: Testimonial[] = [];
