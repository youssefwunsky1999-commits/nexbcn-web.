/**
 * Zonas de actuación.
 *
 * Estrategia SEO: en lugar de generar una página casi idéntica por cada
 * municipio (contenido duplicado / thin content), publicamos una página
 * por ÁREA con contenido propio y enlazamos los municipios dentro de ella.
 * Cuando haya contenido real y diferenciado de un municipio concreto
 * (proyectos, reseñas locales), se puede añadir como área nueva.
 */

export type Town = { name: string; lat: number; lng: number; area: AreaSlug };
export type AreaSlug = "granollers" | "valles-oriental" | "valles-occidental" | "barcelona";

export type Area = {
  slug: AreaSlug;
  name: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;
  /** Párrafos con contexto local propio de cada área */
  body: string[];
  focus: { title: string; text: string }[];
};

export const areas: Area[] = [
  {
    slug: "granollers",
    name: "Granollers",
    seoTitle: "Fontanero y electricista en Granollers · NEXBCN",
    seoDescription:
      "Fontanería, climatización, calefacción y electricidad en Granollers. Reparaciones, instalaciones, reformas y urgencias con presupuesto previo.",
    headline: "Instaladores en Granollers.",
    intro:
      "Granollers es nuestra base. Desde aquí atendemos viviendas, comunidades y negocios de la ciudad y de los municipios que la rodean.",
    body: [
      "La capital del Vallès Oriental combina edificios residenciales de distintas épocas, casas unifamiliares en los barrios periféricos y un tejido comercial e industrial muy activo. Cada tipología tiene necesidades distintas: renovación de montantes y bajantes en fincas antiguas, climatización eficiente en viviendas nuevas o mantenimiento preventivo en locales y naves.",
      "Al trabajar cerca, podemos coordinar visitas de diagnóstico con más flexibilidad y dar seguimiento a los trabajos sin desplazamientos largos.",
    ],
    focus: [
      { title: "Comunidades de vecinos", text: "Montantes, bajantes, zonas comunes e iluminación." },
      { title: "Viviendas", text: "Reparaciones, termos, climatización y reformas de baño y cocina." },
      { title: "Comercios y naves", text: "Instalaciones eléctricas, climatización y mantenimiento." },
    ],
  },
  {
    slug: "valles-oriental",
    name: "Vallès Oriental",
    seoTitle: "Fontanería, calderas y reformas en el Vallès Oriental · NEXBCN",
    seoDescription:
      "Servicios de fontanería, reparación de calderas, climatización, electricidad y reformas integrales en el Vallès Oriental: Mollet, Cardedeu, La Garriga, Les Franqueses y más.",
    headline: "Todo el Vallès Oriental, un solo equipo.",
    intro:
      "Del eje de la C-17 a la AP-7, cubrimos los municipios del Vallès Oriental con servicios de instalaciones y reformas.",
    body: [
      "En la comarca conviven núcleos urbanos densos, urbanizaciones de casas unifamiliares y polígonos industriales. En las casas, la calefacción y el agua caliente suelen ser la prioridad cuando llega el frío; en los pisos, la climatización y la renovación de instalaciones antiguas.",
      "Organizamos las rutas de trabajo por zonas para reducir desplazamientos y poder ofrecer plazos realistas en cada municipio.",
    ],
    focus: [
      { title: "Casas unifamiliares", text: "Calderas, radiadores, agua caliente y climatización por zonas." },
      { title: "Pisos y comunidades", text: "Renovación de instalaciones, fugas y desatascos." },
      { title: "Polígonos", text: "Electricidad, climatización y mantenimiento para empresas." },
    ],
  },
  {
    slug: "valles-occidental",
    name: "Vallès Occidental",
    seoTitle: "Fontaneros, electricistas y climatización en el Vallès Occidental",
    seoDescription:
      "Fontanería, electricidad, climatización y calefacción en Sabadell, Terrassa, Sant Cugat, Cerdanyola, Rubí y el resto del Vallès Occidental.",
    headline: "Instalaciones en el Vallès Occidental.",
    intro:
      "Sabadell, Terrassa, Sant Cugat y los municipios del entorno: llevamos el mismo estándar de trabajo a todo el Vallès Occidental.",
    body: [
      "Las dos grandes ciudades de la comarca concentran un parque de viviendas muy variado, con muchos edificios en los que la renovación eléctrica y de fontanería es una mejora de seguridad y de confort. En municipios como Sant Cugat abundan las viviendas unifamiliares donde la climatización por conductos y la bomba de calor tienen mucho sentido.",
      "Para trabajos de mayor alcance planificamos visita previa y presupuesto por partidas.",
    ],
    focus: [
      { title: "Renovación de instalaciones", text: "Electricidad y fontanería en edificios con años." },
      { title: "Climatización", text: "Split, multisplit, conductos y bomba de calor." },
      { title: "Reformas", text: "Baños, cocinas y viviendas completas." },
    ],
  },
  {
    slug: "barcelona",
    name: "Barcelona",
    seoTitle: "Fontaneros y empresa de climatización en Barcelona · NEXBCN",
    seoDescription:
      "Fontaneros, electricistas y empresa de climatización en Barcelona y área metropolitana. Instalaciones, reparaciones, aire acondicionado y reformas.",
    headline: "Barcelona y su área metropolitana.",
    intro:
      "Llevamos nuestros servicios de instalaciones y reformas a Barcelona y a los municipios del área metropolitana más cercanos al Vallès.",
    body: [
      "En la ciudad son habituales los pisos en fincas antiguas, con instalaciones que han ido creciendo con parches durante décadas. Una revisión ordenada del cuadro eléctrico, la sustitución de tuberías antiguas o una climatización bien integrada en espacios con techos altos marcan una gran diferencia.",
      "Trabajamos con cuidado especial en edificios con vecinos, protegiendo zonas comunes y respetando horarios.",
    ],
    focus: [
      { title: "Fincas antiguas", text: "Renovación de instalaciones con mínima afectación." },
      { title: "Aire acondicionado", text: "Instalaciones discretas e integradas." },
      { title: "Locales", text: "Adecuación de instalaciones para negocios." },
    ],
  },
];

export const towns: Town[] = [
  { name: "Granollers", lat: 41.6079, lng: 2.2876, area: "granollers" },
  { name: "Canovelles", lat: 41.618, lng: 2.2833, area: "granollers" },
  { name: "Les Franqueses del Vallès", lat: 41.6297, lng: 2.2989, area: "granollers" },
  { name: "La Roca del Vallès", lat: 41.5871, lng: 2.3275, area: "valles-oriental" },
  { name: "Cardedeu", lat: 41.6392, lng: 2.3575, area: "valles-oriental" },
  { name: "La Garriga", lat: 41.6802, lng: 2.2837, area: "valles-oriental" },
  { name: "L'Ametlla del Vallès", lat: 41.6667, lng: 2.2631, area: "valles-oriental" },
  { name: "Lliçà d'Amunt", lat: 41.6163, lng: 2.2405, area: "valles-oriental" },
  { name: "Lliçà de Vall", lat: 41.5866, lng: 2.2396, area: "valles-oriental" },
  { name: "Parets del Vallès", lat: 41.5734, lng: 2.2331, area: "valles-oriental" },
  { name: "Mollet del Vallès", lat: 41.5397, lng: 2.2131, area: "valles-oriental" },
  { name: "Montmeló", lat: 41.5513, lng: 2.2486, area: "valles-oriental" },
  { name: "Montornès del Vallès", lat: 41.5424, lng: 2.2672, area: "valles-oriental" },
  { name: "Llinars del Vallès", lat: 41.6336, lng: 2.4034, area: "valles-oriental" },
  { name: "Sant Celoni", lat: 41.6893, lng: 2.4903, area: "valles-oriental" },
  { name: "Caldes de Montbui", lat: 41.6328, lng: 2.1673, area: "valles-oriental" },
  { name: "Sabadell", lat: 41.5486, lng: 2.1074, area: "valles-occidental" },
  { name: "Terrassa", lat: 41.5632, lng: 2.0089, area: "valles-occidental" },
  { name: "Sant Cugat del Vallès", lat: 41.4722, lng: 2.0864, area: "valles-occidental" },
  { name: "Cerdanyola del Vallès", lat: 41.4913, lng: 2.1405, area: "valles-occidental" },
  { name: "Rubí", lat: 41.4933, lng: 2.0325, area: "valles-occidental" },
  { name: "Ripollet", lat: 41.4969, lng: 2.1574, area: "valles-occidental" },
  { name: "Barberà del Vallès", lat: 41.5159, lng: 2.1246, area: "valles-occidental" },
  { name: "Santa Perpètua de Mogoda", lat: 41.5354, lng: 2.1823, area: "valles-occidental" },
  { name: "Barcelona", lat: 41.3874, lng: 2.1686, area: "barcelona" },
  { name: "Badalona", lat: 41.4502, lng: 2.2474, area: "barcelona" },
  { name: "Montcada i Reixac", lat: 41.4833, lng: 2.1874, area: "barcelona" },
  { name: "Sant Adrià de Besòs", lat: 41.4306, lng: 2.2185, area: "barcelona" },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
export const townsByArea = (slug: AreaSlug) => towns.filter((t) => t.area === slug);
export const townNames = towns.map((t) => t.name).sort((a, b) => a.localeCompare(b, "es"));
