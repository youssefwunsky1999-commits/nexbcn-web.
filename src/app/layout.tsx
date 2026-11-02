import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuickActions } from "@/components/layout/QuickActions";
import { ConfigNotice } from "@/components/layout/ConfigNotice";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display-face", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono-face", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "NEXBCN | Fontanería, Climatización & Electricidad en Granollers y Barcelona",
    template: "%s | NEXBCN",
  },
  description:
    "Fontanería, climatización, calefacción, electricidad y reformas integrales para hogares y empresas en Granollers, el Vallès Oriental, el Vallès Occidental y Barcelona.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  formatDetection: { telephone: false },
  openGraph: { type: "website", locale: site.locale, siteName: site.name },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#050b18",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`no-js ${inter.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <QuickActions />
        <ConfigNotice />
        <MotionProvider />
        <JsonLd data={[businessSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
