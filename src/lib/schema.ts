import { site } from "./site";
import { services, type Service, type Faq } from "./services";
import { areas, towns } from "./zones";

/**
 * Datos estructurados Schema.org.
 * Solo se publican propiedades verificables: teléfono, email, dirección y
 * horario se omiten mientras no estén configurados. No hay valoraciones
 * (aggregateRating) porque no publicamos reseñas inventadas.
 */

const businessId = `${site.url}/#business`;

export function businessSchema() {
  const address =
    site.address.street && site.address.postalCode
      ? {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          postalCode: site.address.postalCode,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        }
      : {
          "@type": "PostalAddress",
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        };

  return {
    "@context": "https://schema.org",
    "@type": ["Plumber", "Electrician", "HVACBusiness"],
    "@id": businessId,
    name: `${site.name} | ${site.tagline}`,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/opengraph-image`,
    description:
      "Fontanería, climatización, calefacción, electricidad y reformas integrales para hogares y empresas en Granollers, el Vallès y Barcelona.",
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.email ? { email: site.email } : {}),
    ...(site.openingHours ? { openingHours: site.openingHours } : {}),
    address,
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: [
      ...areas.map((a) => ({ "@type": "AdministrativeArea", name: a.name })),
      ...towns.map((t) => ({ "@type": "City", name: t.name })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/${s.slug}` },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "es-ES",
    publisher: { "@id": businessId },
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.seoDescription,
    url: `${site.url}/${s.slug}`,
    provider: { "@id": businessId },
    areaServed: areas.map((a) => ({ "@type": "AdministrativeArea", name: a.name })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path === "/" ? "" : it.path}`,
    })),
  };
}
