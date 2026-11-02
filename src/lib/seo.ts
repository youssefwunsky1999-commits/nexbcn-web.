import type { Metadata } from "next";
import { site } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
};

/** Metadatos coherentes (canonical, OG, Twitter) para cada página. */
export function pageMetadata({ title, description, path, keywords, noindex }: PageMeta): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    // Si el título ya incluye la marca, no se le añade el sufijo " | NEXBCN"
    title: title.includes("NEXBCN") ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: site.name,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
