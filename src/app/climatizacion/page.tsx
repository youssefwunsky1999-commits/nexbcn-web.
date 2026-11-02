import { ServicePage } from "@/components/service/ServicePage";
import { getService } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

const sv = getService("climatizacion");

export const metadata = pageMetadata({
  title: sv.seoTitle,
  description: sv.seoDescription,
  path: "/climatizacion",
  keywords: sv.keywords,
});

export default function Page() {
  return <ServicePage slug="climatizacion" />;
}
