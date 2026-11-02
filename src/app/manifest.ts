import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NEXBCN | Fontanería, Climatización & Electricidad",
    short_name: "NEXBCN",
    description: "Instalaciones en Granollers, el Vallès y Barcelona.",
    start_url: "/",
    display: "standalone",
    background_color: "#050b18",
    theme_color: "#050b18",
    lang: "es",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
