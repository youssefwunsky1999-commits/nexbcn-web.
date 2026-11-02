import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { areas } from "@/lib/zones";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: `${site.url}${path}`, lastModified: now, changeFrequency, priority,
  });
  return [
    u("", 1, "weekly"),
    ...services.map((s) => u(`/${s.slug}`, 0.9)),
    u("/urgencias", 0.9),
    u("/presupuesto", 0.8),
    u("/zona-de-cobertura", 0.7),
    ...areas.map((a) => u(`/zonas/${a.slug}`, 0.7)),
    u("/sobre-nosotros", 0.5),
    u("/preguntas-frecuentes", 0.5),
    u("/contacto", 0.6),
    u("/aviso-legal", 0.1, "yearly"),
    u("/politica-de-privacidad", 0.1, "yearly"),
    u("/politica-de-cookies", 0.1, "yearly"),
  ];
}
