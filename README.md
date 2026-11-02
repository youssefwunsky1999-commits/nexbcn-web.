# NEXBCN — nexbcn.es

Web de **NEXBCN | Fontanería, Climatización & Electricidad** (Granollers · Vallès Oriental · Vallès Occidental · Barcelona).

Next.js 15 (App Router) · TypeScript · CSS propio con design tokens · animaciones sin librerías (IntersectionObserver + CSS).
Todas las páginas se generan estáticas, salvo el endpoint del formulario.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # rellenar datos reales
npm run dev                  # http://localhost:3000
npm run build && npm start   # producción
npm run lint && npm run typecheck
```

## ⚠️ Lo que falta configurar (no se ha inventado ningún dato)

| Qué | Dónde | Efecto mientras falte |
|---|---|---|
| Teléfono | `NEXT_PUBLIC_PHONE` | Se muestra "Teléfono pendiente" y los botones de llamada llevan a /contacto |
| WhatsApp | `NEXT_PUBLIC_WHATSAPP` (si se omite, usa el teléfono) | El botón de WhatsApp lleva a /contacto |
| Email | `NEXT_PUBLIC_EMAIL` | Se muestra "Email pendiente" |
| Dirección | `NEXT_PUBLIC_STREET`, `NEXT_PUBLIC_POSTAL_CODE`, `NEXT_PUBLIC_CITY` | Solo aparece la ciudad (Granollers) |
| **Envío del formulario** | `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` ([resend.com](https://resend.com), dominio verificado) | El formulario **no envía**: el usuario ve un aviso y se le ofrecen WhatsApp/teléfono con su mensaje ya escrito |
| Datos legales | `src/app/aviso-legal`, `politica-de-privacidad` (campos `[ASÍ]`) | Las páginas legales muestran un aviso de "pendiente de revisión" |
| Horario | `site.openingHours` / `site.urgencyHours` en `src/lib/site.ts` | No se publica horario (ni en la web ni en Schema.org) |
| Testimonios | `src/lib/testimonials.ts` | La sección no se muestra hasta que haya reseñas reales |
| Fotos reales | `image` en cada servicio de `src/lib/services.ts` (archivo en `/public`) | Se usa la ilustración técnica original de cada servicio |
| Equipo, certificaciones | `src/app/sobre-nosotros` (TODO) | No se muestra |

En desarrollo, un aviso amarillo en pantalla lista las variables pendientes (nunca aparece en producción).

Los compromisos de marca ("presupuesto por escrito antes de empezar", etc.) deben confirmarse con la forma real de trabajar de la empresa.

## Arquitectura

```
src/
  app/                    Rutas (una carpeta por página) + sitemap, robots, manifest, OG image
    api/presupuesto/      Endpoint del formulario (validación, anti-spam, envío vía Resend)
  components/
    layout/               Header (mega menú + menú móvil), Footer, QuickActions (WhatsApp / barra móvil)
    home/                 Hero, ServicesShowcase, SolutionFinder, CoverageMap, Marquee
    sections/             Bloques reutilizables: PageHero, Faq, FinalCta, WhyUs, Process…
    service/              Plantilla común de las páginas de servicio
    forms/                QuoteForm (fotos con compresión en el navegador)
    visuals/              Ilustraciones SVG originales (edificio blueprint + una por servicio)
    ui/                   Icon, Logo, Counter, MotionProvider (motor de animación)
  lib/                    Contenido y configuración: site, services, zones, faqs, finder, schema, seo
```

**Todo el contenido está en `src/lib/`.** Para cambiar textos, servicios, FAQs o localidades no hace falta tocar componentes.

## Páginas

Inicio · Fontanería · Climatización · Electricidad · Calefacción · Reformas integrales · Urgencias · Presupuesto · Sobre nosotros · Zona de cobertura · Zonas (Granollers, Vallès Oriental, Vallès Occidental, Barcelona) · Preguntas frecuentes · Contacto · Aviso legal · Privacidad · Cookies · 404.

## SEO

- Metadatos únicos, canonical, Open Graph y Twitter en cada página (`src/lib/seo.ts`). Imagen OG generada (`/opengraph-image`).
- `sitemap.xml` y `robots.txt` generados (la API queda excluida).
- Schema.org: `Plumber` + `Electrician` + `HVACBusiness` con `areaServed`, `Service` por servicio, `FAQPage` y `BreadcrumbList`. Teléfono, email, dirección y horario solo se publican cuando están configurados. No hay `aggregateRating`.
- **SEO local sin contenido duplicado:** una página por *área* con texto propio, en vez de decenas de páginas casi iguales por municipio. Para añadir un municipio con página propia, crear un área nueva en `zones.ts` **solo si tiene contenido real y diferenciado** (proyectos, reseñas locales).
- Enlazado interno: servicios ⇄ zonas ⇄ presupuesto con parámetros (`/presupuesto?servicio=…&localidad=…`).

## Rendimiento y accesibilidad

- 103 kB de JS compartido; la home suma 126 kB en total. Sin librerías de animación ni de UI.
- La animación de entrada del hero es CSS puro: arranca en el primer pintado, sin esperar a la hidratación (LCP).
- Fuentes autoalojadas con `next/font` (Inter, Inter Tight, JetBrains Mono).
- `prefers-reduced-motion` respetado en todas las animaciones; efectos de cursor solo con puntero fino.
- HTML semántico, enlace "saltar al contenido", foco visible, `aria-*` en menús, asistente y formulario. Las FAQ usan `<details>` nativo y funcionan sin JS.
- Imágenes: `next/image` con AVIF/WebP preparado para cuando se añadan fotos.

## Seguridad del formulario

Honeypot y tiempo mínimo de cumplimentación · rate limit por IP · validación en servidor · comprobación de la firma binaria de cada imagen (no solo el MIME) · límite de tamaño · escape del HTML del email · cabeceras de seguridad (`next.config.ts`).
El rate limit es en memoria (por instancia); en un despliegue con varias instancias conviene usar Redis/Upstash o el de la plataforma.

## Despliegue

Pensado para Vercel (o cualquier hosting de Node 20+). Configurar las variables de entorno en el panel del hosting.
Las fotos se comprimen en el navegador (máx. 1600 px, JPEG), así que el total queda por debajo del límite de 4,5 MB de las funciones serverless.
