import { ServicePage } from "@/components/service/ServicePage";
import { getService } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

const sv = getService("calefaccion");

export const metadata = pageMetadata({
  title: sv.seoTitle,
  description: sv.seoDescription,
  path: "/calefaccion",
  keywords: sv.keywords,
});

export default function Page() {
  return <ServicePage slug="calefaccion" />;
}
