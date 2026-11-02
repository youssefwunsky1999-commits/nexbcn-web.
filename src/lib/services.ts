export type ServiceSlug =
  | "fontaneria"
  | "climatizacion"
  | "electricidad"
  | "calefaccion"
  | "reformas-integrales";

export type Faq = { q: string; a: string };

export type Service = {
  slug: ServiceSlug;
  index: string;
  name: string;
  short: string;
  /** <title> SEO */
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  eyebrow: string;
  headline: string;
  lead: string;
  /** Color de acento propio de cada servicio */
  accent: string;
  accentSoft: string;
  /** Qué hacemos */
  scope: { title: string; text: string }[];
  /** Problemas que solucionamos */
  problems: string[];
  benefits: { title: string; text: string }[];
  faqs: Faq[];
  related: ServiceSlug[];
  /** Ruta a una foto real en /public (opcional). Si no existe se usa la ilustración original. */
  image?: string;
};

export const services: Service[] = [
  {
    slug: "fontaneria",
    index: "01",
    name: "Fontanería",
    short: "Fugas, desatascos, termos y nuevas instalaciones.",
    seoTitle: "Fontanero en Granollers y el Vallès · Fontanería profesional",
    seoDescription:
      "Fontaneros en Granollers, Vallès Oriental, Vallès Occidental y Barcelona. Reparación de fugas, desatascos, termos eléctricos, grifería e instalaciones. Pide presupuesto.",
    keywords: ["fontanero Granollers", "fontanería Granollers", "fontanero urgente Granollers", "fontaneros Barcelona"],
    eyebrow: "Agua bajo control",
    headline: "Fontanería precisa, sin fugas ni sorpresas.",
    lead:
      "Localizamos, reparamos e instalamos. Desde una fuga que no deja dormir hasta la red de agua completa de una vivienda o un local, con diagnóstico claro y presupuesto por escrito antes de empezar.",
    accent: "#38BDF8",
    accentSoft: "rgba(56,189,248,.14)",
    scope: [
      { title: "Detección y reparación de fugas", text: "Localizamos el origen de la fuga y reparamos minimizando obra y daños en acabados." },
      { title: "Desatascos", text: "Fregaderos, inodoros, duchas y bajantes. Solución del atasco y revisión de la causa." },
      { title: "Termos eléctricos", text: "Sustitución, instalación y mantenimiento de termos y acumuladores de agua caliente." },
      { title: "Grifería y sanitarios", text: "Montaje y cambio de grifos, mamparas, inodoros, lavabos y cisternas." },
      { title: "Instalaciones nuevas", text: "Redes de agua fría y caliente, desagües y renovación de tuberías antiguas." },
      { title: "Mantenimiento", text: "Revisiones preventivas para viviendas, comunidades y locales comerciales." },
    ],
    problems: [
      "Manchas de humedad en paredes o techos",
      "Goteo constante en grifos o cisternas",
      "Desagües lentos o malos olores",
      "Baja presión de agua",
      "El termo no calienta o pierde agua",
      "Tuberías antiguas de hierro o plomo",
    ],
    benefits: [
      { title: "Diagnóstico antes de actuar", text: "Te explicamos qué pasa y por qué, sin tecnicismos." },
      { title: "Presupuesto cerrado", text: "Sabes lo que vas a pagar antes de que empecemos." },
      { title: "Trabajo limpio", text: "Protegemos la zona y la dejamos como la encontramos." },
    ],
    faqs: [
      { q: "¿Podéis localizar una fuga sin romper la pared?", a: "En muchos casos sí. Primero analizamos síntomas, presiones y recorridos para acotar el punto y abrir solo lo imprescindible. Te lo explicamos antes de actuar." },
      { q: "¿Cambiáis termos eléctricos el mismo día?", a: "Depende del modelo y de la disponibilidad. Cuéntanos qué termo tienes (capacidad y si es vertical u horizontal) y te diremos plazos reales." },
      { q: "¿Trabajáis con comunidades de vecinos?", a: "Sí. Atendemos averías en zonas comunes, bajantes y montantes, y podemos coordinarnos con el administrador de la finca." },
    ],
    related: ["calefaccion", "reformas-integrales"],
  },
  {
    slug: "climatizacion",
    index: "02",
    name: "Climatización",
    short: "Aire acondicionado, splits y confort térmico.",
    seoTitle: "Instalación de aire acondicionado en Granollers · Climatización",
    seoDescription:
      "Empresa de climatización en Granollers, el Vallès y Barcelona. Instalación y mantenimiento de aire acondicionado, sistemas split, conductos y bomba de calor.",
    keywords: ["instalación aire acondicionado Granollers", "empresa de climatización Barcelona", "aire acondicionado Vallès"],
    eyebrow: "Confort en cada estancia",
    headline: "El clima perfecto, todo el año.",
    lead:
      "Diseñamos e instalamos sistemas de climatización dimensionados para tu espacio real: ni más potencia de la necesaria, ni menos de la que necesitas. Eficientes, silenciosos y bien integrados.",
    accent: "#2DD4BF",
    accentSoft: "rgba(45,212,191,.14)",
    scope: [
      { title: "Aire acondicionado split", text: "Instalación de equipos 1x1 y multisplit con trazado limpio de líneas frigoríficas." },
      { title: "Climatización por conductos", text: "Soluciones integradas en falso techo para viviendas y locales." },
      { title: "Bomba de calor", text: "Frío y calor con un mismo sistema eficiente." },
      { title: "Mantenimiento y limpieza", text: "Revisión, limpieza de filtros y unidades para mantener rendimiento y calidad del aire." },
      { title: "Reparación de averías", text: "Diagnóstico de equipos que no enfrían, gotean o hacen ruido." },
      { title: "Asesoramiento de potencia", text: "Calculamos lo que tu espacio necesita para no sobredimensionar." },
    ],
    problems: [
      "El aire no enfría o no calienta",
      "La unidad interior gotea",
      "Ruidos o vibraciones",
      "Consumo eléctrico excesivo",
      "Malos olores al encender",
      "Estancias que nunca llegan a la temperatura",
    ],
    benefits: [
      { title: "Dimensionado real", text: "Potencia ajustada a metros, orientación y uso." },
      { title: "Instalación integrada", text: "Recorridos cuidados para que la instalación no se note." },
      { title: "Eficiencia", text: "Equipos y configuración pensados para consumir menos." },
    ],
    faqs: [
      { q: "¿Qué potencia de aire acondicionado necesito?", a: "Depende de los metros, la orientación, el aislamiento y el uso de la estancia. Lo valoramos en la visita o con fotos y medidas para recomendarte una potencia adecuada." },
      { q: "¿Split o conductos?", a: "El split es más rápido de instalar y económico por estancia; los conductos reparten el aire por toda la vivienda de forma más discreta. Te ayudamos a elegir según tu caso." },
      { q: "¿Cada cuánto hay que hacer mantenimiento?", a: "Recomendamos una revisión anual y limpieza de filtros periódica, especialmente antes de la temporada de uso intensivo." },
    ],
    related: ["electricidad", "calefaccion"],
  },
  {
    slug: "electricidad",
    index: "03",
    name: "Electricidad",
    short: "Instalaciones, iluminación, averías y cuadros.",
    seoTitle: "Electricista en Granollers y el Vallès · Instalaciones eléctricas",
    seoDescription:
      "Electricistas en Granollers, Vallès Oriental, Vallès Occidental y Barcelona. Instalaciones eléctricas, cuadros, iluminación, mecanismos y reparación de averías.",
    keywords: ["electricista Granollers", "electricista Vallès Oriental", "instalaciones eléctricas Barcelona"],
    eyebrow: "Energía segura",
    headline: "Instalaciones eléctricas seguras y preparadas para el futuro.",
    lead:
      "Desde un mecanismo que no funciona hasta la renovación completa de la instalación. Trabajamos con criterios de seguridad, orden en el cuadro y una iluminación que transforma los espacios.",
    accent: "#3B82F6",
    accentSoft: "rgba(59,130,246,.16)",
    scope: [
      { title: "Instalaciones completas", text: "Nuevas instalaciones y renovación de instalaciones antiguas en viviendas y locales." },
      { title: "Cuadros eléctricos", text: "Revisión, ampliación y sustitución de cuadros y protecciones." },
      { title: "Iluminación", text: "Proyecto e instalación de iluminación LED interior y exterior." },
      { title: "Mecanismos", text: "Enchufes, interruptores, tomas de datos y cambios de serie." },
      { title: "Averías", text: "Saltos de diferencial, cortocircuitos, zonas sin corriente." },
      { title: "Mantenimiento", text: "Revisiones periódicas para negocios y comunidades." },
    ],
    problems: [
      "Salta el diferencial o el magnetotérmico",
      "Enchufes o zonas sin corriente",
      "Instalación antigua sin toma de tierra",
      "Necesitas más potencia o más circuitos",
      "Luces que parpadean",
      "Cuadro eléctrico desordenado o insuficiente",
    ],
    benefits: [
      { title: "Seguridad primero", text: "Protecciones adecuadas para cada circuito." },
      { title: "Orden y claridad", text: "Cuadros identificados para que sepas qué es cada cosa." },
      { title: "Preparado para crecer", text: "Instalaciones pensadas para climatización, cocina y futuras ampliaciones." },
    ],
    faqs: [
      { q: "¿Por qué salta el diferencial?", a: "Suele indicar una fuga de corriente: un electrodoméstico defectuoso, humedad en una caja o un cable dañado. Conviene revisarlo; no es recomendable dejarlo puenteado." },
      { q: "¿Renováis instalaciones antiguas?", a: "Sí. Valoramos el estado de la instalación y te proponemos una renovación por fases o completa, según tu presupuesto y la obra prevista." },
      { q: "¿Instaláis la preinstalación del aire acondicionado?", a: "Sí, coordinamos la parte eléctrica y la de climatización para que todo quede integrado." },
    ],
    related: ["climatizacion", "reformas-integrales"],
  },
  {
    slug: "calefaccion",
    index: "04",
    name: "Calefacción",
    short: "Calderas, radiadores y sistemas de calefacción.",
    seoTitle: "Reparación de calderas en el Vallès Oriental · Calefacción",
    seoDescription:
      "Calefacción en Granollers y el Vallès: instalación, sustitución y reparación de calderas, radiadores y sistemas de calefacción para viviendas y negocios.",
    keywords: ["reparación de calderas Vallès Oriental", "calderas Granollers", "calefacción Granollers"],
    eyebrow: "Calor eficiente",
    headline: "Calefacción que funciona cuando la necesitas.",
    lead:
      "Instalamos, sustituimos y reparamos calderas y sistemas de calefacción. Te ayudamos a elegir una solución eficiente y a mantenerla en buen estado para que el invierno no te pille desprevenido.",
    accent: "#60A5FA",
    accentSoft: "rgba(96,165,250,.16)",
    scope: [
      { title: "Calderas", text: "Sustitución e instalación de calderas, incluidas las de condensación." },
      { title: "Reparación de averías", text: "Diagnóstico de calderas que no encienden, pierden presión o no calientan el agua." },
      { title: "Radiadores", text: "Instalación, cambio, purgado y equilibrado de radiadores." },
      { title: "Circuitos de calefacción", text: "Instalación y renovación de circuitos y elementos de regulación." },
      { title: "Termostatos", text: "Termostatos programables y conectados para controlar el consumo." },
      { title: "Puesta a punto", text: "Revisión previa a la temporada de frío." },
    ],
    problems: [
      "La caldera no enciende o se bloquea",
      "Pérdida de presión constante",
      "Radiadores fríos por arriba o por abajo",
      "Sin agua caliente sanitaria",
      "Ruidos en el circuito",
      "Facturas de gas elevadas",
    ],
    benefits: [
      { title: "Diagnóstico claro", text: "Reparar o sustituir: te damos los datos para decidir." },
      { title: "Eficiencia", text: "Soluciones para reducir consumo y mejorar el confort." },
      { title: "Prevención", text: "Mantenimiento para evitar averías en pleno invierno." },
    ],
    faqs: [
      { q: "¿Merece la pena reparar mi caldera o cambiarla?", a: "Depende de la edad del equipo, la avería y la disponibilidad de recambios. Te damos una valoración honesta de ambas opciones con sus costes." },
      { q: "¿Por qué pierde presión la caldera?", a: "Puede deberse a una fuga en el circuito, al vaso de expansión o a una válvula. Hay que localizar la causa para no tener que rellenar continuamente." },
      { q: "¿Purgáis radiadores?", a: "Sí, y revisamos el equilibrado del circuito para que todos los radiadores calienten de forma uniforme." },
    ],
    related: ["fontaneria", "climatizacion"],
  },
  {
    slug: "reformas-integrales",
    index: "05",
    name: "Reformas integrales",
    short: "Baños, cocinas y viviendas completas.",
    seoTitle: "Reformas integrales en el Vallès Oriental y Barcelona",
    seoDescription:
      "Reformas integrales de viviendas, baños y cocinas en Granollers, el Vallès y Barcelona. Un solo equipo para fontanería, electricidad y climatización.",
    keywords: ["reformas integrales Vallès Oriental", "reformas Granollers", "reforma de baño Granollers"],
    eyebrow: "Un solo interlocutor",
    headline: "Reformas donde las instalaciones están en el centro.",
    lead:
      "La parte que no se ve es la que decide si una reforma dura. Coordinamos fontanería, electricidad y climatización desde el primer plano, con un único interlocutor y una planificación clara.",
    accent: "#7DD3FC",
    accentSoft: "rgba(125,211,252,.14)",
    scope: [
      { title: "Reforma de baños", text: "Renovación completa: instalaciones, platos de ducha, revestimientos y sanitarios." },
      { title: "Reforma de cocinas", text: "Instalaciones de agua, desagüe, electricidad e iluminación adaptadas a la nueva distribución." },
      { title: "Viviendas completas", text: "Reformas integrales con renovación de todas las instalaciones." },
      { title: "Locales comerciales", text: "Adecuación de locales con instalaciones preparadas para la actividad." },
      { title: "Planificación", text: "Fases, plazos y presupuesto por partidas desde el inicio." },
      { title: "Coordinación", text: "Un único equipo responsable de que todo encaje." },
    ],
    problems: [
      "Instalaciones antiguas que hay que renovar",
      "Cambio de distribución de cocina o baño",
      "Coordinar varios gremios distintos",
      "Plazos y presupuestos que se descontrolan",
      "Adaptar una vivienda a nuevas necesidades",
      "Preparar un local para abrir",
    ],
    benefits: [
      { title: "Un solo responsable", text: "Sin coordinar a cinco empresas distintas." },
      { title: "Presupuesto por partidas", text: "Transparencia en cada fase de la obra." },
      { title: "Instalaciones nuevas", text: "La base técnica preparada para muchos años." },
    ],
    faqs: [
      { q: "¿Cuánto cuesta una reforma integral?", a: "Depende de los metros, el estado de partida y las calidades. Tras la visita preparamos un presupuesto detallado por partidas para que puedas decidir con todos los datos." },
      { q: "¿Necesito licencia de obras?", a: "Depende del alcance y del municipio. Te orientamos sobre el tipo de comunicación o licencia que suele requerirse en tu ayuntamiento." },
      { q: "¿Podéis hacer solo las instalaciones de una reforma?", a: "Sí. También trabajamos como equipo de instalaciones para obras coordinadas por otros profesionales." },
    ],
    related: ["fontaneria", "electricidad"],
  },
];

export const getService = (slug: ServiceSlug) => {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Servicio desconocido: ${slug}`);
  return s;
};

/** Las cuatro grandes experiencias de la home (calefacción + reformas comparten bloque). */
export const homeServiceGroups: { slugs: ServiceSlug[]; label: string }[] = [
  { slugs: ["fontaneria"], label: "Fontanería" },
  { slugs: ["climatizacion"], label: "Climatización" },
  { slugs: ["electricidad"], label: "Electricidad" },
  { slugs: ["calefaccion", "reformas-integrales"], label: "Calefacción & Reformas" },
];
