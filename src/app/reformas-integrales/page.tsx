import { ServicePage } from "@/components/service/ServicePage";
import { getService } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

const sv = getService("reformas-integrales");

export const metadata = pageMetadata({
  title: sv.seoTitle,
  description: sv.seoDescription,
  path: "/reformas-integrales",
  keywords: sv.keywords,
});

export default function Page() {
  return <ServicePage slug="reformas-integrales" />;
}
